import { noTokenAxios, withTokenAxios, URL } from '../constants/axios';

export const getRegister = async (username, email, password) => {
  try {
    const res = await noTokenAxios.post(URL.register, { username, email, password });
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
    const res = await noTokenAxios.post(URL.login, { identifier: email, password });
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

export const getUserMe = async () => {
  // let token = useGetTokenFromCookie();
  // const config = { headers: { Authorization: `Bearer ${token}` } };
  try {
    const res = await withTokenAxios.get(URL.usersMe);
    return res;
  } catch (error) {
    console.log(error.response);
  }
};