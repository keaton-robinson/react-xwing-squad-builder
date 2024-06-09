/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mocked } from "jest-mock";
import FactionSelector from "./FactionSelector";
import HeaderComponent from "./HeaderComponent";
import SquadBuilderCpt from "./SquadBuilderCpt";
import { useSquads, useSquadsDispatch, factionsOrdered } from "../contexts/SquadContext";
import { useModalSetter } from "../contexts/ModalContext";
import { Squad } from "../data/xwing_types";

// Mock the child components and context hooks
jest.mock("./HeaderComponent");
jest.mock("./SquadBuilderCpt");
jest.mock("./modals/AlertModal");
jest.mock("../contexts/SquadContext", () => {
  const originalSquadContextModule = jest.requireActual("../contexts/SquadContext");

  return {
    __esModule: true,
    ...originalSquadContextModule,
    useSquads: jest.fn(),
    useSquadsDispatch: jest.fn(),
  };
});
jest.mock("../contexts/ModalContext");

const mockSquads: Squad[] = [
  { faction: "Rebel Alliance", id: "rebelSquad", name: "rebelSquad", squadPilots: [] },
  { faction: "Galactic Empire", id: "empireSquad", name: "empireSquad", squadPilots: [] },
];

const mockedUseSquads = mocked(useSquads);
const mockedUseSquadsDispatch = mocked(useSquadsDispatch);
const mockedUseModalSetter = mocked(useModalSetter);

describe("FactionSelector", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedUseSquads.mockReturnValue({ squads: mockSquads, error: null });
  });

  it("renders without crashing", () => {
    render(<FactionSelector />);
    expect(HeaderComponent).toHaveBeenCalled();
    expect(SquadBuilderCpt).toHaveBeenCalled();
  });

  it('initializes selectedFaction state to "Rebel Alliance" and passes it to header component', () => {
    render(<FactionSelector />);
    expect(HeaderComponent).toHaveBeenCalledWith(
      expect.objectContaining({ selectedFaction: "Rebel Alliance" }),
      expect.anything(),
    );
  });

  it("passes ordered factions to HeaderComponent", () => {
    render(<FactionSelector />);
    expect(HeaderComponent).toHaveBeenCalledWith(
      expect.objectContaining({ factions: factionsOrdered }),
      expect.anything(),
    );
  });

  it("render SquadBuilder for selected faction", () => {
    render(<FactionSelector />);
    expect(SquadBuilderCpt).toHaveBeenCalledWith(expect.objectContaining({ squad: mockSquads[0] }), expect.anything());
  });

  it("displays modal when there is an error", () => {
    mockedUseSquads.mockReturnValue({ squads: mockSquads, error: "Test error" });
    const setModal = jest.fn();
    mockedUseModalSetter.mockReturnValue(setModal);
    render(<FactionSelector />);
    expect(setModal).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Error",
        children: expect.anything(),
      }),
    );
  });

  it("dispatches clearError action when AlertModal OK button is pressed", () => {
    mockedUseSquads.mockReturnValue({ squads: [], error: "Test error" }); // need to look here too
    const setModal = jest.fn();
    const dispatch = jest.fn();
    mockedUseModalSetter.mockReturnValue(setModal);
    mockedUseSquadsDispatch.mockReturnValue(dispatch);
    render(<FactionSelector />);
    const alertModal = setModal.mock.calls[0][0].children;
    alertModal.props.okPressed();
    expect(dispatch).toHaveBeenCalledWith({ type: "clearError" });
  });
});
