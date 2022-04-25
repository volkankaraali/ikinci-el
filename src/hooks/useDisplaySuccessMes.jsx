import React from 'react';
import { createStandaloneToast } from '@chakra-ui/react';

const toast = createStandaloneToast();

const useDisplaySuccessMess = (succesMes) => (
  toast({
    position: 'top-right',
    duration: 2000,
    render: () => (
      <div className='successmes' >
        {succesMes}
      </div>
    ),
  })
);

export default useDisplaySuccessMess;