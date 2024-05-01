import React, { useState } from "react";
import HeaderComponent from "./HeaderComponent";
import SquadBuilderCpt from "./SquadBuilderCpt";
import { useModalSetter } from "../contexts/ModalContext";
import { Faction } from "../data/xwing_types";

const factionsOrdered: Faction[] = [
  "Rebel Alliance",
  "Galactic Empire",
  "Scum and Villainy",
  "Resistance",
  "First Order",
  "Galactic Republic",
  "Separatist Alliance",
];

const FactionSelector: React.FC = () => {
  const [selectedFaction, setSelectedFaction] = useState<Faction>("Rebel Alliance");
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
