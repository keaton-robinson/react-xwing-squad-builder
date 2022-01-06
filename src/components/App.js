import React from 'react';
import HeaderComponent from './HeaderComponent.js';
import SquadBuilderCpt from './SquadBuilderCpt.js';
import * as xwingData from '../data/xwing_data';

export default class App extends React.Component  {

  state = { selectedFaction: xwingData.factionNames['Rebel Alliance'] }

  factionsOrdered = [
    xwingData.factionNames["Rebel Alliance"],
    xwingData.factionNames["Galactic Empire"],
    xwingData.factionNames["Scum and Villainy"],
    xwingData.factionNames.Resistance,
    xwingData.factionNames["First Order"],
    xwingData.factionNames["Galactic Republic"],
    xwingData.factionNames["Separatist Alliance"]
    //,"MultiFaction"
  ];

  constructor(props){
    super(props);

    this.setSelectedFaction = this.setSelectedFaction.bind(this);
  }

  setSelectedFaction(faction) {
    this.setState( {selectedFaction: faction} );
  }

  render() {
    return (
      <div>
        <HeaderComponent 
          factions={this.factionsOrdered} 
          selectedFaction={this.state.selectedFaction}
          onClick={this.setSelectedFaction} 
        />
        <main>
          {this.factionsOrdered.map(faction=> (
            <SquadBuilderCpt
            selectedFaction={this.state.selectedFaction} 
            key={faction} 
            faction={faction} />
          ))}
        </main>
      </div>
    );
  }
}


