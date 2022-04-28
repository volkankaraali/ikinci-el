import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoriesNav from '../components/CategoriesNav';

import ProductCard from '../components/ProductCard';
import LoadingCircleIcon from '../constant/icons/LoadingCircleIcons';
import homeBanner from '../images/homeBanner.png';
import { getCategories } from '../services/categoryService';
import { getProducts } from '../services/productService';

function Home() {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  //filteredProduct default value is Hepsi. after getProduct, filteredproduct sets response data.
  useEffect(() => {
    getProductsFunc();
    getCategoriesFunc();

    let category = localStorage.getItem('category');
    setActiveCategory(category);

  }, []);

  useEffect(() => {
    let category = localStorage.getItem('category');
    filterProducts(category);
  }, [activeCategory]);


  const filterProducts = (activeCategory) => {
    if (activeCategory == 'Hepsi') {
      setFilteredProducts(products);
    }
    else {
      let filter = products.filter(product => product.category.name == activeCategory);
      setFilteredProducts(filter);
    }
  };

  const getCategoriesFunc = async () => {
    let res = await getCategories();
    setCategories(res.data);
  };

  const getProductsFunc = async () => {
    setLoading(true);

    let res = await getProducts();
    let products = res.data;
    setProducts(products);

    //for first loaded 
    let category = localStorage.getItem('category');
    if (category) {
      if (category == 'Hepsi') {
        setFilteredProducts(products);
        setLoading(false);
      }
      else {
        let filter = products.filter(product => product.category.name == category);
        setFilteredProducts(filter);
        setLoading(false);
      }
    }
    else {
      setActiveCategory('Hepsi');
      setFilteredProducts(products);
      setLoading(false);
    }
  };


  const handleActiveCategory = (category) => {
    setActiveCategory(category);
    localStorage.setItem('category', category);
  };

  return (
    <div className='home'>
      <div className="container">
        <img src={homeBanner} alt="" />
        <div className='categories'>
          <CategoriesNav categories={categories} activeCategory={activeCategory} handleActiveCategory={handleActiveCategory} />
        </div>

        <div className="products">
          {
            loading
              ? <div className='loading'><LoadingCircleIcon size={40} /></div>
              : (

                filteredProducts.length > 0
                  ? filteredProducts.map(product => (<Link to={`detail/${product.name.toLowerCase().replace(/ /g, '-')}`} key={product.id}> <ProductCard brand={product.brand} color={product.color} price={product.price} url={product.image?.url} /></Link>))
                  : <div className='noProduct' > Ürün bulunmuyor.</div>
              )
          }
        </div>
      </div>
    </div >
  );
}

export default Home;