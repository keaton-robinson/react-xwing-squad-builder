import * as React from 'react';
const HeaderComponent = require('./HeaderComponent');
const SquadBuilderCpt = require('./SquadBuilderCpt');
const ModalContainer = require('./modals/ModalContainer');
const ms = require('ms');
import * as xwingData from '../data/xwing_data';
const { UserContext } = require('./UserContext');

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


interface AppState {
  selectedFaction: keyof typeof xwingData.factionNames;
  modalToShow: React.ReactElement;
  user: any;
}

class App extends React.Component<{}, AppState>  {
  constructor(props: {}){
    super(props);
    this.state = { 
      selectedFaction: xwingData.factionNames['Rebel Alliance'] as keyof typeof xwingData.factionNames, 
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

  setModal = ( modalConfig: any ) => {
    const modalToShow = modalConfig ? <ModalContainer handleClose={() => this.setModal(null)} headerTitle={modalConfig.title}>
        {modalConfig.children}
      </ModalContainer> : null;

    if(this.state.modalToShow != modalToShow){
      this.setState({ modalToShow: modalToShow });
    }
  }

  setSelectedFaction = (faction: keyof typeof xwingData.factionNames) => {
    this.setState( {selectedFaction: faction} );
  }

  render() {
    const userContextBundle = {
      user: this.state.user,
      login: (userObj: any) => {
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


export default App;