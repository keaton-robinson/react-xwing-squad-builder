import React from 'react';
import * as xwingData from '../data/xwing_data';
import ActionsCpt from './ActionsCpt';
import ManeuversCpt from './ManeuversCpt';
import UpgradesCpt from './UpgradesCpt';
import StatBlockCpt from './StatBlockCpt.js';

export default class InfoPanelShipCpt extends React.Component {

    shipData={};

    constructor(props) {
        super(props);

        this.getPilotSkillsString = this.getPilotSkillsString.bind(this);
        this.initializeShipData = this.initializeShipData.bind(this);
    }

    initializeShipData(){ 
        //make a copy of the pilot so I don't have side effects on my "data repo"
        this.shipData = JSON.parse(JSON.stringify(this.props.ship))
        this.shipData.pilotsForShip = xwingData.pilots.filter(pilot => pilot.ship == this.shipData.name && pilot.faction == this.props.faction);

        if(this.shipData.huge){
            this.shipData.size = "huge";
        }
        else if(this.shipData.large){
            this.shipData.size = "large";
        } 
        else if(this.shipData.medium) {
            this.shipData.size = "medium";
        } 
        else {
            this.shipData.size = "small";
        }

        this.shipData.pilotSkills = [];
        this.shipData.minPilotCost = this.shipData.pilotsForShip[0].points;
        this.shipData.maxPilotCost = this.shipData.pilotsForShip[0].points;
        for(const pilot of this.shipData.pilotsForShip) {
            if(!this.shipData.pilotSkills.includes(pilot.skill)){
                this.shipData.pilotSkills.push(pilot.skill);
            }

            if(pilot.points < this.shipData.minPilotCost) {
                this.shipData.minPilotCost = pilot.points;
            }
            else if(pilot.points > this.shipData.maxPilotCost){
                this.shipData.maxPilotCost = pilot.points;
            }
        }
        this.shipData.pilotSkills.sort((firstEle, secondEle) => (firstEle - secondEle));
    }

    getPilotSkillsString(){
        let pilotSkillString = "";
        for(let i=0; i < this.shipData.pilotSkills.length-1; i++){
            pilotSkillString += this.shipData.pilotSkills[i] + ", ";
        }
        pilotSkillString += this.shipData.pilotSkills[this.shipData.pilotSkills.length-1];
        return pilotSkillString;
    }


    render() {

        this.initializeShipData();

        return (
            <div>
                <h3 className="infoName">{this.shipData.name}</h3>
                <h4 className="infoType">Ship</h4>
                <StatBlockCpt ship={this.shipData}/>
                <div>
                    <strong>Actions:</strong>
                    <ActionsCpt actions={this.shipData.actions}/>
                </div>
                <div>
                    <strong>Upgrades:</strong>
                    <UpgradesCpt pilots={this.shipData.pilotsForShip}/>
                </div>
                <ManeuversCpt maneuvers={this.shipData.maneuvers}/>
            </div>
        );

    }

}