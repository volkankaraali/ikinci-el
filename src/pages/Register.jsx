import React, { useEffect, useState } from 'react';

import registerLoginImage from '../images/registerLoginImage.png';
import RegisterForm from '../components/RegisterForm';
import Logo from '../constants/icons/Logo';
import { useAuth } from '../context/AuthProviderContext';
import { Link, useNavigate } from 'react-router-dom';
import { getRegister } from '../services/userService';

import useDisplayErrorMess from '../hooks/useDisplayErrorMess';
import useDisplaySuccessMess from '../hooks/useDisplaySuccessMes';

function Register() {

  const navigator = useNavigate();

  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //if there is authtoken in cookie that will be navigate to home.
    // let token = useGetTokenFromCookie();
    // token && navigator('/');
    auth?.authToken && navigator('/');
  }, []);

  const getRegisterFunc = async (auth) => {
    setLoading(true);
    //api has username,email and password. but we dont get username from user. so use username as email.
    const res = await getRegister(auth.email, auth.email, auth.password);
    if (res.status === 400) {
      console.log(res.message);
      useDisplayErrorMess(res.message);
      setLoading(false);
    }
    else {
      setAuth({ id: res.data?.user?.id, email: auth.email, authToken: res.data?.jwt });
      document.cookie = `Auth_Token=${res.data?.jwt}`;
      setLoading(false);
      useDisplaySuccessMess('Registered successfully.');
      setTimeout(() => {
        navigator('/');
      }, 3000);
    }
  };


  return (
    <div className='register'>
      <div className='leftSide'>
        <img src={registerLoginImage} alt="ikinci el" />
      </div>
      <div className='rightSide'>
        <div className='logo'><Logo width={224} height={73} /></div>


        <div className='registerInfoDiv'>
          <div className='title'>Üye Ol</div>
          <div className='subTitle'>Fırsatlardan yararlanmak için üye ol!</div>
          <RegisterForm getRegisterFunc={getRegisterFunc} loading={loading} buttonText={'Üye Ol'} />
          <div className='footer'>
            Hesabın mı var? <span><Link to='/login'>Giriş Yap</Link></span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;