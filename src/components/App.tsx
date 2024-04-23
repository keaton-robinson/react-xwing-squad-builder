import React from 'react';
import FactionSelector from './FactionSelector';
import ModalProvider from './modals/ModalContext';
import { UserProvider } from './UserContext';
const ms = require('ms');



const App: React.FC = () => {

  return (
    <UserProvider>
      <ModalProvider>
        <FactionSelector />
      </ModalProvider>
    </UserProvider>
  );
}

export default App;
