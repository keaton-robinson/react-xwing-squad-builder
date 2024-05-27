import React, { createContext, useContext, useReducer } from "react";
import { Faction, Pilot, Ship, ShipName, Squad, SquadPilot, SquadPilotUpgradeSlot, Upgrade } from "../data/xwing_types";
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
      currentPilot: SquadPilot;
      newShip: ShipName;
      shipsData: Record<string, Ship>;
      upgradesData: Upgrade[];
      pilotsData: Pilot[];
    }
  | {
      type: "clonePilot";
      squad: Squad;
      pilotToClone: SquadPilot;
      shipsData: Record<string, Ship>;
      upgradesData: Upgrade[];
      pilotsData: Pilot[];
    }
  | { type: "removeFromSquad"; squad: Squad; pilotToRemove: SquadPilot; upgradesData: Upgrade[] }
  | {
      type: "changePilot";
      squad: Squad;
      currentPilot: SquadPilot;
      newPilot: Pilot;
      upgradesData: Upgrade[];
      shipsData: Record<string, Ship>;
    }
  | {
      type: "changeUpgrade";
      squad: Squad;
      squadPilot: SquadPilot;
      upgradeSlot: SquadPilotUpgradeSlot;
      newlySelectedUpgrade: Upgrade;
      upgradesData: Upgrade[];
    }
  | {
      type: "createNewSquad";
      squad: Squad;
    }
  | {
      type: "savedAsNewSquad";
      squad: Squad;
      newSquadId: string;
      newSquadName: string;
    }
  | {
      type: "loadedSquad";
      squad: Squad;
      loadedSquadId: string;
      loadedSquadPilots: SquadPilot[];
      loadedSquadName: string;
    };

export const squadsReducer = (squads: ReadonlyArray<Squad>, action: SquadsDispatchAction): ReadonlyArray<Squad> => {
  // console.log(`Squades reducer called with ${action.type} action`);
  let updatedSquad = getUpdatedSquad(action.squad, action);
  return squads.map((squadInState) => (action.squad !== squadInState ? squadInState : updatedSquad));
};

export const getUpdatedSquad = (squad: Squad, action: SquadsDispatchAction): Squad => {
  switch (action.type) {
    case "renameSquad":
      return {
        ...squad,
        name: action.newName,
      };
    case "addShip": {
      const cheapestAvailablePilot = getCheapestAvailablePilotForShip(
        action.newShip,
        action.squad,
        action.upgradesData,
        action.pilotsData,
      );
      if (cheapestAvailablePilot) {
        const squadPilot = getSquadPilotShip(cheapestAvailablePilot, action.shipsData, action.upgradesData);
        const squadWithNewPilot = {
          ...squad,
          squadPilots: [...squad.squadPilots, squadPilot],
        };
        return getSquadWithInvalidUpgradesRemoved(squadWithNewPilot, action.upgradesData);
      }
      alert(`No pilot available for ${action.newShip}`);
      return squad;
    }
    case "changeShip": {
      const cheapestAvailablePilot = getCheapestAvailablePilotForShip(
        action.newShip,
        action.squad,
        action.upgradesData,
        action.pilotsData,
      );
      if (cheapestAvailablePilot) {
        let replacementPilot = getSquadPilotShip(cheapestAvailablePilot, action.shipsData, action.upgradesData);
        const upgradesToCopy = getUpgradesOnSquadPilot(action.currentPilot);

        replacementPilot = getSquadPilotWithUpgradesSet(upgradesToCopy, replacementPilot);

        return getSquadWithInvalidUpgradesRemoved(
          {
            ...squad,
            squadPilots: squad.squadPilots.map((squadPilot) =>
              squadPilot === action.currentPilot ? replacementPilot : squadPilot,
            ),
          },
          action.upgradesData,
        );
      }
      alert(`No pilot available for ${action.newShip}`);
      return squad;
    }
    case "clonePilot": {
      let squadPilot;
      const pilot: Pilot = {
        ...action.pilotToClone,
        id: action.pilotToClone.pilotId,
        name: action.pilotToClone.pilotName,
      };

      if (!maxPilotReached(pilot, action.squad)) {
        squadPilot = getSquadPilotShip(pilot, action.shipsData, action.upgradesData);
      } else {
        const cheapestAvailablePilot = getCheapestAvailablePilotForShip(
          action.pilotToClone.ship,
          action.squad,
          action.upgradesData,
          action.pilotsData,
        );

        if (cheapestAvailablePilot) {
          squadPilot = getSquadPilotShip(cheapestAvailablePilot, action.shipsData, action.upgradesData);
        } else {
          alert(`No pilot available for ${action.pilotToClone.ship}`);
          return squad;
        }
      }

      const upgradesToCopy = getUpgradesOnSquadPilot(action.pilotToClone);
      squadPilot = getSquadPilotWithUpgradesSet(upgradesToCopy, squadPilot);

      const squadWithPilotCloned = {
        ...action.squad,
        squadPilots: [...action.squad.squadPilots, squadPilot],
      };

      return getSquadWithInvalidUpgradesRemoved(squadWithPilotCloned, action.upgradesData);
    }
    case "removeFromSquad":
      return getSquadWithInvalidUpgradesRemoved(
        {
          ...squad,
          squadPilots: squad.squadPilots.filter(
            (squadPilot) => squadPilot.squadPilotId !== action.pilotToRemove.squadPilotId,
          ),
        },
        action.upgradesData,
      );
    case "changePilot":
      let replacementPilot: SquadPilot = getSquadPilotShip(action.newPilot, action.shipsData, action.upgradesData);

      const upgradesToCopy: Upgrade[] = getUpgradesOnSquadPilot(action.currentPilot);
      replacementPilot = getSquadPilotWithUpgradesSet(upgradesToCopy, replacementPilot);

      return getSquadWithInvalidUpgradesRemoved(
        {
          ...squad,
          squadPilots: squad.squadPilots.map((squadPilot) =>
            squadPilot === action.currentPilot ? replacementPilot : squadPilot,
          ),
        },
        action.upgradesData,
      );

    case "changeUpgrade": {
      let pilotsGettingChanged: SquadPilot[];

      // if selected upgrade is standardized...instead of setting upgrade on just this one ship...set it on all ships of the same type in the squad
      if (action.newlySelectedUpgrade?.standardized || action.upgradeSlot.upgrade?.standardized) {
        pilotsGettingChanged = action.squad.squadPilots.filter(
          (squadPilot) => squadPilot.ship === action.squadPilot.ship,
        );
      } else {
        pilotsGettingChanged = [action.squadPilot]; // not standardized. Only changing the specified squad pilot
      }

      for (let i = 0; i < pilotsGettingChanged.length; i++) {
        pilotsGettingChanged[i] = getSquadPilotWithUpgradeSet(
          action.newlySelectedUpgrade,
          pilotsGettingChanged[i].upgrades.find(
            (upgradeslot) => upgradeslot.squadPilotUpgradeSlotKey === action.upgradeSlot.squadPilotUpgradeSlotKey,
          ),
          pilotsGettingChanged[i],
        );
      }

      const squadWithUpgradeChanged: Squad = {
        ...action.squad,
        squadPilots: action.squad.squadPilots.map((squadPilotInState) => {
          const changedPilot = pilotsGettingChanged.find(
            (changedSquadPilot) => changedSquadPilot.squadPilotId === squadPilotInState.squadPilotId,
          );
          if (changedPilot) {
            return changedPilot;
          }
          return squadPilotInState;
        }),
      };

      return getSquadWithInvalidUpgradesRemoved(squadWithUpgradeChanged, action.upgradesData);
    }
    case "createNewSquad": {
      return getEmptyFactionSquad(action.squad.faction);
    }
    case "savedAsNewSquad": {
      return {
        ...action.squad,
        id: action.newSquadId,
        name: action.newSquadName,
      };
    }
    case "loadedSquad": {
      return {
        ...getEmptyFactionSquad(squad.faction),
        id: action.loadedSquadId,
        name: action.loadedSquadName,
        squadPilots: action.loadedSquadPilots,
      };
    }
  }
};

export const getUpgradesOnSquadPilot = (squadPilot: SquadPilot): Upgrade[] => {
  return squadPilot.upgrades.filter((upgradeSlot) => upgradeSlot.upgrade).map((upgradeSlot) => upgradeSlot.upgrade);
};

// can fail to set an upgrade if the slots are not available
export const getSquadPilotWithUpgradesSet = (upgradesToSet: Upgrade[], squadPilot: SquadPilot): SquadPilot => {
  let squadPilotGettingChanged = { ...squadPilot };

  // try to set each upgrade...setting aside ones that fail...making multiple passes until we fail to make further changes
  let upgradesToCopy: Upgrade[] = [...upgradesToSet];
  let upgradesThatFailedToCopy: Upgrade[] = [];
  let changesMade: boolean = true;

  while (changesMade) {
    changesMade = false;
    while (upgradesToCopy.length > 0) {
      const upgradeBeingCopied = upgradesToCopy.pop();
      const matchingSlotOnNewShip = squadPilotGettingChanged.upgrades.find(
        (upgradeSlot) =>
          upgradeSlot.slot === upgradeBeingCopied.slot &&
          !upgradeSlot.upgrade &&
          !upgradeSlot.parentSquadPilotUpgradeSlotKey,
      );
      if (matchingSlotOnNewShip) {
        squadPilotGettingChanged = getSquadPilotWithUpgradeSet(
          upgradeBeingCopied,
          matchingSlotOnNewShip,
          squadPilotGettingChanged,
        );
        changesMade = true;
      } else {
        upgradesThatFailedToCopy.push(upgradeBeingCopied);
      }
    }

    upgradesToCopy = upgradesThatFailedToCopy;
    upgradesThatFailedToCopy = [];
  }

  return squadPilotGettingChanged;
};

// can fail to set an upgrade if the slots are not available
export const getSquadPilotWithUpgradeSet = (
  newlySelectedUpgrade: Upgrade,
  upgradeSlot: SquadPilotUpgradeSlot,
  squadPilot: SquadPilot,
): SquadPilot => {
  // first remove existing upgrade
  let squadPilotGettingChanged: SquadPilot = getSquadPilotWithUpgradeRemoved(upgradeSlot, squadPilot);

  // add new upgrade if one was selected
  if (newlySelectedUpgrade) {
    if (newlySelectedUpgrade.unequips_upgrades) {
      const lastIndexOfSlotToUnequip = squadPilotGettingChanged.upgrades
        .map((selUpgrade, index) => ({ selUpgrade, index }))
        .filter(({ selUpgrade }) => selUpgrade.slot === newlySelectedUpgrade.unequips_upgrades[0])
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
        ...squadPilotGettingChanged.upgrades.map((upSlot): SquadPilotUpgradeSlot => {
          if (upSlot.squadPilotUpgradeSlotKey === upgradeSlot.squadPilotUpgradeSlotKey) {
            return {
              ...upSlot,
              upgrade: newlySelectedUpgrade,
            };
          }
          if (
            newlySelectedUpgrade.also_occupies_upgrades &&
            !also_occupied_slot_filled &&
            upSlot.slot === newlySelectedUpgrade.also_occupies_upgrades[0] &&
            !upSlot.upgrade &&
            !upSlot.parentSquadPilotUpgradeSlotKey
          ) {
            also_occupied_slot_filled = true;
            return {
              ...upSlot,
              parentSquadPilotUpgradeSlotKey: upgradeSlot.squadPilotUpgradeSlotKey,
            };
          }
          return upSlot;
        }),
      ],
    };

    // confersAddons adds an upgrade slot
    if (newlySelectedUpgrade.confersAddons) {
      squadPilotGettingChanged = {
        ...squadPilotGettingChanged,
        upgrades: [
          ...squadPilotGettingChanged.upgrades,
          ...newlySelectedUpgrade.confersAddons.map((conferredAddon): SquadPilotUpgradeSlot => {
            const countOfSlot = squadPilotGettingChanged.upgrades.filter(
              (upgradeSlot) => upgradeSlot.slot === conferredAddon.slot,
            ).length;
            return {
              squadPilotUpgradeSlotKey: `${conferredAddon.slot}${countOfSlot + 1}`,
              slot: conferredAddon.slot,
              upgrade: null,
              parentSquadPilotUpgradeSlotKey: null,
            };
          }),
        ],
      };
    }
  }

  return squadPilotGettingChanged;
};

export const getSquadPilotWithUpgradeRemoved = (
  upgradeSlotToEmpty: SquadPilotUpgradeSlot,
  squadPilot: SquadPilot,
): SquadPilot => {
  if (!upgradeSlotToEmpty.upgrade && !upgradeSlotToEmpty.parentSquadPilotUpgradeSlotKey) {
    return squadPilot; // nothing to do here
  }
  const upgradeRecord: Upgrade = upgradeSlotToEmpty.upgrade;

  let squadPilotToUpdate: SquadPilot = { ...squadPilot };

  if (upgradeRecord && upgradeRecord.confersAddons) {
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
  const squadPilotWithUpgradeRemoved: SquadPilot = {
    ...squadPilotToUpdate,
    upgrades: squadPilotToUpdate.upgrades.map((slot): SquadPilotUpgradeSlot => {
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
        const invalidSquadPilot = squadPilot;
        const squadPilotWithUpgradeRemoved = getSquadPilotWithUpgradeRemoved(squadPilotUpgrade, invalidSquadPilot);
        const squadWithoutInvalidUpgrade: Squad = {
          ...squad,
          squadPilots: squad.squadPilots.map((innerSquadPilot): SquadPilot => {
            if (innerSquadPilot !== invalidSquadPilot) return innerSquadPilot;
            return squadPilotWithUpgradeRemoved;
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

export const getEmptyFactionSquad = (factionName): Squad => {
  return {
    id: null,
    faction: factionName,
    name: `${factionName} Squadron`,
    squadPilots: [],
  };
};

export const initialSquadsState: Squad[] = factionsOrdered.map(getEmptyFactionSquad);
