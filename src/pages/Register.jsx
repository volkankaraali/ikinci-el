import React, { useEffect, useState } from 'react';

import registerLoginImage from '../images/registerLoginImage.png';
import RegisterForm from '../components/RegisterForm';
import Logo from '../constant/icons/Logo';
import { useAuth } from '../context/AuthProviderContext';
import { useNavigate } from 'react-router-dom';
import { getRegister } from '../services/userService';

import useDisplayErrorMess from '../hooks/useDisplayErrorMess';
import useDisplaySuccessMess from '../hooks/useDisplaySuccessMes';
import useGetTokenFromCookie from '../hooks/useGetTokenFromCookie';

function Register() {

  const navigator = useNavigate();

  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    //if there is authtoken in cookie that will be navigate to home.
    let token = useGetTokenFromCookie();
    token && navigator('/');
  }, []);

  const getRegisterFunc = async (auth) => {
    setLoading(true);
    const res = await getRegister(auth.password, auth.email, auth.password);
    console.log(res);
    if (res.status === 400) {
      console.log(res.message);
      useDisplayErrorMess(res.message);
      setLoading(false);
    }
    else {
      setAuth({ id: res.data?.user?.id, email: auth.email, authToken: res.data?.jwt });
      localStorage.setItem('email', auth.email);
      localStorage.setItem('id', res.data?.user?.id);
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
            Hesabın mı var? <span>Giriş yap</span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;