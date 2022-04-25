import React, { useEffect, useState } from 'react';

import registerLoginImage from '../images/registerLoginImage.png';
import RegisterLoginForm from '../components/RegisterLoginForm';
import Logo from '../constant/icons/Logo';
import { useAuth } from '../context/AuthProviderContext';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../services/userService';

import displayErrorMess from '../hooks/displayErrorMess';

function Register() {

  const navigator = useNavigate();

  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const setRegister = async (auth) => {
    setLoading(true);
    const res = await postRegister(auth.password, auth.email, auth.password);
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

      setTimeout(() => {
        navigator('/');
      }, 2000);
    }
  };

  useEffect(() => {
    if (auth.authToken) {
      return navigator('/');
    }
  }, []);



  return (
    <div className='register'>
      <div className='leftSide'>
        <img src={registerLoginImage} alt="ikinci el" />
      </div>
      <div className='rightSide'>
        <Logo className='logo' />

        <div className='registerInfoDiv'>
          <div className='title'>Üye Ol</div>
          <div className='subTitle'>Fırsatlardan yararlanmak için üye ol!</div>
          <RegisterLoginForm setRegister={setRegister} loading={loading} buttonText={'Üye Ol'} />
          <div className='footer'>
            Hesabın mı var? <span>Giriş yap</span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;