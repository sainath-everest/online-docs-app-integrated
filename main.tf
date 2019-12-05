provider "aws" {
	 region = "ap-south-1"

}
resource "aws_key_pair" "my-app" {
  public_key = file("~/.ssh/id_rsa.pub")
  key_name   = "my-aws-key"
}
resource "aws_security_group" "my_app_sg" {
  name = "my_instance_sg"
  ingress {
    from_port = 3000
    to_port   = 3000
    protocol  = "tcp"
    cidr_blocks = [ "0.0.0.0/0"]
  }
  ingress {
    from_port = 8080
    to_port   = 8080
    protocol  = "tcp"
    cidr_blocks = [ "0.0.0.0/0"]
  }
  ingress {
    from_port = 80
    to_port   = 80
    protocol  = "tcp"
    cidr_blocks = [ "0.0.0.0/0"]
  }
  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
    cidr_blocks = [ "0.0.0.0/0"]
  }
   egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
  }

}

resource "aws_instance" "my-first-terrraform2"{
	ami = "ami-0123b531fc646552f"
	instance_type = "t2.micro"
	key_name = aws_key_pair.my-app.key_name
	security_groups = [
    aws_security_group.my_app_sg.name
  ]

 provisioner "remote-exec" {
    inline = ["sudo apt-get update"]

  connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = "${file("~/.ssh/id_rsa")}"
      host        = "${self.public_ip}" 
    }
  }
  provisioner "local-exec" {
    command = "ansible-playbook -u ubuntu -i '${self.public_ip},'  docs-app-ansible.yml" 
  }


}
output "my-server-ip-address" {
  value = aws_instance.my-first-terrraform2.public_ip
}
 