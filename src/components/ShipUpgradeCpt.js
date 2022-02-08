import React from 'react';
import * as xwingData from '../data/xwing_data';
import * as xwingUtils from '../data/xwing_utils';
import { Dropdown } from '@keatonr06/reactjs-dropdown-component';
import { DropDownStyles } from '../styleData/styleData';

export default class ShipUpgradeCpt extends React.Component {

    constructor(props) {
        super(props);
    }

    upgradeAlreadySelectedOnADifferentSlot = (upgrade) =>{
        return this.props.pilot.selectedUpgrades.find(selUpgrade => selUpgrade.selectedUpgradeId == upgrade.id && selUpgrade.key != this.props.upgradeSlot.key);
    } 

    getAvailableUpgrades = (squadContainsAnotherSolitaryCardForThisSlot) => {
        if (squadContainsAnotherSolitaryCardForThisSlot){
            //if another ship has selected a 'solitary' upgrade for this slot, this ship cannot select an upgrade for this slot (ex. tactical relays)
            return null;
        } 
        const matchingSlots = [];
        if(this.props.upgradeSlot.slot == xwingData.slots.HardpointShip.key) {
            // a "hardpointship" upgrade means the slot can accept a cannon, missile, or torpedo upgrade
            matchingSlots.push(xwingData.slots.Cannon.key);
            matchingSlots.push(xwingData.slots.Missile.key);
            matchingSlots.push(xwingData.slots.Torpedo.key);
        } else {
            // otherwise, treat it as a normal upgrade
            matchingSlots.push(this.props.upgradeSlot.slot);
        }

        return xwingData.upgrades.filter(upgrade => matchingSlots.includes(upgrade.slot)  // upgrade.slot === this.props.upgradeSlot.slot 
            && (!xwingUtils.maxPilotOrUpgradeReached(upgrade, this.props.squad) || this.props.upgradeSlot.selectedUpgradeId == upgrade.id)
            && xwingUtils.isUpgradeAllowed(this.props.upgradeSlot, upgrade, this.props.pilot, this.props.squad)
            && !this.upgradeAlreadySelectedOnADifferentSlot(upgrade))
    }



    handleUpgradeSelection = (selectedUpgrade) => {
        if(selectedUpgrade.value != this.props.upgradeSlot.selectedUpgradeId){
            const newlySelectedUpgrade = xwingData.upgrades.find(upgrade => upgrade.id == selectedUpgrade.value);
            this.props.changeUpgrade(this.props.upgradeSlot, newlySelectedUpgrade, this.props.pilot);
        }
    }

    handleMouseEnter = (upgradeDropDownItem) => {
        if(upgradeDropDownItem.value){
            this.props.onRecordMouseEnter(upgradeDropDownItem.upgradeRecord);
        }
    }

    render() {
        const squadContainsAnotherSolitaryCardForThisSlot = xwingUtils.squadContainsAnotherSolitaryCardForThisSlot(this.props.upgradeSlot,this.props.squad);
        const availableUpgrades = this.getAvailableUpgrades(squadContainsAnotherSolitaryCardForThisSlot)
                .sort((upgrade1, upgrade2 )=> (xwingUtils.getUpgradeCost(upgrade1, this.props.pilot) - xwingUtils.getUpgradeCost(upgrade2, this.props.pilot))) 
        const upgradesForCustomDropdown = availableUpgrades.map(availUpgrade => ({ label: availUpgrade.name + " (" + xwingUtils.getUpgradeCost(availUpgrade, this.props.pilot) + ")", value: availUpgrade.id, upgradeRecord: availUpgrade}));
        upgradesForCustomDropdown.unshift({ value: null , label: `No ${xwingData.slots[this.props.upgradeSlot.slot].displayName} Upgrade` }) // needed so that people can remove upgrades
        return (
            <Dropdown 
                name="selectUpgrade"
                titleSingular="Upgrade"
                title={upgradesForCustomDropdown[0].label}
                list={upgradesForCustomDropdown}
                onChange={this.handleUpgradeSelection}
                styles={DropDownStyles}
                onMouseEnter={this.handleMouseEnter}
                immutable={this.props.upgradeSlot.parentUpgradeSlotKey || squadContainsAnotherSolitaryCardForThisSlot}
                select={this.props.upgradeSlot.selectedUpgradeId ? {value: this.props.upgradeSlot.selectedUpgradeId} : null}
            />
        ); 
    }
}

