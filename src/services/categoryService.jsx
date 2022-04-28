import { noTokenAxios, URL } from '../constant/axios';


export const getCategories = async () => {
  try {
    const res = await noTokenAxios.get(URL.categories);
    return res;
  } catch (error) {
    console.log(error);
  }
};