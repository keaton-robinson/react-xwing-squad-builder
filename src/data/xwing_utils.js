const xwingData = require('./xwing_data.js')

//intended to be used for checking if an id is selected. Ids start at zero, so you have to check for zero or something bigger
//    >=  operator doesn't work as a shortcut because javascript converts null to zero. 
function isNotNullOrUndefined(value){
    if(value==0 || value){
        return true;
    }
    return false;
}

const shipBaseSizes = {
    Small: "Small",
    Medium: "Medium",
    Large: "Large",
    Huge: "Huge"
}

const getShipBaseSize = (ship) => {
    if(ship.huge){
        return shipBaseSizes.Huge;
    } else if(ship.large){
        return shipBaseSizes.Large;
    } else if(ship.medium){
        return shipBaseSizes.Medium;
    } else {
        return shipBaseSizes.Small;
    }
}

function getUpgradeCost(upgrade, pilot){
    if(isNotNullOrUndefined(upgrade.points)){
        return upgrade.points; 
    }
    else if(upgrade.pointsarray){
        if(upgrade.variableinit){
            return upgrade.pointsarray[pilot.skill];
        } 
        else if(upgrade.variablebase){
            if(pilot.pilotShip.huge){
                return upgrade.pointsarray[3];
            } else if(pilot.pilotShip.large){
                return upgrade.pointsarray[2];
            } else if(pilot.pilotShip.medium){
                return upgrade.pointsarray[1];
            }
            return upgrade.pointsarray[0];
        }
        else if(upgrade.variableagility){
            return upgrade.pointsarray[pilot.pilotShip.agility];
        }
    }
    throw {
        message: "Error calculating points on upgrade. Couldn't find point value.",
        upgradeVal: upgrade,
        pilotVal: pilot
    }
}

function getPilotCost(pilot) {
    return pilot.points +  pilot.selectedUpgrades.reduce((prevPointsSum, selectedUpgrade) => {
        if(isNotNullOrUndefined(selectedUpgrade.selectedUpgradeId)){  
            const upgradeData = xwingData.upgrades.find(upgradeFromData=> upgradeFromData.id === selectedUpgrade.selectedUpgradeId)
            return prevPointsSum + getUpgradeCost(upgradeData, pilot);
        }
        return prevPointsSum;
    }, 0);
}


function getSquadCost(squad) {
    return squad.reduce((prevPointsSum, pilot) => {
        return prevPointsSum + getPilotCost(pilot);
    }, 0);
}

function getPilotEffectiveStats(pilot) {
    
    if(!pilot){
        throw {
            message: "pilot required for getPilotEffectiveStats",
            pilotVal: pilot
        };
    }
    
    const pilotCopy = JSON.parse(JSON.stringify(pilot));
    

    for(const selectedUpgrade of pilotCopy.selectedUpgrades){
        //gotta get the upgrade data
        if(isNotNullOrUndefined(selectedUpgrade.selectedUpgradeId)){
            const upgradeData = xwingData.upgrades.find(upgrade => upgrade.id == selectedUpgrade.selectedUpgradeId)
            if(!upgradeData){
                throw {
                    message: "Failed to find upgrade record for upgrade record id: " + selectedUpgrade.selectedUpgradeId,
                    selectedUpgradeVal: selectedUpgrade
                };
            } else {
                if(upgradeData.modifier_func){
                    upgradeData.modifier_func(pilotCopy.pilotShip);
                }
            }
        }
    }
    return pilotCopy;
}

//returns true if unique or max_per_squad pilot has already been selected max_times in the squad already
function maxPilotOrUpgradeReached(cardToCheck, squad){

    if(cardToCheck.max_per_squad){
        if(!cardToCheck.slot){
            //we're looking at a pilot card
            let numberOfPilotInSquad = squad.filter(squadPilot => squadPilot.id == cardToCheck.id).length;
            if(numberOfPilotInSquad == cardToCheck.max_per_squad){
                return true;
            } else if(numberOfPilotInSquad > cardToCheck.max_per_squad){
                const error = new Error();
                throw {
                    message: "Somehow got more than " + cardToCheck.max_per_squad + " instances of " + cardToCheck.name + " id: " + cardToCheck.id + " in squad. Investigate.",
                    pilotToCheckVal: cardToCheck,
                    squadVal: squad,
                    error: error
                };
            }
        } else {
            //we're looking at an upgrade card
            let numberOfUpgradeInSquad = 0;
            for(const squadPilot of squad){
                for(const pilotUpgrade of squadPilot.selectedUpgrades){
                    if(pilotUpgrade.selectedUpgradeId == cardToCheck.id){
                        numberOfUpgradeInSquad++;
                    }
                }
            }

            if(numberOfUpgradeInSquad == cardToCheck.max_per_squad){
                return true;
            } else if(numberOfUpgradeInSquad > cardToCheck.max_per_squad){
                const error = new Error();
                throw {
                    message: "Somehow got more than " + cardToCheck.max_per_squad + " instances of " + cardToCheck.name + " id: " + cardToCheck.id + " in squad. Investigate.",
                    upgradeToCheckVal: cardToCheck,
                    squadVal: squad,
                    error: error
                };
            }
    
        }
    }
    
    if(cardToCheck.unique){
        if(isUniqueInSquad(cardToCheck.canonical_name ? cardToCheck.canonical_name : cardToCheck.name, squad)){
            return true;
        }
    }
    
    return false;
}


function isUniqueInSquad(uniqueCanonName,squad){
    //if there's "uniqueName" pilot or upgrade in the squad, they are in.
    let uniqueFound = false;
                
    for(const pilot of squad){
        if(!uniqueFound) {
            if(pilot.name.includes(uniqueCanonName)){
                uniqueFound = true;
                break;
            } else {
                for(const selectedUpgrade of pilot.selectedUpgrades){
                    //gotta go get the upgrade...
                    if(isNotNullOrUndefined(selectedUpgrade.selectedUpgradeId)){
                        const upgradeData = xwingData.upgrades.find(upgradeRecord => upgradeRecord.id == selectedUpgrade.selectedUpgradeId)
                        if(upgradeData.name.includes(uniqueCanonName)){
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
function isUpgradeAllowed(selectedUpgradeSlot, upgrade, pilot, squad){
    if(!selectedUpgradeSlot || !upgrade || !pilot || !squad){
        throw {
            message: "selectedUpgradeSlot, upgrade, pilot, and squad arguments are required for isUpgradeAllowed function",
            selectedUpgradeSlotVal: selectedUpgradeSlot,
            upgradeVal: upgrade,
            pilotVal: effectivePilot,
            squadVal: squad
        };
    }

    const effectivePilot = getPilotEffectiveStats(pilot);

    if(upgrade.faction) {
        if(Array.isArray(upgrade.faction)){
            let factionFound = false;
            for(const upgradeFaction of upgrade.faction){
                if(upgradeFaction === effectivePilot.faction){
                    factionFound = true;
                    break; //break out of for loop
                }
            }
            if(!factionFound){
                return false; // the upgrade's available factions don't include the pilot's faction
            }
        } else if(upgrade.faction !== effectivePilot.faction) {
            return false               
        }
    }
    if(upgrade.ship){
        if(typeof(upgrade.ship) == "string" && upgrade.ship !== effectivePilot.ship){
            return false;
        }
        else if(!upgrade.ship.includes(effectivePilot.ship)){
            return false;
        }
    }
    if(upgrade.restrictions) {
        const restrictionsCopy = [...upgrade.restrictions];
        if(!isUpgradeAllowedByRestrictions(selectedUpgradeSlot, restrictionsCopy, upgrade, effectivePilot, squad)){
            return false;
        }
    }
    return true;
}

function isUpgradeAllowedByRestrictions(selectedUpgradeSlot, restrictions, upgrade, pilot, squad){

    if(!selectedUpgradeSlot || !restrictions || !upgrade || !pilot || !squad){
        throw {
            message: "isUpgradeAllowedByRestrictions requires selectedUpgradeSlot, restrictions, upgrade, pilot, and squad parameters, but didn't receive one or more.",
            selectedUpgradeSlotVal: selectedUpgradeSlot,
            restrictionsVal: restrictions,
            upgradeVal: upgrade,
            pilotVal: pilot,
            squadVal: squad
        };
    }

    if(restrictions.length > 0) { 
        const restriction = restrictions.shift();
        
        switch(restriction[0]){
            case 'Base':
                if(restriction[1] === "Small" && (pilot.pilotShip.medium || pilot.pilotShip.large || pilot.pilotShip.huge)){
                    return false;
                }
                if(restriction[1] === "Large" && !pilot.pilotShip.large){
                    return false;
                }
                if(restriction[1] === "Huge" && !pilot.pilotShip.huge){
                    return false;
                }
                if(restriction[1] === "Small or Medium" && (pilot.pilotShip.large || pilot.pilotShip.huge)){
                    return false;
                }
                if(restriction[1] === "Medium or Large" && !(pilot.pilotShip.medium || pilot.pilotShip.large)){
                    return false;
                }
                if(restriction[1] === "Standard" && pilot.pilotShip.huge){
                    return false;
                }
                break;
            case 'Action': {
                let actionFound = false;
                for(const action of pilot.pilotShip.actions){
                    if(!action.includes(">") &&  action.includes(restriction[1])){  //i think red and purple actions count...well..I can't engine upgrade an A-wing tho...
                                                    //oh, tac officer, engine upgrade, and expert handling specify "RED Coordinate" (with shape) / "RED boost" (with shape)
                                                    //moff jerjerrod just specifies "coordinate"
                                                    //ok so upgrade cards that restrict to "action" will accept any difficulty, but if they specify a difficulty, the ship must have that difficulty of the action
                                                    //ok so any upgrade that doesn't contain ">" but does contain "actionName", satisfies the requirement

                        actionFound = true;
                        break; // just breaks out of the for loop
                    }
                }
                if(!actionFound){
                    return false;
                }
                break;
            }
            case 'Slot':
                //if the upgrade is not currently the equiped upgrade, need to check if another slot of the specified type is available
                if(selectedUpgradeSlot.selectedUpgradeId != upgrade.id){
                    if(!(pilot.selectedUpgrades.find(selUpgradeSlot => selUpgradeSlot.key != selectedUpgradeSlot.key 
                        && selUpgradeSlot.slot == restriction[1] && !isNotNullOrUndefined(selUpgradeSlot.selectedUpgradeId)
                        && !selUpgradeSlot.parentUpgradeSlotKey))){
                            return false; // didn't find an available slot of the required type 
                        }
                } else {
                    //it is the currently equipped upgrade, need to check that there is a slot of the specified type 
                    //that has its "parent" set to this selectedUpgrade's key ...ahh fukc that could mess up if something starts adding / removing a slot a bunch
                    //which will make the order that I apply UI keys important probably..they aren't very "UI" specific anymore
                    if(!(pilot.selectedUpgrades.find(selUpgrade => selUpgrade.parentUpgradeSlotKey == selectedUpgradeSlot.key))){
                        return false;
                    }
                }
                break;
            case 'orUnique': {
                //if there's "uniqueName" pilot or upgrade in the squad, they are in.
                let uniqueFound = isUniqueInSquad(restriction[1], squad);

                //the "Or" part is handled here...
                if(restrictions.length < 1) {
                    throw {
                        message: "OrUnique requirement couldn't find the second restriction to check",
                        restrictionsVal: restrictions, 
                        upgradeVal: upgrade, 
                        pilotVal: pilot, 
                        squadVal: squad
                    }
                }
                const nextRestriction = restrictions.shift();
                //evaluate next restriction by itself by putting it in its own array
                if(!(uniqueFound || isUpgradeAllowedByRestrictions(selectedUpgradeSlot,[nextRestriction], upgrade, pilot, squad))) {
                    return false;
                }
                break;
            }
            case 'Faction':
                if(!(restriction[1] === pilot.faction)){
                    return false;
                }
                break;
            case 'AttackArc':
                if(restriction[1] === "Rear Arc"){
                    if(!pilot.pilotShip.attackb){
                        return false;
                    }
                }
                break;
            case 'Keyword': {
                const keywordToFind = restriction[1];
                let keywordFound = false;

                if(pilot.ship.includes(keywordToFind)){
                    keywordFound = true;
                }

                if(!keywordFound && pilot.keyword){
                    for(const keyword of pilot.keyword){
                        if(keyword === keywordToFind){
                            keywordFound = true;
                            break; // stop searching in pilots
                        }
                    }
                }
                if(!keywordFound && pilot.pilotShip.keyword){
                    for(const keyword of pilot.pilotShip.keyword){
                        if(keyword === keywordToFind){
                            keywordFound = true;
                            break; //stop searching keywords of the ship
                        }
                    }
                }

                if(!keywordFound){
                    return false;
                }
                break;
            }
            case 'isUnique':
                if(restriction[1] && !(pilot.unique) || (!restriction[1] && pilot.unique)){
                    return false;
                }
                break;
            case 'Equipped': {
                const selectedUpgradeForSlot = pilot.selectedUpgrades.find(selUpgrade => selUpgrade.slot == restriction[1]);
                if (!selectedUpgradeForSlot ||  (selectedUpgradeForSlot.selectedUpgradeId !== 0 && !(selectedUpgradeForSlot.selectedUpgradeId))){
                    return false; 
                }
                break;
            }
            case 'ShieldsGreaterThan':
                if(!pilot.pilotShip.shields || !(pilot.pilotShip.shields > restriction[1])){
                    return false;
                }
                break;
            case 'InitiativeGreaterThan':
                if(pilot.skill <= restriction[1]){
                    return false;
                }
                break;
            case 'InitiativeLessThan':
                if(pilot.skill >= restriction[1]){
                    return false;
                }
                break;
            case 'EnergyGreaterThan':
                if(pilot.pilotShip.energy <= restriction[1]){
                    return false;
                }
                break;
            case 'AgilityEquals':
                if(!(pilot.pilotShip.agility === restriction[1])){
                    return false;
                }
                break;
        }

        return isUpgradeAllowedByRestrictions(selectedUpgradeSlot, restrictions, upgrade, pilot, squad);
    }
    return true;
}

//copies selected upgrades from prevPilot to new pilot (in place). Ignores upgrade slots that aren't available on new pilot
function addUpgrades(newPilot, upgradesToAdd, squad){
    if(!newPilot || !upgradesToAdd || !squad){
        throw {
            message: "newPilot, upgradesToAdd, and squad must be provided to addUpgrades function",
            newPilotVal: newPilot,
            upgradesToAddVal: upgradesToAdd,
            squadVal: squad
        }
    }

    upgradesToAdd.forEach(upgradeToAdd => {
        if(isNotNullOrUndefined(upgradeToAdd.selectedUpgradeId)){
            const newPilotUpgradeSlot = newPilot.selectedUpgrades.find(newPilotUpgrade => newPilotUpgrade.key == upgradeToAdd.key);
            const upgradeData = xwingData.upgrades.find(upgrade => upgrade.id === upgradeToAdd.selectedUpgradeId);

            if(newPilotUpgradeSlot && !maxPilotOrUpgradeReached(upgradeData, squad)){
                setUpgrade(newPilotUpgradeSlot, upgradeData, newPilot)                
            }
        }
    });  
}

//sets all optional values to zero if they aren't already set
const setInitialValuesForAppReadyPilot = (pilot) => {
    pilot.force = pilot.force || 0;
    pilot.charge = pilot.charge || 0;
    
    const ship = pilot.pilotShip;
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
}

function getAppReadyPilot(pilot) {
    //makes a deep copy of the pilot so I don't have side effects on my "data repo"    
    const pilotCopy = JSON.parse(JSON.stringify(pilot));
    
    //attach ship
    
    const shipForPilot = xwingData.ships[pilot.ship]; 
    if(!shipForPilot)
    {
        throw {
            message: "Couldn't find ship for pilot: " + pilot.name ,
            pilotVal: pilot 
        }
    }
    //make deep copy of ship to attach
    const shipCopy =  JSON.parse(JSON.stringify(shipForPilot));
    pilotCopy.pilotShip = shipCopy;

    //set all of the non-set optional values to zero for ease of incrementing them or displaying zero later
    // (mostly for StatBlockCpt)
    setInitialValuesForAppReadyPilot(pilotCopy);
    
    //add upgrades
    pilotCopy.selectedUpgrades = [];
    
    pilotCopy.slots.forEach(slotName => {
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

function setSelectedUpgradeKeys(selectedUpgrades){
    let slotNameUsedTracker = {};

    for(const selectedUpgrade of selectedUpgrades){
        if(!slotNameUsedTracker[selectedUpgrade.slot]){
            slotNameUsedTracker[selectedUpgrade.slot] = 1;
        } else {
            slotNameUsedTracker[selectedUpgrade.slot]++;
        }

        const keyToSet =  selectedUpgrade.slot + slotNameUsedTracker[selectedUpgrade.slot];
        if(!selectedUpgrade.key){
            selectedUpgrade.key = keyToSet; 
        } else {
            if(selectedUpgrade.key != keyToSet) {
                const error = new Error();
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
function getCheapestAvailablePilotForShip(ship, faction, squad) {
 
    if(!ship || !faction || !squad){
        throw {
            message: "You must provide ship, faction, and squad to the getCheapestAvailablePilotForShip function.",
            shipValue: ship,
            factionValue: faction,
            squadValue: squad
        };
    }
    
    const availablePilotsForShip = xwingData.pilots.filter(pilot => pilot.ship === ship && pilot.faction === faction 
        && !maxPilotOrUpgradeReached(pilot, squad));

    if(!availablePilotsForShip.length){
        return null;
    }
    const cheapnessComparator = (prevPilot, currentPilot) => ( currentPilot.points < prevPilot.points ? currentPilot : prevPilot );
    const cheapestPilotForShip = availablePilotsForShip.reduce(cheapnessComparator);
    return cheapestPilotForShip;
}

function removeInvalidUpgrades(squad) {
    let needToSearchForInvalidUpgrades = true;

    while(needToSearchForInvalidUpgrades){
        needToSearchForInvalidUpgrades = false;
        for(const pilot of squad){
            for(const selectedUpgrade of pilot.selectedUpgrades){
                if(isNotNullOrUndefined(selectedUpgrade.selectedUpgradeId)){
                    const upgradeRecord = xwingData.upgrades.find(upgrade => upgrade.id == selectedUpgrade.selectedUpgradeId);
                    if(!isUpgradeAllowed(selectedUpgrade, upgradeRecord, pilot, squad)){
                        needToSearchForInvalidUpgrades = true;
                        removeUpgrade(selectedUpgrade, pilot);
                    }
                }
            }
        }
    }
    return squad;
}

function removeUpgrade(selectedUpgradeSlot, pilot) {
    if(isNotNullOrUndefined(selectedUpgradeSlot.selectedUpgradeId)){
        const upgradeRecord = xwingData.upgrades.find(upgrade => upgrade.id == selectedUpgradeSlot.selectedUpgradeId);
        selectedUpgradeSlot.selectedUpgradeId = null;
        
        if(upgradeRecord.confersAddons){
            //remove last matching slot
            for(const addon of upgradeRecord.confersAddons){
                const lastIndexOfMatchingAddon = [...pilot.selectedUpgrades].reverse().findIndex(selUpgrade => selUpgrade.slot == addon); 
                pilot.selectedUpgrades.splice(lastIndexOfMatchingAddon, 1);
            }
        }

        //remove any upgrades that were applied by "also_occupies_upgrades" from the previous slot
        pilot.selectedUpgrades.forEach(selUpgrade => {
            if(isNotNullOrUndefined(selUpgrade.parentUpgradeSlotKey)){
                if(selUpgrade.parentUpgradeSlotKey == selectedUpgradeSlot.key){
                    delete selUpgrade.parentUpgradeSlotKey;
                }
            }
        });
    }
}

function upgradeSquadShip(upgradeSlot, newlySelectedUpgrade, pilot, squad){
    const prevUpgradeRecord = xwingData.upgrades.find(upgrade => upgrade.id == upgradeSlot.selectedUpgradeId);
    const shipType = pilot.pilotShip.name;
    const shipsOfSameType = squad.filter(squadPilot => squadPilot.pilotShip.name == shipType);
    
    if(prevUpgradeRecord && prevUpgradeRecord.standardized){
        for(const squadPilot of shipsOfSameType){
            const squadPilotUpgradeSlot = squadPilot.selectedUpgrades.find(slot => slot.key == upgradeSlot.key);
            removeUpgrade(squadPilotUpgradeSlot, squadPilot);
        }
    }

    if(newlySelectedUpgrade && newlySelectedUpgrade.standardized){ 
        for(const squadPilot of shipsOfSameType){
            const squadPilotUpgradeSlot = squadPilot.selectedUpgrades.find(slot => slot.key == upgradeSlot.key);
            setUpgrade(squadPilotUpgradeSlot, newlySelectedUpgrade, squadPilot);
        }
    } else {
        setUpgrade(upgradeSlot, newlySelectedUpgrade, pilot);
    }
}

function setUpgrade(upgradeSlot, newlySelectedUpgrade, pilot){
    if(!upgradeSlot || !pilot) {
        const error = new Error();
        throw {
            message: "changeUpgrade function requires upgradeSlot and pilot",
            upgradeSlotVal: upgradeSlot,
            newlySelectedUpgradeVal: newlySelectedUpgrade,
            pilotVal: pilot,
            error: error
        };
    }


    if(newlySelectedUpgrade && upgradeSlot.selectedUpgradeId == newlySelectedUpgrade.id){
        const error = new Error();
        throw {
            message: "changeUpgrade doesn't allow 'changing' to the same upgrade id",
            upgradeSlotVal: upgradeSlot,
            newlySelectedUpgradeVal: newlySelectedUpgrade,
            error: error
        };
    }
    
    if(upgradeSlot.parentUpgradeSlotKey) {
        //I'm not allowing for selected upgrade to be set on a node that's occupied by another multislot upgrade. I want to know if this ever happens
        const error = new Error();
        throw {
            message: "Tried to set a selectedUpgradeId on an upgrade slot that is occupied by a multislot upgrade's child upgrade",
            upgradeSlotVal: upgradeSlot,
            newlySelectedUpgradeVal: newlySelectedUpgrade,
            pilotVal: pilot,
            error: error
        }
    }

    removeUpgrade(upgradeSlot, pilot);
  
    if(newlySelectedUpgrade){  //if no newly selected upgrade, it means an upgrade is being removed
        upgradeSlot.selectedUpgradeId = newlySelectedUpgrade.id;
 
        if(newlySelectedUpgrade.unequips_upgrades){
            //unequips last matching slot
            for(const unequip_slot of newlySelectedUpgrade.unequips_upgrades){
                const lastMatchingUnequipSlot = [...pilot.selectedUpgrades].reverse().find(selUpgrade => selUpgrade.slot == unequip_slot); 
                removeUpgrade(lastMatchingUnequipSlot, pilot);
            }
        }
                
        if(newlySelectedUpgrade.also_occupies_upgrades){
            //also occupies first available slot
            for(const slot of newlySelectedUpgrade.also_occupies_upgrades){
                const slotToOccupy = pilot.selectedUpgrades.find(selUpgrade => selUpgrade.slot == slot 
                    && !isNotNullOrUndefined(selUpgrade.selectedUpgradeId))
                if(!slotToOccupy){
                    const error = new Error();
                    throw {
                        message: "changeUpgrade function failed to find required slot to occupy: " + slot,
                        upgradeSlotVal: upgradeSlot,
                        newlySelectedUpgradeVal: newlySelectedUpgrade,
                        pilotVal: pilot,
                        error: error
                    };
                }
                slotToOccupy.parentUpgradeSlotKey = upgradeSlot.key;
            }
        }

        if(newlySelectedUpgrade.confersAddons){
            //adds slots
            for(const addon of newlySelectedUpgrade.confersAddons){
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
function squadContainsAnotherSolitaryCardForThisSlot(upgradeSlot, squad){
    for(const squadPilot of squad){
        for(const squadPilotUpgrade of squadPilot.selectedUpgrades){
            if(squadPilotUpgrade != upgradeSlot  && squadPilotUpgrade.slot == upgradeSlot.slot && isNotNullOrUndefined(squadPilotUpgrade.selectedUpgradeId)){
                const upgradeRecord = xwingData.upgrades.find(upgrade => upgrade.id == squadPilotUpgrade.selectedUpgradeId)
                if(upgradeRecord.solitary){
                    return true;
                }
            }
        }
    }
    return false;
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

const InfoPanelCardTypes = {
    Ship: "Ship",
    Pilot: "Pilot",
    SelectedPilot: "SelectedPilot",
    Upgrade: "Upgrade"
}

const fixIcons = (text) => {
    if (text != null){
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
        .replace(/%LINEBREAK%/g, "<br /><br />")
    } 
}

module.exports  = { isNotNullOrUndefined, getUpgradeCost, getPilotCost, getSquadCost, getPilotEffectiveStats, maxPilotOrUpgradeReached, isUpgradeAllowed, 
    addUpgrades, getAppReadyPilot, getCheapestAvailablePilotForShip, removeInvalidUpgrades, upgradeSquadShip, squadContainsAnotherSolitaryCardForThisSlot,
    InfoPanelCardTypes, shipBaseSizes, getShipBaseSize, fixIcons, makeid }