import React from 'react';

function ProductCard(props) {
  const basiApi = 'https://bootcamp.akbolat.net/';
  return (
    <div className='productCard'>
      <div className='body'>
        <img src={basiApi + props.url} alt="" />
        <div className='bodyHeader'>
          <span className='brand'>{props.brand}</span>
          <span className='color'> <b>Renk:</b> {props.color}</span>
        </div>
      </div>
      <div className="footer">
        <span>{props.price.toLocaleString()} TL</span>
      </div>
    </div>
  );
}

export default ProductCard;