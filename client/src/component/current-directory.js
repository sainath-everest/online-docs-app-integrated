import React from 'react';
import axios from 'axios';
import DocumentAction from './document-action';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import App from './App';

class CurrentDirectory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      docType: "folder",
      docName: "",
      currentLevelDocs: [],
      currentDirectory: {}

    };

  }

  componentDidMount() {
    if (this.props.match.params.id == 'root') {
      axios.get('http://localhost:8080/api/')
        .then(res => {
          let rootLevelDocs = res.data;
          this.setState({
            currentLevelDocs: rootLevelDocs,
            currentDirectory: {}

          });

        });

    }
    else {
      let url = 'http://localhost:8080/api/document/metadata/' + this.props.match.params.id
      axios.get(url).then((res) => {
        this.setState({ currentLevelDocs: res.data.children, currentDirectory: res.data });

      })

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
      axios.post('http://localhost:8080/api/document', newDoc).then((res) => {
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
          {
          this.state.currentDoc?
          this.state.currentDirectory.ancestors.map((doc, index) => this.renderUserDocument(doc)):null
          }
        </ul>
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

              <select value={this.state.docType} onChange={this.handleSelectChange}>
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
