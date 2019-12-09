import React from 'react';
import ReactDOM from 'react-dom';
import '../src/css/index.css';
import App from './component/App';
import * as serviceWorker from './serviceWorker';
import Router from './router/router';

ReactDOM.render(<Router />, document.getElementById('root'));

serviceWorker.unregister();
