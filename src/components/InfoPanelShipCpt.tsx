import React from "react";
import * as xwingUtils from "../data/xwing_utils";
import * as xwingData from "../data/xwing_data";
import ActionsCpt from "./ActionsCpt";
import ManeuversCpt from "./ManeuversCpt";
import UpgradesCpt from "./UpgradesCpt";
import StatBlockCpt from "./StatBlockCpt";
import { Faction, Pilot, Ship } from "../data/xwing_data";

interface InfoPanelShipCptProps {
  ship: Ship;
  faction: Faction;
}

interface ShipData extends Ship {
  pilotsForShip: Pilot[];
  pilotSkills: number[];
  minPilotCost: number;
  maxPilotCost: number;
}

const InfoPanelShipCpt: React.FC<InfoPanelShipCptProps> = (props) => {
  const getShipData = (): ShipData => {
    //make a copy of the pilot so I don't have side effects on my "data repo"
    const shipData: ShipData = JSON.parse(JSON.stringify(props.ship));
    shipData.pilotsForShip = xwingData.pilots.filter(
      (pilot) =>
        pilot.ship === shipData.name && pilot.faction === props.faction,
    );

    shipData.pilotSkills = [];
    shipData.minPilotCost = shipData.pilotsForShip[0].points;
    shipData.maxPilotCost = shipData.pilotsForShip[0].points;
    for (const pilot of shipData.pilotsForShip) {
      if (!shipData.pilotSkills.includes(pilot.skill)) {
        shipData.pilotSkills.push(pilot.skill);
      }

      if (pilot.points < shipData.minPilotCost) {
        shipData.minPilotCost = pilot.points;
      } else if (pilot.points > shipData.maxPilotCost) {
        shipData.maxPilotCost = pilot.points;
      }
    }
    shipData.pilotSkills.sort((firstEle, secondEle) => firstEle - secondEle);

    return shipData;
  };

  const getPilotSkillsString = () => {
    let pilotSkillString = "";
    for (let i = 0; i < shipData.pilotSkills.length - 1; i++) {
      pilotSkillString += shipData.pilotSkills[i] + ", ";
    }
    pilotSkillString += shipData.pilotSkills[shipData.pilotSkills.length - 1];
    return pilotSkillString;
  };

  const shipData = getShipData();

  return (
    <div>
      <h3 className="infoName">{shipData.name}</h3>
      <h4 className="infoType">Ship</h4>
      <div>
        <strong>Base: </strong>
        <span>{xwingUtils.getShipBaseSize(shipData)}</span>
      </div>
      <div>
        <strong>Initiative: </strong>
        <span className="info-initiative">{getPilotSkillsString()}</span>
      </div>
      <div>
        <strong>Points: </strong>
        <span>{`${shipData.minPilotCost} - ${shipData.maxPilotCost}`}</span>
      </div>
      <div>
        <StatBlockCpt ship={shipData} />
      </div>
      <div>
        <strong>Actions:</strong>
        <ActionsCpt actions={shipData.actions} />
      </div>
      <div>
        <strong>Upgrades:</strong>
        <UpgradesCpt pilots={shipData.pilotsForShip} />
      </div>
      <div>
        <ManeuversCpt maneuvers={shipData.maneuvers} />
      </div>
    </div>
  );
};

export default InfoPanelShipCpt;
