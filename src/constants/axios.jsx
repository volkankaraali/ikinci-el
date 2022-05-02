import axios from 'axios';

import baseURL from './constants';

const withTokenAxios = axios.create({ baseURL });
const noTokenAxios = axios.create({ baseURL });

let cookie = document.cookie;
let token = cookie.split('=')[1];

withTokenAxios.interceptors.request.use(
  config => {
    config.headers = {
      Authorization: `Bearer ${token}`
    };
    return config;
  }
);


export const URL = {
  register: 'auth/local/register',
  login: 'auth/local',
  categories: '/categories',
  products: '/products',
  usersMe: '/users/me',
  offers: '/offers',
};

export { withTokenAxios, noTokenAxios };
