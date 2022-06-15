import React from 'react';
import FactionCpt from './FactionCpt';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';

export default class HeaderComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  loginClicked = () => {
    this.props.setModal({
      title: "Login",
      children: <LoginModal switchToRegister={this.switchToRegister}/>
    })
  } 

  switchToRegister = () => {
    this.props.setModal({
      title: "Register",
      children: <RegisterModal />
    })
  }

  render() {
    return (
      <div>   
        <header id="navbar">
          <nav id="factionChooser">
            <ul>
            {this.props.factions.map(faction => (
                <FactionCpt faction={ faction } key={ faction } selectedFaction={ this.props.selectedFaction }
                  onClick={this.props.onClick}
                />
              ))}
            </ul>
          </nav>
          <nav id="navLinks">
              <ul>
                <li><a href="https://github.com/keaton-robinson/react-xwing-squad-builder">GitHub Repository</a></li>
                <li id="loginBtn" onClick={this.loginClicked}><a style={{cursor: "pointer"}}><i className="fa fa-sign-in-alt" style={{marginRight: "5px"}}></i>Log In</a></li>
              </ul>      
          </nav>
        </header>
  
      </div>
    );
  }
}