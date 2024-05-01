import React from "react";
import { Faction } from "../data/xwing_types";

const getFontClassName = (factionName: Faction) => {
  switch (factionName) {
    case "Rebel Alliance":
      return "xwing-miniatures-font-rebel";
    case "Galactic Empire":
      return "xwing-miniatures-font-empire";
    case "Scum and Villainy":
      return "xwing-miniatures-font-scum";
    case "Resistance":
      return "xwing-miniatures-font-rebel-outline";
    case "First Order":
      return "xwing-miniatures-font-firstorder";
    case "Galactic Republic":
      return "xwing-miniatures-font-republic";
    case "Separatist Alliance":
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
