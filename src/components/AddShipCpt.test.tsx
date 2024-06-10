/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Squad } from "../data/xwing_types";
import { useSquadsDispatch } from "../contexts/SquadContext";
import AddShipCpt from "./AddShipCpt";
import { ships } from "../data/xwing_data";

// Mock the useSquadsDispatch hook
jest.mock("../contexts/SquadContext", () => ({
  useSquadsDispatch: jest.fn(),
}));

jest.mock("../data/xwing_data", () => ({
  ships: {
    "X-Wing": { factions: ["Rebel Alliance"] },
    "TIE Fighter": { factions: ["Galactic Empire"] },
  },
}));

describe("AddShipCpt", () => {
  const mockDispatch = jest.fn();
  (useSquadsDispatch as jest.Mock).mockReturnValue(mockDispatch);

  const mockSquad: Squad = {
    id: "squad1",
    name: "Test Squad",
    faction: "Rebel Alliance",
    squadPilots: [],
  };

  const mockOnRecordMouseEnter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<AddShipCpt squad={mockSquad} onRecordMouseEnter={mockOnRecordMouseEnter} />);
    expect(screen.getByText("Add a ship")).toBeInTheDocument();
  });

  test("dropdown contains the correct ship options", () => {
    render(<AddShipCpt squad={mockSquad} onRecordMouseEnter={mockOnRecordMouseEnter} />);
    fireEvent.click(screen.getByText("Add a ship"));

    expect(screen.getByText("X-Wing")).toBeInTheDocument();
    expect(() => screen.getByText("TIE Fighter")).toThrow();
  });

  test("dispatches addShip action on ship selection", async () => {
    const user = userEvent.setup();
    render(<AddShipCpt squad={mockSquad} onRecordMouseEnter={mockOnRecordMouseEnter} />);
    await user.click(screen.getByText("Add a ship"));

    // Wait for the dropdown items to appear
    const xwingElement = screen.getByText("X-Wing");
    await waitFor(() => expect(xwingElement).toBeInTheDocument());
    await user.click(xwingElement);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "addShip",
      squad: mockSquad,
      newShip: "X-Wing",
    });
  });

  test("handles mouse enter event on dropdown item", async () => {
    const user = userEvent.setup();
    render(<AddShipCpt squad={mockSquad} onRecordMouseEnter={mockOnRecordMouseEnter} />);
    await user.click(screen.getByText("Add a ship"));

    // Wait for the dropdown items to appear
    const xwingElement = screen.getByText("X-Wing");
    await waitFor(() => expect(xwingElement).toBeInTheDocument());
    await user.hover(xwingElement);

    expect(mockOnRecordMouseEnter).toHaveBeenCalledWith({
      cardData: ships["X-Wing"],
      type: "Ship",
      faction: "Rebel Alliance",
    });
  });
});
