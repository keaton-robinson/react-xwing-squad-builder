import React, { ReactElement } from "react";

interface ModalContainerProps {
  handleClose: () => void;
  headerTitle: string;
  children: ReactElement;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  handleClose,
  headerTitle,
  children,
}) => {
  const modalContentClicked = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="modal">
      <section className="modal-main" onClick={modalContentClicked}>
        <div className="modal-header-container">
          <div className="modal-header-content">{headerTitle}</div>
          <div className="modal-close" onClick={handleClose}>
            &times;
          </div>
        </div>
        <hr />
        <div className="modal-children">{children}</div>
      </section>
    </div>
  );
};

export default ModalContainer;
