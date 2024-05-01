import React from "react";

interface StatBlockCptProps {
  pilot?;
  ship?;
  upgrade?;
  pilotAfterUpgrades?;
}

const StatBlockCpt: React.FC<StatBlockCptProps> = (props) => {
  const renderEffectiveStat = (baseStat, statAfterUpgrades) => {
    return (
      <span>
        {baseStat ? baseStat : 0}{" "}
        {statAfterUpgrades && statAfterUpgrades !== baseStat ? `(${statAfterUpgrades})` : null}
      </span>
    );
  };

  const validateInputAndGetCardToShow = () => {
    if (!(props.pilot || props.ship || props.upgrade)) {
      throw new Error(`StatBlockCpt requires at least one of pilot, ship, or upgrade props to be set`);
    } else if (props.pilot) {
      if (props.ship || props.upgrade) {
        const error: any = new Error(
          `StatBlockCpt doesn't allow ship or upgrade prop to be set when pilot prop is set.`,
        );
        error.shipVal = props.ship;
        error.upgradeVal = props.upgrade;
        error.pilotVal = props.pilot;
        throw error;
      }
      return props.pilot.pilotShip;
    } else if (props.ship && props.upgrade) {
      const error: any = new Error(`StatBlockCpt doesn't allow ship and upgrade prop to both be set.`);
      error.shipVal = props.ship;
      error.upgradeVal = props.upgrade;
      throw error;
    } else {
      return props.ship ? props.ship : props.upgrade;
    }
  };

  let shipOrUpgrade = validateInputAndGetCardToShow();
  const pilot = props.pilot;
  const pilotAfterUpgrades = props.pilotAfterUpgrades;
  const shipAfterUpgrades = pilotAfterUpgrades?.pilotShip;

  return (
    <table className="info-stats">
      <tbody>
        {shipOrUpgrade.attack || shipAfterUpgrades?.attack ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-frontarc header-attack"></i>
            </td>
            <td className="info-attack">{renderEffectiveStat(shipOrUpgrade.attack, shipAfterUpgrades?.attack)}</td>
          </tr>
        ) : null}
        {shipOrUpgrade.attackf || shipAfterUpgrades?.attackf ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-fullfrontarc header-attack"></i>
            </td>
            <td className="info-attack">{renderEffectiveStat(shipOrUpgrade.attackf, shipAfterUpgrades?.attackf)}</td>
          </tr>
        ) : null}
        {shipOrUpgrade.attackb || shipAfterUpgrades?.attackb ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-reararc header-attack"></i>
            </td>
            <td className="info-attack">{renderEffectiveStat(shipOrUpgrade.attackb, shipAfterUpgrades?.attackb)}</td>
          </tr>
        ) : null}
        {shipOrUpgrade.attackl || shipAfterUpgrades?.attackl ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-leftarc header-attack"></i>
            </td>
            <td className="info-attack">{renderEffectiveStat(shipOrUpgrade.attackl, shipAfterUpgrades?.attackl)}</td>
          </tr>
        ) : null}
        {shipOrUpgrade.attackr || shipAfterUpgrades?.attackr ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-rightarc header-attack"></i>
            </td>
            <td className="info-attack">{renderEffectiveStat(shipOrUpgrade.attackr, shipAfterUpgrades?.attackr)}</td>
          </tr>
        ) : null}
        {shipOrUpgrade.attackt || shipAfterUpgrades?.attackt ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-singleturretarc header-attack"></i>
            </td>
            <td className="info-attack">{renderEffectiveStat(shipOrUpgrade.attackt, shipAfterUpgrades?.attackt)}</td>
          </tr>
        ) : null}
        {shipOrUpgrade.attackdt || shipAfterUpgrades?.attackdt ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-doubleturretarc header-attack"></i>
            </td>
            <td className="info-attack">{renderEffectiveStat(shipOrUpgrade.attackdt, shipAfterUpgrades?.attackdt)}</td>
          </tr>
        ) : null}
        {shipOrUpgrade.attackbull || shipAfterUpgrades?.attackbull ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-bullseyearc header-attack"></i>
            </td>
            <td className="info-attack">
              {renderEffectiveStat(shipOrUpgrade.attackbull, shipAfterUpgrades?.attackbull)}
            </td>
          </tr>
        ) : null}
        {shipOrUpgrade.agility || shipAfterUpgrades?.agility ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-agility header-stat header-agility"></i>
            </td>
            <td className="info-agility">{renderEffectiveStat(shipOrUpgrade.agility, shipAfterUpgrades?.agility)}</td>
          </tr>
        ) : null}
        {shipOrUpgrade.hull || shipAfterUpgrades?.hull ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-hull header-stat header-hull"></i>
            </td>
            <td className="info-hull">{renderEffectiveStat(shipOrUpgrade.hull, shipAfterUpgrades?.hull)}</td>
          </tr>
        ) : null}
        {shipOrUpgrade.shields || shipAfterUpgrades?.shields ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-shield header-stat header-shield"></i>
            </td>
            <td className="info-shield">{renderEffectiveStat(shipOrUpgrade.shields, shipAfterUpgrades?.shields)}</td>
          </tr>
        ) : null}
        {pilot?.force || shipOrUpgrade.force || pilotAfterUpgrades?.force + shipAfterUpgrades?.force ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font header-force xwing-miniatures-font-forcecharge"></i>
            </td>
            <td className="info-force">
              {renderEffectiveStat(
                pilot?.force || shipOrUpgrade.force,
                pilotAfterUpgrades?.force + shipAfterUpgrades?.force,
              )}
            </td>
          </tr>
        ) : null}
        {pilot?.charge || shipOrUpgrade.charge ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font header-charge xwing-miniatures-font-charge"></i>
            </td>
            <td className="info-charge">{renderEffectiveStat(pilot?.charge || shipOrUpgrade.charge, null)}</td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
};

export default StatBlockCpt;
