import React, { useState } from 'react';
import * as xwingData from '../data/xwing_data';
import HeaderComponent from './HeaderComponent';
import SquadBuilderCpt from './SquadBuilderCpt';
import { useModalSetter } from '../contexts/ModalContext';

const factionsOrdered: xwingData.Faction[] = [
    xwingData.factionNames["Rebel Alliance"],
    xwingData.factionNames["Galactic Empire"],
    xwingData.factionNames["Scum and Villainy"],
    xwingData.factionNames.Resistance,
    xwingData.factionNames["First Order"],
    xwingData.factionNames["Galactic Republic"],
    xwingData.factionNames["Separatist Alliance"]
  ];

const FactionSelector: React.FC = () => {
    const [selectedFaction, setSelectedFaction] = useState<keyof typeof xwingData.factionNames>(xwingData.factionNames['Rebel Alliance']);
    const setModal = useModalSetter();
    return (
        <>
          <HeaderComponent
            factions={factionsOrdered}
            selectedFaction={selectedFaction}
            onClick={setSelectedFaction}
          />
          <main>
            {factionsOrdered.map(faction => (
              <SquadBuilderCpt key={faction}
                selectedFaction={selectedFaction}
                faction={faction}
                setModal={setModal}
              />
            ))}
          </main>
        </>
    );
}

export default FactionSelector;