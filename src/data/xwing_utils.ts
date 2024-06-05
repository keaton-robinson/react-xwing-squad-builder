import {
  Ship,
  ShipName,
  Pilot,
  Upgrade,
  ShipBaseSize,
  UniqueKey,
  SquadPilot,
  Squad,
  BaseShip,
  SquadPilotUpgradeSlot,
  BasePilot,
  Restriction,
} from "./xwing_types";

//intended to be used for checking if an id is selected
export function isNotNullOrUndefined(value) {
  return value !== null && value !== undefined;
}

export function createError(message: string, extraProps: Record<string, any>): Error {
  const error = new Error(message);
  Object.assign(error, extraProps);
  return error;
}

export const getShipBaseSize = (ship: BaseShip): ShipBaseSize => {
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

export function getUpgradeCost(upgrade: Upgrade, squadPilotShip: SquadPilot): number {
  if (isNotNullOrUndefined(upgrade.points)) {
    return upgrade.points;
  } else if (upgrade.pointsarray) {
    if (upgrade.variableinit) {
      return upgrade.pointsarray[squadPilotShip.skill];
    } else if (upgrade.variablebase) {
      if (squadPilotShip.huge) {
        return upgrade.pointsarray[3];
      } else if (squadPilotShip.large) {
        return upgrade.pointsarray[2];
      } else if (squadPilotShip.medium) {
        return upgrade.pointsarray[1];
      }
      return upgrade.pointsarray[0];
    } else if (upgrade.variableagility) {
      return upgrade.pointsarray[squadPilotShip.agility];
    }
  }

  throw createError("Error calculating points on upgrade. Couldn't find point value.", {
    upgradeVal: upgrade,
    pilotVal: squadPilotShip,
  });
}

export function getPilotCost(squadPilot: SquadPilot): number {
  return (
    squadPilot.points +
    squadPilot.upgrades.reduce((prevPointsSum, selectedUpgrade) => {
      if (isNotNullOrUndefined(selectedUpgrade.upgrade)) {
        return prevPointsSum + getUpgradeCost(selectedUpgrade.upgrade, squadPilot);
      }
      return prevPointsSum;
    }, 0)
  );
}

export function getSquadCost(squad: Squad): number {
  return squad.squadPilots.reduce((prevPointsSum, pilot) => {
    return prevPointsSum + getPilotCost(pilot);
  }, 0);
}

export function getPilotEffectiveStatsNew(squadPilotShip: SquadPilot): SquadPilot {
  if (!squadPilotShip) {
    throw createError("pilot ship required for getPilotEffectiveStats", {
      pilotVal: squadPilotShip,
    });
  }

  const squadPilotShipCopy: SquadPilot = JSON.parse(JSON.stringify(squadPilotShip));

  for (const selectedUpgrade of squadPilotShipCopy.upgrades) {
    if (selectedUpgrade.upgrade?.modifier_func) {
      selectedUpgrade.upgrade.modifier_func(squadPilotShipCopy);
    }
  }
  return squadPilotShipCopy;
}

export function getPilotEffectiveStats(squadPilot: SquadPilot): SquadPilot {
  if (!squadPilot) {
    throw createError("pilot required for getPilotEffectiveStats", {
      pilotVal: squadPilot,
    });
  }

  const squadPilotCopy: SquadPilot = JSON.parse(JSON.stringify(squadPilot));

  for (const upgradeSlot of squadPilot.upgrades) {
    //gotta get the upgrade data
    if (upgradeSlot.upgrade?.modifier_func) {
      upgradeSlot.upgrade.modifier_func(squadPilotCopy); // note that this passes the copied object as a param to the modifier_func func from the original object. Stringify/Parse doesn't copy functions
    }
  }
  return squadPilotCopy;
}

//returns true if unique or max_per_squad pilot has already been selected max_times in the squad already
export function maxPilotReached(pilot: Pilot, squad: Squad): boolean {
  if (pilot.max_per_squad) {
    const numberOfPilotInSquad: number = squad.squadPilots.filter(
      (squadPilot) => squadPilot.pilotId === pilot.id,
    ).length;
    return numberOfPilotInSquad >= pilot.max_per_squad;
  }

  if (pilot.unique) {
    if (getCountOfUniqueInSquad(pilot.canonical_name ? pilot.canonical_name : pilot.name, squad) >= 1) {
      return true;
    }
  }

  return false;
}

//returns true if unique or max_per_squad pilot has already been selected more than allowed (from cloning pilots)
export function maxPilotExceeded(pilot: Pilot, squad: Squad): boolean {
  if (pilot.max_per_squad) {
    const numberOfPilotInSquad: number = squad.squadPilots.filter(
      (squadPilot) => squadPilot.pilotId === pilot.id,
    ).length;
    return numberOfPilotInSquad > pilot.max_per_squad;
  }

  if (pilot.unique) {
    if (getCountOfUniqueInSquad(pilot.canonical_name ? pilot.canonical_name : pilot.name, squad) > 1) {
      return true;
    }
  }

  return false;
}

//returns true if unique or max_per_squad upgrade has already been selected max_times in the squad already
export function maxUpgradeReached(upgrade: Upgrade, squad: Squad): boolean {
  if (upgrade.max_per_squad) {
    let numberOfUpgradeInSquad: number = 0;
    for (const squadPilot of squad.squadPilots) {
      for (const pilotUpgrade of squadPilot.upgrades) {
        if (pilotUpgrade.upgrade === upgrade) {
          numberOfUpgradeInSquad++;
        }
      }
    }
    return numberOfUpgradeInSquad >= upgrade.max_per_squad;
  }

  if (upgrade.unique) {
    if (getCountOfUniqueInSquad(upgrade.canonical_name ? upgrade.canonical_name : upgrade.name, squad) >= 1) {
      return true;
    }
  }

  return false;
}

//returns true if unique or max_per_squad upgrade has already been selected more than max_times in the squad already
export function maxUpgradeExceeded(upgrade: Upgrade, squad: Squad): boolean {
  if (upgrade.max_per_squad) {
    let numberOfUpgradeInSquad: number = 0;
    for (const squadPilot of squad.squadPilots) {
      for (const pilotUpgrade of squadPilot.upgrades) {
        if (pilotUpgrade.upgrade === upgrade) {
          numberOfUpgradeInSquad++;
        }
      }
    }
    return numberOfUpgradeInSquad > upgrade.max_per_squad;
  }

  if (upgrade.unique) {
    if (getCountOfUniqueInSquad(upgrade.canonical_name ? upgrade.canonical_name : upgrade.name, squad) > 1) {
      return true;
    }
  }

  return false;
}

function isUniqueInSquad(uniqueCanonName: string, squad: Squad): boolean {
  return getCountOfUniqueInSquad(uniqueCanonName, squad) >= 1;
}

function getCountOfUniqueInSquad(uniqueCanonName: string, squad: Squad): number {
  let count = 0;

  for (const pilot of squad.squadPilots) {
    if (pilot.pilotName.includes(uniqueCanonName)) {
      count++;
    }
    for (const selectedUpgrade of pilot.upgrades) {
      if (selectedUpgrade.upgrade?.name.includes(uniqueCanonName)) {
        count++;
        break;
      }
    }
  }
  return count;
}

export function isUpgradeAllowed(
  selectedUpgradeSlot: SquadPilotUpgradeSlot,
  upgrade: Upgrade,
  pilot: SquadPilot,
  squad: Squad,
): boolean {
  const effectivePilot = getPilotEffectiveStats(pilot);

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
    if (typeof upgrade.ship == "string" && upgrade.ship !== effectivePilot.ship) {
      return false;
    } else if (!upgrade.ship.includes(effectivePilot.ship)) {
      return false;
    }
  }
  if (upgrade.restrictions) {
    if (!isUpgradeAllowedByRestrictions(selectedUpgradeSlot, upgrade.restrictions, upgrade, effectivePilot, squad)) {
      return false;
    }
  }
  return true;
}

export function isUpgradeAllowedByRestrictions(
  upgradeSlot: SquadPilotUpgradeSlot,
  restrictions: Restriction[],
  upgrade: Upgrade,
  squadPilot: SquadPilot,
  squad: Squad,
): boolean {
  let i = 0;
  while (i < restrictions.length) {
    const restriction = restrictions[i];

    switch (restriction[0]) {
      case "Base":
        if (restriction[1] === "Small" && (squadPilot.medium || squadPilot.large || squadPilot.huge)) {
          return false;
        }
        if (restriction[1] === "Large" && !squadPilot.large) {
          return false;
        }
        if (restriction[1] === "Huge" && !squadPilot.huge) {
          return false;
        }
        if (restriction[1] === "Small or Medium" && (squadPilot.large || squadPilot.huge)) {
          return false;
        }
        if (restriction[1] === "Medium or Large" && !(squadPilot.medium || squadPilot.large)) {
          return false;
        }
        if (restriction[1] === "Standard" && squadPilot.huge) {
          return false;
        }
        break;
      case "Action": {
        let actionFound = false;
        for (const action of squadPilot.actions) {
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
        //if the upgrade is not currently the equiped upgrade, need to check if another slot of the specified type is available...c
        if (upgradeSlot.upgrade !== upgrade) {
          // is this right?...no...probably not...can't assume that an upgrade that is applied is valid
          if (
            !squadPilot.upgrades.find(
              (selUpgradeSlot) =>
                selUpgradeSlot.squadPilotUpgradeSlotKey !== upgradeSlot.squadPilotUpgradeSlotKey &&
                selUpgradeSlot.slot === restriction[1] &&
                !selUpgradeSlot.upgrade &&
                !selUpgradeSlot.parentSquadPilotUpgradeSlotKey,
            )
          ) {
            return false; // didn't find an available slot of the required type
          }
        } else {
          //it is the currently equipped upgrade, need to check that there is a slot of the specified type
          if (
            !squadPilot.upgrades.find(
              (selUpgrade) => selUpgrade.parentSquadPilotUpgradeSlotKey === upgradeSlot.squadPilotUpgradeSlotKey,
            )
          ) {
            return false;
          }
        }
        break;
      case "orUnique": {
        //if there's "uniqueName" pilot or upgrade in the squad, they are in.
        let uniqueFound = isUniqueInSquad(restriction[1], squad);

        //the "Or" part is handled here...
        if (restrictions.length < 1) {
          throw createError("OrUnique requirement couldn't find the second restriction to check", {
            restrictionsVal: restrictions,
            upgradeVal: upgrade,
            pilotVal: squadPilot,
            squadVal: squad,
          });
        }
        // need to check next restriction and also make sure to skip it on the next iteration
        i++;
        const nextRestriction = restrictions[i];
        //evaluate next restriction by itself by putting it in its own array
        if (
          !(uniqueFound || isUpgradeAllowedByRestrictions(upgradeSlot, [nextRestriction], upgrade, squadPilot, squad))
        ) {
          return false;
        }
        break;
      }
      case "Faction":
        if (!(restriction[1] === squadPilot.faction)) {
          return false;
        }
        break;
      case "AttackArc":
        if (restriction[1] === "Rear Arc") {
          if (!squadPilot.attackb) {
            return false;
          }
        }
        break;
      case "Keyword": {
        const keywordToFind = restriction[1];
        let keywordFound = false;

        if (squadPilot.ship.includes(keywordToFind)) {
          keywordFound = true;
        }

        if (!keywordFound && squadPilot.pilotKeyword) {
          for (const keyword of squadPilot.pilotKeyword) {
            if (keyword === keywordToFind) {
              keywordFound = true;
              break; // stop searching in pilots
            }
          }
        }
        if (!keywordFound && squadPilot.ship_keyword) {
          for (const keyword of squadPilot.ship_keyword) {
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
        if ((restriction[1] && !squadPilot.unique) || (!restriction[1] && squadPilot.unique)) {
          return false;
        }
        break;
      case "Equipped": {
        const upgradeSlot = squadPilot.upgrades.find((upgradeSlot) => upgradeSlot.slot === restriction[1]);
        if (!upgradeSlot?.upgrade) {
          return false;
        }
        break;
      }
      case "ShieldsGreaterThan":
        if (!squadPilot.shields || !(squadPilot.shields > restriction[1])) {
          return false;
        }
        break;
      case "InitiativeGreaterThan":
        if (squadPilot.skill <= restriction[1]) {
          return false;
        }
        break;
      case "InitiativeLessThan":
        if (squadPilot.skill >= restriction[1]) {
          return false;
        }
        break;
      case "EnergyGreaterThan":
        if (squadPilot.energy <= restriction[1]) {
          return false;
        }
        break;
      case "AgilityEquals":
        if (!(squadPilot.agility === restriction[1])) {
          return false;
        }
        break;
    }
    i++;
  }

  return true;
}

export function getSquadPilotShip(pilot: Pilot, shipsData: Record<string, Ship>, upgradesData: Upgrade[]): SquadPilot {
  const shipForPilot = shipsData[pilot.ship];
  if (!shipForPilot) {
    throw createError(`Couldn't find ship for pilot: ${pilot.name}`, {
      pilotVal: pilot,
    });
  }

  let squadPilot: SquadPilot = {
    ...pilot,
    ...shipForPilot,
    squadPilotId: makeUniqueKey(25),
    pilotName: pilot.name,
    pilotId: pilot.id,
    shipCanonicalName: shipForPilot.canonical_name,
    ship_keyword: shipForPilot.keyword,
    pilotKeyword: pilot.keyword,
    pilotCanonicalName: pilot.canonical_name,

    // initializing optional values to zero to make them easier to deal with later
    force: pilot.force || 0,
    charge: pilot.charge || 0,

    attack: shipForPilot.attack || 0,
    attackf: shipForPilot.attackf || 0,
    attackb: shipForPilot.attackb || 0,
    attackl: shipForPilot.attackl || 0,
    attackr: shipForPilot.attackr || 0,
    attackt: shipForPilot.attackt || 0,
    attackdt: shipForPilot.attackdt || 0,
    attackbull: shipForPilot.attackbull || 0,
    shields: shipForPilot.shields || 0,

    upgrades: getSquadPilotUpgrades({
      pilot,
      autoEquip: shipForPilot.autoequip,
      upgradesData,
    }),
  };

  return squadPilot;
}

function getSquadPilotUpgrades(params: {
  pilot: BasePilot;
  upgradesData: Upgrade[];
  autoEquip?: string[];
}): SquadPilotUpgradeSlot[] {
  let slotNameUsedTracker = {};
  let newSelectedUpgrades = params.pilot.slots.map((slotName): SquadPilotUpgradeSlot => {
    // this won't handle slots that are added by titles or configurations...maybe don't copy titles or "unique" upgrades
    // but still, there are non unique "configuration" upgrades that confer addons
    // Increment or initialize the count for the slot
    if (!slotNameUsedTracker[slotName]) {
      slotNameUsedTracker[slotName] = 1;
    } else {
      slotNameUsedTracker[slotName]++;
    }

    const slotKey = `${slotName}${slotNameUsedTracker[slotName]}`;

    if (slotName === "Configuration" && params.autoEquip) {
      return {
        squadPilotUpgradeSlotKey: slotKey,
        slot: slotName,
        upgrade: params.upgradesData.find((upgradeRecord) => upgradeRecord.name === params.autoEquip[0]),
      };
    }

    return {
      squadPilotUpgradeSlotKey: slotKey,
      slot: slotName,
      upgrade: null,
    };
  });

  return newSelectedUpgrades;
}

//returns cheapest pilot in-faction that hasn't been selected max-times or selected elsewhere with uniqueness
export function getCheapestAvailablePilotForShip(shipName: ShipName, squad: Squad, pilotsData: Pilot[]): Pilot {
  if (!shipName || !squad) {
    throw createError("You must provide shipname and squad to the getCheapestAvailablePilotForShip function.", {
      shipValue: shipName,
      squadValue: squad,
    });
  }

  const availablePilotsForShip = pilotsData.filter(
    (pilot) => pilot.ship === shipName && pilot.faction === squad.faction && !maxPilotReached(pilot, squad),
  );

  if (!availablePilotsForShip.length) {
    return null;
  }
  const cheapnessComparator = (prevPilot, currentPilot) =>
    currentPilot.points < prevPilot.points ? currentPilot : prevPilot;
  const cheapestPilotForShip = availablePilotsForShip.reduce(cheapnessComparator);
  return cheapestPilotForShip;
}

function makeUniqueKey(length: number): UniqueKey {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result as UniqueKey;
}

export const fixIcons = (text) => {
  if (text != null) {
    return text
      .replace(/%BULLSEYEARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-bullseyearc"></i>')
      .replace(/%SINGLETURRETARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-singleturretarc"></i>')
      .replace(/%DOUBLETURRETARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-doubleturretarc"></i>')
      .replace(/%FRONTARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-frontarc"></i>')
      .replace(/%REARARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-reararc"></i>')
      .replace(/%LEFTARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-leftarc"></i>')
      .replace(/%RIGHTARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-rightarc"></i>')
      .replace(/%ROTATEARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-rotatearc"></i>')
      .replace(/%FULLFRONTARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-fullfrontarc"></i>')
      .replace(/%FULLREARARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-fullreararc"></i>')
      .replace(/%DEVICE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-device"></i>')
      .replace(/%MODIFICATION%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-modification"></i>')
      .replace(/%RELOAD%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-reload"></i>')
      .replace(/%FORCE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-forcecharge"></i>')
      .replace(/%CHARGE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-charge"></i>')
      .replace(/%ENERGY%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-energy"></i>')
      .replace(/%CALCULATE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-calculate"></i>')
      .replace(/%BANKLEFT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-bankleft"></i>')
      .replace(/%BANKRIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-bankright"></i>')
      .replace(/%BARRELROLL%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-barrelroll"></i>')
      .replace(/%BOOST%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-boost"></i>')
      .replace(/%CANNON%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-cannon"></i>')
      .replace(/%CARGO%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-cargo"></i>')
      .replace(/%CLOAK%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-cloak"></i>')
      .replace(/%F-COORDINATE%/g, '<i class="xwing-miniatures-font force xwing-miniatures-font-coordinate"></i>')
      .replace(/%COORDINATE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-coordinate"></i>')
      .replace(/%CRIT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-crit"></i>')
      .replace(/%ASTROMECH%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-astromech"></i>')
      .replace(/%GUNNER%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-gunner"></i>')
      .replace(/%CREW%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-crew"></i>')
      .replace(/%DUALCARD%/g, '<span class="card-restriction">Dual card.</span>')
      .replace(/%ELITE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-elite"></i>')
      .replace(/%TACTICALRELAY%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-tacticalrelay"></i>')
      .replace(/%SALVAGEDASTROMECH%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-salvagedastromech"></i>')
      .replace(/%HARDPOINT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-hardpoint"></i>')
      .replace(/%EVADE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-evade"></i>')
      .replace(/%FOCUS%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-focus"></i>')
      .replace(/%HIT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-hit"></i>')
      .replace(/%ILLICIT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-illicit"></i>')
      .replace(/%JAM%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-jam"></i>')
      .replace(/%KTURN%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-kturn"></i>')
      .replace(/%MISSILE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-missile"></i>')
      .replace(/%RECOVER%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-recover"></i>')
      .replace(/%F-REINFORCE%/g, '<i class="xwing-miniatures-font force xwing-miniatures-font-reinforce"></i>')
      .replace(/%REINFORCE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-reinforce"></i>')
      .replace(/%REVERSESTRAIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-reversestraight"></i>')
      .replace(/%REVERSEBANKLEFT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-reversebankleft"></i>')
      .replace(/%REVERSEBANKRIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-reversebankright"></i>')
      .replace(/%SHIELD%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-shield"></i>')
      .replace(/%SLAM%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-slam"></i>')
      .replace(/%SLOOPLEFT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-sloopleft"></i>')
      .replace(/%SLOOPRIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-sloopright"></i>')
      .replace(/%STRAIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-straight"></i>')
      .replace(/%STOP%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-stop"></i>')
      .replace(/%SENSOR%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-sensor"></i>')
      .replace(/%LOCK%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-lock"></i>')
      .replace(/%TORPEDO%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-torpedo"></i>')
      .replace(/%TROLLLEFT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-trollleft"></i>')
      .replace(/%TROLLRIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-trollright"></i>')
      .replace(/%TURNLEFT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-turnleft"></i>')
      .replace(/%TURNRIGHT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-turnright"></i>')
      .replace(/%TURRET%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-turret"></i>')
      .replace(/%UTURN%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-kturn"></i>')
      .replace(/%TALENT%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-talent"></i>')
      .replace(/%TITLE%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-title"></i>')
      .replace(/%TEAM%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-team"></i>')
      .replace(/%TECH%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-tech"></i>')
      .replace(/%FORCEPOWER%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-forcepower"></i>')
      .replace(/%LARGESHIPONLY%/g, '<span class="card-restriction">Large ship only.</span>')
      .replace(/%SMALLSHIPONLY%/g, '<span class="card-restriction">Small ship only.</span>')
      .replace(/%REBELONLY%/g, '<span class="card-restriction">Rebel only.</span>')
      .replace(/%IMPERIALONLY%/g, '<span class="card-restriction">Imperial only.</span>')
      .replace(/%SCUMONLY%/g, '<span class="card-restriction">Scum only.</span>')
      .replace(/%LIMITED%/g, '<span class="card-restriction">Limited.</span>')
      .replace(/%CONFIGURATION%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-config"></i>')
      .replace(/%AGILITY%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-agility"></i>')
      .replace(/%HULL%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-hull"></i>')
      .replace(/%LINEBREAK%/g, "<br /><br />");
  }
};
