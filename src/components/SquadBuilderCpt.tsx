import React from "react";
import { Squad } from "../data/xwing_types";
import SquadNamePointsPrint from "./SquadNamePointsPrint";

interface SquadBuilderProps {
  squad: Squad;
}

const SquadBuilderCpt: React.FC<SquadBuilderProps> = ({ squad }) => {
  return (
    <div>
      <SquadNamePointsPrint squad={squad} />
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
        <div className="shipAndObstacleSelectors">
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
          {/* <AddShipCpt
            factionShips={factionShips}
            onShipSelected={addCheapestAvailablePilotForShip}
            onRecordMouseEnter={showInfoPanelCard}
          /> */}
        </div>
        {/* {state.infoPanelCard ? (
          <InfoPanelCpt card={state.infoPanelCard} faction={props.faction} />
        ) : (
          <div style={{ flex: 1 }}></div>
        )} */}
      </div>
    </div>
  );
};

export default SquadBuilderCpt;
