import React, { useEffect, useMemo, useState } from "react";
import InfoPanelCpt from "./InfoPanelCpt";
import PilotRowCpt from "./PilotRowCpt";
import AddShipCpt from "./AddShipCpt";
import SquadNamePointsPrint from "./SquadNamePointsPrint";
import SaveLoadNew from "./SaveLoadNewCpt";
import { useUserContext } from "../contexts/UserContext";
import {
  Faction,
  Pilot,
  ShipName,
  InfoPanelCard,
  SelectedPilot,
  SelectedUpgrade,
  Upgrade,
} from "../data/xwing_types";
import { ships, upgrades, slots, pilots } from "../data/xwing_data";
import {
  removeInvalidUpgrades,
  addUpgrades,
  getAppReadyPilot,
  makeid,
  getCheapestAvailablePilotForShip,
  maxPilotOrUpgradeReached,
  upgradeSquadShip,
} from "../data/xwing_utils";

interface SquadBuilderCptProps {
  selectedFaction: Faction;
  faction: Faction;
  setModal: (modalConfig: any) => void;
}

interface SquadBuilderCptState {
  squadId: string;
  squad: SelectedPilot[];
  squadName: string;
  infoPanelCard: InfoPanelCard;
}

const SquadBuilderCpt: React.FC<SquadBuilderCptProps> = (props) => {
  const factionShips = Object.keys(ships)
    .filter((ship) => ships[ship].factions.includes(props.faction))
    .sort() as ShipName[];
  const initialState: SquadBuilderCptState = useMemo(() => {
    return {
      squadId: null,
      squad: [],
      squadName: `${props.faction} Squadron`,
      infoPanelCard: null,
    };
  }, [props.faction]);
  const userContext = useUserContext();
  const [state, setState] = useState<SquadBuilderCptState>(initialState);

  // reset state if a logged in user logs out
  useEffect(() => {
    if (!userContext.user) {
      setState(initialState);
    }
  }, [userContext.user, initialState]);

  const showInfoPanelCard = (infoPanelCard: InfoPanelCard) => {
    setState({ ...state, infoPanelCard: infoPanelCard });
  };

  const removeInvalidUpgradesAndSetState = (updatedSquad) => {
    removeInvalidUpgrades(updatedSquad, upgrades);
    setState({ ...state, squad: updatedSquad });
  };

  const setUpgradesOnNewPilot = (
    appReadyNewPilot: SelectedPilot,
    upgradesToApply: SelectedUpgrade[] | null,
    squadIncludingNewPilot,
  ): void => {
    if (upgradesToApply) {
      addUpgrades(
        appReadyNewPilot,
        upgradesToApply,
        squadIncludingNewPilot,
        upgrades,
      );
    } else {
      //if no upgrades specified, attach the default auto-equips
      const selectedShip = ships[appReadyNewPilot.ship];
      if (selectedShip.autoequip) {
        for (const autoEquipUpgrade of selectedShip.autoequip) {
          const configSelUpgradeSlot = appReadyNewPilot.selectedUpgrades.find(
            (selUpgrade) => selUpgrade.slot === slots.Configuration.key,
          );
          configSelUpgradeSlot.selectedUpgradeId = upgrades.find(
            (upgrade) => upgrade.name === autoEquipUpgrade,
          ).id; // TODO: directly mutated state?
        }
      }
    }
  };

  const addPilot = (
    pilotToAdd: Pilot,
    upgradesToApply?: SelectedUpgrade[],
  ): void => {
    const appReadyNewPilot = getAppReadyPilot(pilotToAdd, ships);
    const newSquadAfterAddition = [...state.squad, appReadyNewPilot];

    setUpgradesOnNewPilot(
      appReadyNewPilot,
      upgradesToApply,
      newSquadAfterAddition,
    );
    removeInvalidUpgradesAndSetState(newSquadAfterAddition);
  };

  const changePilot = (
    prevSelectedPilot: SelectedPilot,
    newPilot: Pilot,
    copyUpgrades: boolean = true,
  ): void => {
    const appReadyNewPilot = getAppReadyPilot(
      newPilot,
      ships,
      prevSelectedPilot.uiKey,
    );

    //get a copy of selected pilots and splice the new pilot into the position that the prev pilot was at
    const squadCopy = [...state.squad];
    const indexOfPilotToChange = squadCopy.findIndex(
      (pilot) => pilot.uiKey === prevSelectedPilot.uiKey,
    );
    squadCopy.splice(indexOfPilotToChange, 1, appReadyNewPilot);

    if (copyUpgrades) {
      setUpgradesOnNewPilot(
        appReadyNewPilot,
        prevSelectedPilot.selectedUpgrades,
        squadCopy,
      );
    } else {
      setUpgradesOnNewPilot(appReadyNewPilot, null, squadCopy);
    }

    removeInvalidUpgradesAndSetState(squadCopy);
  };

  const removePilot = (pilotToRemove: SelectedPilot): void => {
    const squadCopy = [...state.squad];
    const indexOfPilotToChange = squadCopy.findIndex(
      (pilot) => pilot.uiKey === pilotToRemove.uiKey,
    );
    squadCopy.splice(indexOfPilotToChange, 1);

    removeInvalidUpgradesAndSetState(squadCopy);
  };

  const addCheapestAvailablePilotForShip = (
    ship: ShipName,
    upgradesToInclude?: SelectedUpgrade[],
  ): void => {
    const cheapestAvailablePilot = getCheapestAvailablePilotForShip(
      ship,
      props.faction,
      state.squad,
      upgrades,
      pilots,
    );
    if (cheapestAvailablePilot) {
      addPilot(cheapestAvailablePilot, upgradesToInclude);
    } else {
      alert("No more pilots available for " + ship);
    }
  };

  const changeShip = (
    shipToChangeTo: ShipName,
    prevSelectedPilot: SelectedPilot,
  ): void => {
    const cheapestAvailablePilotForShip = getCheapestAvailablePilotForShip(
      shipToChangeTo,
      props.faction,
      state.squad,
      upgrades,
      pilots,
    );
    if (cheapestAvailablePilotForShip) {
      changePilot(prevSelectedPilot, cheapestAvailablePilotForShip, false);
    } else {
      alert("No more pilots available for " + shipToChangeTo);
    }
  };

  const clonePilot = (pilot: SelectedPilot): void => {
    if (maxPilotOrUpgradeReached(pilot, state.squad, upgrades)) {
      addCheapestAvailablePilotForShip(pilot.ship, pilot.selectedUpgrades);
    } else {
      addPilot(pilot, pilot.selectedUpgrades);
    }
  };

  const changeUpgrade = (
    upgradeSlot: SelectedUpgrade,
    newlySelectedUpgrade: Upgrade,
    pilot: SelectedPilot,
  ): void => {
    if (
      newlySelectedUpgrade &&
      maxPilotOrUpgradeReached(newlySelectedUpgrade, state.squad, upgrades)
    ) {
      alert("Already have max amount of " + newlySelectedUpgrade.name);
    } else {
      upgradeSquadShip(
        upgradeSlot,
        newlySelectedUpgrade,
        pilot,
        state.squad,
        upgrades,
      );
    }
    removeInvalidUpgradesAndSetState(state.squad);
  };

  const onSquadNameChanged = (newName) => {
    setState({ ...state, squadName: newName });
  };

  return (
    <div
      style={props.faction !== props.selectedFaction ? { display: "none" } : {}}
    >
      <SquadNamePointsPrint
        squadName={state.squadName}
        squad={state.squad}
        faction={props.faction}
        onSquadNameChanged={onSquadNameChanged}
      />
      <SaveLoadNew
        faction={props.faction}
        squad={state.squad}
        squadName={state.squadName}
        onSquadSaved={(newSquadId: string): void => {
          setState({ ...state, squadId: newSquadId });
        }}
        onSquadNameChanged={(newName: string): void => {
          setState({ ...state, squadName: newName });
        }}
        onSquadLoaded={(loadedSquad: {
          _id: string;
          name: string;
          pilots: SelectedPilot[];
        }): void => {
          setState({
            ...initialState,
            squadId: loadedSquad._id,
            squad: loadedSquad.pilots,
            squadName: loadedSquad.name,
          });
        }}
        onNewSquadStarted={(): void => {
          setState(initialState);
        }}
      />
      <div className="shipAndInfoContainer">
        <div className="shipAndObstacleSelectors">
          {state.squad.map((squadPilot) => (
            <PilotRowCpt
              key={squadPilot.uiKey}
              factionShips={factionShips}
              squad={state.squad}
              selectedPilot={squadPilot}
              availablePilots={pilots
                .filter(
                  (availPilot) =>
                    availPilot.ship === squadPilot.ship &&
                    availPilot.faction === props.faction &&
                    (!maxPilotOrUpgradeReached(
                      availPilot,
                      state.squad,
                      upgrades,
                    ) ||
                      availPilot.id === squadPilot.id),
                )
                .sort((first, second) => first.points - second.points)}
              changePilot={changePilot}
              changeShip={changeShip}
              removePilot={removePilot}
              clonePilot={clonePilot}
              changeUpgrade={changeUpgrade}
              onRecordMouseEnter={showInfoPanelCard}
            />
          ))}
          <AddShipCpt
            factionShips={factionShips}
            onShipSelected={addCheapestAvailablePilotForShip}
            onRecordMouseEnter={showInfoPanelCard}
          />
        </div>
        {state.infoPanelCard ? (
          <InfoPanelCpt card={state.infoPanelCard} faction={props.faction} />
        ) : (
          <div style={{ flex: 1 }}></div>
        )}
      </div>
    </div>
  );
};

export default SquadBuilderCpt;
