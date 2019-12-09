import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import * as DocumentService from '../service/document-service'

export class CurrentDcoument extends React.Component {
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
        this.getCurrentDocumentData();

    }

   async getCurrentDocumentData() {
        const res = await DocumentService.getDocumenById(this.props.match.params.id);
        this.setState({ docData: res.data.data, currentDoc: res.data });
    }
    saveOrUpdateDocument = async (currentDoc, data) => {
       await DocumentService.saveOrUpdateDocument(currentDoc, data);
                this.setState({
                    isSaved:!this.state.isSaved
                })
    }

    render() {
        let docData = this.state.docData;
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