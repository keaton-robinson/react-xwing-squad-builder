import React from 'react';
import InfoPanelCpt from './InfoPanelCpt';
import PilotRowCpt from './PilotRowCpt';
import AddShipCpt from './AddShipCpt';
import ModalContainer from './modals/ModalContainer';
import PrintSquadModal from './modals/PrintSquadModal';
import NewSquadConfirmModal from './modals/NewSquadConfirmModal';
import SaveAsModal from './modals/SaveAsModal';
import LoadModal from './modals/LoadModal';
import * as xwingData from '../data/xwing_data';
import * as xwingUtils from '../data/xwing_utils';

export default class SquadBuilderCpt extends React.Component {
    
    

    saveStatusMessages = {
        saving: "saving...",
        success: "successfully saved!",
        error: "error saving...please try again"
    }
    
    constructor(props) {
        super(props);

        this.factionShips = Object.keys(xwingData.ships).filter(ship => xwingData.ships[ship].factions.includes(props.faction)).sort();
        this.availableModals = {
            printModal: 'printModal',
            newSquadConfirmModal: 'newSquadConfirmModal',
            saveAsModal: 'saveAsModal',
            loadModal: 'loadModal'
        };



        this.initialState = {
            squadId: null,
            squad: [],
            squadName: `${this.props.faction} Squadron`,
            modalToShow: null,
            infoPanelCardToShow: null, // will expect an object of format { type: ("Ship"/"Pilot"/"Upgrade"), key: (string, number, number) }
            showSaveStatus: false,
            saveStatusMessage: "",
            editingSquadName: false
        };
        this.state = this.initialState;
    }

    saveClicked = (event) => {
        if(this.state.squadId) {
            // do a put request to update squad
            fetch(`http://localhost:3000/squads/${this.state.squadId}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    name: this.state.squadName,
                    points: xwingUtils.getSquadCost(this.state.squad),
                    pilots: this.state.squad
                })
            })
            .then(response => response.json())
            .then(data => {
                const state = this.state;
                this.setState({ ...state, squadId: data._id ,saveStatusMessage: this.saveStatusMessages.success, showSaveStatus: true });
            })
            .catch(error => {
                //show error message
                const state = this.state;
                this.setState({ ...state, saveStatusMessage: this.saveStatusMessages.error, showSaveStatus: true });
            }); 

            //close modal and show save status message 
            const state = this.state;
            this.toggleModal(null, { ...state, showSaveStatus: true, saveStatusMessage: this.saveStatusMessages.saving});
        } else {
            // do a post request to create new squad
            this.saveSquadAs(this.state.squadName)
        }
    }

    saveSquadAs = (newSquadTitle) => {
        fetch('http://localhost:3000/squads', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                faction: this.props.selectedFaction,
                name: newSquadTitle,
                points: xwingUtils.getSquadCost(this.state.squad),
                pilots: this.state.squad
            })
        })
        .then(response => response.json())
        .then(data => {
            const state = this.state;
            this.setState({ ...state, squadId: data._id ,saveStatusMessage: this.saveStatusMessages.success, showSaveStatus: true });
        })
        .catch(error => {
            //show error message
            const state = this.state;
            this.setState({ ...state, saveStatusMessage: this.saveStatusMessages.error, showSaveStatus: true });
        }); 

        //close modal and show save status message 
        const state = this.state;
        this.toggleModal(null, { ...state, squadName: newSquadTitle, showSaveStatus: true, saveStatusMessage: this.saveStatusMessages.saving});
        
    }

    loadSquad = (selectedSquad) => {
        const initialState = this.initialState;
        this.setState({...initialState, squadId: selectedSquad._id, squad: selectedSquad.pilots, squadName: selectedSquad.name});
    }

    showSaveAsModal = () => {
        this.toggleModal(this.availableModals.saveAsModal);
    }

    showLoadModal = () => {
        this.toggleModal(this.availableModals.loadModal);
    }

    createNewSquad = () => {
        this.setState(this.initialState);
    }

    showNewSquadConfirmModal = () => {
        this.toggleModal(this.availableModals.newSquadConfirmModal);
    }

    showPrintModal = () => {
        this.toggleModal(this.availableModals.printModal);
    }

    toggleModal = (modalToShow, pendingStateChanges) => {
        const state = pendingStateChanges ? pendingStateChanges : this.state;
        this.setState({ ...state, modalToShow: this.availableModals[modalToShow] ? modalToShow : null });
    }

    getModalToShow = () => {
        let headerTitle, childComponent;

        switch(this.state.modalToShow){
            case this.availableModals.printModal:
                headerTitle = `${this.props.selectedFaction} Squadron (${xwingUtils.getSquadCost(this.state.squad)})`
                childComponent = <PrintSquadModal squad={this.state.squad} />;
                break;
            case this.availableModals.newSquadConfirmModal:
                headerTitle = `Create new squad?`;
                childComponent = <NewSquadConfirmModal cancel={this.toggleModal} createNewSquad={this.createNewSquad} />;
                break;
            case this.availableModals.saveAsModal:
                headerTitle = 'Save squad';
                childComponent = <SaveAsModal saveSquad={this.saveSquadAs} squadName={this.state.squadName}/>
                break;
            case this.availableModals.loadModal:
                headerTitle = `Load ${this.props.faction} squad`;
                childComponent = <LoadModal faction={this.props.faction} loadSquad={this.loadSquad} />
                break;
        }

        return  <ModalContainer handleClose={this.toggleModal} 
                        headerTitle={headerTitle}
                        children={childComponent}/>
    }

    showInfoPanelCard = (shipPilotOrUpgradeToShow, cardType) => {
        const state = this.state;
        this.setState({ ...state, infoPanelCardToShow: {type: cardType, cardData: shipPilotOrUpgradeToShow} });
    }

    removeInvalidUpgradesAndSetState= (updatedSquad) => {
        xwingUtils.removeInvalidUpgrades(updatedSquad);
        const state = this.state;
        this.setState({ ...state, squad: updatedSquad });
    }

    setUpgradesOnNewPilot = (appReadyNewPilot, upgradesToApply, squadIncludingNewPilot) => {
        if(upgradesToApply){
            xwingUtils.addUpgrades(appReadyNewPilot, upgradesToApply, squadIncludingNewPilot);
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
        const appReadyNewPilot = xwingUtils.getAppReadyPilot(pilotToAdd);
        appReadyNewPilot.uiKey =  xwingUtils.makeid(25);
        const newSquadAfterAddition = [...this.state.squad, appReadyNewPilot];

        this.setUpgradesOnNewPilot(appReadyNewPilot, upgradesToApply, newSquadAfterAddition);
        this.removeInvalidUpgradesAndSetState(newSquadAfterAddition);
    }

    changePilot = (prevSelectedPilot, newPilot, copyUpgrades = true) => {
        const appReadyNewPilot = xwingUtils.getAppReadyPilot(newPilot);
        //transfer the existing UI key to the new pilot object so react rcognizes it as the previous one
        appReadyNewPilot.uiKey = prevSelectedPilot.uiKey;  

        //get a copy of selected pilots and splice the new pilot into the position that the prev pilot was at
        const squadCopy = [...this.state.squad];
        const indexOfPilotToChange = squadCopy.findIndex(pilot => pilot.uiKey === prevSelectedPilot.uiKey);
        squadCopy.splice(indexOfPilotToChange, 1, appReadyNewPilot);


        if(copyUpgrades) {
            //xwingUtils.addUpgrades(appReadyNewPilot, prevSelectedPilot.selectedUpgrades, squadCopy);
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
        const cheapestAvailablePilot = xwingUtils.getCheapestAvailablePilotForShip(ship, this.props.faction, this.state.squad);
        if(cheapestAvailablePilot){
            this.addPilot(cheapestAvailablePilot, upgradesToInclude);
        } else {
            alert("No more pilots available for " + ship);
        }
    }

    changeShip = (shipToChangeTo, prevSelectedPilot) => {
        const cheapestAvailablePilotForShip = xwingUtils.getCheapestAvailablePilotForShip(shipToChangeTo, this.props.faction, this.state.squad);
        if(cheapestAvailablePilotForShip){
            this.changePilot(prevSelectedPilot, cheapestAvailablePilotForShip, false);
        } else {
            alert("No more pilots available for " + shipToChangeTo);
        }
    }


    clonePilot = (pilot) => {
        if(xwingUtils.maxPilotOrUpgradeReached(pilot, this.state.squad)) {
            this.addCheapestAvailablePilotForShip(pilot.ship, pilot.selectedUpgrades);
        } else {
            this.addPilot(pilot, pilot.selectedUpgrades);
        }
    }

    changeUpgrade = (upgradeSlot, newlySelectedUpgrade, pilot) => {
        if(newlySelectedUpgrade && xwingUtils.maxPilotOrUpgradeReached(newlySelectedUpgrade, this.state.squad)){
            alert("Already have max amount of " + newlySelectedUpgrade.name);
        } else {
            xwingUtils.upgradeSquadShip(upgradeSlot, newlySelectedUpgrade, pilot, this.state.squad);
        }
        this.removeInvalidUpgradesAndSetState(this.state.squad);
    }

    editSquadClicked = (event) => {
        const state = this.state;

        window.addEventListener("mousedown", this.editSquadCloseListener);

        this.setState({...state, editingSquadName: true});
    }

    onSquadNameChanged = (event) => {
        const state = this.state;
        this.setState({...state, squadName: event.target.value});
    }

    onSquadNameEditKeyDown = (event) => {
        const state = this.state;
        if(event.keyCode == 13) { //they pressed "enter"
            this.setState({...state, editingSquadName: false});
        }
    }

    editSquadCloseListener = (event) => {
        if(!(event.target.className == 'editSquadName')){
            window.removeEventListener("mousedown", this.editSquadCloseListener);
        const state = this.state;
        this.setState({ ...state, editingSquadName:false });
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
                        <span>Points: { xwingUtils.getSquadCost(this.state.squad) }/200 ({200-xwingUtils.getSquadCost(this.state.squad)} left)</span>
                    </div>
                    <div className='printBtn'>
                        <button className="btn-info" style={{margin:"5px"}} onClick={this.showPrintModal}>Print</button>
                    </div>
                </div>
                <div className="squad-save-import-row">
                    <button className="btn-primary" onClick={this.saveClicked}><i className="fa-solid fa-save" style={{marginRight:"5px"}}></i>Save</button>
                    <button className="btn-primary" onClick={this.showSaveAsModal}><i className="fa-solid fa-file" style={{marginRight:"5px"}}></i>Save As</button>
                    <button className="btn-info" onClick={this.showLoadModal}>Load Squad</button>
                    <button className="btn-danger" style={{margin: "5px"}} onClick={this.showNewSquadConfirmModal}>New Squad</button>
                    <span style={{visibility: this.state.showSaveStatus ? "visible" : "hidden"}}>{this.state.saveStatusMessage}</span>
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
                                            && (!xwingUtils.maxPilotOrUpgradeReached(availPilot, this.state.squad)
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
                { this.state.modalToShow && this.getModalToShow()}
            </div>
        );
    }
    
}