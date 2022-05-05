import { noTokenAxios, URL } from '../constants/axios';

export const getAllUsingStatus = async () => {
  try {
    const res = await noTokenAxios.get(URL.usingStatus);
    return res;

  } catch (error) {
    console.log(error.response);
  }
};