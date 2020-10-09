import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import AppStart from "./App";


    ReactDOM.render(<AppStart />, document.getElementById('root'));

serviceWorker.unregister();

