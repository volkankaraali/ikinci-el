import React, { useEffect, useState } from 'react';

import { Switch } from '@mantine/core';
import SelectOptions from '../components/SelectOptions';
import DeleteIcon from '../constants/icons/DeleteIcon';
import { getAllBrand } from '../services/brandService';
import { getAllCategories } from '../services/categoryService';
import { getAllColor } from '../services/colorService';
import { getAllUsingStatus } from '../services/usingStatusService';
import { Formik } from 'formik';
import { ProductAddShema } from '../constants/yupSchemas/ProudctAddSchema';
import { addProduct } from '../services/productService';
import ImageDragDrop from '../components/ImageDragDrop';
import { useAuth } from '../context/AuthProviderContext';
import useDisplaySuccessMess from '../hooks/useDisplaySuccessMes';
import useDisplayErrorMess from '../hooks/useDisplayErrorMess';
import LoadingCircleIcon from '../constants/icons/LoadingCircleIcons';

function ProductAdd() {

  const { auth } = useAuth();

  const [image, setImage] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [usingStatus, setUsingStatus] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getAllBrands();
    getAllCategory();
    getAllColors();
    getAllUsingStatuses();
  }, []);


  const getAllBrands = async () => {
    const res = await getAllBrand();
    setBrands(res.data);
  };

  const getAllCategory = async () => {
    const res = await getAllCategories();
    setCategories(res.data);
  };

  const getAllColors = async () => {
    const res = await getAllColor();
    setColors(res.data);
  };

  const getAllUsingStatuses = async () => {
    const res = await getAllUsingStatus();
    setUsingStatus(res.data);
  };

  const handleFormSubmit = async (formikData, resetForm, setFieldValue) => {
    setLoading(true);
    let category = categories.find(item => item.name == formikData.category);
    const formData = new FormData();
    formData.append('files.image', image.file);
    formData.append('data', JSON.stringify({
      name: formikData.title,
      description: formikData.description,
      category: category.id,
      brand: formikData.brand,
      color: formikData.color,
      status: formikData.usingStatus,
      price: formikData.price,
      isOfferable: formikData.offerOption,
      users_permissions_user: auth.id
    }));
    const product = await addProduct(formData);
    console.log(product);
    if (product.status == 200) {
      useDisplaySuccessMess('Ürün eklendi.');
    }
    else {
      useDisplayErrorMess('Ürün ekleme başarısız.');
    }
    setLoading(false);
    //resetin all formik data
    resetForm();
    setFieldValue('category', '');
    setFieldValue('brand', '');
    setFieldValue('category', '');
    setFieldValue('color', '');
    setFieldValue('usingStatus', '');
    setFieldValue('offerOption', false);
    setFieldValue('image', '');
    setImage('');
  };

  return (
    <div className='productAdd'>

      <Formik
        initialValues={{
          title: '',
          description: '',
          category: '',
          brand: '',
          color: '',
          usingStatus: '',
          price: '',
          offerOption: false,
          image: '',
        }}

        validationSchema={ProductAddShema}
        onSubmit={(auth, { resetForm, setFieldValue }) => {
          handleFormSubmit(auth, resetForm, setFieldValue);
        }}
      >
        {
          ({ values, errors, handleChange, handleSubmit, setFieldValue }) =>
            <form className='containerForm' >
              <div className="row-1">
                <div className="productDetails">
                  <h1>Ürün Detayları</h1>
                  <div className='productDetailContainer' >
                    <div className='productName'>
                      <label>Ürün Adı</label>
                      <input className={`inputProductName ${errors.title ? 'errorInput' : ''}`} type="text" name='title' value={values.title} onChange={handleChange} placeholder='Örnek: Iphone 12 Pro Max' />
                      {errors.title && <span className='errorText'>{errors.title}</span>}
                    </div>
                    <div className='productDescription'>
                      <label>Açıklama</label>
                      <textarea className={`${errors.description ? 'errorInput' : ''}`} type="text" name='description' value={values.description} onChange={handleChange} placeholder='Ürün açıklaması girin' />
                      {errors.description && <span className='errorText'>{errors.description}</span>}
                    </div>
                    <div className="productProperties">
                      <div className='row'>
                        <div className='productCategory'>
                          <label htmlFor="">Kategori</label>
                          <SelectOptions
                            name='category' value={values.category} setFieldValue={setFieldValue}
                            error={errors.category}
                            data={categories.map(item => item.name)}
                          />
                          {errors.category && <span className='errorText'>{errors.category}</span>}
                        </div>
                        <div className='productBrand'>
                          <label htmlFor="">Marka</label>
                          <SelectOptions
                            name='brand' value={values.brand} setFieldValue={setFieldValue}
                            error={errors.brand}
                            data={brands.map(item => item.name)} />
                          {errors.brand && <span className='errorText'>{errors.brand}</span>}

                        </div>
                      </div>
                      <div className='row'>
                        <div className='productColor'>
                          <label htmlFor="">Renk</label>
                          <SelectOptions
                            name='color' value={values.color} setFieldValue={setFieldValue}
                            error={errors.color}
                            data={colors.map(item => item.name)} />
                          {errors.color && <span className='errorText'>{errors.color}</span>}

                        </div>
                        <div className='productUsingStatus'>
                          <label htmlFor="">Kullanım Durumu</label>
                          <SelectOptions
                            name='usingStatus' value={values.usingStatus} setFieldValue={setFieldValue}
                            error={errors.usingStatus}
                            data={usingStatus.map(item => item.name)} />
                          {errors.usingStatus && <span className='errorText'>{errors.usingStatus}</span>}

                        </div>
                      </div>
                    </div>

                    <div className='productPrice'>
                      <label htmlFor="">Fiyat</label>
                      <div className={`${errors.price ? 'errorInput' : ''}`}>
                        <input type="number" name='price' value={values.price} onChange={handleChange} />
                        <span>TL</span>
                      </div>
                      {errors.price && <span className='errorText'>{errors.price}</span>}
                    </div>



                    <div className='productOfferOption'>
                      <label htmlFor="">Teklif Opsiyonu</label>
                      <Switch checked={values.offerOption} onChange={e => setFieldValue('offerOption', e.currentTarget.checked)} size="md" />
                    </div>
                  </div>
                </div>
                <div className="productImage">
                  <h1>Ürün Görseli</h1>

                  {
                    image.length === 0 &&
                    <>
                      <ImageDragDrop setFieldValue={setFieldValue} setImage={setImage} />
                      {errors.image && <span className='errorText'>{errors.image}</span>}
                    </>
                  }
                  {
                    image?.preview &&
                    (
                      <div className='image'>
                        <button onClick={() => { setImage([]); setFieldValue('image', ''); }}> <DeleteIcon />  </button>
                        <img src={image?.preview} alt="" />
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="row-2">
                <button type='submit' className='submitButton' disabled={loading && true} onClick={handleSubmit}>
                  {
                    loading ? <LoadingCircleIcon size={30} color='white' /> : 'Kaydet'
                  }
                </button>
              </div>
            </form>
        }
      </Formik>


    </div >
  );
}

export default ProductAdd;