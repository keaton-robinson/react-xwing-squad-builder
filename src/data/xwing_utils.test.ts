import { Ship, Pilot, Upgrade, ShipBaseSize, SquadPilot, Squad } from "./xwing_types";
import {
  isNotNullOrUndefined,
  getShipBaseSize,
  getUpgradeCost,
  getPilotCost,
  getSquadCost,
  getPilotEffectiveStats,
} from "./xwing_utils";

// TODO: could do some mocking in the getSquad and getPilotCost. It's a bit integration test-ish rather than a pure unit test

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

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

    expect(() => getUpgradeCost(upgradeWithNoPointCostAtAll as Upgrade, null)).toThrow(
      "Error calculating points on upgrade",
    );
  });
  it("when static point cost defined, returns static point cost", () => {
    const upgradeWithStaticPointCost = { points: 8 };
    const expectedReturnValue = 8;

    expect(getUpgradeCost(upgradeWithStaticPointCost as Upgrade, null)).toBe(expectedReturnValue);
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
    ])("when pilot is %s, return point cost from index %s", (pilot, returnValue) => {
      expect(getUpgradeCost(upgradeWithVariableInitPoints as Upgrade, pilot as SquadPilot)).toBe(returnValue);
    });
  });
  describe("variable point cost based on ship base size", () => {
    const upgradeWithVariableBasePoints: Partial<Upgrade> = {
      variablebase: true,
      // Example point values for each base size
      pointsarray: [4, 6, 8, 10],
    };
    const pilotWithHugeShip: Partial<SquadPilot> = { huge: true };
    const pilotWithLargeShip: Partial<SquadPilot> = { large: true };
    const pilotWithMediumShip: Partial<SquadPilot> = { medium: true };
    const pilotWithSmallShip: Partial<SquadPilot> = {}; // Assuming small as default

    it.each([
      [pilotWithHugeShip, 10],
      [pilotWithLargeShip, 8],
      [pilotWithMediumShip, 6],
      [pilotWithSmallShip, 4],
    ])("when pilot has %s ship, returns point cost %s", (squadPilotShip, returnValue) => {
      expect(getUpgradeCost(upgradeWithVariableBasePoints as Upgrade, squadPilotShip as SquadPilot)).toBe(returnValue);
    });
  });

  describe("variable point cost based on agility", () => {
    const upgradeWithVariableAgilityPoints = {
      variableagility: true,
      pointsarray: [3, 5, 6, 9], // Example point values for each agility level
    };
    const pilotWithAgility0: Partial<SquadPilot> = { agility: 0 };
    const pilotWithAgility1: Partial<SquadPilot> = { agility: 1 };
    const pilotWithAgility2: Partial<SquadPilot> = { agility: 2 };
    const pilotWithAgility3: Partial<SquadPilot> = { agility: 3 };

    it.each([
      [pilotWithAgility0, 3],
      [pilotWithAgility1, 5],
      [pilotWithAgility2, 6],
      [pilotWithAgility3, 9],
    ])("when pilot's ship has agility %s, returns point cost %s", (squadPilotShip, returnValue) => {
      expect(getUpgradeCost(upgradeWithVariableAgilityPoints as Upgrade, squadPilotShip as SquadPilot)).toBe(
        returnValue,
      );
    });
  });
});

describe("getPilotCost", () => {
  const stubUpgradesData = [
    { id: 1, points: 10 },
    { id: 2, points: 15 },
  ];

  interface GetPilotCostTestCase {
    description: string;
    testSquadPilotShip: DeepPartial<SquadPilot>;
    expectedCost: number;
  }

  const getPilotCostTestCases: GetPilotCostTestCase[] = [
    {
      description: "with no upgrades returns just pilot cost",
      testSquadPilotShip: { points: 100, upgrades: [] },
      expectedCost: 100,
    },
    {
      description: "with one upgrade, sums pilot cost with upgrade cost",
      testSquadPilotShip: { points: 100, upgrades: [{ upgrade: stubUpgradesData[0] }] },
      expectedCost: 110,
    },
    {
      description: "with two upgrades, sums pilot with cost of both upgrades",
      testSquadPilotShip: {
        points: 100,
        upgrades: [{ upgrade: stubUpgradesData[0] }, { upgrade: stubUpgradesData[1] }],
      },
      expectedCost: 125,
    },
    {
      description: "with null selectedUpgradeId, returns pilot cost alone",
      testSquadPilotShip: { points: 100, upgrades: [{ upgrade: null }] },
      expectedCost: 100,
    },
    {
      description: "with undefined selectedUpgradeId, returns pilot cost alone",
      testSquadPilotShip: { points: 100, upgrades: [{ upgrade: undefined }] },
      expectedCost: 100,
    },
  ];

  it.each(getPilotCostTestCases)("$description", ({ description, testSquadPilotShip, expectedCost }) => {
    const cost = getPilotCost(testSquadPilotShip as SquadPilot);
    expect(cost).toBe(expectedCost);
  });
});

describe("getSquadCost", () => {
  const fiftyPointPilot = {
    points: 50,
    upgrades: [],
  } as SquadPilot;
  const fortyFivePointPilot = {
    points: 45,
    upgrades: [],
  } as SquadPilot;

  it.each([
    ["empty squad costs zero", { squadPilots: [] }, 0],
    ["one 50 point pilot costs 50", { squadPilots: [fiftyPointPilot] }, 50],
    ["50 point pilot + 45 point pilot costs 95", { squadPilots: [fiftyPointPilot, fortyFivePointPilot] }, 95],
    // Add more test cases here if needed
  ])("%s", (testName, squad, expectedCost) => {
    const cost = getSquadCost(squad as Squad);
    expect(cost).toBe(expectedCost);
  });
});

describe("getPilotEffectiveStats", () => {
  const stubUpgradeWithModifier: Partial<Upgrade> = {
    id: 1,
    modifier_func: (squadPilot) => {
      squadPilot.shields = squadPilot.shields + 1;
    },
  };
  const stubUpgradeWithoutModifier: Partial<Upgrade> = { id: 2 };

  it("throws an error if no pilot is provided", () => {
    expect(() => getPilotEffectiveStats(null)).toThrow("pilot required for getPilotEffectiveStats");
  });

  it("with upgrade that modifies pilot ship, applies modifications to pilot ship", () => {
    const initialShieldValue = 2;
    const squadPilot: DeepPartial<SquadPilot> = {
      upgrades: [{ upgrade: stubUpgradeWithModifier }],
      agility: 2,
      hull: 0,
      shields: initialShieldValue,
      actions: [],
      maneuvers: [],
    };
    const expectedModifiedShieldValue = 3;

    const result = getPilotEffectiveStats(squadPilot as SquadPilot);

    expect(result.shields).toBe(expectedModifiedShieldValue);
  });

  it("with upgrade that does not modify pilot ship, does not make modifications to pilot ship", () => {
    const initialShieldValue = 2;
    const squadPilot: DeepPartial<SquadPilot> = {
      upgrades: [{ upgrade: stubUpgradeWithoutModifier }],
      agility: 2,
      hull: 0,
      shields: initialShieldValue,
      actions: [],
      maneuvers: [],
    };

    const result = getPilotEffectiveStats(squadPilot as SquadPilot);

    expect(JSON.stringify(squadPilot)).toBe(JSON.stringify(result));
  });
});
