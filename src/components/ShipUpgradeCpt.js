import React from 'react';
import * as xwingData from '../data/xwing_data';
import * as xwingUtils from '../data/xwing_utils';

export default class ShipUpgradeCpt extends React.Component {

    constructor(props) {
        super(props);

        this.handleUpgradeSelection = this.handleUpgradeSelection.bind(this);
        this.getAvailableUpgrades = this.getAvailableUpgrades.bind(this);
    }

    getAvailableUpgrades(squadContainsAnotherSolitaryCardForThisSlot) {
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
            && xwingUtils.isUpgradeAllowed(this.props.upgradeSlot, upgrade, this.props.pilot, this.props.squad))
    }



    handleUpgradeSelection(e) {
        const newlySelectedUpgrade = xwingData.upgrades.find(upgrade => upgrade.id == e.target.value);
        this.props.changeUpgrade(this.props.upgradeSlot, newlySelectedUpgrade, this.props.pilot);
    }


    render() {
        const squadContainsAnotherSolitaryCardForThisSlot = xwingUtils.squadContainsAnotherSolitaryCardForThisSlot(this.props.upgradeSlot,this.props.squad);
        return (
            <select value={this.props.upgradeSlot.selectedUpgradeId ? this.props.upgradeSlot.selectedUpgradeId : ""} 
            onChange={this.handleUpgradeSelection} 
                disabled={this.props.upgradeSlot.parentUpgradeSlotKey
                    || squadContainsAnotherSolitaryCardForThisSlot}>
                <option value={{}}>No { xwingData.slots[this.props.upgradeSlot.slot].displayName } Upgrade</option>
                { this.getAvailableUpgrades(squadContainsAnotherSolitaryCardForThisSlot)
                .sort((upgrade1, upgrade2 )=> (xwingUtils.getUpgradeCost(upgrade1, this.props.pilot) - xwingUtils.getUpgradeCost(upgrade2, this.props.pilot)))
                .map(availUpgrade => (<option key={availUpgrade.id} value={availUpgrade.id}>{availUpgrade.name +" (" + xwingUtils.getUpgradeCost(availUpgrade, this.props.pilot) + ")"}</option>)) }
            </select>
        ); 
    }
}

