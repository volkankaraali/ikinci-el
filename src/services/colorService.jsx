import { noTokenAxios, URL } from '../constants/axios';

export const getAllColor = async () => {
  try {
    const res = await noTokenAxios.get(URL.colors);
    return res;

  } catch (error) {
    console.log(error.response);
  }
};