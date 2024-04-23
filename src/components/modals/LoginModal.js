import React, { useState, useEffect, useRef } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import {XwingTextInput, XwingFormSubmitButton, XwingForm } from '../CustomFormikControls/XwingFormikCustomControls';
import { UserContext } from '../../contexts/UserContext'

export default function LoginModal(props) {
    const mounted = useRef(false);
    const fetchAbortController = useRef(null); 
    const [statusMessage, setStatusMessage] = useState('');
    const [successfullyLoggedIn, setSuccessfullyLoggedIn] = useState(false);

    useEffect(() => {
        mounted.current = true;
        return () => { 
            mounted.current = false;
            if(fetchAbortController.current) {
                fetchAbortController.current.abort();
            } 
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
                        if (fetchAbortController.current) {
                            fetchAbortController.current.abort(); // Abort previous request if still ongoing
                        }
                        fetchAbortController.current = new AbortController(); // Create a new controller for the new request
                        
                        // eslint-disable-next-line no-undef
                        // @ts-ignore (environment variable)
                        fetch(XWING_API_ENDPOINT + '/users/login', {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            },
                            body: JSON.stringify({
                                username: values.username,
                                password: values.password
                            }),
                            signal: fetchAbortController.current.signal
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
                                setStatusMessage(responseData.message);
                            }
                        })
                        .catch((err) => {
                            if(mounted.current){
                                setStatusMessage("Sorry, there was an error while trying to login.");
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
                            {/* todo: make sure this works */}
                            <button className="btn-primary loginRegisterBtn" onClick={props.close}>Ok</button> 
                        </div>
                    }
                    </div>
                </Formik>);
            }}
        </UserContext.Consumer>
    );   
}