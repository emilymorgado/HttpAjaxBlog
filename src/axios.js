import axios from 'axios';

// This instance will inherit global settings
// found in index.js

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN';

export default instance;
