import { SquadPilot, SquadPilotUpgradeSlot, UniqueKey, Upgrade } from "../data/xwing_types";
import {
  squadsReducer,
  getUpdatedSquad,
  initialSquadsState,
  getSquadPilotWithUpgradeRemoved,
  getSquadPilotWithUpgradeSet,
} from "./SquadContext";

describe("squadsReducer", () => {
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
    it("removes upgrade if null upgrade is selected", () => {
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
        squadPilotId: "test_pilot" as UniqueKey,
        upgrades: [upgradeSlotToEmpty],
      };

      const expected: Partial<SquadPilot> = {
        ...samplePilot,
        upgrades: [
          {
            ...upgradeSlotToEmpty,
            upgrade: null,
          },
        ],
      };

      const result = getSquadPilotWithUpgradeSet(null, upgradeSlotToEmpty, samplePilot as SquadPilot);

      expect(result).toEqual(expected);
    });
    it("sets upgrade if upgrade is provided", () => {
      const upgradeToApply: Upgrade = {
        name: "someOtherBomb",
        id: 5,
        slot: "Device",
      };
      const upgradeSlotToChange: SquadPilotUpgradeSlot = {
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
        squadPilotId: "test_pilot" as UniqueKey,
        upgrades: [upgradeSlotToChange],
      };

      const expected: Partial<SquadPilot> = {
        ...samplePilot,
        upgrades: [
          {
            ...upgradeSlotToChange,
            upgrade: upgradeToApply,
          },
        ],
      };

      const result = getSquadPilotWithUpgradeSet(upgradeToApply, upgradeSlotToChange, samplePilot as SquadPilot);

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
        upgrade: {
          name: "someBomb",
          id: 4,
          slot: "Device",
        },
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

      const result = getSquadPilotWithUpgradeSet(upgradeToApply, upgradeSlotToChange, samplePilot as SquadPilot);

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
        upgrade: {
          name: "someBomb",
          id: 4,
          slot: "Device",
        },
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

      const result = getSquadPilotWithUpgradeSet(upgradeToApply, upgradeSlotToChange, samplePilot as SquadPilot);

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
      const anotherSlot: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Crew1",
        slot: "Crew",
        upgrade: null,
        parentSquadPilotUpgradeSlotKey: null,
      };

      const initialPilot: Partial<SquadPilot> = {
        squadPilotId: "nobody" as UniqueKey,
        upgrades: [anotherSlot, upgradeSlotToChange],
      };

      const expected = {
        ...initialPilot,
        upgrades: [
          anotherSlot,
          {
            ...upgradeSlotToChange,
            upgrade: upgradeThatConfersAddon,
          },
          {
            squadPilotUpgradeSlotKey: `Crew2`,
            slot: "Crew",
            upgrade: null,
          },
        ],
      };

      const result = getSquadPilotWithUpgradeSet(
        upgradeThatConfersAddon,
        upgradeSlotToChange,
        initialPilot as SquadPilot,
      );

      expect(expected).toEqual(result);
    });
    it("unequips upgrades when selected upgrade has unequips_upgrades", () => {
      const upgradeThatUnequips: Upgrade = {
        name: "Punishing_one_partial", // the real one unequips, also_occupies, and also confersAddon...but isolating the unequip right now
        id: 159,
        slot: "Title",
        unequips_upgrades: ["Crew"],
      };

      const upgradeSlotToChange: SquadPilotUpgradeSlot = {
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

      const initialPilot: Partial<SquadPilot> = {
        squadPilotId: "nobodyInParticular" as UniqueKey,
        upgrades: [crewSlot, upgradeSlotToChange],
      };

      const expected: Partial<SquadPilot> = {
        ...initialPilot,
        upgrades: [
          {
            ...crewSlot,
            upgrade: null,
          },
          {
            ...upgradeSlotToChange,
            upgrade: upgradeThatUnequips,
          },
        ],
      };

      const result = getSquadPilotWithUpgradeSet(upgradeThatUnequips, upgradeSlotToChange, initialPilot as SquadPilot);

      expect(expected).toEqual(result);
    });
  });
});
