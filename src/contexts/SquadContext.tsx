import React, { createContext, useContext, useReducer } from "react";
import { Faction, Pilot, Ship, ShipName, Squad, SquadPilotShip, Upgrade } from "../data/xwing_types";
import { getCheapestAvailablePilotForShip, getSquadPilotShip, getSquadPilotUpgrades } from "../data/xwing_utils";

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
      shipName: ShipName;
      shipsData: Record<string, Ship>;
      upgradesData: Upgrade[];
      pilotsData: Pilot[];
    }
  | { type: "removeFromSquad"; squad: Squad; pilotToRemove: SquadPilotShip }
  | { type: "changePilot"; squad: Squad; currentPilot: SquadPilotShip; newPilot: Pilot; upgradesData: Upgrade[] };

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
        action.shipName,
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
      alert(`No pilot available for ${action.shipName}`);
      return squads;

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
      const pilotRecord = action.newPilot;
      const replacementPilot: SquadPilotShip = {
        ...action.currentPilot,
        skill: pilotRecord.skill,
        points: pilotRecord.points,
        unique: pilotRecord.unique,
        force: pilotRecord.force || 0,
        applies_condition: pilotRecord.applies_condition,
        charge: pilotRecord.charge || 0,
        recurring: pilotRecord.recurring,
        restrictions: pilotRecord.restrictions,
        restriction_func: pilotRecord.restriction_func,
        max_per_squad: pilotRecord.max_per_squad,
        ship_override: pilotRecord.ship_override,
        engagement: pilotRecord.engagement,
        pilotName: pilotRecord.name,
        pilotId: pilotRecord.id,
        pilotKeyword: pilotRecord.keyword,
        pilotCanonicalName: pilotRecord.canonical_name,
        slots: pilotRecord.slots,
        upgrades: getSquadPilotUpgrades({
          pilot: pilotRecord,
          existingUpgrades: action.currentPilot.upgrades,
          upgradesData: action.upgradesData,
        }), // TODO: this ignores some edge cases for sure
      };
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
