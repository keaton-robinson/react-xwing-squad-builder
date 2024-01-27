/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SquadBuilderCpt from './SquadBuilderCpt';



test('with default parameters, renders add ship drop down', () => {
  render(<SquadBuilderCpt selectedFaction={'Rebel Alliance'} faction={'Rebel Alliance'} setModal={function (modalConfig: any): void {
      throw new Error('Function not implemented.');
  } } />);
  const newShipElement = screen.getByText(/Add a ship/i);
  expect(newShipElement).toBeInTheDocument();
});

test('after removing prerequsite upgrade, automatically removes upgrade that depended upon it', async () => {
  const { container } =  render(<SquadBuilderCpt selectedFaction={'Rebel Alliance'} faction={'Rebel Alliance'} setModal={function (modalConfig: any): void {
      throw new Error('Function not implemented.');
  } } />);
  const newShipElement = screen.getByText(/Add a ship/i);
  await userEvent.click(newShipElement);
  const VCXElement = screen.getByText(/VCX-100/i);
  await userEvent.click(VCXElement)
  const gunnerUpgradeSlot = container.querySelector('[data-upgrade-slot="Gunner1"]');
  // @ts-ignore
  await userEvent.click(within(gunnerUpgradeSlot).getByText(/No Gunner Upgrade/i));
  const ezraGunner = screen.getByText(/Ezra Bridger/i);
  await userEvent.click(ezraGunner);
  let crewUpgradeSlot = container.querySelector('[data-upgrade-slot="Crew1"]');
  // @ts-ignore
  await userEvent.click(within(crewUpgradeSlot).getByText(/No Crew Upgrade/i));
  const maulCrew = screen.getByText(/Maul/i);
  await userEvent.click(maulCrew);
  
  let elements = container.querySelectorAll('.dd-header-title');
  let maulElement = Array.from(elements).find(el => el.textContent === "Maul (10)");

  if (!maulElement) {
      // Handle the case where the element is not found
      throw new Error('Element with the class "dd-header-title" and text "Maul (10)" not found after selecting Maul');
  }
  // @ts-ignore
  await userEvent.click(within(container.querySelector('[data-upgrade-slot="Gunner1"]')).getByText(/Ezra Bridger/i))
  await userEvent.click(screen.getByText(/No Gunner Upgrade/i));

  // @ts-ignore
  const noCrew = within(crewUpgradeSlot).getByText(/No Crew Upgrade/i);
  expect(noCrew).toBeInTheDocument();

  elements = container.querySelectorAll('.dd-header-title');
  maulElement = Array.from(elements).find(el => el.textContent === "Maul (10)");

  expect(maulElement).toBeUndefined();
});

