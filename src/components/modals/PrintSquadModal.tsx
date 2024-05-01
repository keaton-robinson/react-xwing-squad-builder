import React from "react";
import { SelectedPilotThatAllowsMutations } from "../../data/xwing_types";
import { upgrades } from "../../data/xwing_data";
import { getUpgradeCost, getPilotEffectiveStats } from "../../data/xwing_utils";

interface PrintSquadModalProps {
  squad: SelectedPilotThatAllowsMutations[];
}

const PrintSquadModal: React.FC<PrintSquadModalProps> = ({ squad }) => {
  const getTotalCost = (selectedPilot) => {
    let cost = selectedPilot.points;
    for (const selectedUpgrade of selectedPilot.selectedUpgrades) {
      if (selectedUpgrade.selectedUpgradeId) {
        let upgradeRecord = upgrades.find((upgr) => upgr.id === selectedUpgrade.selectedUpgradeId);
        cost += getUpgradeCost(upgradeRecord, selectedPilot);
      }
    }
    return cost;
  };

  const renderUpgrade = (selectedUpgrade, selectedPilot) => {
    if (!selectedUpgrade.selectedUpgradeId) {
      return null;
    }
    let upgradeRecord = upgrades.find((upgr) => upgr.id === selectedUpgrade.selectedUpgradeId);
    return (
      <tr key={selectedUpgrade.key}>
        <td style={{ paddingLeft: "1.5rem" }}>{upgradeRecord.name}</td>
        <td style={{ textAlign: "right" }}>{getUpgradeCost(upgradeRecord, selectedPilot)}</td>
      </tr>
    );
  };

  const print = () => {
    window.print();
  };

  return (
    <div>
      {squad.map((selectedPilot) => (
        <table key={selectedPilot.uiKey} style={{ marginBottom: "30px", minWidth: "500px" }}>
          <tbody>
            <tr>
              <td>
                <strong>{`${selectedPilot.name} -- ${selectedPilot.pilotShip.name}`}</strong>
              </td>
              <td style={{ textAlign: "right" }}>{selectedPilot.points}</td>
            </tr>
            {selectedPilot.selectedUpgrades.map((upgrade) => renderUpgrade(upgrade, selectedPilot))}
            <tr></tr>
            <tr>
              <td>
                <strong>{`Half Points: ${Math.ceil(getTotalCost(selectedPilot) / 2)}   Threshold: ${Math.ceil((getPilotEffectiveStats(selectedPilot, upgrades).pilotShip.hull + getPilotEffectiveStats(selectedPilot, upgrades).pilotShip.shields) / 2)}`}</strong>
              </td>
              <td style={{ textAlign: "right" }}>
                <strong>{`Ship Total: ${getTotalCost(selectedPilot)}`}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
      <div style={{ textAlign: "right" }}>
        <button className="btn-primary no-print" onClick={print}>
          <i className="fa-solid fa-print"></i> Print
        </button>
      </div>
    </div>
  );
};

export default PrintSquadModal;
