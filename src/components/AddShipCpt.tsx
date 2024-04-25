import React, { useRef } from 'react';
import { Dropdown } from '@keatonr06/reactjs-dropdown-component';
import { DropDownStyles } from '../styleData/styleData';
import * as xwingData from '../data/xwing_data'
import * as xwingUtils from '../data/xwing_utils';
import { Pilot, Ship, ShipName, Upgrade } from '../data/xwing_data';
import { InfoPanelCardType, SelectedPilot } from '../data/xwing_utils';

interface AddShipCptProps {
    factionShips: ShipName[];
    onShipSelected: (ship: ShipName) => void;
    onRecordMouseEnter: (shipPilotOrUpgradeToShow: Ship | Pilot | SelectedPilot | Upgrade, cardType: InfoPanelCardType) => void;
}

const AddShipCpt:React.FC<AddShipCptProps> = (props) => {
    const shipsForCustomDropdown = props.factionShips.map(ship => ({ label: ship, value: ship}));
    const ddlAddShipRef = useRef(null);

    const handleShipSelection = (shipSelected) => {
        if(shipSelected){
            props.onShipSelected(shipSelected.value);
            ddlAddShipRef.current.clearSelection(); //tell parent component about new ship, but reset this dropdown's value to "none"
        }
    }

    const handleMouseEnter = (shipDropDownItem) => {
        const ship = xwingData.ships[shipDropDownItem.value]
        props.onRecordMouseEnter(ship, xwingUtils.InfoPanelCardTypes.Ship);
    }

    
    return (
        <div className="shipRow">
            <div className="shipAndPilotSelectorDiv">
                <Dropdown 
                    name="addShips"
                    titleSingular="Ship"
                    title="Add a ship"
                    list={shipsForCustomDropdown}
                    onChange={handleShipSelection}
                    ref={ddlAddShipRef}
                    styles={DropDownStyles}
                    onMouseEnter={handleMouseEnter}
                />
            </div>
        </div>
    );
}

export default AddShipCpt;