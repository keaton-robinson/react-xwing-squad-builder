import {
  Ship,
  Pilot,
  Upgrade,
  SelectedPilot,
  ShipBaseSize,
} from "./xwing_types";
import {
  isNotNullOrUndefined,
  getShipBaseSize,
  getUpgradeCost,
  getPilotCost,
  getSquadCost,
  getPilotEffectiveStats,
} from "./xwing_utils";

describe("isNotNullOrUndefined", () => {
  it.each([
    [null, false],
    [undefined, false],
    [0, true],
    [1, true],
    ["", true],
    [false, true],
  ])("when input is `%s`, expect `%s`", (input, expected) => {
    expect(isNotNullOrUndefined(input)).toBe(expected);
  });
});

describe("getShipBaseSize", () => {
  const hugeShip: Partial<Ship> = { huge: true, large: false, medium: false };
  const largeShip: Partial<Ship> = { huge: false, large: true, medium: false };
  const mediumShip: Partial<Ship> = { huge: false, large: false, medium: true };
  const smallShip: Partial<Ship> = { huge: false, large: false, medium: false };
  const dumbShipWithHugeAndLargeMarkedTrue: Partial<Ship> = {
    huge: true,
    large: true,
    medium: false,
  };

  it.each<[Partial<Ship>, ShipBaseSize]>([
    [hugeShip, "Huge"],
    [largeShip, "Large"],
    [mediumShip, "Medium"],
    [smallShip, "Small"],
    [dumbShipWithHugeAndLargeMarkedTrue, "Huge"],
  ])("when ship is `%s`, expect `%s`", (ship, expectedResult) => {
    expect(getShipBaseSize(ship as Ship)).toBe(expectedResult);
  });
});

describe("getUpgradeCost", () => {
  it("when no point cost or points array, throws exception", () => {
    const upgradeWithNoPointCostAtAll = {
      points: undefined,
      pointsarray: undefined,
    };

    expect(() =>
      getUpgradeCost(upgradeWithNoPointCostAtAll as Upgrade, null),
    ).toThrow("Error calculating points on upgrade");
  });
  it("when static point cost defined, returns static point cost", () => {
    const upgradeWithStaticPointCost = { points: 8 };
    const expectedReturnValue = 8;

    expect(getUpgradeCost(upgradeWithStaticPointCost as Upgrade, null)).toBe(
      expectedReturnValue,
    );
  });
  describe("variable point cost based on pilot skill", () => {
    const upgradeWithVariableInitPoints = {
      variableinit: !0,
      pointsarray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
    const pilotWithSkill0: Partial<Pilot> = { skill: 0 };
    const pilotWithSkill1: Partial<Pilot> = { skill: 1 };
    const pilotWithSkill6: Partial<Pilot> = { skill: 6 };
    const pilotWithSkillTen: Partial<Pilot> = { skill: 10 };

    it.each<[Partial<Pilot>, number]>([
      [pilotWithSkill0, 0],
      [pilotWithSkill1, 1],
      [pilotWithSkill6, 6],
      [pilotWithSkillTen, 10],
    ])(
      "when pilot is %s, return point cost from index %s",
      (pilot, returnValue) => {
        expect(
          getUpgradeCost(
            upgradeWithVariableInitPoints as Upgrade,
            pilot as SelectedPilot,
          ),
        ).toBe(returnValue);
      },
    );
  });
  describe("variable point cost based on ship base size", () => {
    const upgradeWithVariableBasePoints = {
      variablebase: true,
      // Example point values for each base size

      pointsarray: [4, 6, 8, 10],
    };
    const pilotWithHugeShip = { pilotShip: { huge: true } };
    const pilotWithLargeShip = { pilotShip: { large: true } };
    const pilotWithMediumShip = { pilotShip: { medium: true } };
    const pilotWithSmallShip = { pilotShip: {} }; // Assuming small as default

    it.each([
      [pilotWithHugeShip, 10],
      [pilotWithLargeShip, 8],
      [pilotWithMediumShip, 6],
      [pilotWithSmallShip, 4],
    ])(
      "when pilot has %s ship, returns point cost %s",
      (pilot, returnValue) => {
        expect(
          getUpgradeCost(
            upgradeWithVariableBasePoints as Upgrade,
            pilot as SelectedPilot,
          ),
        ).toBe(returnValue);
      },
    );
  });

  describe("variable point cost based on agility", () => {
    const upgradeWithVariableAgilityPoints = {
      variableagility: true,
      pointsarray: [3, 5, 6, 9], // Example point values for each agility level
    };
    const pilotWithAgility0 = { pilotShip: { agility: 0 } };
    const pilotWithAgility1 = { pilotShip: { agility: 1 } };
    const pilotWithAgility2 = { pilotShip: { agility: 2 } };
    const pilotWithAgility3 = { pilotShip: { agility: 3 } };

    it.each([
      [pilotWithAgility0, 3],
      [pilotWithAgility1, 5],
      [pilotWithAgility2, 6],
      [pilotWithAgility3, 9],
    ])(
      "when pilot's ship has agility %s, returns point cost %s",
      (pilot, returnValue) => {
        expect(
          getUpgradeCost(
            upgradeWithVariableAgilityPoints as Upgrade,
            pilot as SelectedPilot,
          ),
        ).toBe(returnValue);
      },
    );
  });
});

describe("getPilotCost", () => {
  const stubUpgradesData = [
    { id: 1, points: 10 },
    { id: 2, points: 15 },
  ];

  it("throws exception for invalid upgrade IDs", () => {
    const pilotWithInvalidUpgrade = {
      points: 100,
      selectedUpgrades: [{ selectedUpgradeId: 99 }],
    }; // 99 is an invalid ID
    expect(() =>
      getPilotCost(
        pilotWithInvalidUpgrade as SelectedPilot,
        stubUpgradesData as Upgrade[],
      ),
    ).toThrow("Invalid upgrade");
  });

  it.each([
    [
      "with no upgrades returns just pilot cost",
      { points: 100, selectedUpgrades: [] },
      100,
    ],
    [
      "with one upgrade, sums pilot cost with upgrade cost",
      { points: 100, selectedUpgrades: [{ selectedUpgradeId: 1 }] },
      110,
    ],
    [
      "with two upgrades, sums pilot with cost of both upgrades",
      {
        points: 100,
        selectedUpgrades: [{ selectedUpgradeId: 1 }, { selectedUpgradeId: 2 }],
      },
      125,
    ],
    [
      "with null selectedUpgradeId, returns pilot cost alone",
      { points: 100, selectedUpgrades: [{ selectedUpgradeId: null }] },
      100,
    ],
    [
      "with undefined selectedUpgradeId, returns pilot cost alone",
      { points: 100, selectedUpgrades: [{ selectedUpgradeId: undefined }] },
      100,
    ],
  ])("%s", (description, pilot, expectedCost) => {
    const cost = getPilotCost(
      pilot as SelectedPilot,
      stubUpgradesData as Upgrade[],
    );
    expect(cost).toBe(expectedCost);
  });
});

describe("getSquadCost", () => {
  const emptyDummyUpgradeData = [];
  const fiftyPointPilot = { points: 50, selectedUpgrades: [] } as SelectedPilot;
  const fortyFivePointPilot = {
    points: 45,
    selectedUpgrades: [],
  } as SelectedPilot;

  it.each([
    ["empty squad costs zero", [], 0],
    ["one 50 point pilot costs 50", [fiftyPointPilot], 50],
    [
      "50 point pilot + 45 point pilot costs 95",
      [fiftyPointPilot, fortyFivePointPilot],
      95,
    ],
    // Add more test cases here if needed
  ])("%s", (testName, squad, expectedCost) => {
    const cost = getSquadCost(squad, emptyDummyUpgradeData);
    expect(cost).toBe(expectedCost);
  });
});

describe("getPilotEffectiveStats", () => {
  const stubUpgradesData = [
    {
      id: 1,
      modifier_func: (pilotShip) => {
        pilotShip.shields = pilotShip.shields + 1;
      },
    }, // upgrade with modifier function  (basically shield upgrade card)
    { id: 2 }, // no modifier function in this upgrade
  ];

  it("throws an error if no pilot is provided", () => {
    expect(() =>
      getPilotEffectiveStats(null, stubUpgradesData as Upgrade[]),
    ).toThrow("pilot required for getPilotEffectiveStats");
  });

  it("throws an error if upgrade data is missing for an upgrade ID", () => {
    const pilotWithInvalidUpgrade = {
      selectedUpgrades: [{ selectedUpgradeId: 99 }],
    };
    expect(() =>
      getPilotEffectiveStats(
        pilotWithInvalidUpgrade as SelectedPilot,
        stubUpgradesData as Upgrade[],
      ),
    ).toThrow("Failed to find upgrade record for upgrade record id: 99");
  });

  it("with upgrade that modifies pilot ship, applies modifications to pilot ship", () => {
    const initialShieldValue = 2;
    const pilot: Partial<SelectedPilot> = {
      selectedUpgrades: [{ selectedUpgradeId: 1, key: null, slot: null }],
      pilotShip: {
        agility: 2,
        name: "",
        xws: "",
        factions: [],
        hull: 0,
        shields: initialShieldValue,
        actions: [],
        maneuvers: [],
      },
    };
    const expectedModifiedShieldValue = 3;

    const result = getPilotEffectiveStats(
      pilot as SelectedPilot,
      stubUpgradesData as Upgrade[],
    );

    expect(result.pilotShip.shields).toBe(expectedModifiedShieldValue);
  });

  it("with upgrade that does not modify pilot ship, does not make modifications to pilot ship", () => {
    const initialShieldValue = 2;
    const pilot: Partial<SelectedPilot> = {
      selectedUpgrades: [{ selectedUpgradeId: 2, key: null, slot: null }],
      pilotShip: {
        agility: 2,
        name: "",
        xws: "",
        factions: [],
        hull: 0,
        shields: initialShieldValue,
        actions: [],
        maneuvers: [],
      },
    };

    const result = getPilotEffectiveStats(
      pilot as SelectedPilot,
      stubUpgradesData as Upgrade[],
    );

    expect(JSON.stringify(pilot)).toBe(JSON.stringify(result));
  });
});

// TODO: Could add more unit tests, but I think I've done enough for learning purposes for the moment.
