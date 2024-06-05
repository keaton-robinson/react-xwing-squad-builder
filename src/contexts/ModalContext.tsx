import React, { ReactElement, useState, createContext, useContext, useCallback } from "react";
import ModalContainer from "../components/modals/ModalContainer";
import { useSquadsDispatch } from "./SquadContext";

interface ModalConfig {
  title: string;
  children: ReactElement;
}

const SetModalContext = createContext<(content: ModalConfig) => void | undefined>(undefined);

export const useModalSetter = () => {
  const context = useContext(SetModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};

const ModalProvider: React.FC<{ children }> = (props) => {
  const [modalToShow, setModalToShow] = useState<ReactElement | null>(null);
  const squadsDispatch = useSquadsDispatch();

  const setModal = useCallback(
    (modalConfig: ModalConfig) => {
      const newModalToShow = !modalConfig ? null : (
        <ModalContainer
          handleClose={() => {
            setModalToShow(null);
            squadsDispatch({ type: "clearError" });
          }}
          headerTitle={modalConfig.title}
        >
          {modalConfig.children}
        </ModalContainer>
      );

      setModalToShow(newModalToShow);
    },
    [squadsDispatch],
  );

  return (
    <SetModalContext.Provider value={setModal}>
      {props.children}
      {modalToShow}
    </SetModalContext.Provider>
  );
};

export default ModalProvider;
