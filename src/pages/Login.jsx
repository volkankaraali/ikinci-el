import React, { useEffect, useState } from 'react';

import registerLoginImage from '../images/registerLoginImage.png';
import Logo from '../constants/icons/Logo';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthProviderContext';
import useDisplaySuccessMess from '../hooks/useDisplaySuccessMes';
import useDisplayErrorMess from '../hooks/useDisplayErrorMess';
import { getLogin } from '../services/userService';
import { Link, useNavigate } from 'react-router-dom';



function Login() {

  const navigator = useNavigate();
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //if there is authtoken in cookie that will be navigate to home.
    // let token = useGetTokenFromCookie();
    // token && navigator('/');
    auth?.authToken && navigator('/');
  }, []);

  const getLoginFunc = async (auth) => {
    setLoading(true);
    const res = await getLogin(auth.email, auth.password);
    if (res.status === 400) {
      console.log(res.message);
      useDisplayErrorMess(res.message);
      setLoading(false);
    }
    else {
      setAuth({ id: res.data?.user?.id, email: auth.email, authToken: res?.data?.jwt });
      document.cookie = `Auth_Token=${res.data?.jwt}`;
      useDisplaySuccessMess('Login success.');
      setLoading(false);
      setTimeout(() => {
        navigator('/');
      }, 3000);
    }
  };




  return (
    <div className='login'>
      <div className='leftSide'>
        <img src={registerLoginImage} alt="ikinci el" />
      </div>
      <div className='rightSide'>
        <div className='logo'><Logo width={224} height={73} /></div>


        <div className='loginInfoDiv'>
          <div className='title'>Giriş Yap</div>
          <div className='subTitle'>Fırsatlardan yararlanmak için giriş yap!</div>
          <LoginForm getLoginFunc={getLoginFunc} loading={loading} buttonText={'Giriş Yap'} />
          <div className='footer'>
            Hesabın yok mu? <span><Link to='/register'>Üye Ol</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;