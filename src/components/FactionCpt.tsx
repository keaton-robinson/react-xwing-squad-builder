import React from "react";
import { factionNames } from "../data/xwing_data";
import { Faction } from "../data/xwing_types";

const getFontClassName = (factionName) => {
  switch (factionName) {
    case factionNames["Rebel Alliance"]:
      return "xwing-miniatures-font-rebel";
    case factionNames["Galactic Empire"]:
      return "xwing-miniatures-font-empire";
    case factionNames["Scum and Villainy"]:
      return "xwing-miniatures-font-scum";
    case factionNames.Resistance:
      return "xwing-miniatures-font-rebel-outline";
    case factionNames["First Order"]:
      return "xwing-miniatures-font-firstorder";
    case factionNames["Galactic Republic"]:
      return "xwing-miniatures-font-republic";
    case factionNames["Separatist Alliance"]:
      return "xwing-miniatures-font-separatists";
    default:
      return "";
  }
};

const FactionCpt: React.FC<{
  faction: Faction;
  selectedFaction: Faction;
  onClick: (faction: Faction) => void;
}> = (props) => {
  return (
    <li
      title={props.faction}
      style={props.faction === props.selectedFaction ? { color: "white", backgroundColor: "#337ab7" } : {}}
      onClick={() => {
        props.onClick(props.faction);
      }}
    >
      <i className={"xwing-miniatures-font " + getFontClassName(props.faction)}></i>
    </li>
  );
};

export default FactionCpt;
