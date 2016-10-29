import axios from 'axios';
import * as store from 'store';
const USER_TOKEN = store.get('token');

let instance = axios.create({
    baseURL: '/api/',
    headers: {
        'Authorization': 'token ' + USER_TOKEN
    }
});

export function getToken(code) {
    return axios.get('/api/authorize/'+ code);
}

export function getIssues(){
    return instance.get('repos/99xt/from/2016-10-10/to/2016-10-28/user/mjzone');
}
