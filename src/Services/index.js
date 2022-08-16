import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://consultanttestagence.000webhostapp.com',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});

export default Api;