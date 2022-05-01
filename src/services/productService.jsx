import { noTokenAxios, URL, withTokenAxios } from '../constants/axios';


export const getProducts = async () => {
  try {
    const res = await noTokenAxios.get(URL.products + '?_limit=15');
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getProductById = async (id) => {
  try {
    const res = await noTokenAxios.get(URL.products + `/${id}`);
    return res;
  } catch (error) {
    console.log(error.response.data);

  }
};

export const putProductSold = async (id) => {
  try {
    const res = await withTokenAxios.put(URL.products + `/${id}`, { isSold: true });
    return res;
  } catch (error) {
    console.log(error.response);
  }
};