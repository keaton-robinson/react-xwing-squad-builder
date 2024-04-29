import React from "react";
import * as xwingData from "../data/xwing_data";
import * as xwingUtils from "../data/xwing_utils";
import { Dropdown } from "@keatonr06/reactjs-dropdown-component";
import { DropDownStyles } from "../styleData/styleData";

export default class ShipUpgradeCpt extends React.Component<any> {
  private ddlSelectedUpgradeRef;

  constructor(props) {
    super(props);
    this.ddlSelectedUpgradeRef = React.createRef();
  }

  upgradeAlreadySelectedOnADifferentSlot = (upgrade) => {
    return this.props.pilot.selectedUpgrades.find(
      (selUpgrade) =>
        selUpgrade.selectedUpgradeId == upgrade.id &&
        selUpgrade.key != this.props.upgradeSlot.key,
    );
  };

  getAvailableUpgrades = (squadContainsAnotherSolitaryCardForThisSlot) => {
    if (squadContainsAnotherSolitaryCardForThisSlot) {
      //if another ship has selected a 'solitary' upgrade for this slot, this ship cannot select an upgrade for this slot (ex. tactical relays)
      return null;
    }
    const matchingSlots = [];
    if (this.props.upgradeSlot.slot == xwingData.slots.HardpointShip.key) {
      // a "hardpointship" upgrade means the slot can accept a cannon, missile, or torpedo upgrade
      matchingSlots.push(xwingData.slots.Cannon.key);
      matchingSlots.push(xwingData.slots.Missile.key);
      matchingSlots.push(xwingData.slots.Torpedo.key);
    } else {
      // otherwise, treat it as a normal upgrade
      matchingSlots.push(this.props.upgradeSlot.slot);
    }

    return xwingData.upgrades.filter(
      (upgrade) =>
        matchingSlots.includes(upgrade.slot) && // upgrade.slot === this.props.upgradeSlot.slot
        (!xwingUtils.maxPilotOrUpgradeReached(
          upgrade,
          this.props.squad,
          xwingData.upgrades,
        ) ||
          this.props.upgradeSlot.selectedUpgradeId == upgrade.id) &&
        xwingUtils.isUpgradeAllowed(
          this.props.upgradeSlot,
          upgrade,
          this.props.pilot,
          this.props.squad,
          xwingData.upgrades,
        ) &&
        !this.upgradeAlreadySelectedOnADifferentSlot(upgrade),
    );
  };

  handleUpgradeSelection = (selectedUpgrade) => {
    if (selectedUpgrade.value != this.props.upgradeSlot.selectedUpgradeId) {
      const newlySelectedUpgrade = xwingData.upgrades.find(
        (upgrade) => upgrade.id == selectedUpgrade.value,
      );
      this.props.changeUpgrade(
        this.props.upgradeSlot,
        newlySelectedUpgrade,
        this.props.pilot,
      );
    }
  };

  handleMouseEnter = (upgradeDropDownItem) => {
    if (upgradeDropDownItem.value) {
      this.props.onRecordMouseEnter(upgradeDropDownItem.upgradeRecord);
    }
  };

  // componentDidUpdate = (prevProps) => {
  //     // TODO: fix the custom drop downs so I don't have to directly modify a child component like this
  //     //the custom dropdowns don't automatically update their selected item or "title" on re-renders, sadly
  //     let current = this.ddlSelectedUpgradeRef.current;
  //     if(current.state.selectedItem && current.state.selectedItem.value != this.props.upgradeSlot.selectedUpgradeId){
  //         current.selectSingleItem({value: this.props.upgradeSlot.selectedUpgradeId});
  //     }
  // }

  render() {
    const squadContainsAnotherSolitaryCardForThisSlot =
      xwingUtils.squadContainsAnotherSolitaryCardForThisSlot(
        this.props.upgradeSlot,
        this.props.squad,
        xwingData.upgrades,
      );
    const availableUpgrades = this.getAvailableUpgrades(
      squadContainsAnotherSolitaryCardForThisSlot,
    ).sort(
      (upgrade1, upgrade2) =>
        xwingUtils.getUpgradeCost(upgrade1, this.props.pilot) -
        xwingUtils.getUpgradeCost(upgrade2, this.props.pilot),
    );
    const upgradesForCustomDropdown: {
      value: number;
      label: string;
      upgradeRecord?: xwingData.Upgrade;
    }[] = availableUpgrades.map((availUpgrade) => ({
      label:
        availUpgrade.name +
        " (" +
        xwingUtils.getUpgradeCost(availUpgrade, this.props.pilot) +
        ")",
      value: availUpgrade.id,
      upgradeRecord: availUpgrade,
    }));
    upgradesForCustomDropdown.unshift({
      value: null,
      label: `No ${xwingData.slots[this.props.upgradeSlot.slot].displayName} Upgrade`,
    }); // needed so that people can remove upgrades
    return (
      <Dropdown
        name="selectUpgrade"
        titleSingular="Upgrade"
        ref={this.ddlSelectedUpgradeRef}
        title={upgradesForCustomDropdown[0].label}
        list={upgradesForCustomDropdown}
        onChange={this.handleUpgradeSelection}
        styles={DropDownStyles}
        onMouseEnter={this.handleMouseEnter}
        immutable={
          this.props.upgradeSlot.parentUpgradeSlotKey ||
          squadContainsAnotherSolitaryCardForThisSlot
        }
        select={{ value: this.props.upgradeSlot.selectedUpgradeId }}
      />
    );
  }
}
