const React = require('react');
const { Dropdown } = require('@keatonr06/reactjs-dropdown-component');
const { DropDownStyles } = require('../styleData/styleData.js');
const xwingData = require('../data/xwing_data.js');
const xwingUtils = require('../data/xwing_utils.js');

class AddShipCpt extends React.Component {
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

module.exports = AddShipCpt;