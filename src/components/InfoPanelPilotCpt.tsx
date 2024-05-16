import React from "react";
import ActionsCpt from "./ActionsCpt";
import ManeuversCpt from "./ManeuversCpt";
import StatBlockCpt from "./StatBlockCpt";
import UpgradesCpt from "./UpgradesCpt";
import { pilotRules } from "../data/xwing_data";
import { SquadPilotShip } from "../data/xwing_types";
import { fixIcons, getPilotEffectiveStats, getShipBaseSize } from "../data/xwing_utils";

interface InfoPanelPilotCptProps {
  pilot?: SquadPilotShip;
}

const InfoPanelPilotCpt: React.FC<InfoPanelPilotCptProps> = (props) => {
  const getRulesMarkupForPilot = (pilotToShow) => {
    const thePilotRules = pilotRules[pilotToShow.name];
    if (thePilotRules) {
      return fixIcons(thePilotRules.text);
    }
    return null;
  };

  const pilotBaseStats = props.pilot;
  const pilotStatsAfterUpgrades: SquadPilotShip = getPilotEffectiveStats(props.pilot);

  return (
    <div>
      <h3 className="infoName">{`${pilotStatsAfterUpgrades.pilotName} ${pilotStatsAfterUpgrades.unique ? " *" : pilotStatsAfterUpgrades.max_per_squad ? `(Up to ${pilotStatsAfterUpgrades.max_per_squad})` : ""}`}</h3>
      <h4 className="infoType">Pilot</h4>
      <div>
        <strong>Ship: </strong>
        <span>{pilotStatsAfterUpgrades.ship}</span>
      </div>
      <div>
        <strong>Base: </strong>
        <span>{getShipBaseSize(pilotStatsAfterUpgrades)}</span>
      </div>
      <div>
        <strong>Initiative: </strong>
        <span className="info-initiative">{pilotStatsAfterUpgrades.skill}</span>
      </div>
      <div>
        <StatBlockCpt baseStats={pilotBaseStats} statsAfterUpgrades={pilotStatsAfterUpgrades} />
      </div>
      <div>
        <strong>Actions: </strong>
        <ActionsCpt actions={pilotStatsAfterUpgrades.actions} />
      </div>
      <div>
        <strong>Upgrades: </strong>
        <UpgradesCpt pilots={[pilotStatsAfterUpgrades]} />
      </div>
      <div
        className="info-text"
        dangerouslySetInnerHTML={{
          __html: getRulesMarkupForPilot(pilotStatsAfterUpgrades),
        }}
      />
      <div>
        <ManeuversCpt maneuvers={pilotBaseStats.maneuvers} maneuversAfterUpgrades={pilotStatsAfterUpgrades.maneuvers} />
      </div>
    </div>
  );
};

export default InfoPanelPilotCpt;
