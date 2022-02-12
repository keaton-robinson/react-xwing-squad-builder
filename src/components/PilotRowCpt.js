import React from 'react';
import * as xwingData from '../data/xwing_data';
import * as xwingUtils from '../data/xwing_utils';
import ShipUpgradeCpt from './ShipUpgradeCpt';
import { Dropdown } from '@keatonr06/reactjs-dropdown-component';
import { DropDownStyles } from '../styleData/styleData';

export default class PilotRowCpt extends React.Component {

    constructor(props) {
        super(props);
        this.ddlSelectPilotRef = React.createRef();
    }

    handleShipSelection = (selectedShip) => {
        if(selectedShip.value != this.props.selectedPilot.ship){
            this.props.changeShip(selectedShip.value, this.props.selectedPilot);
        }
    }

    handlePilotSelection = (selectedPilot) =>  {
        if(selectedPilot.value != this.props.selectedPilot.id)
        {
            this.props.changePilot(this.props.selectedPilot, this.props.availablePilots.find(pilot => pilot.id == selectedPilot.value));
        }
    }

    handleShipMouseEnter = (shipDropDownItem) => {
        this.handleMouseEnter(xwingData.ships[shipDropDownItem.value], xwingUtils.InfoPanelCardTypes.Ship);
    }

    handlePilotMouseEnter = (pilotDropDownItem) => {
        this.handleMouseEnter(pilotDropDownItem.pilotRecord, xwingUtils.InfoPanelCardTypes.Pilot);
    }

    handleUpgradeMouseEnter = (upgrade) => {
        this.handleMouseEnter(upgrade, xwingUtils.InfoPanelCardTypes.Upgrade);
    }

    handleMouseEnter = (shipPilotOrUpgradeRecord, type) => {
        this.props.onRecordMouseEnter(shipPilotOrUpgradeRecord, type);
    }

    handlePilotHeaderMouseEnter = () => {
        this.props.onRecordMouseEnter(this.props.selectedPilot, xwingUtils.InfoPanelCardTypes.SelectedPilot);
    }

    delBtnPressed = (e) => {
        this.props.removePilot(this.props.selectedPilot);
    }

    cloneBtnPressed = (e) => {
        this.props.clonePilot(this.props.selectedPilot);
    }

    componentDidUpdate = (prevProps) => {
        //the custom dropdowns don't automatically update their selected item or "title" on re-renders, sadly
        let current = this.ddlSelectPilotRef.current;
        if(current.state.selectedItem.value != this.props.selectedPilot.id){
            current.selectSingleItem({value: this.props.selectedPilot.id});
        }
    }

    
    render() {
        const shipsForCustomDropdown = this.props.factionShips.map(ship => ({ label: ship, value: ship}));
        const pilotsForCustomDropDown = this.props.availablePilots.map(pilot => ({ label: pilot.name + " (" + pilot.points + ")", value: pilot.id, pilotRecord: pilot}));
        return (
            <div className={'shipRow ship-' + PilotRowCpt.getShipBackgroundStylePostFix(this.props.selectedPilot.ship)}>
                <div className="shipAndPilotSelectorDiv">
                    <div>
                        <Dropdown 
                            name="selectShip"
                            titleSingular="Ship"
                            title="Select a ship"
                            list={shipsForCustomDropdown}
                            onChange={this.handleShipSelection}
                            select={{value: this.props.selectedPilot.ship}}
                            styles={DropDownStyles}
                            onMouseEnter={this.handleShipMouseEnter}
                        />
                    </div>
                    <div>
                        <Dropdown 
                            name="selectPilot"
                            titleSingular="Pilot"
                            title="Select a pilot"
                            list={pilotsForCustomDropDown}
                            onChange={this.handlePilotSelection}
                            select={{value: this.props.selectedPilot.id}}
                            ref={this.ddlSelectPilotRef}
                            styles={DropDownStyles}
                            onHeaderMouseEnter={this.handlePilotHeaderMouseEnter}
                            onMouseEnter={this.handlePilotMouseEnter}
                        />
                    </div>
                </div>
                <div className="shipPointCost hideOnMobile">
                    <span>{ xwingUtils.getPilotCost(this.props.selectedPilot)}</span>
                </div>
                <div className="onlyShowOnMobile" style={{backgroundColor: 'rgb(32,32,32, .6)', maxWidth: '300px'}}>
                    Upgrades:
                </div>
                <div className="shipUpgrades">
                    { this.props.selectedPilot.selectedUpgrades.map(selectedUpgrade => (
                        <ShipUpgradeCpt key={ selectedUpgrade.key }
                            upgradeSlot= {selectedUpgrade}
                            changeUpgrade= {this.props.changeUpgrade}
                            pilot= {this.props.selectedPilot}
                            squad= {this.props.squad}
                            onRecordMouseEnter= {this.handleUpgradeMouseEnter}
                        />
                    )) }
                </div> 
                <div className="deleteOrCopyShip">
                    <span className="onlyShowOnMobile">{`Total ship points: ${xwingUtils.getPilotCost(this.props.selectedPilot)}  `}</span>
                    <button className="btn-danger" onClick={this.delBtnPressed}>Delete</button>
                    <button className="btn-info" onClick={this.cloneBtnPressed}>Clone</button>
                </div>
            </div>
        );
    }


    static getShipBackgroundStylePostFix(shipName)
    {
        switch(shipName) {
            case xwingData.ships['X-Wing'].name:
                return "xwing"
            case xwingData.ships['Y-Wing'].name:
                return "ywing";
            case xwingData.ships['A-Wing'].name:
                return "awing";
            case xwingData.ships['TIE Fighter'].name:
                return "tiefighter";
            case xwingData.ships['TIE Advanced'].name:
                return "tieadvanced";
            case xwingData.ships['TIE Interceptor'].name:
                return "tieinterceptor";
            case xwingData.ships['YT-1300'].name:
                return "yt1300"
            case xwingData.ships['Firespray-31'].name:
                return "firespray31";
            case xwingData.ships['B-Wing'].name:
                return "bwing";
            case xwingData.ships['TIE Bomber'].name:
                return "tiebomber";
            case xwingData.ships['Lambda-Class Shuttle'].name:
                return "lambdaclassshuttle";
            case xwingData.ships['HWK-290'].name:
                return "hwk290";
            case xwingData.ships.StarViper.name:
                return "starviper";
            case xwingData.ships['Z-95 Headhunter'].name:
                return "z95headhunter";
            case xwingData.ships['M3-A Interceptor'].name:
                return "m3ainterceptor";
            case xwingData.ships['YT-2400'].name:
                return "yt2400";
            case xwingData.ships['VT-49 Decimator'].name:
                return "vt49decimator";
            case xwingData.ships['TIE Defender'].name:
                return "tiedefender";
            case xwingData.ships['TIE Phantom'].name:
                return "tiephantom";
            case xwingData.ships.Aggressor.name:
                return "aggressor";
            case xwingData.ships['TIE/FO Fighter'].name:
                return "tiefofighter";
            case xwingData.ships['T-70 X-Wing'].name:
                return "t70xwing";
            case xwingData.ships['TIE Advanced Prototype'].name:
                return "tieadvancedprototype";
            case xwingData.ships['VCX-100'].name:
                return "vcx100";
            case xwingData.ships['Attack Shuttle'].name:
                return "attackshuttle";
            case xwingData.ships['ARC-170'].name:
                return "arc170";
            case xwingData.ships['Lancer-Class Pursuit Craft'].name:
                return "lancerclasspursuitcraft";
            case xwingData.ships['Fang Fighter'].name:
                return "fangfighter";
            case xwingData.ships['TIE/SF Fighter'].name:
                return "tiesffighter";
            case xwingData.ships['Upsilon-Class Command Shuttle'].name:
                return "upsilonclasscommandshuttle";
            case xwingData.ships['TIE Aggressor'].name:
                return "tieaggressor";
            case xwingData.ships['K-Wing'].name:
                return "kwing";
            case xwingData.ships['Sheathipede-Class Shuttle'].name:
                return "sheathipedeclassshuttle";
            case xwingData.ships['Auzituck Gunship'].name:
                return "auzituckgunship";
            case xwingData.ships['U-Wing'].name:
                return "uwing";
            case xwingData.ships['Alpha-Class Star Wing'].name:
                return "alphaclassstarwing";
            case xwingData.ships['TIE Punisher'].name:
                return "tiepunisher";
            case xwingData.ships['TIE Striker'].name:
                return "tiestriker";
            case xwingData.ships['G-1A Starfighter'].name:
                return "g1astarfighter";
            case xwingData.ships['JumpMaster 5000'].name:
                return "jumpmaster5000";
            case xwingData.ships['Kihraxz Fighter'].name:
                return "kihraxzfighter";
            case xwingData.ships['M12-L Kimogila Fighter'].name:
                return "m12lkimogilafighter";
            case xwingData.ships['Customized YT-1300'].name:
                return "customizedyt1300";
            case xwingData.ships['Mining Guild TIE Fighter'].name:
                return "miningguildtiefighter";
            case xwingData.ships.Quadjumper.name:
                return "quadjumper";
            case xwingData.ships['Scurrg H-6 Bomber'].name:
                return "scurrgh6bomber";
            case xwingData.ships['YV-666'].name:
                return "yv666";
            case xwingData.ships['TIE/SF Fighter'].name:
                return "tiesffighter";
            case xwingData.ships['TIE/VN Silencer'].name:
                return "tievnsilencer";
            case xwingData.ships['Scavenged YT-1300'].name:
                return "scavengedyt1300";
            case xwingData.ships['MG-100 StarFortress'].name:
                return "mg100starfortress";
            case xwingData.ships['RZ-2 A-Wing'].name:
                return "rz2awing";
            case xwingData.ships['Escape Craft'].name:
                return "escapecraft";
            case xwingData.ships['Resistance Transport'].name:
                return "resistancetransport";
            case xwingData.ships['Naboo Royal N-1 Starfighter'].name:
                return "nabooroyaln1starfighter";
            case xwingData.ships['Hyena-Class Droid Bomber'].name:
                return "hyenaclassdroidbomber";
            case xwingData.ships['Delta-7 Aethersprite'].name:
                return "delta7aethersprite";
            case xwingData.ships['V-19 Torrent'].name:
                return "v19torrent";
            case xwingData.ships['Belbullab-22 Starfighter'].name:
                return "belbullab22starfighter";
            case xwingData.ships['Sith Infiltrator'].name:
                return "sithinfiltrator";
            case xwingData.ships['BTL-B Y-Wing'].name:
                return "btlbywing";
            case xwingData.ships['Nantex-Class Starfighter'].name:
                return "nantexclassstarfighter";
            case xwingData.ships['Vulture-class Droid Fighter'].name:
                return "vultureclassdroidfighter";
            case xwingData.ships['E-Wing'].name:
                return "ewing";
            case xwingData.ships['TIE Reaper'].name:
                return "tiereaper";
            case xwingData.ships.Fireball.name:
                return "fireball";
            case xwingData.ships['TIE/Ba Interceptor'].name:
                return "tiebainterceptor";
            case xwingData.ships['Resistance Transport Pod'].name:
                return "resistancetransportpod";
            case xwingData.ships['TIE/rb Heavy'].name:
                return "tierbheavy";
            case xwingData.ships['Xi-class Light Shuttle'].name:
                return "xiclasslightshuttle";
            case xwingData.ships['Eta-2 Actis'].name:
                return "eta2actis";
            case xwingData.ships['LAAT/i Gunship'].name:
                return "laatigunship";
            case xwingData.ships['Nimbus-class V-Wing'].name:
                return "nimbusclassvwing";
            case xwingData.ships['Syliure-class Hyperspace Ring'].name:
                return "syliureclasshyperspacering";
            case xwingData.ships['Droid Tri-Fighter'].name:
                return "droidtrifighter";
            case xwingData.ships['HMP Droid Gunship'].name:
                return "hmpdroidgunship";
            case xwingData.ships['GR-75 Medium Transport'].name:
                return "gr75mediumtransport";
            case xwingData.ships['CR90 Corellian Corvette'].name:
                return "cr90corelliancorvette";
            case xwingData.ships['C-ROC Cruiser'].name:
                return "croccruiser";
            case xwingData.ships['Gozanti-class Cruiser'].name:
                return "gozanticlasscruiser";
            case xwingData.ships['Raider-class Corvette'].name:
                return "raiderclasscorvette";
            case xwingData.ships['Trident-class Assault Ship'].name:
                return "tridentclassassaultship";
            default:
              return "";
          }
    }
}



