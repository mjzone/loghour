import axios from 'axios';
const USER_TOKEN = localStorage.getItem('token');

let instance = axios.create({
    baseURL: 'https://loghour.com/api/',
    headers: {
        'Authorization': 'token ' + USER_TOKEN 
    }
});

export function getToken(code) { 
    return axios.get('https://loghour.com/api/authorize/'+ code);
    //return axios.get('https://19xickfd0c.execute-api.eu-west-1.amazonaws.com/dev/authorize/'+ code);
}

export function getIssues(){
    return instance.get('repos/99xt/from/2016-10-10/to/2016-10-28/user/mjzone');
}
