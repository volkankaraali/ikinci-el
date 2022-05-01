import React, { useEffect, useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import baseURL from '../constants/constants';
import LoadingCircleIcons from '../constants/icons/LoadingCircleIcons';
import { useAuth } from '../context/AuthProviderContext';
import { deleteOffer, getOffer } from '../services/offerService';
import OfferModal from '../components/OfferModal';
import useDisplayErrorMess from '../hooks/useDisplayErrorMess';
import { getProductById, putProductSold } from '../services/productService';
import BuyModal from '../components/BuyModal';
import useDisplaySuccessMess from '../hooks/useDisplaySuccessMes';



function ProductDetail() {
  const { id } = useParams();
  const { auth } = useAuth();

  const [product, setProduct] = useState({});
  const [userOffer, setUserOffer] = useState({});

  const [isOffer, setIsOffer] = useState(false);
  const [isSold, setIsSold] = useState(false);
  const [activeOfferInModal, setActiveOfferInModal] = useState('');
  const [offer, setOffer] = useState({});

  const [loading, setLoading] = useState(false);
  const [getOfferLoading, setGetOfferLoading] = useState(false);
  const [removeOfferLoading, setRemoveOfferLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);

  //for chakra modal
  const { isOpen: isOfferOpen, onOpen: onOfferOpen, onClose: onOfferClose } = useDisclosure();
  const { isOpen: isBuyOpen, onOpen: onBuyOpen, onClose: onBuyClose } = useDisclosure();

  useEffect(() => {
    getProduct();
  }, [isOffer, isSold]);


  const getProduct = async () => {
    setLoading(true);
    const res = await getProductById(id);
    const data = res.data;
    setProduct(data);
    //if auth context has id, that mean user is loggin. offers will be shown.
    let offers = data.offers;
    let isUserOffer = offers.filter(offer => offer.users_permissions_user == auth.id);
    setUserOffer(isUserOffer);
    setLoading(false);
  };

  const getOfferFunc = async () => {
    setGetOfferLoading(true);
    let newOffer;
    if (offer.isTextOffer) {
      newOffer = offer.value;
    }
    else {
      newOffer = (product.price * offer.value) / 100;
    }

    await getOffer(product.id, auth.id, newOffer);
    setIsOffer(true);
    setOffer({});
    setActiveOfferInModal('');
    document.querySelector('[type="number"]').value = '';
    let radioChecked = document.querySelector('[type="radio"]:checked');
    if (radioChecked) {
      radioChecked.checked = false;
    }
    setGetOfferLoading(false);
    onOfferClose();
  };

  const removeOffer = async (offerId) => {
    setRemoveOfferLoading(true);
    await deleteOffer(offerId);
    setRemoveOfferLoading(false);
    setIsOffer(false);
  };

  const getBuyFunc = async (id) => {
    setBuyLoading(true);
    const res = await putProductSold(id);
    if (res.status == 200) {
      setBuyLoading(false);
      useDisplaySuccessMess('Satın Alındı');
    }
    else {
      setBuyLoading(true);
    }
    onBuyClose();
    setIsSold(true);
  };

  const openModalsIfLoggin = (state) => {
    //if there is not token in auth. do not offer or buy.
    if (!auth.authToken) {
      useDisplayErrorMess('Lütfen giriş yapınız.');
    }
    else {
      if (state == 'Satın Al') {
        return onBuyOpen();
      }
      if (state == 'Teklif Ver') {
        return onOfferOpen();
      }
    }
  };

  return (
    <div className='productDetail'>

      <div className="productCard">
        {
          loading ? <LoadingCircleIcons size={30} /> :
            <>
              <img src={`${baseURL}${product?.image?.url}`} alt={product.name} />
              <div className='productBody'>

                <h1 className='title'>{product.name}</h1>

                <div className='details'>
                  <div className='brand'>Marka:</div>
                  <div>{product.brand}</div>
                </div>

                <div className='details'>
                  <div className='color'>Renk:</div>
                  <div>{product.color}</div>
                </div>

                <div className='details'>
                  <div className='status'>Kullanım Durumu:</div>
                  <div>{product.status}</div>
                </div>

                <div className='price'>
                  {product.price} TL
                  {
                    !product.isSold &&
                    userOffer.length > 0 &&
                    <div className='offer'>Verilen Teklif: <span>{userOffer[0]?.offerPrice.toLocaleString()} TL</span>  </div>
                  }
                </div>

                {
                  product?.isSold
                    ? <div className='soldContainer'><div className='sold'>Bu Ürün Satışta Değil</div></div>
                    :
                    <div className='buttons'>

                      <button className='buy' onClick={() => openModalsIfLoggin('Satın Al')} >Satın Al</button>
                      {
                        userOffer.length > 0
                          ?
                          <button className='offer' disabled={removeOfferLoading && true} onClick={() => removeOffer(userOffer[0]?.id)}>
                            {removeOfferLoading ? <LoadingCircleIcons size={20} /> : 'Teklifi Geri Çek'}
                          </button>
                          : product.isOfferable && <button className='offer' onClick={() => openModalsIfLoggin('Teklif Ver')}>Teklif Ver</button>

                      }

                    </div>
                }



                <div className='description'>
                  <div>Açıklama</div>
                  <p>{product.description}</p>
                </div>

              </div >
            </>
        }
      </div >
      <OfferModal
        isOfferOpen={isOfferOpen}
        onOfferClose={onOfferClose}
        getOfferLoading={getOfferLoading}
        activeOfferInModal={activeOfferInModal}
        setActiveOfferInModal={setActiveOfferInModal}
        setOffer={setOffer}
        getOfferFunc={getOfferFunc}
        product={product}
      />
      <BuyModal
        isBuyOpen={isBuyOpen}
        onBuyClose={onBuyClose}
        productId={product?.id}
        getBuyFunc={getBuyFunc}
        buyLoading={buyLoading}
      />

    </div >
  );
}

export default ProductDetail;