import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  return (
    <div>ProductDetail {id}</div>
  );
}

export default ProductDetail;