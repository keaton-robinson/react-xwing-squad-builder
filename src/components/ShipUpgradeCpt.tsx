import React, { useMemo, useRef } from "react";
import { Dropdown } from "@keatonr06/reactjs-dropdown-component";
import { DropDownStyles } from "../styleData/styleData";
import { Upgrade, SquadPilotShipUpgradeSlot, SquadPilotShip, Squad } from "../data/xwing_types";
import { slots, upgrades } from "../data/xwing_data";
import {
  maxPilotOrUpgradeReached,
  isUpgradeAllowed,
  squadContainsAnotherSolitaryCardForThisSlot,
  getUpgradeCost,
} from "../data/xwing_utils";
import { useSquadsDispatch } from "../contexts/SquadContext";

interface ShipUpgradeCptProps {
  upgradeSlot: SquadPilotShipUpgradeSlot;
  squadPilot: SquadPilotShip;
  squad: Squad;
  onRecordMouseEnter: (upgrade: Upgrade) => void;

  //changeUpgrade: (
  //     upgradeSlot: SelectedUpgradeThatAllowsMutations,
  //     newlySelectedUpgrade: Upgrade,
  //     pilot: SelectedPilotThatAllowsMutations,
  //   ) => void;
}

interface UpgradeDropDownItem {
  value: number;
  label: string;
  upgradeRecord?: Upgrade;
}

const ShipUpgradeCpt: React.FC<ShipUpgradeCptProps> = (props) => {
  const ddlSelectedUpgradeRef = useRef(null);
  const squadsDispatch = useSquadsDispatch();

  const upgradeAlreadySelectedOnADifferentSlot = (upgrade) => {
    return props.squadPilot.upgrades.find(
      (upgradeSlot) =>
        upgradeSlot.upgrade?.id === upgrade.id &&
        upgradeSlot.squadPilotUpgradeSlotId !== props.upgradeSlot.squadPilotUpgradeSlotId,
    );
  };

  const handleUpgradeSelection = (selectedUpgrade: UpgradeDropDownItem) => {
    if (selectedUpgrade.value !== props.upgradeSlot.upgrade.id) {
      const newlySelectedUpgrade = upgrades.find((upgrade) => upgrade.id === selectedUpgrade.value);

      //props.changeUpgrade(props.upgradeSlot, newlySelectedUpgrade, props.squadPilot);

      // dispatch things
    }
  };

  const handleMouseEnter = (upgradeDropDownItem) => {
    if (upgradeDropDownItem.value) {
      props.onRecordMouseEnter(upgradeDropDownItem.upgradeRecord);
    }
  };

  const doesSquadContainAnotherSolitaryCardForThisSlot = squadContainsAnotherSolitaryCardForThisSlot(
    props.upgradeSlot,
    props.squad,
  );

  //   if (!doesSquadContainAnotherSolitaryCardForThisSlot) {
  //     const availableUpgrades = getAvailableUpgrades().sort(
  //       (upgrade1, upgrade2) => getUpgradeCost(upgrade1, props.squadPilot) - getUpgradeCost(upgrade2, props.squadPilot),
  //     );

  //     upgradesForCustomDropdown = availableUpgrades.map((availUpgrade) => ({
  //       label: availUpgrade.name + " (" + getUpgradeCost(availUpgrade, props.squadPilot) + ")",
  //       value: availUpgrade.id,
  //       upgradeRecord: availUpgrade,
  //     }));
  //     upgradesForCustomDropdown.unshift({
  //       value: null,
  //       label: `No ${slots[props.upgradeSlot.slot].displayName} Upgrade`,
  //     }); // needed so that people can remove upgrades
  //   }

  const upgradeRecordsForCustomDropDown: UpgradeDropDownItem[] = useMemo(() => {
    const availableUpgrades = getAvailableUpgrades(props.upgradeSlot, props.squad, props.squadPilot, upgrades);
    const upgradesAsDropDownItmes = availableUpgrades.map((availUpgrade) => ({
      label: availUpgrade.name + " (" + getUpgradeCost(availUpgrade, props.squadPilot) + ")",
      value: availUpgrade.id,
      upgradeRecord: availUpgrade,
    }));

    return [
      {
        value: null,
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
        immutable={props.upgradeSlot.parentSquadPilotUpgradeSlotId || doesSquadContainAnotherSolitaryCardForThisSlot}
        select={{ value: props.upgradeSlot.upgrade?.id }}
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
    (upgrade) => matchingSlots.includes(upgrade.slot), // upgrade.slot === props.upgradeSlot.slot
    // && (!maxPilotOrUpgradeReached(upgrade, props.squad, upgrades) || props.upgradeSlot.upgrade.id === upgrade.id) &&
    // isUpgradeAllowed(props.upgradeSlot, upgrade, props.squadPilot, props.squad, upgrades) &&
    // !upgradeAlreadySelectedOnADifferentSlot(upgrade),
  );
};

export default ShipUpgradeCpt;
