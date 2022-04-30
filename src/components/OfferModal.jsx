import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import React from 'react';
import baseURL from '../constants/constants';
import CloseIcon from '../constants/icons/CloseIcon';
import ModalForm from './ModalForm';

function OfferModal({ isOpen, onClose, getOfferLoading, product, activeOfferInModal, setActiveOfferInModal, setOffer, getOfferFunc }) {
  return (
    <>
      <Modal padding='20px' isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={true} size='md'>
        <ModalOverlay filter='opacity(0.7);background-color:#4b9ce2' />
        <ModalContent >
          <div className='modal'>

            <div className='modalHeader'>
              <h1>Teklif Ver</h1>
              <div className='closeIcon' onClick={() => onClose()}><CloseIcon /></div>
            </div>

            <div className="modalProduct">
              <div className='detail'>
                <img src={baseURL + product.image?.url} alt={product.name} />
                <div className='info'>
                  <div className='title'>{product.name}</div>
                  <div className='price'>{product.price} TL</div>
                </div>
              </div>
            </div>

            <div className='modalOffers'>
              <ModalForm getOfferLoading={getOfferLoading} activeOfferInModal={activeOfferInModal} setActiveOfferInModal={setActiveOfferInModal} setOffer={setOffer} getOfferFunc={getOfferFunc} />
            </div>

          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default OfferModal;