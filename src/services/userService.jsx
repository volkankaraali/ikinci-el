import axios, { URL } from '../constant/axios';

//username must be same with password
export const getRegister = async (username, email, password) => {
  try {
    const res = await axios.post(URL.register, { username, email, password });
    return res;
  } catch (error) {
    if (error.response?.status === 400) {
      return {
        status: error.response?.status,
        message: error.response?.data?.message[0]?.messages[0]?.message
      };

    }
  }
};


export const getLogin = async (email, password) => {
  try {
    const res = await axios.post(URL.login, { identifier: email, password });
    return res;
  } catch (error) {
    if (error.response?.status === 400) {
      return {
        status: error.response?.status,
        message: error.response?.data?.message[0]?.messages[0]?.message
      };

    }
  }
};