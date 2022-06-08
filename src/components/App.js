import React from 'react';
import HeaderComponent from './HeaderComponent.js';
import SquadBuilderCpt from './SquadBuilderCpt.js';
import ModalContainer from './modals/ModalContainer.js';
import * as xwingData from '../data/xwing_data';

export default class App extends React.Component  {

  state = { selectedFaction: xwingData.factionNames['Rebel Alliance'], modalToShow: null }

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

  setModal = ( modalConfig ) => {
    const modalToShow = modalConfig ? <ModalContainer handleClose={() => this.setModal(null)} headerTitle={modalConfig.title}>
        {modalConfig.children}
      </ModalContainer> : null;

    if(this.state.modalToShow != modalToShow){
      this.setState({ modalToShow: modalToShow });
    }
  }

  constructor(props){
    super(props);
  }

  setSelectedFaction = (faction) => {
    this.setState( {selectedFaction: faction} );
  }

  render() {
    return (
      <div>
        <HeaderComponent 
          factions={this.factionsOrdered} 
          selectedFaction={this.state.selectedFaction}
          onClick={this.setSelectedFaction}
          setModal={this.setModal} 
        />
        <main>
          {this.factionsOrdered.map(faction=> (
            <SquadBuilderCpt
            selectedFaction={this.state.selectedFaction} 
            key={faction} 
            faction={faction}
            setModal={this.setModal} />
          ))}
        </main>
        { this.state.modalToShow && this.state.modalToShow }
      </div>
    );
  }
}


