import React, { useState, useEffect, useRef } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { XwingTextInput, XwingFormSubmitButton, XwingForm } from "../CustomFormikControls/XwingFormikCustomControls";
import { useUserContext } from "../../contexts/UserContext";

interface LoginModalProps {
  switchToRegister: () => void;
  close: () => void;
}

const LoginModal: React.FC<LoginModalProps> = (props) => {
  const userContext = useUserContext();
  const isMounted = useRef(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [successfullyLoggedIn, setSuccessfullyLoggedIn] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // @ts-ignore (environment variable)
      const response = await fetch(XWING_API_ENDPOINT + "/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });
      const responseData = await response.json();

      if (isMounted.current) {
        if (responseData.success) {
          setSuccessfullyLoggedIn(true);
          setStatusMessage("You are now logged in.");
          userContext.login(responseData.user);
        } else {
          setStatusMessage(responseData.message);
        }
      }
    } catch (error) {
      if (isMounted.current) {
        setStatusMessage("Sorry, there was an error while trying to login.");
      }
    } finally {
      if (isMounted.current) {
        setSubmitting(false);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={yup.object({
        username: yup.string().required("Required"),
        password: yup.string().required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => handleSubmit(values, { setSubmitting })}
    >
      <div className="loginRegisterForm">
        <span style={{ color: successfullyLoggedIn ? "black" : "red" }}>{statusMessage}</span>
        {!successfullyLoggedIn ? (
          <XwingForm>
            <XwingTextInput type="text" name="username" style={{ marginTop: "0px" }} />
            <XwingTextInput type="password" name="password" />
            <XwingFormSubmitButton className="btn-primary loginRegisterBtn">Login</XwingFormSubmitButton>
            <div className="loginDivider">
              <span className="loginDividerText">or</span>
            </div>
            <button className="btn-info loginRegisterBtn" onClick={() => props.switchToRegister()}>
              Register
            </button>
          </XwingForm>
        ) : (
          <div>
            <button className="btn-primary loginRegisterBtn" onClick={props.close}>
              Ok
            </button>
          </div>
        )}
      </div>
    </Formik>
  );
};

export default LoginModal;
