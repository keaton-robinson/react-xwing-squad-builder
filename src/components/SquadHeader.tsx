import React, { useState, useEffect } from "react";
import { useModalSetter } from "../contexts/ModalContext";
import PrintSquadModal from "./modals/PrintSquadModal";
import { Squad } from "../data/xwing_types";
import { getSquadCost } from "../data/xwing_utils";
import { useSquadsDispatch } from "../contexts/SquadContext";

interface SquadHeaderProps {
  squad: Squad;
}

const SquadHeader: React.FC<SquadHeaderProps> = ({ squad }) => {
  const [editingSquadName, setEditingSquadName] = useState(false);
  const setModal = useModalSetter();
  const squadsDispatch = useSquadsDispatch();

  // allows clicking outside the edit name textbox to end editing
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!(event.target.className === "editSquadName")) {
        setEditingSquadName(false);
      }
    };

    if (editingSquadName) {
      window.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [editingSquadName]); // Dependency on editingSquadName ensures the listener is managed correctly

  const editSquadClicked = () => {
    setEditingSquadName(true);
  };

  const handleNameChange = (event) => {
    squadsDispatch({ type: "renameSquad", newName: event.target.value, squad: squad });
  };

  const onSquadNameEditKeyDown = (event) => {
    if (event.keyCode === 13) {
      //they pressed "enter"
      setEditingSquadName(false);
    }
  };

  const showPrintModal = () => {
    setModal({
      title: `${squad.name} (${getSquadCost(squad)})`,
      children: <PrintSquadModal squad={squad} />,
    });
  };

  return (
    <div className="squad-name-and-points-row">
      <div>
        {editingSquadName ? (
          <input
            className="editSquadName"
            autoFocus={true}
            type="text"
            value={squad.name}
            onChange={handleNameChange}
            onKeyDown={onSquadNameEditKeyDown}
            style={{ fontSize: "1.2rem" }}
          />
        ) : (
          <h2 style={{ display: "inline" }}>{squad.name}</h2>
        )}
        <i className="far fa-edit" style={{ marginLeft: "5px", fontSize: "1.2rem" }} onClick={editSquadClicked}></i>
      </div>
      <div className="points-display-container">
        <span>
          Points: {getSquadCost(squad)}/200 ({200 - getSquadCost(squad)} left)
        </span>
      </div>
      <div className="printBtn">
        <button className="btn-info" style={{ margin: "5px" }} onClick={showPrintModal}>
          Print
        </button>
      </div>
    </div>
  );
};

export default SquadHeader;
