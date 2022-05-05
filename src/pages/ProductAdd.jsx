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

function ProductAdd() {

  const [image, setImage] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [usingStatus, setUsingStatus] = useState([]);

  const { auth } = useAuth();



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

  const handleFormSubmit = async (formikData) => {
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
        onSubmit={(auth) => {
          handleFormSubmit(auth);
        }}
      >
        {
          ({ values, errors, handleChange, handleSubmit, setFieldValue }) =>
            <form className='containerForm' >
              <div className="row-1">
                <div className="productDetails">
                  <h1>Ürün Detayları</h1>
                  {errors.title && <div>{errors.title}</div>}
                  {errors.description && <div>{errors.description}</div>}
                  {errors.category && <div>{errors.category}</div>}
                  {errors.brand && <div>{errors.brand}</div>}
                  {errors.color && <div>{errors.color}</div>}
                  {errors.usingStatus && <div>{errors.usingStatus}</div>}
                  {errors.price && <div>{errors.price}</div>}
                  {errors.offerOption && <div>{errors.offerOption}</div>}
                  {errors.image && <div>{errors.image}</div>}
                  <div className='productDetailContainer' >
                    <div className='productName'>
                      <label>Ürün Adı</label>
                      <input className='inputProductName' type="text" name='title' value={values.title} onChange={handleChange} placeholder='Örnek: Iphone 12 Pro Max' />
                    </div>
                    <div className='productDescription'>
                      <label>Açıklama</label>
                      <textarea type="text" name='description' value={values.description} onChange={handleChange} placeholder='Ürün açıklaması girin' />
                    </div>
                    <div className="productProperties">
                      <div className='row'>
                        <div className='productCategory'>
                          <label htmlFor="">Kategori</label>
                          <SelectOptions
                            name='category' value={values.category} setFieldValue={setFieldValue}
                            data={categories.map(item => item.name)}
                          />
                        </div>
                        <div className='productBrand'>
                          <label htmlFor="">Marka</label>
                          <SelectOptions
                            name='brand' value={values.brand} setFieldValue={setFieldValue}
                            data={brands.map(item => item.name)} />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='productColor'>
                          <label htmlFor="">Renk</label>
                          <SelectOptions
                            name='color' value={values.color} setFieldValue={setFieldValue}
                            data={colors.map(item => item.name)} />
                        </div>
                        <div className='productUsingStatus'>
                          <label htmlFor="">Kullanım Durumu</label>
                          <SelectOptions
                            name='usingStatus' value={values.usingStatus} setFieldValue={setFieldValue}
                            data={usingStatus.map(item => item.name)} />
                        </div>
                      </div>
                    </div>

                    <div className='productPrice'>
                      <label htmlFor="">Fiyat</label>
                      <div>
                        <input type="number" name='price' value={values.price} onChange={handleChange} />
                        <span>TL</span>
                      </div>
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
                    </>
                  }
                  {
                    image?.preview &&
                    (
                      <div className='image'>
                        <button onClick={() => { setImage([]); setFieldValue('image', ''); }}> <DeleteIcon />  </button>
                        <img src={image?.preview} alt="" />
                        {values.image}
                      </div>
                    )
                  }


                </div>
              </div>
              <div className="row-2">
                <button type='submit' className='submitButton' onClick={handleSubmit}>Kaydet</button>
              </div>
            </form>
        }
      </Formik>


    </div >
  );
}

export default ProductAdd;