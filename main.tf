provider "aws" {
	region = "ap-south-1"
	access_key = "AKIAVOX67IJ7OVCUVGDP"
	secret_key = "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"
}
resource "aws_key_pair" "my-app" {
  public_key = file("~/.ssh/id_rsa.pub")
  key_name   = "mya-aws-key"
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

resource "aws_instance" "my-first-terrraform"{
	ami = "ami-0123b531fc646552f"
	instance_type = "t2.micro"
	key_name = aws_key_pair.my-app.key_name
	security_groups = [
    aws_security_group.my_app_sg.name
  ]


}
output "my-server-ip-address" {
  value = aws_instance.my-first-terrraform.public_ip
}