import React, { useEffect, useState } from 'react';

import registerLoginImage from '../images/registerLoginImage.png';
import RegisterForm from '../components/RegisterForm';
import Logo from '../constant/icons/Logo';
import { useAuth } from '../context/AuthProviderContext';
import { useNavigate } from 'react-router-dom';
import { getRegister } from '../services/userService';

import displayErrorMess from '../hooks/displayErrorMess';
import displaySuccessMess from '../hooks/displaySuccessMes';

function Register() {

  const navigator = useNavigate();

  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const getRegisterFunc = async (auth) => {
    setLoading(true);
    const res = await getRegister(auth.password, auth.email, auth.password);
    console.log(res);
    if (res.status === 400) {
      console.log(res.message);
      displayErrorMess(res.message);
      setLoading(false);
    }
    else {
      setAuth({ id: res.data?.user?.id, email: auth.email, authToken: res.data?.jwt });
      localStorage.setItem('email', auth.email);
      localStorage.setItem('id', res.data?.user?.id);
      document.cookie = `Auth_Token=${res.data?.jwt}`;
      setLoading(false);
      displaySuccessMess('Registered successfully.');
      setTimeout(() => {
        navigator('/');
      }, 2000);
    }
  };

  useEffect(() => {
    if (auth.authToken) {
      return navigator('/');
    }
  }, [auth.authToken]);

  return (
    <div className='register'>
      <div className='leftSide'>
        <img src={registerLoginImage} alt="ikinci el" />
      </div>
      <div className='rightSide'>
        <div className='logo'><Logo /></div>


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