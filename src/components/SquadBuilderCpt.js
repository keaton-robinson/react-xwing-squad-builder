import React from 'react';
import InfoPanelCpt from './InfoPanelCpt';
import PilotRowCpt from './PilotRowCpt';
import AddShipCpt from './AddShipCpt';
import ModalContainer from './modals/ModalContainer';
import PrintSquadModal from './modals/PrintSquadModal';
import * as xwingData from '../data/xwing_data';
import * as xwingUtils from '../data/xwing_utils'

export default class SquadBuilderCpt extends React.Component {
    
    

    nextUIKey = 0;
    
    constructor(props) {
        super(props);

        this.factionShips = Object.keys(xwingData.ships).filter(ship => xwingData.ships[ship].factions.includes(props.faction)).sort();

        this.state = {
            squad: [],
            showPrintModal: false,
            infoPanelCardToShow: null // will expect an object of format { type: ("Ship"/"Pilot"/"Upgrade"), key: (string, number, number) }
        };
    }

    togglePrintModal = () => {
        const state = this.state;
        this.setState({ ...state, showPrintModal: !state.showPrintModal });
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
        appReadyNewPilot.uiKey = ++this.nextUIKey;
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

    

    render() {
        return (
            <div style={this.props.faction !== this.props.selectedFaction ? { display: 'none'} : {}}>
                <div className="squad-name-and-points-row">
                    <div>
                        <h3>{`${this.props.faction} Squadron`}</h3>
                    </div>
                    <div className="points-display-container">
                        <span>Points: { xwingUtils.getSquadCost(this.state.squad) }/200 ({200-xwingUtils.getSquadCost(this.state.squad)} left)</span>
                    </div>
                    <div className='printBtn'>
                        <button className="btn-info" onClick={this.togglePrintModal}>Print</button>
                        {/* <button className="btn-danger">Randomize!</button> */}
                    </div>
                </div>
                <div className="squad-save-import-row">
                    <button className="btn-info">Import</button>
                    <button className="btn-danger">New Squad</button>
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
                    {this.state.infoPanelCardToShow ? <InfoPanelCpt cardToShow={this.state.infoPanelCardToShow} faction={this.props.faction}/> : null }  
                </div>
                { this.state.showPrintModal 
                && <ModalContainer handleClose={this.togglePrintModal} 
                        headerTitle={`${this.props.selectedFaction} Squadron (${xwingUtils.getSquadCost(this.state.squad)})` }
                        children={
                            <PrintSquadModal squad={this.state.squad} />
                        }
                    />}
            </div>
        );
    }
    
}