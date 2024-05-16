import React from "react";
import FactionSelector from "./FactionSelector";
import ModalProvider from "../contexts/ModalContext";
import { UserProvider } from "../contexts/UserContext";
import { SquadsProvider } from "../contexts/SquadContext";
import { XwingDataProvider } from "../contexts/XWingDataContext";

const App: React.FC = () => {
  return (
    <XwingDataProvider>
      <UserProvider>
        <ModalProvider>
          <SquadsProvider>
            <FactionSelector />
          </SquadsProvider>
        </ModalProvider>
      </UserProvider>
    </XwingDataProvider>
  );
};

export default App;
