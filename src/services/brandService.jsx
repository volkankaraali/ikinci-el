import { noTokenAxios, URL } from '../constants/axios';

export const getAllBrand = async () => {
  try {
    const res = await noTokenAxios.get(URL.brands);
    return res;

  } catch (error) {
    console.log(error.response);
  }
};