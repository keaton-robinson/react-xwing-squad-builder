import React, { useState } from "react";

interface SaveAsModalProps {
  squadName: string;
  saveSquad: (string) => any;
}

const SaveAsModal: React.FC<SaveAsModalProps> = (props) => {
  const [state, setState] = useState({ squadName: props.squadName });

  const squadNameChanged = (event) => {
    setState({ squadName: event.target.value });
  };

  const saveAsClicked = () => {
    props.saveSquad(state.squadName);
  };

  return (
    <div>
      <div>Save your squad?</div>
      <span>
        Squad Name: <input type="text" value={state.squadName} onChange={squadNameChanged} maxLength={30} />
      </span>
      <hr />
      <div style={{ textAlign: "right" }}>
        <button className="btn-primary" onClick={saveAsClicked}>
          <i className="fa-solid fa-save"></i> Save
        </button>
      </div>
    </div>
  );
};

export default SaveAsModal;
