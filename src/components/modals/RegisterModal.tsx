import React, {useEffect, useRef, useState} from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { XwingTextInput, XwingFormSubmitButton, XwingForm } from '../CustomFormikControls/XwingFormikCustomControls';

interface RegisterModalProps {
  switchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = (props) => {
  const [usernameMin, usernameMax] = [6, 30];
  const [passwordMin, passwordMax] = [6, 50];
  const [statusMessage, setStatusMessage] = useState('');
  const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, [])

  const handleSubmit = async (values, { setSubmitting }) => {

    try {
      // @ts-ignore  (environment variable)
      const response = await fetch(XWING_API_ENDPOINT + '/users/register', {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password
        })
      });
      const responseData = await response.json();
      
      if(isMounted.current){
        if(responseData.success){
          setStatusMessage("You have succesfully registered");
          setSuccessfullyRegistered(true);
        }else {
          setStatusMessage(responseData.message); 
        }
      }
    } catch(error) {
      setStatusMessage("Sorry, there was an error while trying to register.");
    } finally {
      setSubmitting(false);
    } 
  }

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
      onSubmit={(values, { setSubmitting }) => handleSubmit(values, { setSubmitting })}
    >
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

export default RegisterModal;