import { Faction, Squad, SquadPilot, SquadPilotUpgradeSlot, UniqueKey, Upgrade } from "../data/xwing_types";
import {
  squadsReducer,
  getUpdatedSquad,
  initialSquadsState,
  getSquadPilotWithUpgradeRemoved,
  getSquadPilotWithUpgradeSet,
  getUpgradesOnSquadPilot,
  getEmptyFactionSquad,
  getSquadPilotWithMultipleUpgradesSet,
} from "./SquadContext";

describe("squadContext", () => {
  it("should only update the specified squad", () => {
    const newName = "RENAMED_SQUAD";

    const result = squadsReducer(initialSquadsState, {
      type: "renameSquad",
      squad: initialSquadsState[0],
      newName: newName,
    });

    expect(result).not.toBe(initialSquadsState);
    expect(result[0]).not.toEqual(initialSquadsState[0]);
    expect(result[1]).toBe(initialSquadsState[1]);
  });
  describe("getUpdatedSquad", () => {
    describe("rename squad", () => {
      it("should rename the squad", () => {
        const initialRebelSquad = initialSquadsState[0];
        const newName = "RENAMED_SQUAD";
        const result = getUpdatedSquad(initialRebelSquad, {
          squad: initialRebelSquad,
          type: "renameSquad",
          newName: newName,
        });

        expect(result).not.toBe(initialRebelSquad);
        expect(result.name).not.toEqual(initialRebelSquad.name);
        expect(result.name).toEqual(newName);
      });
    });
    describe("addShip", () => {});
  });
  describe("getSquadPilotWithUpgradeRemoved", () => {
    it("should return squadPilot when upgrade is already unset", () => {
      const emptyUpgradeSlot: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Modification1",
        slot: "Modification",
        upgrade: null,
        parentSquadPilotUpgradeSlotKey: null,
      };
      const samplePilot: Partial<SquadPilot> = {
        squadPilotId: "test_ship" as UniqueKey,
        upgrades: [emptyUpgradeSlot],
      };

      const result = getSquadPilotWithUpgradeRemoved(emptyUpgradeSlot, samplePilot as SquadPilot);
      expect(result).toBe(samplePilot);
    });
    it("should remove upgrade from the upgrade slot specified", () => {
      const upgradeSlotToEmpty: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Modification1",
        slot: "Modification",
        upgrade: {
          name: "test_upgrade",
          id: 5,
          slot: "Modification",
        },
      };
      const samplePilot: Partial<SquadPilot> = {
        squadPilotId: "test_ship" as UniqueKey,
        upgrades: [upgradeSlotToEmpty],
      };

      const expected: Partial<SquadPilot> = {
        ...samplePilot,
        upgrades: [
          {
            ...upgradeSlotToEmpty,
            upgrade: null,
            parentSquadPilotUpgradeSlotKey: null,
          },
        ],
      };

      const result = getSquadPilotWithUpgradeRemoved(upgradeSlotToEmpty, samplePilot as SquadPilot);

      expect(result).toEqual(expected);
    });
    it("should remove also_occupies reservations due to the upgrade slot specified", () => {
      const parentSlotKey = "Payload1";
      const parentSlot: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: parentSlotKey,
        slot: "Payload",
        upgrade: {
          name: "bomblet_generator",
          id: 5,
          slot: "Modification",
        },
        parentSquadPilotUpgradeSlotKey: null,
      };
      const also_occupied_slot: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Payload2",
        slot: "Payload",
        upgrade: null,
        parentSquadPilotUpgradeSlotKey: parentSlotKey,
      };
      const samplePilot: Partial<SquadPilot> = {
        squadPilotId: "test_ship" as UniqueKey,
        upgrades: [parentSlot, also_occupied_slot],
      };

      const expected: Partial<SquadPilot> = {
        ...samplePilot,
        upgrades: [
          {
            ...parentSlot,
            upgrade: null,
            parentSquadPilotUpgradeSlotKey: null,
          },
          {
            ...also_occupied_slot,
            upgrade: null,
            parentSquadPilotUpgradeSlotKey: null,
          },
        ],
      };

      const result = getSquadPilotWithUpgradeRemoved(parentSlot, samplePilot as SquadPilot);

      expect(result).toEqual(expected);
    });
    it("should remove parent slot if also_occupies_slot has removeUpgrade called on it", () => {
      const parentSlotKey = "Payload1";
      const parentSlot: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: parentSlotKey,
        slot: "Payload",
        upgrade: {
          name: "bomblet_generator",
          id: 5,
          slot: "Modification",
        },
        parentSquadPilotUpgradeSlotKey: null,
      };
      const also_occupied_slot: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Payload2",
        slot: "Payload",
        upgrade: null,
        parentSquadPilotUpgradeSlotKey: parentSlotKey,
      };
      const samplePilot: Partial<SquadPilot> = {
        squadPilotId: "test_ship" as UniqueKey,
        upgrades: [parentSlot, also_occupied_slot],
      };

      const expected: Partial<SquadPilot> = {
        ...samplePilot,
        upgrades: [
          {
            ...parentSlot,
            upgrade: null,
            parentSquadPilotUpgradeSlotKey: null,
          },
          {
            ...also_occupied_slot,
            upgrade: null,
            parentSquadPilotUpgradeSlotKey: null,
          },
        ],
      };

      const result = getSquadPilotWithUpgradeRemoved(also_occupied_slot, samplePilot as SquadPilot);

      expect(result).toEqual(expected);
    });
    it("should remove conferredAddon slots when upgrade that confers addons is removed", () => {
      const parentSlotKey = "Device1";
      const parentSlot: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: parentSlotKey,
        slot: "Device",
        upgrade: {
          name: "just_a_bomb",
          id: 5,
          slot: "Device",
        },
        parentSquadPilotUpgradeSlotKey: null,
      };
      const upgradeSlotThatIsConferringAddon: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Title1",
        slot: "Title",
        parentSquadPilotUpgradeSlotKey: null,
        upgrade: {
          name: "upgradeThatAddsDeviceSlot",
          id: 2,
          slot: "Title",
          confersAddons: [
            {
              type: "Upgrade",
              slot: "Device",
            },
          ],
        },
      };
      const samplePilot: Partial<SquadPilot> = {
        squadPilotId: "test_ship" as UniqueKey,
        upgrades: [parentSlot, upgradeSlotThatIsConferringAddon],
      };

      const expected: Partial<SquadPilot> = {
        ...samplePilot,
        upgrades: [
          {
            ...upgradeSlotThatIsConferringAddon,
            upgrade: null,
            parentSquadPilotUpgradeSlotKey: null,
          },
        ],
      };

      const result = getSquadPilotWithUpgradeRemoved(upgradeSlotThatIsConferringAddon, samplePilot as SquadPilot);

      expect(result).toEqual(expected);
    });
    it("should remove conferredAddon slots and parent upgrade when upgrade that confers addons is removed", () => {
      const parentSlotKey = "Device1";
      const parentSlot: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: parentSlotKey,
        slot: "Device",
        upgrade: {
          name: "bomblet_generator",
          id: 5,
          slot: "Modification",
        },
        parentSquadPilotUpgradeSlotKey: null,
      };
      const also_occupied_slot: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Device2",
        slot: "Device",
        upgrade: null,
        parentSquadPilotUpgradeSlotKey: parentSlotKey,
      };
      const upgradeSlotThatIsConferringAddon: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Title1",
        slot: "Title",
        parentSquadPilotUpgradeSlotKey: null,
        upgrade: {
          name: "upgradeThatAddsDeviceSlot",
          id: 2,
          slot: "Title",
          confersAddons: [
            {
              type: "Upgrade",
              slot: "Device",
            },
          ],
        },
      };
      const samplePilot: Partial<SquadPilot> = {
        squadPilotId: "test_ship" as UniqueKey,
        upgrades: [parentSlot, also_occupied_slot, upgradeSlotThatIsConferringAddon],
      };

      const expected: Partial<SquadPilot> = {
        ...samplePilot,
        upgrades: [
          {
            ...parentSlot,
            upgrade: null,
            parentSquadPilotUpgradeSlotKey: null,
          },
          {
            ...upgradeSlotThatIsConferringAddon,
            upgrade: null,
            parentSquadPilotUpgradeSlotKey: null,
          },
        ],
      };

      const result = getSquadPilotWithUpgradeRemoved(upgradeSlotThatIsConferringAddon, samplePilot as SquadPilot);

      expect(result).toEqual(expected);
    });
  });
  describe("getSquadPilotWithUpgradeSet", () => {
    it("removes upgrade from specified slot on provided squadPilot", () => {
      const upgradeSlotToEmpty: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Device1",
        slot: "Device",
        upgrade: {
          name: "someBomb",
          id: 4,
          slot: "Device",
        },
        parentSquadPilotUpgradeSlotKey: null,
      };
      const samplePilot: Partial<SquadPilot> = {
        squadPilotId: "123089123098" as UniqueKey,
        upgrades: [upgradeSlotToEmpty],
      };

      const upgradeRemovalMock = jest.fn((upgradeSlotToEmpty: SquadPilotUpgradeSlot, squadPilot: SquadPilot) => {
        return { ...squadPilot, upgrades: [] };
      });

      const pilotWithUpgradeRemoved = getSquadPilotWithUpgradeSet(null, upgradeSlotToEmpty, samplePilot as SquadPilot, {
        getSquadPilotWithUpgradeRemovedFn: upgradeRemovalMock,
      });

      expect(pilotWithUpgradeRemoved.squadPilotId).toBe(samplePilot.squadPilotId);
      expect(upgradeRemovalMock).toHaveBeenLastCalledWith(upgradeSlotToEmpty, samplePilot);
    });
    it("sets upgrade if upgrade is provided", () => {
      const upgradeToApply: Upgrade = {
        name: "someBomb",
        id: 5,
        slot: "Device",
      };
      const upgradeSlotToChange: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Device1",
        slot: "Device",
        upgrade: null,
        parentSquadPilotUpgradeSlotKey: null,
      };
      const samplePilot: Partial<SquadPilot> = {
        squadPilotId: "test_pilot" as UniqueKey,
        upgrades: [upgradeSlotToChange],
      };

      const upgradeRemovalMock = jest.fn((upgradeSlotToEmpty: SquadPilotUpgradeSlot, squadPilot: SquadPilot) => {
        return { ...squadPilot, upgrades: [...squadPilot.upgrades] };
      });

      const expected: Partial<SquadPilot> = {
        ...samplePilot,
        upgrades: [
          {
            ...upgradeSlotToChange,
            upgrade: upgradeToApply,
          },
        ],
      };

      const result = getSquadPilotWithUpgradeSet(upgradeToApply, upgradeSlotToChange, samplePilot as SquadPilot, {
        getSquadPilotWithUpgradeRemovedFn: upgradeRemovalMock,
      });

      expect(result).toEqual(expected);
    });
    it("sets parentSquadPilotUpgradeSlotKey on one slot when selected upgrade has an also_occupies property", () => {
      const parentSquadPilotUpgradeSlotKey = "Device1" as UniqueKey;
      const upgradeToApply: Upgrade = {
        name: "Electro-Proton Bomb",
        id: 235,
        slot: "Device",
        also_occupies_upgrades: ["Modification"],
      };
      const upgradeSlotToChange: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: parentSquadPilotUpgradeSlotKey,
        slot: "Device",
        upgrade: null,
        parentSquadPilotUpgradeSlotKey: null,
      };
      const emptyModSlot: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Modification1",
        slot: "Modification",
        upgrade: null,
        parentSquadPilotUpgradeSlotKey: null,
      };
      const anotherEmptyModSlot: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Modification2",
        slot: "Modification",
        upgrade: null,
        parentSquadPilotUpgradeSlotKey: null,
      };
      const samplePilot: Partial<SquadPilot> = {
        squadPilotId: "test_pilot" as UniqueKey,
        upgrades: [upgradeSlotToChange, emptyModSlot, anotherEmptyModSlot],
      };

      const upgradeRemovalMock = jest.fn((upgradeSlotToEmpty: SquadPilotUpgradeSlot, squadPilot: SquadPilot) => {
        return { ...squadPilot, upgrades: [...squadPilot.upgrades] };
      });

      const expected: Partial<SquadPilot> = {
        ...samplePilot,
        upgrades: [
          {
            ...upgradeSlotToChange,
            upgrade: upgradeToApply,
          },
          {
            ...emptyModSlot,
            parentSquadPilotUpgradeSlotKey: parentSquadPilotUpgradeSlotKey,
          },
          anotherEmptyModSlot,
        ],
      };

      const result = getSquadPilotWithUpgradeSet(upgradeToApply, upgradeSlotToChange, samplePilot as SquadPilot, {
        getSquadPilotWithUpgradeRemovedFn: upgradeRemovalMock,
      });

      expect(result).toEqual(expected);
    });
    it("won't set parentSquadPilotUpgradeSlotKey on a slot that is already in use", () => {
      const newUpgradeParentSquadPilotUpgradeSlotKey = "Device1" as UniqueKey;
      const modSlotParentKey = "Modification1" as UniqueKey;
      const upgradeToApply: Upgrade = {
        name: "Electro-Proton Bomb",
        id: 235,
        slot: "Device",
        also_occupies_upgrades: ["Modification"],
      };
      const upgradeSlotToChange: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: newUpgradeParentSquadPilotUpgradeSlotKey,
        slot: "Device",
        upgrade: null,
        parentSquadPilotUpgradeSlotKey: null,
      };
      const modSlotWithUpgradeSet: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: modSlotParentKey,
        slot: "Modification",
        upgrade: {
          name: "Some Big Modification",
          id: 233123,
          slot: "Modification",
        },
        parentSquadPilotUpgradeSlotKey: null,
      };
      const modSlotWithParentSet: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Modification2",
        slot: "Modification",
        upgrade: null,
        parentSquadPilotUpgradeSlotKey: modSlotParentKey,
      };
      const samplePilot: Partial<SquadPilot> = {
        squadPilotId: "test_pilot" as UniqueKey,
        upgrades: [upgradeSlotToChange, modSlotWithUpgradeSet, modSlotWithParentSet],
      };

      const upgradeRemovalMock = jest.fn((upgradeSlotToEmpty: SquadPilotUpgradeSlot, squadPilot: SquadPilot) => {
        return { ...squadPilot, upgrades: [...squadPilot.upgrades] };
      });

      const expected: Partial<SquadPilot> = {
        ...samplePilot,
        upgrades: [
          {
            ...upgradeSlotToChange,
            upgrade: upgradeToApply,
          },
          modSlotWithUpgradeSet,
          modSlotWithParentSet,
        ],
      };

      const result = getSquadPilotWithUpgradeSet(upgradeToApply, upgradeSlotToChange, samplePilot as SquadPilot, {
        getSquadPilotWithUpgradeRemovedFn: upgradeRemovalMock,
      });

      expect(result).toEqual(expected);
    });
    it("should add slots specified by confersAddons with correct key", () => {
      const upgradeThatConfersAddon: Upgrade = {
        name: "upgrade_that_adds",
        id: 12312,
        slot: "Title",
        confersAddons: [
          {
            type: "Upgrade",
            slot: "Crew",
          },
        ],
      };

      const upgradeSlotToChange: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Title1",
        slot: "Title",
        upgrade: null,
        parentSquadPilotUpgradeSlotKey: null,
      };
      const existingCrewSlot: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Crew1",
        slot: "Crew",
        upgrade: null,
        parentSquadPilotUpgradeSlotKey: null,
      };

      const initialPilot: Partial<SquadPilot> = {
        squadPilotId: "nobody" as UniqueKey,
        upgrades: [existingCrewSlot, upgradeSlotToChange],
      };

      const upgradeRemovalMock = jest.fn((upgradeSlotToEmpty: SquadPilotUpgradeSlot, squadPilot: SquadPilot) => {
        return { ...squadPilot, upgrades: [...squadPilot.upgrades] };
      });

      const expected: Partial<SquadPilot> = {
        ...initialPilot,
        upgrades: [
          existingCrewSlot,
          {
            ...upgradeSlotToChange,
            upgrade: upgradeThatConfersAddon,
          },
          {
            squadPilotUpgradeSlotKey: `Crew2`,
            slot: "Crew",
            upgrade: null,
            parentSquadPilotUpgradeSlotKey: null,
          },
        ],
      };

      const result = getSquadPilotWithUpgradeSet(
        upgradeThatConfersAddon,
        upgradeSlotToChange,
        initialPilot as SquadPilot,
        { getSquadPilotWithUpgradeRemovedFn: upgradeRemovalMock },
      );

      expect(expected).toEqual(result);
    });
    it("unequips last matching upgrade slot when selected upgrade has unequips_upgrades", () => {
      const upgradeThatUnequips: Upgrade = {
        name: "Punishing_one_partial", // the real one unequips, also_occupies, and also confersAddon...but isolating the unequip right now
        id: 159,
        slot: "Title",
        unequips_upgrades: ["Crew"],
      };

      const titleSlot: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Title1",
        slot: "Title",
        upgrade: null,
        parentSquadPilotUpgradeSlotKey: null,
      };
      const crewSlot: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Crew1",
        slot: "Crew",
        upgrade: {
          name: "SomeCrew",
          id: 123123,
          slot: "Crew",
        },
        parentSquadPilotUpgradeSlotKey: null,
      };
      const secondCrewSlot: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Crew2",
        slot: "Crew",
        upgrade: {
          name: "another Crew",
          id: 123123234234,
          slot: "Crew",
        },
        parentSquadPilotUpgradeSlotKey: null,
      };

      const initialPilot: Partial<SquadPilot> = {
        squadPilotId: "nobodyInParticular" as UniqueKey,
        upgrades: [crewSlot, secondCrewSlot, titleSlot],
      };

      const upgradeRemovalMock = jest.fn((upgradeSlotToEmpty: SquadPilotUpgradeSlot, squadPilot: SquadPilot) => {
        return squadPilot;
      });

      getSquadPilotWithUpgradeSet(upgradeThatUnequips, titleSlot, initialPilot as SquadPilot, {
        getSquadPilotWithUpgradeRemovedFn: upgradeRemovalMock,
      });

      expect(upgradeRemovalMock).toHaveBeenCalledTimes(2);
      expect(upgradeRemovalMock).toHaveBeenLastCalledWith(secondCrewSlot, initialPilot);
    });
  });
  describe("getUpgradesOnSquadPilot", () => {
    it("should return an empty array when there are no upgrades", () => {
      const squadPilot: SquadPilot = {
        squadPilotId: "uniqueKey1" as UniqueKey,
        factions: ["Rebel Alliance"],
        agility: 2,
        hull: 3,
        shields: 2,
        actions: [],
        maneuvers: [],
        shipCanonicalName: null,
        ship_keyword: null,
        pilotName: null,
        pilotId: null,
        pilotKeyword: null,
        pilotCanonicalName: null,
        upgrades: [],
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 5,
        points: 50,
        slots: [],
      };

      const result = getUpgradesOnSquadPilot(squadPilot);
      expect(result).toEqual([]);
    });

    it("should return only the upgrades that are not null", () => {
      const upgrades: Upgrade[] = [
        { id: 1, name: "Upgrade 1", slot: "Astromech" },
        { id: 2, name: "Upgrade 2", slot: "Torpedo" },
      ];

      const squadPilot: SquadPilot = {
        squadPilotId: "uniqueKey2" as UniqueKey,
        factions: ["Rebel Alliance"],
        agility: 2,
        hull: 3,
        shields: 2,
        actions: [],
        maneuvers: [],
        shipCanonicalName: null,
        ship_keyword: null,
        pilotName: null,
        pilotId: null,
        pilotKeyword: null,
        pilotCanonicalName: null,
        upgrades: [
          { squadPilotUpgradeSlotKey: "slot1", slot: "Astromech", upgrade: upgrades[0] },
          { squadPilotUpgradeSlotKey: "slot2", slot: "Missile", upgrade: null },
          { squadPilotUpgradeSlotKey: "slot3", slot: "Torpedo", upgrade: upgrades[1] },
        ],
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 5,
        points: 50,
        slots: [],
      };

      const result = getUpgradesOnSquadPilot(squadPilot);
      expect(result).toEqual([upgrades[0], upgrades[1]]);
    });

    it("should return an empty array when all upgrades are null", () => {
      const squadPilot: SquadPilot = {
        squadPilotId: "uniqueKey3" as UniqueKey,
        factions: ["Rebel Alliance"],
        agility: 2,
        hull: 3,
        shields: 2,
        actions: [],
        maneuvers: [],
        shipCanonicalName: null,
        ship_keyword: null,
        pilotName: null,
        pilotId: null,
        pilotKeyword: null,
        pilotCanonicalName: null,
        upgrades: [
          { squadPilotUpgradeSlotKey: "slot1", slot: "Astromech", upgrade: null },
          { squadPilotUpgradeSlotKey: "slot2", slot: "Missile", upgrade: null },
        ],
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 5,
        points: 50,
        slots: [],
      };

      const result = getUpgradesOnSquadPilot(squadPilot);
      expect(result).toEqual([]);
    });

    it("should handle a mix of null and non-null upgrades", () => {
      const upgrades: Upgrade[] = [
        { id: 1, name: "Upgrade 1", slot: "Astromech" },
        { id: 2, name: "Upgrade 2", slot: "Torpedo" },
      ];

      const squadPilot: SquadPilot = {
        squadPilotId: "uniqueKey4" as UniqueKey,
        factions: ["Rebel Alliance"],
        agility: 2,
        hull: 3,
        shields: 2,
        actions: [],
        maneuvers: [],
        shipCanonicalName: null,
        ship_keyword: null,
        pilotName: null,
        pilotId: null,
        pilotKeyword: null,
        pilotCanonicalName: null,
        upgrades: [
          { squadPilotUpgradeSlotKey: "slot1", slot: "Astromech", upgrade: upgrades[0] },
          { squadPilotUpgradeSlotKey: "slot2", slot: "Missile", upgrade: null },
          { squadPilotUpgradeSlotKey: "slot3", slot: "Missile", upgrade: null },
          { squadPilotUpgradeSlotKey: "slot4", slot: "Torpedo", upgrade: upgrades[1] },
        ],
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 5,
        points: 50,
        slots: [],
      };

      const result = getUpgradesOnSquadPilot(squadPilot);
      expect(result).toEqual([upgrades[0], upgrades[1]]);
    });
  });
  describe("getEmptyFactionSquad", () => {
    it("should return a squad object with the correct faction and name for Rebel Alliance", () => {
      const factionName: Faction = "Rebel Alliance";
      const result: Squad = getEmptyFactionSquad(factionName);

      expect(result).toEqual({
        id: null,
        faction: "Rebel Alliance",
        name: "Rebel Alliance Squadron",
        squadPilots: [],
      });
    });
  });
  describe("getSquadPilotWithMultipleUpgradesSet", () => {
    it("should set upgrades for matching slots if matching slots are available", () => {
      const upgradesData: Upgrade[] = [
        { id: 1, name: "Upgrade 1", slot: "Astromech" },
        { id: 2, name: "Upgrade 2", slot: "Torpedo" },
      ];

      const squadPilot: SquadPilot = {
        squadPilotId: "uniqueKey1" as UniqueKey,
        upgrades: [
          { squadPilotUpgradeSlotKey: "slot1", slot: "Astromech", upgrade: null },
          { squadPilotUpgradeSlotKey: "slot2", slot: "Torpedo", upgrade: null },
        ],
        factions: ["Rebel Alliance"],
        agility: 2,
        hull: 3,
        shields: 2,
        actions: [],
        maneuvers: [],
        shipCanonicalName: null,
        ship_keyword: null,
        pilotName: null,
        pilotId: null,
        pilotKeyword: null,
        pilotCanonicalName: null,
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 5,
        points: 50,
        slots: [],
      };

      const getSquadPilotWithUpgradeSetMock = jest.fn(
        (upgradeBeingCopied, matchingSlotOnNewShip, squadPilot) => squadPilot,
      );

      getSquadPilotWithMultipleUpgradesSet(upgradesData, squadPilot, {
        getSquadPilotWithUpgradeSetFn: getSquadPilotWithUpgradeSetMock,
      });

      expect(getSquadPilotWithUpgradeSetMock).toHaveBeenCalledWith(upgradesData[0], squadPilot.upgrades[0], squadPilot);
      expect(getSquadPilotWithUpgradeSetMock).toHaveBeenCalledWith(upgradesData[1], squadPilot.upgrades[1], squadPilot);
      expect(getSquadPilotWithUpgradeSetMock).toHaveBeenCalledTimes(2);
    });

    it("should not set upgrades if matching slots are not available", () => {
      const upgrades: Upgrade[] = [
        { id: 1, name: "Upgrade 1", slot: "Astromech" },
        { id: 2, name: "Upgrade 2", slot: "Torpedo" },
      ];

      const squadPilot: SquadPilot = {
        squadPilotId: "uniqueKey2" as UniqueKey,
        upgrades: [
          { squadPilotUpgradeSlotKey: "slot1", slot: "Missile", upgrade: null },
          { squadPilotUpgradeSlotKey: "slot2", slot: "Cannon", upgrade: null },
        ],
        factions: ["Rebel Alliance"],
        agility: 2,
        hull: 3,
        shields: 2,
        actions: [],
        maneuvers: [],
        shipCanonicalName: null,
        ship_keyword: null,
        pilotName: null,
        pilotId: null,
        pilotKeyword: null,
        pilotCanonicalName: null,
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 5,
        points: 50,
        slots: [],
      };

      const getSquadPilotWithUpgradeSetMock = jest.fn(
        (upgradeBeingCopied, matchingSlotOnNewShip, squadPilot) => squadPilot,
      );

      getSquadPilotWithMultipleUpgradesSet(upgrades, squadPilot, {
        getSquadPilotWithUpgradeSetFn: getSquadPilotWithUpgradeSetMock,
      });

      expect(getSquadPilotWithUpgradeSetMock).not.toHaveBeenCalled();
    });

    it("should only set upgrades for available slots and leave others", () => {
      const upgradeAstromech = { id: 1, name: "Upgrade 1", slot: "Astromech" };
      const upgradeTorpedo1 = { id: 2, name: "Upgrade 2", slot: "Torpedo" };
      const upgradeCannon = { id: 3, name: "Upgrade 3", slot: "Cannon" }; // shouldn't add because there are no cannon slots
      const upgradeTorpedo2 = { id: 4, name: "Upgrade 4", slot: "Torpedo" }; // shouldnt add because there is only one slot available for torpedoes

      const upgrades: Upgrade[] = [upgradeAstromech, upgradeTorpedo1, upgradeCannon, upgradeTorpedo2];

      const slotAstromech = { squadPilotUpgradeSlotKey: "slot1", slot: "Astromech", upgrade: null };
      const slotMissle = { squadPilotUpgradeSlotKey: "slot2", slot: "Missile", upgrade: null };
      const slotTorpedo = { squadPilotUpgradeSlotKey: "slot3", slot: "Torpedo", upgrade: null };

      const squadPilot: SquadPilot = {
        squadPilotId: "uniqueKey3" as UniqueKey,
        upgrades: [slotAstromech, slotMissle, slotTorpedo],
        factions: ["Rebel Alliance"],
        agility: 2,
        hull: 3,
        shields: 2,
        actions: [],
        maneuvers: [],
        shipCanonicalName: null,
        ship_keyword: null,
        pilotName: null,
        pilotId: null,
        pilotKeyword: null,
        pilotCanonicalName: null,
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 5,
        points: 50,
        slots: [],
      };

      const getSquadPilotWithUpgradeSetMock = jest.fn((upgradeBeingCopied, matchingSlotOnNewShip, squadPilot) => {
        return {
          // simplified mock of set upgrade function...
          ...squadPilot,
          upgrades: squadPilot.upgrades.map((upslot) => {
            if (upslot.slot === upgradeBeingCopied.slot && !upslot.upgrade) {
              return { ...upslot, upgrade: upgradeBeingCopied };
            }
            return upslot;
          }),
        };
      });

      getSquadPilotWithMultipleUpgradesSet(upgrades, squadPilot, {
        getSquadPilotWithUpgradeSetFn: getSquadPilotWithUpgradeSetMock,
      });

      expect(getSquadPilotWithUpgradeSetMock).toHaveBeenCalledTimes(2);
      expect(getSquadPilotWithUpgradeSetMock).toHaveBeenCalledWith(upgradeAstromech, slotAstromech, expect.anything());
      expect(getSquadPilotWithUpgradeSetMock).toHaveBeenCalledWith(upgradeTorpedo1, slotTorpedo, expect.anything());
    });
    it("should set upgrade on a missing slot if that slot is added by confersAddons", () => {
      const titleThatConfersAstromech: Upgrade = {
        name: "Punishing One",
        id: 233423,
        slot: "Title",
        confersAddons: [
          {
            type: "Upgrade",
            slot: "Astromech",
          },
        ],
      };

      const astromechUpgrade: Upgrade = {
        name: "an astromech",
        id: 124313,
        slot: "Astromech",
      };

      const upgradesToAdd: Upgrade[] = [
        astromechUpgrade, // putting dependent addon at the front so that the test will fail if the function doesn't attempt to add after adding title
        titleThatConfersAstromech,
      ];

      const initialSquadPilotWithNoAstromechSlots: Partial<SquadPilot> = {
        upgrades: [
          {
            squadPilotUpgradeSlotKey: "Torpedo1",
            slot: "Torpedo",
            upgrade: undefined,
            parentSquadPilotUpgradeSlotKey: null,
          },
          {
            squadPilotUpgradeSlotKey: "Crew1",
            slot: "Crew",
            upgrade: undefined,
            parentSquadPilotUpgradeSlotKey: null,
          },
          {
            squadPilotUpgradeSlotKey: "Title1",
            slot: "Title",
            upgrade: undefined,
            parentSquadPilotUpgradeSlotKey: null,
          },
        ],
      };

      const astromechSlotToadd: SquadPilotUpgradeSlot = {
        slot: "Astromech",
        squadPilotUpgradeSlotKey: "Astromech1",
        parentSquadPilotUpgradeSlotKey: null,
        upgrade: null,
      };

      const getSquadPilotWithUpgradeSetMock = jest.fn((upgradeBeingCopied, matchingSlotOnNewShip, squadPilot) => {
        return {
          // simplified mock of set upgrade function...
          ...squadPilot,
          upgrades: squadPilot.upgrades.map((upslot) => {
            if (upslot.slot === upgradeBeingCopied.slot && !upslot.upgrade) {
              return { ...upslot, upgrade: upgradeBeingCopied };
            }
            return upslot;
          }),
        };
      });

      getSquadPilotWithUpgradeSetMock.mockReturnValueOnce({
        ...initialSquadPilotWithNoAstromechSlots,
        upgrades: [
          ...initialSquadPilotWithNoAstromechSlots.upgrades.map((upslot) => {
            if (upslot.slot !== "Title") {
              return upslot;
            }
            return {
              ...upslot,
              upgrade: titleThatConfersAstromech,
            };
          }),
          astromechSlotToadd,
        ],
      });

      getSquadPilotWithMultipleUpgradesSet(upgradesToAdd, initialSquadPilotWithNoAstromechSlots as SquadPilot, {
        getSquadPilotWithUpgradeSetFn: getSquadPilotWithUpgradeSetMock,
      });

      expect(getSquadPilotWithUpgradeSetMock).toHaveBeenCalledTimes(2);
      expect(getSquadPilotWithUpgradeSetMock).toHaveBeenCalledWith(
        titleThatConfersAstromech,
        initialSquadPilotWithNoAstromechSlots.upgrades[2],
        initialSquadPilotWithNoAstromechSlots,
      );
      expect(getSquadPilotWithUpgradeSetMock).toHaveBeenCalledWith(
        astromechUpgrade,
        astromechSlotToadd,
        expect.anything(),
      );
    });
  });
});
