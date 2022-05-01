import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import React from 'react';
import LoadingCircleIcon from '../constants/icons/LoadingCircleIcons';

function BuyModal({ buyLoading, isBuyOpen, onBuyClose, productId, getBuyFunc }) {
  return (
    <>
      <Modal padding='20px' isOpen={isBuyOpen} onClose={onBuyClose} isCentered closeOnOverlayClick={true} >
        <ModalOverlay filter='opacity(0.7);background-color:#4b9ce2' />
        <ModalContent width={{ sm: '355px', md: '375px' }} >
          <div className='buyModal'>

            <div className='modalBody'>
              <h1>Satın Al</h1>
              <h5>Satın Almak istiyor musunuz?</h5>
              <div className='buttons'>
                <button className='remove' onClick={() => onBuyClose()} >Vazgeç</button>
                <button className='buy' onClick={() => getBuyFunc(productId)} >
                  {
                    buyLoading ? <LoadingCircleIcon size={20} color='white' /> : 'Satın Al'
                  }
                </button>
              </div>
            </div>

          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BuyModal;