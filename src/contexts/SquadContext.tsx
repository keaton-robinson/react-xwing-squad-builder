import React, { createContext, useContext, useReducer } from "react";
import { Faction, Pilot, Ship, ShipName, Squad, SquadPilotShip, Upgrade } from "../data/xwing_types";
import { getCheapestAvailablePilotForShip, getSquadPilotShip } from "../data/xwing_utils";

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
  | {
      type: "addShip";
      squad: Squad;
      newShip: ShipName;
      shipsData: Record<string, Ship>;
      upgradesData: Upgrade[];
      pilotsData: Pilot[];
    }
  | {
      type: "changeShip";
      squad: Squad;
      currentPilot: SquadPilotShip;
      newShip: ShipName;
      shipsData: Record<string, Ship>;
      upgradesData: Upgrade[];
      pilotsData: Pilot[];
    }
  | {
      type: "clonePilot";
      squad: Squad;
      pilotToClone: SquadPilotShip;
      shipsData: Record<string, Ship>;
      upgradesData: Upgrade[];
      pilotsData: Pilot[];
    }
  | { type: "removeFromSquad"; squad: Squad; pilotToRemove: SquadPilotShip }
  | {
      type: "changePilot";
      squad: Squad;
      currentPilot: SquadPilotShip;
      newPilot: Pilot;
      upgradesData: Upgrade[];
      shipsData: Record<string, Ship>;
    };

const squadsReducer = (squads: ReadonlyArray<Squad>, action: SquadsDispatchAction): ReadonlyArray<Squad> => {
  console.log(`Squades reducer called with ${action.type} action`);
  switch (action.type) {
    case "renameSquad":
      return squads.map((squadInState) => {
        if (action.squad !== squadInState) return squadInState;
        return {
          ...squadInState,
          name: action.newName,
        };
      });
    case "addShip":
      const cheapestAvailablePilot = getCheapestAvailablePilotForShip(
        action.newShip,
        action.squad,
        action.upgradesData,
        action.pilotsData,
      );
      if (cheapestAvailablePilot) {
        const squadPilot = getSquadPilotShip(cheapestAvailablePilot, action.shipsData, action.upgradesData);
        return squads.map((squadInState) => {
          if (action.squad !== squadInState) return squadInState;
          return {
            ...squadInState,
            squadPilots: [...squadInState.squadPilots, squadPilot],
          };
        });
      }
      alert(`No pilot available for ${action.newShip}`);
      return squads;
    case "changeShip": {
      const cheapestAvailablePilot = getCheapestAvailablePilotForShip(
        action.newShip,
        action.squad,
        action.upgradesData,
        action.pilotsData,
      );
      if (cheapestAvailablePilot) {
        const replacementPilot = getSquadPilotShip(
          cheapestAvailablePilot,
          action.shipsData,
          action.upgradesData,
          action.currentPilot,
        );
        return squads.map((squadInState) => {
          if (action.squad !== squadInState) return squadInState;
          return {
            ...squadInState,
            squadPilots: squadInState.squadPilots.map((squadPilot) =>
              squadPilot === action.currentPilot ? replacementPilot : squadPilot,
            ),
          };
        });
      }
      alert(`No pilot available for ${action.newShip}`);
      return squads;
    }
    case "clonePilot": {
      const cheapestAvailablePilot = getCheapestAvailablePilotForShip(
        action.pilotToClone.ship,
        action.squad,
        action.upgradesData,
        action.pilotsData,
      );
      if (cheapestAvailablePilot) {
        const squadPilot = getSquadPilotShip(
          cheapestAvailablePilot,
          action.shipsData,
          action.upgradesData,
          action.pilotToClone,
        );
        return squads.map((squadInState) => {
          if (action.squad !== squadInState) return squadInState;
          return {
            ...squadInState,
            squadPilots: [...squadInState.squadPilots, squadPilot],
          };
        });
      }
      alert(`No pilot available for ${action.pilotToClone.ship}`);
      return squads;
    }
    case "removeFromSquad":
      //TODO: need to remove upgrades that become invalid due to losing a pre-req during / after this operation
      return squads.map((squadInState) => {
        if (action.squad !== squadInState) return squadInState;
        return {
          ...squadInState,
          squadPilots: squadInState.squadPilots.filter(
            (squadPilot) => squadPilot.squadPilotShipId !== action.pilotToRemove.squadPilotShipId,
          ),
        };
      });
    case "changePilot":
      //TODO: this might cause an upgrade pre-req to get removed...fix
      const replacementPilot: SquadPilotShip = getSquadPilotShip(
        action.newPilot,
        action.shipsData,
        action.upgradesData,
        action.currentPilot,
      );
      return squads.map((squadInState) => {
        if (action.squad !== squadInState) return squadInState;
        return {
          ...squadInState,
          squadPilots: squadInState.squadPilots.map((squadPilot) =>
            squadPilot === action.currentPilot ? replacementPilot : squadPilot,
          ),
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
