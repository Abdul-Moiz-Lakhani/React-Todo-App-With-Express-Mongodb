import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from "./Store/Store"
import { Provider } from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
