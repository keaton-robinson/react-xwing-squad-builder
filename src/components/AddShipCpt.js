import React from 'react';
import { Dropdown } from '@keatonr06/reactjs-dropdown-component';
import { DropDownStyles } from '../styleData/styleData';
import * as xwingData from '../data/xwing_data'
import * as xwingUtils from '../data/xwing_utils';

export default class AddShipCpt extends React.Component {
    constructor(props) {
        super(props);

        this.shipsForCustomDropdown = this.props.factionShips.map(ship => ({ label: ship, value: ship}));
        this.ddlAddShipRef = React.createRef();
    }

    handleShipSelection = (shipSelected) => {
        if(shipSelected){
            this.props.onShipSelected(shipSelected.value);
            this.ddlAddShipRef.current.clearSelection(); //tell parent component about new ship, but reset this dropdown's value to "none"
        }
    }

    handleMouseEnter = (shipDropDownItem) => {
        const ship = xwingData.ships[shipDropDownItem.value]
        this.props.onRecordMouseEnter(ship, xwingUtils.InfoPanelCardTypes.Ship);
    }

    render() {
        return (
            <div className="shipRow">
                <div className="shipAndPilotSelectorDiv">
                    <Dropdown 
                        name="addShips"
                        titleSingular="Ship"
                        title="Add a ship"
                        list={this.shipsForCustomDropdown}
                        onChange={this.handleShipSelection}
                        ref={this.ddlAddShipRef}
                        styles={DropDownStyles}
                        onMouseEnter={this.handleMouseEnter}
                    />
                </div>
            </div>
        );
    }
}