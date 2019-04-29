import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

export const post = (requestPath, requestBody) =>
    axios.post(BASE_URL + requestPath, requestBody);

export const get = requestPath => axios.get(requestPath);
