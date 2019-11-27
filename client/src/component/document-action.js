import React, { Menu } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import '../css/document-action.css'
import { MenuItem, ContextMenuTrigger, ContextMenu } from 'react-contextmenu';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class DocumentAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDocDeleted: false
    }

  }
  deleteDocummentOrFolder = (event, data) => {
    console.log("hello")
    let url = 'http://localhost:8080/api/document/' + data.currentDoc._id
    if (data.option == "delete") {
      return axios.delete(url).then(res => {
        this.setState({
          isDocDeleted: !this.state.isDocDeleted
        })
      });
    }

  }

  render() {
    return (
      <div style={{ display: "inline-block" }}>

        <ContextMenuTrigger id={this.props.currentDoc._id} holdToDisplay={1000}>
          <Link to={`/${this.props.currentDoc.type}/${this.props.currentDoc._id}`}>
            <button className="button" >
              {this.props.value}
              {this.props.currentDoc.type == 'folder' ?
                (
                  <i class="fa fa-folder-o"></i>
                )
                :
                (
                  <i class="fa fa-file-word-o"></i>
                )}
            </button>
          </Link>

        </ContextMenuTrigger>
        <ContextMenu id={this.props.currentDoc._id}>

          <MenuItem onClick={this.deleteDocummentOrFolder}
            data={{ "currentDoc": this.props.currentDoc, option: "delete" }}>
            Delete</MenuItem>

        </ContextMenu>


        {this.state.isDocDeleted ?
          this.props.currentDoc.parentId ?
            <Redirect to={`/folder/${this.props.currentDoc.parentId}`} /> :
            <Redirect to={`/folder/root`} />

          : null
        }

      </div>


    );

  }

}
export default withRouter(DocumentAction);;