import React, {useState} from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { XwingTextInput, XwingFormSubmitButton, XwingForm } from '../CustomFormikControls/XwingFormikCustomControls';

export default function RegisterModal(props) {

  const [usernameMin, usernameMax] = [6, 30];
  const [passwordMin, passwordMax] = [6, 50];

  const [statusMessage, setStatusMessage] = useState('');
  const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);

  return (
    <Formik
      initialValues= {{
        username: '',
        password: '',
        passwordConfirmation: ''
      }}
      validationSchema= {yup.object({
        username: yup.string()
          .required('Required')
          .min(usernameMin, `Must be ${usernameMin} characters or more`)
          .max(usernameMax, `Must be ${usernameMax} characters or less`),
        password: yup.string()
          .required("Required")  
          .min(passwordMin, `Must be ${passwordMin} characters or more`)
          .max(passwordMax, `Must be ${passwordMax} characters or less`),
        passwordConfirmation: yup.string()
          .oneOf([yup.ref('password'), null], 'Passwords must match')
      })}
      onSubmit={(values, { setSubmitting }) => { 
        fetch('http://localhost:3000/users/register', {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify({
            username: values.username,
            password: values.password
          })
        })
        .then((response) => { 
          return response.json()
        })
        .then((responseData) => {
          if(responseData.success){
            setStatusMessage("You have succesfully registered");
            setSuccessfullyRegistered(true);
          }else {
            setStatusMessage(Object.entries(responseData.errors)[0][1].message); //hack to show just first error
          }
        })
        // eslint-disable-next-line
        .catch(error => { // I want to be reminded this variable is available
            setStatusMessage(error);
        })
        .finally(() => {
          setSubmitting(false);
        }); 
      }
    }>
      <div className="loginRegisterForm">
        <span style={{color: successfullyRegistered ? "black" : "red"}}>{statusMessage}</span>
        { !successfullyRegistered ? <XwingForm>
            <XwingTextInput type='text' name='username' style={{marginTop: '0px'}} />          
            <XwingTextInput type='password' name='password'/>
            <XwingTextInput type='password' name='passwordConfirmation' placeholder='confirm password' />
            
            <XwingFormSubmitButton className="btn-primary loginRegisterBtn">Register</XwingFormSubmitButton> 
          </XwingForm>
        : <div>
            <button className="btn-primary loginRegisterBtn" onClick={props.switchToLogin} >Go back to login ...</button> 
          </div>
        }
      </div>
    </Formik>
  );
}


