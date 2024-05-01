import React, { useState } from "react";
import HeaderComponent from "./HeaderComponent";
import { Faction } from "../data/xwing_types";
import { factionsOrdered, useSquads } from "../contexts/SquadContext";
import SquadBuilderCpt from "./SquadBuilderCpt";

const FactionSelector: React.FC = () => {
  const [selectedFaction, setSelectedFaction] = useState<Faction>("Rebel Alliance");
  const squads = useSquads();

  const selectedSquad = squads.find((squad) => squad.faction === selectedFaction);
  return (
    <>
      <HeaderComponent factions={factionsOrdered} selectedFaction={selectedFaction} onClick={setSelectedFaction} />
      <main>
        <SquadBuilderCpt squad={selectedSquad} />
      </main>
    </>
  );
};

export default FactionSelector;
