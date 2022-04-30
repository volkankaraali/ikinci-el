import React from 'react';
import { createStandaloneToast } from '@chakra-ui/react';
import ExclamationMarkIcon from '../constants/icons/ExclamationMarkIcon';

const toast = createStandaloneToast();

const useDisplayErrorMess = (errorMes) => (
  toast({
    position: 'top-right',
    duration: 2000,
    render: () => (
      <div className='errormes' >
        <ExclamationMarkIcon />
        {errorMes}
      </div>
    ),
  })
);

export default useDisplayErrorMess;