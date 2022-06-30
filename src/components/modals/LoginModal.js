import React, { useState, useEffect, useRef } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import {XwingTextInput, XwingFormSubmitButton, XwingForm } from '../CustomFormikControls/XwingFormikCustomControls';
import { UserContext } from '../UserContext.js'

export default function LoginModal(props) {
    const mounted = useRef(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [successfullyLoggedIn, setSuccessfullyLoggedIn] = useState(false);

    const fetchAbortController = new AbortController();
    useEffect(() => {
        mounted.current = true;
        return () => { 
            mounted.current = false;
            fetchAbortController.abort(); 
        };
    }, []);

    return (
        <UserContext.Consumer>
            {(userContextBundle) => {
                return (<Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={yup.object({
                        username: yup.string().required('Required'),
                        password: yup.string().required('Required')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        //ask server for jwt. Put jwt in local storage or state...show "successful login" and a close modal button. Show logged in user status somewhere in header?
                        //if fail...show errors and let user try again
                        //dont forget about logout buttons
                        fetch('http://localhost:3000/users/login', {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            },
                            body: JSON.stringify({
                                username: values.username,
                                password: values.password
                            }),
                            signal: fetchAbortController.signal
                        })
                        .then((response) => {
                            return response.json()
                        })
                        .then((responseData) => {
                            if(responseData.success){
                                setSuccessfullyLoggedIn(true);
                                setStatusMessage("You are now logged in.");
                                userContextBundle.login(responseData.user);
                            } else {
                                setStatusMessage(responseData.msg);
                            }
                        })
                        .catch((error) => {
                            if(mounted.current){
                                setStatusMessage(error.message);
                            }
                        })
                        .finally(() => {
                            if(mounted.current){
                                setSubmitting(false);
                            }
                        });
                    }}
                >
                    <div className='loginRegisterForm'>
                    <span style={{color: successfullyLoggedIn ? "black" : "red"}}>{statusMessage}</span>
                    { !successfullyLoggedIn ? 
                        <XwingForm >
                            <XwingTextInput type='text' name='username' style={{marginTop: '0px'}} />
                            <XwingTextInput type='password' name='password' />
                            <XwingFormSubmitButton className='btn-primary loginRegisterBtn'>Login</XwingFormSubmitButton>
                            <div className="loginDivider"><span className="loginDividerText">or</span></div>
                            <button className="btn-info loginRegisterBtn" onClick={() => props.switchToRegister()}>Register</button>
                        </XwingForm>
                    : 
                        <div>
                            <button className="btn-primary loginRegisterBtn" onClick={props.close}>Ok</button> 
                        </div>
                    }
                    </div>
                </Formik>);
            }}
        </UserContext.Consumer>
    );   
}