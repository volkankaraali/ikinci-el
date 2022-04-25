import React from 'react';
import { createStandaloneToast } from '@chakra-ui/react';
import ExclamationMark from '../constant/icons/ExclamationMark';

const toast = createStandaloneToast();

const displayErrorMess = (errorMes) => (
  toast({
    position: 'top-right',
    duration: 2000,
    render: () => (
      <div className='errormes' >
        <ExclamationMark />
        {errorMes}
      </div>
    ),
  })
);

export default displayErrorMess;