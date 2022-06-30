import React from 'react';
import HeaderComponent from './HeaderComponent.js';
import SquadBuilderCpt from './SquadBuilderCpt.js';
import ModalContainer from './modals/ModalContainer.js';
import ms from 'ms';
import * as xwingData from '../data/xwing_data';


const factionsOrdered = [
  xwingData.factionNames["Rebel Alliance"],
  xwingData.factionNames["Galactic Empire"],
  xwingData.factionNames["Scum and Villainy"],
  xwingData.factionNames.Resistance,
  xwingData.factionNames["First Order"],
  xwingData.factionNames["Galactic Republic"],
  xwingData.factionNames["Separatist Alliance"]
  //,"MultiFaction"
];

export const UserContext = React.createContext(null);
UserContext.displayName = "UserContext";

export default class App extends React.Component  {
  constructor(props){
    super(props);
    this.state = { 
      selectedFaction: xwingData.factionNames['Rebel Alliance'], 
      modalToShow: null,
      user: null 
    };
  }

  componentDidMount() {
    // get and set currently logged in user into state
    const foundUser = localStorage.getItem("user");
    if(foundUser) {
      const userObj = JSON.parse(foundUser);
      //make sure that login token hasn't expired
      if(userObj.expiresIn && Date.now() > userObj.loginTime + ms(userObj.expiresIn)){
        localStorage.removeItem("user"); 
      } else {
        this.setState({user: userObj});
      }
    }
  }

  setModal = ( modalConfig ) => {
    const modalToShow = modalConfig ? <ModalContainer handleClose={() => this.setModal(null)} headerTitle={modalConfig.title}>
        {modalConfig.children}
      </ModalContainer> : null;

    if(this.state.modalToShow != modalToShow){
      this.setState({ modalToShow: modalToShow });
    }
  }

  setSelectedFaction = (faction) => {
    this.setState( {selectedFaction: faction} );
  }

  render() {
    const userContextBundle = {
      user: this.state.user,
      login: (userObj) => {
        userObj.loginTime = Date.now();
        this.setState({user: userObj});
        localStorage.setItem("user", JSON.stringify(userObj));
      },
      logout: () => {
        this.setState({user: null});
        localStorage.removeItem("user");
      }
    }

    return (
      <UserContext.Provider value={userContextBundle}>
        <HeaderComponent 
          factions={factionsOrdered} 
          selectedFaction={this.state.selectedFaction}
          onClick={this.setSelectedFaction}
          setModal={this.setModal} 
        />
        <main>
          {factionsOrdered.map(faction=> (
            <SquadBuilderCpt
            selectedFaction={this.state.selectedFaction} 
            key={faction} 
            faction={faction}
            setModal={this.setModal} />
          ))}
        </main>
        { this.state.modalToShow && this.state.modalToShow }
      </UserContext.Provider>
    );
  }
}


