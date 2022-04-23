import React from 'react';

import registerLoginImage from '../images/registerLoginImage.png';
import RegisterForm from '../components/RegisterForm';
import Logo from '../constant/icons/Logo';
// import { Button, useToast } from '@chakra-ui/react';
// import ExclamationMark from '../constant/icons/ExclamationMark';

function Register() {
  //const toast = useToast();
  return (
    <div className='register'>
      <div className='leftSide'>
        <img src={registerLoginImage} alt="ikinci el" />
      </div>
      <div className='rightSide'>
        <Logo className='logo' />

        <div className='registerInfo'>
          <h1>Üye Ol</h1>
          <p>Fırsatlardan yararlanmak için üye ol!</p>
          <RegisterForm />
          {/* <Button
            onClick={() =>
              toast({
                render: () => (
                  <div className='errormes'>
                    <ExclamationMark />
                    Emailinizi veya şifreniz hatalı.</div>
                ),
              })
            }
          >
            Show Toast
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default Register;