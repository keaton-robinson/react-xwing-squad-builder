import React from 'react';
import InfoPanelCpt from './InfoPanelCpt';
import PilotRowCpt from './PilotRowCpt';
import AddShipCpt from './AddShipCpt';
import * as xwingData from '../data/xwing_data';
import * as xwingUtils from '../data/xwing_utils'

export default class SquadBuilderCpt extends React.Component {
    
    state = {
        squad: []
    };

    nextUIKey = 0;
    
    constructor(props) {
        super(props);

        this.addPilot = this.addPilot.bind(this);
        this.changePilot = this.changePilot.bind(this);
        this.removePilot = this.removePilot.bind(this);
        this.addCheapestAvailablePilotForShip = this.addCheapestAvailablePilotForShip.bind(this);
        this.changeShip = this.changeShip.bind(this);
        this.clonePilot = this.clonePilot.bind(this);
        this.changeUpgrade = this.changeUpgrade.bind(this);
        this.setUpgradesOnNewPilot = this.setUpgradesOnNewPilot.bind(this);
        

        this.factionShips = Object.keys(xwingData.ships).filter(ship => xwingData.ships[ship].factions.includes(props.faction)).sort();

    }

    removeInvalidUpgradesAndSetState(updatedSquad){
        xwingUtils.removeInvalidUpgrades(updatedSquad);
        this.setState({ squad: updatedSquad });
    }

    setUpgradesOnNewPilot(appReadyNewPilot, upgradesToApply, squadIncludingNewPilot) {
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

    addPilot(pilotToAdd, upgradesToApply) {
        const appReadyNewPilot = xwingUtils.getAppReadyPilot(pilotToAdd);
        appReadyNewPilot.uiKey = ++this.nextUIKey;
        const newSquadAfterAddition = [...this.state.squad, appReadyNewPilot];

        this.setUpgradesOnNewPilot(appReadyNewPilot, upgradesToApply, newSquadAfterAddition);
        this.removeInvalidUpgradesAndSetState(newSquadAfterAddition);
    }

    changePilot(prevSelectedPilot, newPilot, copyUpgrades = true) {
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

    removePilot(pilotToRemove) {
        const squadCopy = [...this.state.squad];
        const indexOfPilotToChange = squadCopy.findIndex(pilot => pilot.uiKey === pilotToRemove.uiKey);
        squadCopy.splice(indexOfPilotToChange, 1);

        this.removeInvalidUpgradesAndSetState(squadCopy);       
    }
    

    addCheapestAvailablePilotForShip(ship, upgradesToInclude){
        const cheapestAvailablePilot = xwingUtils.getCheapestAvailablePilotForShip(ship, this.props.faction, this.state.squad);
        if(cheapestAvailablePilot){
            this.addPilot(cheapestAvailablePilot, upgradesToInclude);
        } else {
            alert("No more pilots available for " + ship);
        }
    }

    changeShip(shipToChangeTo, prevSelectedPilot) {
        const cheapestAvailablePilotForShip = xwingUtils.getCheapestAvailablePilotForShip(shipToChangeTo, this.props.faction, this.state.squad);
        if(cheapestAvailablePilotForShip){
            this.changePilot(prevSelectedPilot, cheapestAvailablePilotForShip, false);
        } else {
            alert("No more pilots available for " + shipToChangeTo);
        }
    }


    clonePilot(pilot) {
        if(xwingUtils.maxPilotOrUpgradeReached(pilot, this.state.squad)) {
            this.addCheapestAvailablePilotForShip(pilot.ship, pilot.selectedUpgrades);
        } else {
            this.addPilot(pilot, pilot.selectedUpgrades);
        }
    }

    changeUpgrade(upgradeSlot, newlySelectedUpgrade, pilot) {
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
                        <select name="format" id="format">
                            <option value="Extended">Extended</option>
                            <option value="Hyperspace">Hyperspace</option>
                            <option value="Epic">Epic</option>
                            <option value="QuickBuild">QuickBuild</option>
                        </select>
                    </div>
                    <div className="points-display-container">
                        <span>Points: { xwingUtils.getSquadCost(this.state.squad) }/200 ({200-xwingUtils.getSquadCost(this.state.squad)} left)</span>
                    </div>
                    <div>
                        <button className="btn-info">Print/Export</button>
                        <button className="btn-danger">Randomize!</button>
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
                                changeUpgrade = { this.changeUpgrade } />
                        ))}
                        <AddShipCpt factionShips={this.factionShips} onShipSelected={this.addCheapestAvailablePilotForShip}/>
                        <div>
                            <button className="btn-info">Choose Obstacles</button>
                        </div>
                    </div>
                    <InfoPanelCpt />
                </div>
            </div>
        );
    }
    
}