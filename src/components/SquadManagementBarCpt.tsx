import React, { useState, useRef, useEffect } from "react";
import { useModalSetter } from "../contexts/ModalContext";
import { useUserContext } from "../contexts/UserContext";
import NewSquadConfirmModal from "./modals/NewSquadConfirmModal";
import LoadModal from "./modals/LoadModal";
import SaveAsModal from "./modals/SaveAsModal";
import { upgrades } from "../data/xwing_data";
import { Squad } from "../data/xwing_types";
import { getSquadCost } from "../data/xwing_utils";
import { useSquadsDispatch } from "../contexts/SquadContext";

const saveStatusMessages = {
  saving: "saving...",
  success: "successfully saved!",
  error: "error saving...please try again",
};

interface SaveLoadNewProps {
  squad: Squad;
}

const SquadManagementBarCpt: React.FC<SaveLoadNewProps> = (props) => {
  const setModal = useModalSetter();
  const userContextBundle = useUserContext();
  const [saveStatusMessage, setSaveStatusMessage] = useState("");
  const squadsDispatch = useSquadsDispatch();
  const isMounted = useRef(true);

  // track isMounted for the sake of ignoring fetch calls when component unmounts mid fetch
  useEffect(() => {
    isMounted.current = true; // only really needed because development mode is gonna run the cleanup function while mounting
    return () => {
      isMounted.current = false;
    };
  }, []);

  const saveClicked = async () => {
    if (!props.squad.id) {
      // saving new squad...do post
      return saveSquadAs(props.squad.name);
    }
    setSaveStatusMessage(saveStatusMessages.saving);
    try {
      // updating existing squad... do put/patch
      const response = await fetch(
        // @ts-ignore
        XWING_API_ENDPOINT + `/squads/${props.squad.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: userContextBundle.user.token,
          },
          body: JSON.stringify({
            name: props.squad.name,
            points: getSquadCost(props.squad),
            pilots: props.squad.squadPilots,
          }),
        },
      );
      const responseData = await response.json();
      if (isMounted.current) {
        if (responseData.success) {
          setSaveStatusMessage(saveStatusMessages.success);
        } else {
          setSaveStatusMessage(saveStatusMessages.error);
        }
      }
    } catch (error) {
      if (isMounted.current) {
        setSaveStatusMessage(saveStatusMessages.error);
      }
    }
  };

  const saveSquadAs = async (newSquadTitle) => {
    setSaveStatusMessage(saveStatusMessages.saving);
    setModal(null);
    try {
      // @ts-ignore
      const response = await fetch(XWING_API_ENDPOINT + "/squads", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: userContextBundle.user.token,
        },
        body: JSON.stringify({
          faction: props.squad.faction,
          name: newSquadTitle,
          points: getSquadCost(props.squad),
          pilots: props.squad.squadPilots,
        }),
      });
      const responseData = await response.json();
      if (isMounted.current) {
        if (responseData.success) {
          squadsDispatch({
            type: "savedAsNewSquad",
            squad: props.squad,
            newSquadId: responseData.savedSquad._id,
            newSquadName: newSquadTitle,
          });
          setSaveStatusMessage(saveStatusMessages.success);
        } else {
          setSaveStatusMessage(saveStatusMessages.error);
        }
      }
    } catch (error) {
      if (isMounted.current) {
        setSaveStatusMessage(saveStatusMessages.error);
      }
    }
  };

  const loadSquad = (selectedSquad) => {
    squadsDispatch({
      type: "loadedSquad",
      squad: props.squad,
      loadedSquadId: selectedSquad._id,
      loadedSquadName: selectedSquad.name,
      loadedSquadPilots: selectedSquad.pilots,
    });
    setSaveStatusMessage("");
    setModal(null);
  };

  const showSaveAsModal = () => {
    setModal({
      title: "Save squad",
      children: <SaveAsModal saveSquad={saveSquadAs} squadName={props.squad.name} />,
    });
  };

  const showLoadModal = () => {
    setModal({
      title: `Load ${props.squad.faction} squad`,
      children: <LoadModal faction={props.squad.faction} loadSquad={loadSquad} />,
    });
  };

  const createNewSquad = () => {
    squadsDispatch({ type: "createNewSquad", squad: props.squad });
    setSaveStatusMessage("");
    setModal(null);
  };

  const showNewSquadConfirmModal = () => {
    setModal({
      title: `Create new squad?`,
      children: <NewSquadConfirmModal cancel={() => setModal(null)} createNewSquad={createNewSquad} />,
    });
  };

  return (
    <div className="squad-save-import-row">
      {userContextBundle?.user && (
        <button className="btn-primary" onClick={saveClicked}>
          <i className="fa-solid fa-save" style={{ marginRight: "5px" }}></i>
          Save
        </button>
      )}
      {userContextBundle?.user && (
        <button className="btn-primary" onClick={showSaveAsModal}>
          <i className="fa-solid fa-file" style={{ marginRight: "5px" }}></i>
          Save As
        </button>
      )}
      {userContextBundle?.user && (
        <button className="btn-info" onClick={showLoadModal}>
          Load Squad
        </button>
      )}
      <button className="btn-danger" style={{ margin: "5px" }} onClick={showNewSquadConfirmModal}>
        New Squad
      </button>
      {userContextBundle?.user && (
        <span style={{ visibility: saveStatusMessage ? "visible" : "hidden" }}>{saveStatusMessage}</span>
      )}
    </div>
  );
};

export default SquadManagementBarCpt;
