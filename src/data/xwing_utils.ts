import {
  Faction,
  Ship,
  ShipName,
  Pilot,
  Upgrade,
  SelectedPilot,
  SelectedUpgrade,
  ShipBaseSize,
} from "./xwing_types";

//intended to be used for checking if an id is selected
function isNotNullOrUndefined(value) {
  return value !== null && value !== undefined;
}

function createError(message: string, extraProps: Record<string, any>): Error {
  const error = new Error(message);
  Object.assign(error, extraProps);
  return error;
}

const getShipBaseSize = (ship: Ship): ShipBaseSize => {
  if (ship.huge) {
    return "Huge";
  } else if (ship.large) {
    return "Large";
  } else if (ship.medium) {
    return "Medium";
  } else {
    return "Small";
  }
};

function getUpgradeCost(upgrade: Upgrade, pilot: SelectedPilot): number {
  if (isNotNullOrUndefined(upgrade.points)) {
    return upgrade.points;
  } else if (upgrade.pointsarray) {
    if (upgrade.variableinit) {
      return upgrade.pointsarray[pilot.skill];
    } else if (upgrade.variablebase) {
      if (pilot.pilotShip.huge) {
        return upgrade.pointsarray[3];
      } else if (pilot.pilotShip.large) {
        return upgrade.pointsarray[2];
      } else if (pilot.pilotShip.medium) {
        return upgrade.pointsarray[1];
      }
      return upgrade.pointsarray[0];
    } else if (upgrade.variableagility) {
      return upgrade.pointsarray[pilot.pilotShip.agility];
    }
  }

  throw createError(
    "Error calculating points on upgrade. Couldn't find point value.",
    {
      upgradeVal: upgrade,
      pilotVal: pilot,
    },
  );
}

function getPilotCost(pilot: SelectedPilot, upgradesData: Upgrade[]): number {
  return (
    pilot.points +
    pilot.selectedUpgrades.reduce((prevPointsSum, selectedUpgrade) => {
      if (isNotNullOrUndefined(selectedUpgrade.selectedUpgradeId)) {
        const upgrade = upgradesData.find(
          (upgradeFromData) =>
            upgradeFromData.id === selectedUpgrade.selectedUpgradeId,
        );
        if (!upgrade) {
          throw new Error("Invalid upgrade id specified");
        }
        return prevPointsSum + getUpgradeCost(upgrade, pilot);
      }
      return prevPointsSum;
    }, 0)
  );
}

function getSquadCost(squad: SelectedPilot[], upgradesData: Upgrade[]): number {
  return squad.reduce((prevPointsSum, pilot) => {
    return prevPointsSum + getPilotCost(pilot, upgradesData);
  }, 0);
}

function getPilotEffectiveStats(
  pilot: SelectedPilot,
  upgradesData: Upgrade[],
): SelectedPilot {
  if (!pilot) {
    throw createError("pilot required for getPilotEffectiveStats", {
      pilotVal: pilot,
    });
  }

  const pilotCopy = JSON.parse(JSON.stringify(pilot));

  for (const selectedUpgrade of pilotCopy.selectedUpgrades) {
    //gotta get the upgrade data
    if (isNotNullOrUndefined(selectedUpgrade.selectedUpgradeId)) {
      const upgradeData = upgradesData.find(
        (upgrade) => upgrade.id === selectedUpgrade.selectedUpgradeId,
      );
      if (!upgradeData) {
        throw createError(
          `Failed to find upgrade record for upgrade record id: ${selectedUpgrade.selectedUpgradeId}`,
          {
            selectedUpgradeVal: selectedUpgrade,
          },
        );
      } else {
        if (upgradeData.modifier_func) {
          upgradeData.modifier_func(pilotCopy.pilotShip);
        }
      }
    }
  }
  return pilotCopy;
}

//returns true if unique or max_per_squad pilot has already been selected max_times in the squad already
function maxPilotOrUpgradeReached(
  cardToCheck: Pilot | Upgrade,
  squad,
  upgradesData,
): boolean {
  if (cardToCheck.max_per_squad) {
    if ("slot" in cardToCheck) {
      //we're looking at an upgrade card
      let numberOfUpgradeInSquad: number = 0;
      for (const squadPilot of squad) {
        for (const pilotUpgrade of squadPilot.selectedUpgrades) {
          if (pilotUpgrade.selectedUpgradeId === cardToCheck.id) {
            numberOfUpgradeInSquad++;
          }
        }
      }

      if (numberOfUpgradeInSquad === cardToCheck.max_per_squad) {
        return true;
      } else if (numberOfUpgradeInSquad > cardToCheck.max_per_squad) {
        const error = new Error();
        throw createError(
          `Somehow got more than ${cardToCheck.max_per_squad} instances of ${cardToCheck.name} id: ${cardToCheck.id} in squad. Investigate.`,
          {
            upgradeToCheckVal: cardToCheck,
            squadVal: squad,
            error: error,
          },
        );
      }
    } else {
      //we're looking at a pilot card
      let numberOfPilotInSquad: number = squad.filter(
        (squadPilot) => squadPilot.id === cardToCheck.id,
      ).length;
      if (numberOfPilotInSquad === cardToCheck.max_per_squad) {
        return true;
      } else if (numberOfPilotInSquad > cardToCheck.max_per_squad) {
        const error = new Error();
        throw createError(
          `Somehow got more than ${cardToCheck.max_per_squad} instances of ${cardToCheck.name} id: ${cardToCheck.id} in squad. Investigate.`,
          {
            pilotToCheckVal: cardToCheck,
            squadVal: squad,
            error: error,
          },
        );
      }
    }
  }

  if (cardToCheck.unique) {
    if (
      isUniqueInSquad(
        cardToCheck.canonical_name
          ? cardToCheck.canonical_name
          : cardToCheck.name,
        squad,
        upgradesData,
      )
    ) {
      return true;
    }
  }

  return false;
}

function isUniqueInSquad(
  uniqueCanonName: string,
  squad: SelectedPilot[],
  upgradesData: Upgrade[],
): boolean {
  //if there's "uniqueName" pilot or upgrade in the squad, they are in.
  let uniqueFound = false;

  for (const pilot of squad) {
    if (!uniqueFound) {
      if (pilot.name.includes(uniqueCanonName)) {
        uniqueFound = true;
        break;
      } else {
        for (const selectedUpgrade of pilot.selectedUpgrades) {
          //gotta go get the upgrade...
          if (isNotNullOrUndefined(selectedUpgrade.selectedUpgradeId)) {
            const upgradeData = upgradesData.find(
              (upgradeRecord) =>
                upgradeRecord.id === selectedUpgrade.selectedUpgradeId,
            );
            if (upgradeData.name.includes(uniqueCanonName)) {
              uniqueFound = true;
              break;
            }
          }
        }
      }
    } else {
      break;
    }
  }
  return uniqueFound;
}

//upgrade should be data-repo upgrade, not "selected" upgrade
function isUpgradeAllowed(
  selectedUpgradeSlot: SelectedUpgrade,
  upgrade: Upgrade,
  pilot: SelectedPilot,
  squad: SelectedPilot[],
  upgradesData: Upgrade[],
): boolean {
  if (!selectedUpgradeSlot || !upgrade || !pilot || !squad) {
    createError(
      "selectedUpgradeSlot, upgrade, pilot, and squad arguments are required for isUpgradeAllowed function",
      {
        selectedUpgradeSlotVal: selectedUpgradeSlot,
        upgradeVal: upgrade,
        pilotVal: pilot,
        squadVal: squad,
      },
    );
  }

  const effectivePilot = getPilotEffectiveStats(pilot, upgradesData);

  if (upgrade.faction) {
    if (Array.isArray(upgrade.faction)) {
      let factionFound = false;
      for (const upgradeFaction of upgrade.faction) {
        if (upgradeFaction === effectivePilot.faction) {
          factionFound = true;
          break; //break out of for loop
        }
      }
      if (!factionFound) {
        return false; // the upgrade's available factions don't include the pilot's faction
      }
    } else if (upgrade.faction !== effectivePilot.faction) {
      return false;
    }
  }
  if (upgrade.ship) {
    if (
      typeof upgrade.ship == "string" &&
      upgrade.ship !== effectivePilot.ship
    ) {
      return false;
    } else if (!upgrade.ship.includes(effectivePilot.ship)) {
      return false;
    }
  }
  if (upgrade.restrictions) {
    const restrictionsCopy = [...upgrade.restrictions];
    if (
      !isUpgradeAllowedByRestrictions(
        selectedUpgradeSlot,
        restrictionsCopy,
        upgrade,
        effectivePilot,
        squad,
        upgradesData,
      )
    ) {
      return false;
    }
  }
  return true;
}

function isUpgradeAllowedByRestrictions(
  selectedUpgradeSlot: SelectedUpgrade,
  restrictions: [string, any][],
  upgrade: Upgrade,
  pilot: SelectedPilot,
  squad: SelectedPilot[],
  upgradesData: Upgrade[],
): boolean {
  if (!selectedUpgradeSlot || !restrictions || !upgrade || !pilot || !squad) {
    throw createError(
      "isUpgradeAllowedByRestrictions requires selectedUpgradeSlot, restrictions, upgrade, pilot, and squad parameters, but didn't receive one or more.",
      {
        selectedUpgradeSlotVal: selectedUpgradeSlot,
        restrictionsVal: restrictions,
        upgradeVal: upgrade,
        pilotVal: pilot,
        squadVal: squad,
      },
    );
  }

  if (restrictions.length > 0) {
    const restriction = restrictions.shift();

    switch (restriction[0]) {
      case "Base":
        if (
          restriction[1] === "Small" &&
          (pilot.pilotShip.medium ||
            pilot.pilotShip.large ||
            pilot.pilotShip.huge)
        ) {
          return false;
        }
        if (restriction[1] === "Large" && !pilot.pilotShip.large) {
          return false;
        }
        if (restriction[1] === "Huge" && !pilot.pilotShip.huge) {
          return false;
        }
        if (
          restriction[1] === "Small or Medium" &&
          (pilot.pilotShip.large || pilot.pilotShip.huge)
        ) {
          return false;
        }
        if (
          restriction[1] === "Medium or Large" &&
          !(pilot.pilotShip.medium || pilot.pilotShip.large)
        ) {
          return false;
        }
        if (restriction[1] === "Standard" && pilot.pilotShip.huge) {
          return false;
        }
        break;
      case "Action": {
        let actionFound = false;
        for (const action of pilot.pilotShip.actions) {
          if (!action.includes(">") && action.includes(restriction[1])) {
            //i think red and purple actions count...well..I can't engine upgrade an A-wing tho...
            //oh, tac officer, engine upgrade, and expert handling specify "RED Coordinate" (with shape) / "RED boost" (with shape)
            //moff jerjerrod just specifies "coordinate"
            //ok so upgrade cards that restrict to "action" will accept any difficulty, but if they specify a difficulty, the ship must have that difficulty of the action
            //ok so any upgrade that doesn't contain ">" but does contain "actionName", satisfies the requirement

            actionFound = true;
            break; // just breaks out of the for loop
          }
        }
        if (!actionFound) {
          return false;
        }
        break;
      }
      case "Slot":
        //if the upgrade is not currently the equiped upgrade, need to check if another slot of the specified type is available
        if (selectedUpgradeSlot.selectedUpgradeId !== upgrade.id) {
          if (
            !pilot.selectedUpgrades.find(
              (selUpgradeSlot) =>
                selUpgradeSlot.key !== selectedUpgradeSlot.key &&
                selUpgradeSlot.slot === restriction[1] &&
                !isNotNullOrUndefined(selUpgradeSlot.selectedUpgradeId) &&
                !selUpgradeSlot.parentUpgradeSlotKey,
            )
          ) {
            return false; // didn't find an available slot of the required type
          }
        } else {
          //it is the currently equipped upgrade, need to check that there is a slot of the specified type
          //that has its "parent" set to this selectedUpgrade's key ...ahh fukc that could mess up if something starts adding / removing a slot a bunch
          //which will make the order that I apply UI keys important probably..they aren't very "UI" specific anymore
          if (
            !pilot.selectedUpgrades.find(
              (selUpgrade) =>
                selUpgrade.parentUpgradeSlotKey === selectedUpgradeSlot.key,
            )
          ) {
            return false;
          }
        }
        break;
      case "orUnique": {
        //if there's "uniqueName" pilot or upgrade in the squad, they are in.
        let uniqueFound = isUniqueInSquad(restriction[1], squad, upgradesData);

        //the "Or" part is handled here...
        if (restrictions.length < 1) {
          throw createError(
            "OrUnique requirement couldn't find the second restriction to check",
            {
              restrictionsVal: restrictions,
              upgradeVal: upgrade,
              pilotVal: pilot,
              squadVal: squad,
            },
          );
        }
        const nextRestriction = restrictions.shift();
        //evaluate next restriction by itself by putting it in its own array
        if (
          !(
            uniqueFound ||
            isUpgradeAllowedByRestrictions(
              selectedUpgradeSlot,
              [nextRestriction],
              upgrade,
              pilot,
              squad,
              upgradesData,
            )
          )
        ) {
          return false;
        }
        break;
      }
      case "Faction":
        if (!(restriction[1] === pilot.faction)) {
          return false;
        }
        break;
      case "AttackArc":
        if (restriction[1] === "Rear Arc") {
          if (!pilot.pilotShip.attackb) {
            return false;
          }
        }
        break;
      case "Keyword": {
        const keywordToFind = restriction[1];
        let keywordFound = false;

        if (pilot.ship.includes(keywordToFind)) {
          keywordFound = true;
        }

        if (!keywordFound && pilot.keyword) {
          for (const keyword of pilot.keyword) {
            if (keyword === keywordToFind) {
              keywordFound = true;
              break; // stop searching in pilots
            }
          }
        }
        if (!keywordFound && pilot.pilotShip.keyword) {
          for (const keyword of pilot.pilotShip.keyword) {
            if (keyword === keywordToFind) {
              keywordFound = true;
              break; //stop searching keywords of the ship
            }
          }
        }

        if (!keywordFound) {
          return false;
        }
        break;
      }
      case "isUnique":
        if (
          (restriction[1] && !pilot.unique) ||
          (!restriction[1] && pilot.unique)
        ) {
          return false;
        }
        break;
      case "Equipped": {
        const selectedUpgradeForSlot = pilot.selectedUpgrades.find(
          (selUpgrade) => selUpgrade.slot === restriction[1],
        );
        if (
          !selectedUpgradeForSlot ||
          (selectedUpgradeForSlot.selectedUpgradeId !== 0 &&
            !selectedUpgradeForSlot.selectedUpgradeId)
        ) {
          return false;
        }
        break;
      }
      case "ShieldsGreaterThan":
        if (
          !pilot.pilotShip.shields ||
          !(pilot.pilotShip.shields > restriction[1])
        ) {
          return false;
        }
        break;
      case "InitiativeGreaterThan":
        if (pilot.skill <= restriction[1]) {
          return false;
        }
        break;
      case "InitiativeLessThan":
        if (pilot.skill >= restriction[1]) {
          return false;
        }
        break;
      case "EnergyGreaterThan":
        if (pilot.pilotShip.energy <= restriction[1]) {
          return false;
        }
        break;
      case "AgilityEquals":
        if (!(pilot.pilotShip.agility === restriction[1])) {
          return false;
        }
        break;
    }

    return isUpgradeAllowedByRestrictions(
      selectedUpgradeSlot,
      restrictions,
      upgrade,
      pilot,
      squad,
      upgradesData,
    );
  }
  return true;
}

//copies selected upgrades from prevPilot to new pilot (in place). Ignores upgrade slots that aren't available on new pilot
function addUpgrades(
  newPilot: SelectedPilot,
  upgradesToAdd: SelectedUpgrade[],
  squad: SelectedPilot[],
  upgradesData: Upgrade[],
): void {
  if (!newPilot || !upgradesToAdd || !squad) {
    throw createError(
      "newPilot, upgradesToAdd, and squad must be provided to addUpgrades function",
      {
        newPilotVal: newPilot,
        upgradesToAddVal: upgradesToAdd,
        squadVal: squad,
      },
    );
  }

  upgradesToAdd.forEach((upgradeToAdd) => {
    if (isNotNullOrUndefined(upgradeToAdd.selectedUpgradeId)) {
      const newPilotUpgradeSlot = newPilot.selectedUpgrades.find(
        (newPilotUpgrade) => newPilotUpgrade.key === upgradeToAdd.key,
      );
      const upgradeData = upgradesData.find(
        (upgrade) => upgrade.id === upgradeToAdd.selectedUpgradeId,
      );

      if (
        newPilotUpgradeSlot &&
        !maxPilotOrUpgradeReached(upgradeData, squad, upgradesData)
      ) {
        setUpgrade(newPilotUpgradeSlot, upgradeData, newPilot, upgradesData);
      }
    }
  });
}

function getAppReadyPilot(
  pilot: Pilot,
  shipsData: Record<string, Ship>,
  prevUIKey?: string,
): SelectedPilot {
  //makes deep copies so I don't have side effects on my "data repo"
  const shipForPilot = shipsData[pilot.ship];
  if (!shipForPilot) {
    throw createError(`Couldn't find ship for pilot: ${pilot.name}`, {
      pilotVal: pilot,
    });
  }
  //make deep copy of ship to attach
  const shipCopy = JSON.parse(JSON.stringify(shipForPilot));
  const pilotCopy = JSON.parse(JSON.stringify(pilot));
  pilotCopy.pilotShip = shipCopy;

  //for changing pilots... transfer existing UI key to the new pilot object so react rcognizes it as the previous one and preserves ordering
  if (prevUIKey) {
    pilotCopy.uiKey = prevUIKey;
  } else {
    // otherwise, create a new id to use as key
    pilotCopy.uiKey = makeid(25);
  }

  //set all of the non-set optional values to zero for ease of incrementing them or displaying zero later
  // (mostly for StatBlockCpt)
  pilotCopy.force = pilot.force || 0;
  pilotCopy.charge = pilot.charge || 0;

  shipCopy.attack = shipCopy.attack || 0;
  shipCopy.attackf = shipCopy.attackf || 0;
  shipCopy.attackb = shipCopy.attackb || 0;
  shipCopy.attackl = shipCopy.attackl || 0;
  shipCopy.attackr = shipCopy.attackr || 0;
  shipCopy.attackt = shipCopy.attackt || 0;
  shipCopy.attackdt = shipCopy.attackdt || 0;
  shipCopy.attackbull = shipCopy.attackbull || 0;
  shipCopy.shields = shipCopy.shields || 0;
  shipCopy.force = shipCopy.force || 0;
  shipCopy.charge = shipCopy.charge || 0;

  //add upgrades
  pilotCopy.selectedUpgrades = [];

  pilotCopy.slots.forEach((slotName) => {
    pilotCopy.selectedUpgrades.push({
      slot: slotName,
      key: null,
      selectedUpgradeId: null,
    });
  });

  //sets UI keys for upgrades...doesn't actually 'select' any upgrades
  pilotCopy.selectedUpgrades = getSelectedUpgradesWithKeys(
    pilotCopy.selectedUpgrades,
  );

  return pilotCopy;
}

function getSelectedUpgradesWithKeys(
  selectedUpgrades: SelectedUpgrade[],
): SelectedUpgrade[] {
  let slotNameUsedTracker = {};
  let newSelectedUpgrades = selectedUpgrades.map((selectedUpgrade) => {
    // Create a deep copy of the selectedUpgrade to avoid mutating the original object
    let newSelectedUpgrade = { ...selectedUpgrade };

    // Increment or initialize the count for the slot
    if (!slotNameUsedTracker[newSelectedUpgrade.slot]) {
      slotNameUsedTracker[newSelectedUpgrade.slot] = 1;
    } else {
      slotNameUsedTracker[newSelectedUpgrade.slot]++;
    }

    // Set the key on the new object
    newSelectedUpgrade.key =
      newSelectedUpgrade.slot + slotNameUsedTracker[newSelectedUpgrade.slot];

    return newSelectedUpgrade;
  });

  return newSelectedUpgrades;
}

//returns cheapest pilot in-faction that hasn't been selected max-times or selected elsewhere with uniqueness
function getCheapestAvailablePilotForShip(
  ship: ShipName,
  faction: Faction,
  squad: SelectedPilot[],
  upgradesData: Upgrade[],
  pilotsData: Pilot[],
): Pilot {
  if (!ship || !faction || !squad) {
    throw createError(
      "You must provide ship, faction, and squad to the getCheapestAvailablePilotForShip function.",
      {
        shipValue: ship,
        factionValue: faction,
        squadValue: squad,
      },
    );
  }

  const availablePilotsForShip = pilotsData.filter(
    (pilot) =>
      pilot.ship === ship &&
      pilot.faction === faction &&
      !maxPilotOrUpgradeReached(pilot, squad, upgradesData),
  );

  if (!availablePilotsForShip.length) {
    return null;
  }
  const cheapnessComparator = (prevPilot, currentPilot) =>
    currentPilot.points < prevPilot.points ? currentPilot : prevPilot;
  const cheapestPilotForShip =
    availablePilotsForShip.reduce(cheapnessComparator);
  return cheapestPilotForShip;
}

// TODO: mutating state in place. Fix
function removeInvalidUpgrades(
  squad: SelectedPilot[],
  upgradesData: Upgrade[],
): SelectedPilot[] {
  let needToSearchForInvalidUpgrades = true;

  while (needToSearchForInvalidUpgrades) {
    needToSearchForInvalidUpgrades = false;
    for (const pilot of squad) {
      for (const selectedUpgrade of pilot.selectedUpgrades) {
        if (isNotNullOrUndefined(selectedUpgrade.selectedUpgradeId)) {
          const upgradeRecord = upgradesData.find(
            (upgrade) => upgrade.id === selectedUpgrade.selectedUpgradeId,
          );
          if (
            !isUpgradeAllowed(
              selectedUpgrade,
              upgradeRecord,
              pilot,
              squad,
              upgradesData,
            )
          ) {
            needToSearchForInvalidUpgrades = true;
            removeUpgrade(selectedUpgrade, pilot, upgradesData);
          }
        }
      }
    }
  }
  return squad;
}

// TODO: mutating state in place: fix
function removeUpgrade(
  selectedUpgradeSlot: SelectedUpgrade,
  pilot: SelectedPilot,
  upgradesData: Upgrade[],
) {
  if (isNotNullOrUndefined(selectedUpgradeSlot.selectedUpgradeId)) {
    const upgradeRecord = upgradesData.find(
      (upgrade) => upgrade.id === selectedUpgradeSlot.selectedUpgradeId,
    );
    selectedUpgradeSlot.selectedUpgradeId = null;

    if (upgradeRecord.confersAddons) {
      //remove last matching slot
      for (const addon of upgradeRecord.confersAddons) {
        const lastIndexOfMatchingAddon = [...pilot.selectedUpgrades]
          .reverse()
          .findIndex((selUpgrade) => selUpgrade.slot === addon.slot);
        pilot.selectedUpgrades.splice(lastIndexOfMatchingAddon, 1);
      }
    }

    //remove any upgrades that were applied by "also_occupies_upgrades" from the previous slot
    pilot.selectedUpgrades.forEach((selUpgrade) => {
      if (isNotNullOrUndefined(selUpgrade.parentUpgradeSlotKey)) {
        if (selUpgrade.parentUpgradeSlotKey === selectedUpgradeSlot.key) {
          delete selUpgrade.parentUpgradeSlotKey;
        }
      }
    });
  }
}

// TODO: mutating state in place. Fix.
function upgradeSquadShip(
  upgradeSlot: SelectedUpgrade,
  newlySelectedUpgrade: Upgrade,
  pilot: SelectedPilot,
  squad: SelectedPilot[],
  upgradesData: Upgrade[],
): void {
  const prevUpgradeRecord = upgradesData.find(
    (upgrade) => upgrade.id === upgradeSlot.selectedUpgradeId,
  );
  const shipType = pilot.pilotShip.name;
  const shipsOfSameType = squad.filter(
    (squadPilot) => squadPilot.pilotShip.name === shipType,
  );

  if (prevUpgradeRecord && prevUpgradeRecord.standardized) {
    for (const squadPilot of shipsOfSameType) {
      const squadPilotUpgradeSlot = squadPilot.selectedUpgrades.find(
        (slot) => slot.key === upgradeSlot.key,
      );
      removeUpgrade(squadPilotUpgradeSlot, squadPilot, upgradesData);
    }
  }

  if (newlySelectedUpgrade && newlySelectedUpgrade.standardized) {
    for (const squadPilot of shipsOfSameType) {
      const squadPilotUpgradeSlot = squadPilot.selectedUpgrades.find(
        (slot) => slot.key === upgradeSlot.key,
      );
      setUpgrade(
        squadPilotUpgradeSlot,
        newlySelectedUpgrade,
        squadPilot,
        upgradesData,
      );
    }
  } else {
    setUpgrade(upgradeSlot, newlySelectedUpgrade, pilot, upgradesData);
  }
}

// TODO: mutating state in place. Fix
function setUpgrade(
  upgradeSlot: SelectedUpgrade,
  newlySelectedUpgrade: Upgrade,
  pilot: SelectedPilot,
  upgradesData: Upgrade[],
): void {
  if (!upgradeSlot || !pilot) {
    const error = new Error();
    throw createError("changeUpgrade function requires upgradeSlot and pilot", {
      upgradeSlotVal: upgradeSlot,
      newlySelectedUpgradeVal: newlySelectedUpgrade,
      pilotVal: pilot,
      error: error,
    });
  }

  if (
    newlySelectedUpgrade &&
    upgradeSlot.selectedUpgradeId === newlySelectedUpgrade.id
  ) {
    const error = new Error();
    throw createError(
      "changeUpgrade doesn't allow 'changing' to the same upgrade id",
      {
        upgradeSlotVal: upgradeSlot,
        newlySelectedUpgradeVal: newlySelectedUpgrade,
        error: error,
      },
    );
  }

  if (upgradeSlot.parentUpgradeSlotKey) {
    //I'm not allowing for selected upgrade to be set on a node that's occupied by another multislot upgrade. I want to know if this ever happens
    const error = new Error();
    throw createError(
      "Tried to set a selectedUpgradeId on an upgrade slot that is occupied by a multislot upgrade's child upgrade",
      {
        upgradeSlotVal: upgradeSlot,
        newlySelectedUpgradeVal: newlySelectedUpgrade,
        pilotVal: pilot,
        error: error,
      },
    );
  }

  removeUpgrade(upgradeSlot, pilot, upgradesData);

  if (newlySelectedUpgrade) {
    //if no newly selected upgrade, it means an upgrade is being removed
    upgradeSlot.selectedUpgradeId = newlySelectedUpgrade.id;

    if (newlySelectedUpgrade.unequips_upgrades) {
      //unequips last matching slot
      for (const unequip_slot of newlySelectedUpgrade.unequips_upgrades) {
        const lastMatchingUnequipSlot = [...pilot.selectedUpgrades]
          .reverse()
          .find((selUpgrade) => selUpgrade.slot === unequip_slot);
        removeUpgrade(lastMatchingUnequipSlot, pilot, upgradesData);
      }
    }

    if (newlySelectedUpgrade.also_occupies_upgrades) {
      //also occupies first available slot
      for (const slot of newlySelectedUpgrade.also_occupies_upgrades) {
        const slotToOccupy = pilot.selectedUpgrades.find(
          (selUpgrade) =>
            selUpgrade.slot === slot &&
            !isNotNullOrUndefined(selUpgrade.selectedUpgradeId),
        );
        if (!slotToOccupy) {
          const error = new Error();
          throw createError(
            `changeUpgrade function failed to find required slot to occupy:  ${slot}`,
            {
              upgradeSlotVal: upgradeSlot,
              newlySelectedUpgradeVal: newlySelectedUpgrade,
              pilotVal: pilot,
              error: error,
            },
          );
        }
        slotToOccupy.parentUpgradeSlotKey = upgradeSlot.key;
      }
    }

    if (newlySelectedUpgrade.confersAddons) {
      //adds slots
      for (const addon of newlySelectedUpgrade.confersAddons) {
        pilot.selectedUpgrades.push({
          slot: addon.slot,
          key: null,
          selectedUpgradeId: null,
        });
      }
      pilot.selectedUpgrades = getSelectedUpgradesWithKeys(
        pilot.selectedUpgrades,
      );
    }
  }
}

//returns true if there is a solitary upgrade card equiped to another slot of the same type within the squad
function squadContainsAnotherSolitaryCardForThisSlot(
  upgradeSlot: SelectedUpgrade,
  squad: SelectedPilot[],
  upgradesData: Upgrade[],
) {
  for (const squadPilot of squad) {
    for (const squadPilotUpgrade of squadPilot.selectedUpgrades) {
      if (
        squadPilotUpgrade !== upgradeSlot &&
        squadPilotUpgrade.slot === upgradeSlot.slot &&
        isNotNullOrUndefined(squadPilotUpgrade.selectedUpgradeId)
      ) {
        const upgradeRecord = upgradesData.find(
          (upgrade) => upgrade.id === squadPilotUpgrade.selectedUpgradeId,
        );
        if (upgradeRecord.solitary) {
          return true;
        }
      }
    }
  }
  return false;
}

function makeid(length: number): string {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const fixIcons = (text) => {
  if (text != null) {
    return text
      .replace(
        /%BULLSEYEARC%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-bullseyearc"></i>',
      )
      .replace(
        /%SINGLETURRETARC%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-singleturretarc"></i>',
      )
      .replace(
        /%DOUBLETURRETARC%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-doubleturretarc"></i>',
      )
      .replace(
        /%FRONTARC%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-frontarc"></i>',
      )
      .replace(
        /%REARARC%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-reararc"></i>',
      )
      .replace(
        /%LEFTARC%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-leftarc"></i>',
      )
      .replace(
        /%RIGHTARC%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-rightarc"></i>',
      )
      .replace(
        /%ROTATEARC%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-rotatearc"></i>',
      )
      .replace(
        /%FULLFRONTARC%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-fullfrontarc"></i>',
      )
      .replace(
        /%FULLREARARC%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-fullreararc"></i>',
      )
      .replace(
        /%DEVICE%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-device"></i>',
      )
      .replace(
        /%MODIFICATION%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-modification"></i>',
      )
      .replace(
        /%RELOAD%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-reload"></i>',
      )
      .replace(
        /%FORCE%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-forcecharge"></i>',
      )
      .replace(
        /%CHARGE%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-charge"></i>',
      )
      .replace(
        /%ENERGY%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-energy"></i>',
      )
      .replace(
        /%CALCULATE%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-calculate"></i>',
      )
      .replace(
        /%BANKLEFT%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-bankleft"></i>',
      )
      .replace(
        /%BANKRIGHT%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-bankright"></i>',
      )
      .replace(
        /%BARRELROLL%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-barrelroll"></i>',
      )
      .replace(
        /%BOOST%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-boost"></i>',
      )
      .replace(
        /%CANNON%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-cannon"></i>',
      )
      .replace(
        /%CARGO%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-cargo"></i>',
      )
      .replace(
        /%CLOAK%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-cloak"></i>',
      )
      .replace(
        /%F-COORDINATE%/g,
        '<i class="xwing-miniatures-font force xwing-miniatures-font-coordinate"></i>',
      )
      .replace(
        /%COORDINATE%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-coordinate"></i>',
      )
      .replace(
        /%CRIT%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-crit"></i>',
      )
      .replace(
        /%ASTROMECH%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-astromech"></i>',
      )
      .replace(
        /%GUNNER%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-gunner"></i>',
      )
      .replace(
        /%CREW%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-crew"></i>',
      )
      .replace(
        /%DUALCARD%/g,
        '<span class="card-restriction">Dual card.</span>',
      )
      .replace(
        /%ELITE%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-elite"></i>',
      )
      .replace(
        /%TACTICALRELAY%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-tacticalrelay"></i>',
      )
      .replace(
        /%SALVAGEDASTROMECH%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-salvagedastromech"></i>',
      )
      .replace(
        /%HARDPOINT%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-hardpoint"></i>',
      )
      .replace(
        /%EVADE%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-evade"></i>',
      )
      .replace(
        /%FOCUS%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-focus"></i>',
      )
      .replace(
        /%HIT%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-hit"></i>',
      )
      .replace(
        /%ILLICIT%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-illicit"></i>',
      )
      .replace(
        /%JAM%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-jam"></i>',
      )
      .replace(
        /%KTURN%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-kturn"></i>',
      )
      .replace(
        /%MISSILE%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-missile"></i>',
      )
      .replace(
        /%RECOVER%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-recover"></i>',
      )
      .replace(
        /%F-REINFORCE%/g,
        '<i class="xwing-miniatures-font force xwing-miniatures-font-reinforce"></i>',
      )
      .replace(
        /%REINFORCE%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-reinforce"></i>',
      )
      .replace(
        /%REVERSESTRAIGHT%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-reversestraight"></i>',
      )
      .replace(
        /%REVERSEBANKLEFT%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-reversebankleft"></i>',
      )
      .replace(
        /%REVERSEBANKRIGHT%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-reversebankright"></i>',
      )
      .replace(
        /%SHIELD%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-shield"></i>',
      )
      .replace(
        /%SLAM%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-slam"></i>',
      )
      .replace(
        /%SLOOPLEFT%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-sloopleft"></i>',
      )
      .replace(
        /%SLOOPRIGHT%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-sloopright"></i>',
      )
      .replace(
        /%STRAIGHT%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-straight"></i>',
      )
      .replace(
        /%STOP%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-stop"></i>',
      )
      .replace(
        /%SENSOR%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-sensor"></i>',
      )
      .replace(
        /%LOCK%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-lock"></i>',
      )
      .replace(
        /%TORPEDO%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-torpedo"></i>',
      )
      .replace(
        /%TROLLLEFT%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-trollleft"></i>',
      )
      .replace(
        /%TROLLRIGHT%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-trollright"></i>',
      )
      .replace(
        /%TURNLEFT%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-turnleft"></i>',
      )
      .replace(
        /%TURNRIGHT%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-turnright"></i>',
      )
      .replace(
        /%TURRET%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-turret"></i>',
      )
      .replace(
        /%UTURN%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-kturn"></i>',
      )
      .replace(
        /%TALENT%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-talent"></i>',
      )
      .replace(
        /%TITLE%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-title"></i>',
      )
      .replace(
        /%TEAM%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-team"></i>',
      )
      .replace(
        /%TECH%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-tech"></i>',
      )
      .replace(
        /%FORCEPOWER%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-forcepower"></i>',
      )
      .replace(
        /%LARGESHIPONLY%/g,
        '<span class="card-restriction">Large ship only.</span>',
      )
      .replace(
        /%SMALLSHIPONLY%/g,
        '<span class="card-restriction">Small ship only.</span>',
      )
      .replace(
        /%REBELONLY%/g,
        '<span class="card-restriction">Rebel only.</span>',
      )
      .replace(
        /%IMPERIALONLY%/g,
        '<span class="card-restriction">Imperial only.</span>',
      )
      .replace(
        /%SCUMONLY%/g,
        '<span class="card-restriction">Scum only.</span>',
      )
      .replace(/%LIMITED%/g, '<span class="card-restriction">Limited.</span>')
      .replace(
        /%CONFIGURATION%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-config"></i>',
      )
      .replace(
        /%AGILITY%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-agility"></i>',
      )
      .replace(
        /%HULL%/g,
        '<i class="xwing-miniatures-font xwing-miniatures-font-hull"></i>',
      )
      .replace(/%LINEBREAK%/g, "<br /><br />");
  }
};

export {
  isNotNullOrUndefined,
  getUpgradeCost,
  getPilotCost,
  getSquadCost,
  getPilotEffectiveStats,
  maxPilotOrUpgradeReached,
  isUpgradeAllowed,
  addUpgrades,
  getAppReadyPilot,
  getCheapestAvailablePilotForShip,
  removeInvalidUpgrades,
  upgradeSquadShip,
  squadContainsAnotherSolitaryCardForThisSlot,
  getShipBaseSize,
  fixIcons,
  makeid,
};
