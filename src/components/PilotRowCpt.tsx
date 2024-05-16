import React, { useMemo, useRef } from "react";
import { Dropdown } from "@keatonr06/reactjs-dropdown-component";
import { DropDownStyles } from "../styleData/styleData";
import { InfoPanelCard, Pilot, ShipName, Squad, SquadPilotShip, Upgrade } from "../data/xwing_types";
import { pilots, ships, upgrades } from "../data/xwing_data";
import { getPilotCost, getSquadPilotShip, maxPilotOrUpgradeReached } from "../data/xwing_utils";
import { useSquadsDispatch } from "../contexts/SquadContext";
import ShipUpgradeCpt from "./ShipUpgradeCpt";

interface PilotRowCptProps {
  squad: Squad;
  selectedPilot: SquadPilotShip;
  onRecordMouseEnter: (infoPanelCard: InfoPanelCard) => void;
}

const PilotRowCpt: React.FC<PilotRowCptProps> = (props) => {
  const ddlSelectPilotRef = useRef(null);
  const squadsDispatch = useSquadsDispatch();

  const shipsForCustomDropdown = useMemo(() => {
    const factionShipName = Object.keys(ships)
      .filter((ship) => ships[ship].factions.includes(props.squad.faction))
      .sort() as ShipName[];
    const shipsMapped = factionShipName.map((shipName) => ({
      label: shipName,
      value: shipName,
    }));
    return shipsMapped;
  }, [props.squad.faction]);

  const pilotsForCustomDropdown = useMemo(() => {
    const availablePilots = pilots
      .filter(
        (availPilot) =>
          availPilot.ship === props.selectedPilot.ship &&
          availPilot.faction === props.squad.faction &&
          (!maxPilotOrUpgradeReached(availPilot, props.squad, upgrades) ||
            availPilot.id === props.selectedPilot.pilotId),
      )
      .sort((first, second) => first.points - second.points);

    return availablePilots.map<{
      label: string;
      value: number;
      pilotRecord: Pilot;
    }>((pilot) => ({
      label: pilot.name + " (" + pilot.points + ")",
      value: pilot.id,
      pilotRecord: pilot,
    }));
  }, [props.selectedPilot, props.squad]);

  const handleShipSelection = (selectedRecord: { label: ShipName; value: ShipName }) => {
    if (selectedRecord.value !== props.selectedPilot.ship) {
      squadsDispatch({
        type: "changeShip",
        squad: props.squad,
        currentPilot: props.selectedPilot,
        newShip: selectedRecord.value,
        upgradesData: upgrades,
        pilotsData: pilots,
        shipsData: ships,
      });
    }
  };

  const handlePilotSelection = (selectedRecord: { label: string; value: number; pilotRecord: Pilot }) => {
    if (selectedRecord.value !== props.selectedPilot.pilotId) {
      squadsDispatch({
        type: "changePilot",
        squad: props.squad,
        currentPilot: props.selectedPilot,
        newPilot: selectedRecord.pilotRecord,
        upgradesData: upgrades,
        shipsData: ships,
      });
    }
  };

  const handleShipMouseEnter = (shipDropDownItem) => {
    props.onRecordMouseEnter({
      cardData: ships[shipDropDownItem.value],
      type: "Ship",
      faction: props.squad.faction,
    });
  };

  const handlePilotMouseEnter = (pilotDropDownItem: { label: string; value: number; pilotRecord: Pilot }) => {
    props.onRecordMouseEnter({
      cardData: getSquadPilotShip(pilotDropDownItem.pilotRecord, ships, upgrades),
      type: "Pilot",
    });
  };

  const handlePilotHeaderMouseEnter = () => {
    props.onRecordMouseEnter({
      cardData: props.selectedPilot,
      type: "Pilot",
    });
  };

  const handleUpgradeMouseEnter = (upgrade: Upgrade) => {
    props.onRecordMouseEnter({ cardData: upgrade, type: "Upgrade" });
  };

  const delBtnPressed = (e) => {
    squadsDispatch({ type: "removeFromSquad", squad: props.squad, pilotToRemove: props.selectedPilot });
  };

  const cloneBtnPressed = (e) => {
    squadsDispatch({
      type: "clonePilot",
      squad: props.squad,
      pilotToClone: props.selectedPilot,
      pilotsData: pilots,
      shipsData: ships,
      upgradesData: upgrades,
    });
  };

  return (
    <div className={"shipRow ship-" + getShipBackgroundStylePostFix(props.selectedPilot.ship)}>
      <div className="shipAndPilotSelectorDiv">
        <div>
          <Dropdown
            name="selectShip"
            titleSingular="Ship"
            title="Select a ship"
            list={shipsForCustomDropdown}
            onChange={handleShipSelection}
            select={{ value: props.selectedPilot.ship }}
            styles={DropDownStyles}
            onMouseEnter={handleShipMouseEnter}
          />
        </div>
        <div>
          <Dropdown
            name="selectPilot"
            titleSingular="Pilot"
            title="Select a pilot"
            list={pilotsForCustomDropdown}
            onChange={handlePilotSelection}
            select={{ value: props.selectedPilot.pilotId }}
            ref={ddlSelectPilotRef}
            styles={DropDownStyles}
            onHeaderMouseEnter={handlePilotHeaderMouseEnter}
            onMouseEnter={handlePilotMouseEnter}
          />
        </div>
      </div>
      <div className="shipPointCost hideOnMobile">
        <span>{getPilotCost(props.selectedPilot)}</span>
      </div>
      <div className="onlyShowOnMobile" style={{ backgroundColor: "rgb(32,32,32, .6)", maxWidth: "300px" }}>
        Upgrades:
      </div>
      <div className="shipUpgrades">
        {props.selectedPilot.upgrades.map((upgrade) => (
          <ShipUpgradeCpt
            key={upgrade.squadPilotUpgradeSlotId}
            upgradeSlot={upgrade}
            squadPilot={props.selectedPilot}
            squad={props.squad}
            onRecordMouseEnter={handleUpgradeMouseEnter}
          />
        ))}
      </div>
      <div className="deleteOrCopyShip" style={{ marginTop: "5px" }}>
        <span className="onlyShowOnMobile">{`Total ship points: ${getPilotCost(props.selectedPilot)}  `}</span>
        <button className="btn-danger" onClick={delBtnPressed}>
          Delete
        </button>
        <button className="btn-info" onClick={cloneBtnPressed}>
          Clone
        </button>
      </div>
    </div>
  );
};

export default PilotRowCpt;

const getShipBackgroundStylePostFix = (shipName) => {
  switch (shipName) {
    case ships["X-Wing"].name:
      return "xwing";
    case ships["Y-Wing"].name:
      return "ywing";
    case ships["A-Wing"].name:
      return "awing";
    case ships["TIE Fighter"].name:
      return "tiefighter";
    case ships["TIE Advanced"].name:
      return "tieadvanced";
    case ships["TIE Interceptor"].name:
      return "tieinterceptor";
    case ships["YT-1300"].name:
      return "yt1300";
    case ships["Firespray-31"].name:
      return "firespray31";
    case ships["B-Wing"].name:
      return "bwing";
    case ships["TIE Bomber"].name:
      return "tiebomber";
    case ships["Lambda-Class Shuttle"].name:
      return "lambdaclassshuttle";
    case ships["HWK-290"].name:
      return "hwk290";
    case ships.StarViper.name:
      return "starviper";
    case ships["Z-95 Headhunter"].name:
      return "z95headhunter";
    case ships["M3-A Interceptor"].name:
      return "m3ainterceptor";
    case ships["YT-2400"].name:
      return "yt2400";
    case ships["VT-49 Decimator"].name:
      return "vt49decimator";
    case ships["TIE Defender"].name:
      return "tiedefender";
    case ships["TIE Phantom"].name:
      return "tiephantom";
    case ships.Aggressor.name:
      return "aggressor";
    case ships["TIE/FO Fighter"].name:
      return "tiefofighter";
    case ships["T-70 X-Wing"].name:
      return "t70xwing";
    case ships["TIE Advanced Prototype"].name:
      return "tieadvancedprototype";
    case ships["VCX-100"].name:
      return "vcx100";
    case ships["Attack Shuttle"].name:
      return "attackshuttle";
    case ships["ARC-170"].name:
      return "arc170";
    case ships["Lancer-Class Pursuit Craft"].name:
      return "lancerclasspursuitcraft";
    case ships["Fang Fighter"].name:
      return "fangfighter";
    case ships["TIE/SF Fighter"].name:
      return "tiesffighter";
    case ships["Upsilon-Class Command Shuttle"].name:
      return "upsilonclasscommandshuttle";
    case ships["TIE Aggressor"].name:
      return "tieaggressor";
    case ships["K-Wing"].name:
      return "kwing";
    case ships["Sheathipede-Class Shuttle"].name:
      return "sheathipedeclassshuttle";
    case ships["Auzituck Gunship"].name:
      return "auzituckgunship";
    case ships["U-Wing"].name:
      return "uwing";
    case ships["Alpha-Class Star Wing"].name:
      return "alphaclassstarwing";
    case ships["TIE Punisher"].name:
      return "tiepunisher";
    case ships["TIE Striker"].name:
      return "tiestriker";
    case ships["G-1A Starfighter"].name:
      return "g1astarfighter";
    case ships["JumpMaster 5000"].name:
      return "jumpmaster5000";
    case ships["Kihraxz Fighter"].name:
      return "kihraxzfighter";
    case ships["M12-L Kimogila Fighter"].name:
      return "m12lkimogilafighter";
    case ships["Customized YT-1300"].name:
      return "customizedyt1300";
    case ships["Mining Guild TIE Fighter"].name:
      return "miningguildtiefighter";
    case ships.Quadjumper.name:
      return "quadjumper";
    case ships["Scurrg H-6 Bomber"].name:
      return "scurrgh6bomber";
    case ships["YV-666"].name:
      return "yv666";
    case ships["TIE/VN Silencer"].name:
      return "tievnsilencer";
    case ships["Scavenged YT-1300"].name:
      return "scavengedyt1300";
    case ships["MG-100 StarFortress"].name:
      return "mg100starfortress";
    case ships["RZ-2 A-Wing"].name:
      return "rz2awing";
    case ships["Escape Craft"].name:
      return "escapecraft";
    case ships["Resistance Transport"].name:
      return "resistancetransport";
    case ships["Naboo Royal N-1 Starfighter"].name:
      return "nabooroyaln1starfighter";
    case ships["Hyena-Class Droid Bomber"].name:
      return "hyenaclassdroidbomber";
    case ships["Delta-7 Aethersprite"].name:
      return "delta7aethersprite";
    case ships["V-19 Torrent"].name:
      return "v19torrent";
    case ships["Belbullab-22 Starfighter"].name:
      return "belbullab22starfighter";
    case ships["Sith Infiltrator"].name:
      return "sithinfiltrator";
    case ships["BTL-B Y-Wing"].name:
      return "btlbywing";
    case ships["Nantex-Class Starfighter"].name:
      return "nantexclassstarfighter";
    case ships["Vulture-class Droid Fighter"].name:
      return "vultureclassdroidfighter";
    case ships["E-Wing"].name:
      return "ewing";
    case ships["TIE Reaper"].name:
      return "tiereaper";
    case ships.Fireball.name:
      return "fireball";
    case ships["TIE/Ba Interceptor"].name:
      return "tiebainterceptor";
    case ships["Resistance Transport Pod"].name:
      return "resistancetransportpod";
    case ships["TIE/rb Heavy"].name:
      return "tierbheavy";
    case ships["Xi-class Light Shuttle"].name:
      return "xiclasslightshuttle";
    case ships["Eta-2 Actis"].name:
      return "eta2actis";
    case ships["LAAT/i Gunship"].name:
      return "laatigunship";
    case ships["Nimbus-class V-Wing"].name:
      return "nimbusclassvwing";
    case ships["Syliure-class Hyperspace Ring"].name:
      return "syliureclasshyperspacering";
    case ships["Droid Tri-Fighter"].name:
      return "droidtrifighter";
    case ships["HMP Droid Gunship"].name:
      return "hmpdroidgunship";
    case ships["GR-75 Medium Transport"].name:
      return "gr75mediumtransport";
    case ships["CR90 Corellian Corvette"].name:
      return "cr90corelliancorvette";
    case ships["C-ROC Cruiser"].name:
      return "croccruiser";
    case ships["Gozanti-class Cruiser"].name:
      return "gozanticlasscruiser";
    case ships["Raider-class Corvette"].name:
      return "raiderclasscorvette";
    case ships["Trident-class Assault Ship"].name:
      return "tridentclassassaultship";
    default:
      return "";
  }
};
