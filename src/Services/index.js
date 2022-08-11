import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    // baseURL: process.env.MIX_APP_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "X-localization": "es"
    }
});

export default Api;