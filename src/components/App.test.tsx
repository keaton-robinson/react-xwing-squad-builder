/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import { expect, jest, describe } from "@jest/globals";
import "@testing-library/jest-dom";
import App from "./App";
import React from "react";
import FactionSelector from "./FactionSelector";
import ModalProvider from "../contexts/ModalContext";
import { UserProvider } from "../contexts/UserContext";
import { SquadsProvider } from "../contexts/SquadContext";

// Mocking contexts and components
jest.mock("../contexts/ModalContext", () => ({
  __esModule: true,
  default: jest.fn(({ children }) => <div data-testid="modal-provider">{children}</div>),
}));
jest.mock("../contexts/UserContext", () => ({
  UserProvider: jest.fn(({ children }) => <div data-testid="user-provider">{children}</div>),
}));
jest.mock("../contexts/SquadContext", () => ({
  SquadsProvider: jest.fn(({ children }) => <div data-testid="squads-provider">{children}</div>),
}));
jest.mock("./FactionSelector", () => jest.fn(() => <div data-testid="faction-selector" />));

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render faction selector", () => {
    render(<App />);
    expect(FactionSelector).toHaveBeenCalled();
  });

  it("should render modal provider", () => {
    render(<App />);
    expect(ModalProvider).toHaveBeenCalled();
  });

  it("should render user provider", () => {
    render(<App />);
    expect(UserProvider).toHaveBeenCalled();
  });

  it("should render squads provider", () => {
    render(<App />);
    expect(SquadsProvider).toHaveBeenCalled();
  });
});
