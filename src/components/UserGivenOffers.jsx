import React, { useState } from 'react';
import baseURL from '../constants/constants';
import LoadingCircleIcon from '../constants/icons/LoadingCircleIcons';

function UserGivenOffers({ offer, product, buyProduct }) {

  const [loading, setLoading] = useState(false);

  const handleBuyButton = async (productId) => {
    setLoading(true);
    await buyProduct(productId);
    setLoading(false);
  };

  return (
    <div className='givenOffers'>
      <img src={baseURL + product?.image?.url} alt={product?.name} />
      <div className='offerContainer'>
        <div className='info'>
          <h1>{product?.name}</h1>
          <div>
            Verilen Teklif : <span>{offer?.offerPrice} TL</span>
          </div>
        </div>
        <div className='buttons'>
          {
            loading
              ? <LoadingCircleIcon size={30} />
              : offer?.isStatus && (
                product?.isSold
                  ? <div className='bought'>Satın alındı.</div>
                  : <button className='confirm' onClick={() => handleBuyButton(product?.id)} >Satın Al</button>
              )
          }
          {
            offer?.isStatus !== null
              ? (
                offer?.isStatus
                  ? <div className='offerAccept'>Onaylandı</div>
                  : <div className='offerReject'>Reddedildi</div>
              )
              : <div className='offerWaiting'>Teklif Değerlendiriliyor.</div>

          }
        </div>
      </div>
    </div>
  );
}

export default UserGivenOffers;