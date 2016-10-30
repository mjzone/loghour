import axios from 'axios';
import * as store from 'store';

export function getToken(code) {
  return axios.get('/api/authorize/' + code);
}

export function getIssues(options) {
  let instance = axios.create({
    baseURL: '/api/',
    headers: {
      'Authorization': store.get('token')
    }
  });
  return instance.get('repos/' + options.org + '/from/' + options.from + '/to/' + options.to + '/user/' + options.user);
}
