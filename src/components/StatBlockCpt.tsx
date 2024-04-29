import React from "react";

export default class StatBlockCpt extends React.Component<{
  pilot;
  ship;
  upgrade;
  pilotAfterUpgrades;
}> {
  renderEffectiveStat = (baseStat, statAfterUpgrades) => {
    return (
      <span>
        {baseStat ? baseStat : 0}{" "}
        {statAfterUpgrades && statAfterUpgrades !== baseStat
          ? `(${statAfterUpgrades})`
          : null}
      </span>
    );
  };

  validateInputAndGetCardToShow = () => {
    if (!(this.props.pilot || this.props.ship || this.props.upgrade)) {
      throw new Error(
        `StatBlockCpt requires at least one of pilot, ship, or upgrade props to be set`,
      );
    } else if (this.props.pilot) {
      if (this.props.ship || this.props.upgrade) {
        const error: any = new Error(
          `StatBlockCpt doesn't allow ship or upgrade prop to be set when pilot prop is set.`,
        );
        error.shipVal = this.props.ship;
        error.upgradeVal = this.props.upgrade;
        error.pilotVal = this.props.pilot;
        throw error;
      }
      return this.props.pilot.pilotShip;
    } else if (this.props.ship && this.props.upgrade) {
      const error: any = new Error(
        `StatBlockCpt doesn't allow ship and upgrade prop to both be set.`,
      );
      error.shipVal = this.props.ship;
      error.upgradeVal = this.props.upgrade;
      throw error;
    } else {
      return this.props.ship ? this.props.ship : this.props.upgrade;
    }
  };

  render() {
    let shipOrUpgrade = this.validateInputAndGetCardToShow();
    const pilot = this.props.pilot;
    const pilotAfterUpgrades = this.props.pilotAfterUpgrades;
    const shipAfterUpgrades = pilotAfterUpgrades?.pilotShip;

    return (
      <table className="info-stats">
        <tbody>
          {shipOrUpgrade.attack || shipAfterUpgrades?.attack ? (
            <tr className="stat-icon">
              <td>
                <i className="xwing-miniatures-font xwing-miniatures-font-frontarc header-attack"></i>
              </td>
              <td className="info-attack">
                {this.renderEffectiveStat(
                  shipOrUpgrade.attack,
                  shipAfterUpgrades?.attack,
                )}
              </td>
            </tr>
          ) : null}
          {shipOrUpgrade.attackf || shipAfterUpgrades?.attackf ? (
            <tr className="stat-icon">
              <td>
                <i className="xwing-miniatures-font xwing-miniatures-font-fullfrontarc header-attack"></i>
              </td>
              <td className="info-attack">
                {this.renderEffectiveStat(
                  shipOrUpgrade.attackf,
                  shipAfterUpgrades?.attackf,
                )}
              </td>
            </tr>
          ) : null}
          {shipOrUpgrade.attackb || shipAfterUpgrades?.attackb ? (
            <tr className="stat-icon">
              <td>
                <i className="xwing-miniatures-font xwing-miniatures-font-reararc header-attack"></i>
              </td>
              <td className="info-attack">
                {this.renderEffectiveStat(
                  shipOrUpgrade.attackb,
                  shipAfterUpgrades?.attackb,
                )}
              </td>
            </tr>
          ) : null}
          {shipOrUpgrade.attackl || shipAfterUpgrades?.attackl ? (
            <tr className="stat-icon">
              <td>
                <i className="xwing-miniatures-font xwing-miniatures-font-leftarc header-attack"></i>
              </td>
              <td className="info-attack">
                {this.renderEffectiveStat(
                  shipOrUpgrade.attackl,
                  shipAfterUpgrades?.attackl,
                )}
              </td>
            </tr>
          ) : null}
          {shipOrUpgrade.attackr || shipAfterUpgrades?.attackr ? (
            <tr className="stat-icon">
              <td>
                <i className="xwing-miniatures-font xwing-miniatures-font-rightarc header-attack"></i>
              </td>
              <td className="info-attack">
                {this.renderEffectiveStat(
                  shipOrUpgrade.attackr,
                  shipAfterUpgrades?.attackr,
                )}
              </td>
            </tr>
          ) : null}
          {shipOrUpgrade.attackt || shipAfterUpgrades?.attackt ? (
            <tr className="stat-icon">
              <td>
                <i className="xwing-miniatures-font xwing-miniatures-font-singleturretarc header-attack"></i>
              </td>
              <td className="info-attack">
                {this.renderEffectiveStat(
                  shipOrUpgrade.attackt,
                  shipAfterUpgrades?.attackt,
                )}
              </td>
            </tr>
          ) : null}
          {shipOrUpgrade.attackdt || shipAfterUpgrades?.attackdt ? (
            <tr className="stat-icon">
              <td>
                <i className="xwing-miniatures-font xwing-miniatures-font-doubleturretarc header-attack"></i>
              </td>
              <td className="info-attack">
                {this.renderEffectiveStat(
                  shipOrUpgrade.attackdt,
                  shipAfterUpgrades?.attackdt,
                )}
              </td>
            </tr>
          ) : null}
          {shipOrUpgrade.attackbull || shipAfterUpgrades?.attackbull ? (
            <tr className="stat-icon">
              <td>
                <i className="xwing-miniatures-font xwing-miniatures-font-bullseyearc header-attack"></i>
              </td>
              <td className="info-attack">
                {this.renderEffectiveStat(
                  shipOrUpgrade.attackbull,
                  shipAfterUpgrades?.attackbull,
                )}
              </td>
            </tr>
          ) : null}
          {shipOrUpgrade.agility || shipAfterUpgrades?.agility ? (
            <tr className="stat-icon">
              <td>
                <i className="xwing-miniatures-font xwing-miniatures-font-agility header-stat header-agility"></i>
              </td>
              <td className="info-agility">
                {this.renderEffectiveStat(
                  shipOrUpgrade.agility,
                  shipAfterUpgrades?.agility,
                )}
              </td>
            </tr>
          ) : null}
          {shipOrUpgrade.hull || shipAfterUpgrades?.hull ? (
            <tr className="stat-icon">
              <td>
                <i className="xwing-miniatures-font xwing-miniatures-font-hull header-stat header-hull"></i>
              </td>
              <td className="info-hull">
                {this.renderEffectiveStat(
                  shipOrUpgrade.hull,
                  shipAfterUpgrades?.hull,
                )}
              </td>
            </tr>
          ) : null}
          {shipOrUpgrade.shields || shipAfterUpgrades?.shields ? (
            <tr className="stat-icon">
              <td>
                <i className="xwing-miniatures-font xwing-miniatures-font-shield header-stat header-shield"></i>
              </td>
              <td className="info-shield">
                {this.renderEffectiveStat(
                  shipOrUpgrade.shields,
                  shipAfterUpgrades?.shields,
                )}
              </td>
            </tr>
          ) : null}
          {pilot?.force ||
          shipOrUpgrade.force ||
          pilotAfterUpgrades?.force + shipAfterUpgrades?.force ? (
            <tr className="stat-icon">
              <td>
                <i className="xwing-miniatures-font header-force xwing-miniatures-font-forcecharge"></i>
              </td>
              <td className="info-force">
                {this.renderEffectiveStat(
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
              <td className="info-charge">
                {this.renderEffectiveStat(
                  pilot?.charge || shipOrUpgrade.charge,
                  null,
                )}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    );
  }
}
