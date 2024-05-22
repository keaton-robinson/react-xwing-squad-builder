import React, { useEffect, useState } from "react";
import { InfoPanelCard, Squad } from "../data/xwing_types";
import SquadHeader from "./SquadHeader";
import AddShipCpt from "./AddShipCpt";
import InfoPanelCpt from "./InfoPanelCpt";
import PilotRowCpt from "./PilotRowCpt";

interface SquadBuilderProps {
  squad: Squad;
}

const SquadBuilderCpt: React.FC<SquadBuilderProps> = ({ squad }) => {
  const [infoPanelCard, setInfoPanelCard] = useState<InfoPanelCard>(null);

  return (
    <div>
      <SquadHeader squad={squad} />
      {/* <SaveLoad
        faction={props.faction}
        squad={state.squad}
        squadName={state.squadName}
        onSquadSaved={(newSquadId: string): void => {
          setState({ ...state, squadId: newSquadId });
        }}
        onSquadNameChanged={(newName: string): void => {
          setState({ ...state, squadName: newName });
        }}
        onSquadLoaded={(loadedSquad: {
          _id: string;
          name: string;
          pilots: SelectedPilotThatAllowsMutations[];
        }): void => {
          setState({
            ...initialState,
            squadId: loadedSquad._id,
            squad: loadedSquad.pilots,
            squadName: loadedSquad.name,
          });
        }}
        onNewSquadStarted={(): void => {
          setState(initialState);
        }}
      /> */}
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
