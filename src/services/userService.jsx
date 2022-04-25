import axios, { URL } from '../constant/axios';

//username must be same with password
export const postRegister = async (username, email, password) => {
  try {
    const res = await axios.post(URL.register, { username: username, email: email, password: password });
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