const React = require('react');
const FactionCpt = require('./FactionCpt.js');
const LoginModal = require('./modals/LoginModal.js');
const RegisterModal = require('./modals/RegisterModal.js');
const { UserContext } = require('./UserContext.js');

function HeaderComponent(props)  {
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

module.exports = HeaderComponent;