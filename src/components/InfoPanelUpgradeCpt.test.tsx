/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import InfoPanelUpgradeCpt from "./InfoPanelUpgradeCpt";
import ActionsCpt from "./ActionsCpt";
import StatBlockCpt from "./StatBlockCpt";
import { Upgrade } from "../data/xwing_types";
import { fixIcons } from "../data/xwing_utils";

jest.mock("../data/xwing_utils", () => {
  return {
    fixIcons: (text: string) => {
      return text;
    },
  };
});
jest.mock("./StatBlockCpt");
jest.mock("./ActionsCpt");
jest.mock("../data/xwing_data", () => {
  return {
    upgradeRules: { "Test Upgrade": { displayName: "Test Upgrade", text: "This is a test upgrade" } },
  };
});
jest.mock("../data/xwing_utils");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("InfoPanelUpgradeCpt", () => {
  const testUpgrade: Upgrade = {
    name: "Test Upgrade",
    id: 1,
    slot: "Missile",
  };

  describe("renders upgrade name", () => {
    it("without unique upgrade", () => {
      render(<InfoPanelUpgradeCpt upgrade={testUpgrade} />);
      expect(screen.getByText(testUpgrade.name)).toBeInTheDocument();
    });
    it("with unique upgrade", () => {
      const testUpgradeWithUnique: Upgrade = {
        ...testUpgrade,
        unique: true,
      };
      render(<InfoPanelUpgradeCpt upgrade={testUpgradeWithUnique} />);
      expect(screen.getByText(`${testUpgrade.name} *`)).toBeInTheDocument();
    });
    it("with max_per_squad upgrade", () => {
      const testUpgradeMaxPerSquad: Upgrade = {
        ...testUpgrade,
        max_per_squad: 2,
      };
      render(<InfoPanelUpgradeCpt upgrade={testUpgradeMaxPerSquad} />);
      expect(screen.getByText(`${testUpgrade.name} (Up to 2)`)).toBeInTheDocument();
    });
  });
  it("renders stat block for upgrade", () => {
    render(<InfoPanelUpgradeCpt upgrade={testUpgrade} />);
    expect(mocked(StatBlockCpt)).toHaveBeenCalledWith({ baseStats: testUpgrade }, expect.anything());
  });
  describe("renders range", () => {
    it("without range bonus", () => {
      const upgradeWithRange: Upgrade = {
        ...testUpgrade,
        range: "2-3",
      };
      render(<InfoPanelUpgradeCpt upgrade={upgradeWithRange} />);
      expect(screen.getByText(/range/i)).toBeInTheDocument();
      expect(screen.getByText("2-3")).toBeInTheDocument();
      expect(screen.queryByTitle("range bonus")).not.toBeInTheDocument();
    });
    it("with range bonus", () => {
      const upgradeWithRangeAndBonus: Upgrade = {
        ...testUpgrade,
        range: "2-3",
        rangebonus: true,
      };
      render(<InfoPanelUpgradeCpt upgrade={upgradeWithRangeAndBonus} />);
      expect(screen.getByText(/range/i)).toBeInTheDocument();
      expect(screen.getByText("2-3")).toBeInTheDocument();
      expect(screen.queryByTitle("range bonus")).toBeInTheDocument();
    });
  });
  describe("restrictions", () => {
    it("doesn't render restrictions when there are none", () => {
      render(<InfoPanelUpgradeCpt upgrade={testUpgrade} />);
      expect(screen.queryByText(/restrictions/i)).not.toBeInTheDocument();
    });
    describe("faction", () => {
      it("renders faction restriction for single faction", () => {
        const upgradeWithSingleFactionRestriction: Upgrade = {
          ...testUpgrade,
          faction: "Galactic Empire",
        };
        render(<InfoPanelUpgradeCpt upgrade={upgradeWithSingleFactionRestriction} />);
        expect(screen.getByText(/restriction/i)).toBeInTheDocument();
        expect(screen.getByText("Galactic Empire")).toBeInTheDocument();
        expect(screen.queryByText(/Rebel Alliance/i)).not.toBeInTheDocument();
      });
      it("renders faction restriction for multi faction", () => {
        const upgradeWithSingleFactionRestriction: Upgrade = {
          ...testUpgrade,
          faction: ["Galactic Empire", "First Order"],
        };
        render(<InfoPanelUpgradeCpt upgrade={upgradeWithSingleFactionRestriction} />);
        expect(screen.getByText(/restriction/i)).toBeInTheDocument();
        expect(screen.getByText(/Galactic Empire/i)).toBeInTheDocument();
        expect(screen.getByText(/First Order/i)).toBeInTheDocument();
        expect(screen.queryByText(/Rebel Alliance/i)).not.toBeInTheDocument();
      });
      it("renders faction restriction and orUnique", () => {
        const upgradeWithOrUnique: Upgrade = {
          ...testUpgrade,
          faction: ["Scum and Villainy", "Rebel Alliance"],
          restrictions: [
            ["orUnique", "Ezra Bridger"],
            ["Faction", "Scum and Villainy"],
          ],
        };
        render(<InfoPanelUpgradeCpt upgrade={upgradeWithOrUnique} />);
        expect(screen.getByText(/restriction/i)).toBeInTheDocument();
        expect(screen.getByText(/Scum and Villainy or squad containing Ezra Bridger/i)).toBeInTheDocument();
        expect(screen.queryByText(/Rebel Alliance/i)).not.toBeInTheDocument();
      });
    });
    it("should show ship restrictions", () => {
      const upgradeWithShipRestriction: Upgrade = {
        ...testUpgrade,
        ship: "X-Wing",
      };

      render(<InfoPanelUpgradeCpt upgrade={upgradeWithShipRestriction} />);
      expect(screen.getByText(/restriction/i)).toBeInTheDocument();
      expect(screen.getByText("X-Wing")).toBeInTheDocument();
    });
    describe("renderRestrictions", () => {
      it("renders 'Base' restriction for standard ship", () => {
        const upgradeWithBaseStandard: Upgrade = {
          ...testUpgrade,
          restrictions: [["Base", "Standard"]],
        };

        render(<InfoPanelUpgradeCpt upgrade={upgradeWithBaseStandard} />);
        expect(screen.getByText(/restriction/i)).toBeInTheDocument();
        expect(screen.getByText("Non-huge ship")).toBeInTheDocument();
      });

      it("renders 'Base' restriction for specific ship type", () => {
        const upgradeWithBaseSpecificShip: Upgrade = {
          ...testUpgrade,
          restrictions: [["Base", "Large"]],
        };

        render(<InfoPanelUpgradeCpt upgrade={upgradeWithBaseSpecificShip} />);
        expect(screen.getByText(/restriction/i)).toBeInTheDocument();
        expect(screen.getByText("Large ship")).toBeInTheDocument();
      });

      it("renders 'Slot' restriction for extra slot", () => {
        const upgradeWithExtraSlot: Upgrade = {
          ...testUpgrade,
          restrictions: [["Slot", "Crew"]],
        };

        render(<InfoPanelUpgradeCpt upgrade={upgradeWithExtraSlot} />);
        expect(screen.getByText(/restriction/i)).toBeInTheDocument();
        expect(screen.getByText("Extra Crew slot")).toBeInTheDocument();
      });

      it("renders 'AttackArc' restriction for rear arc", () => {
        const upgradeWithRearArc: Upgrade = {
          ...testUpgrade,
          restrictions: [["AttackArc", "Rear Arc"]],
        };

        render(<InfoPanelUpgradeCpt upgrade={upgradeWithRearArc} />);
        expect(screen.getByText(/restriction/i)).toBeInTheDocument();
        expect(screen.getByText("Rear firing arc required")).toBeInTheDocument();
      });

      it("renders 'Keyword' restriction", () => {
        const upgradeWithKeyword: Upgrade = {
          ...testUpgrade,
          restrictions: [["Keyword", "Cloak"]],
        };

        render(<InfoPanelUpgradeCpt upgrade={upgradeWithKeyword} />);
        expect(screen.getByText(/restriction/i)).toBeInTheDocument();
        expect(screen.getByText("Cloak")).toBeInTheDocument();
      });

      it("renders 'isUnique' restriction for unique pilot", () => {
        const upgradeForUniquePilot: Upgrade = {
          ...testUpgrade,
          restrictions: [["isUnique", true]],
        };

        render(<InfoPanelUpgradeCpt upgrade={upgradeForUniquePilot} />);
        expect(screen.getByText(/restriction/i)).toBeInTheDocument();
        expect(screen.getByText("Unique pilot")).toBeInTheDocument();
      });

      it("renders 'isUnique' restriction for generic pilot", () => {
        const upgradeForGenericPilot: Upgrade = {
          ...testUpgrade,
          restrictions: [["isUnique", false]],
        };

        render(<InfoPanelUpgradeCpt upgrade={upgradeForGenericPilot} />);
        expect(screen.getByText(/restriction/i)).toBeInTheDocument();
        expect(screen.getByText("Generic pilot")).toBeInTheDocument();
      });

      it("renders 'Equipped' restriction", () => {
        const upgradeWithEquipped: Upgrade = {
          ...testUpgrade,
          restrictions: [["Equipped", "Missiles"]],
        };

        render(<InfoPanelUpgradeCpt upgrade={upgradeWithEquipped} />);
        expect(screen.getByText(/restriction/i)).toBeInTheDocument();
        expect(screen.getByText("Missiles equipped")).toBeInTheDocument();
      });

      it("renders 'ShieldsGreaterThan' restriction", () => {
        const upgradeWithShieldsGreaterThan: Upgrade = {
          ...testUpgrade,
          restrictions: [["ShieldsGreaterThan", 3]],
        };

        render(<InfoPanelUpgradeCpt upgrade={upgradeWithShieldsGreaterThan} />);
        expect(screen.getByText(/restriction/i)).toBeInTheDocument();
        expect(screen.getByText("Shields greater than 3")).toBeInTheDocument();
      });

      it("renders 'InitiativeGreaterThan' restriction", () => {
        const upgradeWithInitiativeGreaterThan: Upgrade = {
          ...testUpgrade,
          restrictions: [["InitiativeGreaterThan", 4]],
        };

        render(<InfoPanelUpgradeCpt upgrade={upgradeWithInitiativeGreaterThan} />);
        expect(screen.getByText(/restriction/i)).toBeInTheDocument();
        expect(screen.getByText("Initiative greater than 4")).toBeInTheDocument();
      });

      it("renders 'InitiativeLessThan' restriction", () => {
        const upgradeWithInitiativeLessThan: Upgrade = {
          ...testUpgrade,
          restrictions: [["InitiativeLessThan", 2]],
        };

        render(<InfoPanelUpgradeCpt upgrade={upgradeWithInitiativeLessThan} />);
        expect(screen.getByText(/restriction/i)).toBeInTheDocument();
        expect(screen.getByText("Initiative less than 2")).toBeInTheDocument();
      });

      it("renders 'EnergyGreaterThan' restriction", () => {
        const upgradeWithEnergyGreaterThan: Upgrade = {
          ...testUpgrade,
          restrictions: [["EnergyGreaterThan", 6]],
        };

        render(<InfoPanelUpgradeCpt upgrade={upgradeWithEnergyGreaterThan} />);
        expect(screen.getByText(/restriction/i)).toBeInTheDocument();
        expect(screen.getByText("Energy greater than 6")).toBeInTheDocument();
      });

      it("renders 'AgilityEquals' restriction", () => {
        const upgradeWithAgilityEquals: Upgrade = {
          ...testUpgrade,
          restrictions: [["AgilityEquals", 3]],
        };

        render(<InfoPanelUpgradeCpt upgrade={upgradeWithAgilityEquals} />);
        expect(screen.getByText(/restriction/i)).toBeInTheDocument();
        expect(screen.getByText("Agility 3 ship")).toBeInTheDocument();
      });

      it("renders 'Action' restriction", () => {
        const upgradeWithAction: Upgrade = {
          ...testUpgrade,
          restrictions: [["Action", "Evade"]],
        };

        render(<InfoPanelUpgradeCpt upgrade={upgradeWithAction} />);
        expect(screen.getByText(/restriction/i)).toBeInTheDocument();
        expect(mocked(ActionsCpt)).toHaveBeenCalledWith({ actions: ["Evade"] }, expect.anything());
      });
    });
  });
  describe("renderRules", () => {
    it("renders nothing when no modifiers, addons, or removals", () => {
      const upgradeWithNoRules: Upgrade = {
        ...testUpgrade,
        modifier_func: undefined,
        confersAddons: [],
        unequips_upgrades: [],
      };

      render(<InfoPanelUpgradeCpt upgrade={upgradeWithNoRules} />);

      expect(screen.queryByText(/adds:/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/adds actions:/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/removes:/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/info-text/i)).not.toBeInTheDocument();
    });

    it("renders added stats and removed upgrades correctly", () => {
      const upgradeWithModifiersAndRemovals: Upgrade = {
        ...testUpgrade,
        modifier_func: (statchange) => {
          statchange.attack = 1;
          statchange.shields = -1;
          statchange.actions = ["Focus", "Evade"];
        },
        unequips_upgrades: ["mod", "upgrade"],
      };

      render(<InfoPanelUpgradeCpt upgrade={upgradeWithModifiersAndRemovals} />);

      expect(screen.getByText(/adds:/i)).toBeInTheDocument();
      expect(screen.getByText(/removes:/i)).toBeInTheDocument();
      expect(screen.getByText(/adds actions:/i)).toBeInTheDocument();
      expect(screen.getByText(/%FRONTARC% \(1\)/i)).toBeInTheDocument();
      expect(screen.getByText(/%SHIELD% \(-1\)/i)).toBeInTheDocument();
      expect(screen.getByText(/%MOD%/i)).toBeInTheDocument();
      expect(screen.getByText(/%UPGRADE%/i)).toBeInTheDocument();
    });

    it("renders info text from upgradeRules", () => {
      const upgradeWithInfoText: Upgrade = {
        ...testUpgrade,
        name: "Test Upgrade",
      };

      render(<InfoPanelUpgradeCpt upgrade={upgradeWithInfoText} />);

      expect(screen.getByText("This is a test upgrade")).toBeInTheDocument();
    });

    it("renders addon ", () => {
      const upgradeWithAddons: Upgrade = {
        ...testUpgrade,
        confersAddons: [
          {
            type: "Upgrade",
            slot: "Device",
          },
        ],
      };

      render(<InfoPanelUpgradeCpt upgrade={upgradeWithAddons} />);

      expect(screen.getByText("Adds:")).toBeInTheDocument();
      expect(screen.getByText(/%DEVICE%/i)).toBeInTheDocument();
    });

    it("handles various modifier_func changes correctly", () => {
      const upgradeWithModifiers: Upgrade = {
        ...testUpgrade,
        modifier_func: (statchange) => {
          statchange.attack = 2;
          statchange.hull = -1;
          statchange.actions = ["Focus"];
        },
      };

      render(<InfoPanelUpgradeCpt upgrade={upgradeWithModifiers} />);

      expect(screen.getByText(/%FRONTARC% \(2\)/i)).toBeInTheDocument();
      expect(screen.getByText(/%HULL% \(-1\)/i)).toBeInTheDocument();
      expect(screen.getByText(/adds actions:/i)).toBeInTheDocument();
      // expect(screen.getByText(/Focus/i)).toBeInTheDocument();
      expect(mocked(ActionsCpt)).toHaveBeenCalledWith({ actions: ["Focus"] }, expect.anything());
    });

    it("renders nothing when upgrade object is empty", () => {
      const emptyUpgrade: Upgrade = {
        id: 1,
        name: "Test Upgrade",
        ship: "xwing",
        modifier_func: undefined,
        slot: "Missile",
      };

      render(<InfoPanelUpgradeCpt upgrade={emptyUpgrade} />);

      expect(screen.queryByText(/adds:/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/adds actions:/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/removes:/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/info-text/i)).not.toBeInTheDocument();
    });
  });
});
