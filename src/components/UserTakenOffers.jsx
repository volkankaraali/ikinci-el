/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import baseURL from '../constants/constants';
import LoadingCircleIcon from '../constants/icons/LoadingCircleIcons';

function UserTakenOffers({ product, offer, acceptOffer, rejectOffer }) {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, [loading]);


  const handleOffer = async (status) => {
    setLoading(true);
    if (status) {
      await acceptOffer(offer.id);
      setLoading(false);
    }
    else {
      await rejectOffer(offer.id);
      setLoading(false);
    }
  };

  return (
    <div className='takenOffers'>
      <img src={baseURL + product?.image?.url} alt={product?.name} />
      <div className='offerContainer'>
        <div className='info'>
          <h1>{product?.name}</h1>
          <div>
            Alınan Teklif : <span>{offer.offerPrice} </span>
          </div>
        </div>
        <div className='buttons'>

          {
            loading
              ? <LoadingCircleIcon size={30} />
              : (
                offer.isStatus === null
                  ?
                  <>
                    <button className='confirmBtn' onClick={() => handleOffer(true)} >Onayla</button>
                    <button className='rejectBtn' onClick={() => handleOffer(false)}>Reddet</button>
                  </>
                  : <div className={`offerStatus ${offer.isStatus ? 'accept' : 'reject'}`}>{offer.isStatus ? 'Onaylandı' : 'Reddedildi'}</div>
              )
          }
        </div>
      </div>
    </div>
  );
}

export default UserTakenOffers;