/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InfoPanelPilotCpt from "./InfoPanelPilotCpt";
import ActionsCpt from "./ActionsCpt";
import ManeuversCpt from "./ManeuversCpt";
import StatBlockCpt from "./StatBlockCpt";
import UpgradesCpt from "./UpgradesCpt";
import { pilotRules } from "../data/xwing_data";
import { SquadPilot } from "../data/xwing_types";
import { fixIcons, getPilotEffectiveStats, getShipBaseSize } from "../data/xwing_utils";

// Mock the child components
jest.mock("./ActionsCpt", () => jest.fn(() => <div>Actions Component</div>));
jest.mock("./ManeuversCpt", () => jest.fn(() => <div>Maneuvers Component</div>));
jest.mock("./StatBlockCpt", () => jest.fn(() => <div>StatBlock Component</div>));
jest.mock("./UpgradesCpt", () => jest.fn(() => <div>Upgrades Component</div>));

// Mock the utility functions
jest.mock("../data/xwing_utils", () => ({
  fixIcons: jest.fn(),
  getPilotEffectiveStats: jest.fn(),
  getShipBaseSize: jest.fn(),
}));

describe("InfoPanelPilotCpt", () => {
  const pilot: SquadPilot = {
    pilotName: "Blue Squadron Escort",
    ship: "X-Wing",
    skill: 5,
    actions: ["Focus", "Lock"],
    upgrades: [],
    maneuvers: [
      [0, 1, 2, 2, 2, 0],
      [0, 1, 2, 2, 2, 0],
      [0, 1, 2, 2, 2, 0],
    ],
    faction: "Rebel Alliance",
    squadPilotId: undefined,
    shipCanonicalName: "",
    ship_keyword: [],
    pilotId: 0,
    pilotKeyword: [],
    pilotCanonicalName: "",
    points: 0,
    slots: [],
    factions: [],
    agility: 0,
    hull: 0,
    shields: 0,
  };

  const effectiveStats = {
    ...pilot,
    actions: ["Focus", "Lock", "Barrel Roll"],
    maneuvers: [
      [0, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 0],
    ],
    shields: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getPilotEffectiveStats as jest.Mock).mockReturnValue(effectiveStats);
    (getShipBaseSize as jest.Mock).mockReturnValue("Small");
    (fixIcons as jest.Mock).mockReturnValue("<p>Fixed Icons Text</p>");
  });

  test("renders correctly with pilot data", () => {
    render(<InfoPanelPilotCpt pilot={pilot} />);

    expect(screen.getByText("Blue Squadron Escort")).toBeInTheDocument();
    expect(screen.getByText("Pilot")).toBeInTheDocument();
    expect(screen.getByText("Ship:")).toBeInTheDocument();
    expect(screen.getByText("X-Wing")).toBeInTheDocument();
    expect(screen.getByText("Base:")).toBeInTheDocument();
    expect(screen.getByText("Small")).toBeInTheDocument();
    expect(screen.getByText("Initiative:")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Actions:")).toBeInTheDocument();
    expect(screen.getByText("Actions Component")).toBeInTheDocument();
    expect(screen.getByText("Upgrades:")).toBeInTheDocument();
    expect(screen.getByText("Upgrades Component")).toBeInTheDocument();
    expect(screen.getByText("Maneuvers Component")).toBeInTheDocument();

    const infoText = screen.getByText("Fixed Icons Text");
    expect(infoText).toBeInTheDocument();
    expect(infoText.parentElement).toHaveClass("info-text");
  });

  test("passes the correct props to child components", () => {
    render(<InfoPanelPilotCpt pilot={pilot} />);

    expect(StatBlockCpt).toHaveBeenCalledWith(
      {
        baseStats: pilot,
        statsAfterUpgrades: effectiveStats,
      },
      {},
    );

    expect(ActionsCpt).toHaveBeenCalledWith({ actions: effectiveStats.actions }, {});

    expect(UpgradesCpt).toHaveBeenCalledWith({ pilots: [effectiveStats] }, {});

    expect(ManeuversCpt).toHaveBeenCalledWith(
      {
        maneuvers: pilot.maneuvers,
        maneuversAfterUpgrades: effectiveStats.maneuvers,
      },
      {},
    );
  });
});
