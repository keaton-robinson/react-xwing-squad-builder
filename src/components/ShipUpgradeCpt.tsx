// import React, { useRef } from "react";
// import { Dropdown } from "@keatonr06/reactjs-dropdown-component";
// import { DropDownStyles } from "../styleData/styleData";
// import { Upgrade, SelectedPilotThatAllowsMutations, SelectedUpgradeThatAllowsMutations } from "../data/xwing_types";
// import { slots, upgrades } from "../data/xwing_data";
// import {
//   maxPilotOrUpgradeReached,
//   isUpgradeAllowed,
//   squadContainsAnotherSolitaryCardForThisSlot,
//   getUpgradeCost,
// } from "../data/xwing_utils";

// interface ShipUpgradeCptProps {
//   upgradeSlot: SelectedUpgradeThatAllowsMutations;
//   changeUpgrade: (
//     upgradeSlot: SelectedUpgradeThatAllowsMutations,
//     newlySelectedUpgrade: Upgrade,
//     pilot: SelectedPilotThatAllowsMutations,
//   ) => void;
//   pilot: SelectedPilotThatAllowsMutations;
//   squad: SelectedPilotThatAllowsMutations[];
//   onRecordMouseEnter: (upgrade: Upgrade) => void;
// }

// const ShipUpgradeCpt: React.FC<ShipUpgradeCptProps> = (props) => {
//   const ddlSelectedUpgradeRef = useRef(null);

//   const upgradeAlreadySelectedOnADifferentSlot = (upgrade) => {
//     return props.pilot.selectedUpgrades.find(
//       (selUpgrade) => selUpgrade.selectedUpgradeId === upgrade.id && selUpgrade.key !== props.upgradeSlot.key,
//     );
//   };

//   const getAvailableUpgrades = (squadContainsAnotherSolitaryCardForThisSlot) => {
//     if (squadContainsAnotherSolitaryCardForThisSlot) {
//       //if another ship has selected a 'solitary' upgrade for this slot, this ship cannot select an upgrade for this slot (ex. tactical relays)
//       return null;
//     }
//     const matchingSlots = [];
//     if (props.upgradeSlot.slot === slots.HardpointShip.key) {
//       // a "hardpointship" upgrade means the slot can accept a cannon, missile, or torpedo upgrade
//       matchingSlots.push(slots.Cannon.key);
//       matchingSlots.push(slots.Missile.key);
//       matchingSlots.push(slots.Torpedo.key);
//     } else {
//       // otherwise, treat it as a normal upgrade
//       matchingSlots.push(props.upgradeSlot.slot);
//     }

//     return upgrades.filter(
//       (upgrade) =>
//         matchingSlots.includes(upgrade.slot) && // upgrade.slot === props.upgradeSlot.slot
//         (!maxPilotOrUpgradeReached(upgrade, props.squad, upgrades) ||
//           props.upgradeSlot.selectedUpgradeId === upgrade.id) &&
//         isUpgradeAllowed(props.upgradeSlot, upgrade, props.pilot, props.squad, upgrades) &&
//         !upgradeAlreadySelectedOnADifferentSlot(upgrade),
//     );
//   };

//   const handleUpgradeSelection = (selectedUpgrade) => {
//     if (selectedUpgrade.value !== props.upgradeSlot.selectedUpgradeId) {
//       const newlySelectedUpgrade = upgrades.find((upgrade) => upgrade.id === selectedUpgrade.value);
//       props.changeUpgrade(props.upgradeSlot, newlySelectedUpgrade, props.pilot);
//     }
//   };

//   const handleMouseEnter = (upgradeDropDownItem) => {
//     if (upgradeDropDownItem.value) {
//       props.onRecordMouseEnter(upgradeDropDownItem.upgradeRecord);
//     }
//   };

//   const doesSquadContainAnotherSolitaryCardForThisSlot = squadContainsAnotherSolitaryCardForThisSlot(
//     props.upgradeSlot,
//     props.squad,
//     upgrades,
//   );
//   const availableUpgrades = getAvailableUpgrades(doesSquadContainAnotherSolitaryCardForThisSlot).sort(
//     (upgrade1, upgrade2) => getUpgradeCost(upgrade1, props.pilot) - getUpgradeCost(upgrade2, props.pilot),
//   );
//   const upgradesForCustomDropdown: {
//     value: number;
//     label: string;
//     upgradeRecord?: Upgrade;
//   }[] = availableUpgrades.map((availUpgrade) => ({
//     label: availUpgrade.name + " (" + getUpgradeCost(availUpgrade, props.pilot) + ")",
//     value: availUpgrade.id,
//     upgradeRecord: availUpgrade,
//   }));
//   upgradesForCustomDropdown.unshift({
//     value: null,
//     label: `No ${slots[props.upgradeSlot.slot].displayName} Upgrade`,
//   }); // needed so that people can remove upgrades

//   return (
//     <Dropdown
//       name="selectUpgrade"
//       titleSingular="Upgrade"
//       ref={ddlSelectedUpgradeRef}
//       title={upgradesForCustomDropdown[0].label}
//       list={upgradesForCustomDropdown}
//       onChange={handleUpgradeSelection}
//       styles={DropDownStyles}
//       onMouseEnter={handleMouseEnter}
//       immutable={props.upgradeSlot.parentUpgradeSlotKey || doesSquadContainAnotherSolitaryCardForThisSlot}
//       select={{ value: props.upgradeSlot.selectedUpgradeId }}
//     />
//   );
// };

// export default ShipUpgradeCpt;
