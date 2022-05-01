/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from 'axios';
import { useAuth } from '../context/AuthProviderContext';
import useGetTokenFromCookie from '../hooks/useGetTokenFromCookie';
import baseURL from './constants';


const withTokenAxios = axios.create({ baseURL });
const noTokenAxios = axios.create({ baseURL });


const token = useGetTokenFromCookie();
//console.log(tokenAxios);

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
