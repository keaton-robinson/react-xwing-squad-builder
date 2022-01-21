import React from 'react';

import * as xwingData from '../data/xwing_data';

export default class UpgradesCpt extends React.Component{

    slotCountAcrossPilots = {};  
    //example after constructor finishes: {'Torpedo':{numPerPilot: 2, numPilots: 4} 'Astromech':{numPerPilot: 2, numPilots: 4}, 'Talent': {numPerPilot: 2, numPilots: 4}, 'Force': {numPerPilot: 2, numPilots: 4}}

    constructor(props){
        super(props);


        for(const pilot of props.pilots){
            let slotCountForCurrentPilot = {};
            for(const slot of pilot.slots){
                if(!slotCountForCurrentPilot[slot]){
                    slotCountForCurrentPilot[slot] = 1;
                } else {
                    slotCountForCurrentPilot[slot]++;
                }
            }

            for(const slotCount of Object.entries(slotCountForCurrentPilot)){
                if(!this.slotCountAcrossPilots[slotCount[0]]){
                    this.slotCountAcrossPilots[slotCount[0]] = {numPilots: 1, numSlotsPerPilot: slotCountForCurrentPilot[slotCount[0]]};
                } else {
                    this.slotCountAcrossPilots[slotCount[0]].numPilots++;
                }
            }
        }
    }

    getSlotMarkup(slot){
        let slotName = slot[0];
        let numSlotsPerPilot = slot[1].numSlotsPerPilot;
        let upgradeIsAvailableToAllPilots = slot[1].numPilots == this.props.pilots.length;  //slot count is slot[1].numPilots
        let innerHtml = "";
        for(let i = 0; i < numSlotsPerPilot; i++){
            innerHtml += xwingData.sloticon[slotName];
        } 
        
        if(!upgradeIsAvailableToAllPilots){
            innerHtml = "(" + innerHtml + ")";
        }
        return <span key={slotName} dangerouslySetInnerHTML={{__html: innerHtml}}></span>;
    }



    render(){
        return (
            <td>
                {Object.entries(this.slotCountAcrossPilots).map(slot => this.getSlotMarkup(slot) )}
            </td>
        );
    }

}