import React from 'react';
import ReactDOM from 'react-dom';
import '.';
import App from './routes';
import './styles/bootstrap.css';
import setAuthToken from './api/setAuthToken';
import axios from 'axios';


axios.defaults.baseURL =localStorage.getItem("ip")|| "https://";


const apiKey = localStorage.getItem("api-key");
if(apiKey){
  setAuthToken(localStorage.getItem("api-key") as string);
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

