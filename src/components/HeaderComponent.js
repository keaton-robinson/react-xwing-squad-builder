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
            <nav>
                <ul>
                    <li>Rules</li>
                    <li>Card Browser</li>
                    <li>About</li>
                    <li>English</li>
                    <li>Log In</li>
                    <li>Submit Bug/Feature Request</li>
                </ul>
            </nav>
        </header>
  
      </div>
    );
  }
}