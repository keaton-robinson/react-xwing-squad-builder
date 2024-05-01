import React from "react";

interface NewSquadConfirmModalProps {
  cancel: () => any;
  createNewSquad: () => any;
}

const NewSquadConfirmModal: React.FC<NewSquadConfirmModalProps> = (props) => {
  return (
    <div>
      <div>Are you sure you want to create a new squad? Your current ships will be removed.</div>
      <hr />
      <div style={{ textAlign: "right" }}>
        <button className="btn-primary" onClick={props.cancel}>
          Cancel
        </button>
        <button className="btn-danger" onClick={props.createNewSquad}>
          Make New Squad
        </button>
      </div>
    </div>
  );
};

export default NewSquadConfirmModal;
