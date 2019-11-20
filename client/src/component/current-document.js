import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';



class CurrentDcoument extends React.Component {
    constructor(props){
        super(props)
        this.state = {docData : ""}
        
    }
    componentDidMount(){
        
        let url = 'http://localhost:8080/api/document/'+this.props.doc._id
        return axios.get(url).then(res => {
            this.setState({docData : res.data.data});
            

        })
        
    }
  
  render() {
      let docData = "";
      
     
    return (
        <div className="App">
        <CKEditor
            editor={ ClassicEditor }
            data= {this.state.docData}
            onInit={ editor => {
                console.log( 'Editor is ready to use!', editor );
            } }
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                docData = data;
            } }
            onBlur={ ( event, editor ) => {
            } }
            onFocus={ ( event, editor ) => {
            } }
        />
        {/* <button onClick = {()=>{this.updateDocumet(this.props.doc,docData)} } >save</button> */}
        <button onClick = {()=>{this.props.onClick(this.props.doc,docData)} } >save</button>
    </div>
        )
    
     
    
  }

}

export default CurrentDcoument;