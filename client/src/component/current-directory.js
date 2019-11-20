import React from 'react';
import axios from 'axios';
import DocumentAction from './document-action';

class CurrentDirectory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      docType: "folder",
      docName: "",

    };

  }

  handleSelectChange = (event) => {
    this.setState({ docType: event.target.value });
  }
  handleSubmit = (event) => {
    let docExist = this.props.currentLevelDocs.find(
      (doc, index) =>
        doc.title == this.state.docName && doc.type == this.state.docType
    )
    if (!docExist) {
      let newDoc =
      {
        "title": this.state.docName,
        "type": this.state.docType,
        "parentId": this.props.currentDirectory._id
      }
      axios.post('http://localhost:8080/api/document', newDoc).then((res) => {
        let docs = this.props.currentLevelDocs;
        docs.push(res.data);
        this.props.afterCreateNewItem(res.data,this.props.currentDirectory)
        //this.setState({})
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
        onClick={() => this.props.onClick(doc)}
        menuClick = {this.props.menuClick}
        currentDoc={doc}
      />
    );
  }
  render() {
    return (

      <div>
        <ul>
          {this.props.currentLevelDocs.map((doc, index) =>this.renderUserDocument(doc))}
        </ul>

        {
          !this.props.isInitialLoad ?
            <div>
              <form onSubmit={this.handleSubmit}>
                  <label>
                    Doc/Folder Name:
                <input
                      id = "create-new-doc"
                      name="fileName"
                      type="text"
                      required
                      onChange={this.handleInputChange} />
                  </label>

                  <select value={this.state.docType} onChange={this.handleSelectChange}>
                    <option value="folder">folder</option>
                    <option value="document">document</option>
                  </select>

                  <input id = "new-doc-submit" type="submit" value="Create" />
              </form>

            </div> : ""
        }


      </div>


    );
  }

}

export default CurrentDirectory;
