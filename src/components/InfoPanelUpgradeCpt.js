import React from 'react';
import * as xwingData from '../data/xwing_data';
import * as xwingUtils from '../data/xwing_utils';
import ActionsCpt from './ActionsCpt';
import StatBlockCpt from './StatBlockCpt.js';

export default class InfoPanelUpgradeCpt extends React.Component {

    constructor(props) {
        super(props);
    }

    renderRestrictions = (upgrade) => {
        if(upgrade.faction || upgrade.ship || upgrade.restrictions){
            const textRestrictions = [];
            const actionRestrictions = [];

            if(upgrade.faction){
                let allowedFaction;
                if(Array.isArray(upgrade.faction)){
                    let orUniqueRestriction = upgrade.restrictions?.find(restr => restr[0] == "orUnique");
                    if(orUniqueRestriction){
                        //or unique only allows one faction or with a unique character (character part handled later)
                        allowedFaction = upgrade.restrictions.find(restr => restr[0] == "Faction")[1];
                        textRestrictions.push(`${allowedFaction} or squad containing ${orUniqueRestriction[1]}`);
                    } else {
                        for(let faction of upgrade.faction){   
                            textRestrictions.push(faction);
                        }
                    }
                } else {
                    textRestrictions.push(upgrade.faction);
                }
            }
            if(upgrade.ship){
                textRestrictions.push(upgrade.ship);
            }
            if(upgrade.restrictions){
                for(let restriction of upgrade.restrictions){
                    const restrictionType = restriction[0];
                    const restrictionValue = restriction[1];

                    switch(restrictionType){
                        case 'Base':
                            if(restrictionValue == "Standard"){
                                textRestrictions.push("Non-huge ship");
                            } else{
                                textRestrictions.push(`${restrictionValue} ship`);
                            }
                            break;
                        case 'Slot':
                            textRestrictions.push(`Extra ${restrictionValue} slot`);
                            break;
                        case 'orUnique':
                            //do nothing, already handled in the faction step
                            break;
                        case 'Faction':
                            //do nothing, already handled in the faction step
                            break;
                        case 'AttackArc':
                            if(restrictionValue === "Rear Arc"){
                                textRestrictions.push("Rear firing arc required");
                            }
                            break;
                        case 'Keyword':
                            textRestrictions.push(restrictionValue);
                            break;
                        case 'isUnique':
                            if(restrictionValue){
                                textRestrictions.push("Unique pilot");
                            } else {
                                textRestrictions.push("Generic pilot");
                            }
                            break;
                        case 'Equipped':
                            textRestrictions.push(`${restrictionValue} equipped`);
                            break;
                        case 'ShieldsGreaterThan':
                            textRestrictions.push(`Shields greater than ${restrictionValue}`);
                            break;
                        case 'InitiativeGreaterThan':
                            textRestrictions.push(`Initiative greater than ${restrictionValue}`);
                            break;
                        case 'InitiativeLessThan':
                            textRestrictions.push(`Initiative less than ${restrictionValue}`);
                            break;
                        case 'EnergyGreaterThan':
                            textRestrictions.push(`Energy greater than ${restrictionValue}`);
                            break;
                        case 'AgilityEquals':
                            textRestrictions.push(`Agility ${restrictionValue} ship`);
                            break;
                        case 'Action':
                            actionRestrictions.push(`${restrictionValue}`);
                            break;
                    }
                }
            }
            return (
                <div>
                    <strong>Restrictions: </strong>
                    {
                        textRestrictions.map((restriction, index) => (
                        <span key={`${upgrade.id}_${index}`}>
                            {restriction + (index < textRestrictions.length-1  || actionRestrictions.length > 0 ? ", " : "")}
                        </span>))
                    }
                    {actionRestrictions.length > 0 ? 
                        <ActionsCpt actions={actionRestrictions} /> 
                        : null
                    }
                </div>);
        } 
        return null;    
    }

    renderRules = (upgrade) => {
        let removestext =''
        let addText=''; 
        let comma = '';

        const statchange = {
            attack: 0,
            attackf: 0,
            attackbull: 0,
            attackb: 0,
            attackt: 0,
            attackl: 0,
            attackr: 0,
            attackdt: 0,
            energy: 0,
            agility: 0,
            hull: 0,
            shields: 0,
            force: 0,
            actions: [],
            maneuvers: [0, 0]
        };

        if(upgrade.modifier_func){
            upgrade.modifier_func(statchange);
            if(statchange.attack != 0){
                addText += comma + `%FRONTARC% (${statchange.attack})`
                comma = ', '
            }
            if(statchange.attackf != 0){
                addText += comma + `%FULLFRONTARC% (${statchange.attackf})`
                comma = ', '
            }
            if(statchange.attackbull != 0){
                addText += comma + `%BULLSEYEARC% (${statchange.attackbull})`
                comma = ', '
            }
            if(statchange.attackb != 0){
                addText += comma + `%REARARC% (${statchange.attackb})`
                comma = ', '
            }
            if(statchange.attackt != 0){
                addText += comma + `%SINGLETURRETARC% (${statchange.attackt})`
                comma = ', '
            }
            if(statchange.attackl != 0){
                addText += comma + `%LEFTARC% (${statchange.attackl})`
                comma = ', '
            }
            if(statchange.attackr != 0){
                addText += comma + `%RIGHTARC% (${statchange.attackr})`
                comma = ', '
            }
            if(statchange.attackdt != 0){
                addText += comma + `%DOUBLETURRETARC% (${statchange.attackdt})`
                comma = ', '
            }
            if(statchange.energy != 0){
                addText += comma + `%ENERGY% (${statchange.energy})`
                comma = ', '
            }
            if(statchange.agility != 0){
                addText += comma + `%AGILITY% (${statchange.agility})`
                comma = ', '
            }
            if(statchange.hull != 0){
                addText += comma + `%HULL% (${statchange.hull})`
                comma = ', '
            }
            if(statchange.shields != 0){
                addText += comma + `%SHIELD% (${statchange.shields})`
                comma = ', '
            }
        }
        if(upgrade.confersAddons){
            for(const addonname of upgrade.confersAddons){
                addText += comma + `%${addonname.slot.toUpperCase().replace(/[^a-z0-9]/gi, '')}%`; 
                comma = ', ';
            }
        }
        if(upgrade.unequips_upgrades){
            comma = '';
            for(const slot of upgrade.unequips_upgrades){
                removestext += comma + `%${slot.toUpperCase().replace(/[^a-z0-9]/gi, '')}%`;
                comma = ', ';
            }
        }

        return (
        <div>
            { addText != '' ? 
                <div><strong>Adds: </strong><span dangerouslySetInnerHTML={{__html: xwingUtils.fixIcons(addText)}}/></div>
            : null }
            { statchange.actions.length > 0 ? 
                <div><strong>Adds Actions: </strong><ActionsCpt actions={statchange.actions}/></div>
            : null }
            { removestext != '' ?
                <div><strong>Removes: </strong><span dangerouslySetInnerHTML={{__html: xwingUtils.fixIcons(removestext)}}/></div> 
            : null }
            <div className='info-rules-text' dangerouslySetInnerHTML={{__html: xwingUtils.fixIcons(xwingData.upgradeRules[upgrade.name].text)}}/>
        </div>)
    }

    render() {
        const upgrade = this.props.upgrade;

        return (
            <div>
                <h3 className="infoName">{upgrade.name}</h3>
                <h4 className="infoType">Upgrade</h4>
                <StatBlockCpt upgrade={upgrade}/>
                { upgrade.range ? 
                    <div style={{'marginTop':'5px'}}>
                        <span>
                            <strong>Range </strong><span>{upgrade.range}</span>
                        </span>
                        <span style={{ 'marginLeft':'10px' }}>
                            { upgrade.rangebonus ? 
                                <i className="xwing-miniatures-font red header-range xwing-miniatures-font-rangebonusindicator"></i>
                            : null}
                        </span>
                    </div>
                : null }
                { this.renderRestrictions(upgrade) }
                { this.renderRules(upgrade) }
            </div>
        );
    }
}