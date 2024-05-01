import React from "react";
import FactionSelector from "./FactionSelector";
import ModalProvider from "../contexts/ModalContext";
import { UserProvider } from "../contexts/UserContext";
import { SquadsProvider } from "../contexts/SquadContext";

const App: React.FC = () => {
  return (
    <UserProvider>
      <ModalProvider>
        <SquadsProvider>
          <FactionSelector />
        </SquadsProvider>
      </ModalProvider>
    </UserProvider>
  );
};

export default App;
