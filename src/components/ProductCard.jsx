import React from 'react';

import baseURL from '../constants/constants';
import NoImage from '../images/undefinedProduct.jpg';

function ProductCard(props) {

  const image = props?.product?.image?.url;
  return (
    <div className='productCard'>
      <div className='body'>
        <img src={image ? baseURL + image : NoImage} alt={props.product} />
        <div className='bodyHeader'>
          <span className='brand'>{props.product?.brand}</span>
          <span className='color'> <b>Renk:</b> {props.product?.color}</span>
        </div>
      </div>
      <div className="footer">
        <span>{props.product?.price?.toLocaleString()} TL</span>
      </div>
    </div>
  );
}

export default ProductCard;