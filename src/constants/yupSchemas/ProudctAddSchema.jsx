import * as yup from 'yup';

export const ProductAddShema = yup.object().shape({
  title: yup
    .string()
    .max(100, 'Ürün adı en fazla 100 karakter olabilir.')
    .required('Lütfen ürün adı giriniz.'),
  description: yup
    .string()
    .max(500, 'Ürün açıklaması en fazla 500 karakter olabilir.')
    .required('Lütfen ürün açıklaması giriniz.'),
  category: yup
    .string()
    .required('Lütfen kategori seçiniz'),
  brand: yup
    .string()
    .required('Lütfen marka seçiniz'),
  color: yup
    .string()
    .required('Lütfen renk seçiniz'),
  usingStatus: yup
    .string()
    .required('Lütfen kullanım durumu seçiniz'),
  price: yup
    .number()
    .required('Lütfen fiyat giriniz'),
  offerOption: yup
    .string(),
  image: yup
    .string()
    .required('Lütfen görsel ekleyiniz.')
});