import React from 'react';
import * as xwingData from '../data/xwing_data';

export default class InfoPanelUpgradeCpt extends React.Component {

    constructor(props) {
        super(props);
    }

    renderRestrictions = (upgrade) => {
        if(upgrade.faction || upgrade.ship || upgrade.restrictions){
            const restrictionsToRender = [];
            if(upgrade.faction){
                let allowedFaction;
                if(Array.isArray(upgrade.faction)){
                    let orUniqueRestriction = upgrade.restrictions.find(restr => restr[0] == "orUnique");
                    if(orUniqueRestriction){
                        //or unique only allows one faction or with a unique character (character part handled later)
                        allowedFaction = upgrade.restrictions.find(restr => restr[0] == "Faction")[1];
                        restrictionsToRender.push(`${allowedFaction} or squad containing ${orUniqueRestriction[1]}`);
                    } else {
                        for(let faction of upgrade.faction){   
                            restrictionsToRender.push(faction);
                        }
                    }
                } else {
                    restrictionsToRender.push(upgrade.faction);
                }
            }
            if(upgrade.ship){
                restrictionsToRender.push(upgrade.ship);
            }
            if(upgrade.restrictions){
                for(let restriction of upgrade.restrictions){
                    const restrictionType = restriction[0];
                    const restrictionValue = restriction[1];

                    switch(restrictionType){
                        case 'Base':
                            if(restrictionValue == "Standard"){
                                restrictionsToRender.push("Non-huge ship");
                            } else{
                                restrictionsToRender.push(`${restrictionValue} ship`);
                            }
                            break;
                        case 'Action':
                            restrictionsToRender.push(`${restrictionValue} action`);
                            break;
                        case 'Slot':
                            restrictionsToRender.push(`Extra ${restrictionValue} slot`);
                            break;
                        case 'orUnique':
                            //do nothing, already handled in the faction step
                            break;
                        case 'Faction':
                            //do nothing, already handled in the faction step
                            break;
                        case 'AttackArc':
                            if(restrictionValue === "Rear Arc"){
                                restrictionsToRender.push("Rear firing arc required");
                            }
                            break;
                        case 'Keyword':
                            restrictionsToRender.push(restrictionValue);
                            break;
                        case 'isUnique':
                            if(restrictionValue){
                                restrictionsToRender.push("Unique pilot");
                            } else {
                                restrictionsToRender.push("Generic pilot");
                            }
                            break;
                        case 'Equipped':
                            restrictionsToRender.push(`${restrictionValue} equipped`);
                            break;
                        case 'ShieldsGreaterThan':
                            restrictionsToRender.push(`Shields greater than ${restrictionValue}`);
                            break;
                        case 'InitiativeGreaterThan':
                            restrictionsToRender.push(`Initiative greater than ${restrictionValue}`);
                            break;
                        case 'InitiativeLessThan':
                            restrictionsToRender.push(`Initiative less than ${restrictionValue}`);
                            break;
                        case 'EnergyGreaterThan':
                            restrictionsToRender.push(`Energy greater than ${restrictionValue}`);
                            break;
                        case 'AgilityEquals':
                            restrictionsToRender.push(`Agility ${restrictionValue} ship`);
                            break;
                    }
                }
            }
            return (
                <div>
                    <strong>Restrictions: </strong>{restrictionsToRender.map(restrictionToRender => <span>{`${restrictionToRender}, `}</span>)}
                </div>);
        } 
        return null;    
    }

    fixIcons = (text) => {
        if (text != null){
            return text.replace(/%BULLSEYEARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-bullseyearc"></i>')
            .replace(/%SINGLETURRETARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-singleturretarc"></i>')
            .replace(/%DOUBLETURRETARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-doubleturretarc"></i>')
            .replace(/%FRONTARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-frontarc"></i>')
            .replace(/%REARARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-reararc"></i>')
            .replace(/%LEFTARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-leftarc"></i>')
            .replace(/%RIGHTARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-rightarc"></i>')
            .replace(/%ROTATEARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-rotatearc"></i>')
            .replace(/%FULLFRONTARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-fullfrontarc"></i>')
            .replace(/%FULLREARARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-fullreararc"></i>')
            .replace(/%DEVICE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-device"></i>')
            .replace(/%MODIFICATION%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-modification"></i>')
            .replace(/%RELOAD%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-reload"></i>')
            .replace(/%FORCE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-forcecharge"></i>')
            .replace(/%CHARGE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-charge"></i>')
            .replace(/%ENERGY%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-energy"></i>')
            .replace(/%CALCULATE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-calculate"></i>')
            .replace(/%BANKLEFT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-bankleft"></i>')
            .replace(/%BANKRIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-bankright"></i>')
            .replace(/%BARRELROLL%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-barrelroll"></i>')
            .replace(/%BOOST%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-boost"></i>')
            .replace(/%CANNON%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-cannon"></i>')
            .replace(/%CARGO%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-cargo"></i>')
            .replace(/%CLOAK%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-cloak"></i>')
            .replace(/%F-COORDINATE%/g, '<i class="xwing-miniatures-font force xwing-miniatures-font-coordinate"></i>')
            .replace(/%COORDINATE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-coordinate"></i>')
            .replace(/%CRIT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-crit"></i>')
            .replace(/%ASTROMECH%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-astromech"></i>')
            .replace(/%GUNNER%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-gunner"></i>')
            .replace(/%CREW%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-crew"></i>')
            .replace(/%DUALCARD%/g, '<span class="card-restriction">Dual card.</span>')
            .replace(/%ELITE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-elite"></i>')
            .replace(/%TACTICALRELAY%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-tacticalrelay"></i>')
            .replace(/%SALVAGEDASTROMECH%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-salvagedastromech"></i>')
            .replace(/%HARDPOINT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-hardpoint"></i>')
            .replace(/%EVADE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-evade"></i>')
            .replace(/%FOCUS%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-focus"></i>')
            .replace(/%HIT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-hit"></i>')
            .replace(/%ILLICIT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-illicit"></i>')
            .replace(/%JAM%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-jam"></i>')
            .replace(/%KTURN%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-kturn"></i>')
            .replace(/%MISSILE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-missile"></i>')
            .replace(/%RECOVER%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-recover"></i>')
            .replace(/%F-REINFORCE%/g, '<i class="xwing-miniatures-font force xwing-miniatures-font-reinforce"></i>')
            .replace(/%REINFORCE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-reinforce"></i>')
            .replace(/%REVERSESTRAIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-reversestraight"></i>')
            .replace(/%REVERSEBANKLEFT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-reversebankleft"></i>')
            .replace(/%REVERSEBANKRIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-reversebankright"></i>')
            .replace(/%SHIELD%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-shield"></i>')
            .replace(/%SLAM%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-slam"></i>')
            .replace(/%SLOOPLEFT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-sloopleft"></i>')
            .replace(/%SLOOPRIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-sloopright"></i>')
            .replace(/%STRAIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-straight"></i>')
            .replace(/%STOP%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-stop"></i>')
            .replace(/%SENSOR%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-sensor"></i>')
            .replace(/%LOCK%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-lock"></i>')
            .replace(/%TORPEDO%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-torpedo"></i>')
            .replace(/%TROLLLEFT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-trollleft"></i>')
            .replace(/%TROLLRIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-trollright"></i>')
            .replace(/%TURNLEFT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-turnleft"></i>')
            .replace(/%TURNRIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-turnright"></i>')
            .replace(/%TURRET%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-turret"></i>')
            .replace(/%UTURN%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-kturn"></i>')
            .replace(/%TALENT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-talent"></i>')
            .replace(/%TITLE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-title"></i>')
            .replace(/%TEAM%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-team"></i>')
            .replace(/%TECH%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-tech"></i>')
            .replace(/%FORCEPOWER%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-forcepower"></i>')
            .replace(/%LARGESHIPONLY%/g, '<span class="card-restriction">Large ship only.</span>')
            .replace(/%SMALLSHIPONLY%/g, '<span class="card-restriction">Small ship only.</span>')
            .replace(/%REBELONLY%/g, '<span class="card-restriction">Rebel only.</span>')
            .replace(/%IMPERIALONLY%/g, '<span class="card-restriction">Imperial only.</span>')
            .replace(/%SCUMONLY%/g, '<span class="card-restriction">Scum only.</span>')
            .replace(/%LIMITED%/g, '<span class="card-restriction">Limited.</span>')
            .replace(/%CONFIGURATION%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-config"></i>')
            .replace(/%AGILITY%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-agility"></i>')
            .replace(/%HULL%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-hull"></i>')
            .replace(/%LINEBREAK%/g, "<br /><br />")
        } 
    }

    renderRules = (upgrade) => {
        return <div dangerouslySetInnerHTML={{__html: this.fixIcons(xwingData.upgradeRules[upgrade.name].text)}} />
    }

    render() {
        const upgrade = xwingData.upgrades.find(upgr => upgr.id === this.props.dataKey);

        return (
            <div>
                <h3 className="infoName">{upgrade.name}</h3>
                <h4 className="infoType">Upgrade</h4>
                <table className="info-stats">
                    <tbody>
                        { upgrade.attack ? 
                            <tr className="stat-icon">
                            <td><i className="xwing-miniatures-font xwing-miniatures-font-frontarc header-stat header-attack"></i></td>
                            <td className="info-attack">{upgrade.attack}</td>
                            </tr>
                        : null }
                        { upgrade.attackf ? 
                            <tr className="stat-icon">
                            <td><i className="xwing-miniatures-font xwing-miniatures-font-fullfrontarc header-stat header-attack"></i></td>
                            <td className="info-attack">{upgrade.attackf}</td>
                            </tr>
                        : null }
                        { upgrade.attackb ? 
                            <tr className="stat-icon">
                            <td><i className="xwing-miniatures-font xwing-miniatures-font-reararc header-stat header-attack"></i></td>
                            <td className="info-attack">{upgrade.attackb}</td>
                            </tr>
                        : null }
                        { upgrade.attackl ? 
                            <tr className="stat-icon">
                            <td><i className="xwing-miniatures-font xwing-miniatures-font-leftarc header-stat header-attack"></i></td>
                            <td className="info-attack">{upgrade.attackl}</td>
                            </tr>
                        : null }
                        { upgrade.attackr ? 
                            <tr className="stat-icon">
                            <td><i className="xwing-miniatures-font xwing-miniatures-font-rightarc header-stat header-attack"></i></td>
                            <td className="info-attack">{upgrade.attackr}</td>
                            </tr>
                        : null }
                        { upgrade.attackt ? 
                            <tr className="stat-icon">
                            <td><i className="xwing-miniatures-font xwing-miniatures-font-singleturretarc header-stat header-attack"></i></td>
                            <td className="info-attack">{upgrade.attackt}</td>
                            </tr>
                        : null }
                        { upgrade.attackdt ? 
                            <tr className="stat-icon">
                            <td><i className="xwing-miniatures-font xwing-miniatures-font-doubleturretarc header-stat header-attack"></i></td>
                            <td className="info-attack">{upgrade.attackdt}</td>
                            </tr>
                        : null }
                        { upgrade.agility ?  
                            <tr className="stat-icon">
                                <td><i className="xwing-miniatures-font xwing-miniatures-font-agility header-stat header-agility"></i></td>
                                <td className="info-agility">{upgrade.agility}</td>
                            </tr>
                        : null }
                        { upgrade.hull ? 
                            <tr className="stat-icon">
                                <td><i className="xwing-miniatures-font xwing-miniatures-font-hull header-stat header-hull"></i></td>
                                <td className="info-hull">{upgrade.hull}</td>
                            </tr>
                        : null }
                        { upgrade.shields ? 
                            <tr className="stat-icon">
                            <td><i className="xwing-miniatures-font xwing-miniatures-font-shield header-stat header-shield"></i></td>
                            <td className="info-shield">{upgrade.shields}</td>
                            </tr> 
                        : null }
                        { upgrade.force ? 
                            <tr className="stat-icon">
                            <td><i className="xwing-miniatures-font header-force xwing-miniatures-font-forcecharge"></i></td>
                            <td className="info-force">{upgrade.force}</td>
                            </tr>
                        : null }
                        { upgrade.charge ? 
                            <tr className="stat-icon">
                            <td><i className="xwing-miniatures-font header-charge xwing-miniatures-font-charge"></i></td>
                            <td className="info-charge">{upgrade.charge}</td>
                            </tr>
                        : null } 
                    </tbody>
                </table>
                { this.renderRestrictions(upgrade) }
                <br/>
                { this.renderRules(upgrade) }
            </div>
        );
    }
}