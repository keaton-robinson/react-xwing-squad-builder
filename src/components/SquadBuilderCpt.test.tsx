/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SquadBuilderCpt from './SquadBuilderCpt';
import { UserProvider } from '../contexts/UserContext';
import ModalProvider from '../contexts/ModalContext';

const AllProviders = ({children}) => (
  <UserProvider>
    <ModalProvider>
      {children}
    </ModalProvider>
  </UserProvider>
)

test('with default parameters, renders add ship drop down', () => {
  render(
    <AllProviders>
      <SquadBuilderCpt selectedFaction={'Rebel Alliance'} faction={'Rebel Alliance'} 
        setModal={function (modalConfig: any): void {
          throw new Error('Function not implemented.');
      }}/>
    </AllProviders>
  );
  const newShipElement = screen.getByText(/Add a ship/i);
  expect(newShipElement).toBeInTheDocument();
});

test('after removing prerequsite upgrade, automatically removes upgrade that depended upon it', async () => {
  const { container } =  render(
    <AllProviders>
      <SquadBuilderCpt selectedFaction={'Rebel Alliance'} faction={'Rebel Alliance'} 
        setModal={function (modalConfig: any): void {
          throw new Error('Function not implemented.');
        }}
      />
    </AllProviders>
  );

  const selectUpgrade = async (key, originalText, textToSelect) => {
    const upgradeSlot = container.querySelector(`[data-upgrade-slot="${key}"]`);
    const currentMatcher = new RegExp(originalText, 'i');
    // @ts-ignore
    await userEvent.click(within(upgradeSlot).getByText(currentMatcher));
    const selectionMatcher = new RegExp(textToSelect, 'i'); // 'i' flag for case-insensitive match
    const upgradeToSelect = screen.getByText(selectionMatcher); 
    await userEvent.click(upgradeToSelect);  
  }

  const newShipElement = screen.getByText(/Add a ship/i);
  await userEvent.click(newShipElement);
  const VCXElement = screen.getByText(/VCX-100/i);
  await userEvent.click(VCXElement)

  await selectUpgrade("Gunner1", "No Gunner Upgrade", "Ezra Bridger");
  await selectUpgrade("Crew1", "No Crew Upgrade", "Maul");
  
  let elements = container.querySelectorAll('.dd-header-title');
  let maulElement = Array.from(elements).find(el => el.textContent === "Maul (10)");

  if (!maulElement) {
      // Handle the case where the element is not found
      throw new Error('Element with the class "dd-header-title" and text "Maul (10)" not found after selecting Maul');
  }

  await selectUpgrade("Gunner1", "Ezra Bridger", "No Gunner Upgrade");

  let crewUpgradeSlot = container.querySelector('[data-upgrade-slot="Crew1"]');
  // @ts-ignore
  const noCrew = within(crewUpgradeSlot).getByText(/No Crew Upgrade/i);
  expect(noCrew).toBeInTheDocument();

  elements = container.querySelectorAll('.dd-header-title');
  maulElement = Array.from(elements).find(el => el.textContent === "Maul (10)");

  expect(maulElement).toBeUndefined();
});

