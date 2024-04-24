import React, { Context } from 'react';
import InfoPanelCpt from './InfoPanelCpt';
import PilotRowCpt from './PilotRowCpt';
import AddShipCpt from './AddShipCpt';
import PrintSquadModal from './modals/PrintSquadModal';
import SaveLoadNew from './SaveLoadNewCpt';
import * as xwingData from '../data/xwing_data';
import { Faction, ShipName } from '../data/xwing_data';
import * as xwingUtils from '../data/xwing_utils';
import { UserContext, UserContextBundle } from '../contexts/UserContext'; 
import { SelectedPilot } from '../data/xwing_utils';

interface SquadBuilderCptProps {
    selectedFaction: Faction;
    faction: Faction;
    setModal: (modalConfig: any) => void;
}

export interface SquadBuilderCptState {
    squadId: string;
    squad: SelectedPilot[];
    squadName: string;
    infoPanelCardToShow: { type: any, cardData: any}
    saveStatusMessage: string,
    editingSquadName: boolean,
}

export default class SquadBuilderCpt extends React.Component<SquadBuilderCptProps, SquadBuilderCptState> {
    factionShips: ShipName[];
    initialState: SquadBuilderCptState;
    fetchAbortController: AbortController;
    loggedInUserOnPreviousRender: boolean;
    context: UserContextBundle;
    willUnmount: boolean;

    
	constructor(props) {
        super(props);

        this.factionShips = Object.keys(xwingData.ships).filter(ship => xwingData.ships[ship].factions.includes(props.faction)).sort() as ShipName[];

        //initial state useful for reverting to defaults for "new squad" button
        this.initialState = {
            squadId: null,
            squad: [],
            squadName: `${this.props.faction} Squadron`,
            infoPanelCardToShow: null,
            saveStatusMessage: null,
            editingSquadName: false,
        };
        this.state = this.initialState;
    }

    componentDidMount() {
			this.fetchAbortController = new AbortController();
			this.loggedInUserOnPreviousRender = this.context?.user?.username;
    }

	componentDidUpdate() {
		// TODO: research better ways of doing this
		// a probably improper way of clearing the squad builder if the user logs out. 
		// part of the reason to clear squad builder is to avoid a loaded squad's _id mongo property attempting to copy to a new user's squads
		// could just remove that property from the squad instead, but clearing the squad builder is probably expected behavior for my audience (software dev interviewers)
		if(this.loggedInUserOnPreviousRender && !(this.context?.user?.username)){
			this.setState( this.initialState );
		}

		this.loggedInUserOnPreviousRender = this.context?.user?.username;
	}

    componentWillUnmount() {
			this.fetchAbortController.abort();
			this.willUnmount = true;
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
                    configSelUpgradeSlot.selectedUpgradeId = xwingData.upgrades.find(upgrade => upgrade.name == autoEquipUpgrade).id; // TODO: directly mutated state?
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
                <SaveLoadNew faction={this.props.faction} squad={this.state.squad} squadName={this.state.squadName} 
                    onSquadSaved={ (newSquadId: string): void =>  {
                        this.setState({ squadId: newSquadId });
                    } } onSquadNameChanged={(newName: string): void => {
                        this.setState({ squadName: newName});
                    } } onSquadLoaded={(loadedSquad: {_id: string, name: string, pilots: SelectedPilot[]}): void => {
                        this.setState({...this.initialState, squadId: loadedSquad._id, squad: loadedSquad.pilots, squadName: loadedSquad.name});
                    } } onNewSquadStarted={(): void => {
                        this.setState(this.initialState);
                    } }
                />
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