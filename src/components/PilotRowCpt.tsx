import React, { useRef } from 'react';
import * as xwingData from '../data/xwing_data';
import * as xwingUtils from '../data/xwing_utils';
import ShipUpgradeCpt from './ShipUpgradeCpt';
import { Dropdown } from '@keatonr06/reactjs-dropdown-component';
import { DropDownStyles } from '../styleData/styleData';
import { InfoPanelCardType, SelectedPilot } from '../data/xwing_utils';
import { Pilot, Ship, ShipName, Upgrade } from '../data/xwing_data';

interface PilotRowCptProps {
    factionShips: xwingData.ShipName[];
    squad: SelectedPilot[];
    selectedPilot: SelectedPilot;
    availablePilots: Pilot[];
    changePilot: (prevSelectedPilot: SelectedPilot, newPilot: Pilot, copyUpgrades?: boolean) => void;
    changeShip: (shipToChangeTo: ShipName, prevSelectedPilot: SelectedPilot) => void;
    removePilot: (pilotToRemove: SelectedPilot) => void;
    clonePilot: (pilot: SelectedPilot) => void;
    changeUpgrade: (upgradeSlot: xwingUtils.SelectedUpgrade, newlySelectedUpgrade: xwingData.Upgrade, pilot: SelectedPilot) => void;
    onRecordMouseEnter: (shipPilotOrUpgradeToShow: Ship | Pilot | SelectedPilot | Upgrade, cardType: InfoPanelCardType) => void;
}

const PilotRowCpt:React.FC<PilotRowCptProps> = (props) => {
    const ddlSelectPilotRef = useRef(null);

    const shipsForCustomDropdown = props.factionShips.map(ship => ({ label: ship, value: ship}));
    const pilotsForCustomDropDown = props.availablePilots.map(pilot => ({ label: pilot.name + " (" + pilot.points + ")", value: pilot.id, pilotRecord: pilot}));

    const handleShipSelection = (selectedShip) => {
        if(selectedShip.value != props.selectedPilot.ship){
            props.changeShip(selectedShip.value, props.selectedPilot);
        }
    }

    const handlePilotSelection = (selectedPilot) =>  {
        if(selectedPilot.value != props.selectedPilot.id)
        {
            props.changePilot(props.selectedPilot, props.availablePilots.find(pilot => pilot.id == selectedPilot.value));
        }
    }

    const handleShipMouseEnter = (shipDropDownItem) => {
        handleMouseEnter(xwingData.ships[shipDropDownItem.value], xwingUtils.InfoPanelCardTypes.Ship);
    }

    const handlePilotMouseEnter = (pilotDropDownItem) => {
        handleMouseEnter(pilotDropDownItem.pilotRecord, xwingUtils.InfoPanelCardTypes.Pilot);
    }

    const handleUpgradeMouseEnter = (upgrade) => {
        handleMouseEnter(upgrade, xwingUtils.InfoPanelCardTypes.Upgrade);
    }

    const handleMouseEnter = (shipPilotOrUpgradeRecord, type) => {
        props.onRecordMouseEnter(shipPilotOrUpgradeRecord, type);
    }

    const handlePilotHeaderMouseEnter = () => {
        props.onRecordMouseEnter(props.selectedPilot, xwingUtils.InfoPanelCardTypes.SelectedPilot);
    }

    const delBtnPressed = (e) => {
        props.removePilot(props.selectedPilot);
    }

    const cloneBtnPressed = (e) => {
        props.clonePilot(props.selectedPilot);
    }
        
    return (
        <div className={'shipRow ship-' + getShipBackgroundStylePostFix(props.selectedPilot.ship)}>
            <div className="shipAndPilotSelectorDiv">
                <div>
                    <Dropdown 
                        name="selectShip"
                        titleSingular="Ship"
                        title="Select a ship"
                        list={shipsForCustomDropdown}
                        onChange={handleShipSelection}
                        select={{value: props.selectedPilot.ship}}
                        styles={DropDownStyles}
                        onMouseEnter={handleShipMouseEnter}
                    />
                </div>
                <div>
                    <Dropdown 
                        name="selectPilot"
                        titleSingular="Pilot"
                        title="Select a pilot"
                        list={pilotsForCustomDropDown}
                        onChange={handlePilotSelection}
                        select={{value: props.selectedPilot.id}}
                        ref={ddlSelectPilotRef}
                        styles={DropDownStyles}
                        onHeaderMouseEnter={handlePilotHeaderMouseEnter}
                        onMouseEnter={handlePilotMouseEnter}
                    />
                </div>
            </div>
            <div className="shipPointCost hideOnMobile">
                <span>{ xwingUtils.getPilotCost(props.selectedPilot, xwingData.upgrades)}</span>
            </div>
            <div className="onlyShowOnMobile" style={{backgroundColor: 'rgb(32,32,32, .6)', maxWidth: '300px'}}>
                Upgrades:
            </div>
            <div className="shipUpgrades">
                { props.selectedPilot.selectedUpgrades.map(selectedUpgrade => (
                    <span key={selectedUpgrade.key} data-upgrade-slot={selectedUpgrade.key} >
                        <ShipUpgradeCpt 
                            upgradeSlot= {selectedUpgrade}
                            changeUpgrade= {props.changeUpgrade}
                            pilot= {props.selectedPilot}
                            squad= {props.squad}
                            onRecordMouseEnter= {handleUpgradeMouseEnter}
                        />
                    </span>
                )) }
            </div> 
            <div className="deleteOrCopyShip" style={{marginTop:"5px"}}>
                <span className="onlyShowOnMobile">{`Total ship points: ${xwingUtils.getPilotCost(props.selectedPilot, xwingData.upgrades)}  `}</span>
                <button className="btn-danger" onClick={delBtnPressed}>Delete</button>
                <button className="btn-info" onClick={cloneBtnPressed}>Clone</button>
            </div>
        </div>
    );
};


export default PilotRowCpt;

const getShipBackgroundStylePostFix = (shipName) => {
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



