import React from 'react';
import { useFormik } from 'formik';

export default class LoginModal extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { username: "", password: "", confirmPassword: "", usernameValidationMessage: null, passwordValidationMessage: null, confirmPasswordValidationMessage: null};

        this.controller = new AbortController();
    }

    componentWillUnmount() {
        this.controller.abort(); //cancel fetches to avoid react getting mad at me for leaving asynch requests open after unmount
    }

  

    registerClicked = () => {
        const { username, password, confirmPassword, usernameValidationMessage, passwordValidationMessage, confirmPasswordValidationMessage } = this.state;
        
        // I clearly need to look into how people like to validate forms in react...

        //determine if form invalid


        if(formInvalid){
            //show validation messages

        } else {
            //send register request to server

            //if register success, close window and show user login form again 

            //if register fail....uhh...idk?
        }
        return false;
    }


    render() {

        function validate(values) {
            const errors = {};
            if (!values.username) {
              errors.username = "Required";
            }
        
            if (!values.password) {
              errors.password = "Required";
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = "Required";
            }
            return errors;
          }

        const {
            handleSubmit,
            handleChange,
            handleBlur,
            touched,
            values, // use this if you want controlled components
            errors,
          } = useFormik({
            initialValues: {
              username: "",
              password: "",
              confirmPassword: ""
            },
            validate,
            onSubmit: (values) => {
              console.log(JSON.stringify(values));
              // values = {"favoriteFood":"ramen","favoritePlace":"mountains"}
            },
          });

        return (
            <form style={{textAlign: "center"}} onSubmit={handleSubmit} className="loginRegisterForm">
                <input type="text" name="username" placeholder='username' onChange={handleChange} onBlur={handleBlur} style={{marginTop: "0px"}}/>
                { touched.username && errors.username && <div className="inputValidationMsg"><i className="fa-solid fa-triangle-exclamation"></i>{` ${errors.username}`}</div> }
                
                <input type="password" name="password" placeholder='password' onChange={handleChange} onBlur={handleBlur} />
                { touched.password && errors.password && <div className="inputValidationMsg"><i className="fa-solid fa-triangle-exclamation"></i>{` ${errors.password}`}</div> }
                
                <input type="password" name="confirmPassword" placeholder='confirm password' onChange={handleChange} onBlur={handleBlur} />
                { touched.confirmPassword && errors.confirmPassword && <div className="inputValidationMsg"><i className="fa-solid fa-triangle-exclamation"></i>{` ${errors.confirmPassword}`}</div> }
                
                <button className="btn-primary loginRegisterBtn" type="button" onClick={this.registerClicked}>Register</button> 
            </form>
        );
    }
}