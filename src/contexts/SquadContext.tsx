import React, { createContext, useContext, useReducer } from "react";
import {
  Faction,
  Pilot,
  Ship,
  ShipName,
  Squad,
  SquadPilotShip,
  SquadPilotShipUpgradeSlot,
  Upgrade,
} from "../data/xwing_types";
import {
  getCheapestAvailablePilotForShip,
  getSquadPilotShip,
  isUpgradeAllowed,
  maxPilotOrUpgradeReached,
} from "../data/xwing_utils";

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
    }
  | {
      type: "changeUpgrade";
      squad: Squad;
      squadPilot: SquadPilotShip;
      upgradeSlot: SquadPilotShipUpgradeSlot;
      newlySelectedUpgrade: Upgrade;
      upgradesData: Upgrade[];
    };

const squadsReducer = (squads: ReadonlyArray<Squad>, action: SquadsDispatchAction): ReadonlyArray<Squad> => {
  // console.log(`Squades reducer called with ${action.type} action`);
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
      //TODO: can this create more of an upgrade or pilot than allowed?
      // upgrade...yes... pilot...not unless I mess up right now...get cheapest complains when it runs out of options

      let squadPilot;
      const pilot: Pilot = {
        ...action.pilotToClone,
        id: action.pilotToClone.pilotId,
        name: action.pilotToClone.pilotName,
      };

      if (!maxPilotOrUpgradeReached(pilot, action.squad, action.upgradesData)) {
        squadPilot = getSquadPilotShip(pilot, action.shipsData, action.upgradesData, action.pilotToClone);
      } else {
        const cheapestAvailablePilot = getCheapestAvailablePilotForShip(
          action.pilotToClone.ship,
          action.squad,
          action.upgradesData,
          action.pilotsData,
        );

        if (cheapestAvailablePilot) {
          squadPilot = getSquadPilotShip(
            cheapestAvailablePilot,
            action.shipsData,
            action.upgradesData,
            action.pilotToClone,
          );
        } else {
          alert(`No pilot available for ${action.pilotToClone.ship}`);
          return squads;
        }
      }

      const squadWithPilotCloned = {
        ...action.squad,
        squadPilots: [...action.squad.squadPilots, squadPilot],
      };

      const squadWithoutBadUpgrades = getSquadWithInvalidUpgradesRemoved(squadWithPilotCloned, action.upgradesData);

      return squads.map((squadInState) => (action.squad !== squadInState ? squadInState : squadWithoutBadUpgrades));
    }
    case "removeFromSquad":
      //TODO: need to remove upgrades that become invalid due to losing a pre-req during / after this operation...and then other upgrades that become invalid...
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
      //TODO: this might cause an upgrade pre-req to get removed...need to remove those...and then other upgrades that become invalid...
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
    case "changeUpgrade": {
      //TODO: need to remove upgrades that become invalid...and then other upgrades that become invalid...

      const squadWithUpgradeChanged: Squad = {
        ...action.squad,
        squadPilots: action.squad.squadPilots.map((squadPilotInState) => {
          if (action.squadPilot !== squadPilotInState) return squadPilotInState;

          return {
            ...squadPilotInState,
            upgrades: squadPilotInState.upgrades.map((upgradeSlotInState) => {
              if (action.upgradeSlot !== upgradeSlotInState) return upgradeSlotInState;

              return {
                ...upgradeSlotInState,
                upgrade: action.newlySelectedUpgrade,
              };
            }),
          };
        }),
      };

      const squadWithoutBadUpgrades: Squad = getSquadWithInvalidUpgradesRemoved(
        squadWithUpgradeChanged,
        action.upgradesData,
      );

      return squads.map((squadInState) => (squadInState !== action.squad ? squadInState : squadWithoutBadUpgrades));
    }
  }
};

const getSquadWithInvalidUpgradesRemoved = (squad: Squad, upgradesData: Upgrade[]): Squad => {
  // TODO: not handling max upgrades currently (remove from the back of the list though)
  console.log("gonna remove some badddd upgrades");
  for (const squadPilot of squad.squadPilots) {
    for (const squadPilotUpgrade of squadPilot.upgrades) {
      if (
        squadPilotUpgrade.upgrade &&
        !isUpgradeAllowed(squadPilotUpgrade, squadPilotUpgrade.upgrade, squadPilot, squad, upgradesData)
      ) {
        // remove the bad upgrade and then check if the new squad is valid recursively
        // TODO: removing upgrade needs to get fancier than this

        const invalidSquadPilot = squadPilot;
        const invalidSquadPilotUpgrade = squadPilotUpgrade;
        const squadWithoutInvalidUpgrade: Squad = {
          ...squad,
          squadPilots: squad.squadPilots.map((innerSquadPilot): SquadPilotShip => {
            if (innerSquadPilot !== invalidSquadPilot) return innerSquadPilot;
            return {
              ...invalidSquadPilot,
              upgrades: invalidSquadPilot.upgrades.map((innerUpgrade) => {
                if (innerUpgrade !== invalidSquadPilotUpgrade) return innerUpgrade;
                return {
                  ...invalidSquadPilotUpgrade,
                  parentSquadPilotUpgradeSlotId: null,
                  upgrade: null,
                };
              }),
            };
          }),
        };

        return getSquadWithInvalidUpgradesRemoved(squadWithoutInvalidUpgrade, upgradesData);
      }
    }
  }

  return squad;
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
