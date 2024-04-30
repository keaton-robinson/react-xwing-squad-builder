import React, { useRef } from "react";
import * as xwingData from "../data/xwing_data";
import * as xwingUtils from "../data/xwing_utils";
import { Dropdown } from "@keatonr06/reactjs-dropdown-component";
import { DropDownStyles } from "../styleData/styleData";
import { SelectedPilot, SelectedUpgrade } from "../data/xwing_utils";
import { Upgrade } from "../data/xwing_data";

interface ShipUpgradeCptProps {
  upgradeSlot: SelectedUpgrade;
  changeUpgrade: (
    upgradeSlot: SelectedUpgrade,
    newlySelectedUpgrade: Upgrade,
    pilot: SelectedPilot,
  ) => void;
  pilot: SelectedPilot;
  squad: SelectedPilot[];
  onRecordMouseEnter: (upgrade: Upgrade) => void;
}

const ShipUpgradeCpt: React.FC<ShipUpgradeCptProps> = (props) => {
  const ddlSelectedUpgradeRef = useRef(null);

  const upgradeAlreadySelectedOnADifferentSlot = (upgrade) => {
    return props.pilot.selectedUpgrades.find(
      (selUpgrade) =>
        selUpgrade.selectedUpgradeId === upgrade.id &&
        selUpgrade.key !== props.upgradeSlot.key,
    );
  };

  const getAvailableUpgrades = (
    squadContainsAnotherSolitaryCardForThisSlot,
  ) => {
    if (squadContainsAnotherSolitaryCardForThisSlot) {
      //if another ship has selected a 'solitary' upgrade for this slot, this ship cannot select an upgrade for this slot (ex. tactical relays)
      return null;
    }
    const matchingSlots = [];
    if (props.upgradeSlot.slot === xwingData.slots.HardpointShip.key) {
      // a "hardpointship" upgrade means the slot can accept a cannon, missile, or torpedo upgrade
      matchingSlots.push(xwingData.slots.Cannon.key);
      matchingSlots.push(xwingData.slots.Missile.key);
      matchingSlots.push(xwingData.slots.Torpedo.key);
    } else {
      // otherwise, treat it as a normal upgrade
      matchingSlots.push(props.upgradeSlot.slot);
    }

    return xwingData.upgrades.filter(
      (upgrade) =>
        matchingSlots.includes(upgrade.slot) && // upgrade.slot === props.upgradeSlot.slot
        (!xwingUtils.maxPilotOrUpgradeReached(
          upgrade,
          props.squad,
          xwingData.upgrades,
        ) ||
          props.upgradeSlot.selectedUpgradeId === upgrade.id) &&
        xwingUtils.isUpgradeAllowed(
          props.upgradeSlot,
          upgrade,
          props.pilot,
          props.squad,
          xwingData.upgrades,
        ) &&
        !upgradeAlreadySelectedOnADifferentSlot(upgrade),
    );
  };

  const handleUpgradeSelection = (selectedUpgrade) => {
    if (selectedUpgrade.value !== props.upgradeSlot.selectedUpgradeId) {
      const newlySelectedUpgrade = xwingData.upgrades.find(
        (upgrade) => upgrade.id === selectedUpgrade.value,
      );
      props.changeUpgrade(props.upgradeSlot, newlySelectedUpgrade, props.pilot);
    }
  };

  const handleMouseEnter = (upgradeDropDownItem) => {
    if (upgradeDropDownItem.value) {
      props.onRecordMouseEnter(upgradeDropDownItem.upgradeRecord);
    }
  };

  const squadContainsAnotherSolitaryCardForThisSlot =
    xwingUtils.squadContainsAnotherSolitaryCardForThisSlot(
      props.upgradeSlot,
      props.squad,
      xwingData.upgrades,
    );
  const availableUpgrades = getAvailableUpgrades(
    squadContainsAnotherSolitaryCardForThisSlot,
  ).sort(
    (upgrade1, upgrade2) =>
      xwingUtils.getUpgradeCost(upgrade1, props.pilot) -
      xwingUtils.getUpgradeCost(upgrade2, props.pilot),
  );
  const upgradesForCustomDropdown: {
    value: number;
    label: string;
    upgradeRecord?: xwingData.Upgrade;
  }[] = availableUpgrades.map((availUpgrade) => ({
    label:
      availUpgrade.name +
      " (" +
      xwingUtils.getUpgradeCost(availUpgrade, props.pilot) +
      ")",
    value: availUpgrade.id,
    upgradeRecord: availUpgrade,
  }));
  upgradesForCustomDropdown.unshift({
    value: null,
    label: `No ${xwingData.slots[props.upgradeSlot.slot].displayName} Upgrade`,
  }); // needed so that people can remove upgrades

  return (
    <Dropdown
      name="selectUpgrade"
      titleSingular="Upgrade"
      ref={ddlSelectedUpgradeRef}
      title={upgradesForCustomDropdown[0].label}
      list={upgradesForCustomDropdown}
      onChange={handleUpgradeSelection}
      styles={DropDownStyles}
      onMouseEnter={handleMouseEnter}
      immutable={
        props.upgradeSlot.parentUpgradeSlotKey ||
        squadContainsAnotherSolitaryCardForThisSlot
      }
      select={{ value: props.upgradeSlot.selectedUpgradeId }}
    />
  );
};

export default ShipUpgradeCpt;
