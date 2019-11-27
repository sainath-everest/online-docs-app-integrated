import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from '../component/App'
import CurrentDirectory from '../component/current-directory'
import CurrentDocument from '../component/current-document'
import history from '../history';

export default function AppRouter() {
  return (
    <Router >
      <Switch>
        <Route exact path="/"><App /></Route>
        <Route path="/folder/:id" render={({ match }) => <CurrentDirectory key={Math.random().toString(36).substr(2, 9)} />}></Route>

        <Route path="/document/:id" render={({ match }) => <CurrentDocument key={Math.random().toString(36).substr(2, 9)} />}></Route>
      </Switch>

    </Router>
  );
}