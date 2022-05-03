import React, { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import UserGivenOffers from '../components/UserGivenOffers';
import UserTakenOffers from '../components/UserTakenOffers';
import LoadingCircleIcon from '../constants/icons/LoadingCircleIcons';
import LogoutIcon from '../constants/icons/LogoutIcon';
import UserPhotoIcon from '../constants/icons/UserPhotoIcon';
import { useAuth } from '../context/AuthProviderContext';
import { getOffersByUserId, setOfferStatus } from '../services/offerService';
import { getMyProducts, putProductSold } from '../services/productService';
import useDisplaySuccessMess from '../hooks/useDisplaySuccessMes';
import useDisplayErrorMess from '../hooks/useDisplayErrorMess';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  //const { username } = useParams();
  const { auth, setAuth } = useAuth();
  const navigator = useNavigate();

  const [userProductsExistOffer, setUserProductsExistOffer] = useState([]);
  const [userOffers, setUserOffers] = useState([]);

  const [userOfferLoading, setUserOfferLoading] = useState(false);
  const [userProductOfferLoading, setUserProductOfferLoading] = useState(false);
  const [offerStatusChange, setOfferStatusChange] = useState(false);

  useEffect(() => {
    getUserOffersFunc();
    getUserProductsOffer();
  }, [offerStatusChange]);


  const getUserOffersFunc = async () => {
    setUserOfferLoading(true);

    //gets offers of logged in user.
    const userOffers = await getOffersByUserId(auth.id);
    setUserOffers(userOffers.data);
    setUserOfferLoading(false);

  };

  const getUserProductsOffer = async () => {
    setUserProductOfferLoading(true);
    //gets products of the logged in user.the products are filtered according to the number of offers.
    const myProducts = await getMyProducts(auth.id);
    const myProductsHasOffers = myProducts.data.filter(product => product?.offers.length > 0);
    setUserProductsExistOffer(myProductsHasOffers);
    setUserProductOfferLoading(false);

  };


  const acceptOffer = async (offerId) => {
    console.log('accept' + offerId);
    await setOfferStatus(offerId, true);
    setOfferStatusChange(true);
  };
  const rejectOffer = async (offerId) => {
    console.log('reject' + offerId);
    await setOfferStatus(offerId, false);
    setOfferStatusChange(true);
  };


  const buyProduct = async (productId) => {
    const res = await putProductSold(productId);
    if (res.status == 200) {
      useDisplaySuccessMess('Satın Alındı');
      setOfferStatusChange(true);
    }
    else {
      useDisplayErrorMess('İşlem başarısız. Daha sonra tekrar deneyin');
      setOfferStatusChange(true);
    }
  };

  const logout = () => {
    document.cookie = 'Auth_Token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    setAuth({});
    navigator('/');
  };

  return (
    <div className='userProfile'>
      <div className="userInfoContainer">
        <div className='info'>
          <UserPhotoIcon />
          <span>{auth.email}</span>
        </div>
        <div className='logoutContainer'>
          <div className='logout' onClick={() => logout()}>
            <LogoutIcon color='red' />
          </div>

        </div>
      </div>

      <div className="productInfo">
        <Tabs>
          <TabList>
            <Tab _selected={{ color: '#4b9ce2', fontWeight: 'bold', borderBottom: '2px solid #4b9ce2' }}>Teklif Aldıklarım</Tab>
            <Tab _selected={{ color: '#4b9ce2', fontWeight: 'bold', borderBottom: '2px solid #4b9ce2' }}>Teklif Verdiklerim</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {
                userProductOfferLoading && <LoadingCircleIcon size={30} />
              }
              {
                userProductsExistOffer.map(product => (
                  product?.offers.map(offer => (
                    <UserTakenOffers key={offer.id} product={product} offer={offer} acceptOffer={acceptOffer} rejectOffer={rejectOffer} />
                  ))
                ))
              }
              {
                userProductsExistOffer.length === 0 && <div className='emptyProduct'>Alınan teklif bulunmuyor.</div>
              }
            </TabPanel>
            <TabPanel>
              {
                userOfferLoading && <LoadingCircleIcon size={30} />
              }
              {
                userOffers.map(offer => (
                  <UserGivenOffers key={offer.id} product={offer?.product} offer={offer} buyProduct={buyProduct} />
                ))
              }
              {
                userOffers.length === 0 && <div className='emptyProduct'>Teklifiniz bulunmuyor.</div>
              }
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

export default UserProfile;