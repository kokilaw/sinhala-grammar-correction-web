import axios from 'axios';

const BASE_URL = 'localhost:8080';

export default {
    post: (requestPath, requestBody) =>
        axios.post(BASE_URL + requestPath, { requestBody }),
    get: requestPath => axios.get(requestPath)
};
