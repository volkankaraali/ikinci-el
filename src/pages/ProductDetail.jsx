import React, { useEffect, useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import baseURL from '../constants/constants';
import LoadingCircleIcons from '../constants/icons/LoadingCircleIcons';
import { useAuth } from '../context/AuthProviderContext';

import { deleteOffer, addOffer } from '../services/offerService';
import OfferModal from '../components/OfferModal';
import useDisplayErrorMess from '../hooks/useDisplayErrorMess';
import { getProductById, putProductSold } from '../services/productService';
import BuyModal from '../components/BuyModal';
import useDisplaySuccessMess from '../hooks/useDisplaySuccessMes';
import NoImage from '../images/undefinedProduct.jpg';


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
  const [noFindProduct, setNoFindProduct] = useState(false);

  //for chakra modal
  const { isOpen: isOfferOpen, onOpen: onOfferOpen, onClose: onOfferClose } = useDisclosure();
  const { isOpen: isBuyOpen, onOpen: onBuyOpen, onClose: onBuyClose } = useDisclosure();


  useEffect(() => {
    getProduct();
    //auto scroll to top.
    window.scrollTo(0, 0);
  }, [isOffer, isSold]);

  useEffect(() => {
  }, [isOffer, isSold]);



  const getProduct = async () => {
    setLoading(true);
    const res = await getProductById(id);
    console.log(res);
    if (res.status == 200) {
      setProduct(res.data);
      //if auth context has id, that mean user is loggin. offers will be shown.
      let offers = res?.data?.offers;
      let isUserOffer = offers.filter(offer => offer.users_permissions_user === auth.id);
      setUserOffer(isUserOffer);
      setLoading(false);
    }
    else {
      setNoFindProduct(true);
      setLoading(false);
    }
  };

  const addOfferFunc = async () => {
    setGetOfferLoading(true);
    let newOffer;
    if (offer.isTextOffer) {
      newOffer = offer.value;
    }
    else {
      newOffer = (product.price * offer.value) / 100;
    }

    await addOffer(product?.id, auth?.id, newOffer);
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
      useDisplaySuccessMess('Sat??n Al??nd??');
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
      useDisplayErrorMess('L??tfen giri?? yap??n??z.');
    }
    else {
      if (state == 'Sat??n Al') {
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
          loading ? <LoadingCircleIcons size={30} />
            : (
              noFindProduct ? <div className='noFoundProduct'>B??yle bir ??r??n bulunmamakta.</div>
                :
                <>
                  <img src={product?.image?.url ? baseURL + product?.image?.url : NoImage} alt={product.name} />
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
                      <div className='status'>Kullan??m Durumu:</div>
                      <div>{product.status}</div>
                    </div>

                    <div className='price'>
                      {product.price} TL
                      {
                        !product.isSold && (
                          auth?.authToken &&
                          userOffer.length > 0 &&
                          <div className='offer'>Verilen Teklif: <span>{userOffer[0]?.offerPrice.toLocaleString()} TL</span>  </div>
                        )

                      }
                    </div>

                    {
                      product?.isSold
                        ? <div className='soldContainer'><div className='sold'>Bu ??r??n Sat????ta De??il</div></div>
                        :
                        <div className='buttons'>

                          <button className='buy' onClick={() => openModalsIfLoggin('Sat??n Al')} >Sat??n Al</button>
                          {
                            auth?.authToken
                              ? (
                                userOffer.length > 0
                                  ?
                                  <button className='offer' disabled={removeOfferLoading && true} onClick={() => removeOffer(userOffer[0]?.id)}>
                                    {removeOfferLoading ? <LoadingCircleIcons size={20} /> : 'Teklifi Geri ??ek'}
                                  </button>
                                  : product.isOfferable && <button className='offer' onClick={() => openModalsIfLoggin('Teklif Ver')}>Teklif Ver</button>)
                              : <button className='offer' onClick={() => openModalsIfLoggin('Teklif Ver')}>Teklif Ver</button>
                          }

                        </div>
                    }



                    <div className='description'>
                      <div>A????klama</div>
                      <p>{product.description}</p>
                    </div>

                  </div >
                </>
            )
        }
      </div >
      <OfferModal
        isOfferOpen={isOfferOpen}
        onOfferClose={onOfferClose}
        getOfferLoading={getOfferLoading}
        activeOfferInModal={activeOfferInModal}
        setActiveOfferInModal={setActiveOfferInModal}
        setOffer={setOffer}
        addOfferFunc={addOfferFunc}
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