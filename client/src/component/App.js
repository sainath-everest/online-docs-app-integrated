import React from 'react';
import '../css/App.css';
import { withRouter } from 'react-router-dom';
import { Redirect } from "react-router-dom";

export class App extends React.Component {
  constructor(props) {
    super(props);
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
