import { createStandaloneToast } from '@chakra-ui/react';
import React from 'react';
import ExclamationMark from '../constant/icons/ExclamationMark';

function Login() {
  const toast = createStandaloneToast();
  // eslint-disable-next-line no-unused-vars
  const displayErrorMess = () => (
    toast({
      position: 'top-right',
      render: () => (
        <div className='errormes' >
          <ExclamationMark />
          Emailinizi veya şifreniz hatalı.
        </div>
      ),
    })
  );
  return (
    <div className='login'>Login</div>
  );
}

export default Login;