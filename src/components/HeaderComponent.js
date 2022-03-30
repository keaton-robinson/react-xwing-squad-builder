import React from 'react';
import FactionCpt from './FactionCpt';

export default class HeaderComponent extends React.Component {

  constructor(props) {
    super(props);
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
                <li id="loginBtn"><a style={{cursor: "pointer"}}><i className="fa fa-sign-in-alt" style={{marginRight: "5px"}}></i>Log In</a></li>
              </ul>      
          </nav>
        </header>
  
      </div>
    );
  }
}