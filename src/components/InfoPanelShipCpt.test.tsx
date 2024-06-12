/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InfoPanelShipCpt from "./InfoPanelShipCpt";
import ActionsCpt from "./ActionsCpt";
import ManeuversCpt from "./ManeuversCpt";
import StatBlockCpt from "./StatBlockCpt";
import UpgradesCpt from "./UpgradesCpt";
import { pilots } from "../data/xwing_data";
import { getShipBaseSize } from "../data/xwing_utils";
import { Faction, Ship, Pilot } from "../data/xwing_types";

// Mock the child components
jest.mock("./ActionsCpt", () => jest.fn(() => <div>Actions Component</div>));
jest.mock("./ManeuversCpt", () => jest.fn(() => <div>Maneuvers Component</div>));
jest.mock("./StatBlockCpt", () => jest.fn(() => <div>StatBlock Component</div>));
jest.mock("./UpgradesCpt", () => jest.fn(() => <div>Upgrades Component</div>));

// Mock the utility functions
jest.mock("../data/xwing_utils", () => ({
  getShipBaseSize: jest.fn(),
}));

jest.mock("../data/xwing_data", () => ({
  pilots: [
    { name: "Pilot A", ship: "X-Wing", faction: "Rebel Alliance", skill: 3, points: 50, actions: [], maneuvers: {} },
    { name: "Pilot B", ship: "X-Wing", faction: "Rebel Alliance", skill: 5, points: 70, actions: [], maneuvers: {} },
  ],
}));

describe("InfoPanelShipCpt", () => {
  const ship: Ship = {
    name: "X-Wing",
    actions: [],
    maneuvers: [],
    factions: [],
    agility: 0,
    hull: 0,
    shields: 0,
  };

  const faction: Faction = "Rebel Alliance";

  beforeEach(() => {
    jest.clearAllMocks();
    (getShipBaseSize as jest.Mock).mockReturnValue("Small");
  });

  test("renders correctly with ship data", () => {
    render(<InfoPanelShipCpt ship={ship} faction={faction} />);

    expect(screen.getByText("X-Wing")).toBeInTheDocument();
    expect(screen.getByText("Ship")).toBeInTheDocument();
    expect(screen.getByText("Base:")).toBeInTheDocument();
    expect(screen.getByText("Small")).toBeInTheDocument();
    expect(screen.getByText("Initiative:")).toBeInTheDocument();
    expect(screen.getByText("3, 5")).toBeInTheDocument();
    expect(screen.getByText("Points:")).toBeInTheDocument();
    expect(screen.getByText("50 - 70")).toBeInTheDocument();
    expect(screen.getByText("Actions:")).toBeInTheDocument();
    expect(screen.getByText("Actions Component")).toBeInTheDocument();
    expect(screen.getByText("Upgrades:")).toBeInTheDocument();
    expect(screen.getByText("Upgrades Component")).toBeInTheDocument();
    expect(screen.getByText("Maneuvers Component")).toBeInTheDocument();
    expect(screen.getByText("StatBlock Component")).toBeInTheDocument();
  });

  test("passes the correct props to child components", () => {
    render(<InfoPanelShipCpt ship={ship} faction={faction} />);

    const expectedShipData = {
      ...ship,
      pilotsForShip: [
        {
          name: "Pilot A",
          ship: "X-Wing",
          faction: "Rebel Alliance",
          skill: 3,
          points: 50,
          actions: [],
          maneuvers: {},
        },
        {
          name: "Pilot B",
          ship: "X-Wing",
          faction: "Rebel Alliance",
          skill: 5,
          points: 70,
          actions: [],
          maneuvers: {},
        },
      ],
      pilotSkills: [3, 5],
      minPilotCost: 50,
      maxPilotCost: 70,
    };

    expect(StatBlockCpt).toHaveBeenCalledWith({ baseStats: expectedShipData }, {});

    expect(ActionsCpt).toHaveBeenCalledWith({ actions: expectedShipData.actions }, {});

    expect(UpgradesCpt).toHaveBeenCalledWith({ pilots: expectedShipData.pilotsForShip }, {});

    expect(ManeuversCpt).toHaveBeenCalledWith({ maneuvers: expectedShipData.maneuvers }, {});
  });
});
