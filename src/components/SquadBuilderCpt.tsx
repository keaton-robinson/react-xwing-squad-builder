import React, { useEffect, useState } from "react";
import { InfoPanelCard, Squad } from "../data/xwing_types";
import SquadHeader from "./SquadHeader";
import AddShipCpt from "./AddShipCpt";
import InfoPanelCpt from "./InfoPanelCpt";
import PilotRowCpt from "./PilotRowCpt";
import SquadManagementBarCpt from "./SquadManagementBarCpt";

interface SquadBuilderProps {
  squad: Squad;
}

const SquadBuilderCpt: React.FC<SquadBuilderProps> = ({ squad }) => {
  const [infoPanelCard, setInfoPanelCard] = useState<InfoPanelCard>(null);

  return (
    <div>
      <SquadHeader squad={squad} />
      <SquadManagementBarCpt squad={squad} />
      <div className="shipAndInfoContainer">
        <div className="shipSelectors">
          {squad.squadPilots.map((squadPilot) => (
            <PilotRowCpt
              key={squadPilot.squadPilotId}
              squad={squad}
              selectedPilot={squadPilot}
              onRecordMouseEnter={setInfoPanelCard}
            />
          ))}
          <AddShipCpt squad={squad} onRecordMouseEnter={setInfoPanelCard} />
        </div>
        {infoPanelCard ? <InfoPanelCpt card={infoPanelCard} /> : <div style={{ flex: 1 }}></div>}
      </div>
    </div>
  );
};

export default SquadBuilderCpt;
