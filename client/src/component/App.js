import React from 'react';
import '../css/App.css';
import axios from 'axios';
import CurrentDirectory from './current-directory';
import CurrentDcoument from './current-document';
import { stat } from 'fs';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLevelDocs : [],
      isDoc : false,
      currentDoc : {},
      currentDirectory : {},
    };
  }
  componentDidMount() {
    axios.get('http://localhost:8080/api/')
      .then(res => {
        console.log(res);
        let rootLevelDocs = res.data;
        console.log("rootLevelDocs"+rootLevelDocs);
        this.setState({
          currentLevelDocs : rootLevelDocs
        });


      });

  }
    findDocMetadataById = async(docId) => {
      console.log("in findDocMetadataById");
      let url = 'http://localhost:8080/api/document/metadata/'+docId
      const {data} = await axios.get(url);
      return data; 
  }
   async handleClickFolder(doc){
    console.log("in handleClick");
    let docs = [];
    if(doc.children.length>0){
      for(let i=0;i<doc.children.length;i++) {
         docs.push(await this.findDocMetadataById(doc.children[i]));
      }
     }
    this.setState({
      currentLevelDocs: docs,
      currentDirectory : doc,
      isDoc : false,
      isInitialLoad : false

    })

    
}
handleClickDoc(doc){
  console.log("in handleClickDoc");
  this.setState({isDoc : true,currentDoc:doc});
}
async hadnleClickDocSave(doc,data,currentLevelDocs){
    let url = 'http://localhost:8080/api/document/'+doc._id
    await axios.put(url,{data:data}).then(res => {});

    if(doc.parentId == ""){
      this.setState({currentLevelDocs:currentLevelDocs,  isDoc : false});
    }
    else{
      let parentFolder = await this.findDocMetadataById(doc.parentId);
      this.handleClickFolder(parentFolder);

    }
   

}

async handleDocmenuClick(event,data){
  let url = 'http://localhost:8080/api/document/'+data.currentDoc._id
  if(data.option == "delete"){
    axios.delete(url).then(res =>{} ); 
      let docs = this.state.currentLevelDocs;
      let index = docs.indexOf(data.currentDoc);
      docs.splice(index, 1);
      this.setState({currentLevelDocs:docs,  isDoc : false});

  }

}
  render() {
    return (

      <div className="app">
        <div className="app-current-directory">
          {this.state.isDoc ?
            <CurrentDcoument
              doc = {this.state.currentDoc}
              currentLevelDocs={this.state.currentLevelDocs}
              onClick = {(doc,data,currentLevelDocs) => this.hadnleClickDocSave(doc,data,currentLevelDocs)}
              
            />:
          <CurrentDirectory
            currentLevelDocs={this.state.currentLevelDocs}
            currentDirectory = {this.state.currentDirectory}
            isInitialLoad = {this.state.isInitialLoad}
            onClick={(doc) =>
                doc.type == 'folder' ? this.handleClickFolder(doc) : this.handleClickDoc(doc)
              
              }
              afterCreateNewItem = {(newDoc,currentDirectory) => this.afterCreateNewItem(newDoc,currentDirectory)}
              menuClick = {(event,data) => {this.handleDocmenuClick(event,data)}}
            
        />
          }
           
        </div>
        
      </div>
    );
  }
}

export default App;
