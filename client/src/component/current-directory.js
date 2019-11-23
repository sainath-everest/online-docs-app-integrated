import React from 'react';
import axios from 'axios';
import DocumentAction from './document-action';

class CurrentDirectory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      docType: "folder",
      docName: "",
      currentLevelDocs:this.props.currentLevelDocs

    };

  }
  static getDerivedStateFromProps(nextprops,prevstate){
    if(prevstate.currentLevelDocs!==nextprops.currentLevelDocs){
      return ({currentLevelDocs:nextprops.currentLevelDocs})
    }
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
      const parentId =  this.props.currentDirectory._id ?this.props.currentDirectory._id:"";
      let newDoc =
      {
        "title": this.state.docName,
        "type": this.state.docType,
        "parentId": parentId
      }
      axios.post('http://localhost:8080/api/document', newDoc).then((res) => {
        // let docs = this.props.currentLevelDocs;
        // docs.push(res.data);
        const currentLevelDocs = this.state.currentLevelDocs;
        currentLevelDocs.push(res.data);
        this.setState({currentLevelDocs:currentLevelDocs});
        // this.props.afterCreateNewItem(res.data,this.props.currentDirectory)
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
          {this.state.currentLevelDocs.map((doc, index) =>this.renderUserDocument(doc))}
        </ul>

        {
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

            </div>
        }


      </div>


    );
  }

}

export default CurrentDirectory;
