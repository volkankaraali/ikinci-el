import { withTokenAxios, URL } from '../constants/axios';

export const getOffer = async (productId, userId, offerPrice) => {
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
