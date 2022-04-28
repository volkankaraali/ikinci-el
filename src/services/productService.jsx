import { noTokenAxios, URL } from '../constant/axios';


export const getProducts = async () => {
  try {
    const res = await noTokenAxios(URL.products);
    return res;
  } catch (error) {
    console.log(error);
  }
};