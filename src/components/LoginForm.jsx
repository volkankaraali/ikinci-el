import { Formik } from 'formik';
import React from 'react';
import LoadingDotsIcon from '../constants/icons/LoadingDotsIcon';
import { LoginAndRegisterSchema } from '../constants/yupSchemas/LoginAndRegisterSchema';

function LoginForm(props) {
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}

      validationSchema={LoginAndRegisterSchema}
      onSubmit={(auth, { resetForm }) => {
        props.getLoginFunc(auth);
        resetForm();
      }}
    >
      {
        ({ values, errors, handleChange, handleSubmit, handleBlur, touched }) =>
          <form onSubmit={handleSubmit} className="registerForm">
            <div>
              <label>Email</label>
              <input className={(errors.email && touched.email) ? 'formError' : ''} name='email' value={values.email} onBlur={handleBlur} onChange={handleChange} placeholder="Email@example.com" type="text" />
            </div>

            <div>
              <label>Password</label>
              <input className={(errors.password && touched.password) ? 'formError' : ''} name='password' value={values.password} onBlur={handleBlur} onChange={handleChange} type="password" />
            </div>

            <button className='submitBtn' type='submit' disabled={props.loading} >
              {props.loading ? <LoadingDotsIcon className='loading' size={50} /> : props.buttonText}
            </button>
          </form>
      }
    </Formik>
  );
}

export default LoginForm;