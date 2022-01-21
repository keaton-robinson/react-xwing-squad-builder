import React from 'react';
import * as xwingData from '../data/xwing_data';
import ActionsCpt from './ActionsCpt';
import ManeuversCpt from './ManeuversCpt';
import UpgradesCpt from './UpgradesCpt';

export default class InfoPanelShipCpt extends React.Component {

    shipData={};

    constructor(props) {
        super(props);

        this.getPilotSkillsString = this.getPilotSkillsString.bind(this);
        this.initializeShipData = this.initializeShipData.bind(this);
    }

    initializeShipData(){ 
        //object assign makes a copy of the pilot so I don't have side effects on my "data repo"
        Object.assign(this.shipData, xwingData.ships[this.props.dataKey]);
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
                <table className="info-stats">
                <tbody>
                    <tr><td>Base</td><td>{this.shipData.size}</td></tr>
                    <tr><td>Initiative</td><td className="info-initiative">{this.getPilotSkillsString()}</td></tr>
                    <tr><td>Points</td><td>{this.shipData.minPilotCost + "-" + this.shipData.maxPilotCost}</td></tr>
                    { this.shipData.attack ? 
                        <tr className="stat-icon">
                        <td><i className="xwing-miniatures-font xwing-miniatures-font-frontarc header-stat header-attack"></i></td>
                        <td className="info-attack">{this.shipData.attack}</td>
                        </tr>
                    : null }
                    { this.shipData.attackf ? 
                        <tr className="stat-icon">
                        <td><i className="xwing-miniatures-font xwing-miniatures-font-fullfrontarc header-stat header-attack"></i></td>
                        <td className="info-attack">{this.shipData.attackf}</td>
                        </tr>
                    : null }
                    { this.shipData.attackb ? 
                        <tr className="stat-icon">
                        <td><i className="xwing-miniatures-font xwing-miniatures-font-reararc header-stat header-attack"></i></td>
                        <td className="info-attack">{this.shipData.attackb}</td>
                        </tr>
                    : null }
                    { this.shipData.attackl ? 
                        <tr className="stat-icon">
                        <td><i className="xwing-miniatures-font xwing-miniatures-font-leftarc header-stat header-attack"></i></td>
                        <td className="info-attack">{this.shipData.attackl}</td>
                        </tr>
                    : null }
                    { this.shipData.attackr ? 
                        <tr className="stat-icon">
                        <td><i className="xwing-miniatures-font xwing-miniatures-font-rightarc header-stat header-attack"></i></td>
                        <td className="info-attack">{this.shipData.attackr}</td>
                        </tr>
                    : null }
                    { this.shipData.attackt ? 
                        <tr className="stat-icon">
                        <td><i className="xwing-miniatures-font xwing-miniatures-font-singleturretarc header-stat header-attack"></i></td>
                        <td className="info-attack">{this.shipData.attackt}</td>
                        </tr>
                    : null }
                    { this.shipData.attackdt ? 
                        <tr className="stat-icon">
                        <td><i className="xwing-miniatures-font xwing-miniatures-font-doubleturretarc header-stat header-attack"></i></td>
                        <td className="info-attack">{this.shipData.attackdt}</td>
                        </tr>
                    : null }
                    <tr className="stat-icon">
                        <td><i className="xwing-miniatures-font xwing-miniatures-font-agility header-stat header-agility"></i></td>
                        <td className="info-agility">{this.shipData.agility}</td>
                    </tr>
                    <tr className="stat-icon">
                        <td><i className="xwing-miniatures-font xwing-miniatures-font-hull header-stat header-hull"></i></td>
                        <td className="info-hull">{this.shipData.hull}</td>
                    </tr>
                    { this.shipData.shields ? 
                        <tr className="stat-icon">
                        <td><i className="xwing-miniatures-font xwing-miniatures-font-shield header-stat header-shield"></i></td>
                        <td className="info-shield">{this.shipData.shields}</td>
                        </tr> 
                    : null }
                    <tr>
                        <td>Actions</td>
                        <ActionsCpt actions={this.shipData.actions}/>
                    </tr>
                    <tr>
                        <td>Upgrades</td>
                        <UpgradesCpt pilots={this.shipData.pilotsForShip}/>
                    </tr>
                </tbody>
                </table>
                <ManeuversCpt maneuvers={this.shipData.maneuvers}/>
            </div>
        );

    }

}