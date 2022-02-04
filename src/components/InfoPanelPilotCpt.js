import React from 'react';
import * as xwingData from '../data/xwing_data';
import ActionsCpt from './ActionsCpt';
import ManeuversCpt from './ManeuversCpt';
import UpgradesCpt from './UpgradesCpt';

export default class InfoPanelPilotCpt extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        //const pilot = this.props.isSelectedPilot ? this.props.dataKey  ;
        let pilot;

        if(this.props.isSelectedPilot){
            pilot = JSON.parse(JSON.stringify(this.props.selectedPilot));
        } else {
            pilot = JSON.parse(JSON.stringify(this.props.pilot));
        }


        return (
            <div>
                <h3 className="infoName">{pilot.name}</h3>
                <h4 className="infoType">Pilot</h4>
                {this.props.isSelectedPilot ? "Selected" : "Not selected!"}            
            </div>
        );
    }

}