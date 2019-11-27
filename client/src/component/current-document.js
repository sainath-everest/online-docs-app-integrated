import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { Redirect } from "react-router-dom";

class CurrentDcoument extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            docData: "",
            currentDoc: null,
            isaDocUpdated: false,
            isSaved: false
        }

    }
    componentDidMount() {
        let url = 'http://localhost:8080/api/document/' + this.props.match.params.id
        return axios.get(url).then(res => {
            console.log("current document: " + res.data.parentId)
            this.setState({ docData: res.data.data, currentDoc: res.data });
        })
    }
    saveOrUpdateDocument = (currentDoc, data) => {
            let url = 'http://localhost:8080/api/document/' + currentDoc._id
            return axios.put(url, { data: data }).then(res => { 
                this.setState({
                    isSaved:!this.state.isSaved
                })
            });

    }

    render() {
        let docData = "";
        return (
            <div className="App">
                <CKEditor
                    editor={ClassicEditor}
                    data={this.state.docData}
                    onInit={editor => {
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        docData = data;
                    }}
                    onBlur={(event, editor) => {
                    }}
                    onFocus={(event, editor) => {
                    }}
                />
                 <button onClick={()=>this.saveOrUpdateDocument(this.state.currentDoc,docData)}>save</button>
               
                   {
                       this.state.isSaved ? 
                       this.state.currentDoc.parentId ?
                        <Redirect to={`/folder/${this.state.currentDoc.parentId._id}`} /> :
                        <Redirect to={`/folder/root`} />
          : null
                   } 
            </div> 
        )
    }
}

export default withRouter(CurrentDcoument);