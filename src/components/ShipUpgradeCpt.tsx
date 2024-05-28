import React, { useMemo, useRef } from "react";
import { Dropdown } from "@keatonr06/reactjs-dropdown-component";
import { DropDownStyles } from "../styleData/styleData";
import { Upgrade, SquadPilotUpgradeSlot, SquadPilot, Squad } from "../data/xwing_types";
import { slots, upgrades } from "../data/xwing_data";
import { isUpgradeAllowed, getUpgradeCost, isNotNullOrUndefined, maxUpgradeReached } from "../data/xwing_utils";
import { useSquadsDispatch } from "../contexts/SquadContext";

interface ShipUpgradeCptProps {
  upgradeSlot: SquadPilotUpgradeSlot;
  squadPilot: SquadPilot;
  squad: Squad;
  onRecordMouseEnter: (upgrade: Upgrade) => void;
}

interface UpgradeDropDownItem {
  value: number;
  label: string;
  upgradeRecord: Upgrade;
}

const ShipUpgradeCpt: React.FC<ShipUpgradeCptProps> = (props) => {
  const ddlSelectedUpgradeRef = useRef(null);
  const squadsDispatch = useSquadsDispatch();

  const handleUpgradeSelection = (selectedUpgrade: UpgradeDropDownItem) => {
    if (selectedUpgrade && selectedUpgrade.value !== props.upgradeSlot.upgrade?.id) {
      squadsDispatch({
        type: "changeUpgrade",
        newlySelectedUpgrade: selectedUpgrade.upgradeRecord,
        squad: props.squad,
        squadPilot: props.squadPilot,
        upgradeSlot: props.upgradeSlot,
      });
    }
  };

  const handleMouseEnter = (upgradeDropDownItem: UpgradeDropDownItem) => {
    if (upgradeDropDownItem.value) {
      props.onRecordMouseEnter(upgradeDropDownItem.upgradeRecord);
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
    const upgradesAsDropDownItmes = availableUpgrades.map(
      (availUpgrade): UpgradeDropDownItem => ({
        label: availUpgrade.name + " (" + getUpgradeCost(availUpgrade, props.squadPilot) + ")",
        value: availUpgrade.id,
        upgradeRecord: availUpgrade,
      }),
    );

    return [
      {
        value: null, // default value and used for removing upgrades
        label: `No ${slots[props.upgradeSlot.slot].displayName} Upgrade`,
        upgradeRecord: null,
      },
      ...upgradesAsDropDownItmes,
    ];
  }, [props.squad, props.squadPilot, props.upgradeSlot]);

  return (
    <span data-upgrade-slot={props.upgradeSlot.squadPilotUpgradeSlotKey}>
      <Dropdown
        name="selectUpgrade"
        titleSingular="Upgrade"
        ref={ddlSelectedUpgradeRef}
        title={upgradeRecordsForCustomDropDown[0]?.label}
        list={upgradeRecordsForCustomDropDown}
        onChange={handleUpgradeSelection}
        styles={DropDownStyles}
        onMouseEnter={handleMouseEnter}
        immutable={props.upgradeSlot.parentSquadPilotUpgradeSlotKey || squadContainsAnotherSolitaryCardForThisSlot}
        select={{ value: props.upgradeSlot.upgrade?.id }}
      />
    </span>
  );
};

const getAvailableUpgrades = (
  upgradeSlot: SquadPilotUpgradeSlot,
  squad: Squad,
  squadPilot: SquadPilot,
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
      (!maxUpgradeReached(upgrade, squad) || upgradeSlot.upgrade === upgrade) &&
      isUpgradeAllowed(upgradeSlot, upgrade, squadPilot, squad) &&
      !upgradeAlreadySelectedOnADifferentSlot(upgrade, squadPilot, upgradeSlot),
  );
};

const upgradeAlreadySelectedOnADifferentSlot = (
  upgrade: Upgrade,
  squadPilot: SquadPilot,
  currentUpgradeSlot: SquadPilotUpgradeSlot,
) => {
  return squadPilot.upgrades.find(
    (upgradeSlot) =>
      upgradeSlot.upgrade === upgrade &&
      upgradeSlot.squadPilotUpgradeSlotKey !== currentUpgradeSlot.squadPilotUpgradeSlotKey,
  );
};

export default ShipUpgradeCpt;
