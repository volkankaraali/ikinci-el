import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoriesNav from '../components/CategoriesNav';

import ProductCard from '../components/ProductCard';
import ScrollToTopButton from '../components/ScrollToTopButton';
import LoadingCircleIcon from '../constants/icons/LoadingCircleIcons';
import { useProducts } from '../context/ProductContext';
import homeBanner from '../images/homeBanner.png';
import { getAllCategories } from '../services/categoryService';

function Home() {

  const { products } = useProducts();

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {


    let category = localStorage.getItem('category') || 'Hepsi';
    filterProducts(category);
    setActiveCategory(category);

  }, [products]);

  //for every category changes
  useEffect(() => {
    let category = localStorage.getItem('category');
    filterProducts(category);
  }, [activeCategory]);

  useEffect(() => {
    getCategoriesFunc();
  }, []);


  const filterProducts = async (category) => {
    setLoading(true);
    if (category == 'Hepsi') {
      setFilteredProducts(products);
      setLoading(false);
    }
    else {
      let filter = products.filter(product => product?.category?.name == category);
      setFilteredProducts(filter);
      setLoading(false);
    }
  };

  const getCategoriesFunc = async () => {
    let res = await getAllCategories();
    setCategories(res.data);
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
                  ? filteredProducts.map(product => (<Link to={`detail/${product.id}`} key={product.id}> <ProductCard product={product} /></Link>))
                  : <div className='noProduct' > ??r??n bulunmuyor.</div>
              )
          }
        </div>
      </div>
      <ScrollToTopButton />
    </div >
  );
}

export default Home;