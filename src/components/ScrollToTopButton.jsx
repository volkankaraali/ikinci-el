/* eslint-disable no-unused-vars */
import { Affix, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import React from 'react';
import UpArrowIcon from '../constants/icons/UpArrowIcon';

function ScrollToTopButton() {
  const [scroll, scrollTo] = useWindowScroll();
  return (
    <div >
      <Affix className='scrollTop' position={{ bottom: 60, right: 10 }} >
        <Transition transition="slide-up" mounted={scroll.y > 100}>
          {(transitionStyles) => (
            <button

              className='scrollTopButton'
              onClick={() => scrollTo({ y: 0 })}
            >
              <UpArrowIcon size={20} color='white' />
            </button>
          )}
        </Transition>
      </Affix>
    </div>
  );
}

export default ScrollToTopButton;