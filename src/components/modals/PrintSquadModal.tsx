import React from "react";
import { Squad, SquadPilot, SquadPilotUpgradeSlot } from "../../data/xwing_types";
import { getUpgradeCost, getPilotEffectiveStatsNew } from "../../data/xwing_utils";

interface PrintSquadModalProps {
  squad: Squad;
}

const PrintSquadModal: React.FC<PrintSquadModalProps> = ({ squad }) => {
  const getTotalCost = (squadPilot: SquadPilot) => {
    let cost = squadPilot.points;
    for (const pilotUpgrade of squadPilot.upgrades) {
      if (pilotUpgrade.upgrade) {
        cost += getUpgradeCost(pilotUpgrade.upgrade, squadPilot);
      }
    }
    return cost;
  };

  const renderUpgrade = (selectedUpgrade: SquadPilotUpgradeSlot, selectedPilot: SquadPilot) => {
    if (!selectedUpgrade.upgrade) {
      return null;
    }
    return (
      <tr key={selectedUpgrade.squadPilotUpgradeSlotKey}>
        <td style={{ paddingLeft: "1.5rem" }}>{selectedUpgrade.upgrade.name}</td>
        <td style={{ textAlign: "right" }}>{getUpgradeCost(selectedUpgrade.upgrade, selectedPilot)}</td>
      </tr>
    );
  };

  const print = () => {
    window.print();
  };

  return (
    <div>
      {squad.squadPilots.map((squadPilot) => (
        <table key={squadPilot.squadPilotId} style={{ marginBottom: "30px", minWidth: "500px" }}>
          <tbody>
            <tr>
              <td>
                <strong>{`${squadPilot.pilotName} -- ${squadPilot.ship}`}</strong>
              </td>
              <td style={{ textAlign: "right" }}>{squadPilot.points}</td>
            </tr>
            {squadPilot.upgrades.map((upgrade) => renderUpgrade(upgrade, squadPilot))}
            <tr></tr>
            <tr>
              <td>
                <strong>{`Half Points: ${Math.ceil(getTotalCost(squadPilot) / 2)}   Threshold: ${Math.ceil((getPilotEffectiveStatsNew(squadPilot).hull + getPilotEffectiveStatsNew(squadPilot).shields) / 2)}`}</strong>
              </td>
              <td style={{ textAlign: "right" }}>
                <strong>{`Ship Total: ${getTotalCost(squadPilot)}`}</strong>
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
