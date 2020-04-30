import axios from 'axios';

const baseURL = (() => {
    if(process.env.NODE_ENV === 'development') {
        return 'http://localhost:9000/api';
    } else {
        return 'https://api.nodememo.dev';
    }
})

export const http = axios.create({
    baseURL: baseURL(),
})

