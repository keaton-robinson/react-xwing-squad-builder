import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { XwingTextInput, XwingFormSubmitButton } from '../CustomFormikControls/XwingFormikCustomControls';

export default function RegisterModal() {

  const [usernameMin, usernameMax] = [6, 30];
  const [passwordMin, passwordMax] = [6, 50];

  return (
    <Formik
      initialValues= {{
        username: '',
        password: '',
        passwordConfirmation: ''
      }}
      validationSchema= {Yup.object({
        username: Yup.string()
          .min(usernameMin, `Must be ${usernameMin} characters or more`)
          .max(usernameMax, `Must be ${usernameMax} characters or less`)
          .required('Required'),
        password: Yup.string()
          .min(passwordMin, `Must be ${passwordMin} characters or more`)
          .max(passwordMax, `Must be ${passwordMax} characters or less`)
          .required("Required"),
        passwordConfirmation: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 4000);
      }}
    >
      <Form className="loginRegisterForm">
          <XwingTextInput type='text' name='username' style={{marginTop: '0px'}} />          
          <XwingTextInput type='password' name='password'/>
          <XwingTextInput type='password' name='passwordConfirmation' placeholder='confirm password' />
          
          <XwingFormSubmitButton className="btn-primary loginRegisterBtn">Register</XwingFormSubmitButton> 
      </Form>
    </Formik>
  );
}


