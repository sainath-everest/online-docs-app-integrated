import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { Link, Redirect, withRouter } from "react-router-dom";
import '../css/document-action.css';
import * as DocumentService from '../service/document-service'


 export class DocumentAction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDocDeleted: false
    }

  }
  deleteDocummentOrFolder = async (event, data) => {
    if (data.option == "delete") {
      await  DocumentService.deleteDocummentOrFolder(data);
        this.setState({
          isDocDeleted: !this.state.isDocDeleted
        })
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