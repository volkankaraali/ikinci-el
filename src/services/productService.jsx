import axios, { URL } from '../constant/axios';


export const getProducts = async () => {
  try {
    const res = await axios.get(URL.products);
    return res;
  } catch (error) {
    console.log(error);
  }
};