import { SquadPilot, SquadPilotUpgradeSlot, UniqueKey, Upgrade } from "../data/xwing_types";
import { squadsReducer, getUpdatedSquad, initialSquadsState, getSquadPilotWithUpgradeRemoved } from "./SquadContext";

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

      expect(expected).toEqual(result);
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

      expect(expected).toEqual(result);
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

      expect(expected).toEqual(result);
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

      expect(expected).toEqual(result);
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

      expect(expected).toEqual(result);
    });
  });
});
