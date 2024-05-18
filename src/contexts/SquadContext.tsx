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
  maxPilotReached,
  maxUpgradeExceeded,
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
  | { type: "renameSquad"; squad: Squad; newName: string; upgradesData: Upgrade[] }
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
  | { type: "removeFromSquad"; squad: Squad; pilotToRemove: SquadPilotShip; upgradesData: Upgrade[] }
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
  const updatedSquad = getUpdatedSquad(action.squad, action);
  const squadWithoutInvalidUpgrades = getSquadWithInvalidUpgradesRemoved(updatedSquad, action.upgradesData);
  return squads.map((squadInState) => (action.squad !== squadInState ? squadInState : squadWithoutInvalidUpgrades));
};

const getUpdatedSquad = (squad: Squad, action: SquadsDispatchAction): Squad => {
  switch (action.type) {
    case "renameSquad":
      return {
        ...squad,
        name: action.newName,
      };
    case "addShip":
      const cheapestAvailablePilot = getCheapestAvailablePilotForShip(
        action.newShip,
        action.squad,
        action.upgradesData,
        action.pilotsData,
      );
      if (cheapestAvailablePilot) {
        const squadPilot = getSquadPilotShip(cheapestAvailablePilot, action.shipsData, action.upgradesData);

        return {
          ...squad,
          squadPilots: [...squad.squadPilots, squadPilot],
        };
      }
      alert(`No pilot available for ${action.newShip}`);
      return squad;
    case "changeShip": {
      // todo: feels like a place i need to do the complicated stuff on upgrades
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

        return {
          ...squad,
          squadPilots: squad.squadPilots.map((squadPilot) =>
            squadPilot === action.currentPilot ? replacementPilot : squadPilot,
          ),
        };
      }
      alert(`No pilot available for ${action.newShip}`);
      return squad;
    }
    case "clonePilot": {
      // TODO: feels like a place I may need to do all the complicated stuff on upgrades
      let squadPilot;
      const pilot: Pilot = {
        ...action.pilotToClone,
        id: action.pilotToClone.pilotId,
        name: action.pilotToClone.pilotName,
      };

      if (!maxPilotReached(pilot, action.squad)) {
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
          return squad;
        }
      }

      const squadWithPilotCloned = {
        ...action.squad,
        squadPilots: [...action.squad.squadPilots, squadPilot],
      };

      return squadWithPilotCloned;
    }
    case "removeFromSquad":
      return {
        ...squad,
        squadPilots: squad.squadPilots.filter(
          (squadPilot) => squadPilot.squadPilotShipId !== action.pilotToRemove.squadPilotShipId,
        ),
      };
    case "changePilot":
      // TODO: feels like a place I may need to actually do all the complex stuff on upgrades
      const replacementPilot: SquadPilotShip = getSquadPilotShip(
        action.newPilot,
        action.shipsData,
        action.upgradesData,
        action.currentPilot,
      );

      return {
        ...squad,
        squadPilots: squad.squadPilots.map((squadPilot) =>
          squadPilot === action.currentPilot ? replacementPilot : squadPilot,
        ),
      };

    case "changeUpgrade": {
      // TODO: if previous upgrade was standardized,  remove that upgrade on all ships of the same type (safe to assume all ships have that upgrade in that slot)
      // if selected upgrade is standardized...instead of setting upgrade on just this one ship...set it on all ships of the same type in the squad
      let squadPilotGettingChanged: SquadPilotShip = getSquadPilotWithUpgradeRemoved(
        action.upgradeSlot,
        action.squadPilot,
      );

      if (action.newlySelectedUpgrade) {
        if (action.newlySelectedUpgrade.unequips_upgrades) {
          const lastIndexOfSlotToUnequip = squadPilotGettingChanged.upgrades
            .map((selUpgrade, index) => ({ selUpgrade, index }))
            .filter(({ selUpgrade }) => selUpgrade.slot === action.newlySelectedUpgrade.unequips_upgrades[0])
            .reduce((maxIndex, { index }) => Math.max(maxIndex, index), -1);
          squadPilotGettingChanged = getSquadPilotWithUpgradeRemoved(
            squadPilotGettingChanged.upgrades[lastIndexOfSlotToUnequip],
            squadPilotGettingChanged,
          );
        }

        let also_occupied_slot_filled = false;
        squadPilotGettingChanged = {
          ...squadPilotGettingChanged,
          upgrades: [
            ...squadPilotGettingChanged.upgrades.map((upgradeSlot): SquadPilotShipUpgradeSlot => {
              if (upgradeSlot.squadPilotUpgradeSlotKey === action.upgradeSlot.squadPilotUpgradeSlotKey) {
                return {
                  ...upgradeSlot,
                  upgrade: action.newlySelectedUpgrade,
                };
              }
              if (
                action.newlySelectedUpgrade.also_occupies_upgrades &&
                !also_occupied_slot_filled &&
                upgradeSlot.slot === action.newlySelectedUpgrade.also_occupies_upgrades[0] &&
                !upgradeSlot.upgrade
              ) {
                also_occupied_slot_filled = true;
                return {
                  ...upgradeSlot,
                  parentSquadPilotUpgradeSlotKey: action.upgradeSlot.squadPilotUpgradeSlotKey,
                };
              }
              return upgradeSlot;
            }),
          ],
        };

        // confersAddons adds an upgrade slot
        if (action.newlySelectedUpgrade.confersAddons) {
          squadPilotGettingChanged = {
            ...squadPilotGettingChanged,
            upgrades: [
              ...squadPilotGettingChanged.upgrades,
              ...action.newlySelectedUpgrade.confersAddons.map((conferredAddon): SquadPilotShipUpgradeSlot => {
                const countOfSlot = squadPilotGettingChanged.upgrades.filter(
                  (upgradeSlot) => upgradeSlot.slot === conferredAddon.slot,
                ).length;
                return {
                  slot: conferredAddon.slot,
                  upgrade: null,
                  squadPilotUpgradeSlotKey: `${conferredAddon.slot}${countOfSlot + 1}`,
                };
              }),
            ],
          };
        }
      }

      const squadWithUpgradeChanged: Squad = {
        ...action.squad,
        squadPilots: action.squad.squadPilots.map((squadPilotInState) => {
          if (action.squadPilot !== squadPilotInState) {
            return squadPilotInState;
          }
          return squadPilotGettingChanged;
        }),
      };

      const squadWithoutBadUpgrades: Squad = getSquadWithInvalidUpgradesRemoved(
        squadWithUpgradeChanged,
        action.upgradesData,
      );

      return squadWithoutBadUpgrades;
    }
  }
};

const getSquadPilotWithUpgradeRemoved = (
  upgradeSlotToEmpty: SquadPilotShipUpgradeSlot,
  squadPilot: SquadPilotShip,
): SquadPilotShip => {
  if (!upgradeSlotToEmpty.upgrade) {
    return squadPilot; // nothing to do here
  }
  const upgradeRecord: Upgrade = upgradeSlotToEmpty.upgrade;

  let squadPilotToUpdate: SquadPilotShip = { ...squadPilot };

  if (upgradeRecord.confersAddons) {
    for (const conferredAddon of upgradeRecord.confersAddons) {
      // first remove upgrades from the slots that were added
      const lastIndexOfMatchingAddon = squadPilotToUpdate.upgrades
        .map((selUpgrade, index) => ({ selUpgrade, index }))
        .filter(({ selUpgrade }) => selUpgrade.slot === conferredAddon.slot)
        .reduce((maxIndex, { index }) => Math.max(maxIndex, index), -1);
      squadPilotToUpdate = getSquadPilotWithUpgradeRemoved(
        squadPilotToUpdate.upgrades[lastIndexOfMatchingAddon],
        squadPilotToUpdate,
      );

      // then remove the slots that were conferred by the addon
      squadPilotToUpdate = {
        ...squadPilotToUpdate,
        upgrades: squadPilotToUpdate.upgrades.filter(
          // eslint-disable-next-line no-loop-func
          (slot) =>
            slot.squadPilotUpgradeSlotKey !==
            squadPilotToUpdate.upgrades[lastIndexOfMatchingAddon].squadPilotUpgradeSlotKey,
        ),
      };
    }
  }

  // remove upgrade for slot specified and also its parent or child slots (if they exist)
  const squadPilotWithUpgradeRemoved: SquadPilotShip = {
    ...squadPilotToUpdate,
    upgrades: squadPilotToUpdate.upgrades.map((slot): SquadPilotShipUpgradeSlot => {
      if (
        slot === upgradeSlotToEmpty ||
        slot.parentSquadPilotUpgradeSlotKey === upgradeSlotToEmpty.squadPilotUpgradeSlotKey ||
        slot.squadPilotUpgradeSlotKey === upgradeSlotToEmpty.parentSquadPilotUpgradeSlotKey
      ) {
        return {
          ...slot,
          parentSquadPilotUpgradeSlotKey: null,
          upgrade: null,
        };
      }
      return slot;
    }),
  };

  return squadPilotWithUpgradeRemoved;
};

const getSquadWithInvalidUpgradesRemoved = (squad: Squad, upgradesData: Upgrade[]): Squad => {
  // working from the back of the list ensure cloned pilots get maxed out upgrades removed rather than existing ones
  for (let i = squad.squadPilots.length - 1; i >= 0; i--) {
    const squadPilot = squad.squadPilots[i];
    for (const squadPilotUpgrade of squadPilot.upgrades) {
      if (
        squadPilotUpgrade.upgrade &&
        (maxUpgradeExceeded(squadPilotUpgrade.upgrade, squad) ||
          !isUpgradeAllowed(squadPilotUpgrade, squadPilotUpgrade.upgrade, squadPilot, squad, upgradesData))
      ) {
        // remove the bad upgrade and then check if the new squad is valid recursively
        // TODO: removing upgrade needs to get fancier than this  (so does adding)

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
                  parentSquadPilotUpgradeSlotKey: null,
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
