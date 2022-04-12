import React from 'react';

export default class LoginModal extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { };

        this.controller = new AbortController();
    }

    componentWillUnmount() {
        this.controller.abort(); //cancel fetches to avoid react getting mad at me for leaving asynch requests open after unmount
    }

    render() {
        return (
            <form style={{textAlign: "center"}} className="loginRegisterForm">
                <input type="text" placeholder='username' />
                <input type="password" placeholder='password' />
                <button className="btn-primary">Login</button>
                <div className="loginDivider">
                    <span className="loginDividerText">or</span>
                </div>
                <button className="btn-info" onClick={() => this.props.switchToRegister()}>Register</button>
            </form>
        );
    }
}