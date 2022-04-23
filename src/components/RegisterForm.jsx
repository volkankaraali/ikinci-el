import { Formik } from 'formik';
import React from 'react';
import { LoginAndRegisterSchema } from '../constant/yupSchemas/LoginAndRegisterSchema';

function RegisterForm() {
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}

      validationSchema={LoginAndRegisterSchema}
      onSubmit={auth => {
        console.log(auth);
      }}
    >
      {
        ({ values, handleChange, handleSubmit, errors }) =>
          <form onSubmit={handleSubmit}>
            <div>
              {errors.email && <div>{errors.email}</div>}
              <label>Email</label>
              <input className={errors && 'formError'} name='email' value={values.email} onChange={handleChange} placeholder="Email@example.com" type="text" />
            </div>

            <div>
              {errors.password && <div>{errors.password}</div>}
              <label>Password</label>
              <input className={errors && 'formError'} name='password' value={values.password} onChange={handleChange} type="password" />
            </div>

            <button type='submit' >Üye Ol</button>
          </form>
      }
    </Formik>
  );
}

export default RegisterForm;