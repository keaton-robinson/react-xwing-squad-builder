import React from 'react';
import FactionCpt from './FactionCpt';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';
import { UserContext } from './UserContext'

export default function HeaderComponent(props)  {
  const showLogin = () => {
    props.setModal({
      title: "Login",
      children: <LoginModal switchToRegister={showRegister} close={() => props.setModal(null)}/>
    })
  } 

  const showRegister = () => {
    props.setModal({
      title: "Register",
      children: <RegisterModal switchToLogin={showLogin}/>
    })
  }

  return (
    <UserContext.Consumer>
      { (userContext) => {
        return (<header id="navbar">
          <nav id="factionChooser">
            <ul>
            {props.factions.map(faction => (
                <FactionCpt faction={ faction } key={ faction } selectedFaction={ props.selectedFaction }
                  onClick={props.onClick}
                />
              ))}
            </ul>
          </nav>
          <nav id="navLinks">
              <ul>
                <li><a href="https://github.com/keaton-robinson/react-xwing-squad-builder">GitHub Repository</a></li>
                { userContext.user ?
                    <li id="logoutBtn" onClick={userContext.logout}><a style={{cursor: "pointer"}}><i className="fa fa-sign-in-alt" style={{marginRight: "5px"}}></i>Log Out</a></li>
                  :
                    <li id="loginBtn" onClick={showLogin}><a style={{cursor: "pointer"}}><i className="fa fa-sign-in-alt" style={{marginRight: "5px"}}></i>Log In</a></li>
                }
              </ul>      
          </nav>
        </header>);
      }}   
    </UserContext.Consumer>
  );
}