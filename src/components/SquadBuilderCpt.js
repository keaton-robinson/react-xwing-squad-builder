import React from 'react';
import InfoPanelCpt from './InfoPanelCpt.js';
import PilotRowCpt from './PilotRowCpt.js';
import AddShipCpt from './AddShipCpt.js';
import PrintSquadModal from './modals/PrintSquadModal.js';
import NewSquadConfirmModal from './modals/NewSquadConfirmModal.js';
import SaveAsModal from './modals/SaveAsModal.js';
import LoadModal from './modals/LoadModal.js';
import * as xwingData from '../data/xwing_data.js';
import * as xwingUtils from '../data/xwing_utils.js';
import { UserContext } from './UserContext.js'; 

const saveStatusMessages = {
    saving: "saving...",
    success: "successfully saved!",
    error: "error saving...please try again"
};

export default class SquadBuilderCpt extends React.Component {    	
	constructor(props) {
        super(props);

        this.factionShips = Object.keys(xwingData.ships).filter(ship => xwingData.ships[ship].factions.includes(props.faction)).sort();

        //initial state useful for reverting to defaults for "new squad" button
        this.initialState = {
            squadId: null,
            squad: [],
            squadName: `${this.props.faction} Squadron`,
            modalToShow: null,
            infoPanelCardToShow: null, // will expect an object of format { type: ("Ship"/"Pilot"/"Upgrade"), key: (string, number, number) }
            saveStatusMessage: null,
            editingSquadName: false
        };
        this.state = this.initialState;
    }

    componentDidMount() {
			this.fetchAbortController = new AbortController();
			this.loggedInUserOnPreviousRender = this.context.user?.username;
    }

	componentDidUpdate() {
		// TODO: research better ways of doing this
		// a probably improper way of clearing the squad builder if the user logs out. 
		// part of the reason to clear squad builder is to avoid a loaded squad's _id mongo property attempting to copy to a new user's squads
		// could just remove that property from the squad instead, but clearing the squad builder is probably expected behavior for my audience (software dev interviewers)
		if(this.loggedInUserOnPreviousRender && !(this.context.user?.username)){
			this.setState( this.initialState );
		}

		this.loggedInUserOnPreviousRender = this.context.user?.username;
	}

    componentWillUnmount() {
			this.fetchAbortController.abort();
			this.willUnmount = true;
    }

    // eslint-disable-next-line
    saveClicked = (event) => {  // I want to be reminded this variable is available
        //need to include user token here
        if(this.state.squadId) {
            // do a put request to update squad
            // eslint-disable-next-line no-undef
            fetch(XWING_API_ENDPOINT + `/squads/${this.state.squadId}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: this.context.user.token
                },
                body: JSON.stringify({
                    name: this.state.squadName,
                    points: xwingUtils.getSquadCost(this.state.squad, xwingData.upgrades),
                    pilots: this.state.squad
                })
            })
            .then(response => response.json())
            .then(responseData => {
                if(responseData.success){
                    this.setState({ squadId: responseData.savedSquad._id, saveStatusMessage: saveStatusMessages.success });
                } else {
                    this.setState({saveStatusMessage: saveStatusMessages.error});
                }
            }) // eslint-disable-next-line  
            .catch(error => { //I want to be reminded this variable is available
                if(!this.willUnmount){
                    this.setState({ saveStatusMessage: saveStatusMessages.error});
                }
            }); 

            this.setState({ saveStatusMessage: saveStatusMessages.saving});
            
        } else {
            // do a post request to create new squad
            this.saveSquadAs(this.state.squadName)
        }
    }

    saveSquadAs = (newSquadTitle) => {
        //need to include user token here
        // eslint-disable-next-line no-undef
        fetch(XWING_API_ENDPOINT + '/squads', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: this.context.user.token
            },
            body: JSON.stringify({
                faction: this.props.selectedFaction,
                name: newSquadTitle,
                points: xwingUtils.getSquadCost(this.state.squad, xwingData.upgrades),
                pilots: this.state.squad
            })
        })
        .then(response => response.json())
        .then(responseData => {
            if(responseData.success){
                this.setState({ squadId: responseData.savedSquad._id ,saveStatusMessage: saveStatusMessages.success});
            } else {
                this.setState({ saveStatusMessage: saveStatusMessages.error });
            }
        })
        // eslint-disable-next-line
        .catch(error => { // I want to be reminded this variable is available
            if(!this.willUnmount){
                this.setState({ saveStatusMessage: saveStatusMessages.error });
            }
        }); 
        
        this.setState({ squadName: newSquadTitle, saveStatusMessage: saveStatusMessages.saving});
        this.props.setModal(null);
        
    }

    loadSquad = (selectedSquad) => {
        const initialState = this.initialState;
        this.setState({...initialState, squadId: selectedSquad._id, squad: selectedSquad.pilots, squadName: selectedSquad.name});
        this.props.setModal(null);
    }

    showSaveAsModal = () => {
        this.props.setModal({ 
            title: 'Save squad', 
            children: <SaveAsModal saveSquad={this.saveSquadAs} squadName={this.state.squadName}/> 
        });
    }

    showLoadModal = () => {
        this.props.setModal({ 
            title: `Load ${this.props.faction} squad`, 
            children: <LoadModal faction={this.props.faction} loadSquad={this.loadSquad} /> 
        });
    }

    createNewSquad = () => {
        this.setState(this.initialState);
        this.props.setModal(null);
    }

    showNewSquadConfirmModal = () => {
        this.props.setModal({ 
            title: `Create new squad?`, 
            children: <NewSquadConfirmModal cancel={() => this.props.setModal(null)} createNewSquad={this.createNewSquad} /> 
        });
    }

    showPrintModal = () => {
        this.props.setModal({ 
            title: `${this.props.selectedFaction} Squadron (${xwingUtils.getSquadCost(this.state.squad, xwingData.upgrades)})`, 
            children: <PrintSquadModal squad={this.state.squad} /> 
        });
    }

    showInfoPanelCard = (shipPilotOrUpgradeToShow, cardType) => {
        this.setState({ infoPanelCardToShow: {type: cardType, cardData: shipPilotOrUpgradeToShow} });
    }

    removeInvalidUpgradesAndSetState= (updatedSquad) => {
        xwingUtils.removeInvalidUpgrades(updatedSquad, xwingData.upgrades);
        this.setState({ squad: updatedSquad });
    }

    setUpgradesOnNewPilot = (appReadyNewPilot, upgradesToApply, squadIncludingNewPilot) => {
        if(upgradesToApply){
            xwingUtils.addUpgrades(appReadyNewPilot, upgradesToApply, squadIncludingNewPilot, xwingData.upgrades);
        } else {
            //if no upgrades specified, attach the default auto-equips
            const selectedShip = xwingData.ships[appReadyNewPilot.ship];
            if(selectedShip.autoequip){
                for(const autoEquipUpgrade of selectedShip.autoequip){
                    const configSelUpgradeSlot = appReadyNewPilot.selectedUpgrades.find(selUpgrade => selUpgrade.slot == xwingData.slots.Configuration.key);
                    configSelUpgradeSlot.selectedUpgradeId = xwingData.upgrades.find(upgrade => upgrade.name == autoEquipUpgrade).id;
                }
            }
        }
    }

    addPilot = (pilotToAdd, upgradesToApply) => {
        const appReadyNewPilot = xwingUtils.getAppReadyPilot(pilotToAdd, xwingData.ships);
        appReadyNewPilot.uiKey =  xwingUtils.makeid(25);
        const newSquadAfterAddition = [...this.state.squad, appReadyNewPilot];

        this.setUpgradesOnNewPilot(appReadyNewPilot, upgradesToApply, newSquadAfterAddition);
        this.removeInvalidUpgradesAndSetState(newSquadAfterAddition);
    }

    changePilot = (prevSelectedPilot, newPilot, copyUpgrades = true) => {
        const appReadyNewPilot = xwingUtils.getAppReadyPilot(newPilot, xwingData.ships);
        //transfer the existing UI key to the new pilot object so react rcognizes it as the previous one
        appReadyNewPilot.uiKey = prevSelectedPilot.uiKey;  

        //get a copy of selected pilots and splice the new pilot into the position that the prev pilot was at
        const squadCopy = [...this.state.squad];
        const indexOfPilotToChange = squadCopy.findIndex(pilot => pilot.uiKey === prevSelectedPilot.uiKey);
        squadCopy.splice(indexOfPilotToChange, 1, appReadyNewPilot);


        if(copyUpgrades) {
            this.setUpgradesOnNewPilot(appReadyNewPilot, prevSelectedPilot.selectedUpgrades, squadCopy);
        } else {
            this.setUpgradesOnNewPilot(appReadyNewPilot, null, squadCopy);
        }

        this.removeInvalidUpgradesAndSetState(squadCopy);
    }

    removePilot = (pilotToRemove) => {
        const squadCopy = [...this.state.squad];
        const indexOfPilotToChange = squadCopy.findIndex(pilot => pilot.uiKey === pilotToRemove.uiKey);
        squadCopy.splice(indexOfPilotToChange, 1);

        this.removeInvalidUpgradesAndSetState(squadCopy);       
    }
    

    addCheapestAvailablePilotForShip = (ship, upgradesToInclude) => {
        const cheapestAvailablePilot = xwingUtils.getCheapestAvailablePilotForShip(ship, this.props.faction, this.state.squad, xwingData.upgrades, xwingData.pilots);
        if(cheapestAvailablePilot){
            this.addPilot(cheapestAvailablePilot, upgradesToInclude);
        } else {
            alert("No more pilots available for " + ship);
        }
    }

    changeShip = (shipToChangeTo, prevSelectedPilot) => {
        const cheapestAvailablePilotForShip = xwingUtils.getCheapestAvailablePilotForShip(shipToChangeTo, this.props.faction, this.state.squad, xwingData.upgrades, xwingData.pilots);
        if(cheapestAvailablePilotForShip){
            this.changePilot(prevSelectedPilot, cheapestAvailablePilotForShip, false);
        } else {
            alert("No more pilots available for " + shipToChangeTo);
        }
    }


    clonePilot = (pilot) => {
        if(xwingUtils.maxPilotOrUpgradeReached(pilot, this.state.squad, xwingData.upgrades)) {
            this.addCheapestAvailablePilotForShip(pilot.ship, pilot.selectedUpgrades);
        } else {
            this.addPilot(pilot, pilot.selectedUpgrades);
        }
    }

    changeUpgrade = (upgradeSlot, newlySelectedUpgrade, pilot) => {
        if(newlySelectedUpgrade && xwingUtils.maxPilotOrUpgradeReached(newlySelectedUpgrade, this.state.squad, xwingData.upgrades)){
            alert("Already have max amount of " + newlySelectedUpgrade.name);
        } else {
            xwingUtils.upgradeSquadShip(upgradeSlot, newlySelectedUpgrade, pilot, this.state.squad, xwingData.upgrades);
        }
        this.removeInvalidUpgradesAndSetState(this.state.squad);
    }

    // eslint-disable-next-line 
    editSquadClicked = (event) => { // I want to be reminded this variable is available
        window.addEventListener("mousedown", this.editSquadCloseListener);

        this.setState({ editingSquadName: true });
    }

    onSquadNameChanged = (event) => {
        this.setState({ squadName: event.target.value });
    }

    onSquadNameEditKeyDown = (event) => {
        if(event.keyCode == 13) { //they pressed "enter"
            this.setState({ editingSquadName: false });
        }
    }

    editSquadCloseListener = (event) => {
        if(!(event.target.className == 'editSquadName')){
            window.removeEventListener("mousedown", this.editSquadCloseListener);
            this.setState({ editingSquadName:false });
        }
    }

    render() {
        return (
            <div style={this.props.faction !== this.props.selectedFaction ? { display: 'none'} : {}}>
                <div className="squad-name-and-points-row">
                    <div>
                        { this.state.editingSquadName  
                            ? <input className='editSquadName' autoFocus={true} type='text' value={this.state.squadName} onChange={this.onSquadNameChanged} onKeyDown={this.onSquadNameEditKeyDown}
                                style={{fontSize:"1.2rem"}}/> 
                            : <h2 style={{display: 'inline'}}>{this.state.squadName}</h2>} 
                        <i className="far fa-edit" style={{marginLeft: "5px", fontSize: "1.2rem"}} onClick={this.editSquadClicked}></i>
                    </div>
                    <div className="points-display-container">
                        <span>Points: { xwingUtils.getSquadCost(this.state.squad, xwingData.upgrades) }/200 ({200-xwingUtils.getSquadCost(this.state.squad, xwingData.upgrades)} left)</span>
                    </div>
                    <div className='printBtn'>
                        <button className="btn-info" style={{margin:"5px"}} onClick={this.showPrintModal}>Print</button>
                    </div>
                </div>
                <div className="squad-save-import-row">
                    { this.context.user && <button className="btn-primary" onClick={this.saveClicked}><i className="fa-solid fa-save" style={{marginRight:"5px"}}></i>Save</button> }
                    { this.context.user && <button className="btn-primary" onClick={this.showSaveAsModal}><i className="fa-solid fa-file" style={{marginRight:"5px"}}></i>Save As</button> }
                    { this.context.user && <button className="btn-info" onClick={this.showLoadModal}>Load Squad</button> }
                    <button className="btn-danger" style={{margin: "5px"}} onClick={this.showNewSquadConfirmModal}>New Squad</button>
                    { this.context.user && <span style={{visibility: this.state.saveStatusMessage ? "visible" : "hidden"}}>{this.state.saveStatusMessage}</span> }
                </div>
                <div className="shipAndInfoContainer">
                    <div className="shipAndObstacleSelectors">
                        {this.state.squad.map(squadPilot => (
                            <PilotRowCpt
                                key={squadPilot.uiKey} 
                                factionShips={this.factionShips}
                                squad={this.state.squad}  
                                selectedPilot={squadPilot}
                                availablePilots={xwingData.pilots
                                    .filter(availPilot => availPilot.ship===squadPilot.ship && availPilot.faction === this.props.faction
                                            && (!xwingUtils.maxPilotOrUpgradeReached(availPilot, this.state.squad, xwingData.upgrades)
                                                || availPilot.id == squadPilot.id))
                                    .sort((first, second) => (first.points - second.points))}
                                changePilot= {this.changePilot} 
                                changeShip = {this.changeShip }
                                removePilot = {this.removePilot }
                                clonePilot = {this.clonePilot }
                                changeUpgrade = { this.changeUpgrade }
                                onRecordMouseEnter = { this.showInfoPanelCard } />
                        ))}
                        <AddShipCpt factionShips={this.factionShips} 
                            onShipSelected={this.addCheapestAvailablePilotForShip}
                            onRecordMouseEnter = { this.showInfoPanelCard }/>
                    </div>
                    {this.state.infoPanelCardToShow ? <InfoPanelCpt cardToShow={this.state.infoPanelCardToShow} faction={this.props.faction}/> : <div style={{flex:1}}></div> }  
                </div>
            </div>
        );
    }
}

SquadBuilderCpt.contextType = UserContext;