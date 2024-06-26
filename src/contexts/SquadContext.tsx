import React, { createContext, useContext, useReducer } from "react";
import { Faction, Pilot, ShipName, Squad, SquadPilot, SquadPilotUpgradeSlot, Upgrade } from "../data/xwing_types";
import {
  getCheapestAvailablePilotForShip,
  getSquadPilotShip,
  isUpgradeAllowed,
  maxPilotReached,
  maxUpgradeExceeded,
} from "../data/xwing_utils";

interface SquadsState {
  error: string;
  squads: ReadonlyArray<Squad>;
}

const SquadsContext = createContext<SquadsState>(null);
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

export type SquadsDispatchAction =
  | { type: "clearError" }
  | { type: "renameSquad"; squad: Squad; newName: string }
  | {
      type: "addShip";
      squad: Squad;
      newShip: ShipName;
    }
  | {
      type: "changeShip";
      squad: Squad;
      currentPilot: SquadPilot;
      newShip: ShipName;
    }
  | {
      type: "clonePilot";
      squad: Squad;
      pilotToClone: SquadPilot;
    }
  | { type: "removeFromSquad"; squad: Squad; pilotToRemove: SquadPilot }
  | {
      type: "changePilot";
      squad: Squad;
      currentPilot: SquadPilot;
      newPilot: Pilot;
    }
  | {
      type: "changeUpgrade";
      squad: Squad;
      squadPilot: SquadPilot;
      upgradeSlot: SquadPilotUpgradeSlot;
      newlySelectedUpgrade: Upgrade;
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

export interface SquadsReducerDeps {
  getUpdatedSquadFn?: typeof getUpdatedSquad;
}
export const squadsReducer = (
  state: SquadsState,
  action: SquadsDispatchAction,
  { getUpdatedSquadFn = getUpdatedSquad }: SquadsReducerDeps = {},
): SquadsState => {
  // console.log(`Squades reducer called with ${action.type} action`);
  if (action.type === "clearError") {
    return {
      ...state,
      error: null,
    };
  }
  try {
    const updatedSquad = getUpdatedSquadFn(action.squad, action);
    return {
      ...state,
      squads: state.squads.map((squadInState) => (action.squad !== squadInState ? squadInState : updatedSquad)),
    };
  } catch (errorObj) {
    return {
      ...state,
      error: errorObj.message,
    };
  }
};

export interface GetUpdatedSquadDeps {
  getCheapestAvailablePilotForShipFn?: typeof getCheapestAvailablePilotForShip;
  getSquadPilotShipFn?: typeof getSquadPilotShip;
  getSquadWithInvalidUpgradesRemovedFn?: typeof getSquadWithInvalidUpgradesRemoved;
  getUpgradesOnSquadPilotFn?: typeof getUpgradesOnSquadPilot;
  getSquadPilotWithMultipleUpgradesSetFn?: typeof getSquadPilotWithMultipleUpgradesSet;
  getSquadPilotWithUpgradeSetFn?: typeof getSquadPilotWithUpgradeSet;
  getEmptyFactionSquadFn?: typeof getEmptyFactionSquad;
  maxPilotReachedFn?: typeof maxPilotReached;
}
export const getUpdatedSquad = (
  squad: Squad,
  action: SquadsDispatchAction,
  {
    getCheapestAvailablePilotForShipFn = getCheapestAvailablePilotForShip,
    getSquadPilotShipFn = getSquadPilotShip,
    getSquadWithInvalidUpgradesRemovedFn = getSquadWithInvalidUpgradesRemoved,
    getUpgradesOnSquadPilotFn = getUpgradesOnSquadPilot,
    getSquadPilotWithMultipleUpgradesSetFn = getSquadPilotWithMultipleUpgradesSet,
    getSquadPilotWithUpgradeSetFn = getSquadPilotWithUpgradeSet,
    getEmptyFactionSquadFn = getEmptyFactionSquad,
    maxPilotReachedFn = maxPilotReached,
  }: GetUpdatedSquadDeps = {},
): Squad => {
  switch (action.type) {
    case "renameSquad":
      return {
        ...squad,
        name: action.newName,
      };
    case "addShip": {
      const cheapestAvailablePilot = getCheapestAvailablePilotForShipFn(action.newShip, action.squad);
      if (cheapestAvailablePilot) {
        const squadPilot = getSquadPilotShipFn(cheapestAvailablePilot);
        const squadWithNewPilot = {
          ...squad,
          squadPilots: [...squad.squadPilots, squadPilot],
        };
        return getSquadWithInvalidUpgradesRemovedFn(squadWithNewPilot);
      }
      throw new Error(`No pilot available for ${action.newShip}`);
    }
    case "changeShip": {
      const cheapestAvailablePilot = getCheapestAvailablePilotForShipFn(action.newShip, action.squad);
      if (cheapestAvailablePilot) {
        let replacementPilot = getSquadPilotShipFn(cheapestAvailablePilot);
        const upgradesToCopy = getUpgradesOnSquadPilotFn(action.currentPilot);

        replacementPilot = getSquadPilotWithMultipleUpgradesSetFn(upgradesToCopy, replacementPilot);

        return getSquadWithInvalidUpgradesRemovedFn({
          ...squad,
          squadPilots: squad.squadPilots.map((squadPilot) =>
            squadPilot === action.currentPilot ? replacementPilot : squadPilot,
          ),
        });
      }
      throw new Error(`No pilot available for ${action.newShip}`);
    }
    case "clonePilot": {
      let squadPilot;
      const pilot: Pilot = {
        ...action.pilotToClone,
        id: action.pilotToClone.pilotId,
        name: action.pilotToClone.pilotName,
      };

      if (!maxPilotReachedFn(pilot, action.squad)) {
        squadPilot = getSquadPilotShipFn(pilot);
      } else {
        const cheapestAvailablePilot = getCheapestAvailablePilotForShipFn(action.pilotToClone.ship, action.squad);

        if (cheapestAvailablePilot) {
          squadPilot = getSquadPilotShipFn(cheapestAvailablePilot);
        } else {
          throw new Error(`No pilot available for ${action.pilotToClone.ship}`);
        }
      }

      const upgradesToCopy = getUpgradesOnSquadPilotFn(action.pilotToClone);
      squadPilot = getSquadPilotWithMultipleUpgradesSetFn(upgradesToCopy, squadPilot);

      const squadWithPilotCloned = {
        ...action.squad,
        squadPilots: [...action.squad.squadPilots, squadPilot],
      };

      return getSquadWithInvalidUpgradesRemovedFn(squadWithPilotCloned);
    }
    case "removeFromSquad":
      return getSquadWithInvalidUpgradesRemovedFn({
        ...squad,
        squadPilots: squad.squadPilots.filter(
          (squadPilot) => squadPilot.squadPilotId !== action.pilotToRemove.squadPilotId,
        ),
      });
    case "changePilot":
      let replacementPilot: SquadPilot = getSquadPilotShipFn(action.newPilot);

      const upgradesToCopy: Upgrade[] = getUpgradesOnSquadPilotFn(action.currentPilot);
      replacementPilot = getSquadPilotWithMultipleUpgradesSetFn(upgradesToCopy, replacementPilot);

      return getSquadWithInvalidUpgradesRemovedFn({
        ...squad,
        squadPilots: squad.squadPilots.map((squadPilot) =>
          squadPilot === action.currentPilot ? replacementPilot : squadPilot,
        ),
      });

    case "changeUpgrade": {
      let pilotsGettingChanged: SquadPilot[];

      // if selected upgrade is standardized...instead of marking just this ship for changing..mark all ships of the same type in the squad for update
      if (action.newlySelectedUpgrade?.standardized || action.upgradeSlot.upgrade?.standardized) {
        pilotsGettingChanged = action.squad.squadPilots.filter(
          (squadPilot) => squadPilot.ship === action.squadPilot.ship,
        );
      } else {
        pilotsGettingChanged = [action.squadPilot]; // not standardized. Only changing the specified squad pilot
      }

      // update the pilots that need to be changed
      for (let i = 0; i < pilotsGettingChanged.length; i++) {
        pilotsGettingChanged[i] = getSquadPilotWithUpgradeSetFn(
          action.newlySelectedUpgrade,
          pilotsGettingChanged[i].upgrades.find(
            (upgradeslot) => upgradeslot.squadPilotUpgradeSlotKey === action.upgradeSlot.squadPilotUpgradeSlotKey,
          ),
          pilotsGettingChanged[i],
        );
      }

      // replace the updated pilots in the squad pilots array
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

      // remove invalid upgrades and return
      return getSquadWithInvalidUpgradesRemovedFn(squadWithUpgradeChanged);
    }
    case "createNewSquad": {
      return getEmptyFactionSquadFn(action.squad.faction);
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
        ...getEmptyFactionSquadFn(squad.faction),
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
export const getSquadPilotWithMultipleUpgradesSet = (
  upgradesToSet: Upgrade[],
  squadPilot: SquadPilot,
  { getSquadPilotWithUpgradeSetFn = getSquadPilotWithUpgradeSet } = {},
): SquadPilot => {
  let squadPilotGettingChanged = { ...squadPilot };

  // try to set each upgrade...setting aside ones that fail...making multiple passes until we fail to make further changes
  let upgradesToCopy: Upgrade[] = [...upgradesToSet];
  let upgradesThatFailedToCopy: Upgrade[] = [];
  let changesMade: boolean = true;

  while (changesMade) {
    changesMade = false;
    while (upgradesToCopy.length > 0) {
      const upgradeBeingCopied = upgradesToCopy.shift();
      const matchingSlotOnNewShip = squadPilotGettingChanged.upgrades.find(
        (upgradeSlot) =>
          upgradeSlot.slot === upgradeBeingCopied.slot &&
          !upgradeSlot.upgrade &&
          !upgradeSlot.parentSquadPilotUpgradeSlotKey,
      );
      if (matchingSlotOnNewShip) {
        squadPilotGettingChanged = getSquadPilotWithUpgradeSetFn(
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
  { getSquadPilotWithUpgradeRemovedFn = getSquadPilotWithUpgradeRemoved } = {},
): SquadPilot => {
  // first remove existing upgrade
  let squadPilotGettingChanged: SquadPilot = getSquadPilotWithUpgradeRemovedFn(upgradeSlot, squadPilot);

  // add new upgrade if one was selected
  if (newlySelectedUpgrade) {
    if (newlySelectedUpgrade.unequips_upgrades) {
      const lastIndexOfSlotToUnequip = squadPilotGettingChanged.upgrades
        .map((selUpgrade, index) => ({ selUpgrade, index }))
        .filter(({ selUpgrade }) => selUpgrade.slot === newlySelectedUpgrade.unequips_upgrades[0])
        .reduce((maxIndex, { index }) => Math.max(maxIndex, index), -1);
      squadPilotGettingChanged = getSquadPilotWithUpgradeRemovedFn(
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

export const getSquadWithInvalidUpgradesRemoved = (
  squad: Squad,
  {
    maxUpgradeExceededFn = maxUpgradeExceeded,
    isUpgradeAllowedFn = isUpgradeAllowed,
    getSquadPilotWithUpgradeRemovedFn = getSquadPilotWithUpgradeRemoved,
  } = {},
): Squad => {
  let currentSquad = squad;
  let changesMade = true;

  while (changesMade) {
    changesMade = false; // Reset the flag at the start of each iteration
    let newSquadPilots = [...currentSquad.squadPilots]; // Clone squad pilots array

    // working from the back makes sure we remove stuff from newly created cloned pilots instead of from existing ones
    for (let i = currentSquad.squadPilots.length - 1; i >= 0; i--) {
      const squadPilot = currentSquad.squadPilots[i];

      for (let j = squadPilot.upgrades.length - 1; j >= 0; j--) {
        const squadPilotUpgrade = squadPilot.upgrades[j];

        if (
          squadPilotUpgrade.upgrade &&
          (maxUpgradeExceededFn(squadPilotUpgrade.upgrade, currentSquad) ||
            !isUpgradeAllowedFn(squadPilotUpgrade, squadPilotUpgrade.upgrade, squadPilot, currentSquad))
        ) {
          // Remove the bad upgrade and mark the flag
          const squadPilotWithUpgradeRemoved = getSquadPilotWithUpgradeRemovedFn(squadPilotUpgrade, squadPilot);
          newSquadPilots[i] = squadPilotWithUpgradeRemoved; // Update the pilot in the cloned array
          changesMade = true;

          // Break out of the current pilot's loop to start from the last pilot again
          break;
        }
      }

      if (changesMade) {
        // If a change was made, construct a new squad object and restart checking from the last pilot
        currentSquad = { ...currentSquad, squadPilots: newSquadPilots };
        break;
      }
    }
  }

  return currentSquad;
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

export const initialSquadsState: SquadsState = {
  error: null,
  squads: factionsOrdered.map(getEmptyFactionSquad),
};
