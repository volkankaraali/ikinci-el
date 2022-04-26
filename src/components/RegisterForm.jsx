import { Formik } from 'formik';
import React from 'react';
import LoadingCircleIcon from '../constant/icons/LoadingCircleIcon';
import { LoginAndRegisterSchema } from '../constant/yupSchemas/LoginAndRegisterSchema';

function RegisterLoginForm(props) {
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}

      validationSchema={LoginAndRegisterSchema}
      onSubmit={(auth, { resetForm }) => {
        props.getRegisterFunc(auth);
        resetForm();
      }}
    >
      {
        ({ values, errors, handleChange, handleSubmit, handleBlur, touched }) =>
          <form onSubmit={handleSubmit} className="registerForm">
            <div>
              <label>Email</label>
              <input className={errors.email && touched.email && 'formError'} name='email' value={values.email} onBlur={handleBlur} onChange={handleChange} placeholder="Email@example.com" type="text" />
            </div>

            <div>
              <label>Password</label>
              <input className={errors.password && touched.password && 'formError'} name='password' value={values.password} onBlur={handleBlur} onChange={handleChange} type="password" />
            </div>

            <button className='submitBtn' type='submit' disabled={props.loading} >
              {props.loading ? <LoadingCircleIcon className='loading' size={50} /> : props.buttonText}
            </button>
          </form>
      }
    </Formik>
  );
}

export default RegisterLoginForm;