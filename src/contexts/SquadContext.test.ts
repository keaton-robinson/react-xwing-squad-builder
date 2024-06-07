import { Faction, Pilot, Squad, SquadPilot, SquadPilotUpgradeSlot, UniqueKey, Upgrade } from "../data/xwing_types";
import {
  squadsReducer,
  getUpdatedSquad,
  initialSquadsState,
  getSquadPilotWithUpgradeRemoved,
  getSquadPilotWithUpgradeSet,
  getUpgradesOnSquadPilot,
  getEmptyFactionSquad,
  getSquadPilotWithMultipleUpgradesSet,
  getSquadWithInvalidUpgradesRemoved,
  SquadsReducerDeps,
  SquadsDispatchAction,
  GetUpdatedSquadDeps,
} from "./SquadContext";

describe("SquadContext", () => {
  describe("squadsReducer", () => {
    it("should only update the specified squad", () => {
      const newName = "RENAMED_SQUAD";

      const result = squadsReducer(initialSquadsState, {
        type: "renameSquad",
        squad: initialSquadsState.squads[0],
        newName: newName,
      });

      expect(result).not.toBe(initialSquadsState);
      expect(result.squads[0]).not.toEqual(initialSquadsState.squads[0]);
      expect(result.squads[1]).toBe(initialSquadsState.squads[1]);
    });
    it("should set error property when getUpdatedSquadFn throws error", () => {
      const errorMessage = "Test error";
      const depsConfig: SquadsReducerDeps = {
        getUpdatedSquadFn: jest.fn().mockImplementation(() => {
          throw new Error(errorMessage);
        }),
      };

      const result = squadsReducer(
        initialSquadsState,
        { type: "renameSquad", newName: "unused name", squad: initialSquadsState[0] },
        depsConfig,
      );

      expect(depsConfig.getUpdatedSquadFn).toThrow();
      expect(result.squads).toBe(initialSquadsState.squads);
      expect(result.error).toBe(errorMessage);
    });
    it("should clear error property when clearError action is dispatched", () => {
      const squadsStateWithError = {
        ...initialSquadsState,
        error: "test value that should go away after clearing",
      };
      const depsConfig: SquadsReducerDeps = {
        getUpdatedSquadFn: jest.fn(),
      };

      const result = squadsReducer(squadsStateWithError, { type: "clearError" }, depsConfig);

      expect(result.error).toBe(null);
      expect(depsConfig.getUpdatedSquadFn).not.toHaveBeenCalled();
    });
  });
  describe("getUpdatedSquad", () => {
    type MockedGetUpdatedSquadDeps = {
      [K in keyof GetUpdatedSquadDeps]: jest.Mock<
        ReturnType<NonNullable<GetUpdatedSquadDeps[K]>>,
        Parameters<NonNullable<GetUpdatedSquadDeps[K]>>
      >;
    };
    const getMockUpdateSquadDeps = () => {
      const mockDeps: GetUpdatedSquadDeps = {
        getCheapestAvailablePilotForShipFn: jest.fn(),
        getSquadPilotShipFn: jest.fn(),
        getSquadWithInvalidUpgradesRemovedFn: jest.fn(),
        getUpgradesOnSquadPilotFn: jest.fn(),
        getSquadPilotWithMultipleUpgradesSetFn: jest.fn(),
        getSquadPilotWithUpgradeSetFn: jest.fn(),
        getEmptyFactionSquadFn: jest.fn(),
        maxPilotReachedFn: jest.fn(),
      };

      return mockDeps as MockedGetUpdatedSquadDeps; // returning as any lets me call mocking functions on the members of this object
    };
    describe("rename squad", () => {
      it("should rename the squad", () => {
        const initialRebelSquad = initialSquadsState.squads[0];
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
    describe("addShip", () => {
      const initialSquad = initialSquadsState.squads[0];
      const dispatchAddAction: SquadsDispatchAction = {
        type: "addShip",
        newShip: "test ship",
        squad: initialSquad,
      };
      it("should get the cheapest pilot, add it, remove invalid upgrades from the squad, then return the squad with the new pilot in it", () => {
        const cheapPilotStub: Pilot = {
          name: "cheapo",
          id: 12312,
          faction: "Rebel Alliance",
          ship: "xwing",
          skill: 1,
          points: 45,
          slots: [],
        };
        const squadPilotStub: Partial<SquadPilot> = {
          squadPilotId: undefined,
          pilotName: cheapPilotStub.name,
          upgrades: [],
        };
        const squadWithPilotAddedStub: Squad = {
          ...initialSquad,
          squadPilots: [...initialSquad.squadPilots, squadPilotStub as SquadPilot],
        };
        const validatedSquadStub: Squad = { ...squadWithPilotAddedStub };
        const depsConfig = getMockUpdateSquadDeps();
        depsConfig.getCheapestAvailablePilotForShipFn.mockReturnValue(cheapPilotStub);
        depsConfig.getSquadPilotShipFn.mockReturnValue(squadPilotStub as SquadPilot);
        depsConfig.getSquadWithInvalidUpgradesRemovedFn.mockReturnValue(validatedSquadStub);

        const result = getUpdatedSquad(initialSquad, dispatchAddAction, depsConfig);

        expect(depsConfig.getCheapestAvailablePilotForShipFn).toHaveBeenCalledTimes(1);
        expect(depsConfig.getCheapestAvailablePilotForShipFn).toHaveBeenCalledWith(
          dispatchAddAction.newShip,
          dispatchAddAction.squad,
        );
        expect(depsConfig.getSquadPilotShipFn).toHaveBeenCalledTimes(1);
        expect(depsConfig.getSquadPilotShipFn).toHaveBeenCalledWith(cheapPilotStub);
        expect(depsConfig.getSquadWithInvalidUpgradesRemovedFn).toHaveBeenCalledTimes(1);
        expect(depsConfig.getSquadWithInvalidUpgradesRemovedFn).toHaveBeenCalledWith(squadWithPilotAddedStub);
        expect(result).toBe(validatedSquadStub);
        expect(result).not.toBe(squadWithPilotAddedStub);
      });
      it("should throw error when no pilots remain available for the ship", () => {
        const depsConfig = getMockUpdateSquadDeps();
        depsConfig.getCheapestAvailablePilotForShipFn.mockReturnValue(null);

        expect(() => getUpdatedSquad(initialSquad, dispatchAddAction, depsConfig)).toThrow();
        expect(depsConfig.getCheapestAvailablePilotForShipFn).toHaveBeenCalledTimes(1);
        expect(depsConfig.getCheapestAvailablePilotForShipFn).toHaveBeenLastCalledWith(
          dispatchAddAction.newShip,
          dispatchAddAction.squad,
        );
      });
    });
    describe("changeShip", () => {
      const initialSquadPilot: Partial<SquadPilot> = {
        squadPilotId: undefined,
        upgrades: [],
      };
      const initialSquad: Squad = { ...initialSquadsState.squads[0], squadPilots: [initialSquadPilot as SquadPilot] };
      const dispatchChangeShipAction: SquadsDispatchAction = {
        type: "changeShip",
        currentPilot: initialSquadPilot as SquadPilot,
        newShip: "test ship",
        squad: initialSquad,
      };
      it("should throw error if no pilot available for new ship", () => {
        const depsConfig = getMockUpdateSquadDeps();
        depsConfig.getCheapestAvailablePilotForShipFn.mockReturnValue(null);

        expect(() => getUpdatedSquad(initialSquad, dispatchChangeShipAction, depsConfig)).toThrow();
        expect(depsConfig.getCheapestAvailablePilotForShipFn).toHaveBeenCalledTimes(1);
        expect(depsConfig.getCheapestAvailablePilotForShipFn).toHaveBeenLastCalledWith(
          dispatchChangeShipAction.newShip,
          dispatchChangeShipAction.squad,
        );
      });
      it("should get the cheapest pilot for new ship, copy upgrades to new squad pilot, replace existing pilot in squad, remove invalid upgrades from the squad, then return the squad with the new pilot in it", () => {
        const cheapPilotStub: Pilot = {
          name: "cheapo",
          id: 12312,
          faction: "Rebel Alliance",
          ship: "xwing",
          skill: 1,
          points: 45,
          slots: [],
        };
        const replacementSquadPilotStub: Partial<SquadPilot> = {
          squadPilotId: undefined,
          pilotName: cheapPilotStub.name,
          upgrades: [],
        };
        const upgradesToAddStub: Upgrade[] = []; // just need an object reference...not important what the contents are for now
        const replacementSquadPilotWIthUpgradesAddedStub: Partial<SquadPilot> = {
          ...replacementSquadPilotStub,
        };
        const squadWithExistingPilotReplaced: Squad = {
          ...initialSquad,
          squadPilots: initialSquad.squadPilots.map((squadPilot) => {
            if (squadPilot === initialSquadPilot) {
              return replacementSquadPilotWIthUpgradesAddedStub as SquadPilot;
            }
            return squadPilot;
          }),
        };
        const validatedSquadStub: Squad = { ...squadWithExistingPilotReplaced };
        const depsConfig = getMockUpdateSquadDeps();
        depsConfig.getCheapestAvailablePilotForShipFn.mockReturnValue(cheapPilotStub);
        depsConfig.getSquadPilotShipFn.mockReturnValue(replacementSquadPilotStub as SquadPilot);
        depsConfig.getUpgradesOnSquadPilotFn.mockReturnValue(upgradesToAddStub);
        depsConfig.getSquadPilotWithMultipleUpgradesSetFn.mockReturnValue(
          replacementSquadPilotWIthUpgradesAddedStub as SquadPilot,
        );
        depsConfig.getSquadWithInvalidUpgradesRemovedFn.mockReturnValue(validatedSquadStub);

        const result = getUpdatedSquad(initialSquad, dispatchChangeShipAction, depsConfig);

        expect(depsConfig.getCheapestAvailablePilotForShipFn).toHaveBeenCalledTimes(1);
        expect(depsConfig.getCheapestAvailablePilotForShipFn).toHaveBeenCalledWith(
          dispatchChangeShipAction.newShip,
          dispatchChangeShipAction.squad,
        );
        expect(depsConfig.getSquadPilotShipFn).toHaveBeenCalledTimes(1);
        expect(depsConfig.getSquadPilotShipFn).toHaveBeenCalledWith(cheapPilotStub);
        expect(depsConfig.getSquadPilotWithMultipleUpgradesSetFn).toHaveBeenCalledTimes(1);
        expect(depsConfig.getSquadPilotWithMultipleUpgradesSetFn).toHaveBeenCalledWith(
          upgradesToAddStub,
          replacementSquadPilotStub,
        );
        expect(depsConfig.getSquadWithInvalidUpgradesRemovedFn).toHaveBeenCalledTimes(1);
        expect(depsConfig.getSquadWithInvalidUpgradesRemovedFn).toHaveBeenCalledWith(squadWithExistingPilotReplaced);
        expect(result).toBe(validatedSquadStub);
        expect(result).not.toBe(squadWithExistingPilotReplaced);
        expect(result).not.toBe(initialSquad);
      });
    });
    describe("clonePilot", () => {
      const initialSquadPilot: Partial<SquadPilot> = {
        squadPilotId: "squadPilotIdTest" as UniqueKey,
        pilotId: 1,
        pilotName: "pilotNameTest",
        upgrades: [],
      };
      const initialSquad: Squad = { ...initialSquadsState.squads[0], squadPilots: [initialSquadPilot as SquadPilot] };
      const dispatchClonePilotAction: SquadsDispatchAction = {
        type: "clonePilot",
        pilotToClone: initialSquadPilot as SquadPilot,
        squad: initialSquad,
      };
      const expectedPilot: Pilot = {
        ...dispatchClonePilotAction.pilotToClone,
        id: dispatchClonePilotAction.pilotToClone.pilotId,
        name: dispatchClonePilotAction.pilotToClone.pilotName,
      };
      it("should throw an error if no pilots are available for ship", () => {
        const depsConfig = getMockUpdateSquadDeps();
        depsConfig.maxPilotReachedFn.mockReturnValue(true);
        depsConfig.getCheapestAvailablePilotForShipFn.mockReturnValue(null);

        expect(() => {
          getUpdatedSquad(initialSquad, dispatchClonePilotAction, depsConfig);
        }).toThrow();
        expect(depsConfig.maxPilotReachedFn).toHaveBeenCalledTimes(1);
        expect(depsConfig.getCheapestAvailablePilotForShipFn).toHaveBeenCalledTimes(1);
      });
      it("should clone provided pilot if that pilot is not maxed out", () => {
        const depsConfig = getMockUpdateSquadDeps();
        depsConfig.maxPilotReachedFn.mockReturnValue(false);

        getUpdatedSquad(initialSquad, dispatchClonePilotAction, depsConfig);

        expect(depsConfig.getSquadPilotShipFn).toHaveBeenCalledWith(expect.objectContaining(expectedPilot));
        expect(depsConfig.getSquadPilotShipFn).toHaveBeenCalledTimes(1);
      });
      it("should use cheapest pilot for ship if provided pilot is maxed out already", () => {
        const cheapestAvailablePilotStub: Pilot = {
          name: "",
          id: 0,
          faction: "Rebel Alliance",
          ship: "",
          skill: 0,
          points: 0,
          slots: [],
        };

        const depsConfig = getMockUpdateSquadDeps();
        depsConfig.maxPilotReachedFn.mockReturnValue(true);
        depsConfig.getCheapestAvailablePilotForShipFn.mockReturnValue(cheapestAvailablePilotStub);

        getUpdatedSquad(initialSquad, dispatchClonePilotAction, depsConfig);

        expect(depsConfig.getSquadPilotShipFn).toHaveBeenCalledWith(cheapestAvailablePilotStub);
        expect(depsConfig.getSquadPilotShipFn).toHaveBeenCalledTimes(1);
      });
      it("should copy upgrades to new squad pilot, replace existing pilot in squad, remove invalid upgrades from the squad, then return the squad with the new pilot in it", () => {
        const squadPilotCloneStub: SquadPilot = {
          ...dispatchClonePilotAction.pilotToClone,
        };
        const upgradesOnPilotStub: Upgrade[] = [];
        const upgradeSlotsStub: SquadPilotUpgradeSlot[] = [];
        const pilotWithUpgradesStub: SquadPilot = {
          ...squadPilotCloneStub,
          upgrades: upgradeSlotsStub,
        };
        const nonvalidatedSquadWithClone: Squad = {
          ...initialSquad,
          squadPilots: [...dispatchClonePilotAction.squad.squadPilots, pilotWithUpgradesStub],
        };
        const validatedSquadStub: Squad = {
          ...nonvalidatedSquadWithClone,
          squadPilots: [...nonvalidatedSquadWithClone.squadPilots],
        };

        const depsConfig = getMockUpdateSquadDeps();
        depsConfig.maxPilotReachedFn.mockReturnValue(false);
        depsConfig.getSquadPilotShipFn.mockReturnValue(squadPilotCloneStub);
        depsConfig.getUpgradesOnSquadPilotFn.mockReturnValue(upgradesOnPilotStub);
        depsConfig.getSquadPilotWithMultipleUpgradesSetFn.mockReturnValue(pilotWithUpgradesStub);
        depsConfig.getSquadWithInvalidUpgradesRemovedFn.mockReturnValue(validatedSquadStub);

        const result = getUpdatedSquad(initialSquad, dispatchClonePilotAction, depsConfig);

        expect(depsConfig.getUpgradesOnSquadPilotFn).toHaveBeenCalledWith(dispatchClonePilotAction.pilotToClone);
        expect(depsConfig.getSquadPilotWithMultipleUpgradesSetFn).toHaveBeenCalledWith(
          upgradesOnPilotStub,
          squadPilotCloneStub,
        );
        expect(depsConfig.getSquadWithInvalidUpgradesRemovedFn).toHaveBeenCalledWith(nonvalidatedSquadWithClone);
        expect(result).toEqual(nonvalidatedSquadWithClone);
      });
    });
    describe("removeFromSquad", () => {
      const aPilot: SquadPilot = {
        squadPilotId: "aPilot" as UniqueKey,
        upgrades: [],
      } as SquadPilot;

      const anotherPilot: SquadPilot = {
        squadPilotId: "anotherPilot" as UniqueKey,
        upgrades: [],
      } as SquadPilot;

      const pilotToRemove: SquadPilot = {
        squadPilotId: "pilotToRemove" as UniqueKey,
        upgrades: [],
      } as SquadPilot;

      const initialSquad: Squad = {
        name: "test",
        faction: "Rebel Alliance",
        squadPilots: [aPilot, pilotToRemove, anotherPilot],
      };
      const removeFromSquadDispatch: SquadsDispatchAction = {
        type: "removeFromSquad",
        pilotToRemove: pilotToRemove,
        squad: initialSquad,
      };
      it("should remove pilot from squad, then remove invalidated upgrades and return result", () => {
        const squadWithChosenPilotRemoved: Squad = {
          ...initialSquad,
          squadPilots: [aPilot, anotherPilot],
        };
        const squadWithInvalidUpgradesRemoved: Squad = {
          ...squadWithChosenPilotRemoved,
          squadPilots: [...squadWithChosenPilotRemoved.squadPilots],
        };

        const depsConfig = getMockUpdateSquadDeps();
        depsConfig.getSquadWithInvalidUpgradesRemovedFn.mockReturnValue(squadWithInvalidUpgradesRemoved);

        const result = getUpdatedSquad(initialSquad, removeFromSquadDispatch, depsConfig);

        expect(depsConfig.getSquadWithInvalidUpgradesRemovedFn).toHaveBeenCalledTimes(1);
        expect(depsConfig.getSquadWithInvalidUpgradesRemovedFn).toHaveBeenCalledWith(
          expect.objectContaining(squadWithChosenPilotRemoved),
        );
        expect(result).toBe(squadWithInvalidUpgradesRemoved);
      });
    });
    describe("changePilot", () => {
      const initialSquadPilot: SquadPilot = {
        squadPilotId: "initial pilot" as UniqueKey,
        pilotId: 1,
        pilotName: "initial pilot",
      } as SquadPilot;
      const anotherPilotToNotTouch: SquadPilot = {
        squadPilotId: "dont touch me" as UniqueKey,
        pilotId: 9,
        pilotName: "I should still be in squad pilots when you're done",
      } as SquadPilot;
      const initialSquad: Squad = {
        name: "test squad",
        faction: "Rebel Alliance",
        squadPilots: [initialSquadPilot, anotherPilotToNotTouch],
      };
      const pilotToSwitchTo: Pilot = {
        name: "new pilot",
        id: 2,
      } as Pilot;
      const changePilotDispatchAction: SquadsDispatchAction = {
        type: "changePilot",
        currentPilot: initialSquadPilot,
        newPilot: pilotToSwitchTo,
        squad: initialSquad,
      };
      it("gets new squadPilot, applies upgrades to it, removes invalidated upgrades, and returns final result", () => {
        const newSquadPilotStub: SquadPilot = {
          squadPilotId: "new pilot" as UniqueKey,
          pilotId: pilotToSwitchTo.id,
          pilotName: pilotToSwitchTo.name,
        } as SquadPilot;
        const upgradesFromOldPilotStub: Upgrade[] = [];
        const newPilotWithUpgradesSet: SquadPilot = {
          ...newSquadPilotStub,
          upgrades: [],
        };
        const unvalidatedSquadWithNewPilot: Squad = {
          ...initialSquad,
          squadPilots: [newPilotWithUpgradesSet, anotherPilotToNotTouch],
        };

        const validatedSquadStub = {
          ...unvalidatedSquadWithNewPilot,
          squadPilots: [...unvalidatedSquadWithNewPilot.squadPilots],
        };

        const depsConfig = getMockUpdateSquadDeps();
        depsConfig.getSquadPilotShipFn.mockReturnValue(newSquadPilotStub);
        depsConfig.getUpgradesOnSquadPilotFn.mockReturnValue(upgradesFromOldPilotStub);
        depsConfig.getSquadPilotWithMultipleUpgradesSetFn.mockReturnValue(newPilotWithUpgradesSet);
        depsConfig.getSquadWithInvalidUpgradesRemovedFn.mockReturnValue(validatedSquadStub);

        const result = getUpdatedSquad(initialSquad, changePilotDispatchAction, depsConfig);

        expect(depsConfig.getSquadPilotShipFn).toHaveBeenCalledWith(changePilotDispatchAction.newPilot);
        expect(depsConfig.getUpgradesOnSquadPilotFn).toHaveBeenCalledWith(changePilotDispatchAction.currentPilot);
        expect(depsConfig.getSquadPilotWithMultipleUpgradesSetFn).toHaveBeenLastCalledWith(
          upgradesFromOldPilotStub,
          newSquadPilotStub,
        );
        expect(depsConfig.getSquadWithInvalidUpgradesRemovedFn).toHaveBeenCalledWith(unvalidatedSquadWithNewPilot);
        expect(result).toBe(validatedSquadStub);
      });
    });
    describe("changeUpgrade", () => {
      const proTorpUpgrade: Upgrade = {
        name: "Proton Torpedoes Test",
        id: 8232,
        slot: "Torpedo",
      };
      const advTorpUpgrade: Upgrade = {
        name: "Advanced Torpedoes Test",
        id: 8231232132,
        slot: "Torpedo",
      };
      const vectoredCannonsUpgrade: Upgrade = {
        name: "Vectored Cannons test",
        id: 1238982,
        slot: "Configuration",
        standardized: true,
      };
      const generateSquadPilots = (
        amount: number,
        shipName: string,
        configUpgrade: Upgrade,
        torpUpgrade: Upgrade,
      ): SquadPilot[] => {
        const pilots: SquadPilot[] = [];
        for (let i = 1; i <= amount; i++) {
          const pilot: SquadPilot = {
            squadPilotId: `${shipName}${i}` as UniqueKey,
            upgrades: [
              {
                squadPilotUpgradeSlotKey: `Configuration1`,
                slot: "Configuration",
                upgrade: configUpgrade,
              },
              {
                squadPilotUpgradeSlotKey: `Torpedo1`,
                slot: "Torpedo",
                upgrade: torpUpgrade,
              },
            ],
            ship: shipName,
          } as SquadPilot;
          pilots.push(pilot);
        }
        return pilots;
      };
      const initialSquad: Squad = {
        name: "initial squad",
        faction: "Rebel Alliance",
        squadPilots: [
          ...generateSquadPilots(2, "x-wing", null, proTorpUpgrade),
          ...generateSquadPilots(2, "a-wing", null, proTorpUpgrade),
        ],
      };
      it("with non standardized upgrades, should change the upgrade on just the squadPilot provided, then return with invalid upgrades removed", () => {
        const initialSquadPilot = initialSquad.squadPilots[2];
        const dispatchChangeUpgradeAction: SquadsDispatchAction = {
          type: "changeUpgrade",
          squad: initialSquad,
          newlySelectedUpgrade: advTorpUpgrade,
          squadPilot: initialSquadPilot,
          upgradeSlot: initialSquadPilot.upgrades[1],
        };
        const squadPilotWithUpgradeChangedStub = {
          ...initialSquadPilot,
          upgrades: [
            initialSquadPilot.upgrades[0],
            {
              ...initialSquadPilot.upgrades[1],
              upgrade: advTorpUpgrade,
            },
          ],
        };
        const nonValidatedSquadWithNewUpgradeapplied: Squad = {
          ...initialSquad,
          squadPilots: [
            initialSquad.squadPilots[0],
            initialSquad.squadPilots[1],
            squadPilotWithUpgradeChangedStub,
            initialSquad.squadPilots[3],
          ],
        };
        const validatedSquad: Squad = {
          ...nonValidatedSquadWithNewUpgradeapplied,
        };
        const depsConfig = getMockUpdateSquadDeps();
        depsConfig.getSquadPilotWithUpgradeSetFn.mockReturnValue(squadPilotWithUpgradeChangedStub);
        depsConfig.getSquadWithInvalidUpgradesRemovedFn.mockReturnValue(validatedSquad);
        const result = getUpdatedSquad(initialSquad, dispatchChangeUpgradeAction, depsConfig);
        expect(depsConfig.getSquadPilotWithUpgradeSetFn).toHaveBeenCalledTimes(1);
        expect(depsConfig.getSquadPilotWithUpgradeSetFn).toHaveBeenCalledWith(
          dispatchChangeUpgradeAction.newlySelectedUpgrade,
          dispatchChangeUpgradeAction.upgradeSlot,
          dispatchChangeUpgradeAction.squadPilot,
        );
        expect(depsConfig.getSquadWithInvalidUpgradesRemovedFn).toHaveBeenCalledTimes(1);
        expect(depsConfig.getSquadWithInvalidUpgradesRemovedFn).toHaveBeenCalledWith(
          expect.objectContaining(nonValidatedSquadWithNewUpgradeapplied),
        );
        expect(result).toBe(validatedSquad);
      });
      it("with standardized upgrade, should change the upgrade for each squadpilot with same ship in the squad, then return with invalid upgrades removed", () => {
        const initialSquadPilot = initialSquad.squadPilots[2];
        const dispatchChangeUpgradeAction: SquadsDispatchAction = {
          type: "changeUpgrade",
          squad: initialSquad,
          newlySelectedUpgrade: vectoredCannonsUpgrade,
          squadPilot: initialSquadPilot,
          upgradeSlot: initialSquadPilot.upgrades[0],
        };
        const squadPilotWithUpgradeChangedStub = {
          ...initialSquadPilot,
          upgrades: [
            {
              ...initialSquadPilot.upgrades[0],
              upgrade: vectoredCannonsUpgrade,
            },
            initialSquadPilot.upgrades[1],
          ],
        };
        const otherAWingThatChangedStub = {
          ...initialSquad.squadPilots[3],
          ugrades: [
            {
              ...initialSquad.squadPilots[3].upgrades[0],
              upgrade: vectoredCannonsUpgrade,
            },
            initialSquad.squadPilots[3].upgrades[1],
          ],
        };
        const nonValidatedSquadWithNewUpgradeapplied: Squad = {
          ...initialSquad,
          squadPilots: [
            initialSquad.squadPilots[0],
            initialSquad.squadPilots[1],
            squadPilotWithUpgradeChangedStub,
            otherAWingThatChangedStub,
          ],
        };
        const validatedSquad: Squad = {
          ...nonValidatedSquadWithNewUpgradeapplied,
        };
        const depsConfig = getMockUpdateSquadDeps();
        depsConfig.getSquadPilotWithUpgradeSetFn.mockReturnValueOnce(squadPilotWithUpgradeChangedStub);
        depsConfig.getSquadPilotWithUpgradeSetFn.mockReturnValueOnce(otherAWingThatChangedStub);
        depsConfig.getSquadWithInvalidUpgradesRemovedFn.mockReturnValue(validatedSquad);

        const result = getUpdatedSquad(initialSquad, dispatchChangeUpgradeAction, depsConfig);

        expect(depsConfig.getSquadPilotWithUpgradeSetFn).toHaveBeenCalledTimes(2);
        expect(depsConfig.getSquadPilotWithUpgradeSetFn).toHaveBeenCalledWith(
          dispatchChangeUpgradeAction.newlySelectedUpgrade,
          dispatchChangeUpgradeAction.upgradeSlot,
          dispatchChangeUpgradeAction.squadPilot,
        );
        expect(depsConfig.getSquadPilotWithUpgradeSetFn).toHaveBeenCalledWith(
          dispatchChangeUpgradeAction.newlySelectedUpgrade,
          initialSquad.squadPilots[3].upgrades[0],
          initialSquad.squadPilots[3],
        );
        expect(depsConfig.getSquadWithInvalidUpgradesRemovedFn).toHaveBeenCalledTimes(1);
        expect(depsConfig.getSquadWithInvalidUpgradesRemovedFn).toHaveBeenCalledWith(
          expect.objectContaining(nonValidatedSquadWithNewUpgradeapplied),
        );
        expect(result).toBe(validatedSquad);
      });
    });
    describe("createNewSquad", () => {
      it("should return an empty faction squad", () => {
        const emptyFactionStub = {} as Squad;
        const depsConfig = getMockUpdateSquadDeps();
        depsConfig.getEmptyFactionSquadFn.mockReturnValue(emptyFactionStub);

        const result = getUpdatedSquad(
          initialSquadsState.squads[0],
          { type: "createNewSquad", squad: initialSquadsState.squads[0] },
          depsConfig,
        );

        expect(depsConfig.getEmptyFactionSquadFn).toHaveBeenCalledWith(initialSquadsState.squads[0].faction);
        expect(result).toBe(emptyFactionStub);
      });
    });
    describe("savedAsNewSquad", () => {
      it("should set id and name on squad that was saved", () => {
        const initialSquad: Squad = initialSquadsState.squads[0];
        const testId = "9009707";
        const testNewName = "name after saving";

        const expected = {
          ...initialSquad,
          id: testId,
          name: testNewName,
        };

        const result = getUpdatedSquad(initialSquad, {
          type: "savedAsNewSquad",
          newSquadId: testId,
          newSquadName: testNewName,
          squad: initialSquad,
        });
        expect(result).not.toBe(initialSquad);
        expect(result).toEqual(expected);
      });
    });
    describe("loadedSquad", () => {
      it("should return a new faction squad object populated with id, name, and squad pilots", () => {
        const initialSquad = initialSquadsState.squads[0];
        const testId = "987987";
        const testName = "loaded squad name";
        const testLoadedSquadPilots: SquadPilot[] = [
          {
            squadPilotId: "test pilot1 id" as UniqueKey,
          } as SquadPilot,
          {
            squadPilotId: "test pilot2 id" as UniqueKey,
          } as SquadPilot,
        ];
        const emptySquadStub = {
          id: null,
          faction: initialSquad.faction,
          name: `${initialSquad.faction} Squadron`,
          squadPilots: [],
        };
        const depsConfig = getMockUpdateSquadDeps();
        depsConfig.getEmptyFactionSquadFn.mockReturnValue(emptySquadStub);
        const expected: Squad = {
          ...emptySquadStub,
          id: testId,
          name: testName,
          squadPilots: testLoadedSquadPilots,
        };

        const result = getUpdatedSquad(
          initialSquad,
          {
            type: "loadedSquad",
            loadedSquadId: testId,
            loadedSquadName: testName,
            loadedSquadPilots: testLoadedSquadPilots,
            squad: initialSquad,
          },
          depsConfig,
        );

        expect(result).not.toBe(initialSquad);
        expect(result).toEqual(expected);
      });
    });
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
    it("removes upgrade from specified slot on provided squadPilot without doing anything else", () => {
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

      const removalReturnValueMock = { ...samplePilot, upgrades: [{ ...upgradeSlotToEmpty, upgrade: null }] };
      const upgradeRemovalMock = jest.fn().mockReturnValue(removalReturnValueMock);

      const result = getSquadPilotWithUpgradeSet(null, upgradeSlotToEmpty, samplePilot as SquadPilot, {
        getSquadPilotWithUpgradeRemovedFn: upgradeRemovalMock,
      });

      expect(upgradeRemovalMock).toHaveBeenLastCalledWith(upgradeSlotToEmpty, samplePilot);
      expect(result).toBe(removalReturnValueMock);
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

      const emptiedSecondCrewSlot = { ...secondCrewSlot, upgrade: null };
      const mockedPilotWithUpgradeUnequiped = {
        ...initialPilot,
        upgrades: [crewSlot, emptiedSecondCrewSlot, titleSlot],
      };
      const upgradeRemovalMock = jest
        .fn()
        .mockReturnValueOnce(initialPilot)
        .mockReturnValueOnce(mockedPilotWithUpgradeUnequiped);

      const result = getSquadPilotWithUpgradeSet(upgradeThatUnequips, titleSlot, initialPilot as SquadPilot, {
        getSquadPilotWithUpgradeRemovedFn: upgradeRemovalMock,
      });

      expect(upgradeRemovalMock).toHaveBeenCalledTimes(2);
      expect(upgradeRemovalMock).toHaveBeenLastCalledWith(secondCrewSlot, initialPilot);
      expect(result.upgrades[1]).toBe(emptiedSecondCrewSlot);
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
    it("should return a pilot with upgrades set for matching slots if matching slots are available", () => {
      const upgradesToSet: Upgrade[] = [
        { id: 1, name: "Upgrade 1", slot: "Astromech" },
        { id: 2, name: "Upgrade 2", slot: "Torpedo" },
      ];

      const astromechSlot = { squadPilotUpgradeSlotKey: "slot1", slot: "Astromech", upgrade: null };
      const torpedoSlot = { squadPilotUpgradeSlotKey: "slot2", slot: "Torpedo", upgrade: null };
      const squadPilot: Partial<SquadPilot> = {
        squadPilotId: "uniqueKey1" as UniqueKey,
        upgrades: [astromechSlot, torpedoSlot],
      };

      const pilotWithFirstUpgrade = {
        ...squadPilot,
        upgrades: [{ ...astromechSlot, upgrade: upgradesToSet[0] }, torpedoSlot],
      };
      const pilotWithBothUpgrades = {
        ...pilotWithFirstUpgrade,
        upgrades: [
          { ...astromechSlot, upgrade: upgradesToSet[0] },
          { ...torpedoSlot, upgrade: upgradesToSet[1] },
        ],
      };
      const getSquadPilotWithUpgradeSetMock = jest
        .fn()
        .mockReturnValueOnce(pilotWithFirstUpgrade)
        .mockReturnValueOnce(pilotWithBothUpgrades);

      const result = getSquadPilotWithMultipleUpgradesSet(upgradesToSet, squadPilot as SquadPilot, {
        getSquadPilotWithUpgradeSetFn: getSquadPilotWithUpgradeSetMock,
      });

      expect(getSquadPilotWithUpgradeSetMock).toHaveBeenCalledWith(
        upgradesToSet[0],
        squadPilot.upgrades[0],
        squadPilot,
      );
      expect(getSquadPilotWithUpgradeSetMock).toHaveBeenCalledWith(
        upgradesToSet[1],
        squadPilot.upgrades[1],
        pilotWithFirstUpgrade,
      );
      expect(getSquadPilotWithUpgradeSetMock).toHaveBeenCalledTimes(2);
      expect(result).toBe(pilotWithBothUpgrades);
    });

    it("should return a pilot with no upgrades changed if matching slots are not available", () => {
      const upgrades: Upgrade[] = [
        { id: 1, name: "Upgrade 1", slot: "Astromech" },
        { id: 2, name: "Upgrade 2", slot: "Torpedo" },
      ];

      const initialPilot: Partial<SquadPilot> = {
        squadPilotId: "uniqueKey2" as UniqueKey,
        upgrades: [
          { squadPilotUpgradeSlotKey: "slot1", slot: "Missile", upgrade: null },
          { squadPilotUpgradeSlotKey: "slot2", slot: "Cannon", upgrade: null },
        ],
      };

      const getSquadPilotWithUpgradeSetMock = jest.fn();

      const result = getSquadPilotWithMultipleUpgradesSet(upgrades, initialPilot as SquadPilot, {
        getSquadPilotWithUpgradeSetFn: getSquadPilotWithUpgradeSetMock,
      });

      expect(getSquadPilotWithUpgradeSetMock).not.toHaveBeenCalled();
      expect(result).toEqual(initialPilot);
    });

    it("should only set upgrades for available slots and leave others", () => {
      const upgradeAstromech = { id: 1, name: "upgrade astromech", slot: "Astromech" };
      const upgradeTorpedo1 = { id: 2, name: "Upgrade torpedo 1", slot: "Torpedo" };
      const upgradeCannon = { id: 3, name: "Upgrade cannon", slot: "Cannon" }; // shouldn't add because there are no cannon slots
      const upgradeTorpedo2 = { id: 4, name: "Upgrade torpedo 2", slot: "Torpedo" }; // shouldnt add because there is only one slot available for torpedoes

      const upgradesToSet: Upgrade[] = [upgradeAstromech, upgradeTorpedo1, upgradeCannon, upgradeTorpedo2];

      const slotAstromech = { squadPilotUpgradeSlotKey: "slot1", slot: "Astromech", upgrade: null };
      const slotMissle = { squadPilotUpgradeSlotKey: "slot2", slot: "Missile", upgrade: null };
      const slotTorpedo = { squadPilotUpgradeSlotKey: "slot3", slot: "Torpedo", upgrade: null };

      const initialPilot: Partial<SquadPilot> = {
        squadPilotId: "uniqueKey3" as UniqueKey,
        upgrades: [slotAstromech, slotMissle, slotTorpedo],
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

      const result = getSquadPilotWithMultipleUpgradesSet(upgradesToSet, initialPilot as SquadPilot, {
        getSquadPilotWithUpgradeSetFn: getSquadPilotWithUpgradeSetMock,
      });

      expect(getSquadPilotWithUpgradeSetMock).toHaveBeenCalledTimes(2);
      expect(getSquadPilotWithUpgradeSetMock).toHaveBeenCalledWith(upgradeAstromech, slotAstromech, expect.anything());
      expect(getSquadPilotWithUpgradeSetMock).toHaveBeenCalledWith(upgradeTorpedo1, slotTorpedo, expect.anything());
      expect(result).toEqual({
        ...initialPilot,
        upgrades: [
          { ...slotAstromech, upgrade: upgradeAstromech },
          slotMissle,
          { ...slotTorpedo, upgrade: upgradeTorpedo1 },
        ],
      });
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

      const result = getSquadPilotWithMultipleUpgradesSet(
        upgradesToAdd,
        initialSquadPilotWithNoAstromechSlots as SquadPilot,
        {
          getSquadPilotWithUpgradeSetFn: getSquadPilotWithUpgradeSetMock,
        },
      );

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
      expect(result).toEqual({
        ...initialSquadPilotWithNoAstromechSlots,
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
            upgrade: titleThatConfersAstromech,
            parentSquadPilotUpgradeSlotKey: null,
          },
          {
            squadPilotUpgradeSlotKey: "Astromech1",
            slot: "Astromech",
            upgrade: astromechUpgrade,
            parentSquadPilotUpgradeSlotKey: null,
          },
        ],
      });
    });
  });
  describe("getSquadWithInvalidUpgradesRemoved", () => {
    const getMockDeps = () => {
      return {
        getSquadPilotWithUpgradeRemovedFn: jest.fn(),
        isUpgradeAllowedFn: jest.fn().mockReturnValue(true),
        maxUpgradeExceededFn: jest.fn().mockReturnValue(false),
      };
    };

    it("should not change squad when no upgrades are invalid", () => {
      // arrange
      const squad: Squad = {
        name: "test",
        faction: "Rebel Alliance",
        squadPilots: [
          {
            squadPilotId: undefined,
            upgrades: [
              {
                squadPilotUpgradeSlotKey: "",
                slot: "Torpedo",
                upgrade: {
                  name: "proton torpedo",
                  id: 3,
                  slot: "Torpedo",
                },
              },
              {
                squadPilotUpgradeSlotKey: "",
                slot: "Modification",
                upgrade: undefined,
              },
              {
                squadPilotUpgradeSlotKey: "",
                slot: "Configuration",
                upgrade: undefined,
              },
            ],
          } as SquadPilot,
          {
            squadPilotId: undefined,
            upgrades: [
              {
                squadPilotUpgradeSlotKey: "",
                slot: "Torpedo",
                upgrade: {
                  name: "advanced proton torpedo",
                  id: 4,
                  slot: "Torpedo",
                },
              },
              {
                squadPilotUpgradeSlotKey: "",
                slot: "Modification",
                upgrade: undefined,
              },
              {
                squadPilotUpgradeSlotKey: "",
                slot: "Configuration",
                upgrade: undefined,
              },
            ],
          } as SquadPilot,
        ],
      };

      const depsConfig = getMockDeps();

      // act
      const result = getSquadWithInvalidUpgradesRemoved(squad, depsConfig);

      //assert
      expect(depsConfig.getSquadPilotWithUpgradeRemovedFn).not.toHaveBeenCalled();
      expect(result).toEqual(squad);
    });
    it("should remove invalid upgrade when isUpgradeAllowed returns false", () => {
      const initialSquadPilot: SquadPilot = {
        squadPilotId: undefined,
        upgrades: [
          {
            squadPilotUpgradeSlotKey: "",
            slot: "Torpedo",
            upgrade: {
              name: "proton torpedo",
              id: 3,
              slot: "Torpedo",
            },
          },
        ],
      } as SquadPilot;

      const initialSquad: Squad = {
        name: "test",
        faction: "Rebel Alliance",
        squadPilots: [initialSquadPilot],
      };

      const squadPilotWithUpgradeRemoved: SquadPilot = {
        ...initialSquadPilot,
        upgrades: [
          {
            squadPilotUpgradeSlotKey: "",
            slot: "Torpedo",
            upgrade: null,
          },
        ],
      };

      const squadWithUpgradeRemoved: Squad = {
        ...initialSquad,
        squadPilots: [squadPilotWithUpgradeRemoved],
      };

      const depsConfig = getMockDeps();
      depsConfig.getSquadPilotWithUpgradeRemovedFn.mockReturnValue(squadPilotWithUpgradeRemoved);
      depsConfig.isUpgradeAllowedFn.mockReturnValueOnce(false);

      const result = getSquadWithInvalidUpgradesRemoved(initialSquad, depsConfig);

      expect(depsConfig.getSquadPilotWithUpgradeRemovedFn).toHaveBeenCalledTimes(1);
      expect(result).toEqual(squadWithUpgradeRemoved);
    });
    it("should remove invalid upgrade when maxUpgradeExceeded returns true", () => {
      const initialSquadPilot: SquadPilot = {
        squadPilotId: undefined,
        upgrades: [
          {
            squadPilotUpgradeSlotKey: "",
            slot: "Torpedo",
            upgrade: {
              name: "proton torpedo",
              id: 3,
              slot: "Torpedo",
            },
          },
        ],
      } as SquadPilot;

      const initialSquad: Squad = {
        name: "test",
        faction: "Rebel Alliance",
        squadPilots: [initialSquadPilot],
      };

      const squadPilotWithUpgradeRemoved: SquadPilot = {
        ...initialSquadPilot,
        upgrades: [
          {
            squadPilotUpgradeSlotKey: "",
            slot: "Torpedo",
            upgrade: null,
          },
        ],
      };

      const squadWithUpgradeRemoved: Squad = {
        ...initialSquad,
        squadPilots: [squadPilotWithUpgradeRemoved],
      };

      const depsConfig = getMockDeps();
      depsConfig.getSquadPilotWithUpgradeRemovedFn.mockReturnValue(squadPilotWithUpgradeRemoved);
      depsConfig.maxUpgradeExceededFn.mockReturnValueOnce(true);

      const result = getSquadWithInvalidUpgradesRemoved(initialSquad, depsConfig);

      expect(depsConfig.getSquadPilotWithUpgradeRemovedFn).toHaveBeenCalledTimes(1);
      expect(result).toEqual(squadWithUpgradeRemoved);
    });
    it("should remove only remove invalid upgrade", () => {
      const initialSquadPilot: SquadPilot = {
        squadPilotId: undefined,
        upgrades: [
          {
            squadPilotUpgradeSlotKey: "Torpedo1",
            slot: "Torpedo",
            upgrade: {
              name: "proton torpedo",
              id: 3,
              slot: "Torpedo",
            },
          },
          {
            squadPilotUpgradeSlotKey: "Crew1",
            slot: "Crew",
            upgrade: {
              name: "maul",
              id: 3,
              slot: "Crew",
            },
          },
        ],
      } as SquadPilot;

      const initialSquad: Squad = {
        name: "test",
        faction: "Rebel Alliance",
        squadPilots: [initialSquadPilot],
      };

      const squadPilotWithUpgradeRemoved: SquadPilot = {
        ...initialSquadPilot,
        upgrades: [
          {
            squadPilotUpgradeSlotKey: "",
            slot: "Torpedo",
            upgrade: {
              name: "proton torpedo",
              id: 3,
              slot: "Torpedo",
            },
          },
          {
            squadPilotUpgradeSlotKey: "Crew1",
            slot: "Crew",
            upgrade: null,
          },
        ],
      };

      const squadWithUpgradeRemoved: Squad = {
        ...initialSquad,
        squadPilots: [squadPilotWithUpgradeRemoved],
      };

      const depsConfig = getMockDeps();
      depsConfig.getSquadPilotWithUpgradeRemovedFn.mockReturnValue(squadPilotWithUpgradeRemoved);
      depsConfig.maxUpgradeExceededFn.mockReturnValueOnce(true);

      const result = getSquadWithInvalidUpgradesRemoved(initialSquad, depsConfig);

      expect(depsConfig.getSquadPilotWithUpgradeRemovedFn).toHaveBeenCalledTimes(1);
      expect(depsConfig.getSquadPilotWithUpgradeRemovedFn).toHaveBeenCalledWith(
        initialSquadPilot.upgrades[1],
        initialSquadPilot,
      );
      expect(result).toEqual(squadWithUpgradeRemoved);
    });
    it("should remove invalid upgrades from multiple pilots", () => {
      const firstPilotUpgrade: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Torpedo1",
        slot: "Torpedo",
        upgrade: {
          name: "Proton Torpedo",
          id: 12312,
          slot: "Torpedo",
        },
      };
      const firstPilot: SquadPilot = {
        squadPilotId: "pilot 1",
        upgrades: [firstPilotUpgrade],
      } as SquadPilot;

      const secondPilotUpgrade: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Missile1",
        slot: "Missile",
        upgrade: {
          name: "Discord Missiles",
          id: 234324,
          slot: "Missile",
        },
      };
      const secondPilot: SquadPilot = {
        squadPilotId: "pilot 2",
        upgrades: [secondPilotUpgrade],
      } as SquadPilot;

      const initialSquad: Squad = {
        name: "test",
        faction: "Rebel Alliance",
        squadPilots: [firstPilot, secondPilot],
      };

      const firstPilotWithUpgradeRemoved = {
        ...firstPilot,
        upgrades: [
          {
            ...firstPilotUpgrade,
            upgrade: null,
          },
        ],
      };

      const secondPilotWithUpgradeRemoved = {
        ...secondPilot,
        upgrades: [
          {
            ...secondPilotUpgrade,
            upgrade: null,
          },
        ],
      };

      const squadAfterRemovingBadUpgrades = {
        ...initialSquad,
        squadPilots: [firstPilotWithUpgradeRemoved, secondPilotWithUpgradeRemoved],
      };

      const depsConfig = getMockDeps();
      depsConfig.isUpgradeAllowedFn.mockReturnValue(false);
      depsConfig.getSquadPilotWithUpgradeRemovedFn.mockReturnValueOnce(secondPilotWithUpgradeRemoved);
      depsConfig.getSquadPilotWithUpgradeRemovedFn.mockReturnValueOnce(firstPilotWithUpgradeRemoved);

      const result = getSquadWithInvalidUpgradesRemoved(initialSquad, depsConfig);

      expect(depsConfig.getSquadPilotWithUpgradeRemovedFn).toHaveBeenCalledTimes(2);
      expect(depsConfig.getSquadPilotWithUpgradeRemovedFn).toHaveBeenNthCalledWith(
        1,
        secondPilot.upgrades[0],
        secondPilot,
      );
      expect(depsConfig.getSquadPilotWithUpgradeRemovedFn).toHaveBeenNthCalledWith(
        2,
        firstPilot.upgrades[0],
        firstPilot,
      );
      expect(result.squadPilots[0]).toBe(firstPilotWithUpgradeRemoved);
      expect(result.squadPilots[1]).toBe(secondPilotWithUpgradeRemoved);
      expect(result).toEqual(squadAfterRemovingBadUpgrades);
    });
    it("should remove invalid upgrades (max exceeded in particular) from the more recently added pilots in squad first", () => {
      const upgradeThatIsOverLimit: Upgrade = {
        name: "Discord Missiles",
        id: 12312,
        slot: "Missle",
      };
      const firstPilotUpgrade: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Missile1",
        slot: "Missile",
        upgrade: upgradeThatIsOverLimit,
      };
      const firstPilot: SquadPilot = {
        squadPilotId: "pilot 1",
        upgrades: [firstPilotUpgrade],
      } as SquadPilot;

      const secondPilotUpgrade: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Missile1",
        slot: "Missile",
        upgrade: upgradeThatIsOverLimit,
      };
      const secondPilot: SquadPilot = {
        squadPilotId: "pilot 2",
        upgrades: [secondPilotUpgrade],
      } as SquadPilot;

      const initialSquad: Squad = {
        name: "test",
        faction: "Rebel Alliance",
        squadPilots: [firstPilot, secondPilot],
      };

      const secondPilotWithUpgradeRemoved = {
        ...secondPilot,
        upgrades: [
          {
            ...secondPilotUpgrade,
            upgrade: null,
          },
        ],
      };

      const squadAfterRemovingBadUpgrades = {
        ...initialSquad,
        squadPilots: [firstPilot, secondPilotWithUpgradeRemoved],
      };

      const depsConfig = getMockDeps();
      depsConfig.maxUpgradeExceededFn.mockReturnValueOnce(true);
      depsConfig.getSquadPilotWithUpgradeRemovedFn.mockReturnValueOnce(secondPilotWithUpgradeRemoved);

      const result = getSquadWithInvalidUpgradesRemoved(initialSquad, depsConfig);

      expect(depsConfig.getSquadPilotWithUpgradeRemovedFn).toHaveBeenCalledTimes(1);
      expect(depsConfig.getSquadPilotWithUpgradeRemovedFn).toHaveBeenCalledWith(secondPilot.upgrades[0], secondPilot);
      expect(result.squadPilots[0]).toBe(firstPilot);
      expect(result.squadPilots[1]).toBe(secondPilotWithUpgradeRemoved);
      expect(result).toEqual(squadAfterRemovingBadUpgrades);
    });
    it("should remove upgrades that become invalid after removing pre-requisite upgrades", () => {
      const upgradeThatWillGetRemovedInitially: Upgrade = {
        name: "required upgrade (Ezra)",
        id: 12312,
        slot: "Gunner",
      };
      const upgradeThatRequiresTheOtherOne: Upgrade = {
        name: "dependent upgrade (Maul)",
        id: 1231234,
        slot: "Crew",
      };
      const upgradeSlotThatWillBeEmptied: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Gunner1",
        slot: "Gunner",
        upgrade: upgradeThatWillGetRemovedInitially,
      };
      const firstPilot: SquadPilot = {
        squadPilotId: "pilot 1",
        upgrades: [upgradeSlotThatWillBeEmptied],
      } as SquadPilot;

      const dependentUpgradeSlot: SquadPilotUpgradeSlot = {
        squadPilotUpgradeSlotKey: "Crew1",
        slot: "Crew",
        upgrade: upgradeThatRequiresTheOtherOne,
      };
      const secondPilot: SquadPilot = {
        squadPilotId: "pilot 2",
        upgrades: [dependentUpgradeSlot],
      } as SquadPilot;

      const initialSquad: Squad = {
        name: "test",
        faction: "Rebel Alliance",
        squadPilots: [firstPilot, secondPilot],
      };

      const firstPilotWithUpgradeRemoved = {
        ...firstPilot,
        upgrades: [
          {
            ...upgradeSlotThatWillBeEmptied,
            upgrade: null,
          },
        ],
      };
      const secondPilotWithUpgradeRemoved = {
        ...secondPilot,
        upgrades: [
          {
            ...dependentUpgradeSlot,
            upgrade: null,
          },
        ],
      };

      const squadAfterRemovingBadUpgrades = {
        ...initialSquad,
        squadPilots: [firstPilotWithUpgradeRemoved, secondPilotWithUpgradeRemoved],
      };

      const depsConfig = getMockDeps();
      depsConfig.maxUpgradeExceededFn.mockImplementation((upgradeRecord: Upgrade, squad: Squad) => {
        if (upgradeRecord === upgradeSlotThatWillBeEmptied.upgrade) {
          return true;
        }
        return false;
      });
      depsConfig.isUpgradeAllowedFn.mockImplementation(
        (upgradeSlot: SquadPilotUpgradeSlot, upgradeRecord: Upgrade, squadPilot: SquadPilot, squad: Squad): boolean => {
          if (squad.squadPilots[0].upgrades[0].upgrade === upgradeSlotThatWillBeEmptied.upgrade) {
            return true;
          }
          // second upgrade will no longer be allowed once first one is gone
          return false;
        },
      );
      depsConfig.getSquadPilotWithUpgradeRemovedFn.mockImplementation(
        (upgradeSlot: SquadPilotUpgradeSlot, squadPilot: SquadPilot): SquadPilot => {
          return {
            ...squadPilot,
            upgrades: squadPilot.upgrades.map((squadPilotUpgrade): SquadPilotUpgradeSlot => {
              return {
                ...squadPilotUpgrade,
                upgrade: null,
              };
            }),
          };
        },
      );

      const result = getSquadWithInvalidUpgradesRemoved(initialSquad, depsConfig);

      expect(depsConfig.getSquadPilotWithUpgradeRemovedFn).toHaveBeenCalledTimes(2);
      expect(depsConfig.getSquadPilotWithUpgradeRemovedFn).toHaveBeenNthCalledWith(
        1,
        firstPilot.upgrades[0],
        firstPilot,
      );
      expect(depsConfig.getSquadPilotWithUpgradeRemovedFn).toHaveBeenNthCalledWith(
        2,
        secondPilot.upgrades[0],
        secondPilot,
      );
      expect(result.squadPilots[0]).toEqual(firstPilotWithUpgradeRemoved);
      expect(result.squadPilots[1]).toEqual(secondPilotWithUpgradeRemoved);
      expect(result).toEqual(squadAfterRemovingBadUpgrades);
    });
  });
});
