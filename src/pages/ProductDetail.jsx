import React, { useEffect, useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import baseURL from '../constants/constants';
import { getProductById } from '../services/productService';
import LoadingCircleIcons from '../constants/icons/LoadingCircleIcons';
import { useAuth } from '../context/AuthProviderContext';
import { deleteOffer, getOffer } from '../services/offerService';
import OfferModal from '../components/OfferModal';



function ProductDetail() {
  const { id } = useParams();
  const { auth } = useAuth();

  const [product, setProduct] = useState({});
  const [userOffer, setUserOffer] = useState({});

  const [isOffer, setIsOffer] = useState(false);
  const [activeOfferInModal, setActiveOfferInModal] = useState('');
  const [offer, setOffer] = useState({});

  const [loading, setLoading] = useState(false);
  const [getOfferLoading, setGetOfferLoading] = useState(false);
  const [removeOfferLoading, setRemoveOfferLoading] = useState(false);

  //for chakra modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getProduct();
  }, [isOffer]);

  const getProduct = async () => {
    setLoading(true);
    const res = await getProductById(id);
    const data = res.data;
    setProduct(data);
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
    onClose();
  };

  const removeOffer = async (offerId) => {
    setRemoveOfferLoading(true);
    await deleteOffer(offerId);
    setRemoveOfferLoading(false);
    setIsOffer(false);
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
                    userOffer.length > 0 &&
                    <div className='offer'>Verilen Teklif: <span>{userOffer[0]?.offerPrice.toLocaleString()} TL</span>  </div>
                  }
                </div>


                <div className='buttons'>
                  <button className='buy'>Satın Al</button>
                  {
                    userOffer.length > 0
                      ?
                      <button className='offer' disabled={removeOfferLoading && true} onClick={() => removeOffer(userOffer[0]?.id)}>
                        {removeOfferLoading ? <LoadingCircleIcons size={20} /> : 'Teklifi Geri Çek'}
                      </button>
                      : product.isOfferable && <button className='offer' onClick={() => onOpen()}>Teklif Ver</button>

                  }

                </div>

                <div className='description'>
                  <div>Açıklama</div>
                  <p>{product.description}</p>
                </div>

              </div >
            </>
        }
      </div >
      <OfferModal
        isOpen={isOpen}
        onClose={onClose}
        getOfferLoading={getOfferLoading}
        activeOfferInModal={activeOfferInModal}
        setActiveOfferInModal={setActiveOfferInModal}
        setOffer={setOffer}
        getOfferFunc={getOfferFunc}
        product={product}
      />

    </div >
  );
}

export default ProductDetail;