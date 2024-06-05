import React from "react";
import { useModalSetter } from "../../contexts/ModalContext";

interface AlertModalProps {
  errorMessage: string;
  okPressed: () => any;
}

const AlertModal: React.FC<AlertModalProps> = (props) => {
  const setModal = useModalSetter();

  return (
    <div>
      <div>{props.errorMessage}</div>
      <hr />
      <div style={{ textAlign: "center" }}>
        <button
          className="btn-primary"
          onClick={() => {
            setModal(null);
            props.okPressed();
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
