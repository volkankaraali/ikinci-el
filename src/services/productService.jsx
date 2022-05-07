import { noTokenAxios, URL, withTokenAxios } from '../constants/axios';


export const getProducts = async () => {
  try {
    const res = await noTokenAxios.get(URL.products + '?_limit=200');
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
    //console.log(error.response);
    return error.response;
  }
};

export const getMyProducts = async (userId) => {
  try {
    const res = await withTokenAxios.get(URL.products + '?users_permissions_user=' + userId);
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

export const getAllProductCount = async () => {
  try {
    const res = await noTokenAxios.get(URL.products + '/count');
    return res.data;
  } catch (error) {
    console.log(error.response);

  }
};

export const addProduct = async (formData) => {
  try {
    const res = await withTokenAxios.post(URL.products, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res;
  } catch (error) {
    console.log(error.response);

  }
};