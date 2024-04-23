import React from 'react';
import FactionSelector from './FactionSelector';
import ModalProvider from '../contexts/ModalContext';
import { UserProvider } from '../contexts/UserContext';

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
