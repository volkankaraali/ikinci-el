import * as yup from 'yup';

export const LoginAndRegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email('Lütfen geçerli bir e-posta giriniz.')
    .required('Lütfen e-posta giriniz.'),
  password: yup
    .string()
    .min(8, 'Şifreniz en az 8 karakter olmalı.')
    .max(20, 'Şifreniz en fazla 20 karakter olmalı.')
    .required('Lütfen şifre giriniz.')
});