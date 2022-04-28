import axios from 'axios';
import useGetTokenFromCookie from '../hooks/useGetTokenFromCookie';

const baseURL = 'https://bootcamp.akbolat.net/';
const withTokenAxios = axios.create({ baseURL });
const noTokenAxios = axios.create({ baseURL });

const token = useGetTokenFromCookie();

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
  products: '/products?_limit=15',
  usersMe: '/users/me',
};

export { withTokenAxios, noTokenAxios, baseURL };
