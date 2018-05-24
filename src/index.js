import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// Global Configurations:
// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';

axios.interceptors.request.use(request => {
  console.log(request)
  // Must return the request, otherwise, you're blocking it
 // It's possible to edit the request config
  return request;
}, error => {
  // This will handle errors like no internet connection
  // It will not handle bad endpoint errors
  console.log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  console.log(response);
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
