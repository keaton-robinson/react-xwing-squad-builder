/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SquadBuilderCpt from './SquadBuilderCpt';



test('with default parameters, renders new add ship drop down', () => {
  render(<SquadBuilderCpt selectedFaction={'Rebel Alliance'} faction={'Rebel Alliance'} setModal={function (modalConfig: any): void {
      throw new Error('Function not implemented.');
  } } />);
  const newShipElement = screen.getByText(/Add a ship/i);
  expect(newShipElement).toBeInTheDocument();
});
