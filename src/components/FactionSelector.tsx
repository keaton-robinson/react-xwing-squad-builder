import React, { useState } from "react";
import HeaderComponent from "./HeaderComponent";
import SquadBuilderCpt from "./SquadBuilderCpt";
import { useModalSetter } from "../contexts/ModalContext";
import { factionNames } from "../data/xwing_data";
import { Faction } from "../data/xwing_types";

const factionsOrdered: Faction[] = [
  factionNames["Rebel Alliance"],
  factionNames["Galactic Empire"],
  factionNames["Scum and Villainy"],
  factionNames.Resistance,
  factionNames["First Order"],
  factionNames["Galactic Republic"],
  factionNames["Separatist Alliance"],
];

const FactionSelector: React.FC = () => {
  const [selectedFaction, setSelectedFaction] = useState<keyof typeof factionNames>(factionNames["Rebel Alliance"]);
  const setModal = useModalSetter();
  return (
    <>
      <HeaderComponent factions={factionsOrdered} selectedFaction={selectedFaction} onClick={setSelectedFaction} />
      <main>
        {factionsOrdered.map((faction) => (
          <SquadBuilderCpt key={faction} selectedFaction={selectedFaction} faction={faction} setModal={setModal} />
        ))}
      </main>
    </>
  );
};

export default FactionSelector;
