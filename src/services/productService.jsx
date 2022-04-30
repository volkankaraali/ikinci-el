import { noTokenAxios, withTokenAxios, URL } from '../constants/axios';


export const getProducts = async () => {
  try {
    const res = await noTokenAxios(URL.products + '?_limit=15');
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getProductById = async (id) => {
  try {
    const res = await withTokenAxios(URL.products + `/${id}`);
    return res;
  } catch (error) {
    console.log(error.response.data);

  }
};