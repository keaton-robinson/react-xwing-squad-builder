import React, { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import { Faction } from "../data/xwing_types";
import { factionsOrdered, useSquads, useSquadsDispatch } from "../contexts/SquadContext";
import SquadBuilderCpt from "./SquadBuilderCpt";
import { useModalSetter } from "../contexts/ModalContext";
import AlertModal from "./modals/AlertModal";

const FactionSelector: React.FC = () => {
  const [selectedFaction, setSelectedFaction] = useState<Faction>("Rebel Alliance");
  const { squads, error } = useSquads();
  const dispatch = useSquadsDispatch();
  const setModal = useModalSetter();

  useEffect(() => {
    if (error) {
      setModal({
        title: "Error",
        children: (
          <AlertModal
            errorMessage={error}
            okPressed={() => {
              dispatch({ type: "clearError" });
            }}
          />
        ),
      });
    }
  }, [error, dispatch, setModal]);

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
