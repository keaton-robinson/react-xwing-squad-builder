import React, { useMemo, useRef } from "react";
import { Dropdown } from "@keatonr06/reactjs-dropdown-component";
import { DropDownStyles } from "../styleData/styleData";
import { Upgrade, SquadPilotShipUpgradeSlot, SquadPilotShip, Squad } from "../data/xwing_types";
import { slots, upgrades } from "../data/xwing_data";
import { maxPilotOrUpgradeReached, isUpgradeAllowed, getUpgradeCost, isNotNullOrUndefined } from "../data/xwing_utils";
import { useSquadsDispatch } from "../contexts/SquadContext";

interface ShipUpgradeCptProps {
  upgradeSlot: SquadPilotShipUpgradeSlot;
  squadPilot: SquadPilotShip;
  squad: Squad;
  onRecordMouseEnter: (upgrade: Upgrade) => void;
}

interface UpgradeDropDownItem {
  value: Upgrade;
  label: string;
}

const ShipUpgradeCpt: React.FC<ShipUpgradeCptProps> = (props) => {
  const ddlSelectedUpgradeRef = useRef(null);
  const squadsDispatch = useSquadsDispatch();

  const handleUpgradeSelection = (selectedUpgrade: UpgradeDropDownItem) => {
    if (selectedUpgrade.value !== props.upgradeSlot.upgrade) {
      squadsDispatch({
        type: "changeUpgrade",
        newlySelectedUpgrade: selectedUpgrade.value,
        squad: props.squad,
        squadPilot: props.squadPilot,
        upgradeSlot: props.upgradeSlot,
      });
    }
  };

  const handleMouseEnter = (upgradeDropDownItem: UpgradeDropDownItem) => {
    if (upgradeDropDownItem.value) {
      props.onRecordMouseEnter(upgradeDropDownItem.value);
    }
  };

  //returns true if there is a solitary upgrade card equiped to another slot of the same type within the squad
  const squadContainsAnotherSolitaryCardForThisSlot = useMemo(() => {
    for (const squadPilot of props.squad.squadPilots) {
      for (const squadPilotUpgrade of squadPilot.upgrades) {
        if (
          squadPilotUpgrade !== props.upgradeSlot &&
          squadPilotUpgrade.slot === props.upgradeSlot.slot &&
          isNotNullOrUndefined(squadPilotUpgrade.upgrade)
        ) {
          if (squadPilotUpgrade.upgrade.solitary) {
            return true;
          }
        }
      }
    }
    return false;
  }, [props.squad.squadPilots, props.upgradeSlot]);

  const upgradeRecordsForCustomDropDown: UpgradeDropDownItem[] = useMemo(() => {
    const availableUpgrades = getAvailableUpgrades(props.upgradeSlot, props.squad, props.squadPilot, upgrades).sort(
      (upgrade1, upgrade2) => getUpgradeCost(upgrade1, props.squadPilot) - getUpgradeCost(upgrade2, props.squadPilot),
    );
    const upgradesAsDropDownItmes = availableUpgrades.map((availUpgrade) => ({
      label: availUpgrade.name + " (" + getUpgradeCost(availUpgrade, props.squadPilot) + ")",
      value: availUpgrade,
    }));

    return [
      {
        value: null, // default value and used for removing upgrades
        label: `No ${slots[props.upgradeSlot.slot].displayName} Upgrade`,
      },
      ...upgradesAsDropDownItmes,
    ];
  }, [props.squad, props.squadPilot, props.upgradeSlot]);

  return (
    <span data-upgrade-slot={props.upgradeSlot.squadPilotUpgradeSlotId}>
      <Dropdown
        name="selectUpgrade"
        titleSingular="Upgrade"
        ref={ddlSelectedUpgradeRef}
        title={upgradeRecordsForCustomDropDown[0]?.label}
        list={upgradeRecordsForCustomDropDown}
        onChange={handleUpgradeSelection}
        styles={DropDownStyles}
        onMouseEnter={handleMouseEnter}
        immutable={props.upgradeSlot.parentSquadPilotUpgradeSlotId || squadContainsAnotherSolitaryCardForThisSlot}
        select={{ value: props.upgradeSlot.upgrade }}
      />
    </span>
  );
};

const getAvailableUpgrades = (
  upgradeSlot: SquadPilotShipUpgradeSlot,
  squad: Squad,
  squadPilot: SquadPilotShip,
  upgradesData: Upgrade[],
) => {
  const matchingSlots = [];
  if (upgradeSlot.slot === slots.HardpointShip.key) {
    // a "hardpointship" upgrade means the slot can accept a cannon, missile, or torpedo upgrade
    matchingSlots.push(slots.Cannon.key);
    matchingSlots.push(slots.Missile.key);
    matchingSlots.push(slots.Torpedo.key);
  } else {
    // otherwise, treat it as a normal upgrade
    matchingSlots.push(upgradeSlot.slot);
  }

  return upgrades.filter(
    (upgrade) =>
      matchingSlots.includes(upgrade.slot) && // upgrade.slot === props.upgradeSlot.slot
      (!maxPilotOrUpgradeReached(upgrade, squad, upgrades) || upgradeSlot.upgrade.id === upgrade.id), // &&
    // isUpgradeAllowed(props.upgradeSlot, upgrade, props.squadPilot, props.squad, upgrades) &&
    // !upgradeAlreadySelectedOnADifferentSlot(upgrade),
  );
};

const upgradeAlreadySelectedOnADifferentSlot = (
  upgrade: Upgrade,
  squadPilot: SquadPilotShip,
  currentUpgradeSlot: SquadPilotShipUpgradeSlot,
) => {
  return squadPilot.upgrades.find(
    (upgradeSlot) =>
      upgradeSlot.upgrade?.id === upgrade.id &&
      upgradeSlot.squadPilotUpgradeSlotId !== currentUpgradeSlot.squadPilotUpgradeSlotId,
  );
};

export default ShipUpgradeCpt;
