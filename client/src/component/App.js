import React from 'react';
import '../css/App.css';
import axios from 'axios';
import CurrentDirectory from './current-directory';
import CurrentDcoument from './current-document';
import history from "../history"
import { withRouter } from 'react-router-dom';
import DocumentAction from './document-action';
import { Redirect } from "react-router-dom";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLevelDocs: [],
      isDoc: false,
      currentDoc: {},
      currentDirectory: {},
    };
  }
  componentDidMount() {
    axios.get('http://localhost:8080/api/')
      .then(res => {
        let rootLevelDocs = res.data;
        this.setState({
          currentLevelDocs: rootLevelDocs
        });
      });
  }
  render() {
    return (

      <div className="app">
        <div className="app-current-directory">
          {
            <Redirect to={`/folder/root`} />
          }
        </div>

      </div>
    );
  }
}

export default withRouter(App);
