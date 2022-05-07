import axios from 'axios';

import baseURL from './constants';

const withTokenAxios = axios.create({ baseURL });
const noTokenAxios = axios.create({ baseURL });



withTokenAxios.interceptors.request.use(
  async config => {
    let cookie = document.cookie;
    let token = cookie.split('=')[1];
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
  brands: '/brands',
  colors: '/colors',
  usingStatus: '/using-statuses'
};

export { withTokenAxios, noTokenAxios };
