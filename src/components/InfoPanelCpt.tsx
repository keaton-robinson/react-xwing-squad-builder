import React from "react";
import InfoPanelShipCpt from "./InfoPanelShipCpt";
import InfoPanelUpgradeCpt from "./InfoPanelUpgradeCpt";
import InfoPanelPilotCpt from "./InfoPanelPilotCpt";
import { InfoPanelCard, Faction } from "../data/xwing_types";

interface InfoPanelCptProps {
  card: InfoPanelCard;
  faction: Faction;
}

const InfoPanelCpt: React.FC<InfoPanelCptProps> = (props) => {
  let childPanel;

  switch (props.card.type) {
    case "Ship":
      childPanel = <InfoPanelShipCpt ship={props.card.cardData} faction={props.faction} />;
      break;
    case "Upgrade":
      childPanel = <InfoPanelUpgradeCpt upgrade={props.card.cardData} />;
      break;
    case "Pilot":
      childPanel = <InfoPanelPilotCpt pilot={props.card.cardData} isSelectedPilot={false} />;
      break;
    case "SelectedPilot":
      childPanel = <InfoPanelPilotCpt selectedPilot={props.card.cardData} isSelectedPilot={true} />;
      break;
  }

  return (
    <div className="infoPanelMaster">
      <div className="infoPanel">{childPanel}</div>
    </div>
  );
};

export default InfoPanelCpt;
