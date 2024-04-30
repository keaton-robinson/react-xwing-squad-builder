import React from "react";
import ActionsCpt from "./ActionsCpt";
import ManeuversCpt from "./ManeuversCpt";
import StatBlockCpt from "./StatBlockCpt";
import UpgradesCpt from "./UpgradesCpt";
import { Pilot, pilotRules, ships, upgrades } from "../data/xwing_data";
import {
  SelectedPilot,
  fixIcons,
  getAppReadyPilot,
  getPilotEffectiveStats,
  getShipBaseSize,
} from "../data/xwing_utils";

interface InfoPanelPilotCptProps {
  isSelectedPilot: boolean;
  pilot?: Pilot;
  selectedPilot?: SelectedPilot;
}

const InfoPanelPilotCpt: React.FC<InfoPanelPilotCptProps> = (props) => {
  const getRulesMarkupForPilot = (pilotToShow) => {
    const thePilotRules = pilotRules[pilotToShow.name];
    if (thePilotRules) {
      return fixIcons(thePilotRules.text);
    }
    return null;
  };

  //const pilot = props.isSelectedPilot ? props.dataKey  ;
  let pilotBaseStats;

  if (props.isSelectedPilot) {
    pilotBaseStats = props.selectedPilot;
  } else {
    pilotBaseStats = getAppReadyPilot(props.pilot, ships);
  }

  const pilotEffectiveStats = getPilotEffectiveStats(pilotBaseStats, upgrades);

  return (
    <div>
      <h3 className="infoName">{pilotEffectiveStats.name}</h3>
      <h4 className="infoType">Pilot</h4>
      <div>
        <strong>Ship: </strong>
        <span>{pilotEffectiveStats.pilotShip.name}</span>
      </div>
      <div>
        <strong>Base: </strong>
        <span>{getShipBaseSize(pilotEffectiveStats.pilotShip)}</span>
      </div>
      <div>
        <strong>Initiative: </strong>
        <span className="info-initiative">{pilotEffectiveStats.skill}</span>
      </div>
      <div>
        <StatBlockCpt
          pilot={pilotBaseStats}
          pilotAfterUpgrades={pilotEffectiveStats}
        />
      </div>
      <div>
        <strong>Actions: </strong>
        <ActionsCpt actions={pilotEffectiveStats.pilotShip.actions} />
      </div>
      <div>
        <strong>Upgrades: </strong>
        <UpgradesCpt pilots={[pilotEffectiveStats]} />
      </div>
      <div
        className="info-text"
        dangerouslySetInnerHTML={{
          __html: getRulesMarkupForPilot(pilotEffectiveStats),
        }}
      />
      <div>
        <ManeuversCpt
          maneuvers={pilotBaseStats.pilotShip.maneuvers}
          maneuversAfterUpgrades={pilotEffectiveStats.pilotShip.maneuvers}
        />
      </div>
    </div>
  );
};

export default InfoPanelPilotCpt;
