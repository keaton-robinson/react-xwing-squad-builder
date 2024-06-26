import React, { useMemo, useRef } from "react";
import { Dropdown } from "@keatonr06/reactjs-dropdown-component";
import { DropDownStyles } from "../styleData/styleData";
import { ships } from "../data/xwing_data";
import { InfoPanelCard, ShipName, Squad } from "../data/xwing_types";
import { useSquadsDispatch } from "../contexts/SquadContext";

interface AddShipCptProps {
  squad: Squad;
  onRecordMouseEnter: (infoPanelCard: InfoPanelCard) => void;
}

const AddShipCpt: React.FC<AddShipCptProps> = (props) => {
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

  const ddlAddShipRef = useRef(null);

  const handleShipSelection = (selectedDropDownOption: { label: ShipName; value: ShipName }) => {
    if (selectedDropDownOption) {
      // tell parent component about new ship,
      squadsDispatch({
        type: "addShip",
        squad: props.squad,
        newShip: selectedDropDownOption.value,
      });

      ddlAddShipRef.current.clearSelection(); // reset this dropdown's value to "none"
    }
  };

  const handleMouseEnter = (shipDropDownItem) => {
    const ship = ships[shipDropDownItem.value];
    props.onRecordMouseEnter({ cardData: ship, type: "Ship", faction: props.squad.faction });
  };

  return (
    <div className="shipRow">
      <div className="shipAndPilotSelectorDiv">
        <Dropdown
          name="addShips"
          titleSingular="Ship"
          title="Add a ship"
          list={shipsForCustomDropdown}
          onChange={handleShipSelection}
          ref={ddlAddShipRef}
          styles={DropDownStyles}
          onMouseEnter={handleMouseEnter}
        />
      </div>
    </div>
  );
};

export default AddShipCpt;
