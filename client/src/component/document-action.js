import React, { Menu } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import '../css/document-action.css'
import {MenuItem,ContextMenuTrigger,ContextMenu} from 'react-contextmenu';

class DocumentAction extends React.Component{
  constructor(props) {
    super(props);

  }

  render(){
    return (
      <div style = {{display:"inline-block"}}>
        <ContextMenuTrigger id= {this.props.currentDoc._id} holdToDisplay={1000}>
         
          <button className="button" onClick = {this.props.onClick}>
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
             
        </ContextMenuTrigger>
        <ContextMenu id={this.props.currentDoc._id}>
           <MenuItem onClick = {this.props.menuClick} 
                    data={{"currentDoc" : this.props.currentDoc,option : "delete"}}>
                    Delete</MenuItem>
        </ContextMenu>
  
      </div>
      
  
    );

  }
  
}
export default DocumentAction;