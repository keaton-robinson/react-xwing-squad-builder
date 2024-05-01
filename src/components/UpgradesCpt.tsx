import React from "react";
import { sloticon } from "../data/xwing_data";

interface UpgradesCptProps {
  pilots: any;
}

const UpgradesCpt: React.FC<UpgradesCptProps> = (props) => {
  const getSlotMarkup = (slot) => {
    let slotName = slot[0];
    let numSlotsPerPilot = slot[1].numSlotsPerPilot;
    let upgradeIsAvailableToAllPilots = slot[1].numPilots === props.pilots.length; //slot count is slot[1].numPilots
    let innerHtml = "";
    for (let i = 0; i < numSlotsPerPilot; i++) {
      innerHtml += sloticon[slotName];
    }

    if (!upgradeIsAvailableToAllPilots) {
      innerHtml = "(" + innerHtml + ")";
    }
    return <span key={slotName} dangerouslySetInnerHTML={{ __html: innerHtml }}></span>;
  };

  const slotCountAcrossPilots = {};
  //example: {'Torpedo':{numPerPilot: 2, numPilots: 4} 'Astromech':{numPerPilot: 2, numPilots: 4}, 'Talent': {numPerPilot: 2, numPilots: 4}, 'Force': {numPerPilot: 2, numPilots: 4}}

  //grrr...having to do this sort of thing in the render method seems inefficient....wonder if it could go somewhere else...
  for (const pilot of props.pilots) {
    let slotCountForCurrentPilot = {};
    for (const slot of pilot.slots) {
      if (!slotCountForCurrentPilot[slot]) {
        slotCountForCurrentPilot[slot] = 1;
      } else {
        slotCountForCurrentPilot[slot]++;
      }
    }

    for (const slotCount of Object.entries(slotCountForCurrentPilot)) {
      if (!slotCountAcrossPilots[slotCount[0]]) {
        slotCountAcrossPilots[slotCount[0]] = {
          numPilots: 1,
          numSlotsPerPilot: slotCountForCurrentPilot[slotCount[0]],
        };
      } else {
        slotCountAcrossPilots[slotCount[0]].numPilots++;
      }
    }
  }

  return <span>{Object.entries(slotCountAcrossPilots).map((slot) => getSlotMarkup(slot))}</span>;
};

export default UpgradesCpt;
