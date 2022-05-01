import React, { createContext, useContext, useEffect, useState } from 'react';
import { getProducts } from '../services/productService';


const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductss();
  }, []);

  const getProductss = async () => {
    let res = await getProducts();
    setProducts(res.data);
  };

  const values = {
    products
  };

  return <ProductContext.Provider value={values}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
export const useProducts = () => useContext(ProductContext);