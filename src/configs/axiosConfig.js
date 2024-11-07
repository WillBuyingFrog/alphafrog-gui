import axios from 'axios';

const alphafrogRequestHandler = axios.create({
  baseURL: 'http://localhost:8090'
});

export default alphafrogRequestHandler;
