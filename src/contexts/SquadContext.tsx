import React, { createContext, useContext, useReducer } from "react";
import { Faction, Squad, SquadPilotShip } from "../data/xwing_types";

const SquadsContext = createContext<ReadonlyArray<Squad>>(null);
const SquadsDispatchContext = createContext<React.Dispatch<SquadsDispatchAction>>(null);

export function useSquads() {
  return useContext(SquadsContext);
}

export function useSquadsDispatch() {
  return useContext(SquadsDispatchContext);
}

export const SquadsProvider = ({ children }) => {
  const [squads, dispatch] = useReducer(squadsReducer, initialSquadsState);

  return (
    <SquadsContext.Provider value={squads}>
      <SquadsDispatchContext.Provider value={dispatch}>{children}</SquadsDispatchContext.Provider>
    </SquadsContext.Provider>
  );
};

type SquadsDispatchAction =
  | { type: "renameSquad"; squad: Squad; newName: string }
  | { type: "addToSquad"; squad: Squad; newPilot: SquadPilotShip };

const squadsReducer = (squads: ReadonlyArray<Squad>, action: SquadsDispatchAction) => {
  switch (action.type) {
    case "renameSquad":
      return squads.map((squadInState) => {
        if (action.squad !== squadInState) return squadInState;
        return {
          ...squadInState,
          name: action.newName,
        };
      });
    case "addToSquad":
      return squads.map((squadInState) => {
        if (action.squad !== squadInState) return squadInState;
        return {
          ...squadInState,
          squadPilots: [...squadInState.squadPilots, action.newPilot],
        };
      });
  }
};

export const factionsOrdered: Faction[] = [
  "Rebel Alliance",
  "Galactic Empire",
  "Scum and Villainy",
  "Resistance",
  "First Order",
  "Galactic Republic",
  "Separatist Alliance",
];

const initialSquadsState: Squad[] = factionsOrdered.map((factionName): Squad => {
  return {
    id: null,
    faction: factionName,
    name: `${factionName} Squadron`,
    squadPilots: [],
  };
});
