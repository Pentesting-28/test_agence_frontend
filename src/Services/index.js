import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://consultanttestagence.000webhostapp.com/test_agence_backend/public',
    // baseURL: process.env.MIX_APP_URL,
    // headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "application/json",
    // //     // "X-localization": "es"
    // }
});

export default Api;