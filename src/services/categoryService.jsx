import { noTokenAxios, URL } from '../constants/axios';


export const getAllCategories = async () => {
  try {
    const res = await noTokenAxios.get(URL.categories);
    return res;
  } catch (error) {
    console.log(error);
  }
};