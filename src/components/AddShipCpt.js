import React from 'react';
import * as xwingData from '../data/xwing_data';


export default class AddShipCpt extends React.Component {
    constructor(props) {
        super(props);

        this.handleShipSelection = this.handleShipSelection.bind(this);
    }

    handleShipSelection(e) {
        this.props.onShipSelected(e.target.value);
        e.target.value = ""  //tell parent component about new ship, but reset this dropdown's value to "none"
    }

    render() {
        return (
            <div className="shipRow">
                <div className="shipAndPilotSelectorDiv">
                    <select className="shipSelector"  onChange={this.handleShipSelection}>
                        <option key="" value="">Select a ship</option>
                        {this.props.factionShips.map(ship=> (
                            <option key={ship} value={ship}>{ship}</option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }
}