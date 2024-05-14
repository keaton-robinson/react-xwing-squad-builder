import React, { useEffect, useState } from "react";
import { InfoPanelCard, Squad } from "../data/xwing_types";
import SquadHeader from "./SquadHeader";
import AddShipCpt from "./AddShipCpt";
import InfoPanelCpt from "./InfoPanelCpt";

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
            <h3>{squadPilot.pilotName}</h3>
          ))}
          {/* {state.squad.map((squadPilot) => (
            <PilotRowCpt
              key={squadPilot.uiKey}
              factionShips={factionShips}
              squad={state.squad}
              selectedPilot={squadPilot}
              availablePilots={pilots
                .filter(
                  (availPilot) =>
                    availPilot.ship === squadPilot.ship &&
                    availPilot.faction === props.faction &&
                    (!maxPilotOrUpgradeReached(availPilot, state.squad, upgrades) || availPilot.id === squadPilot.id),
                )
                .sort((first, second) => first.points - second.points)}
              changePilot={changePilot}
              changeShip={changeShip}
              removePilot={removePilot}
              clonePilot={clonePilot}
              changeUpgrade={changeUpgrade}
              onRecordMouseEnter={showInfoPanelCard}
            />
          ))} */}
          <AddShipCpt squad={squad} onRecordMouseEnter={setInfoPanelCard} />
        </div>
        {infoPanelCard ? <InfoPanelCpt card={infoPanelCard} /> : <div style={{ flex: 1 }}></div>}
      </div>
    </div>
  );
};

export default SquadBuilderCpt;
