import axios, { URL } from '../constant/axios';


export const getCategories = async () => {
  try {
    const res = await axios.get(URL.categories);
    return res;
  } catch (error) {
    console.log(error);
  }
};