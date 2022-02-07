import React from 'react';
import * as xwingData from '../data/xwing_data';
import * as xwingUtils from '../data/xwing_utils';
import ActionsCpt from './ActionsCpt';
import ManeuversCpt from './ManeuversCpt';
import StatBlockCpt from './StatBlockCpt';
import UpgradesCpt from './UpgradesCpt';

export default class InfoPanelPilotCpt extends React.Component {

    constructor(props){
        super(props);
    }

    getRulesMarkupForPilot = (pilotToShow) => {
        return xwingUtils.fixIcons(xwingData.pilotRules[pilotToShow.name].text);
    }

    render(){
        //const pilot = this.props.isSelectedPilot ? this.props.dataKey  ;
        let pilotBaseStats;

        if(this.props.isSelectedPilot){
            pilotBaseStats = this.props.selectedPilot;
        } else {
            pilotBaseStats = xwingUtils.getAppReadyPilot(this.props.pilot);
        }

        const pilotEffectiveStats = xwingUtils.getPilotEffectiveStats(pilotBaseStats);


        return (
            <div>
                <h3 className="infoName">{pilotEffectiveStats.name}</h3>
                <h4 className="infoType">Pilot</h4>
                <div><strong>Ship: </strong><span>{pilotEffectiveStats.pilotShip.name}</span></div>
                <div><strong>Base: </strong><span>{xwingUtils.getShipBaseSize(pilotEffectiveStats.pilotShip)}</span></div>
                <div><strong>Initiative: </strong><span className='info-initiative'>{pilotEffectiveStats.skill}</span></div>
                <div><StatBlockCpt pilot={pilotBaseStats} pilotAfterUpgrades={pilotEffectiveStats}/></div>
                <div><strong>Actions: </strong><ActionsCpt actions={pilotEffectiveStats.pilotShip.actions}/></div>
                <div><strong>Upgrades: </strong><UpgradesCpt pilots={[pilotEffectiveStats]}/></div>
                <div className='info-rules-text' dangerouslySetInnerHTML={{__html: this.getRulesMarkupForPilot(pilotEffectiveStats)}}/>
                <div><ManeuversCpt maneuvers={pilotBaseStats.pilotShip.maneuvers} maneuversAfterUpgrades={pilotEffectiveStats.pilotShip.maneuvers}/></div>
                            
            </div>
        );
    }

}