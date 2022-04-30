/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import LoadingCircleIcon from '../constants/icons/LoadingCircleIcons';

function ModalForm({ getOfferLoading, activeOfferInModal, setOffer, setActiveOfferInModal, getOfferFunc }) {




  useEffect(() => {
    const offers = document.querySelector('.offers');
    if (offers) {
      offers.addEventListener('click', e => {
        let inputType = e.target.type;
        if (inputType === 'number') {
          setOffer('');
          offers.querySelectorAll('[type="radio"]:checked').forEach(e => e.checked = false);
          offers.querySelector('[type="number"]').disabled = false;
          offers.querySelector('[type="number"]').value = '';
          offers.querySelector('[type="number"]').focus();

        }
        if (inputType === 'radio') {
          offers.querySelector('[type="number"]').value = '';
          offers.querySelector('[type="number"]').disabled = true;
        }
      });
    }
  }, []);

  const handleOffer = (offer) => {
    setOffer({ value: offer, isTextOffer: false });
  };

  const handleTextOffer = (e) => {
    setOffer({ value: e.target.value, isTextOffer: true });
  };

  const handleActiveOffer = (offerName) => {
    setActiveOfferInModal(offerName);
  };



  return (
    <div className='offers'>
      <label className={`${activeOfferInModal === 'offer1' ? 'activeOffer' : ''}`}>
        <input type="radio" name='offer' onClick={() => { handleOffer('20'); handleActiveOffer('offer1'); }} />
        %20’si Kadar Teklif Ver
      </label>

      <label className={`${activeOfferInModal === 'offer2' ? 'activeOffer' : ''}`}>
        <input type="radio" name='offer' onClick={() => { handleOffer('30'); handleActiveOffer('offer2'); }} />
        %30’si Kadar Teklif Ver
      </label>

      <label className={`${activeOfferInModal === 'offer3' ? 'activeOffer' : ''}`}>
        <input type="radio" name='offer' onClick={() => { handleOffer('40'); handleActiveOffer('offer3'); }} />
        %40’si Kadar Teklif Ver
      </label>

      <label className={`textOfferLabel ${activeOfferInModal === 'offer4' ? 'activeOffer' : ''}`}>
        <input className='textOffer' type="number" placeholder='Teklif Belirle' onClick={() => handleActiveOffer('offer4')} onChange={e => handleTextOffer(e)} />
        <span>TL</span>
      </label>

      <div className='buttonContainer'>
        <button type='submit' disabled={getOfferLoading && true} onClick={() => getOfferFunc()}>
          {
            getOfferLoading ? <LoadingCircleIcon color='white' size={20} /> : 'Onayla'
          }
        </button>
      </div>
    </div>

  );
}

export default ModalForm;