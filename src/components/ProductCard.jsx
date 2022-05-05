
import React from 'react';
import baseURL from '../constants/constants';

function ProductCard(props) {
  return (
    <div className='productCard'>
      <div className='body'>
        <img src={`${baseURL}${props.product?.image?.url}`} alt={props.product} />
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