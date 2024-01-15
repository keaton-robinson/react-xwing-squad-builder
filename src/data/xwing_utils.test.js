const xwing_utils = require('./xwing_utils.js');

describe('isNotNullOrUndefined', () => {
    it.each([
        [null, false],
        [undefined, false],
        [0, true],
        [1, true],
        ["", true],
        [false, true]
    ])("when input is `%s`, expect `%s`", (input, expected) => {
        expect(xwing_utils.isNotNullOrUndefined(input)).toBe(expected);
    })
})

describe('getShipBaseSize', () => {
    const hugeShip = { huge: !0, large: 0, medium: 0 }
    const largeShip = { huge: 0, large: !0, medium: 0 }
    const mediumShip = { huge: 0, large: 0, medium: !0 }
    const smallShip = { huge: 0, large: 0, medium: 0 };
    const dumbShipWithHugeAndLargeMarkedTrue = { huge: !0, large: !0, medium: 0 }

    it.each([
        [hugeShip, xwing_utils.shipBaseSizes.Huge], // data uses !0 rather than true to represent ship size
        [largeShip, xwing_utils.shipBaseSizes.Large],
        [mediumShip, xwing_utils.shipBaseSizes.Medium],
        [smallShip, xwing_utils.shipBaseSizes.Small],
        [dumbShipWithHugeAndLargeMarkedTrue, xwing_utils.shipBaseSizes.Huge] // not a huge fan of this behavior, but that's what it does right now. I don't think anything really expects this
    ])("when ship is `%s`, expect `%s`", (ship, expectedResult) => {
        expect(xwing_utils.getShipBaseSize(ship)).toBe(expectedResult)
    });
})

describe('getUpgradeCost', () => {
    it('when no point cost or points array, throws exception', () => {
        const upgradeWithNoPointCostAtAll = { points: undefined, pointsarray: undefined };

        expect(() => xwing_utils.getUpgradeCost(upgradeWithNoPointCostAtAll)).toThrow('Error calculating points on upgrade');
    })
    it('when static point cost defined, returns static point cost', () => {
        const upgradeWithStaticPointCost = { points:  8 }
        const expectedReturnValue = 8;

        expect(xwing_utils.getUpgradeCost(upgradeWithStaticPointCost)).toBe(expectedReturnValue);
    })
    describe('variable point cost based on pilot skill', () => {
        const upgradeWithVariableInitPoints = {
            variableinit: !0,
            pointsarray: [0,1,2,3,4,5,6,7,8,9,10]
        };
        const pilotWithSkill0 = { skill: 0};
        const pilotWithSkill1 = { skill: 1};
        const pilotWithSkill2 = { skill: 2}
        const pilotWithSkill3 = { skill: 3}
        const pilotWithSkill4 = { skill: 4}
        const pilotWithSkill5 = { skill: 5}
        const pilotWithSkill6 = { skill: 6}
        const pilotWithSkillTen = { skill: 10 };


        it.each([
            [pilotWithSkill0, 0],
            [pilotWithSkill1, 1],
            [pilotWithSkill6, 6],
            [pilotWithSkillTen, 10]
        ])("when pilot is %s, return point cost from index %s", (pilot, returnValue) => {
            expect(xwing_utils.getUpgradeCost(upgradeWithVariableInitPoints, pilot)).toBe(returnValue);
        });
    })
    describe('variable point cost based on ship base size', () => {
        const upgradeWithVariableBasePoints = {
            variablebase: true,
            // Example point values for each base size 

            
            pointsarray: [4, 6, 8, 10] 
        };
        const pilotWithHugeShip = { pilotShip: { huge: true } };
        const pilotWithLargeShip = { pilotShip: { large: true } };
        const pilotWithMediumShip = { pilotShip: { medium: true } };
        const pilotWithSmallShip = { pilotShip: {} }; // Assuming small as default
    
        it.each([
            [pilotWithHugeShip, 10],
            [pilotWithLargeShip, 8],
            [pilotWithMediumShip, 6],
            [pilotWithSmallShip, 4]
        ])("when pilot has %s ship, returns point cost %s", (pilot, returnValue) => {
            expect(xwing_utils.getUpgradeCost(upgradeWithVariableBasePoints, pilot)).toBe(returnValue);
        });
    });
    
    describe('variable point cost based on agility', () => {
        const upgradeWithVariableAgilityPoints = {
            variableagility: true,
            pointsarray: [3, 5, 6, 9] // Example point values for each agility level
        };
        const pilotWithAgility0 = { pilotShip: { agility: 0 } };
        const pilotWithAgility1 = { pilotShip: { agility: 1 } };
        const pilotWithAgility2 = { pilotShip: { agility: 2 } };
        const pilotWithAgility3 = { pilotShip: { agility: 3 } };
    
        it.each([
            [pilotWithAgility0, 3],
            [pilotWithAgility1, 5],
            [pilotWithAgility2, 6],
            [pilotWithAgility3, 9]
        ])("when pilot's ship has agility %s, returns point cost %s", (pilot, returnValue) => {
            expect(xwing_utils.getUpgradeCost(upgradeWithVariableAgilityPoints, pilot)).toBe(returnValue);
        });
    });
    
})

