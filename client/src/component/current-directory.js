import React from 'react';
import axios from 'axios';
import DocumentAction from './document-action';
import { withRouter } from 'react-router-dom';
import * as DocumentService from '../service/document-service'


export class CurrentDirectory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      docType: "folder",
      docName: "",
      currentLevelDocs: [],
      currentDirectory: {}

    }; 
  }

 async componentDidMount() {
    if (this.props.match.params.id == 'root') { 
      const res = await DocumentService.getRootLevelDocs(); 
          let rootLevelDocs = res.data;
          this.setState({
            currentLevelDocs: rootLevelDocs,
            currentDirectory: {}
          });
    }
    else {
      const res = await DocumentService.getDocumentMetadataById(this.props.match.params.id);
      this.setState({ currentLevelDocs: res.data.children, currentDirectory: res.data });

    }


  }
  handleSelectChange = (event) => {
    this.setState({ docType: event.target.value });
  }
  
  handleSubmit = (event) => {
    let docExist = this.state.currentLevelDocs.find(
      (doc, index) =>
        doc.title == this.state.docName && doc.type == this.state.docType
    )
    if (!docExist) {
      let newDoc;
      this.state.currentDirectory ?
        newDoc =
        {
          "title": this.state.docName,
          "type": this.state.docType,
          "parentId": this.state.currentDirectory._id
        } :
        newDoc =
        {
          "title": this.state.docName,
          "type": this.state.docType,
        }

      return axios.post((process.env.REACT_APP_SERVER+'/api/document'), newDoc).then((res) => {
        const currentLevelDocs = this.state.currentLevelDocs;
        currentLevelDocs.push(res.data);
        this.setState({ currentLevelDocs: currentLevelDocs });
        
      })
    }
    else {
      alert("the item with given name already exist");
    }
    event.preventDefault();
  }
  handleInputChange = (event) => {
    this.setState({ docName: event.target.value });
  }

  renderUserDocument(doc) {
    return (

      <DocumentAction
        value={doc.title}
        menuClick={this.props.menuClick}
        currentDoc={doc}
      />
    );
  }
  render() {
    return (

      <div>
        <ul>
          {this.state.currentLevelDocs.map((doc, index) => this.renderUserDocument(doc))}
        </ul>

        {
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Doc/Folder Name:
                <input
                  id="create-new-doc"
                  name="fileName"
                  type="text"
                  required
                  onChange={this.handleInputChange} />
              </label>

              <select id="doc-type" value={this.state.docType} onChange={this.handleSelectChange}>
                <option value="folder">folder</option>
                <option value="document">document</option>
              </select>

              <input id="new-doc-submit" type="submit" value="Create" />
            </form>

          </div>
        }


      </div>


    );
  }

}

export default withRouter(CurrentDirectory);
