import React from 'react';
import { createStandaloneToast } from '@chakra-ui/react';
import TickIcon from '../constants/icons/TickIcon';

const toast = createStandaloneToast();

const useDisplaySuccessMess = (succesMes) => (
  toast({
    position: 'top-right',
    duration: 2000,
    render: () => (
      <div className='successmes' >
        <TickIcon />
        {succesMes}
      </div>
    ),
  })
);

export default useDisplaySuccessMess;