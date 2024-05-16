import React from "react";

interface StatBlock {
  attack?: number;
  attackf?: number;
  attackb?: number;
  attackl?: number;
  attackr?: number;
  attackt?: number;
  attackdt?: number;
  attackbull?: number;
  agility?: number;
  hull?: number;
  shields?: number;
  force?: number;
  charge?: number;
}

interface StatBlockCptProps {
  baseStats: StatBlock;
  statsAfterUpgrades?: StatBlock;
}

const StatBlockCpt: React.FC<StatBlockCptProps> = ({ baseStats, statsAfterUpgrades }) => {
  const renderEffectiveStat = (baseStat: number | null, statAfterUpgrades: number | null) => {
    return (
      <span>
        {baseStat ? baseStat : 0}{" "}
        {statAfterUpgrades && statAfterUpgrades !== baseStat ? `(${statAfterUpgrades})` : null}
      </span>
    );
  };

  return (
    <table className="info-stats">
      <tbody>
        {baseStats.attack || statsAfterUpgrades?.attack ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-frontarc header-attack"></i>
            </td>
            <td className="info-attack">{renderEffectiveStat(baseStats.attack, statsAfterUpgrades?.attack)}</td>
          </tr>
        ) : null}
        {baseStats.attackf || statsAfterUpgrades?.attackf ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-fullfrontarc header-attack"></i>
            </td>
            <td className="info-attack">{renderEffectiveStat(baseStats.attackf, statsAfterUpgrades?.attackf)}</td>
          </tr>
        ) : null}
        {baseStats.attackb || statsAfterUpgrades?.attackb ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-reararc header-attack"></i>
            </td>
            <td className="info-attack">{renderEffectiveStat(baseStats.attackb, statsAfterUpgrades?.attackb)}</td>
          </tr>
        ) : null}
        {baseStats.attackl || statsAfterUpgrades?.attackl ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-leftarc header-attack"></i>
            </td>
            <td className="info-attack">{renderEffectiveStat(baseStats.attackl, statsAfterUpgrades?.attackl)}</td>
          </tr>
        ) : null}
        {baseStats.attackr || statsAfterUpgrades?.attackr ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-rightarc header-attack"></i>
            </td>
            <td className="info-attack">{renderEffectiveStat(baseStats.attackr, statsAfterUpgrades?.attackr)}</td>
          </tr>
        ) : null}
        {baseStats.attackt || statsAfterUpgrades?.attackt ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-singleturretarc header-attack"></i>
            </td>
            <td className="info-attack">{renderEffectiveStat(baseStats.attackt, statsAfterUpgrades?.attackt)}</td>
          </tr>
        ) : null}
        {baseStats.attackdt || statsAfterUpgrades?.attackdt ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-doubleturretarc header-attack"></i>
            </td>
            <td className="info-attack">{renderEffectiveStat(baseStats.attackdt, statsAfterUpgrades?.attackdt)}</td>
          </tr>
        ) : null}
        {baseStats.attackbull || statsAfterUpgrades?.attackbull ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-bullseyearc header-attack"></i>
            </td>
            <td className="info-attack">{renderEffectiveStat(baseStats.attackbull, statsAfterUpgrades?.attackbull)}</td>
          </tr>
        ) : null}
        {baseStats.agility || statsAfterUpgrades?.agility ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-agility header-stat header-agility"></i>
            </td>
            <td className="info-agility">{renderEffectiveStat(baseStats.agility, statsAfterUpgrades?.agility)}</td>
          </tr>
        ) : null}
        {baseStats.hull || statsAfterUpgrades?.hull ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-hull header-stat header-hull"></i>
            </td>
            <td className="info-hull">{renderEffectiveStat(baseStats.hull, statsAfterUpgrades?.hull)}</td>
          </tr>
        ) : null}
        {baseStats.shields || statsAfterUpgrades?.shields ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font xwing-miniatures-font-shield header-stat header-shield"></i>
            </td>
            <td className="info-shield">{renderEffectiveStat(baseStats.shields, statsAfterUpgrades?.shields)}</td>
          </tr>
        ) : null}
        {baseStats.force || statsAfterUpgrades?.force ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font header-force xwing-miniatures-font-forcecharge"></i>
            </td>
            <td className="info-force">{renderEffectiveStat(baseStats.force, statsAfterUpgrades?.force)}</td>
          </tr>
        ) : null}
        {baseStats.charge || statsAfterUpgrades?.charge ? (
          <tr className="stat-icon">
            <td>
              <i className="xwing-miniatures-font header-charge xwing-miniatures-font-charge"></i>
            </td>
            <td className="info-charge">{renderEffectiveStat(baseStats.charge, statsAfterUpgrades?.charge)}</td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
};

export default StatBlockCpt;
