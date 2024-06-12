/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InfoPanelCpt from "./InfoPanelCpt";
import { InfoPanelCard, Ship, SquadPilot } from "../data/xwing_types";

// Mock the child components
jest.mock("./InfoPanelShipCpt", () => jest.fn(() => <div>Ship Component</div>));
jest.mock("./InfoPanelUpgradeCpt", () => jest.fn(() => <div>Upgrade Component</div>));
jest.mock("./InfoPanelPilotCpt", () => jest.fn(() => <div>Pilot Component</div>));

describe("InfoPanelCpt", () => {
  const xwing: Ship = {
    name: "xwing",
    factions: ["Rebel Alliance"],
    agility: 2,
    hull: 4,
    shields: 2,
    actions: [],
    maneuvers: [],
  };
  const shipCard: InfoPanelCard = {
    type: "Ship",
    cardData: xwing,
    faction: "Rebel Alliance",
  };

  const upgradeCard: InfoPanelCard = {
    type: "Upgrade",
    cardData: { id: 2, name: "Proton Torpedoes", slot: "torpedo" },
  };
  const Luke: SquadPilot = {
    pilotName: "Luke Skywalker",
    pilotId: 234324,
    faction: "Rebel Alliance",
    ship: "xwing",
    skill: 5,
    points: 55,
    slots: [],
    squadPilotId: undefined,
    upgrades: [],
    shipCanonicalName: "",
    ship_keyword: [],
    pilotKeyword: [],
    pilotCanonicalName: "",
    factions: [],
    agility: 0,
    hull: 0,
    shields: 0,
    actions: [],
    maneuvers: [],
  };
  const pilotCard: InfoPanelCard = {
    type: "Pilot",
    cardData: Luke,
  };

  test('renders InfoPanelShipCpt when card type is "Ship"', () => {
    render(<InfoPanelCpt card={shipCard} />);
    expect(screen.getByText("Ship Component")).toBeInTheDocument();
  });

  test('renders InfoPanelUpgradeCpt when card type is "Upgrade"', () => {
    render(<InfoPanelCpt card={upgradeCard} />);
    expect(screen.getByText("Upgrade Component")).toBeInTheDocument();
  });

  test('renders InfoPanelPilotCpt when card type is "Pilot"', () => {
    render(<InfoPanelCpt card={pilotCard} />);
    expect(screen.getByText("Pilot Component")).toBeInTheDocument();
  });
});
