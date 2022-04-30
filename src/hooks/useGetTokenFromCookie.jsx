const useGetTokenFromCookie = () => {
  let cookie = document.cookie;
  let arr = cookie.split('=');
  return arr[1];
};

export default useGetTokenFromCookie;