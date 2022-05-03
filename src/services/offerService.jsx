import { withTokenAxios, URL } from '../constants/axios';

export const addOffer = async (productId, userId, offerPrice) => {
  try {
    const res = await withTokenAxios.post(URL.offers, { product: productId, users_permissions_user: userId, offerPrice });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOffer = async (offerId) => {
  try {
    const res = await withTokenAxios.delete(`${URL.offers}/${offerId}`, { id: offerId });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOffers = async (limit) => {
  try {
    const res = await withTokenAxios.get(URL.offers + '?_limit=' + limit);
    return res;
  } catch (error) {
    console.log(error.response);
  }
};

export const getAllOffersCount = async () => {
  try {
    const res = await withTokenAxios.get(URL.offers + '/count');
    return res;
  } catch (error) {
    console.log(error.response);

  }
};

export const setOfferStatus = async (offerId, status) => {
  try {
    const res = await withTokenAxios.put(URL.offers + '/' + offerId, { isStatus: status });
    return res;
  } catch (error) {
    console.log(error.response);

  }
};

export const getOffersByUserId = async (userId) => {
  try {
    const res = await withTokenAxios.get(URL.offers + '?users_permissions_user=' + userId);
    return res;
  } catch (error) {
    console.log(error.response);

  }
};