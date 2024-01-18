"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeid = exports.fixIcons = exports.getShipBaseSize = exports.shipBaseSizes = exports.InfoPanelCardTypes = exports.squadContainsAnotherSolitaryCardForThisSlot = exports.upgradeSquadShip = exports.removeInvalidUpgrades = exports.getCheapestAvailablePilotForShip = exports.getAppReadyPilot = exports.addUpgrades = exports.isUpgradeAllowed = exports.maxPilotOrUpgradeReached = exports.getPilotEffectiveStats = exports.getSquadCost = exports.getPilotCost = exports.getUpgradeCost = exports.isNotNullOrUndefined = void 0;
//intended to be used for checking if an id is selected
function isNotNullOrUndefined(value) {
    return value !== null && value !== undefined;
}
exports.isNotNullOrUndefined = isNotNullOrUndefined;
var shipBaseSizes = {
    Small: "Small",
    Medium: "Medium",
    Large: "Large",
    Huge: "Huge"
};
exports.shipBaseSizes = shipBaseSizes;
var getShipBaseSize = function (ship) {
    if (ship.huge) {
        return shipBaseSizes.Huge;
    }
    else if (ship.large) {
        return shipBaseSizes.Large;
    }
    else if (ship.medium) {
        return shipBaseSizes.Medium;
    }
    else {
        return shipBaseSizes.Small;
    }
};
exports.getShipBaseSize = getShipBaseSize;
function getUpgradeCost(upgrade, pilot) {
    if (isNotNullOrUndefined(upgrade.points)) {
        return upgrade.points;
    }
    else if (upgrade.pointsarray) {
        if (upgrade.variableinit) {
            return upgrade.pointsarray[pilot.skill];
        }
        else if (upgrade.variablebase) {
            if (pilot.pilotShip.huge) {
                return upgrade.pointsarray[3];
            }
            else if (pilot.pilotShip.large) {
                return upgrade.pointsarray[2];
            }
            else if (pilot.pilotShip.medium) {
                return upgrade.pointsarray[1];
            }
            return upgrade.pointsarray[0];
        }
        else if (upgrade.variableagility) {
            return upgrade.pointsarray[pilot.pilotShip.agility];
        }
    }
    throw {
        message: "Error calculating points on upgrade. Couldn't find point value.",
        upgradeVal: upgrade,
        pilotVal: pilot
    };
}
exports.getUpgradeCost = getUpgradeCost;
function getPilotCost(pilot, upgradesData) {
    return pilot.points + pilot.selectedUpgrades.reduce(function (prevPointsSum, selectedUpgrade) {
        if (isNotNullOrUndefined(selectedUpgrade.selectedUpgradeId)) {
            var upgrade = upgradesData.find(function (upgradeFromData) { return upgradeFromData.id === selectedUpgrade.selectedUpgradeId; });
            if (!upgrade) {
                throw new Error("Invalid upgrade id specified");
            }
            return prevPointsSum + getUpgradeCost(upgrade, pilot);
        }
        return prevPointsSum;
    }, 0);
}
exports.getPilotCost = getPilotCost;
function getSquadCost(squad, upgradesData) {
    return squad.reduce(function (prevPointsSum, pilot) {
        return prevPointsSum + getPilotCost(pilot, upgradesData);
    }, 0);
}
exports.getSquadCost = getSquadCost;
function getPilotEffectiveStats(pilot, upgradesData) {
    if (!pilot) {
        throw {
            message: "pilot required for getPilotEffectiveStats",
            pilotVal: pilot
        };
    }
    var pilotCopy = JSON.parse(JSON.stringify(pilot));
    var _loop_1 = function (selectedUpgrade) {
        //gotta get the upgrade data
        if (isNotNullOrUndefined(selectedUpgrade.selectedUpgradeId)) {
            var upgradeData = upgradesData.find(function (upgrade) { return upgrade.id == selectedUpgrade.selectedUpgradeId; });
            if (!upgradeData) {
                throw {
                    message: "Failed to find upgrade record for upgrade record id: " + selectedUpgrade.selectedUpgradeId,
                    selectedUpgradeVal: selectedUpgrade
                };
            }
            else {
                if (upgradeData.modifier_func) {
                    upgradeData.modifier_func(pilotCopy.pilotShip);
                }
            }
        }
    };
    for (var _i = 0, _a = pilotCopy.selectedUpgrades; _i < _a.length; _i++) {
        var selectedUpgrade = _a[_i];
        _loop_1(selectedUpgrade);
    }
    return pilotCopy;
}
exports.getPilotEffectiveStats = getPilotEffectiveStats;
//returns true if unique or max_per_squad pilot has already been selected max_times in the squad already
function maxPilotOrUpgradeReached(cardToCheck, squad, upgradesData) {
    if (cardToCheck.max_per_squad) {
        if (!cardToCheck.slot) {
            //we're looking at a pilot card
            var numberOfPilotInSquad = squad.filter(function (squadPilot) { return squadPilot.id == cardToCheck.id; }).length;
            if (numberOfPilotInSquad == cardToCheck.max_per_squad) {
                return true;
            }
            else if (numberOfPilotInSquad > cardToCheck.max_per_squad) {
                var error = new Error();
                throw {
                    message: "Somehow got more than " + cardToCheck.max_per_squad + " instances of " + cardToCheck.name + " id: " + cardToCheck.id + " in squad. Investigate.",
                    pilotToCheckVal: cardToCheck,
                    squadVal: squad,
                    error: error
                };
            }
        }
        else {
            //we're looking at an upgrade card
            var numberOfUpgradeInSquad = 0;
            for (var _i = 0, squad_1 = squad; _i < squad_1.length; _i++) {
                var squadPilot = squad_1[_i];
                for (var _a = 0, _b = squadPilot.selectedUpgrades; _a < _b.length; _a++) {
                    var pilotUpgrade = _b[_a];
                    if (pilotUpgrade.selectedUpgradeId == cardToCheck.id) {
                        numberOfUpgradeInSquad++;
                    }
                }
            }
            if (numberOfUpgradeInSquad == cardToCheck.max_per_squad) {
                return true;
            }
            else if (numberOfUpgradeInSquad > cardToCheck.max_per_squad) {
                var error = new Error();
                throw {
                    message: "Somehow got more than " + cardToCheck.max_per_squad + " instances of " + cardToCheck.name + " id: " + cardToCheck.id + " in squad. Investigate.",
                    upgradeToCheckVal: cardToCheck,
                    squadVal: squad,
                    error: error
                };
            }
        }
    }
    if (cardToCheck.unique) {
        if (isUniqueInSquad(cardToCheck.canonical_name ? cardToCheck.canonical_name : cardToCheck.name, squad, upgradesData)) {
            return true;
        }
    }
    return false;
}
exports.maxPilotOrUpgradeReached = maxPilotOrUpgradeReached;
function isUniqueInSquad(uniqueCanonName, squad, upgradesData) {
    //if there's "uniqueName" pilot or upgrade in the squad, they are in.
    var uniqueFound = false;
    for (var _i = 0, squad_2 = squad; _i < squad_2.length; _i++) {
        var pilot = squad_2[_i];
        if (!uniqueFound) {
            if (pilot.name.includes(uniqueCanonName)) {
                uniqueFound = true;
                break;
            }
            else {
                var _loop_2 = function (selectedUpgrade) {
                    //gotta go get the upgrade...
                    if (isNotNullOrUndefined(selectedUpgrade.selectedUpgradeId)) {
                        var upgradeData = upgradesData.find(function (upgradeRecord) { return upgradeRecord.id == selectedUpgrade.selectedUpgradeId; });
                        if (upgradeData.name.includes(uniqueCanonName)) {
                            uniqueFound = true;
                            return "break";
                        }
                    }
                };
                for (var _a = 0, _b = pilot.selectedUpgrades; _a < _b.length; _a++) {
                    var selectedUpgrade = _b[_a];
                    var state_1 = _loop_2(selectedUpgrade);
                    if (state_1 === "break")
                        break;
                }
            }
        }
        else {
            break;
        }
    }
    return uniqueFound;
}
//upgrade should be data-repo upgrade, not "selected" upgrade
function isUpgradeAllowed(selectedUpgradeSlot, upgrade, pilot, squad, upgradesData) {
    if (!selectedUpgradeSlot || !upgrade || !pilot || !squad) {
        throw {
            message: "selectedUpgradeSlot, upgrade, pilot, and squad arguments are required for isUpgradeAllowed function",
            selectedUpgradeSlotVal: selectedUpgradeSlot,
            upgradeVal: upgrade,
            pilotVal: pilot,
            squadVal: squad
        };
    }
    var effectivePilot = getPilotEffectiveStats(pilot, upgradesData);
    if (upgrade.faction) {
        if (Array.isArray(upgrade.faction)) {
            var factionFound = false;
            for (var _i = 0, _a = upgrade.faction; _i < _a.length; _i++) {
                var upgradeFaction = _a[_i];
                if (upgradeFaction === effectivePilot.faction) {
                    factionFound = true;
                    break; //break out of for loop
                }
            }
            if (!factionFound) {
                return false; // the upgrade's available factions don't include the pilot's faction
            }
        }
        else if (upgrade.faction !== effectivePilot.faction) {
            return false;
        }
    }
    if (upgrade.ship) {
        if (typeof (upgrade.ship) == "string" && upgrade.ship !== effectivePilot.ship) {
            return false;
        }
        else if (!upgrade.ship.includes(effectivePilot.ship)) {
            return false;
        }
    }
    if (upgrade.restrictions) {
        var restrictionsCopy = __spreadArray([], upgrade.restrictions, true);
        if (!isUpgradeAllowedByRestrictions(selectedUpgradeSlot, restrictionsCopy, upgrade, effectivePilot, squad, upgradesData)) {
            return false;
        }
    }
    return true;
}
exports.isUpgradeAllowed = isUpgradeAllowed;
function isUpgradeAllowedByRestrictions(selectedUpgradeSlot, restrictions, upgrade, pilot, squad, upgradesData) {
    if (!selectedUpgradeSlot || !restrictions || !upgrade || !pilot || !squad) {
        throw {
            message: "isUpgradeAllowedByRestrictions requires selectedUpgradeSlot, restrictions, upgrade, pilot, and squad parameters, but didn't receive one or more.",
            selectedUpgradeSlotVal: selectedUpgradeSlot,
            restrictionsVal: restrictions,
            upgradeVal: upgrade,
            pilotVal: pilot,
            squadVal: squad
        };
    }
    if (restrictions.length > 0) {
        var restriction_1 = restrictions.shift();
        switch (restriction_1[0]) {
            case 'Base':
                if (restriction_1[1] === "Small" && (pilot.pilotShip.medium || pilot.pilotShip.large || pilot.pilotShip.huge)) {
                    return false;
                }
                if (restriction_1[1] === "Large" && !pilot.pilotShip.large) {
                    return false;
                }
                if (restriction_1[1] === "Huge" && !pilot.pilotShip.huge) {
                    return false;
                }
                if (restriction_1[1] === "Small or Medium" && (pilot.pilotShip.large || pilot.pilotShip.huge)) {
                    return false;
                }
                if (restriction_1[1] === "Medium or Large" && !(pilot.pilotShip.medium || pilot.pilotShip.large)) {
                    return false;
                }
                if (restriction_1[1] === "Standard" && pilot.pilotShip.huge) {
                    return false;
                }
                break;
            case 'Action': {
                var actionFound = false;
                for (var _i = 0, _a = pilot.pilotShip.actions; _i < _a.length; _i++) {
                    var action = _a[_i];
                    if (!action.includes(">") && action.includes(restriction_1[1])) { //i think red and purple actions count...well..I can't engine upgrade an A-wing tho...
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
            case 'Slot':
                //if the upgrade is not currently the equiped upgrade, need to check if another slot of the specified type is available
                if (selectedUpgradeSlot.selectedUpgradeId != upgrade.id) {
                    if (!(pilot.selectedUpgrades.find(function (selUpgradeSlot) { return selUpgradeSlot.key != selectedUpgradeSlot.key
                        && selUpgradeSlot.slot == restriction_1[1] && !isNotNullOrUndefined(selUpgradeSlot.selectedUpgradeId)
                        && !selUpgradeSlot.parentUpgradeSlotKey; }))) {
                        return false; // didn't find an available slot of the required type 
                    }
                }
                else {
                    //it is the currently equipped upgrade, need to check that there is a slot of the specified type 
                    //that has its "parent" set to this selectedUpgrade's key ...ahh fukc that could mess up if something starts adding / removing a slot a bunch
                    //which will make the order that I apply UI keys important probably..they aren't very "UI" specific anymore
                    if (!(pilot.selectedUpgrades.find(function (selUpgrade) { return selUpgrade.parentUpgradeSlotKey == selectedUpgradeSlot.key; }))) {
                        return false;
                    }
                }
                break;
            case 'orUnique': {
                //if there's "uniqueName" pilot or upgrade in the squad, they are in.
                var uniqueFound = isUniqueInSquad(restriction_1[1], squad, upgradesData);
                //the "Or" part is handled here...
                if (restrictions.length < 1) {
                    throw {
                        message: "OrUnique requirement couldn't find the second restriction to check",
                        restrictionsVal: restrictions,
                        upgradeVal: upgrade,
                        pilotVal: pilot,
                        squadVal: squad
                    };
                }
                var nextRestriction = restrictions.shift();
                //evaluate next restriction by itself by putting it in its own array
                if (!(uniqueFound || isUpgradeAllowedByRestrictions(selectedUpgradeSlot, [nextRestriction], upgrade, pilot, squad, upgradesData))) {
                    return false;
                }
                break;
            }
            case 'Faction':
                if (!(restriction_1[1] === pilot.faction)) {
                    return false;
                }
                break;
            case 'AttackArc':
                if (restriction_1[1] === "Rear Arc") {
                    if (!pilot.pilotShip.attackb) {
                        return false;
                    }
                }
                break;
            case 'Keyword': {
                var keywordToFind = restriction_1[1];
                var keywordFound = false;
                if (pilot.ship.includes(keywordToFind)) {
                    keywordFound = true;
                }
                if (!keywordFound && pilot.keyword) {
                    for (var _b = 0, _c = pilot.keyword; _b < _c.length; _b++) {
                        var keyword = _c[_b];
                        if (keyword === keywordToFind) {
                            keywordFound = true;
                            break; // stop searching in pilots
                        }
                    }
                }
                if (!keywordFound && pilot.pilotShip.keyword) {
                    for (var _d = 0, _e = pilot.pilotShip.keyword; _d < _e.length; _d++) {
                        var keyword = _e[_d];
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
            case 'isUnique':
                if (restriction_1[1] && !(pilot.unique) || (!restriction_1[1] && pilot.unique)) {
                    return false;
                }
                break;
            case 'Equipped': {
                var selectedUpgradeForSlot = pilot.selectedUpgrades.find(function (selUpgrade) { return selUpgrade.slot == restriction_1[1]; });
                if (!selectedUpgradeForSlot || (selectedUpgradeForSlot.selectedUpgradeId !== 0 && !(selectedUpgradeForSlot.selectedUpgradeId))) {
                    return false;
                }
                break;
            }
            case 'ShieldsGreaterThan':
                if (!pilot.pilotShip.shields || !(pilot.pilotShip.shields > restriction_1[1])) {
                    return false;
                }
                break;
            case 'InitiativeGreaterThan':
                if (pilot.skill <= restriction_1[1]) {
                    return false;
                }
                break;
            case 'InitiativeLessThan':
                if (pilot.skill >= restriction_1[1]) {
                    return false;
                }
                break;
            case 'EnergyGreaterThan':
                if (pilot.pilotShip.energy <= restriction_1[1]) {
                    return false;
                }
                break;
            case 'AgilityEquals':
                if (!(pilot.pilotShip.agility === restriction_1[1])) {
                    return false;
                }
                break;
        }
        return isUpgradeAllowedByRestrictions(selectedUpgradeSlot, restrictions, upgrade, pilot, squad, upgradesData);
    }
    return true;
}
//copies selected upgrades from prevPilot to new pilot (in place). Ignores upgrade slots that aren't available on new pilot
function addUpgrades(newPilot, upgradesToAdd, squad, upgradesData) {
    if (!newPilot || !upgradesToAdd || !squad) {
        throw {
            message: "newPilot, upgradesToAdd, and squad must be provided to addUpgrades function",
            newPilotVal: newPilot,
            upgradesToAddVal: upgradesToAdd,
            squadVal: squad
        };
    }
    upgradesToAdd.forEach(function (upgradeToAdd) {
        if (isNotNullOrUndefined(upgradeToAdd.selectedUpgradeId)) {
            var newPilotUpgradeSlot = newPilot.selectedUpgrades.find(function (newPilotUpgrade) { return newPilotUpgrade.key == upgradeToAdd.key; });
            var upgradeData = upgradesData.find(function (upgrade) { return upgrade.id === upgradeToAdd.selectedUpgradeId; });
            if (newPilotUpgradeSlot && !maxPilotOrUpgradeReached(upgradeData, squad, upgradesData)) {
                setUpgrade(newPilotUpgradeSlot, upgradeData, newPilot, upgradesData);
            }
        }
    });
}
exports.addUpgrades = addUpgrades;
//sets all optional values to zero if they aren't already set
var setInitialValuesForAppReadyPilot = function (pilot) {
    pilot.force = pilot.force || 0;
    pilot.charge = pilot.charge || 0;
    var ship = pilot.pilotShip;
    ship.attack = ship.attack || 0;
    ship.attackf = ship.attackf || 0;
    ship.attackb = ship.attackb || 0;
    ship.attackl = ship.attackl || 0;
    ship.attackr = ship.attackr || 0;
    ship.attackt = ship.attackt || 0;
    ship.attackdt = ship.attackdt || 0;
    ship.attackbull = ship.attackbull || 0;
    ship.shields = ship.shields || 0;
    ship.force = ship.force || 0;
    ship.charge = ship.charge || 0;
};
function getAppReadyPilot(pilot, shipsData) {
    //makes a deep copy of the pilot so I don't have side effects on my "data repo"    
    var pilotCopy = JSON.parse(JSON.stringify(pilot));
    //attach ship
    var shipForPilot = shipsData[pilot.ship];
    if (!shipForPilot) {
        throw {
            message: "Couldn't find ship for pilot: " + pilot.name,
            pilotVal: pilot
        };
    }
    //make deep copy of ship to attach
    var shipCopy = JSON.parse(JSON.stringify(shipForPilot));
    pilotCopy.pilotShip = shipCopy;
    //set all of the non-set optional values to zero for ease of incrementing them or displaying zero later
    // (mostly for StatBlockCpt)
    setInitialValuesForAppReadyPilot(pilotCopy);
    //add upgrades
    pilotCopy.selectedUpgrades = [];
    pilotCopy.slots.forEach(function (slotName) {
        pilotCopy.selectedUpgrades.push({
            slot: slotName,
            key: null,
            selectedUpgradeId: null
        });
    });
    //sets UI keys for upgrades...doesn't actually 'select' any upgrades
    setSelectedUpgradeKeys(pilotCopy.selectedUpgrades);
    return pilotCopy;
}
exports.getAppReadyPilot = getAppReadyPilot;
function setSelectedUpgradeKeys(selectedUpgrades) {
    var slotNameUsedTracker = {};
    for (var _i = 0, selectedUpgrades_1 = selectedUpgrades; _i < selectedUpgrades_1.length; _i++) {
        var selectedUpgrade = selectedUpgrades_1[_i];
        if (!slotNameUsedTracker[selectedUpgrade.slot]) {
            slotNameUsedTracker[selectedUpgrade.slot] = 1;
        }
        else {
            slotNameUsedTracker[selectedUpgrade.slot]++;
        }
        var keyToSet = selectedUpgrade.slot + slotNameUsedTracker[selectedUpgrade.slot];
        if (!selectedUpgrade.key) {
            selectedUpgrade.key = keyToSet;
        }
        else {
            if (selectedUpgrade.key != keyToSet) {
                var error = new Error();
                throw {
                    message: "A selectedUpgrade had a different key than expected. This will probably lead to many errors. Investigate this.",
                    error: error,
                    selectedUpgradesVal: selectedUpgrades,
                    slotNameUsedTrackerVal: slotNameUsedTracker
                };
            }
        }
    }
}
//returns cheapest pilot in-faction that hasn't been selected max-times or selected elsewhere with uniqueness
function getCheapestAvailablePilotForShip(ship, faction, squad, upgradesData, pilotsData) {
    if (!ship || !faction || !squad) {
        throw {
            message: "You must provide ship, faction, and squad to the getCheapestAvailablePilotForShip function.",
            shipValue: ship,
            factionValue: faction,
            squadValue: squad
        };
    }
    var availablePilotsForShip = pilotsData.filter(function (pilot) { return pilot.ship === ship && pilot.faction === faction
        && !maxPilotOrUpgradeReached(pilot, squad, upgradesData); });
    if (!availablePilotsForShip.length) {
        return null;
    }
    var cheapnessComparator = function (prevPilot, currentPilot) { return (currentPilot.points < prevPilot.points ? currentPilot : prevPilot); };
    var cheapestPilotForShip = availablePilotsForShip.reduce(cheapnessComparator);
    return cheapestPilotForShip;
}
exports.getCheapestAvailablePilotForShip = getCheapestAvailablePilotForShip;
function removeInvalidUpgrades(squad, upgradesData) {
    var needToSearchForInvalidUpgrades = true;
    while (needToSearchForInvalidUpgrades) {
        needToSearchForInvalidUpgrades = false;
        for (var _i = 0, squad_3 = squad; _i < squad_3.length; _i++) {
            var pilot = squad_3[_i];
            var _loop_3 = function (selectedUpgrade) {
                if (isNotNullOrUndefined(selectedUpgrade.selectedUpgradeId)) {
                    var upgradeRecord = upgradesData.find(function (upgrade) { return upgrade.id == selectedUpgrade.selectedUpgradeId; });
                    if (!isUpgradeAllowed(selectedUpgrade, upgradeRecord, pilot, squad, upgradesData)) {
                        needToSearchForInvalidUpgrades = true;
                        removeUpgrade(selectedUpgrade, pilot, upgradesData);
                    }
                }
            };
            for (var _a = 0, _b = pilot.selectedUpgrades; _a < _b.length; _a++) {
                var selectedUpgrade = _b[_a];
                _loop_3(selectedUpgrade);
            }
        }
    }
    return squad;
}
exports.removeInvalidUpgrades = removeInvalidUpgrades;
function removeUpgrade(selectedUpgradeSlot, pilot, upgradesData) {
    if (isNotNullOrUndefined(selectedUpgradeSlot.selectedUpgradeId)) {
        var upgradeRecord = upgradesData.find(function (upgrade) { return upgrade.id == selectedUpgradeSlot.selectedUpgradeId; });
        selectedUpgradeSlot.selectedUpgradeId = null;
        if (upgradeRecord.confersAddons) {
            var _loop_4 = function (addon) {
                var lastIndexOfMatchingAddon = __spreadArray([], pilot.selectedUpgrades, true).reverse().findIndex(function (selUpgrade) { return selUpgrade.slot == addon; });
                pilot.selectedUpgrades.splice(lastIndexOfMatchingAddon, 1);
            };
            //remove last matching slot
            for (var _i = 0, _a = upgradeRecord.confersAddons; _i < _a.length; _i++) {
                var addon = _a[_i];
                _loop_4(addon);
            }
        }
        //remove any upgrades that were applied by "also_occupies_upgrades" from the previous slot
        pilot.selectedUpgrades.forEach(function (selUpgrade) {
            if (isNotNullOrUndefined(selUpgrade.parentUpgradeSlotKey)) {
                if (selUpgrade.parentUpgradeSlotKey == selectedUpgradeSlot.key) {
                    delete selUpgrade.parentUpgradeSlotKey;
                }
            }
        });
    }
}
function upgradeSquadShip(upgradeSlot, newlySelectedUpgrade, pilot, squad, upgradesData) {
    var prevUpgradeRecord = upgradesData.find(function (upgrade) { return upgrade.id == upgradeSlot.selectedUpgradeId; });
    var shipType = pilot.pilotShip.name;
    var shipsOfSameType = squad.filter(function (squadPilot) { return squadPilot.pilotShip.name == shipType; });
    if (prevUpgradeRecord && prevUpgradeRecord.standardized) {
        for (var _i = 0, shipsOfSameType_1 = shipsOfSameType; _i < shipsOfSameType_1.length; _i++) {
            var squadPilot = shipsOfSameType_1[_i];
            var squadPilotUpgradeSlot = squadPilot.selectedUpgrades.find(function (slot) { return slot.key == upgradeSlot.key; });
            removeUpgrade(squadPilotUpgradeSlot, squadPilot, upgradesData);
        }
    }
    if (newlySelectedUpgrade && newlySelectedUpgrade.standardized) {
        for (var _a = 0, shipsOfSameType_2 = shipsOfSameType; _a < shipsOfSameType_2.length; _a++) {
            var squadPilot = shipsOfSameType_2[_a];
            var squadPilotUpgradeSlot = squadPilot.selectedUpgrades.find(function (slot) { return slot.key == upgradeSlot.key; });
            setUpgrade(squadPilotUpgradeSlot, newlySelectedUpgrade, squadPilot, upgradesData);
        }
    }
    else {
        setUpgrade(upgradeSlot, newlySelectedUpgrade, pilot, upgradesData);
    }
}
exports.upgradeSquadShip = upgradeSquadShip;
function setUpgrade(upgradeSlot, newlySelectedUpgrade, pilot, upgradesData) {
    if (!upgradeSlot || !pilot) {
        var error = new Error();
        throw {
            message: "changeUpgrade function requires upgradeSlot and pilot",
            upgradeSlotVal: upgradeSlot,
            newlySelectedUpgradeVal: newlySelectedUpgrade,
            pilotVal: pilot,
            error: error
        };
    }
    if (newlySelectedUpgrade && upgradeSlot.selectedUpgradeId == newlySelectedUpgrade.id) {
        var error = new Error();
        throw {
            message: "changeUpgrade doesn't allow 'changing' to the same upgrade id",
            upgradeSlotVal: upgradeSlot,
            newlySelectedUpgradeVal: newlySelectedUpgrade,
            error: error
        };
    }
    if (upgradeSlot.parentUpgradeSlotKey) {
        //I'm not allowing for selected upgrade to be set on a node that's occupied by another multislot upgrade. I want to know if this ever happens
        var error = new Error();
        throw {
            message: "Tried to set a selectedUpgradeId on an upgrade slot that is occupied by a multislot upgrade's child upgrade",
            upgradeSlotVal: upgradeSlot,
            newlySelectedUpgradeVal: newlySelectedUpgrade,
            pilotVal: pilot,
            error: error
        };
    }
    removeUpgrade(upgradeSlot, pilot, upgradesData);
    if (newlySelectedUpgrade) { //if no newly selected upgrade, it means an upgrade is being removed
        upgradeSlot.selectedUpgradeId = newlySelectedUpgrade.id;
        if (newlySelectedUpgrade.unequips_upgrades) {
            var _loop_5 = function (unequip_slot) {
                var lastMatchingUnequipSlot = __spreadArray([], pilot.selectedUpgrades, true).reverse().find(function (selUpgrade) { return selUpgrade.slot == unequip_slot; });
                removeUpgrade(lastMatchingUnequipSlot, pilot, upgradesData);
            };
            //unequips last matching slot
            for (var _i = 0, _a = newlySelectedUpgrade.unequips_upgrades; _i < _a.length; _i++) {
                var unequip_slot = _a[_i];
                _loop_5(unequip_slot);
            }
        }
        if (newlySelectedUpgrade.also_occupies_upgrades) {
            var _loop_6 = function (slot) {
                var slotToOccupy = pilot.selectedUpgrades.find(function (selUpgrade) { return selUpgrade.slot == slot
                    && !isNotNullOrUndefined(selUpgrade.selectedUpgradeId); });
                if (!slotToOccupy) {
                    var error = new Error();
                    throw {
                        message: "changeUpgrade function failed to find required slot to occupy: " + slot,
                        upgradeSlotVal: upgradeSlot,
                        newlySelectedUpgradeVal: newlySelectedUpgrade,
                        pilotVal: pilot,
                        error: error
                    };
                }
                slotToOccupy.parentUpgradeSlotKey = upgradeSlot.key;
            };
            //also occupies first available slot
            for (var _b = 0, _c = newlySelectedUpgrade.also_occupies_upgrades; _b < _c.length; _b++) {
                var slot = _c[_b];
                _loop_6(slot);
            }
        }
        if (newlySelectedUpgrade.confersAddons) {
            //adds slots
            for (var _d = 0, _e = newlySelectedUpgrade.confersAddons; _d < _e.length; _d++) {
                var addon = _e[_d];
                pilot.selectedUpgrades.push({
                    slot: addon.slot,
                    key: null,
                    selectedUpgradeId: null
                });
            }
            setSelectedUpgradeKeys(pilot.selectedUpgrades);
        }
    }
}
//returns true if there is a solitary upgrade card equiped to another slot of the same type within the squad
function squadContainsAnotherSolitaryCardForThisSlot(upgradeSlot, squad, upgradesData) {
    for (var _i = 0, squad_4 = squad; _i < squad_4.length; _i++) {
        var squadPilot = squad_4[_i];
        var _loop_7 = function (squadPilotUpgrade) {
            if (squadPilotUpgrade != upgradeSlot && squadPilotUpgrade.slot == upgradeSlot.slot && isNotNullOrUndefined(squadPilotUpgrade.selectedUpgradeId)) {
                var upgradeRecord = upgradesData.find(function (upgrade) { return upgrade.id == squadPilotUpgrade.selectedUpgradeId; });
                if (upgradeRecord.solitary) {
                    return { value: true };
                }
            }
        };
        for (var _a = 0, _b = squadPilot.selectedUpgrades; _a < _b.length; _a++) {
            var squadPilotUpgrade = _b[_a];
            var state_2 = _loop_7(squadPilotUpgrade);
            if (typeof state_2 === "object")
                return state_2.value;
        }
    }
    return false;
}
exports.squadContainsAnotherSolitaryCardForThisSlot = squadContainsAnotherSolitaryCardForThisSlot;
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.makeid = makeid;
var InfoPanelCardTypes = {
    Ship: "Ship",
    Pilot: "Pilot",
    SelectedPilot: "SelectedPilot",
    Upgrade: "Upgrade"
};
exports.InfoPanelCardTypes = InfoPanelCardTypes;
var fixIcons = function (text) {
    if (text != null) {
        return text.replace(/%BULLSEYEARC%/g, '<i class="xwing-miniatures-font xwing-miniatures-font-bullseyearc"></i>')
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
exports.fixIcons = fixIcons;
