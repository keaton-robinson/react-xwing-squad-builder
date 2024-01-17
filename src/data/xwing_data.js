"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bearings = exports.difficulties = exports.upgradeRules = exports.upgrades = exports.sloticon = exports.slots = exports.pilotRules = exports.pilots = exports.ships = exports.factionNames = void 0;
//need this because coffeescript generated this on yasb's end, and I'm not using coffeescript currently
var __indexOf = [].indexOf || function (a) {
    for (var b = 0, c = this.length; b < c; b++)
        if (b in this && this[b] === a)
            return b;
    return -1;
};
var factionNames = {
    "Rebel Alliance": "Rebel Alliance",
    "Galactic Empire": "Galactic Empire",
    "Scum and Villainy": "Scum and Villainy",
    Resistance: "Resistance",
    "First Order": "First Order",
    "Galactic Republic": "Galactic Republic",
    "Separatist Alliance": "Separatist Alliance"
};
exports.factionNames = factionNames;
var ships = {
    "X-Wing": {
        name: "X-Wing",
        xws: "T-65 X-wing",
        factions: ["Rebel Alliance"],
        attack: 3,
        agility: 2,
        hull: 4,
        shields: 2,
        actions: ["Focus", "Lock", "Barrel Roll"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0, 0, 0],
            [2, 2, 2, 2, 2, 0, 0, 0, 3, 3],
            [0, 0, 2, 0, 0, 3, 0, 0, 0, 0]
        ],
        autoequip: ["Servomotor S-Foils"]
    },
    "Y-Wing": {
        name: "Y-Wing",
        xws: "BTL-A4 Y-wing",
        factions: ["Rebel Alliance", "Scum and Villainy"],
        attack: 2,
        agility: 1,
        hull: 6,
        shields: 2,
        actions: ["Focus", "Lock", "R-Barrel Roll", "R-Reload"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [2, 2, 1, 2, 2, 0],
            [3, 2, 2, 2, 3, 0],
            [0, 0, 3, 0, 0, 3]
        ]
    },
    "A-Wing": {
        name: "A-Wing",
        xws: "RZ-1 A-wing",
        factions: ["Rebel Alliance"],
        attack: 2,
        agility: 3,
        hull: 2,
        shields: 2,
        keyword: ["Vectored Thrusters"],
        actions: ["Focus", "Evade", "Lock", "Barrel Roll", "Boost"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 2, 0, 0, 0],
            [1, 1, 1, 1, 1, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 3, 3],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 3, 0, 0]
        ]
    },
    "YT-1300": {
        name: "YT-1300",
        xws: "Modified YT-1300 Light Freighter",
        factions: ["Rebel Alliance"],
        attackdt: 3,
        agility: 1,
        hull: 8,
        shields: 5,
        keyword: ["Freighter"],
        actions: ["Focus", "Lock", "Rotate Arc", "R-Boost"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 1, 2, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 3, 3],
            [0, 0, 2, 0, 0, 3, 0, 0]
        ],
        large: !0
    },
    "Customized YT-1300": {
        name: "Customized YT-1300",
        canonical_name: "Customized YT-1300",
        xws: "Customized YT-1300 Light Freighter",
        factions: ["Scum and Villainy"],
        attackdt: 2,
        agility: 1,
        hull: 8,
        shields: 3,
        keyword: ["Freighter"],
        actions: ["Focus", "Lock", "Rotate Arc", "R-Boost"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 3, 3],
            [0, 0, 2, 0, 0, 3, 0, 0]
        ],
        large: !0
    },
    "TIE Fighter": {
        name: "TIE Fighter",
        xws: "TIE/ln Fighter",
        factions: ["Rebel Alliance", "Galactic Empire"],
        attack: 2,
        agility: 3,
        hull: 3,
        shields: 0,
        actions: ["Focus", "Barrel Roll", "Evade"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 2, 0],
            [2, 1, 1, 1, 2, 0],
            [2, 2, 1, 2, 2, 3],
            [0, 0, 2, 0, 0, 3],
            [0, 0, 2, 0, 0, 0]
        ]
    },
    "TIE Advanced": {
        name: "TIE Advanced",
        xws: "TIE Advanced x1",
        factions: ["Galactic Empire"],
        attack: 2,
        agility: 3,
        hull: 3,
        shields: 2,
        actions: ["Focus", "R-> Barrel Roll", "Lock", "Barrel Roll"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 2, 1, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0, 3, 3],
            [0, 0, 2, 0, 0, 3, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "TIE Interceptor": {
        name: "TIE Interceptor",
        icon: "tieinterceptor",
        xws: "TIE/IN Interceptor",
        factions: ["Galactic Empire"],
        attack: 3,
        agility: 3,
        hull: 3,
        shields: 0,
        keyword: ["Autothrusters"],
        actions: ["Focus", "Barrel Roll", "Boost", "Evade"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 2, 0, 0, 0],
            [1, 1, 1, 1, 1, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 3, 3],
            [0, 0, 1, 0, 0, 3, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0]
        ]
    },
    "Firespray-31": {
        name: "Firespray-31",
        xws: "Firespray-class Patrol Craft",
        factions: ["Scum and Villainy", "Separatist Alliance"],
        attack: 3,
        attackb: 3,
        agility: 2,
        hull: 6,
        shields: 4,
        medium: !0,
        actions: ["Focus", "Lock", "Boost", "R-Reinforce"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0, 0, 0],
            [0, 2, 1, 2, 0, 0, 0, 0, 3, 3],
            [0, 0, 2, 0, 0, 3, 0, 0, 0, 0]
        ]
    },
    "HWK-290": {
        name: "HWK-290",
        xws: "HWK-290 Light Freighter",
        factions: ["Rebel Alliance", "Scum and Villainy"],
        attackt: 2,
        agility: 2,
        hull: 3,
        shields: 2,
        keyword: ["Freighter"],
        actions: ["Focus", "R-> Rotate Arc", "Lock", "R-> Rotate Arc", "Rotate Arc", "R-Boost", "R-Jam"],
        maneuvers: [
            [0, 0, 3, 0, 0],
            [0, 1, 1, 1, 0],
            [2, 2, 1, 2, 2],
            [3, 2, 1, 2, 3],
            [0, 0, 2, 0, 0]
        ]
    },
    "Lambda-Class Shuttle": {
        name: "Lambda-Class Shuttle",
        xws: "Lambda-class T-4a Shuttle",
        factions: ["Galactic Empire"],
        attack: 3,
        attackb: 2,
        agility: 1,
        hull: 6,
        shields: 4,
        actions: ["Focus", "Coordinate", "Reinforce", "R-Jam"],
        maneuvers: [
            [0, 0, 3, 0, 0],
            [0, 1, 1, 1, 0],
            [3, 2, 1, 2, 3],
            [0, 3, 2, 3, 0]
        ],
        large: !0
    },
    "B-Wing": {
        name: "B-Wing",
        xws: "A/SF-01 B-wing",
        factions: ["Rebel Alliance"],
        attack: 3,
        agility: 1,
        hull: 4,
        shields: 4,
        actions: ["Focus", "R-> Barrel Roll", "Lock", "Barrel Roll"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 1, 1, 1, 3, 0, 0, 0, 3, 3],
            [2, 2, 1, 2, 2, 3, 0, 0, 0, 0],
            [0, 3, 1, 3, 0, 0, 0, 0, 0, 0],
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "TIE Bomber": {
        name: "TIE Bomber",
        xws: "TIE/sa Bomber",
        factions: ["Galactic Empire"],
        attack: 2,
        agility: 2,
        hull: 6,
        shields: 0,
        actions: ["Focus", "Lock", "Barrel Roll", "R-> Lock", "R-Reload"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0],
            [0, 2, 1, 2, 0, 0],
            [2, 1, 1, 1, 2, 0],
            [2, 2, 1, 2, 2, 3],
            [0, 0, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 3]
        ]
    },
    "Z-95 Headhunter": {
        name: "Z-95 Headhunter",
        xws: "Z-95-AF4 Headhunter",
        factions: ["Rebel Alliance", "Scum and Villainy"],
        attack: 2,
        agility: 2,
        hull: 2,
        shields: 2,
        actions: ["Focus", "Lock", "R-Barrel Roll"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0],
            [0, 2, 1, 2, 0, 0],
            [2, 1, 1, 1, 2, 0],
            [2, 2, 1, 2, 2, 3],
            [0, 0, 2, 0, 0, 3]
        ]
    },
    "TIE Defender": {
        name: "TIE Defender",
        xws: "TIE/D Defender",
        factions: ["Galactic Empire"],
        attack: 3,
        agility: 3,
        hull: 3,
        shields: 4,
        actions: ["Focus", "Evade", "Lock", "Barrel Roll", "Boost"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0],
            [3, 1, 0, 1, 3, 0],
            [3, 2, 1, 2, 3, 3],
            [2, 2, 1, 2, 2, 0],
            [0, 0, 1, 0, 0, 2],
            [0, 0, 1, 0, 0, 0]
        ]
    },
    "E-Wing": {
        name: "E-Wing",
        xws: "E-wing",
        factions: ["Rebel Alliance"],
        attack: 3,
        agility: 3,
        hull: 3,
        shields: 3,
        actions: ["Focus", "Evade", "Lock", "Barrel Roll", "R-> Lock", "Boost", "R-> Lock"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [3, 1, 1, 1, 3, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 3, 3],
            [0, 0, 1, 0, 0, 3, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0]
        ]
    },
    "TIE Phantom": {
        name: "TIE Phantom",
        xws: "TIE/ph Phantom",
        factions: ["Galactic Empire"],
        attack: 3,
        agility: 2,
        hull: 3,
        shields: 2,
        actions: ["Focus", "Evade", "Barrel Roll", "Cloak"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0],
            [2, 2, 0, 2, 2, 0],
            [2, 1, 1, 1, 2, 0],
            [2, 2, 1, 2, 2, 3],
            [0, 0, 2, 0, 0, 3]
        ]
    },
    "YT-2400": {
        name: "YT-2400",
        xws: "YT-2400 Light Freighter",
        factions: ["Rebel Alliance"],
        attackdt: 4,
        agility: 2,
        hull: 6,
        shields: 4,
        keyword: ["Freighter"],
        actions: ["Focus", "Lock", "R-Barrel Roll", "Rotate Arc"],
        large: !0,
        maneuvers: [
            [0, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0],
            [2, 2, 1, 2, 2, 0],
            [2, 2, 2, 2, 2, 0],
            [0, 0, 2, 0, 0, 3]
        ]
    },
    "VT-49 Decimator": {
        name: "VT-49 Decimator",
        xws: "VT-49 Decimator",
        factions: ["Galactic Empire"],
        attackdt: 3,
        agility: 0,
        hull: 12,
        shields: 4,
        actions: ["Focus", "Lock", "Reinforce", "Rotate Arc", "R-Coordinate"],
        large: !0,
        maneuvers: [
            [0, 0, 0, 0, 0, 0],
            [3, 1, 1, 1, 3, 0],
            [2, 2, 1, 2, 2, 0],
            [2, 2, 2, 2, 2, 0],
            [0, 0, 2, 0, 0, 0]
        ]
    },
    StarViper: {
        name: "StarViper",
        xws: "StarViper-class Attack Platform",
        factions: ["Scum and Villainy"],
        attack: 3,
        agility: 3,
        hull: 4,
        shields: 1,
        actions: ["Focus", "Lock", "Barrel Roll", "R-> Focus", "Boost", "R-> Focus"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0],
            [0, 2, 1, 2, 0, 0, 3, 3],
            [0, 0, 2, 0, 0, 0, 0, 0]
        ]
    },
    "M3-A Interceptor": {
        name: "M3-A Interceptor",
        xws: "M3-A Interceptor",
        factions: ["Scum and Villainy"],
        attack: 2,
        agility: 3,
        hull: 3,
        shields: 1,
        actions: ["Focus", "Evade", "Lock", "Barrel Roll"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0],
            [2, 1, 0, 1, 2, 0],
            [2, 2, 1, 2, 2, 0],
            [0, 2, 1, 2, 0, 3],
            [0, 0, 2, 0, 0, 0],
            [0, 0, 2, 0, 0, 3]
        ]
    },
    Aggressor: {
        name: "Aggressor",
        xws: "Aggressor Assault Fighter",
        factions: ["Scum and Villainy"],
        attack: 3,
        agility: 3,
        hull: 5,
        shields: 3,
        actions: ["Calculate", "Evade", "Lock", "Boost"],
        medium: !0,
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 3, 3],
            [0, 0, 2, 0, 0, 3, 0, 0]
        ]
    },
    "YV-666": {
        name: "YV-666",
        xws: "YV-666 Light Freighter",
        factions: ["Scum and Villainy"],
        attackf: 3,
        agility: 1,
        hull: 9,
        shields: 3,
        large: !0,
        actions: ["Focus", "Reinforce", "Lock"],
        maneuvers: [
            [0, 0, 3, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [3, 2, 1, 2, 3, 0],
            [2, 2, 1, 2, 2, 0],
            [0, 0, 2, 0, 0, 0]
        ]
    },
    "Kihraxz Fighter": {
        name: "Kihraxz Fighter",
        xws: "Kihraxz Fighter",
        factions: ["Scum and Villainy"],
        attack: 3,
        agility: 2,
        hull: 5,
        shields: 1,
        actions: ["Focus", "Lock", "Barrel Roll"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 0, 1, 2, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0, 3, 3],
            [0, 2, 1, 2, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 3, 0, 0, 0, 0]
        ]
    },
    "K-Wing": {
        name: "K-Wing",
        xws: "BTL-S8 K-wing",
        factions: ["Rebel Alliance"],
        attackdt: 2,
        agility: 1,
        hull: 6,
        shields: 3,
        medium: !0,
        actions: ["Focus", "Lock", "Slam", "Rotate Arc", "Reload"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [2, 2, 1, 2, 2, 0],
            [0, 2, 2, 2, 0, 0]
        ]
    },
    "TIE Punisher": {
        name: "TIE Punisher",
        xws: "TIE/ca Punisher",
        factions: ["Galactic Empire"],
        attack: 2,
        agility: 1,
        hull: 6,
        shields: 3,
        medium: !0,
        actions: ["Focus", "Lock", "R-Barrel Roll", "Boost", "R-> Lock", "Reload"],
        maneuvers: [
            [0, 0, 3, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [2, 2, 1, 2, 2, 0],
            [3, 2, 2, 2, 3, 0],
            [0, 0, 0, 0, 0, 3]
        ]
    },
    "VCX-100": {
        name: "VCX-100",
        xws: "VCX-100 Light Freighter",
        factions: ["Rebel Alliance"],
        attack: 4,
        agility: 0,
        hull: 10,
        shields: 4,
        large: !0,
        keyword: ["Freighter"],
        actions: ["Focus", "Lock", "Reinforce"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0],
            [3, 2, 1, 2, 3, 0],
            [2, 1, 1, 1, 2, 0],
            [3, 2, 2, 2, 3, 0],
            [0, 0, 2, 0, 0, 3]
        ]
    },
    "Attack Shuttle": {
        name: "Attack Shuttle",
        xws: "Attack Shuttle",
        factions: ["Rebel Alliance"],
        attack: 3,
        agility: 2,
        hull: 3,
        shields: 1,
        actions: ["Focus", "Evade", "Barrel Roll", "R-> Evade"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0],
            [3, 1, 1, 1, 3, 0],
            [2, 2, 1, 2, 2, 0],
            [3, 2, 2, 2, 3, 0],
            [0, 0, 2, 0, 0, 3]
        ]
    },
    "TIE Advanced Prototype": {
        name: "TIE Advanced Prototype",
        xws: "TIE Advanced v1",
        factions: ["Galactic Empire"],
        attack: 2,
        agility: 3,
        hull: 2,
        shields: 2,
        actions: ["Focus", "Evade", "Lock", "Barrel Roll", "R-> Focus", "Boost", "R-> Focus"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0, 3, 3],
            [2, 2, 1, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 3, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "G-1A Starfighter": {
        name: "G-1A Starfighter",
        xws: "G-1A Starfighter",
        factions: ["Scum and Villainy"],
        attack: 3,
        agility: 1,
        hull: 5,
        shields: 4,
        medium: !0,
        actions: ["Focus", "Lock", "Jam"],
        maneuvers: [
            [0, 0, 3, 0, 0, 0],
            [3, 1, 1, 1, 3, 0],
            [2, 2, 1, 2, 2, 3],
            [0, 3, 2, 3, 0, 0],
            [0, 0, 3, 0, 0, 3]
        ]
    },
    "JumpMaster 5000": {
        name: "JumpMaster 5000",
        xws: "JumpMaster 5000",
        factions: ["Scum and Villainy"],
        large: !0,
        attackt: 2,
        agility: 2,
        hull: 6,
        shields: 3,
        actions: ["Focus", "R-> Rotate Arc", "Lock", "R-> Rotate Arc", "R-Barrel Roll"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 2, 3, 0, 0, 0],
            [2, 1, 1, 2, 3, 0, 0, 0],
            [0, 1, 1, 2, 0, 0, 3, 0],
            [0, 0, 2, 0, 0, 3, 0, 0]
        ]
    },
    "ARC-170": {
        name: "ARC-170",
        xws: "ARC-170 Starfighter",
        factions: ["Rebel Alliance", "Galactic Republic"],
        attack: 3,
        attackb: 2,
        agility: 1,
        hull: 6,
        shields: 3,
        medium: !0,
        actions: ["Focus", "Lock", "R-Barrel Roll"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [2, 1, 1, 1, 2, 0],
            [3, 2, 2, 2, 3, 0],
            [0, 0, 3, 0, 0, 3]
        ]
    },
    "Fang Fighter": {
        name: "Fang Fighter",
        canonical_name: "Protectorate Starfighter",
        xws: "Fang Fighter",
        factions: ["Scum and Villainy"],
        attack: 3,
        agility: 3,
        hull: 4,
        shields: 0,
        actions: ["Focus", "Lock", "Barrel Roll", "R-> Focus", "Boost", "R-> Focus"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 2, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 0, 0, 0, 3, 3],
            [2, 2, 1, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 3, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "Lancer-Class Pursuit Craft": {
        name: "Lancer-Class Pursuit Craft",
        xws: "Lancer-class Pursuit Craft",
        factions: ["Scum and Villainy"],
        large: !0,
        attack: 3,
        attackt: 2,
        agility: 2,
        hull: 8,
        shields: 2,
        actions: ["Focus", "Evade", "Lock", "Rotate Arc"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0],
            [0, 2, 2, 2, 0, 0],
            [2, 2, 1, 2, 2, 0],
            [1, 1, 1, 1, 1, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 0, 2, 0, 0, 3]
        ]
    },
    Quadjumper: {
        name: "Quadjumper",
        xws: "Quadrijet Transfer Spacetug",
        factions: ["Scum and Villainy"],
        attack: 2,
        agility: 2,
        hull: 5,
        shields: 0,
        actions: ["Focus", "R-Evade", "Barrel Roll"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 3, 0, 3],
            [2, 1, 1, 1, 2, 0, 3, 3, 0, 0, 0, 3, 0],
            [0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "U-Wing": {
        name: "U-Wing",
        xws: "UT-60D U-wing",
        factions: ["Rebel Alliance"],
        medium: !0,
        attack: 3,
        agility: 2,
        hull: 5,
        shields: 3,
        actions: ["Focus", "Lock", "R-Coordinate"],
        maneuvers: [
            [0, 0, 3, 0, 0],
            [0, 1, 1, 1, 0],
            [2, 1, 1, 1, 2],
            [0, 2, 2, 2, 0],
            [0, 0, 2, 0, 0]
        ],
        autoequip: ["Pivot Wing"]
    },
    "TIE Striker": {
        name: "TIE Striker",
        xws: "TIE/sk Striker",
        factions: ["Galactic Empire"],
        attack: 3,
        agility: 2,
        hull: 4,
        shields: 0,
        actions: ["Focus", "Evade", "Barrel Roll"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 3, 0, 0],
            [2, 1, 1, 1, 2, 0, 3, 3],
            [0, 2, 1, 2, 0, 0, 0, 0]
        ]
    },
    "Auzituck Gunship": {
        name: "Auzituck Gunship",
        xws: "Auzituck Gunship",
        factions: ["Rebel Alliance"],
        attackf: 3,
        agility: 1,
        hull: 6,
        shields: 2,
        actions: ["Focus", "R-Barrel Roll", "Reinforce"],
        maneuvers: [
            [0, 0, 3, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0]
        ]
    },
    "Scurrg H-6 Bomber": {
        name: "Scurrg H-6 Bomber",
        xws: "Scurrg H-6 Bomber",
        factions: ["Scum and Villainy"],
        attack: 3,
        agility: 1,
        hull: 6,
        shields: 4,
        medium: !0,
        actions: ["Focus", "Lock", "R-Barrel Roll"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0, 0, 0],
            [3, 2, 2, 2, 3, 0, 0, 0, 3, 3],
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "TIE Aggressor": {
        name: "TIE Aggressor",
        xws: "TIE/ag Aggressor",
        factions: ["Galactic Empire"],
        attack: 2,
        agility: 2,
        hull: 4,
        shields: 1,
        actions: ["Focus", "Lock", "Barrel Roll", "R-> Evade"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 1, 2, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 3, 0, 0, 0, 0]
        ]
    },
    "Alpha-Class Star Wing": {
        name: "Alpha-Class Star Wing",
        xws: "Alpha-class Star Wing",
        factions: ["Galactic Empire"],
        attack: 2,
        agility: 2,
        hull: 4,
        shields: 3,
        actions: ["Focus", "Lock", "Slam", "Reload"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 1, 2, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0],
            [2, 2, 2, 2, 2, 0, 0, 0],
            [0, 0, 3, 0, 0, 0, 0, 0]
        ]
    },
    "M12-L Kimogila Fighter": {
        name: "M12-L Kimogila Fighter",
        xws: "M12-L Kimogila Fighter",
        factions: ["Scum and Villainy"],
        attack: 3,
        agility: 1,
        hull: 7,
        shields: 2,
        medium: !0,
        actions: ["Focus", "Lock", "R-Barrel Roll", "Reload"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0],
            [3, 2, 1, 2, 3, 0],
            [2, 1, 1, 1, 2, 0],
            [2, 2, 1, 2, 2, 0],
            [0, 0, 0, 0, 0, 3]
        ]
    },
    "Sheathipede-Class Shuttle": {
        name: "Sheathipede-Class Shuttle",
        xws: "Sheathipede-class Shuttle",
        factions: ["Rebel Alliance"],
        attack: 2,
        attackb: 2,
        agility: 2,
        hull: 4,
        shields: 1,
        actions: ["Focus", "Coordinate"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0],
            [2, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 2, 1, 2, 3, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "TIE Reaper": {
        name: "TIE Reaper",
        xws: "TIE Reaper",
        factions: ["Galactic Empire"],
        attack: 3,
        agility: 1,
        hull: 6,
        shields: 2,
        medium: !0,
        actions: ["Focus", "Evade", "Jam", "R-Coordinate"],
        maneuvers: [
            [0, 0, 3, 0, 0, 0, 0, 0],
            [3, 1, 1, 1, 3, 0, 3, 3],
            [3, 2, 1, 2, 3, 0, 0, 0],
            [0, 2, 1, 2, 0, 0, 0, 0]
        ]
    },
    "Escape Craft": {
        name: "Escape Craft",
        xws: "Escape Craft",
        factions: ["Scum and Villainy"],
        attack: 2,
        agility: 2,
        hull: 2,
        shields: 2,
        actions: ["Focus", "Barrel Roll", "R-Coordinate"],
        maneuvers: [
            [0, 0, 3, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0],
            [3, 2, 1, 2, 3, 0, 0, 0],
            [0, 2, 2, 2, 0, 3, 0, 0]
        ]
    },
    "T-70 X-Wing": {
        name: "T-70 X-Wing",
        xws: "T-70 X-wing",
        factions: ["Resistance"],
        attack: 3,
        agility: 2,
        hull: 4,
        shields: 3,
        actions: ["Focus", "Lock", "Boost"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0, 3, 3],
            [0, 0, 2, 0, 0, 3, 0, 0, 0, 0]
        ],
        autoequip: ["Integrated S-Foils"]
    },
    "RZ-2 A-Wing": {
        name: "RZ-2 A-Wing",
        xws: "RZ-2 A-wing",
        factions: ["Resistance"],
        attackt: 2,
        agility: 3,
        hull: 2,
        shields: 2,
        actions: ["Focus", "Evade", "Lock", "Barrel Roll", "Boost"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 2, 0, 0, 0],
            [1, 1, 1, 1, 1, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 3, 3],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 3, 0, 0]
        ]
    },
    "TIE/FO Fighter": {
        name: "TIE/FO Fighter",
        xws: "TIE/fo Fighter",
        factions: ["First Order"],
        attack: 2,
        agility: 3,
        hull: 3,
        shields: 1,
        actions: ["Focus", "Evade", "Lock", "Barrel Roll"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 2, 0, 0, 0],
            [1, 1, 1, 1, 1, 0, 3, 3],
            [2, 2, 1, 2, 2, 0, 0, 0],
            [0, 0, 2, 0, 0, 3, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0]
        ]
    },
    "TIE/VN Silencer": {
        name: "TIE/VN Silencer",
        xws: "TIE/vn Silencer",
        factions: ["First Order"],
        attack: 3,
        agility: 3,
        hull: 4,
        shields: 2,
        keyword: ["Autothrusters"],
        actions: ["Focus", "Boost", "Lock", "Barrel Roll"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 2, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0, 3, 3],
            [0, 0, 1, 0, 0, 3, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "TIE/SF Fighter": {
        name: "TIE/SF Fighter",
        xws: "TIE/sf Fighter",
        factions: ["First Order"],
        attack: 2,
        attackt: 2,
        agility: 2,
        hull: 3,
        shields: 3,
        actions: ["Focus", "> Rotate Arc", "Evade", "> Rotate Arc", "Lock", "> Rotate Arc", "Barrel Roll", "> Rotate Arc"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 1, 1, 1, 3, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 3, 3, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "Upsilon-Class Command Shuttle": {
        name: "Upsilon-Class Command Shuttle",
        xws: "Upsilon-class command shuttle",
        factions: ["First Order"],
        attack: 4,
        agility: 1,
        hull: 6,
        shields: 6,
        actions: ["Focus", "Lock", "Reinforce", "Coordinate", "Jam"],
        maneuvers: [
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
            [3, 2, 1, 2, 3, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0, 0, 0],
            [3, 2, 2, 2, 3, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        large: !0
    },
    "MG-100 StarFortress": {
        name: "MG-100 StarFortress",
        xws: "MG-100 StarFortress",
        factions: ["Resistance"],
        attack: 3,
        attackdt: 2,
        agility: 1,
        hull: 9,
        shields: 3,
        actions: ["Focus", "Lock", "Rotate Arc", "Reload"],
        maneuvers: [
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
            [3, 1, 1, 1, 3, 0, 0, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0, 0, 0],
            [0, 3, 2, 3, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        large: !0
    },
    "Scavenged YT-1300": {
        name: "Scavenged YT-1300",
        canonical_name: "Scavenged YT-1300",
        xws: "Scavenged YT-1300",
        factions: ["Resistance"],
        attackdt: 3,
        agility: 1,
        hull: 8,
        shields: 3,
        keyword: ["Freighter"],
        actions: ["Focus", "Lock", "R-Boost", "R-Rotate Arc"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 1, 2, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0],
            [2, 2, 2, 2, 2, 0, 3, 3],
            [0, 0, 3, 0, 0, 0, 0, 0]
        ],
        large: !0
    },
    "Mining Guild TIE Fighter": {
        name: "Mining Guild TIE Fighter",
        xws: "Modified TIE/ln Fighter",
        factions: ["Scum and Villainy"],
        attack: 2,
        agility: 3,
        hull: 3,
        shields: 0,
        actions: ["Focus", "Barrel Roll", "Evade"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 2, 0],
            [2, 1, 1, 1, 2, 0],
            [2, 2, 1, 2, 2, 3],
            [0, 0, 2, 0, 0, 0],
            [0, 0, 3, 0, 0, 0]
        ]
    },
    "V-19 Torrent": {
        name: "V-19 Torrent",
        xws: "V-19 Torrent Starfighter",
        factions: ["Galactic Republic"],
        attack: 2,
        agility: 2,
        hull: 5,
        shields: 0,
        actions: ["Focus", "Evade", "Lock", "Barrel Roll", "R-> Evade"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 1, 1, 1, 3, 0, 0, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0, 3, 3],
            [0, 3, 1, 3, 0, 3, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "Delta-7 Aethersprite": {
        name: "Delta-7 Aethersprite",
        xws: "Delta-7 Aethersprite",
        factions: ["Galactic Republic"],
        attack: 2,
        agility: 3,
        hull: 3,
        shields: 1,
        actions: ["Focus", "F-Evade", "Lock", "Barrel Roll", "Boost"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 0, 1, 2, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 3, 3, 0, 0],
            [0, 2, 1, 2, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 3, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 3, 0, 0, 0, 0]
        ]
    },
    "Sith Infiltrator": {
        name: "Sith Infiltrator",
        xws: "Sith Infiltrator",
        factions: ["Separatist Alliance"],
        attack: 3,
        agility: 1,
        hull: 6,
        large: !0,
        shields: 4,
        actions: ["Focus", "Lock", "R-Barrel Roll"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 1, 1, 1, 3, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 3, 3, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 3, 0, 0, 0, 0]
        ]
    },
    "Vulture-class Droid Fighter": {
        name: "Vulture-class Droid Fighter",
        xws: "Vulture-class Droid Fighter",
        factions: ["Separatist Alliance"],
        attack: 2,
        agility: 2,
        hull: 3,
        shields: 0,
        keyword: ["Networked Calculations"],
        actions: ["Calculate", "Lock", "Barrel Roll", "R-> Calculate"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 2, 3, 0, 0, 0, 0],
            [1, 2, 1, 2, 1, 0, 0, 0, 3, 3],
            [2, 3, 1, 3, 2, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "Belbullab-22 Starfighter": {
        name: "Belbullab-22 Starfighter",
        xws: "Belbullab-22 Starfighter",
        factions: ["Separatist Alliance"],
        attack: 3,
        agility: 2,
        hull: 3,
        shields: 2,
        actions: ["Focus", "Lock", "Barrel Roll", "R-> Focus", "Boost", "R-> Focus"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 0, 2, 2, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0, 0, 0],
            [3, 2, 1, 2, 3, 0, 3, 3, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "Naboo Royal N-1 Starfighter": {
        name: "Naboo Royal N-1 Starfighter",
        xws: "Naboo Royal N-1 Starfighter",
        factions: ["Galactic Republic"],
        attack: 2,
        agility: 2,
        hull: 3,
        shields: 2,
        actions: ["Focus", "Lock", "Barrel Roll", "Boost"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 2, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0, 3, 3],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "Hyena-Class Droid Bomber": {
        name: "Hyena-Class Droid Bomber",
        xws: "Hyena-Class Droid Bomber",
        factions: ["Separatist Alliance"],
        attack: 2,
        agility: 2,
        hull: 5,
        shields: 0,
        keyword: ["Networked Calculations"],
        actions: ["Calculate", "Lock", "Barrel Roll", "R-> Lock", "R-Reload"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 3, 2, 3, 2, 0, 0, 0, 0, 0],
            [1, 2, 1, 2, 1, 3, 0, 0, 3, 3],
            [2, 0, 1, 0, 2, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "Resistance Transport Pod": {
        name: "Resistance Transport Pod",
        xws: "Resistance Transport Pod",
        factions: ["Resistance"],
        attack: 2,
        agility: 2,
        hull: 3,
        shields: 1,
        actions: ["Focus", "R-Lock", "R-Barrel Roll", "R-Jam"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 1, 1, 1, 3, 0, 0, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0, 0, 0],
            [0, 3, 2, 3, 0, 3, 0, 0, 0, 0],
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "Resistance Transport": {
        name: "Resistance Transport",
        xws: "Resistance Transport",
        factions: ["Resistance"],
        attack: 2,
        agility: 1,
        hull: 5,
        shields: 3,
        actions: ["Focus", "Lock", "R-Coordinate", "R-Jam"],
        maneuvers: [
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 1, 1, 1, 3, 0, 0, 0, 0, 0, 3, 0, 3],
            [2, 2, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "Nantex-Class Starfighter": {
        name: "Nantex-Class Starfighter",
        xws: "Nantex-Class Starfighter",
        factions: ["Separatist Alliance"],
        attackbull: 3,
        attackt: 2,
        agility: 3,
        hull: 4,
        shields: 0,
        actions: ["Focus", "Evade"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 0, 1, 2, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 3, 3],
            [0, 0, 2, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 3, 0, 0]
        ]
    },
    "BTL-B Y-Wing": {
        name: "BTL-B Y-Wing",
        xws: "BTL-B Y-Wing",
        factions: ["Galactic Republic"],
        attack: 2,
        agility: 1,
        hull: 5,
        shields: 3,
        actions: ["Focus", "Lock", "R-Barrel Roll", "R-Reload"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0],
            [0, 2, 1, 2, 0, 0],
            [2, 2, 1, 2, 2, 0],
            [3, 2, 2, 2, 3, 0],
            [0, 0, 3, 0, 0, 3],
            [0, 0, 0, 0, 0, 0]
        ]
    },
    Fireball: {
        name: "Fireball",
        xws: "Fireball",
        factions: ["Resistance"],
        attack: 2,
        agility: 2,
        hull: 6,
        shields: 0,
        actions: ["Focus", "Evade", "Barrel Roll", "Slam"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0, 0, 0],
            [3, 2, 2, 2, 3, 0, 0, 0, 3, 3],
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "TIE/Ba Interceptor": {
        name: "TIE/Ba Interceptor",
        xws: "TIE/Ba Interceptor",
        factions: ["First Order"],
        attack: 3,
        agility: 3,
        hull: 2,
        shields: 2,
        actions: ["Focus", "Evade", "Lock", "Barrel Roll", "Boost"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 3, 3, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 3, 0, 0, 0, 0]
        ]
    },
    "Xi-class Light Shuttle": {
        name: "Xi-class Light Shuttle",
        xws: "Xi-class Light Shuttle",
        factions: ["First Order"],
        attack: 2,
        agility: 2,
        hull: 5,
        shields: 2,
        medium: !0,
        actions: ["Focus", "R-Lock", "R-Coordinate", "Jam"],
        maneuvers: [
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0, 0, 0],
            [3, 2, 2, 2, 3, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "HMP Droid Gunship": {
        name: "HMP Droid Gunship",
        xws: "HMP Droid Gunship",
        factions: ["Separatist Alliance"],
        attackf: 2,
        agility: 1,
        hull: 5,
        shields: 3,
        actions: ["Calculate", "Lock", "R-Barrel Roll", "Reload", "R-> Calculate"],
        maneuvers: [
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 1, 3, 0, 0, 0, 0, 0, 0],
            [1, 2, 1, 2, 1, 0, 0, 0, 0, 0],
            [2, 3, 2, 3, 2, 0, 0, 0, 0, 0],
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "LAAT/i Gunship": {
        name: "LAAT/i Gunship",
        xws: "LAAT/i Gunship",
        factions: ["Galactic Republic"],
        attackdt: 2,
        agility: 1,
        hull: 8,
        shields: 2,
        medium: !0,
        actions: ["Focus", "Lock", "Rotate Arc", "R-Reinforce", "Reload"],
        maneuvers: [
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 1, 2, 0, 0, 0, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0, 0, 0],
            [3, 2, 2, 2, 3, 0, 0, 0, 0, 0],
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "TIE/rb Heavy": {
        name: "TIE/rb Heavy",
        xws: "TIE/rb Heavy",
        factions: ["Galactic Empire"],
        attackt: 2,
        agility: 1,
        hull: 8,
        shields: 0,
        medium: !0,
        actions: ["Focus", "Reinforce", "Lock", "R-Barrel Roll", "Rotate Arc", "R-> Calculate"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 2, 1, 2, 3, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0, 0, 0],
            [3, 2, 2, 2, 3, 0, 0, 0, 3, 3],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "Droid Tri-Fighter": {
        name: "Droid Tri-Fighter",
        xws: "Droid Tri-Fighter",
        factions: ["Separatist Alliance"],
        attack: 3,
        agility: 3,
        hull: 3,
        shields: 0,
        keyword: ["Networked Calculations"],
        actions: ["Calculate", "Evade", "Lock", "Barrel Roll", "R-> Evade", "Boost", "R-> Calculate"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 2, 0, 0, 0, 3, 3],
            [1, 2, 1, 2, 1, 0, 0, 0, 0, 0],
            [1, 2, 1, 2, 1, 3, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 3, 0, 0, 0, 0]
        ]
    },
    "Nimbus-class V-Wing": {
        name: "Nimbus-class V-Wing",
        xws: "Nimbus-class V-Wing",
        factions: ["Galactic Republic"],
        attack: 2,
        agility: 3,
        hull: 2,
        shields: 2,
        keyword: ["TIE"],
        actions: ["Focus", "Lock", "R-Barrel Roll", "Boost", "R-> Lock"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 3, 0, 3, 2, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 3, 0, 0, 0, 0],
            [2, 2, 1, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 3, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "Eta-2 Actis": {
        name: "Eta-2 Actis",
        xws: "Eta-2 Actis",
        factions: ["Galactic Republic"],
        attackbull: 3,
        attack: 2,
        agility: 3,
        hull: 3,
        shields: 0,
        actions: ["Focus", "Evade", "F-Lock", "Barrel Roll", "Boost"],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 2, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 2, 0, 0, 0, 4, 4],
            [2, 1, 1, 1, 2, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 3, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "Syliure-class Hyperspace Ring": {
        name: "Syliure-class Hyperspace Ring",
        xws: "Syliure-class Hyperspace Ring",
        factions: ["Galactic Republic"],
        agility: 1,
        hull: 1,
        shields: 2,
        actions: [],
        maneuvers: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    "CR90 Corellian Corvette": {
        name: "CR90 Corellian Corvette",
        xws: "CR90 Corellian Corvette",
        icon: "cr90corvette",
        factions: ["Galactic Republic", "Rebel Alliance"],
        huge: !0,
        attackl: 4,
        attackr: 4,
        agility: 0,
        hull: 18,
        shields: 7,
        shieldrecurr: 2,
        energy: 7,
        energyrecurr: 2,
        actions: ["Focus", "Reinforce", "Lock", "R-Coordinate", "Jam"],
        maneuvers: [
            [0, 3, 3, 3, 0],
            [0, 2, 2, 2, 0],
            [0, 1, 1, 1, 0],
            [0, 3, 1, 3, 0],
            [0, 0, 3, 0, 0],
            [0, 0, 3, 0, 0]
        ]
    },
    "Raider-class Corvette": {
        name: "Raider-class Corvette",
        xws: "Raider-class Corvette",
        factions: ["Galactic Empire", "First Order"],
        huge: !0,
        attackf: 4,
        agility: 0,
        hull: 20,
        shields: 8,
        shieldrecurr: 2,
        energy: 6,
        energyrecurr: 2,
        actions: ["Focus", "Reinforce", "Lock", "Coordinate", "Jam"],
        maneuvers: [
            [0, 3, 3, 3, 0],
            [0, 1, 2, 1, 0],
            [0, 2, 1, 2, 0],
            [0, 3, 1, 3, 0],
            [0, 0, 2, 0, 0],
            [0, 0, 3, 0, 0]
        ]
    },
    "GR-75 Medium Transport": {
        name: "GR-75 Medium Transport",
        xws: "GR-75 Medium Transport",
        factions: ["Rebel Alliance", "Resistance"],
        huge: !0,
        attack: 2,
        agility: 0,
        hull: 12,
        shields: 3,
        shieldrecurr: 1,
        energy: 4,
        energyrecurr: 1,
        actions: ["Focus", "R-Lock", "Coordinate", "R-Reinforce", "Jam"],
        maneuvers: [
            [0, 3, 3, 3, 0],
            [0, 1, 1, 1, 0],
            [0, 2, 2, 2, 0],
            [0, 0, 3, 0, 0],
            [0, 0, 3, 0, 0]
        ]
    },
    "Gozanti-class Cruiser": {
        name: "Gozanti-class Cruiser",
        xws: "Gozanti-class Cruiser",
        factions: ["Galactic Empire", "First Order"],
        huge: !0,
        attack: 3,
        agility: 0,
        hull: 11,
        shields: 5,
        shieldrecurr: 1,
        energy: 3,
        energyrecurr: 1,
        actions: ["Focus", "Reinforce", "Lock", "Coordinate", "Jam"],
        maneuvers: [
            [0, 3, 3, 3, 0],
            [0, 2, 1, 2, 0],
            [0, 3, 1, 3, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 3, 0, 0]
        ]
    },
    "C-ROC Cruiser": {
        name: "C-ROC Cruiser",
        xws: "C-ROC Cruiser",
        factions: ["Separatist Alliance", "Scum and Villainy"],
        huge: !0,
        attack: 3,
        agility: 0,
        hull: 12,
        shields: 4,
        shieldrecurr: 1,
        energy: 4,
        energyrecurr: 1,
        actions: ["Focus", "Reinforce", "Lock", "R-Coordinate", "Jam"],
        maneuvers: [
            [0, 3, 3, 3, 0],
            [0, 2, 1, 2, 0],
            [0, 2, 1, 2, 0],
            [0, 3, 2, 3, 0],
            [0, 0, 3, 0, 0],
            [0, 0, 3, 0, 0]
        ]
    },
    "Trident-class Assault Ship": {
        name: "Trident-class Assault Ship",
        xws: "Trident-class Assault Ship",
        factions: ["Separatist Alliance", "Scum and Villainy"],
        huge: !0,
        attack: 3,
        agility: 0,
        hull: 10,
        shields: 4,
        shieldrecurr: 1,
        energy: 3,
        energyrecurr: 2,
        actions: ["Focus", "R-Evade", "R-Reinforce", "Lock", "R-Coordinate"],
        maneuvers: [
            [0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
            [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0],
            [0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    }
};
exports.ships = ships;
var pilots = [{
        name: "Cavern Angels Zealot",
        id: 0,
        faction: "Rebel Alliance",
        ship: "X-Wing",
        keyword: ["Partisan"],
        skill: 1,
        points: 38,
        slots: ["Illicit", "Torpedo", "Astromech", "Modification", "Configuration"]
    }, {
        name: "Blue Squadron Escort",
        id: 1,
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 2,
        points: 38,
        slots: ["Torpedo", "Astromech", "Modification", "Configuration"]
    }, {
        name: "Red Squadron Veteran",
        id: 2,
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 3,
        points: 40,
        slots: ["Talent", "Torpedo", "Astromech", "Modification", "Configuration"]
    }, {
        name: "Jek Porkins",
        id: 3,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 4,
        points: 44,
        slots: ["Talent", "Torpedo", "Astromech", "Modification", "Configuration"]
    }, {
        name: "Luke Skywalker",
        id: 4,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 5,
        keyword: ["Light Side"],
        force: 2,
        points: 61,
        slots: ["Force", "Torpedo", "Astromech", "Modification", "Configuration"]
    }, {
        name: "Wedge Antilles",
        id: 5,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 6,
        points: 54,
        slots: ["Talent", "Torpedo", "Astromech", "Modification", "Configuration"]
    }, {
        name: "Garven Dreis (X-Wing)",
        canonical_name: "Garven Dreis",
        id: 6,
        unique: !0,
        xws: "garvendreis-t65xwing",
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 4,
        points: 46,
        slots: ["Talent", "Torpedo", "Astromech", "Modification", "Configuration"]
    }, {
        name: "Biggs Darklighter",
        id: 7,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 3,
        points: 47,
        slots: ["Torpedo", "Astromech", "Modification", "Configuration"]
    }, {
        name: "Edrio Two Tubes",
        id: 8,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 2,
        points: 42,
        keyword: ["Partisan"],
        slots: ["Illicit", "Torpedo", "Astromech", "Modification", "Configuration"]
    }, {
        name: "Thane Kyrell",
        id: 9,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 5,
        points: 47,
        slots: ["Talent", "Torpedo", "Astromech", "Modification", "Configuration"]
    }, {
        name: "Leevan Tenza",
        id: 10,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 3,
        points: 43,
        keyword: ["Partisan"],
        slots: ["Illicit", "Talent", "Torpedo", "Astromech", "Modification", "Configuration"]
    }, {
        name: "whoops",
        id: 11,
        skip: !0
    }, {
        name: "Kullbee Sperado",
        id: 12,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "X-Wing",
        skill: 4,
        points: 45,
        keyword: ["Partisan"],
        slots: ["Illicit", "Talent", "Torpedo", "Astromech", "Modification", "Configuration"]
    }, {
        name: "Sabine Wren (TIE Fighter)",
        canonical_name: "Sabine Wren",
        id: 13,
        unique: !0,
        xws: "sabinewren-tielnfighter",
        faction: "Rebel Alliance",
        ship: "TIE Fighter",
        skill: 3,
        points: 28,
        keyword: ["Spectre"],
        slots: ["Talent", "Modification"]
    }, {
        name: "Ezra Bridger (TIE Fighter)",
        canonical_name: "Ezra Bridger",
        id: 14,
        unique: !0,
        xws: "ezrabridger-tielnfighter",
        faction: "Rebel Alliance",
        ship: "TIE Fighter",
        skill: 3,
        force: 1,
        points: 28,
        keyword: ["Light Side", "Spectre"],
        slots: ["Force", "Modification"]
    }, {
        name: '"Zeb" Orrelios (TIE Fighter)',
        canonical_name: '"Zeb" Orrelios',
        id: 15,
        unique: !0,
        xws: "zeborrelios-tielnfighter",
        faction: "Rebel Alliance",
        ship: "TIE Fighter",
        skill: 2,
        points: 23,
        keyword: ["Spectre"],
        slots: ["Modification"]
    }, {
        name: "Captain Rex",
        id: 16,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "TIE Fighter",
        skill: 2,
        points: 28,
        keyword: ["Clone"],
        slots: ["Modification"],
        applies_condition: "Suppressive Fire"
    }, {
        name: "Miranda Doni",
        id: 17,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "K-Wing",
        skill: 4,
        points: 40,
        slots: ["Torpedo", "Missile", "Missile", "Gunner", "Crew", "Device", "Device", "Modification"]
    }, {
        name: "Esege Tuketu",
        id: 18,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "K-Wing",
        skill: 3,
        points: 44,
        slots: ["Torpedo", "Missile", "Missile", "Gunner", "Crew", "Device", "Device", "Modification"]
    }, {
        name: "empty",
        id: 19,
        skip: !0
    }, {
        name: "Warden Squadron Pilot",
        id: 20,
        faction: "Rebel Alliance",
        ship: "K-Wing",
        skill: 2,
        points: 38,
        slots: ["Torpedo", "Missile", "Missile", "Gunner", "Crew", "Device", "Device", "Modification"]
    }, {
        name: "Corran Horn",
        id: 21,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "E-Wing",
        skill: 5,
        points: 62,
        slots: ["Talent", "Sensor", "Torpedo", "Astromech", "Modification"]
    }, {
        name: "Gavin Darklighter",
        id: 22,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "E-Wing",
        skill: 4,
        points: 60,
        slots: ["Talent", "Sensor", "Torpedo", "Astromech", "Modification"]
    }, {
        name: "Rogue Squadron Escort",
        id: 23,
        faction: "Rebel Alliance",
        ship: "E-Wing",
        skill: 4,
        points: 51,
        slots: ["Talent", "Sensor", "Torpedo", "Astromech", "Modification"]
    }, {
        name: "Knave Squadron Escort",
        id: 24,
        faction: "Rebel Alliance",
        ship: "E-Wing",
        skill: 2,
        points: 49,
        slots: ["Sensor", "Torpedo", "Astromech", "Modification"]
    }, {
        name: "Norra Wexley (Y-Wing)",
        id: 25,
        unique: !0,
        canonical_name: "Norra Wexley",
        xws: "norrawexley-btla4ywing",
        faction: "Rebel Alliance",
        ship: "Y-Wing",
        skill: 5,
        points: 41,
        slots: ["Talent", "Turret", "Torpedo", "Astromech", "Modification", "Device", "Gunner"]
    }, {
        name: "Horton Salm",
        id: 26,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "Y-Wing",
        skill: 4,
        points: 37,
        slots: ["Talent", "Turret", "Torpedo", "Astromech", "Modification", "Device", "Gunner"]
    }, {
        name: '"Dutch" Vander',
        id: 27,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "Y-Wing",
        skill: 4,
        points: 40,
        slots: ["Talent", "Turret", "Torpedo", "Astromech", "Modification", "Device", "Gunner"]
    }, {
        name: "Evaan Verlaine",
        id: 28,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "Y-Wing",
        skill: 3,
        points: 35,
        slots: ["Talent", "Turret", "Torpedo", "Astromech", "Modification", "Device", "Gunner"]
    }, {
        name: "Gold Squadron Veteran",
        id: 29,
        faction: "Rebel Alliance",
        ship: "Y-Wing",
        skill: 3,
        points: 32,
        slots: ["Talent", "Turret", "Torpedo", "Astromech", "Modification", "Device", "Gunner"]
    }, {
        name: "Gray Squadron Bomber",
        id: 30,
        faction: "Rebel Alliance",
        ship: "Y-Wing",
        skill: 2,
        points: 30,
        slots: ["Turret", "Torpedo", "Astromech", "Modification", "Device", "Gunner"]
    }, {
        name: "Bodhi Rook",
        id: 31,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "U-Wing",
        skill: 4,
        points: 48,
        slots: ["Talent", "Sensor", "Crew", "Crew", "Modification", "Configuration"]
    }, {
        name: "Cassian Andor",
        id: 32,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "U-Wing",
        skill: 3,
        points: 51,
        slots: ["Talent", "Sensor", "Crew", "Crew", "Modification", "Configuration"]
    }, {
        name: "Heff Tobber",
        id: 33,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "U-Wing",
        skill: 2,
        points: 44,
        slots: ["Talent", "Sensor", "Crew", "Crew", "Modification", "Configuration"]
    }, {
        name: "Magva Yarro",
        id: 34,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "U-Wing",
        skill: 3,
        points: 50,
        keyword: ["Partisan"],
        slots: ["Talent", "Sensor", "Crew", "Crew", "Modification", "Configuration", "Illicit"]
    }, {
        name: "Saw Gerrera",
        id: 35,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "U-Wing",
        skill: 4,
        points: 52,
        keyword: ["Partisan"],
        slots: ["Talent", "Sensor", "Crew", "Crew", "Modification", "Configuration", "Illicit"]
    }, {
        name: "Benthic Two Tubes",
        id: 36,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "U-Wing",
        skill: 2,
        points: 46,
        keyword: ["Partisan"],
        slots: ["Illicit", "Sensor", "Crew", "Crew", "Modification", "Configuration"]
    }, {
        name: "Blue Squadron Scout",
        id: 37,
        faction: "Rebel Alliance",
        ship: "U-Wing",
        skill: 2,
        points: 43,
        slots: ["Sensor", "Crew", "Crew", "Modification", "Configuration"]
    }, {
        name: "Partisan Renegade",
        id: 38,
        faction: "Rebel Alliance",
        ship: "U-Wing",
        skill: 1,
        points: 43,
        keyword: ["Partisan"],
        slots: ["Illicit", "Sensor", "Crew", "Crew", "Modification", "Configuration"]
    }, {
        name: "Dash Rendar",
        id: 39,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "YT-2400",
        skill: 5,
        points: 85,
        slots: ["Talent", "Missile", "Gunner", "Crew", "Modification", "Title", "Illicit"]
    }, {
        name: '"Leebo"',
        id: 40,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "YT-2400",
        skill: 3,
        points: 76,
        keyword: ["Droid"],
        slots: ["Talent", "Missile", "Gunner", "Modification", "Title", "Illicit"]
    }, {
        name: "Wild Space Fringer",
        id: 41,
        faction: "Rebel Alliance",
        ship: "YT-2400",
        skill: 1,
        points: 72,
        slots: ["Missile", "Gunner", "Crew", "Modification", "Title", "Illicit"]
    }, {
        name: "Han Solo",
        id: 42,
        unique: !0,
        xws: "hansolo-modifiedyt1300lightfreighter",
        faction: "Rebel Alliance",
        ship: "YT-1300",
        skill: 6,
        points: 79,
        slots: ["Talent", "Missile", "Gunner", "Crew", "Crew", "Modification", "Modification", "Title"]
    }, {
        name: "Lando Calrissian",
        id: 43,
        unique: !0,
        xws: "landocalrissian-modifiedyt1300lightfreighter",
        faction: "Rebel Alliance",
        ship: "YT-1300",
        skill: 5,
        points: 78,
        slots: ["Talent", "Missile", "Gunner", "Crew", "Crew", "Modification", "Modification", "Title"]
    }, {
        name: "Chewbacca",
        id: 44,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "YT-1300",
        skill: 4,
        charge: 1,
        recurring: 1,
        points: 70,
        slots: ["Talent", "Missile", "Gunner", "Crew", "Crew", "Modification", "Modification", "Title"]
    }, {
        name: "Outer Rim Smuggler",
        id: 45,
        faction: "Rebel Alliance",
        ship: "YT-1300",
        skill: 1,
        points: 67,
        slots: ["Missile", "Gunner", "Crew", "Crew", "Modification", "Modification", "Title"]
    }, {
        name: "Jan Ors",
        id: 46,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "HWK-290",
        skill: 5,
        points: 41,
        slots: ["Talent", "Device", "Crew", "Modification", "Modification", "Title"]
    }, {
        name: "Roark Garnet",
        id: 47,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "HWK-290",
        skill: 4,
        points: 38,
        slots: ["Talent", "Device", "Crew", "Modification", "Modification", "Title"]
    }, {
        name: "Kyle Katarn",
        id: 48,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "HWK-290",
        skill: 3,
        points: 31,
        slots: ["Talent", "Device", "Crew", "Modification", "Modification", "Title"]
    }, {
        name: "Rebel Scout",
        id: 49,
        faction: "Rebel Alliance",
        ship: "HWK-290",
        skill: 2,
        points: 29,
        slots: ["Device", "Crew", "Modification", "Modification", "Title"]
    }, {
        name: "Jake Farrell",
        id: 50,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "A-Wing",
        skill: 4,
        points: 34,
        slots: ["Talent", "Talent", "Missile", "Configuration"]
    }, {
        name: "Arvel Crynyd",
        id: 51,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "A-Wing",
        skill: 3,
        points: 32,
        slots: ["Talent", "Talent", "Missile", "Configuration"]
    }, {
        name: "Green Squadron Pilot",
        id: 52,
        faction: "Rebel Alliance",
        ship: "A-Wing",
        skill: 3,
        points: 30,
        slots: ["Talent", "Talent", "Missile", "Configuration"]
    }, {
        name: "Phoenix Squadron Pilot",
        id: 53,
        faction: "Rebel Alliance",
        ship: "A-Wing",
        skill: 1,
        points: 28,
        slots: ["Talent", "Missile", "Configuration"]
    }, {
        name: "Airen Cracken",
        id: 54,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "Z-95 Headhunter",
        skill: 5,
        points: 36,
        slots: ["Talent", "Missile", "Modification"]
    }, {
        name: "Lieutenant Blount",
        id: 55,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "Z-95 Headhunter",
        skill: 4,
        points: 30,
        slots: ["Talent", "Missile", "Modification"]
    }, {
        name: "Tala Squadron Pilot",
        id: 56,
        faction: "Rebel Alliance",
        ship: "Z-95 Headhunter",
        skill: 2,
        points: 24,
        slots: ["Talent", "Missile", "Modification"]
    }, {
        name: "Bandit Squadron Pilot",
        id: 57,
        faction: "Rebel Alliance",
        ship: "Z-95 Headhunter",
        skill: 1,
        points: 22,
        slots: ["Missile", "Modification"]
    }, {
        name: "Wullffwarro",
        id: 58,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "Auzituck Gunship",
        skill: 4,
        points: 53,
        slots: ["Talent", "Crew", "Crew", "Modification"]
    }, {
        name: "Lowhhrick",
        id: 59,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "Auzituck Gunship",
        skill: 3,
        points: 50,
        slots: ["Talent", "Crew", "Crew", "Modification"]
    }, {
        name: "Kashyyyk Defender",
        id: 60,
        faction: "Rebel Alliance",
        ship: "Auzituck Gunship",
        skill: 1,
        points: 44,
        slots: ["Crew", "Crew", "Modification"]
    }, {
        name: "Hera Syndulla (VCX-100)",
        id: 61,
        unique: !0,
        canonical_name: "Hera Syndulla",
        xws: "herasyndulla-vcx100lightfreighter",
        faction: "Rebel Alliance",
        ship: "VCX-100",
        skill: 5,
        points: 72,
        keyword: ["Spectre"],
        slots: ["Talent", "Sensor", "Torpedo", "Turret", "Crew", "Crew", "Modification", "Gunner", "Title"]
    }, {
        name: "Kanan Jarrus",
        id: 62,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "VCX-100",
        skill: 3,
        keyword: ["Light Side", "Jedi", "Spectre"],
        force: 2,
        points: 76,
        slots: ["Force", "Sensor", "Torpedo", "Turret", "Crew", "Crew", "Modification", "Gunner", "Title"]
    }, {
        name: '"Chopper"',
        id: 63,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "VCX-100",
        skill: 2,
        points: 67,
        keyword: ["Droid", "Spectre"],
        slots: ["Torpedo", "Sensor", "Turret", "Crew", "Crew", "Modification", "Gunner", "Title"]
    }, {
        name: "Lothal Rebel",
        id: 64,
        faction: "Rebel Alliance",
        ship: "VCX-100",
        skill: 2,
        points: 67,
        slots: ["Torpedo", "Sensor", "Turret", "Crew", "Crew", "Modification", "Gunner", "Title"]
    }, {
        name: "Hera Syndulla",
        id: 65,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "Attack Shuttle",
        skill: 5,
        points: 38,
        keyword: ["Spectre"],
        slots: ["Talent", "Crew", "Modification", "Turret", "Title"]
    }, {
        name: "Sabine Wren",
        canonical_name: "Sabine Wren",
        id: 66,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "Attack Shuttle",
        skill: 3,
        points: 41,
        keyword: ["Mandalorian", "Spectre"],
        slots: ["Talent", "Crew", "Modification", "Turret", "Title"]
    }, {
        name: "Ezra Bridger",
        id: 67,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "Attack Shuttle",
        skill: 3,
        keyword: ["Light Side", "Spectre"],
        force: 1,
        points: 40,
        slots: ["Force", "Crew", "Modification", "Turret", "Title"]
    }, {
        name: '"Zeb" Orrelios',
        id: 68,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "Attack Shuttle",
        skill: 2,
        points: 32,
        keyword: ["Spectre"],
        slots: ["Talent", "Crew", "Modification", "Turret", "Title"]
    }, {
        name: "Fenn Rau (Sheathipede)",
        id: 69,
        unique: !0,
        xws: "fennrau-sheathipedeclassshuttle",
        faction: "Rebel Alliance",
        ship: "Sheathipede-Class Shuttle",
        skill: 6,
        points: 50,
        keyword: ["Mandalorian", "Spectre"],
        slots: ["Talent", "Crew", "Modification", "Astromech", "Title"]
    }, {
        name: "Ezra Bridger (Sheathipede)",
        canonical_name: "Ezra Bridger",
        id: 70,
        unique: !0,
        xws: "ezrabridger-sheathipedeclassshuttle",
        faction: "Rebel Alliance",
        ship: "Sheathipede-Class Shuttle",
        skill: 3,
        force: 1,
        points: 40,
        keyword: ["Light Side", "Spectre"],
        slots: ["Force", "Crew", "Modification", "Astromech", "Title"]
    }, {
        name: '"Zeb" Orrelios (Sheathipede)',
        canonical_name: '"Zeb" Orrelios',
        id: 71,
        unique: !0,
        xws: "zeborrelios-sheathipedeclassshuttle",
        faction: "Rebel Alliance",
        ship: "Sheathipede-Class Shuttle",
        skill: 2,
        points: 33,
        keyword: ["Spectre"],
        slots: ["Talent", "Crew", "Modification", "Astromech", "Title"]
    }, {
        name: "AP-5",
        id: 72,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "Sheathipede-Class Shuttle",
        skill: 1,
        points: 32,
        keyword: ["Droid", "Spectre"],
        slots: ["Talent", "Crew", "Modification", "Astromech", "Title"]
    }, {
        name: "Braylen Stramm",
        id: 73,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "B-Wing",
        skill: 4,
        points: 52,
        slots: ["Talent", "Sensor", "Cannon", "Cannon", "Torpedo", "Modification", "Configuration", "Title"]
    }, {
        name: "Ten Numb",
        id: 74,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "B-Wing",
        skill: 4,
        points: 48,
        slots: ["Talent", "Sensor", "Cannon", "Cannon", "Torpedo", "Modification", "Configuration", "Title"]
    }, {
        name: "Blade Squadron Veteran",
        id: 75,
        faction: "Rebel Alliance",
        ship: "B-Wing",
        skill: 3,
        points: 42,
        slots: ["Talent", "Sensor", "Cannon", "Cannon", "Torpedo", "Modification", "Configuration", "Title"]
    }, {
        name: "Blue Squadron Pilot",
        id: 76,
        faction: "Rebel Alliance",
        ship: "B-Wing",
        skill: 2,
        points: 41,
        slots: ["Sensor", "Cannon", "Cannon", "Torpedo", "Modification", "Configuration", "Title"]
    }, {
        name: "Norra Wexley",
        id: 77,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "ARC-170",
        skill: 5,
        points: 55,
        slots: ["Talent", "Torpedo", "Crew", "Gunner", "Astromech", "Modification"]
    }, {
        name: "Shara Bey",
        id: 78,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "ARC-170",
        skill: 4,
        points: 50,
        slots: ["Talent", "Torpedo", "Crew", "Gunner", "Astromech", "Modification"]
    }, {
        name: "Garven Dreis",
        id: 79,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "ARC-170",
        skill: 4,
        points: 49,
        slots: ["Talent", "Torpedo", "Crew", "Gunner", "Astromech", "Modification"]
    }, {
        name: "Ibtisam",
        id: 80,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "ARC-170",
        skill: 3,
        points: 46,
        slots: ["Talent", "Torpedo", "Crew", "Gunner", "Astromech", "Modification"]
    }, {
        name: "IG-88A",
        id: 81,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Aggressor",
        skill: 4,
        points: 66,
        keyword: ["Bounty Hunter", "Droid"],
        slots: ["Talent", "Sensor", "Cannon", "Cannon", "Device", "Illicit", "Modification", "Title"]
    }, {
        name: "IG-88B",
        id: 82,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Aggressor",
        skill: 4,
        points: 62,
        keyword: ["Bounty Hunter", "Droid"],
        slots: ["Talent", "Sensor", "Cannon", "Cannon", "Device", "Illicit", "Modification", "Title"]
    }, {
        name: "IG-88C",
        id: 83,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Aggressor",
        skill: 4,
        points: 63,
        keyword: ["Bounty Hunter", "Droid"],
        slots: ["Talent", "Sensor", "Cannon", "Cannon", "Device", "Illicit", "Modification", "Title"]
    }, {
        name: "IG-88D",
        id: 84,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Aggressor",
        skill: 4,
        points: 62,
        keyword: ["Bounty Hunter", "Droid"],
        slots: ["Talent", "Sensor", "Cannon", "Cannon", "Device", "Illicit", "Modification", "Title"]
    }, {
        name: "Kavil",
        id: 85,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Y-Wing",
        skill: 5,
        points: 43,
        slots: ["Talent", "Turret", "Torpedo", "Gunner", "Astromech", "Device", "Illicit", "Modification"]
    }, {
        name: "Drea Renthal",
        id: 86,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Y-Wing",
        skill: 4,
        points: 46,
        slots: ["Talent", "Turret", "Torpedo", "Gunner", "Astromech", "Device", "Illicit", "Modification"]
    }, {
        name: "Hired Gun",
        id: 87,
        faction: "Scum and Villainy",
        ship: "Y-Wing",
        skill: 2,
        points: 32,
        slots: ["Talent", "Turret", "Torpedo", "Gunner", "Astromech", "Device", "Illicit", "Modification"]
    }, {
        name: "Crymorah Goon",
        id: 88,
        faction: "Scum and Villainy",
        ship: "Y-Wing",
        skill: 1,
        points: 30,
        slots: ["Turret", "Torpedo", "Gunner", "Astromech", "Device", "Illicit", "Modification"]
    }, {
        name: "Han Solo (Scum)",
        id: 89,
        unique: !0,
        xws: "hansolo",
        faction: "Scum and Villainy",
        ship: "Customized YT-1300",
        skill: 6,
        points: 48,
        slots: ["Talent", "Missile", "Crew", "Crew", "Gunner", "Illicit", "Modification", "Title"]
    }, {
        name: "Lando Calrissian (Scum)",
        id: 90,
        unique: !0,
        xws: "landocalrissian",
        faction: "Scum and Villainy",
        ship: "Customized YT-1300",
        skill: 4,
        points: 42,
        slots: ["Talent", "Missile", "Crew", "Crew", "Gunner", "Illicit", "Modification", "Title"]
    }, {
        name: "L3-37",
        id: 91,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Customized YT-1300",
        skill: 2,
        points: 41,
        keyword: ["Droid"],
        slots: ["Missile", "Crew", "Crew", "Gunner", "Illicit", "Modification", "Title"]
    }, {
        name: "Freighter Captain",
        id: 92,
        faction: "Scum and Villainy",
        ship: "Customized YT-1300",
        skill: 1,
        points: 41,
        slots: ["Missile", "Crew", "Crew", "Gunner", "Illicit", "Modification", "Title"]
    }, {
        name: "Lando Calrissian (Scum) (Escape Craft)",
        canonical_name: "Lando Calrissian (Scum)",
        id: 93,
        unique: !0,
        xws: "landocalrissian-escapecraft",
        faction: "Scum and Villainy",
        ship: "Escape Craft",
        skill: 4,
        points: 29,
        slots: ["Talent", "Crew", "Modification"]
    }, {
        name: "Outer Rim Pioneer",
        id: 94,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Escape Craft",
        skill: 3,
        points: 28,
        slots: ["Talent", "Crew", "Modification"]
    }, {
        name: "L3-37 (Escape Craft)",
        canonical_name: "L3-37",
        id: 95,
        unique: !0,
        xws: "l337-escapecraft",
        faction: "Scum and Villainy",
        ship: "Escape Craft",
        skill: 2,
        points: 26,
        keyword: ["Droid"],
        slots: ["Talent", "Crew", "Modification"]
    }, {
        name: "Autopilot Drone",
        id: 96,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Escape Craft",
        skill: 1,
        charge: 3,
        points: 12,
        keyword: ["Droid"],
        slots: []
    }, {
        name: "Fenn Rau",
        id: 97,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Fang Fighter",
        skill: 6,
        points: 68,
        keyword: ["Mandalorian"],
        slots: ["Talent", "Torpedo"]
    }, {
        name: "Old Teroch",
        id: 98,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Fang Fighter",
        skill: 5,
        points: 56,
        keyword: ["Mandalorian"],
        slots: ["Talent", "Torpedo", "Modification"]
    }, {
        name: "Kad Solus",
        id: 99,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Fang Fighter",
        skill: 4,
        points: 54,
        keyword: ["Mandalorian"],
        slots: ["Talent", "Torpedo", "Modification"]
    }, {
        name: "Joy Rekkoff",
        id: 100,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Fang Fighter",
        skill: 4,
        points: 47,
        keyword: ["Mandalorian"],
        slots: ["Talent", "Torpedo", "Modification"]
    }, {
        name: "Skull Squadron Pilot",
        id: 101,
        faction: "Scum and Villainy",
        ship: "Fang Fighter",
        skill: 4,
        points: 47,
        keyword: ["Mandalorian"],
        slots: ["Talent", "Torpedo", "Modification"]
    }, {
        name: "Zealous Recruit",
        id: 102,
        faction: "Scum and Villainy",
        ship: "Fang Fighter",
        skill: 1,
        points: 41,
        keyword: ["Mandalorian"],
        slots: ["Torpedo", "Modification"]
    }, {
        name: "Boba Fett",
        id: 103,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Firespray-31",
        skill: 5,
        points: 86,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Cannon", "Missile", "Device", "Illicit", "Modification", "Modification", "Title"]
    }, {
        name: "Emon Azzameen",
        id: 104,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Firespray-31",
        skill: 4,
        points: 71,
        slots: ["Talent", "Cannon", "Missile", "Crew", "Device", "Illicit", "Modification", "Title"]
    }, {
        name: "Kath Scarlet",
        id: 105,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Firespray-31",
        skill: 4,
        points: 72,
        slots: ["Talent", "Cannon", "Missile", "Crew", "Device", "Illicit", "Modification", "Title"]
    }, {
        name: "Koshka Frost",
        id: 106,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Firespray-31",
        skill: 3,
        points: 70,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Cannon", "Missile", "Crew", "Device", "Illicit", "Modification", "Title"]
    }, {
        name: "Krassis Trelix",
        id: 107,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Firespray-31",
        skill: 3,
        points: 65,
        slots: ["Talent", "Cannon", "Missile", "Crew", "Device", "Illicit", "Modification", "Title"]
    }, {
        name: "Bounty Hunter",
        id: 108,
        faction: "Scum and Villainy",
        ship: "Firespray-31",
        skill: 2,
        points: 62,
        keyword: ["Bounty Hunter"],
        slots: ["Cannon", "Missile", "Crew", "Device", "Illicit", "Modification", "Title"]
    }, {
        name: "4-LOM",
        id: 109,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "G-1A Starfighter",
        skill: 3,
        points: 49,
        keyword: ["Bounty Hunter", "Droid"],
        slots: ["Talent", "Sensor", "Crew", "Illicit", "Modification", "Title"]
    }, {
        name: "Zuckuss",
        id: 110,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "G-1A Starfighter",
        skill: 3,
        points: 45,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Sensor", "Crew", "Illicit", "Modification", "Title"]
    }, {
        name: "Gand Findsman",
        id: 111,
        faction: "Scum and Villainy",
        ship: "G-1A Starfighter",
        skill: 1,
        points: 41,
        keyword: ["Bounty Hunter"],
        slots: ["Sensor", "Crew", "Illicit", "Modification", "Title"]
    }, {
        name: "Palob Godalhi",
        id: 112,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "HWK-290",
        skill: 3,
        points: 40,
        slots: ["Talent", "Crew", "Device", "Illicit", "Modification", "Modification", "Title"]
    }, {
        name: "Dace Bonearm",
        id: 113,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "HWK-290",
        skill: 4,
        charge: 3,
        recurring: 1,
        points: 31,
        slots: ["Talent", "Crew", "Device", "Illicit", "Modification", "Modification", "Title"]
    }, {
        name: "Torkil Mux",
        id: 114,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "HWK-290",
        skill: 2,
        points: 38,
        slots: ["Crew", "Device", "Illicit", "Modification", "Modification", "Title"]
    }, {
        name: "Dengar",
        id: 115,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "JumpMaster 5000",
        skill: 6,
        charge: 1,
        recurring: 1,
        points: 53,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Torpedo", "Cannon", "Crew", "Gunner", "Illicit", "Modification", "Title"]
    }, {
        name: "Tel Trevura",
        id: 116,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "JumpMaster 5000",
        skill: 4,
        charge: 1,
        points: 44,
        slots: ["Talent", "Torpedo", "Cannon", "Crew", "Gunner", "Illicit", "Modification", "Title"]
    }, {
        name: "Manaroo",
        id: 117,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "JumpMaster 5000",
        skill: 3,
        points: 45,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Torpedo", "Cannon", "Crew", "Gunner", "Illicit", "Modification", "Title"]
    }, {
        name: "Contracted Scout",
        id: 118,
        faction: "Scum and Villainy",
        ship: "JumpMaster 5000",
        skill: 2,
        points: 41,
        slots: ["Torpedo", "Cannon", "Crew", "Gunner", "Illicit", "Modification", "Title"]
    }, {
        name: "Talonbane Cobra",
        id: 119,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Kihraxz Fighter",
        skill: 5,
        points: 48,
        slots: ["Talent", "Missile", "Illicit", "Illicit", "Modification", "Modification"]
    }, {
        name: "Graz",
        id: 120,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Kihraxz Fighter",
        skill: 4,
        points: 45,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Missile", "Illicit", "Illicit", "Modification", "Modification"]
    }, {
        name: "Viktor Hel",
        id: 121,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Kihraxz Fighter",
        skill: 4,
        points: 43,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Missile", "Illicit", "Illicit", "Modification", "Modification"]
    }, {
        name: "Captain Jostero",
        id: 122,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Kihraxz Fighter",
        skill: 3,
        points: 41,
        slots: ["Missile", "Illicit", "Illicit", "Modification", "Modification"]
    }, {
        name: "Black Sun Ace",
        id: 123,
        faction: "Scum and Villainy",
        ship: "Kihraxz Fighter",
        skill: 3,
        points: 38,
        slots: ["Talent", "Missile", "Illicit", "Illicit", "Modification", "Modification"]
    }, {
        name: "Cartel Marauder",
        id: 124,
        faction: "Scum and Villainy",
        ship: "Kihraxz Fighter",
        skill: 2,
        points: 37,
        slots: ["Missile", "Illicit", "Illicit", "Modification", "Modification"]
    }, {
        name: "Asajj Ventress",
        id: 125,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Lancer-Class Pursuit Craft",
        skill: 4,
        points: 68,
        force: 2,
        keyword: ["Bounty Hunter", "Dark Side"],
        slots: ["Force", "Crew", "Illicit", "Illicit", "Modification", "Title"]
    }, {
        name: "Ketsu Onyo",
        id: 126,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Lancer-Class Pursuit Craft",
        skill: 5,
        points: 66,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Crew", "Illicit", "Illicit", "Modification", "Title"]
    }, {
        name: "Sabine Wren (Scum)",
        id: 127,
        unique: !0,
        xws: "sabinewren-lancerclasspursuitcraft",
        faction: "Scum and Villainy",
        ship: "Lancer-Class Pursuit Craft",
        skill: 3,
        points: 58,
        keyword: ["Mandalorian"],
        slots: ["Talent", "Crew", "Illicit", "Illicit", "Modification", "Title"]
    }, {
        name: "Shadowport Hunter",
        id: 128,
        faction: "Scum and Villainy",
        ship: "Lancer-Class Pursuit Craft",
        skill: 2,
        points: 54,
        keyword: ["Bounty Hunter"],
        slots: ["Crew", "Illicit", "Illicit", "Modification", "Title"]
    }, {
        name: "Torani Kulda",
        id: 129,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "M12-L Kimogila Fighter",
        skill: 4,
        points: 48,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Torpedo", "Missile", "Astromech", "Illicit", "Modification"]
    }, {
        name: "Dalan Oberos",
        id: 130,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "M12-L Kimogila Fighter",
        skill: 3,
        charge: 2,
        points: 45,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Torpedo", "Missile", "Astromech", "Illicit", "Modification"]
    }, {
        name: "Cartel Executioner",
        id: 131,
        faction: "Scum and Villainy",
        ship: "M12-L Kimogila Fighter",
        skill: 3,
        points: 41,
        slots: ["Talent", "Torpedo", "Missile", "Astromech", "Illicit", "Modification"]
    }, {
        name: "Serissu",
        id: 132,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "M3-A Interceptor",
        skill: 5,
        points: 40,
        slots: ["Talent", "Modification", "HardpointShip"]
    }, {
        name: "Genesis Red",
        id: 133,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "M3-A Interceptor",
        skill: 4,
        points: 31,
        slots: ["Talent", "Modification", "HardpointShip"]
    }, {
        name: "Laetin A'shera",
        id: 134,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "M3-A Interceptor",
        skill: 3,
        points: 30,
        slots: ["Talent", "Modification", "HardpointShip"]
    }, {
        name: "Quinn Jast",
        id: 135,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "M3-A Interceptor",
        skill: 3,
        points: 31,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Modification", "HardpointShip"]
    }, {
        name: "Tansarii Point Veteran",
        id: 136,
        faction: "Scum and Villainy",
        ship: "M3-A Interceptor",
        skill: 3,
        points: 29,
        slots: ["Talent", "Modification", "HardpointShip"]
    }, {
        name: "Inaldra",
        id: 137,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "M3-A Interceptor",
        skill: 2,
        points: 30,
        slots: ["Modification", "HardpointShip"]
    }, {
        name: "Sunny Bounder",
        id: 138,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "M3-A Interceptor",
        skill: 1,
        points: 27,
        slots: ["Modification", "HardpointShip"]
    }, {
        name: "Cartel Spacer",
        id: 139,
        faction: "Scum and Villainy",
        ship: "M3-A Interceptor",
        skill: 1,
        points: 25,
        slots: ["Modification", "HardpointShip"]
    }, {
        name: "Constable Zuvio",
        id: 140,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Quadjumper",
        skill: 4,
        points: 29,
        slots: ["Talent", "Tech", "Crew", "Device", "Illicit", "Modification"]
    }, {
        name: "Sarco Plank",
        id: 141,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Quadjumper",
        skill: 2,
        points: 29,
        keyword: ["Bounty Hunter"],
        slots: ["Tech", "Crew", "Device", "Illicit", "Modification"]
    }, {
        name: "Unkar Plutt",
        id: 142,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Quadjumper",
        skill: 2,
        points: 29,
        slots: ["Tech", "Crew", "Device", "Illicit", "Modification"]
    }, {
        name: "Jakku Gunrunner",
        id: 143,
        faction: "Scum and Villainy",
        ship: "Quadjumper",
        skill: 1,
        points: 29,
        slots: ["Tech", "Crew", "Device", "Illicit", "Modification"]
    }, {
        name: "Captain Nym",
        id: 144,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Scurrg H-6 Bomber",
        skill: 5,
        charge: 1,
        recurring: 1,
        points: 47,
        slots: ["Talent", "Turret", "Crew", "Gunner", "Device", "Device", "Modification", "Title"]
    }, {
        name: "Sol Sixxa",
        id: 145,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Scurrg H-6 Bomber",
        skill: 3,
        points: 46,
        slots: ["Talent", "Turret", "Crew", "Gunner", "Device", "Device", "Modification", "Title"]
    }, {
        name: "Lok Revenant",
        id: 146,
        faction: "Scum and Villainy",
        ship: "Scurrg H-6 Bomber",
        skill: 2,
        points: 45,
        slots: ["Turret", "Crew", "Gunner", "Device", "Device", "Modification", "Title"]
    }, {
        name: "Guri",
        id: 147,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "StarViper",
        skill: 5,
        points: 64,
        keyword: ["Droid"],
        slots: ["Talent", "Sensor", "Torpedo", "Modification", "Title"]
    }, {
        name: "Prince Xizor",
        id: 148,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "StarViper",
        skill: 4,
        points: 54,
        slots: ["Talent", "Sensor", "Torpedo", "Modification", "Title"]
    }, {
        name: "Dalan Oberos (StarViper)",
        canonical_name: "Dalan Oberos",
        id: 149,
        unique: !0,
        xws: "dalanoberos-starviperclassattackplatform",
        faction: "Scum and Villainy",
        ship: "StarViper",
        skill: 4,
        points: 54,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Sensor", "Torpedo", "Modification", "Title"]
    }, {
        name: "Black Sun Assassin",
        id: 150,
        faction: "Scum and Villainy",
        ship: "StarViper",
        skill: 3,
        points: 48,
        slots: ["Talent", "Sensor", "Torpedo", "Modification", "Title"]
    }, {
        name: "Black Sun Enforcer",
        id: 151,
        faction: "Scum and Villainy",
        ship: "StarViper",
        skill: 2,
        points: 45,
        slots: ["Sensor", "Torpedo", "Modification", "Title"]
    }, {
        name: "Moralo Eval",
        id: 152,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "YV-666",
        skill: 4,
        charge: 2,
        points: 66,
        slots: ["Talent", "Cannon", "Missile", "Crew", "Crew", "Gunner", "Illicit", "Modification", "Title"]
    }, {
        name: "Bossk",
        id: 153,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "YV-666",
        skill: 4,
        points: 60,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Cannon", "Missile", "Crew", "Crew", "Gunner", "Illicit", "Modification", "Title"]
    }, {
        name: "Latts Razzi",
        id: 154,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "YV-666",
        skill: 3,
        points: 56,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Cannon", "Missile", "Crew", "Crew", "Gunner", "Illicit", "Modification", "Title"]
    }, {
        name: "Trandoshan Slaver",
        id: 155,
        faction: "Scum and Villainy",
        ship: "YV-666",
        skill: 2,
        points: 51,
        slots: ["Cannon", "Missile", "Crew", "Crew", "Gunner", "Illicit", "Modification", "Title"]
    }, {
        name: "N'dru Suhlak",
        id: 156,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Z-95 Headhunter",
        skill: 4,
        points: 29,
        slots: ["Talent", "Missile", "Illicit", "Modification"]
    }, {
        name: "Kaa'to Leeachos",
        id: 157,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Z-95 Headhunter",
        skill: 3,
        points: 25,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Missile", "Illicit", "Modification"]
    }, {
        name: "Black Sun Soldier",
        id: 158,
        faction: "Scum and Villainy",
        ship: "Z-95 Headhunter",
        skill: 3,
        points: 24,
        slots: ["Talent", "Missile", "Illicit", "Modification"]
    }, {
        name: "Binayre Pirate",
        id: 159,
        faction: "Scum and Villainy",
        ship: "Z-95 Headhunter",
        skill: 1,
        points: 22,
        slots: ["Missile", "Illicit", "Modification"]
    }, {
        name: "Nashtah Pup",
        id: 160,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Z-95 Headhunter",
        skill: "*",
        points: 6,
        slots: ["Missile", "Illicit", "Modification"],
        restrictions: [
            ["Unique", "Hound's Tooth"]
        ],
        restriction_func: function (a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n;
            b = a.builder, l = b.uniques_in_use;
            for (d in l)
                if (f = l[d], "Slot" !== d && __indexOf.call(function () {
                    var a, b, c;
                    for (c = [], a = 0, b = f.length; a < b; a++)
                        e = f[a], c.push(e.canonical_name.getXWSBaseName());
                    return c;
                }(), "houndstooth") >= 0) {
                    for (m = a.builder.ships, h = 0, j = m.length; h < j; h++)
                        for (c = m[h], n = c.upgrades, i = 0, k = n.length; i < k; i++)
                            if (g = n[i], null != g.data && null != a.pilot && "Hound's Tooth" === g.data.name) {
                                a.pilot.skill = c.pilot.skill;
                                break;
                            }
                    return !0;
                }
            return !1;
        }
    }, {
        name: "Major Vynder",
        id: 161,
        unique: !0,
        faction: "Galactic Empire",
        ship: "Alpha-Class Star Wing",
        skill: 4,
        points: 40,
        slots: ["Talent", "Sensor", "Torpedo", "Missile", "Modification", "Configuration"]
    }, {
        name: "Lieutenant Karsabi",
        id: 162,
        unique: !0,
        faction: "Galactic Empire",
        ship: "Alpha-Class Star Wing",
        skill: 3,
        points: 36,
        slots: ["Talent", "Sensor", "Torpedo", "Missile", "Modification", "Configuration"]
    }, {
        name: "Rho Squadron Pilot",
        id: 163,
        faction: "Galactic Empire",
        ship: "Alpha-Class Star Wing",
        skill: 3,
        points: 34,
        slots: ["Talent", "Sensor", "Torpedo", "Missile", "Modification", "Configuration"]
    }, {
        name: "Nu Squadron Pilot",
        id: 164,
        faction: "Galactic Empire",
        ship: "Alpha-Class Star Wing",
        skill: 2,
        points: 32,
        slots: ["Sensor", "Torpedo", "Missile", "Modification", "Configuration"]
    }, {
        name: "Captain Kagi",
        id: 165,
        unique: !0,
        faction: "Galactic Empire",
        ship: "Lambda-Class Shuttle",
        skill: 4,
        points: 48,
        slots: ["Sensor", "Cannon", "Crew", "Crew", "Modification", "Title"]
    }, {
        name: "Lieutenant Sai",
        id: 166,
        unique: !0,
        faction: "Galactic Empire",
        ship: "Lambda-Class Shuttle",
        skill: 3,
        points: 47,
        slots: ["Sensor", "Cannon", "Crew", "Crew", "Modification", "Title"]
    }, {
        name: "Colonel Jendon",
        id: 167,
        unique: !0,
        faction: "Galactic Empire",
        ship: "Lambda-Class Shuttle",
        skill: 3,
        charge: 2,
        points: 49,
        slots: ["Sensor", "Cannon", "Crew", "Crew", "Modification", "Title"]
    }, {
        name: "Omicron Group Pilot",
        id: 168,
        faction: "Galactic Empire",
        ship: "Lambda-Class Shuttle",
        skill: 1,
        points: 43,
        slots: ["Sensor", "Cannon", "Crew", "Crew", "Modification", "Title"]
    }, {
        name: "Grand Inquisitor",
        id: 169,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Advanced Prototype",
        skill: 5,
        points: 52,
        force: 2,
        keyword: ["Dark Side"],
        slots: ["Force", "Sensor", "Missile"]
    }, {
        name: "Seventh Sister",
        id: 170,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Advanced Prototype",
        skill: 4,
        points: 43,
        force: 2,
        keyword: ["Dark Side"],
        slots: ["Force", "Sensor", "Missile"]
    }, {
        name: "Inquisitor",
        id: 171,
        faction: "Galactic Empire",
        ship: "TIE Advanced Prototype",
        skill: 3,
        points: 36,
        force: 1,
        keyword: ["Dark Side"],
        slots: ["Force", "Sensor", "Missile"]
    }, {
        name: "Baron of the Empire",
        id: 172,
        faction: "Galactic Empire",
        ship: "TIE Advanced Prototype",
        skill: 3,
        points: 28,
        slots: ["Talent", "Sensor", "Missile"]
    }, {
        name: "Darth Vader",
        id: 173,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Advanced",
        skill: 6,
        keyword: ["Dark Side", "Sith"],
        points: 66,
        force: 3,
        slots: ["Force", "Sensor", "Missile", "Modification"]
    }, {
        name: "Maarek Stele",
        id: 174,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Advanced",
        skill: 5,
        points: 45,
        slots: ["Talent", "Sensor", "Missile", "Modification"]
    }, {
        name: "Ved Foslo",
        id: 175,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Advanced",
        skill: 4,
        points: 44,
        slots: ["Talent", "Sensor", "Missile", "Modification"]
    }, {
        name: "Zertik Strom",
        id: 176,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Advanced",
        skill: 3,
        points: 41,
        slots: ["Sensor", "Missile", "Modification"]
    }, {
        name: "Storm Squadron Ace",
        id: 177,
        faction: "Galactic Empire",
        ship: "TIE Advanced",
        skill: 3,
        points: 39,
        slots: ["Talent", "Sensor", "Missile", "Modification"]
    }, {
        name: "Tempest Squadron Pilot",
        id: 178,
        faction: "Galactic Empire",
        ship: "TIE Advanced",
        skill: 2,
        points: 36,
        slots: ["Sensor", "Missile", "Modification"]
    }, {
        name: "Soontir Fel",
        id: 179,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Interceptor",
        skill: 6,
        points: 54,
        slots: ["Talent", "Modification", "Modification", "Configuration"]
    }, {
        name: "Turr Phennir",
        id: 180,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Interceptor",
        skill: 4,
        points: 42,
        slots: ["Talent", "Modification", "Modification", "Configuration"]
    }, {
        name: "Saber Squadron Ace",
        id: 181,
        faction: "Galactic Empire",
        ship: "TIE Interceptor",
        skill: 4,
        points: 35,
        slots: ["Talent", "Modification", "Modification", "Configuration"]
    }, {
        name: "Alpha Squadron Pilot",
        id: 182,
        faction: "Galactic Empire",
        ship: "TIE Interceptor",
        skill: 1,
        points: 31,
        slots: ["Modification", "Modification", "Configuration"]
    }, {
        name: "Major Vermeil",
        id: 183,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Reaper",
        skill: 4,
        points: 49,
        slots: ["Talent", "Crew", "Crew", "Modification"]
    }, {
        name: "Captain Feroph",
        id: 184,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Reaper",
        skill: 3,
        points: 47,
        slots: ["Talent", "Crew", "Crew", "Modification"]
    }, {
        name: '"Vizier"',
        id: 185,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Reaper",
        skill: 2,
        points: 45,
        slots: ["Crew", "Crew", "Modification"]
    }, {
        name: "Scarif Base Pilot",
        id: 186,
        faction: "Galactic Empire",
        ship: "TIE Reaper",
        skill: 1,
        points: 39,
        slots: ["Crew", "Crew", "Modification"]
    }, {
        name: "Lieutenant Kestal",
        id: 187,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Aggressor",
        skill: 4,
        points: 30,
        slots: ["Talent", "Turret", "Missile", "Missile", "Gunner", "Modification"]
    }, {
        name: '"Double Edge"',
        id: 188,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Aggressor",
        skill: 2,
        points: 28,
        slots: ["Talent", "Turret", "Missile", "Missile", "Gunner", "Modification"]
    }, {
        name: "Onyx Squadron Scout",
        id: 189,
        faction: "Galactic Empire",
        ship: "TIE Aggressor",
        skill: 3,
        points: 28,
        slots: ["Talent", "Turret", "Missile", "Missile", "Gunner", "Modification"]
    }, {
        name: "Sienar Specialist",
        id: 190,
        faction: "Galactic Empire",
        ship: "TIE Aggressor",
        skill: 2,
        points: 26,
        slots: ["Turret", "Missile", "Missile", "Gunner", "Modification"]
    }, {
        name: '"Redline"',
        id: 191,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Punisher",
        skill: 5,
        points: 51,
        slots: ["Sensor", "Torpedo", "Missile", "Missile", "Gunner", "Device", "Device", "Modification"]
    }, {
        name: '"Deathrain"',
        id: 192,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Punisher",
        skill: 4,
        points: 43,
        slots: ["Sensor", "Torpedo", "Missile", "Missile", "Gunner", "Device", "Device", "Modification"]
    }, {
        name: "Cutlass Squadron Pilot",
        id: 193,
        faction: "Galactic Empire",
        ship: "TIE Punisher",
        skill: 2,
        points: 35,
        slots: ["Sensor", "Torpedo", "Missile", "Missile", "Gunner", "Device", "Device", "Modification"]
    }, {
        name: "Colonel Vessery",
        id: 194,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Defender",
        skill: 4,
        points: 81,
        slots: ["Talent", "Sensor", "Cannon", "Missile", "Configuration"]
    }, {
        name: "Countess Ryad",
        id: 195,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Defender",
        skill: 4,
        points: 79,
        slots: ["Talent", "Sensor", "Cannon", "Missile", "Configuration"]
    }, {
        name: "Rexler Brath",
        id: 196,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Defender",
        skill: 5,
        points: 78,
        slots: ["Talent", "Sensor", "Cannon", "Missile", "Configuration"]
    }, {
        name: "Onyx Squadron Ace",
        id: 197,
        faction: "Galactic Empire",
        ship: "TIE Defender",
        skill: 4,
        points: 73,
        slots: ["Talent", "Sensor", "Cannon", "Missile", "Configuration"]
    }, {
        name: "Delta Squadron Pilot",
        id: 198,
        faction: "Galactic Empire",
        ship: "TIE Defender",
        skill: 1,
        points: 68,
        slots: ["Sensor", "Cannon", "Missile", "Configuration"]
    }, {
        name: '"Whisper"',
        id: 199,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Phantom",
        skill: 5,
        points: 60,
        slots: ["Talent", "Sensor", "Gunner", "Modification"]
    }, {
        name: '"Echo"',
        id: 200,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Phantom",
        skill: 4,
        points: 51,
        slots: ["Talent", "Sensor", "Gunner", "Modification"]
    }, {
        name: "Sigma Squadron Ace",
        id: 201,
        faction: "Galactic Empire",
        ship: "TIE Phantom",
        skill: 4,
        points: 48,
        slots: ["Talent", "Sensor", "Gunner", "Modification"]
    }, {
        name: "Imdaar Test Pilot",
        id: 202,
        faction: "Galactic Empire",
        ship: "TIE Phantom",
        skill: 3,
        points: 43,
        slots: ["Sensor", "Gunner", "Modification"]
    }, {
        name: "Captain Jonus",
        id: 203,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Bomber",
        skill: 4,
        points: 45,
        slots: ["Talent", "Torpedo", "Missile", "Missile", "Gunner", "Device", "Device", "Modification"]
    }, {
        name: "Major Rhymer",
        id: 204,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Bomber",
        skill: 4,
        points: 37,
        slots: ["Talent", "Torpedo", "Missile", "Missile", "Gunner", "Device", "Device", "Modification"]
    }, {
        name: "Tomax Bren",
        id: 205,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Bomber",
        skill: 5,
        points: 35,
        slots: ["Talent", "Torpedo", "Missile", "Missile", "Gunner", "Device", "Device", "Modification"]
    }, {
        name: '"Deathfire"',
        id: 206,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Bomber",
        skill: 2,
        points: 32,
        slots: ["Torpedo", "Missile", "Missile", "Gunner", "Device", "Device", "Modification"]
    }, {
        name: "Gamma Squadron Ace",
        id: 207,
        faction: "Galactic Empire",
        ship: "TIE Bomber",
        skill: 3,
        points: 30,
        slots: ["Talent", "Torpedo", "Missile", "Missile", "Gunner", "Device", "Device", "Modification"]
    }, {
        name: "Scimitar Squadron Pilot",
        id: 208,
        faction: "Galactic Empire",
        ship: "TIE Bomber",
        skill: 2,
        points: 27,
        slots: ["Torpedo", "Missile", "Missile", "Gunner", "Device", "Device", "Modification"]
    }, {
        name: '"Countdown"',
        id: 209,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Striker",
        skill: 4,
        points: 43,
        slots: ["Talent", "Gunner", "Device", "Modification"]
    }, {
        name: '"Pure Sabacc"',
        id: 210,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Striker",
        skill: 4,
        points: 43,
        slots: ["Talent", "Gunner", "Device", "Modification"]
    }, {
        name: '"Duchess"',
        id: 211,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Striker",
        skill: 5,
        points: 44,
        slots: ["Talent", "Gunner", "Device", "Modification"]
    }, {
        name: "Black Squadron Scout",
        id: 212,
        faction: "Galactic Empire",
        ship: "TIE Striker",
        skill: 3,
        points: 33,
        slots: ["Talent", "Gunner", "Device", "Modification"]
    }, {
        name: "Planetary Sentinel",
        id: 213,
        faction: "Galactic Empire",
        ship: "TIE Striker",
        skill: 1,
        points: 31,
        slots: ["Gunner", "Device", "Modification"]
    }, {
        name: "Rear Admiral Chiraneau",
        id: 214,
        unique: !0,
        faction: "Galactic Empire",
        ship: "VT-49 Decimator",
        skill: 5,
        points: 76,
        slots: ["Talent", "Torpedo", "Crew", "Crew", "Crew", "Gunner", "Device", "Modification", "Title"]
    }, {
        name: "Captain Oicunn",
        id: 215,
        unique: !0,
        faction: "Galactic Empire",
        ship: "VT-49 Decimator",
        skill: 3,
        points: 74,
        slots: ["Talent", "Torpedo", "Crew", "Crew", "Crew", "Gunner", "Device", "Modification", "Title"]
    }, {
        name: "Patrol Leader",
        id: 216,
        faction: "Galactic Empire",
        ship: "VT-49 Decimator",
        skill: 2,
        points: 67,
        slots: ["Torpedo", "Crew", "Crew", "Crew", "Gunner", "Device", "Modification", "Title"]
    }, {
        name: '"Howlrunner"',
        id: 217,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Fighter",
        skill: 5,
        points: 44,
        slots: ["Talent", "Modification"]
    }, {
        name: "Iden Versio",
        id: 218,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Fighter",
        skill: 4,
        charge: 1,
        points: 40,
        slots: ["Talent", "Modification"]
    }, {
        name: '"Mauler" Mithel',
        id: 219,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Fighter",
        skill: 5,
        points: 30,
        slots: ["Talent", "Modification"]
    }, {
        name: '"Scourge" Skutu',
        id: 220,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Fighter",
        skill: 5,
        points: 30,
        slots: ["Talent", "Modification"]
    }, {
        name: '"Wampa"',
        id: 221,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Fighter",
        skill: 1,
        recurring: 1,
        charge: 1,
        points: 28,
        slots: ["Modification"]
    }, {
        name: "Del Meeko",
        id: 222,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Fighter",
        skill: 4,
        points: 29,
        slots: ["Talent", "Modification"]
    }, {
        name: "Gideon Hask",
        id: 223,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Fighter",
        skill: 4,
        points: 29,
        slots: ["Talent", "Modification"]
    }, {
        name: "Seyn Marana",
        id: 224,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Fighter",
        skill: 4,
        points: 29,
        slots: ["Talent", "Modification"]
    }, {
        name: "Valen Rudor",
        id: 225,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Fighter",
        skill: 3,
        points: 26,
        slots: ["Talent", "Modification"]
    }, {
        name: '"Night Beast"',
        id: 226,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Fighter",
        skill: 2,
        points: 25,
        slots: ["Modification"]
    }, {
        name: "Black Squadron Ace",
        id: 227,
        faction: "Galactic Empire",
        ship: "TIE Fighter",
        skill: 3,
        points: 25,
        slots: ["Talent", "Modification"]
    }, {
        name: "Obsidian Squadron Pilot",
        id: 228,
        faction: "Galactic Empire",
        ship: "TIE Fighter",
        skill: 2,
        points: 23,
        slots: ["Modification"]
    }, {
        name: "Academy Pilot",
        id: 229,
        faction: "Galactic Empire",
        ship: "TIE Fighter",
        skill: 1,
        points: 22,
        slots: ["Modification"]
    }, {
        name: "Spice Runner",
        id: 230,
        faction: "Scum and Villainy",
        ship: "HWK-290",
        skill: 1,
        points: 28,
        slots: ["Crew", "Device", "Illicit", "Modification", "Modification", "Title"]
    }, {
        name: "Poe Dameron",
        id: 231,
        unique: !0,
        faction: "Resistance",
        ship: "T-70 X-Wing",
        skill: 6,
        points: 62,
        charge: 1,
        recurring: 1,
        slots: ["Talent", "Astromech", "Tech", "Modification", "Configuration", "Title", "HardpointShip"]
    }, {
        id: 232,
        skip: !0
    }, {
        name: '"Midnight"',
        id: 233,
        unique: !0,
        faction: "First Order",
        ship: "TIE/FO Fighter",
        skill: 6,
        points: 42,
        slots: ["Talent", "Tech", "Modification"]
    }, {
        name: '"Longshot"',
        id: 234,
        skip: !0,
        unique: !0,
        faction: "First Order",
        ship: "TIE/FO Fighter",
        skill: 3,
        points: 32,
        slots: ["Talent", "Tech", "Modification"]
    }, {
        name: '"Muse"',
        id: 235,
        unique: !0,
        faction: "First Order",
        ship: "TIE/FO Fighter",
        skill: 2,
        points: 30,
        slots: ["Talent", "Tech", "Modification"]
    }, {
        name: "Kylo Ren",
        id: 236,
        unique: !0,
        faction: "First Order",
        ship: "TIE/VN Silencer",
        skill: 5,
        force: 2,
        keyword: ["Dark Side"],
        points: 76,
        applies_condition: "I'll Show You the Dark Side",
        slots: ["Force", "Tech", "Torpedo", "Missile", "Configuration"]
    }, {
        name: '"Blackout"',
        id: 237,
        unique: !0,
        faction: "First Order",
        ship: "TIE/VN Silencer",
        skill: 5,
        points: 63,
        slots: ["Talent", "Tech", "Torpedo", "Missile", "Configuration"]
    }, {
        name: "Lieutenant Dormitz",
        id: 238,
        unique: !0,
        faction: "First Order",
        ship: "Upsilon-Class Command Shuttle",
        skill: 2,
        points: 66,
        slots: ["Tech", "Tech", "Crew", "Crew", "Crew", "Cannon", "Sensor", "Modification"]
    }, {
        name: "L'ulo L'ampar",
        id: 239,
        unique: !0,
        faction: "Resistance",
        ship: "RZ-2 A-Wing",
        skill: 5,
        points: 42,
        slots: ["Talent", "Talent", "Missile", "Tech"]
    }, {
        name: "Tallissan Lintra",
        id: 240,
        unique: !0,
        faction: "Resistance",
        ship: "RZ-2 A-Wing",
        skill: 5,
        charge: 1,
        recurring: 1,
        points: 37,
        slots: ["Talent", "Talent", "Missile", "Tech"]
    }, {
        name: "blanks",
        id: 241,
        skip: !0
    }, {
        name: '"Backdraft"',
        id: 242,
        unique: !0,
        faction: "First Order",
        ship: "TIE/SF Fighter",
        skill: 4,
        points: 38,
        slots: ["Talent", "Tech", "Missile", "Gunner", "Sensor", "Modification"]
    }, {
        name: '"Quickdraw"',
        id: 243,
        unique: !0,
        faction: "First Order",
        ship: "TIE/SF Fighter",
        skill: 6,
        charge: 1,
        recurring: 1,
        points: 47,
        slots: ["Talent", "Tech", "Missile", "Gunner", "Sensor", "Modification"]
    }, {
        name: "Rey",
        id: 244,
        unique: !0,
        faction: "Resistance",
        ship: "Scavenged YT-1300",
        keyword: ["Light Side"],
        skill: 5,
        points: 68,
        force: 2,
        slots: ["Force", "Missile", "Crew", "Crew", "Gunner", "Illicit", "Modification", "Title"]
    }, {
        name: "Han Solo (Resistance)",
        id: 245,
        unique: !0,
        xws: "hansolo-scavengedyt1300",
        faction: "Resistance",
        ship: "Scavenged YT-1300",
        skill: 6,
        points: 62,
        slots: ["Talent", "Missile", "Crew", "Crew", "Gunner", "Illicit", "Modification", "Title"]
    }, {
        name: "Chewbacca (Resistance)",
        id: 246,
        unique: !0,
        faction: "Resistance",
        xws: "chewbacca-scavengedyt1300",
        ship: "Scavenged YT-1300",
        skill: 4,
        points: 60,
        slots: ["Talent", "Missile", "Crew", "Crew", "Gunner", "Illicit", "Modification", "Title"]
    }, {
        name: "Captain Seevor",
        id: 247,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Mining Guild TIE Fighter",
        skill: 3,
        charge: 1,
        recurring: 1,
        points: 30,
        slots: ["Talent", "Modification"]
    }, {
        name: "Mining Guild Surveyor",
        id: 248,
        faction: "Scum and Villainy",
        ship: "Mining Guild TIE Fighter",
        skill: 2,
        points: 23,
        slots: ["Talent", "Modification"]
    }, {
        name: "Ahhav",
        id: 249,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Mining Guild TIE Fighter",
        skill: 3,
        points: 30,
        slots: ["Talent", "Modification"]
    }, {
        name: "Finch Dallow",
        id: 250,
        unique: !0,
        faction: "Resistance",
        ship: "MG-100 StarFortress",
        skill: 4,
        points: 56,
        slots: ["Sensor", "Tech", "Crew", "Gunner", "Gunner", "Device", "Device", "Modification"]
    }, {
        name: "Major Stridan",
        id: 251,
        unique: !0,
        faction: "First Order",
        ship: "Upsilon-Class Command Shuttle",
        skill: 4,
        points: 61,
        slots: ["Tech", "Tech", "Crew", "Crew", "Crew", "Cannon", "Sensor", "Modification"]
    }, {
        name: "Kare Kun",
        id: 252,
        unique: !0,
        faction: "Resistance",
        ship: "T-70 X-Wing",
        skill: 4,
        points: 50,
        slots: ["Talent", "Astromech", "Tech", "Modification", "Configuration", "Title", "HardpointShip"]
    }, {
        name: "Joph Seastriker",
        id: 253,
        unique: !0,
        faction: "Resistance",
        ship: "T-70 X-Wing",
        skill: 3,
        points: 48,
        slots: ["Talent", "Astromech", "Tech", "Modification", "Configuration", "Title", "HardpointShip"]
    }, {
        name: "Lieutenant Bastian",
        id: 254,
        unique: !0,
        faction: "Resistance",
        ship: "T-70 X-Wing",
        skill: 2,
        points: 47,
        slots: ["Astromech", "Tech", "Modification", "Configuration", "Title", "HardpointShip"]
    }, {
        name: "Jaycris Tubbs",
        id: 255,
        unique: !0,
        faction: "Resistance",
        ship: "T-70 X-Wing",
        skill: 1,
        points: 47,
        slots: ["Astromech", "Tech", "Modification", "Configuration", "Title", "HardpointShip"]
    }, {
        name: "Black Squadron Ace (T-70)",
        id: 256,
        faction: "Resistance",
        xws: "blacksquadronace-t70xwing",
        ship: "T-70 X-Wing",
        skill: 4,
        points: 46,
        slots: ["Talent", "Astromech", "Tech", "Modification", "Configuration", "Title", "HardpointShip"]
    }, {
        name: "Red Squadron Expert",
        id: 257,
        faction: "Resistance",
        ship: "T-70 X-Wing",
        skill: 3,
        points: 43,
        slots: ["Talent", "Astromech", "Tech", "Modification", "Configuration", "Title", "HardpointShip"]
    }, {
        name: "Blue Squadron Rookie",
        id: 258,
        faction: "Resistance",
        ship: "T-70 X-Wing",
        skill: 1,
        points: 41,
        slots: ["Astromech", "Tech", "Modification", "Configuration", "Title", "HardpointShip"]
    }, {
        name: "Zeta Squadron Survivor",
        id: 259,
        faction: "First Order",
        ship: "TIE/SF Fighter",
        skill: 2,
        points: 32,
        slots: ["Tech", "Missile", "Gunner", "Sensor", "Modification"]
    }, {
        name: "Cobalt Squadron Bomber",
        id: 260,
        faction: "Resistance",
        ship: "MG-100 StarFortress",
        skill: 1,
        points: 51,
        slots: ["Sensor", "Tech", "Crew", "Gunner", "Gunner", "Device", "Device", "Modification"]
    }, {
        name: "TN-3465",
        id: 261,
        unique: !0,
        faction: "First Order",
        ship: "TIE/FO Fighter",
        skill: 2,
        points: 28,
        slots: ["Tech", "Modification"]
    }, {
        name: '"Scorch"',
        id: 262,
        unique: !0,
        faction: "First Order",
        ship: "TIE/FO Fighter",
        skill: 4,
        points: 33,
        slots: ["Talent", "Tech", "Modification"]
    }, {
        name: '"Longshot"',
        id: 263,
        unique: !0,
        faction: "First Order",
        ship: "TIE/FO Fighter",
        skill: 3,
        points: 31,
        slots: ["Talent", "Tech", "Modification"]
    }, {
        name: '"Static"',
        id: 264,
        unique: !0,
        faction: "First Order",
        ship: "TIE/FO Fighter",
        skill: 4,
        points: 33,
        slots: ["Talent", "Tech", "Modification"]
    }, {
        name: "Lieutenant Rivas",
        id: 265,
        unique: !0,
        faction: "First Order",
        ship: "TIE/FO Fighter",
        skill: 1,
        points: 27,
        slots: ["Tech", "Modification"]
    }, {
        name: "Commander Malarus",
        id: 266,
        unique: !0,
        faction: "First Order",
        ship: "TIE/FO Fighter",
        skill: 5,
        points: 38,
        charge: 2,
        slots: ["Talent", "Tech", "Modification"]
    }, {
        name: "Omega Squadron Ace",
        id: 267,
        faction: "First Order",
        ship: "TIE/FO Fighter",
        skill: 3,
        points: 28,
        slots: ["Talent", "Tech", "Modification"]
    }, {
        name: "Zeta Squadron Pilot",
        id: 268,
        faction: "First Order",
        ship: "TIE/FO Fighter",
        skill: 2,
        points: 26,
        slots: ["Tech", "Modification"]
    }, {
        name: "Epsilon Squadron Cadet",
        id: 269,
        faction: "First Order",
        ship: "TIE/FO Fighter",
        skill: 1,
        points: 25,
        slots: ["Tech", "Modification"]
    }, {
        name: "Greer Sonnel",
        id: 270,
        unique: !0,
        faction: "Resistance",
        ship: "RZ-2 A-Wing",
        skill: 4,
        points: 36,
        slots: ["Talent", "Talent", "Missile", "Tech"]
    }, {
        name: "Zari Bangel",
        id: 271,
        unique: !0,
        faction: "Resistance",
        ship: "RZ-2 A-Wing",
        skill: 3,
        points: 35,
        slots: ["Talent", "Talent", "Missile", "Tech"]
    }, {
        name: "Darth Maul",
        id: 272,
        unique: !0,
        faction: "Separatist Alliance",
        ship: "Sith Infiltrator",
        skill: 5,
        force: 3,
        keyword: ["Dark Side", "Sith"],
        points: 65,
        slots: ["Force", "Cannon", "Torpedo", "Crew", "Crew", "Device", "Modification", "Title", "Tactical Relay"]
    }, {
        name: "Anakin Skywalker",
        id: 273,
        unique: !0,
        faction: "Galactic Republic",
        ship: "Delta-7 Aethersprite",
        skill: 6,
        force: 3,
        points: 61,
        keyword: ["Jedi", "Light Side"],
        slots: ["Force", "Astromech", "Configuration", "Modification"]
    }, {
        name: "Luminara Unduli",
        id: 274,
        unique: !0,
        faction: "Galactic Republic",
        ship: "Delta-7 Aethersprite",
        skill: 4,
        force: 2,
        points: 42,
        keyword: ["Jedi", "Light Side"],
        slots: ["Force", "Astromech", "Configuration", "Modification"]
    }, {
        name: "Barriss Offee",
        id: 275,
        unique: !0,
        faction: "Galactic Republic",
        ship: "Delta-7 Aethersprite",
        skill: 4,
        force: 1,
        points: 38,
        keyword: ["Jedi", "Light Side"],
        slots: ["Force", "Astromech", "Configuration", "Modification"]
    }, {
        name: "Ahsoka Tano",
        id: 276,
        unique: !0,
        faction: "Galactic Republic",
        ship: "Delta-7 Aethersprite",
        skill: 3,
        force: 2,
        points: 43,
        keyword: ["Jedi", "Light Side"],
        slots: ["Force", "Astromech", "Configuration", "Modification"]
    }, {
        name: "Jedi Knight",
        id: 277,
        faction: "Galactic Republic",
        ship: "Delta-7 Aethersprite",
        skill: 3,
        force: 1,
        points: 37,
        keyword: ["Jedi", "Light Side"],
        slots: ["Force", "Astromech", "Configuration", "Modification"]
    }, {
        name: "Obi-Wan Kenobi",
        id: 278,
        unique: !0,
        faction: "Galactic Republic",
        ship: "Delta-7 Aethersprite",
        skill: 5,
        force: 3,
        points: 49,
        keyword: ["Jedi", "Light Side"],
        slots: ["Force", "Astromech", "Configuration", "Modification"]
    }, {
        name: "Trade Federation Drone",
        id: 279,
        faction: "Separatist Alliance",
        ship: "Vulture-class Droid Fighter",
        skill: 1,
        points: 20,
        keyword: ["Droid"],
        slots: ["Missile", "Configuration", "Modification"]
    }, {
        name: '"Sinker"',
        id: 280,
        unique: !0,
        faction: "Galactic Republic",
        ship: "ARC-170",
        skill: 3,
        points: 54,
        keyword: ["Clone"],
        slots: ["Torpedo", "Crew", "Gunner", "Astromech", "Modification"]
    }, {
        name: "Petty Officer Thanisson",
        id: 281,
        unique: !0,
        faction: "First Order",
        ship: "Upsilon-Class Command Shuttle",
        skill: 1,
        points: 59,
        charge: 1,
        recurring: 1,
        slots: ["Tech", "Tech", "Crew", "Crew", "Crew", "Cannon", "Sensor", "Modification"]
    }, {
        name: "Captain Cardinal",
        id: 282,
        unique: !0,
        faction: "First Order",
        ship: "Upsilon-Class Command Shuttle",
        skill: 4,
        points: 62,
        charge: 2,
        slots: ["Tech", "Tech", "Crew", "Crew", "Crew", "Cannon", "Sensor", "Modification"]
    }, {
        name: '"Avenger"',
        id: 283,
        unique: !0,
        faction: "First Order",
        ship: "TIE/VN Silencer",
        skill: 3,
        points: 56,
        slots: ["Talent", "Tech", "Torpedo", "Missile", "Configuration"]
    }, {
        name: '"Recoil"',
        id: 284,
        unique: !0,
        faction: "First Order",
        ship: "TIE/VN Silencer",
        skill: 4,
        points: 57,
        slots: ["Talent", "Tech", "Torpedo", "Missile", "Configuration"]
    }, {
        name: "Omega Squadron Expert",
        id: 285,
        faction: "First Order",
        ship: "TIE/SF Fighter",
        skill: 3,
        points: 34,
        slots: ["Talent", "Tech", "Missile", "Gunner", "Sensor", "Modification"]
    }, {
        name: "Sienar-Jaemus Engineer",
        id: 286,
        faction: "First Order",
        ship: "TIE/VN Silencer",
        skill: 1,
        points: 48,
        slots: ["Tech", "Torpedo", "Missile", "Configuration"]
    }, {
        name: "First Order Test Pilot",
        id: 287,
        faction: "First Order",
        ship: "TIE/VN Silencer",
        skill: 4,
        points: 56,
        slots: ["Talent", "Tech", "Torpedo", "Missile", "Configuration"]
    }, {
        name: "Starkiller Base Pilot",
        id: 288,
        faction: "First Order",
        ship: "Upsilon-Class Command Shuttle",
        skill: 2,
        points: 58,
        slots: ["Tech", "Tech", "Crew", "Crew", "Crew", "Cannon", "Sensor", "Modification"]
    }, {
        name: "Lieutenant Tavson",
        id: 289,
        unique: !0,
        faction: "First Order",
        ship: "Upsilon-Class Command Shuttle",
        skill: 3,
        charge: 2,
        recurring: 1,
        points: 64,
        slots: ["Tech", "Tech", "Crew", "Crew", "Crew", "Cannon", "Sensor", "Modification"]
    }, {
        name: '"Null"',
        id: 290,
        unique: !0,
        faction: "First Order",
        ship: "TIE/FO Fighter",
        skill: 0,
        points: 30,
        slots: ["Tech", "Modification"]
    }, {
        name: "Cat",
        id: 291,
        unique: !0,
        faction: "Resistance",
        ship: "MG-100 StarFortress",
        skill: 1,
        points: 52,
        slots: ["Sensor", "Tech", "Crew", "Gunner", "Gunner", "Device", "Device", "Modification"]
    }, {
        name: "Ben Teene",
        id: 292,
        unique: !0,
        faction: "Resistance",
        ship: "MG-100 StarFortress",
        skill: 3,
        points: 54,
        slots: ["Sensor", "Tech", "Crew", "Gunner", "Gunner", "Device", "Device", "Modification"],
        applies_condition: "Rattled"
    }, {
        name: "Edon Kappehl",
        id: 293,
        unique: !0,
        faction: "Resistance",
        ship: "MG-100 StarFortress",
        skill: 3,
        points: 56,
        slots: ["Sensor", "Tech", "Crew", "Gunner", "Gunner", "Device", "Device", "Modification"]
    }, {
        name: "Vennie",
        id: 294,
        unique: !0,
        faction: "Resistance",
        ship: "MG-100 StarFortress",
        skill: 2,
        points: 54,
        slots: ["Sensor", "Tech", "Crew", "Gunner", "Gunner", "Device", "Device", "Modification"]
    }, {
        name: "Resistance Sympathizer",
        id: 295,
        faction: "Resistance",
        ship: "Scavenged YT-1300",
        skill: 2,
        points: 58,
        slots: ["Missile", "Crew", "Crew", "Gunner", "Illicit", "Modification", "Title"]
    }, {
        name: "Jessika Pava",
        id: 296,
        unique: !0,
        faction: "Resistance",
        ship: "T-70 X-Wing",
        skill: 3,
        points: 51,
        charge: 1,
        recurring: 1,
        slots: ["Astromech", "Tech", "Modification", "Configuration", "Title", "HardpointShip"]
    }, {
        name: "Temmin Wexley",
        id: 297,
        unique: !0,
        faction: "Resistance",
        ship: "T-70 X-Wing",
        skill: 4,
        points: 52,
        slots: ["Talent", "Astromech", "Tech", "Modification", "Configuration", "Title", "HardpointShip"]
    }, {
        name: "Nien Nunb",
        id: 298,
        unique: !0,
        faction: "Resistance",
        ship: "T-70 X-Wing",
        skill: 5,
        points: 55,
        slots: ["Talent", "Astromech", "Tech", "Modification", "Configuration", "Title", "HardpointShip"]
    }, {
        name: "Ello Asty",
        id: 299,
        unique: !0,
        faction: "Resistance",
        ship: "T-70 X-Wing",
        skill: 5,
        points: 54,
        slots: ["Talent", "Astromech", "Tech", "Modification", "Configuration", "Title", "HardpointShip"]
    }, {
        name: "Green Squadron Expert",
        id: 300,
        faction: "Resistance",
        ship: "RZ-2 A-Wing",
        skill: 3,
        points: 34,
        slots: ["Talent", "Talent", "Missile", "Tech"]
    }, {
        name: "Blue Squadron Recruit",
        id: 301,
        faction: "Resistance",
        ship: "RZ-2 A-Wing",
        skill: 1,
        points: 33,
        slots: ["Talent", "Missile", "Tech"]
    }, {
        name: "Foreman Proach",
        id: 302,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Mining Guild TIE Fighter",
        skill: 4,
        points: 32,
        slots: ["Talent", "Modification"]
    }, {
        name: "Overseer Yushyn",
        id: 303,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Mining Guild TIE Fighter",
        skill: 2,
        charge: 1,
        recurring: 1,
        points: 26,
        slots: ["Modification"]
    }, {
        name: "Mining Guild Sentry",
        id: 304,
        faction: "Scum and Villainy",
        ship: "Mining Guild TIE Fighter",
        skill: 1,
        points: 22,
        slots: ["Modification"]
    }, {
        name: "General Grievous",
        id: 305,
        faction: "Separatist Alliance",
        ship: "Belbullab-22 Starfighter",
        unique: !0,
        skill: 4,
        points: 44,
        slots: ["Talent", "Tactical Relay", "Modification", "Title"]
    }, {
        name: "Wat Tambor",
        id: 306,
        faction: "Separatist Alliance",
        ship: "Belbullab-22 Starfighter",
        unique: !0,
        skill: 3,
        points: 42,
        slots: ["Talent", "Tactical Relay", "Modification", "Title"]
    }, {
        name: "Feethan Ottraw Autopilot",
        id: 307,
        faction: "Separatist Alliance",
        ship: "Belbullab-22 Starfighter",
        skill: 1,
        points: 35,
        keyword: ["Droid"],
        slots: ["Tactical Relay", "Modification", "Title"]
    }, {
        name: "Captain Sear",
        id: 308,
        faction: "Separatist Alliance",
        ship: "Belbullab-22 Starfighter",
        unique: !0,
        skill: 2,
        points: 45,
        slots: ["Tactical Relay", "Modification", "Title"]
    }, {
        name: "Precise Hunter",
        id: 309,
        faction: "Separatist Alliance",
        ship: "Vulture-class Droid Fighter",
        skill: 3,
        points: 23,
        max_per_squad: 3,
        keyword: ["Droid"],
        slots: ["Missile", "Configuration", "Modification"]
    }, {
        name: "Haor Chall Prototype",
        id: 310,
        faction: "Separatist Alliance",
        ship: "Vulture-class Droid Fighter",
        skill: 1,
        points: 21,
        max_per_squad: 2,
        keyword: ["Droid"],
        slots: ["Missile", "Configuration", "Modification"]
    }, {
        name: "DFS-081",
        id: 311,
        faction: "Separatist Alliance",
        ship: "Vulture-class Droid Fighter",
        skill: 3,
        points: 26,
        unique: !0,
        keyword: ["Droid"],
        slots: ["Missile", "Configuration", "Modification"]
    }, {
        name: "Plo Koon",
        id: 312,
        unique: !0,
        faction: "Galactic Republic",
        ship: "Delta-7 Aethersprite",
        skill: 5,
        force: 2,
        points: 45,
        keyword: ["Jedi", "Light Side"],
        slots: ["Force", "Astromech", "Configuration", "Modification"]
    }, {
        name: "Saesee Tiin",
        id: 313,
        unique: !0,
        faction: "Galactic Republic",
        ship: "Delta-7 Aethersprite",
        skill: 4,
        force: 2,
        points: 42,
        keyword: ["Jedi", "Light Side"],
        slots: ["Force", "Astromech", "Configuration", "Modification"]
    }, {
        name: "Mace Windu",
        id: 314,
        unique: !0,
        faction: "Galactic Republic",
        ship: "Delta-7 Aethersprite",
        skill: 4,
        force: 3,
        points: 46,
        keyword: ["Jedi", "Light Side"],
        slots: ["Force", "Astromech", "Configuration", "Modification"]
    }, {
        name: '"Kickback"',
        id: 315,
        unique: !0,
        faction: "Galactic Republic",
        ship: "V-19 Torrent",
        skill: 4,
        points: 30,
        keyword: ["Clone"],
        slots: ["Talent", "Missile", "Modification"]
    }, {
        name: '"Odd Ball"',
        id: 316,
        unique: !0,
        faction: "Galactic Republic",
        ship: "V-19 Torrent",
        skill: 5,
        points: 30,
        keyword: ["Clone"],
        slots: ["Talent", "Missile", "Modification"]
    }, {
        name: '"Swoop"',
        id: 317,
        unique: !0,
        faction: "Galactic Republic",
        ship: "V-19 Torrent",
        skill: 3,
        points: 28,
        keyword: ["Clone"],
        slots: ["Missile", "Modification"]
    }, {
        name: '"Axe"',
        id: 318,
        unique: !0,
        faction: "Galactic Republic",
        ship: "V-19 Torrent",
        skill: 3,
        points: 29,
        keyword: ["Clone"],
        slots: ["Talent", "Missile", "Modification"]
    }, {
        name: '"Tucker"',
        id: 319,
        unique: !0,
        faction: "Galactic Republic",
        ship: "V-19 Torrent",
        skill: 2,
        points: 27,
        keyword: ["Clone"],
        slots: ["Missile", "Modification"]
    }, {
        name: "Blue Squadron Protector",
        id: 320,
        faction: "Galactic Republic",
        ship: "V-19 Torrent",
        skill: 3,
        points: 26,
        keyword: ["Clone"],
        slots: ["Talent", "Missile", "Modification"]
    }, {
        name: "Gold Squadron Trooper",
        id: 321,
        faction: "Galactic Republic",
        ship: "V-19 Torrent",
        skill: 2,
        points: 25,
        keyword: ["Clone"],
        slots: ["Missile", "Modification"]
    }, {
        name: "Anakin Skywalker (N-1 Starfighter)",
        canonical_name: "Anakin Skywalker",
        xws: "anakinskywalker-nabooroyaln1starfighter",
        id: 322,
        unique: !0,
        faction: "Galactic Republic",
        ship: "Naboo Royal N-1 Starfighter",
        skill: 4,
        force: 1,
        points: 41,
        keyword: ["Light Side"],
        slots: ["Talent", "Sensor", "Astromech", "Torpedo"]
    }, {
        name: "Bravo Flight Officer",
        id: 323,
        faction: "Galactic Republic",
        ship: "Naboo Royal N-1 Starfighter",
        skill: 2,
        points: 33,
        slots: ["Sensor", "Astromech", "Torpedo"]
    }, {
        name: "Techno Union Bomber",
        id: 324,
        faction: "Separatist Alliance",
        ship: "Hyena-Class Droid Bomber",
        skill: 1,
        points: 25,
        keyword: ["Droid"],
        slots: ["Torpedo", "Missile", "Device", "Modification", "Configuration"]
    }, {
        name: "Bombardment Drone",
        id: 325,
        faction: "Separatist Alliance",
        ship: "Hyena-Class Droid Bomber",
        skill: 3,
        max_per_squad: 3,
        keyword: ["Droid"],
        points: 29,
        slots: ["Sensor", "Device", "Device", "Modification", "Configuration"]
    }, {
        name: "DBS-404",
        id: 326,
        unique: !0,
        faction: "Separatist Alliance",
        ship: "Hyena-Class Droid Bomber",
        skill: 4,
        points: 30,
        keyword: ["Droid"],
        slots: ["Torpedo", "Missile", "Device", "Modification", "Configuration"]
    }, {
        name: "Separatist Bomber",
        id: 327,
        faction: "Separatist Alliance",
        ship: "Hyena-Class Droid Bomber",
        skill: 3,
        points: 28,
        keyword: ["Droid"],
        slots: ["Torpedo", "Missile", "Device", "Modification", "Configuration"]
    }, {
        name: "DBS-32C",
        id: 328,
        unique: !0,
        faction: "Separatist Alliance",
        ship: "Hyena-Class Droid Bomber",
        skill: 3,
        points: 40,
        keyword: ["Droid"],
        slots: ["Sensor", "Tactical Relay", "Modification", "Configuration"],
        ship_override: {
            actions: ["Calculate", "Lock", "Barrel Roll", "R-> Lock", "R-Jam"]
        }
    }, {
        name: "Baktoid Prototype",
        id: 329,
        max_per_squad: 2,
        faction: "Separatist Alliance",
        ship: "Hyena-Class Droid Bomber",
        skill: 1,
        points: 28,
        keyword: ["Droid"],
        slots: ["Sensor", "Missile", "Missile", "Modification", "Configuration"]
    }, {
        name: "Naboo Handmaiden",
        id: 330,
        max_per_squad: 2,
        faction: "Galactic Republic",
        ship: "Naboo Royal N-1 Starfighter",
        skill: 1,
        points: 42,
        applies_condition: "Decoyed",
        slots: ["Sensor", "Astromech", "Torpedo"]
    }, {
        name: "Dineé Ellberger",
        id: 331,
        xws: "dineeellberger",
        unique: !0,
        faction: "Galactic Republic",
        ship: "Naboo Royal N-1 Starfighter",
        skill: 3,
        points: 38,
        slots: ["Talent", "Sensor", "Astromech", "Torpedo"]
    }, {
        name: "Padmé Amidala",
        id: 332,
        xws: "padmeamidala",
        unique: !0,
        faction: "Galactic Republic",
        ship: "Naboo Royal N-1 Starfighter",
        skill: 4,
        points: 44,
        slots: ["Talent", "Sensor", "Astromech", "Torpedo"]
    }, {
        name: "Ric Olié",
        id: 333,
        xws: "ricolie",
        unique: !0,
        faction: "Galactic Republic",
        ship: "Naboo Royal N-1 Starfighter",
        skill: 5,
        points: 45,
        slots: ["Talent", "Sensor", "Astromech", "Torpedo"]
    }, {
        name: "Count Dooku",
        id: 334,
        unique: !0,
        faction: "Separatist Alliance",
        ship: "Sith Infiltrator",
        skill: 3,
        force: 3,
        keyword: ["Dark Side", "Sith"],
        points: 63,
        slots: ["Force", "Cannon", "Torpedo", "Crew", "Crew", "Device", "Modification", "Title", "Tactical Relay"]
    }, {
        name: "0-66",
        id: 335,
        unique: !0,
        faction: "Separatist Alliance",
        ship: "Sith Infiltrator",
        skill: 3,
        points: 49,
        keyword: ["Droid"],
        slots: ["Talent", "Cannon", "Torpedo", "Crew", "Crew", "Device", "Modification", "Title", "Tactical Relay"]
    }, {
        name: "Dark Courier",
        id: 336,
        faction: "Separatist Alliance",
        ship: "Sith Infiltrator",
        skill: 2,
        points: 51,
        slots: ["Cannon", "Torpedo", "Crew", "Crew", "Device", "Modification", "Title", "Tactical Relay"]
    }, {
        name: "DFS-311",
        id: 337,
        faction: "Separatist Alliance",
        ship: "Vulture-class Droid Fighter",
        skill: 1,
        points: 23,
        unique: !0,
        keyword: ["Droid"],
        slots: ["Missile", "Configuration", "Modification"]
    }, {
        name: '"Odd Ball" (ARC-170)',
        id: 338,
        xws: "oddball-arc170starfighter",
        canonical_name: '"Odd Ball"',
        unique: !0,
        faction: "Galactic Republic",
        ship: "ARC-170",
        skill: 5,
        points: 48,
        keyword: ["Clone"],
        slots: ["Talent", "Torpedo", "Crew", "Gunner", "Astromech", "Modification"]
    }, {
        name: '"Jag"',
        id: 339,
        unique: !0,
        faction: "Galactic Republic",
        ship: "ARC-170",
        skill: 3,
        points: 48,
        keyword: ["Clone"],
        slots: ["Torpedo", "Crew", "Gunner", "Astromech", "Modification"]
    }, {
        name: "Squad Seven Veteran",
        id: 340,
        faction: "Galactic Republic",
        ship: "ARC-170",
        skill: 3,
        points: 44,
        keyword: ["Clone"],
        slots: ["Talent", "Torpedo", "Crew", "Gunner", "Astromech", "Modification"]
    }, {
        name: "104th Battalion Pilot",
        id: 341,
        faction: "Galactic Republic",
        ship: "ARC-170",
        skill: 2,
        points: 42,
        keyword: ["Clone"],
        slots: ["Torpedo", "Crew", "Gunner", "Astromech", "Modification"]
    }, {
        name: '"Wolffe"',
        id: 342,
        unique: !0,
        faction: "Galactic Republic",
        ship: "ARC-170",
        skill: 4,
        charge: 1,
        points: 49,
        keyword: ["Clone"],
        slots: ["Talent", "Torpedo", "Crew", "Gunner", "Astromech", "Modification"]
    }, {
        name: "Separatist Drone",
        id: 343,
        faction: "Separatist Alliance",
        ship: "Vulture-class Droid Fighter",
        skill: 3,
        points: 22,
        keyword: ["Droid"],
        slots: ["Missile", "Configuration", "Modification"]
    }, {
        name: "Skakoan Ace",
        id: 344,
        faction: "Separatist Alliance",
        ship: "Belbullab-22 Starfighter",
        skill: 3,
        points: 38,
        slots: ["Talent", "Tactical Relay", "Modification", "Title"]
    }, {
        name: "Rose Tico",
        id: 345,
        unique: !0,
        faction: "Resistance",
        ship: "Resistance Transport Pod",
        skill: 3,
        points: 25,
        slots: ["Talent", "Tech", "Crew", "Modification"]
    }, {
        name: "Logistics Division Pilot",
        id: 346,
        faction: "Resistance",
        ship: "Resistance Transport",
        skill: 1,
        points: 32,
        slots: ["Tech", "Cannon", "Torpedo", "Crew", "Crew", "Astromech", "Modification"]
    }, {
        name: "Pammich Nerro Goode",
        id: 347,
        unique: !0,
        faction: "Resistance",
        ship: "Resistance Transport",
        skill: 3,
        points: 34,
        slots: ["Tech", "Cannon", "Torpedo", "Crew", "Crew", "Astromech", "Modification"]
    }, {
        name: "Vi Moradi",
        id: 348,
        unique: !0,
        faction: "Resistance",
        ship: "Resistance Transport Pod",
        skill: 1,
        points: 27,
        applies_condition: "Compromising Intel",
        slots: ["Tech", "Crew", "Modification"]
    }, {
        name: "BB-8",
        id: 349,
        unique: !0,
        faction: "Resistance",
        ship: "Resistance Transport Pod",
        skill: 3,
        points: 25,
        keyword: ["Droid"],
        slots: ["Talent", "Tech", "Crew", "Modification"]
    }, {
        name: "Finn",
        id: 350,
        unique: !0,
        faction: "Resistance",
        ship: "Resistance Transport Pod",
        skill: 2,
        points: 30,
        slots: ["Talent", "Tech", "Crew", "Modification"]
    }, {
        name: "Cova Nell",
        id: 351,
        unique: !0,
        faction: "Resistance",
        ship: "Resistance Transport",
        skill: 4,
        points: 38,
        slots: ["Talent", "Tech", "Cannon", "Torpedo", "Crew", "Crew", "Astromech", "Modification"]
    }, {
        name: "Nodin Chavdri",
        id: 352,
        unique: !0,
        faction: "Resistance",
        ship: "Resistance Transport",
        skill: 2,
        points: 35,
        slots: ["Tech", "Cannon", "Torpedo", "Crew", "Crew", "Astromech", "Modification"]
    }, {
        name: "Stalgasin Hive Guard",
        id: 353,
        faction: "Separatist Alliance",
        ship: "Nantex-Class Starfighter",
        skill: 3,
        points: 33,
        slots: ["Talent"]
    }, {
        name: "Petranaki Arena Ace",
        id: 354,
        faction: "Separatist Alliance",
        ship: "Nantex-Class Starfighter",
        skill: 4,
        points: 35,
        slots: ["Talent", "Talent"]
    }, {
        name: "Gorgol",
        unique: !0,
        id: 355,
        faction: "Separatist Alliance",
        ship: "Nantex-Class Starfighter",
        skill: 2,
        points: 32,
        slots: ["Talent", "Modification"]
    }, {
        name: "Chertek",
        unique: !0,
        id: 356,
        faction: "Separatist Alliance",
        ship: "Nantex-Class Starfighter",
        skill: 4,
        points: 36,
        slots: ["Talent", "Talent"]
    }, {
        name: "Sun Fac",
        unique: !0,
        id: 357,
        faction: "Separatist Alliance",
        ship: "Nantex-Class Starfighter",
        skill: 6,
        points: 45,
        slots: ["Talent", "Talent"]
    }, {
        name: "Berwer Kret",
        unique: !0,
        id: 358,
        faction: "Separatist Alliance",
        ship: "Nantex-Class Starfighter",
        skill: 5,
        points: 37,
        slots: ["Talent", "Talent"]
    }, {
        name: "Anakin Skywalker (Y-Wing)",
        canonical_name: "Anakin Skywalker",
        xws: "anakinskywalker-btlbywing",
        unique: !0,
        id: 359,
        faction: "Galactic Republic",
        ship: "BTL-B Y-Wing",
        skill: 6,
        force: 3,
        points: 53,
        keyword: ["Jedi", "Light Side"],
        slots: ["Force", "Turret", "Torpedo", "Gunner", "Astromech", "Device", "Modification"]
    }, {
        name: "Shadow Squadron Veteran",
        id: 360,
        faction: "Galactic Republic",
        ship: "BTL-B Y-Wing",
        skill: 3,
        points: 31,
        keyword: ["Clone"],
        slots: ["Talent", "Turret", "Torpedo", "Gunner", "Astromech", "Device", "Modification"]
    }, {
        name: "Red Squadron Bomber",
        id: 361,
        faction: "Galactic Republic",
        ship: "BTL-B Y-Wing",
        skill: 2,
        points: 29,
        keyword: ["Clone"],
        slots: ["Turret", "Torpedo", "Gunner", "Astromech", "Device", "Modification"]
    }, {
        name: "R2-D2",
        id: 362,
        unique: !0,
        faction: "Galactic Republic",
        ship: "BTL-B Y-Wing",
        skill: 2,
        points: 31,
        keyword: ["Droid"],
        slots: ["Talent", "Turret", "Torpedo", "Gunner", "Crew", "Device", "Modification"]
    }, {
        name: '"Goji"',
        id: 363,
        unique: !0,
        faction: "Galactic Republic",
        ship: "BTL-B Y-Wing",
        skill: 2,
        points: 29,
        keyword: ["Clone"],
        slots: ["Turret", "Torpedo", "Gunner", "Astromech", "Device", "Modification"]
    }, {
        name: '"Broadside"',
        id: 364,
        unique: !0,
        faction: "Galactic Republic",
        ship: "BTL-B Y-Wing",
        skill: 3,
        points: 36,
        keyword: ["Clone"],
        slots: ["Talent", "Turret", "Torpedo", "Gunner", "Astromech", "Device", "Modification"]
    }, {
        name: '"Matchstick"',
        id: 365,
        unique: !0,
        faction: "Galactic Republic",
        ship: "BTL-B Y-Wing",
        skill: 4,
        points: 42,
        keyword: ["Clone"],
        slots: ["Talent", "Turret", "Torpedo", "Gunner", "Astromech", "Device", "Modification"]
    }, {
        name: '"Odd Ball" (Y-Wing)',
        xws: "oddball-btlbywing",
        id: 366,
        unique: !0,
        canonical_name: '"Odd Ball"',
        faction: "Galactic Republic",
        ship: "BTL-B Y-Wing",
        skill: 5,
        points: 40,
        keyword: ["Clone"],
        slots: ["Talent", "Turret", "Torpedo", "Gunner", "Astromech", "Device", "Modification"]
    }, {
        name: "Republic Judiciary",
        id: 367,
        faction: "Galactic Republic",
        ship: "CR90 Corellian Corvette",
        skill: 8,
        engagement: 0,
        points: 146,
        slots: ["Command", "Hardpoint", "Hardpoint", "Crew", "Crew", "Gunner", "Team", "Team", "Cargo"]
    }, {
        name: "Alderaanian Guard",
        id: 368,
        faction: "Rebel Alliance",
        ship: "CR90 Corellian Corvette",
        skill: 8,
        engagement: 0,
        points: 146,
        slots: ["Command", "Hardpoint", "Hardpoint", "Crew", "Crew", "Gunner", "Team", "Team", "Cargo", "Title"]
    }, {
        name: "Outer Rim Patrol",
        id: 369,
        faction: "Galactic Empire",
        ship: "Raider-class Corvette",
        skill: 8,
        engagement: 0,
        points: 146,
        slots: ["Command", "Torpedo", "Missile", "Hardpoint", "Hardpoint", "Crew", "Team", "Team", "Cargo", "Title"]
    }, {
        name: "First Order Collaborators",
        id: 370,
        faction: "First Order",
        ship: "Raider-class Corvette",
        skill: 8,
        engagement: 0,
        points: 146,
        slots: ["Command", "Torpedo", "Missile", "Hardpoint", "Hardpoint", "Crew", "Team", "Team", "Cargo"]
    }, {
        name: "Echo Base Evacuees",
        id: 371,
        faction: "Rebel Alliance",
        ship: "GR-75 Medium Transport",
        skill: 7,
        engagement: 1,
        points: 55,
        slots: ["Command", "Hardpoint", "Turret", "Crew", "Crew", "Team", "Cargo", "Cargo", "Title"]
    }, {
        name: "New Republic Volunteers",
        id: 372,
        faction: "Resistance",
        ship: "GR-75 Medium Transport",
        skill: 7,
        engagement: 1,
        points: 55,
        slots: ["Command", "Hardpoint", "Turret", "Crew", "Crew", "Team", "Cargo", "Cargo"]
    }, {
        name: "Outer Rim Garrison",
        id: 373,
        faction: "Galactic Empire",
        ship: "Gozanti-class Cruiser",
        skill: 7,
        engagement: 1,
        points: 60,
        slots: ["Command", "Hardpoint", "Crew", "Crew", "Gunner", "Team", "Cargo", "Cargo", "Title"]
    }, {
        name: "First Order Sympathizers",
        id: 374,
        faction: "First Order",
        ship: "Gozanti-class Cruiser",
        skill: 7,
        engagement: 1,
        points: 60,
        slots: ["Command", "Hardpoint", "Crew", "Crew", "Gunner", "Team", "Cargo", "Cargo"]
    }, {
        name: "Separatist Privateers",
        id: 375,
        faction: "Separatist Alliance",
        ship: "C-ROC Cruiser",
        skill: 7,
        engagement: 1,
        points: 58,
        slots: ["Command", "Hardpoint", "Crew", "Crew", "Tactical Relay", "Team", "Cargo", "Device", "Configuration"]
    }, {
        name: "Syndicate Smugglers",
        id: 376,
        faction: "Scum and Villainy",
        ship: "C-ROC Cruiser",
        skill: 7,
        engagement: 1,
        points: 58,
        slots: ["Command", "Hardpoint", "Crew", "Crew", "Team", "Cargo", "Device", "Illicit", "Title", "Configuration"]
    }, {
        name: "Jarek Yeager",
        id: 377,
        faction: "Resistance",
        unique: !0,
        ship: "Fireball",
        skill: 5,
        points: 32,
        slots: ["Talent", "Missile", "Astromech", "Illicit", "Modification", "Modification", "Title"]
    }, {
        name: "Kazuda Xiono",
        id: 378,
        faction: "Resistance",
        unique: !0,
        ship: "Fireball",
        skill: 4,
        points: 39,
        slots: ["Talent", "Missile", "Astromech", "Illicit", "Modification", "Modification", "Title"]
    }, {
        name: "R1-J5",
        id: 379,
        faction: "Resistance",
        unique: !0,
        ship: "Fireball",
        skill: 1,
        points: 28,
        keyword: ["Droid"],
        slots: ["Missile", "Crew", "Illicit", "Modification", "Modification", "Title"]
    }, {
        name: "Colossus Station Mechanic",
        id: 380,
        faction: "Resistance",
        ship: "Fireball",
        skill: 2,
        points: 26,
        slots: ["Missile", "Astromech", "Illicit", "Modification", "Modification", "Title"]
    }, {
        name: "Major Vonreg",
        id: 381,
        faction: "First Order",
        unique: !0,
        skill: 6,
        ship: "TIE/Ba Interceptor",
        points: 55,
        slots: ["Talent", "Tech", "Missile", "Modification"]
    }, {
        name: '"Holo"',
        id: 382,
        faction: "First Order",
        unique: !0,
        skill: 5,
        ship: "TIE/Ba Interceptor",
        points: 53,
        slots: ["Talent", "Tech", "Missile", "Modification"]
    }, {
        name: '"Ember"',
        id: 383,
        faction: "First Order",
        unique: !0,
        skill: 4,
        ship: "TIE/Ba Interceptor",
        points: 48,
        slots: ["Talent", "Tech", "Missile", "Modification"]
    }, {
        name: "First Order Provocateur",
        id: 384,
        faction: "First Order",
        skill: 3,
        ship: "TIE/Ba Interceptor",
        points: 41,
        slots: ["Talent", "Tech", "Missile", "Modification"]
    }, {
        name: "Captain Phasma",
        id: 385,
        faction: "First Order",
        unique: !0,
        skill: 4,
        ship: "TIE/SF Fighter",
        points: 38,
        slots: ["Talent", "Tech", "Missile", "Gunner", "Sensor", "Modification"]
    }, {
        name: '"Rush"',
        id: 386,
        faction: "First Order",
        unique: !0,
        skill: 2,
        ship: "TIE/VN Silencer",
        points: 57,
        slots: ["Tech", "Torpedo", "Missile", "Configuration"]
    }, {
        name: "Zizi Tlo",
        id: 387,
        faction: "Resistance",
        unique: !0,
        skill: 5,
        charge: 1,
        recurring: 1,
        ship: "RZ-2 A-Wing",
        points: 41,
        slots: ["Talent", "Talent", "Missile", "Tech"]
    }, {
        name: "Ronith Blario",
        id: 388,
        faction: "Resistance",
        unique: !0,
        skill: 2,
        ship: "RZ-2 A-Wing",
        points: 34,
        slots: ["Talent", "Missile", "Tech"]
    }, {
        name: "Paige Tico",
        id: 389,
        faction: "Resistance",
        unique: !0,
        skill: 5,
        ship: "MG-100 StarFortress",
        points: 56,
        charge: 1,
        recurring: 1,
        slots: ["Talent", "Sensor", "Tech", "Crew", "Gunner", "Gunner", "Device", "Device", "Modification"]
    }, {
        name: "K-2SO",
        id: 390,
        faction: "Rebel Alliance",
        unique: !0,
        skill: 3,
        ship: "U-Wing",
        points: 46,
        keyword: ["Droid"],
        slots: ["Talent", "Sensor", "Crew", "Crew", "Modification", "Configuration"]
    }, {
        name: "Gina Moonsong",
        id: 391,
        faction: "Rebel Alliance",
        unique: !0,
        skill: 5,
        ship: "B-Wing",
        points: 50,
        slots: ["Talent", "Sensor", "Cannon", "Cannon", "Torpedo", "Modification", "Configuration", "Title"]
    }, {
        name: "Alexsandr Kallus",
        id: 392,
        faction: "Rebel Alliance",
        unique: !0,
        skill: 4,
        ship: "VCX-100",
        points: 68,
        keyword: ["Spectre"],
        slots: ["Talent", "Torpedo", "Sensor", "Turret", "Crew", "Crew", "Modification", "Gunner", "Title"]
    }, {
        name: "Leia Organa",
        id: 393,
        faction: "Rebel Alliance",
        unique: !0,
        skill: 5,
        ship: "YT-1300",
        keyword: ["Light Side"],
        points: 77,
        force: 1,
        slots: ["Force", "Missile", "Gunner", "Crew", "Crew", "Modification", "Modification", "Title"]
    }, {
        name: "Fifth Brother",
        id: 394,
        faction: "Galactic Empire",
        unique: !0,
        skill: 4,
        keyword: ["Dark Side"],
        ship: "TIE Advanced Prototype",
        points: 42,
        force: 2,
        slots: ["Force", "Sensor", "Missile"]
    }, {
        name: '"Vagabond"',
        id: 395,
        faction: "Galactic Empire",
        unique: !0,
        skill: 2,
        ship: "TIE Striker",
        points: 34,
        slots: ["Talent", "Gunner", "Device", "Modification"]
    }, {
        name: "Morna Kee",
        id: 396,
        faction: "Galactic Empire",
        unique: !0,
        skill: 4,
        ship: "VT-49 Decimator",
        points: 75,
        charge: 3,
        slots: ["Talent", "Torpedo", "Crew", "Crew", "Crew", "Gunner", "Device", "Modification", "Title"]
    }, {
        name: "Lieutenant LeHuse",
        id: 397,
        faction: "First Order",
        unique: !0,
        skill: 5,
        ship: "TIE/SF Fighter",
        points: 37,
        slots: ["Talent", "Tech", "Missile", "Gunner", "Sensor", "Modification"]
    }, {
        name: "Bossk (Z-95 Headhunter)",
        xws: "bossk-z95af4headhunter",
        canonical_name: "Bossk",
        id: 398,
        faction: "Scum and Villainy",
        unique: !0,
        skill: 4,
        ship: "Z-95 Headhunter",
        points: 28,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Missile", "Illicit", "Modification"]
    }, {
        name: "G4R-GOR V/M",
        id: 399,
        faction: "Scum and Villainy",
        unique: !0,
        skill: 0,
        ship: "M3-A Interceptor",
        points: 28,
        keyword: ["Droid"],
        slots: ["Modification", "HardpointShip"]
    }, {
        name: "Nom Lumb",
        id: 400,
        faction: "Scum and Villainy",
        unique: !0,
        skill: 1,
        ship: "JumpMaster 5000",
        points: 38,
        keyword: ["Bounty Hunter"],
        slots: ["Torpedo", "Cannon", "Crew", "Gunner", "Illicit", "Modification", "Title"]
    }, {
        name: "First Order Courier",
        id: 401,
        faction: "First Order",
        skill: 2,
        ship: "Xi-class Light Shuttle",
        points: 38,
        slots: ["Tech", "Tech", "Crew", "Crew", "Modification"]
    }, {
        name: "Agent Terex",
        id: 402,
        faction: "First Order",
        unique: !0,
        skill: 3,
        ship: "Xi-class Light Shuttle",
        points: 42,
        slots: ["Talent", "Tech", "Tech", "Crew", "Crew", "Illicit", "Illicit", "Illicit", "Modification"]
    }, {
        name: "Gideon Hask (Xi Shuttle)",
        canonical_name: "Gideon Hask",
        xws: "gideonhask-xiclasslightshuttle",
        id: 403,
        faction: "First Order",
        unique: !0,
        skill: 4,
        ship: "Xi-class Light Shuttle",
        points: 40,
        slots: ["Talent", "Tech", "Tech", "Crew", "Crew", "Modification"]
    }, {
        name: "Commander Malarus (Xi Shuttle)",
        canonical_name: "Commander Malarus",
        xws: "commandermalarus-xiclasslightshuttle",
        id: 404,
        faction: "First Order",
        unique: !0,
        skill: 5,
        ship: "Xi-class Light Shuttle",
        points: 45,
        slots: ["Talent", "Tech", "Tech", "Crew", "Crew", "Modification"]
    }, {
        name: "Baktoid Drone",
        id: 405,
        faction: "Separatist Alliance",
        skill: 1,
        ship: "HMP Droid Gunship",
        points: 34,
        keyword: ["Droid"],
        slots: ["Missile", "Missile", "Tactical Relay", "Crew", "Device", "Modification", "Configuration"]
    }, {
        name: "TransGalMeg Control Link",
        id: 406,
        faction: "Galactic Republic",
        skill: "*",
        ship: "Syliure-class Hyperspace Ring",
        points: 5,
        slots: ["Hyperdrive"]
    }, {
        name: "Separatist Predator",
        id: 407,
        faction: "Separatist Alliance",
        skill: 3,
        ship: "HMP Droid Gunship",
        points: 36,
        keyword: ["Droid"],
        slots: ["Missile", "Missile", "Tactical Relay", "Crew", "Device", "Modification", "Configuration"]
    }, {
        name: "Geonosian Prototype",
        id: 408,
        faction: "Separatist Alliance",
        skill: 2,
        max_per_squad: 2,
        ship: "HMP Droid Gunship",
        points: 35,
        keyword: ["Droid"],
        slots: ["Missile", "Missile", "Cannon", "Cannon", "Tactical Relay", "Modification", "Configuration"]
    }, {
        name: "DGS-047",
        id: 409,
        faction: "Separatist Alliance",
        skill: 1,
        unique: !0,
        ship: "HMP Droid Gunship",
        points: 35,
        keyword: ["Droid"],
        slots: ["Missile", "Missile", "Tactical Relay", "Crew", "Device", "Modification", "Configuration"]
    }, {
        name: "DGS-286",
        id: 410,
        faction: "Separatist Alliance",
        skill: 3,
        unique: !0,
        ship: "HMP Droid Gunship",
        points: 42,
        keyword: ["Droid"],
        slots: ["Missile", "Missile", "Tactical Relay", "Crew", "Device", "Modification", "Configuration"]
    }, {
        name: "Onderon Oppressor",
        id: 411,
        faction: "Separatist Alliance",
        skill: 3,
        max_per_squad: 2,
        ship: "HMP Droid Gunship",
        points: 40,
        keyword: ["Droid"],
        slots: ["Missile", "Missile", "Tactical Relay", "Crew", "Device", "Modification", "Configuration"]
    }, {
        name: "212th Battalion Pilot",
        id: 412,
        faction: "Galactic Republic",
        skill: 2,
        charge: 2,
        recurring: 1,
        ship: "LAAT/i Gunship",
        points: 49,
        keyword: ["Clone"],
        slots: ["Missile", "Missile", "Crew", "Crew", "Gunner", "Gunner", "Modification"]
    }, {
        name: '"Hound"',
        id: 413,
        faction: "Galactic Republic",
        skill: 2,
        unique: !0,
        charge: 2,
        recurring: 1,
        ship: "LAAT/i Gunship",
        points: 50,
        keyword: ["Clone"],
        slots: ["Missile", "Missile", "Crew", "Crew", "Gunner", "Gunner", "Modification"]
    }, {
        name: '"Warthog"',
        id: 414,
        faction: "Galactic Republic",
        skill: 3,
        unique: !0,
        charge: 2,
        recurring: 1,
        ship: "LAAT/i Gunship",
        points: 54,
        keyword: ["Clone"],
        slots: ["Missile", "Missile", "Crew", "Crew", "Gunner", "Gunner", "Modification"]
    }, {
        name: '"Hawk"',
        id: 415,
        faction: "Galactic Republic",
        skill: 4,
        charge: 2,
        recurring: 1,
        unique: !0,
        ship: "LAAT/i Gunship",
        points: 54,
        keyword: ["Clone"],
        slots: ["Talent", "Missile", "Missile", "Crew", "Crew", "Gunner", "Gunner", "Modification"]
    }, {
        name: "Carida Academy Cadet",
        id: 416,
        faction: "Galactic Empire",
        skill: 1,
        ship: "TIE/rb Heavy",
        points: 34,
        slots: ["Cannon", "Cannon", "Modification", "Modification", "Configuration"]
    }, {
        name: "Onyx Squadron Sentry",
        id: 417,
        faction: "Galactic Empire",
        skill: 3,
        ship: "TIE/rb Heavy",
        points: 36,
        slots: ["Talent", "Cannon", "Cannon", "Modification", "Modification", "Configuration"]
    }, {
        name: "Lyttan Dree",
        id: 418,
        faction: "Galactic Empire",
        skill: 3,
        unique: !0,
        ship: "TIE/rb Heavy",
        points: 37,
        slots: ["Cannon", "Cannon", "Modification", "Modification", "Configuration"]
    }, {
        name: '"Rampage"',
        id: 419,
        faction: "Galactic Empire",
        skill: 4,
        unique: !0,
        ship: "TIE/rb Heavy",
        points: 39,
        slots: ["Talent", "Cannon", "Cannon", "Modification", "Modification", "Configuration"]
    }, {
        name: "Fearsome Predator",
        id: 420,
        faction: "Separatist Alliance",
        max_per_squad: 3,
        skill: 3,
        ship: "Droid Tri-Fighter",
        points: 38,
        slots: ["Talent", "Sensor", "Missile", "Modification", "Configuration"],
        applies_condition: "Fearful Prey"
    }, {
        name: "DIS-347",
        id: 421,
        faction: "Separatist Alliance",
        skill: 3,
        unique: !0,
        ship: "Droid Tri-Fighter",
        points: 38,
        slots: ["Talent", "Sensor", "Missile", "Modification", "Configuration"]
    }, {
        name: "DIS-T81",
        id: 422,
        faction: "Separatist Alliance",
        skill: 4,
        unique: !0,
        ship: "Droid Tri-Fighter",
        points: 40,
        slots: ["Talent", "Sensor", "Missile", "Modification", "Configuration"]
    }, {
        name: "Phlac-Arphocc Prototype",
        id: 423,
        faction: "Separatist Alliance",
        skill: 5,
        max_per_squad: 2,
        ship: "Droid Tri-Fighter",
        points: 41,
        slots: ["Talent", "Sensor", "Missile", "Modification", "Configuration"]
    }, {
        name: "Colicoid Interceptor",
        id: 424,
        faction: "Separatist Alliance",
        skill: 1,
        ship: "Droid Tri-Fighter",
        points: 35,
        slots: ["Sensor", "Missile", "Modification", "Configuration"]
    }, {
        name: "Separatist Interceptor",
        id: 425,
        faction: "Separatist Alliance",
        skill: 3,
        ship: "Droid Tri-Fighter",
        points: 37,
        slots: ["Talent", "Sensor", "Missile", "Modification", "Configuration"]
    }, {
        name: "Separatist Racketeer",
        id: 426,
        faction: "Separatist Alliance",
        skill: 2,
        ship: "Firespray-31",
        points: 64,
        slots: ["Cannon", "Missile", "Crew", "Device", "Illicit", "Modification", "Title"]
    }, {
        name: "Boba Fett (Separatist)",
        canonical_name: "Boba Fett",
        xws: "bobafett-separatistalliance",
        id: 427,
        faction: "Separatist Alliance",
        unique: !0,
        skill: 3,
        ship: "Firespray-31",
        points: 70,
        keyword: ["Bounty Hunter"],
        slots: ["Cannon", "Missile", "Crew", "Device", "Illicit", "Modification", "Title"]
    }, {
        name: "Zam Wesell",
        id: 428,
        faction: "Separatist Alliance",
        unique: !0,
        skill: 5,
        charge: 4,
        ship: "Firespray-31",
        points: 76,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Cannon", "Missile", "Crew", "Device", "Illicit", "Modification", "Title"],
        applies_condition: ["You'd Better Mean Business", "You Should Thank Me"]
    }, {
        name: "Jango Fett",
        id: 429,
        faction: "Separatist Alliance",
        skill: 6,
        unique: !0,
        ship: "Firespray-31",
        points: 79,
        keyword: ["Bounty Hunter"],
        slots: ["Talent", "Cannon", "Missile", "Crew", "Device", "Illicit", "Modification", "Title"]
    }, {
        name: "Loyalist Volunteer",
        id: 430,
        faction: "Galactic Republic",
        skill: 2,
        ship: "Nimbus-class V-Wing",
        points: 27,
        slots: ["Astromech", "Modification", "Configuration"]
    }, {
        name: "Shadow Squadron Escort",
        id: 431,
        faction: "Galactic Republic",
        skill: 3,
        ship: "Nimbus-class V-Wing",
        points: 29,
        keyword: ["Clone"],
        slots: ["Talent", "Astromech", "Modification", "Configuration"]
    }, {
        name: "Wilhuff Tarkin",
        id: 432,
        faction: "Galactic Republic",
        skill: 3,
        unique: !0,
        ship: "Nimbus-class V-Wing",
        points: 34,
        slots: ["Talent", "Astromech", "Modification", "Configuration"]
    }, {
        name: '"Klick"',
        id: 433,
        faction: "Galactic Republic",
        skill: 4,
        unique: !0,
        ship: "Nimbus-class V-Wing",
        points: 32,
        charge: 1,
        recurring: 1,
        keyword: ["Clone"],
        slots: ["Talent", "Astromech", "Modification", "Configuration"]
    }, {
        name: '"Contrail"',
        id: 434,
        faction: "Galactic Republic",
        skill: 5,
        unique: !0,
        ship: "Nimbus-class V-Wing",
        points: 33,
        keyword: ["Clone"],
        slots: ["Talent", "Astromech", "Modification", "Configuration"]
    }, {
        name: '"Odd Ball" (V-Wing)',
        canonical_name: '"Oddball"',
        xws: "oddball-nimbusclassvwing",
        id: 435,
        faction: "Galactic Republic",
        skill: 5,
        unique: !0,
        ship: "Nimbus-class V-Wing",
        points: 32,
        keyword: ["Clone"],
        slots: ["Talent", "Astromech", "Modification", "Configuration"]
    }, {
        name: "Jedi General",
        id: 436,
        faction: "Galactic Republic",
        skill: 4,
        ship: "Eta-2 Actis",
        points: 41,
        force: 2,
        keyword: ["Jedi", "Light Side"],
        slots: ["Force", "Cannon", "Astromech", "Modification"]
    }, {
        name: "Yoda",
        id: 437,
        faction: "Galactic Republic",
        skill: 3,
        unique: !0,
        ship: "Eta-2 Actis",
        points: 48,
        force: 3,
        keyword: ["Jedi", "Light Side"],
        slots: ["Force", "Force", "Cannon", "Astromech", "Modification"]
    }, {
        name: "Shaak Ti",
        id: 438,
        faction: "Galactic Republic",
        skill: 4,
        unique: !0,
        ship: "Eta-2 Actis",
        points: 44,
        force: 2,
        keyword: ["Jedi", "Light Side"],
        slots: ["Force", "Talent", "Cannon", "Astromech", "Modification"]
    }, {
        name: "Aayla Secura",
        id: 439,
        faction: "Galactic Republic",
        skill: 5,
        unique: !0,
        ship: "Eta-2 Actis",
        points: 51,
        force: 2,
        keyword: ["Jedi", "Light Side"],
        slots: ["Force", "Talent", "Cannon", "Astromech", "Modification"]
    }, {
        name: "Obi-Wan Kenobi (Eta-2)",
        canonical_name: "Obi-Wan Kenobi",
        xws: "obiwankenobi-eta2actis",
        id: 440,
        faction: "Galactic Republic",
        skill: 5,
        unique: !0,
        ship: "Eta-2 Actis",
        force: 3,
        points: 49,
        keyword: ["Jedi", "Light Side"],
        slots: ["Force", "Talent", "Cannon", "Astromech", "Modification"]
    }, {
        name: "Anakin Skywalker (Eta-2)",
        canonical_name: "Anakin Skywalker",
        xws: "anakinskywalker-eta2actis",
        id: 441,
        faction: "Galactic Republic",
        skill: 6,
        unique: !0,
        force: 3,
        ship: "Eta-2 Actis",
        points: 56,
        keyword: ["Jedi", "Light Side", "Dark Side"],
        slots: ["Force", "Talent", "Cannon", "Astromech", "Modification"]
    }, {
        name: "Poe Dameron (HoH)",
        canonical_name: "Poe Dameron",
        xws: "poedameron-swz68",
        id: 442,
        unique: !0,
        faction: "Resistance",
        ship: "T-70 X-Wing",
        skill: 6,
        points: 60,
        charge: 2,
        recurring: 1,
        slots: ["Talent", "Astromech", "Tech", "Modification", "Configuration", "Title", "HardpointShip"]
    }, {
        name: "Temmin Wexley (HoH)",
        canonical_name: "Temmin Wexley",
        xws: "temminwexley-swz68",
        id: 443,
        unique: !0,
        faction: "Resistance",
        ship: "T-70 X-Wing",
        skill: 4,
        points: 53,
        slots: ["Talent", "Astromech", "Tech", "Modification", "Configuration", "Title", "HardpointShip"]
    }, {
        name: "Merl Cobben",
        id: 444,
        faction: "Resistance",
        unique: !0,
        skill: 1,
        ship: "RZ-2 A-Wing",
        points: 32,
        slots: ["Talent", "Missile", "Tech"]
    }, {
        name: "Suralinda Javos",
        id: 445,
        faction: "Resistance",
        unique: !0,
        skill: 3,
        ship: "RZ-2 A-Wing",
        points: 35,
        slots: ["Talent", "Talent", "Missile", "Tech"]
    }, {
        name: "Wrobie Tyce",
        id: 446,
        faction: "Resistance",
        unique: !0,
        skill: 4,
        ship: "RZ-2 A-Wing",
        points: 35,
        slots: ["Talent", "Talent", "Missile", "Tech"]
    }, {
        name: "Seftin Vanik",
        id: 447,
        faction: "Resistance",
        unique: !0,
        skill: 5,
        ship: "RZ-2 A-Wing",
        points: 37,
        slots: ["Talent", "Talent", "Missile", "Tech"]
    }, {
        name: "Nimi Chireen",
        id: 448,
        unique: !0,
        faction: "Resistance",
        ship: "T-70 X-Wing",
        skill: 2,
        points: 49,
        slots: ["Astromech", "Tech", "Modification", "Configuration", "Title", "HardpointShip"]
    }, {
        name: "C'ai Threnalli",
        id: 449,
        unique: !0,
        faction: "Resistance",
        ship: "T-70 X-Wing",
        skill: 4,
        points: 48,
        slots: ["Talent", "Astromech", "Tech", "Modification", "Configuration", "Title", "HardpointShip"]
    }, {
        name: "Hera Syndulla (B-Wing)",
        canonical_name: "Hera Syndulla",
        xws: "herasyndulla-asf01bwing",
        id: 450,
        unique: !0,
        faction: "Rebel Alliance",
        keyword: ["Spectre"],
        ship: "B-Wing",
        skill: 6,
        points: 55,
        slots: ["Talent", "Sensor", "Cannon", "Cannon", "Torpedo", "Modification", "Configuration", "Title"]
    }, {
        name: "Hera Syndulla (A-Wing)",
        canonical_name: "Hera Syndulla",
        xws: "herasyndulla-rz1awing",
        id: 451,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "A-Wing",
        keyword: ["Spectre"],
        skill: 6,
        points: 42,
        slots: ["Talent", "Talent", "Missile", "Configuration"]
    }, {
        name: "Wedge Antilles (A-Wing)",
        canonical_name: "Wedge Antilles",
        xws: "wedgeantilles-rz1awing",
        id: 452,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "A-Wing",
        skill: 4,
        points: 35,
        slots: ["Talent", "Talent", "Missile", "Configuration"]
    }, {
        name: "Sabine Wren (A-Wing)",
        canonical_name: "Sabine Wren",
        xws: "sabinewren-rz1awing",
        id: 453,
        unique: !0,
        faction: "Rebel Alliance",
        keyword: ["Mandalorian"],
        ship: "A-Wing",
        skill: 3,
        points: 37,
        slots: ["Talent", "Talent", "Missile", "Configuration"]
    }, {
        name: "Vult Skerris",
        id: 454,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Defender",
        skill: 5,
        charge: 1,
        recurring: -1,
        points: 82,
        slots: ["Talent", "Sensor", "Cannon", "Missile", "Configuration"]
    }, {
        name: "Ciena Ree",
        id: 455,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Interceptor",
        skill: 6,
        points: 48,
        slots: ["Talent", "Modification", "Modification", "Configuration"]
    }, {
        name: "Gideon Hask (TIE Interceptor)",
        canonical_name: "Gideon Hask",
        xws: "gideonhask-tieininterceptor",
        id: 456,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Interceptor",
        skill: 4,
        points: 48,
        slots: ["Talent", "Modification", "Modification", "Configuration"]
    }, {
        name: "Kanan Jarrus (HWK-290)",
        canonical_name: "Kanan Jarrus",
        xws: "kananjarrus-hwk290lightfreighter",
        id: 457,
        unique: !0,
        faction: "Scum and Villainy",
        keyword: ["Light Side", "Jedi"],
        ship: "HWK-290",
        skill: 3,
        force: 1,
        points: 42,
        slots: ["Force", "Crew", "Device", "Illicit", "Modification", "Modification", "Title"]
    }, {
        name: "Leema Kai",
        id: 458,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Y-Wing",
        skill: 5,
        points: 40,
        slots: ["Talent", "Tech", "Turret", "Torpedo", "Gunner", "Astromech", "Device"]
    }, {
        name: "Arliz Hadrassian",
        id: 459,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Y-Wing",
        skill: 4,
        points: 39,
        slots: ["Talent", "Tech", "Turret", "Torpedo", "Gunner", "Astromech", "Device"]
    }, {
        name: "Padric",
        id: 460,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Y-Wing",
        skill: 3,
        points: 36,
        slots: ["Talent", "Tech", "Turret", "Torpedo", "Gunner", "Astromech", "Device"]
    }, {
        name: "Derek Klivian",
        id: 461,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "A-Wing",
        skill: 3,
        points: 30,
        slots: ["Talent", "Talent", "Missile", "Configuration"]
    }, {
        name: "Shara Bey (A-Wing)",
        canonical_name: "Shara Bey",
        xws: "sharabey-rz1awing",
        id: 462,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "A-Wing",
        skill: 4,
        points: 32,
        slots: ["Talent", "Talent", "Missile", "Configuration"]
    }, {
        name: "Ahsoka Tano (A-Wing)",
        canonical_name: "Ahsoka Tano",
        xws: "ahsokatano-rz1awing",
        id: 463,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "A-Wing",
        keyword: ["Light Side"],
        skill: 5,
        force: 3,
        points: 49,
        slots: ["Force", "Force", "Missile", "Configuration"]
    }, {
        name: "Netrem Pollard",
        id: 464,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "B-Wing",
        skill: 3,
        points: 46,
        slots: ["Talent", "Sensor", "Cannon", "Cannon", "Torpedo", "Modification", "Configuration", "Title"]
    }, {
        name: "Commandant Goran",
        id: 465,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Interceptor",
        skill: 4,
        points: 43,
        slots: ["Talent", "Modification", "Modification", "Configuration"]
    }, {
        name: "Nash Windrider",
        id: 466,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Interceptor",
        skill: 2,
        charge: 1,
        recurring: 1,
        points: 40,
        slots: ["Talent", "Modification", "Modification", "Configuration"]
    }, {
        name: "Lieutenant Lorrir",
        id: 467,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Interceptor",
        skill: 3,
        points: 41,
        slots: ["Talent", "Modification", "Modification", "Configuration"]
    }, {
        name: "Vult Skerris (TIE Interceptor)",
        canonical_name: "Vult Skerris",
        xws: "vultskerris-tieininterceptor",
        id: 468,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Interceptor",
        skill: 5,
        charge: 1,
        recurring: -1,
        points: 46,
        slots: ["Talent", "Modification", "Modification", "Configuration"]
    }, {
        name: "Darth Vader (TIE Defender)",
        canonical_name: "Darth Vader",
        xws: "darthvader-tieddefender",
        id: 469,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Defender",
        keyword: ["Dark Side", "Sith"],
        skill: 6,
        force: 3,
        points: 115,
        slots: ["Force", "Cannon", "Missile", "Configuration"]
    }, {
        name: "Captain Dobbs",
        id: 470,
        unique: !0,
        faction: "Galactic Empire",
        ship: "TIE Defender",
        skill: 3,
        points: 75,
        slots: ["Talent", "Sensor", "Cannon", "Missile", "Configuration"]
    }, {
        name: "Jinata Security Officer",
        id: 471,
        faction: "Scum and Villainy",
        ship: "Y-Wing",
        skill: 2,
        points: 31,
        slots: ["Tech", "Turret", "Torpedo", "Gunner", "Astromech", "Device"]
    }, {
        name: "Amaxine Warrior",
        id: 472,
        faction: "Scum and Villainy",
        ship: "Y-Wing",
        skill: 3,
        points: 33,
        slots: ["Talent", "Tech", "Turret", "Torpedo", "Gunner", "Astromech", "Device"]
    }, {
        name: "Gamut Key",
        id: 473,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "HWK-290",
        skill: 3,
        charge: 2,
        recurring: 1,
        points: 34,
        slots: ["Talent", "Crew", "Device", "Illicit", "Modification", "Modification", "Title"]
    }, {
        name: "Tápusk",
        xws: "tapusk",
        id: 474,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "HWK-290",
        skill: 5,
        charge: 2,
        recurring: 1,
        points: 36,
        slots: ["Talent", "Crew", "Device", "Illicit", "Modification", "Modification", "Title"]
    }, {
        name: "Colicoid Destroyer",
        id: 475,
        faction: "Separatist Alliance",
        ship: "Trident-class Assault Ship",
        skill: 8,
        engagement: 0,
        points: 90,
        slots: ["Command", "Torpedo", "Hardpoint", "Hardpoint", "Crew", "Crew", "Gunner", "Team", "Cargo", "Title"]
    }, {
        name: "Lawless Pirates",
        id: 476,
        faction: "Scum and Villainy",
        ship: "Trident-class Assault Ship",
        skill: 8,
        engagement: 0,
        points: 90,
        slots: ["Command", "Torpedo", "Hardpoint", "Hardpoint", "Crew", "Crew", "Gunner", "Team", "Cargo", "Title"]
    }];
exports.pilots = pilots;
var pilotRules = {
    "0-66": {
        display_name: "0-66",
        text: "After you defend, you may spend 1 calculate token to perform an action."
    },
    "104th Battalion Pilot": {
        display_name: "104th Battalion Pilot",
        text: "<i class = flavor_text>The ARC-170 was designed as a dominating heavy escort fighter with powerful front and rear lasers, ordnance, and an astromech for navigation. Squadrons of these mighty ships bolster the Republic Navy’s presence at any battle where they are deployed.</i>"
    },
    "4-LOM": {
        display_name: "4-LOM",
        text: "After you fully execute a red maneuver, gain 1 calculate token.%LINEBREAK%At the start of the End Phase, you may choose 1 ship at range 0-1. If you do, transfer 1 of your stress tokens to that ship."
    },
    "Nashtah Pup": {
        display_name: "Nashtah Pup",
        text: "You can deploy only via emergency deployment, and you have the name, initiative, pilot ability, and ship %CHARGE% of the friendly, destroyed <strong>Hound’s Tooth</strong>.%LINEBREAK%<strong>Escape Craft:</strong> <strong>Setup:</strong>Requires the <strong>Hound’s Tooth</strong>. You <b>must</b> begin the game docked with the <strong>Hound’s Tooth</strong>."
    },
    "AP-5": {
        display_name: "AP-5",
        text: "While you coordinate, if you chose a ship with exactly 1 stress token, it can perform actions.%LINEBREAK%<strong>Comms Shuttle:</strong> While you are docked, your carrier ship gains %COORDINATE%. Before your carrier ship activates, it may perform a %COORDINATE% action. "
    },
    "Academy Pilot": {
        display_name: "Academy Pilot",
        text: "<i class = flavor_text>The Galactic Empire uses the fast and agile TIE/ln, developed by Sienar Fleet Systems and produced in staggering quantity, as its primary starfighter.</i>"
    },
    Ahhav: {
        display_name: "Ahhav",
        text: "While you defend or perform an attack, if the enemy ship is a larger size than you, roll 1 additional die.%LINEBREAK%<strong>Notched Stabilizers:</strong> While you move, you ignore asteroids."
    },
    "Ahsoka Tano": {
        display_name: "Ahsoka Tano",
        text: "After you fully execute a maneuver, you may choose a friendly ship at range&nbsp;0-1 and spend 1&nbsp;%FORCE%. That ship may perform an action, even if it is stressed.%LINEBREAK%<strong>Fine-tuned Controls:</strong> After you fully execute a maneuver, you may spend 1&nbsp;%FORCE% to perform a %BOOST% or %BARRELROLL% action."
    },
    "Airen Cracken": {
        display_name: "Airen Cracken",
        text: "After you perform an attack, you may choose 1 friendly ship at range 1. That ship may perform an action, treating it as red."
    },
    "Alpha Squadron Pilot": {
        display_name: "Alpha Squadron Pilot",
        text: "<i class = flavor_text>Sienar Fleet Systems designed the TIE interceptor with four wing-mounted laser cannons, a dramatic increase in firepower over its predecessors.</i>%LINEBREAK%<strong>Autothrusters:</strong> After you perform an action, you may perform a red %BARRELROLL% or red %BOOST% action."
    },
    "Anakin Skywalker": {
        display_name: "Anakin Skywalker",
        text: "After you fully execute a maneuver, if there is an enemy ship in your %FRONTARC% at range&nbsp;0-1 or in your %BULLSEYEARC%, you may spend 1 %FORCE% to remove 1&nbsp;stress token.%LINEBREAK%<strong>Fine-tuned Controls:</strong> After you fully execute a maneuver, you may spend 1&nbsp;%FORCE% to perform a %BOOST% or %BARRELROLL% action."
    },
    "Arvel Crynyd": {
        display_name: "Arvel Crynyd",
        text: "You can perform primary attacks at range 0.%LINEBREAK%If you would fail a %BOOST% action by overlapping another ship, resolve it as though you were partially executing a maneuver instead.%LINEBREAK%<strong>Vectored Thrusters:</strong> After you perform an action, you may perform a red %BOOST% action."
    },
    "Asajj Ventress": {
        display_name: "Asajj Ventress",
        text: "At the start of the Engagement Phase, you may choose 1 enemy ship in your %SINGLETURRETARC% at range 0-2 and spend 1&nbsp;%FORCE%. If you do, that ship gains 1 stress token unless it removes 1 green token."
    },
    "Autopilot Drone": {
        display_name: "Autopilot Drone",
        text: "<i class = flavor_text>Sometimes, manufacturer’s warnings are made to be broken.</i>%LINEBREAK%<strong>Rigged Energy Cells:</strong> During the System Phase, if you are not docked, lose 1&nbsp;%CHARGE%. At the end of the Activation Phase, if you have 0 %CHARGE%, you are destroyed. Before you are removed, each ship at range 0-1 suffers 1&nbsp;%CRIT% damage."
    },
    "Bandit Squadron Pilot": {
        display_name: "Bandit Squadron Pilot",
        text: "<i class = flavor_text>The Z-95 Headhunter was the primary inspiration for Incom Corporation’s exemplary T-65 X-wing starfighter. Though it is considered outdated by modern standards, it remains a versatile and potent snub fighter.</i>"
    },
    "Baktoid Prototype": {
        display_name: "Baktoid Prototype",
        text: "While you perform a special attack, if a friendly ship with the <strong>Networked Calculations</strong> ship ability has a lock on the defender, you may ignore the %FOCUS%, %CALCULATE% or %LOCK% requirement of that attack. %LINEBREAK%<strong>Networked Calculations:</strong> While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range&nbsp;0-1 to change 1&nbsp;%FOCUS% result to an %EVADE% or %HIT% result."
    },
    "Baron of the Empire": {
        display_name: "Baron of the Empire",
        text: "<i class = flavor_text>Sienar Fleet System’s TIE Advanced v1 is a groundbreaking starfighter design, featuring upgraded engines, a missile launcher, and folding s-foils.</i>"
    },
    "Barriss Offee": {
        display_name: "Barriss Offee",
        text: "While a friendly ship at range&nbsp;0-2 performs an attack, if the defender is in its %BULLSEYEARC%, you may spend 1&nbsp;%FORCE% to change 1&nbsp;%FOCUS% result to a %HIT% result or 1&nbsp;%HIT% result to a %CRIT% result.%LINEBREAK%<strong>Fine-tuned Controls:</strong> After you fully execute a maneuver, you may spend 1 %FORCE% to perform a %BOOST% or %BARRELROLL% action."
    },
    "Ben Teene": {
        display_name: "Ben Teene",
        text: "After you perform an attack, if the defender is in your %SINGLETURRETARC%, assign the <strong>Rattled</strong> condition to the defender."
    },
    "Benthic Two Tubes": {
        display_name: "Benthic Two Tubes",
        text: "After you perform a %FOCUS% action, you may transfer 1 of your focus tokens to a friendly ship at range 1-2."
    },
    "Biggs Darklighter": {
        display_name: "Biggs Darklighter",
        text: "While another friendly ship at range 0-1 defends, before the Neutralize Results step, if you are in the attack arc, you may suffer 1&nbsp;%HIT% or %CRIT% to cancel 1 matching result."
    },
    "Binayre Pirate": {
        display_name: "Binayre Pirate",
        text: "<i class = flavor_text>Operating from the Double Worlds, Talus and Tralus, Kath Scarlet’s gang of smugglers and pirates would never be described as reputable or dependable—even by other criminals.</i>"
    },
    "Black Squadron Ace": {
        display_name: "Black Squadron Ace",
        text: "<i class = flavor_text>The elite TIE/ln pilots of Black Squadron accompanied Darth Vader on a devastating strike against the Rebel forces at the Battle of Yavin.</i>"
    },
    "Black Squadron Scout": {
        display_name: "Black Squadron Scout",
        text: "<i class = flavor_text>These heavily armed atmospheric craft employ their specialized moveable wings to gain additional speed and maneuverability.</i>%LINEBREAK% <sasmall><strong>Adaptive Ailerons:</strong> Before you reveal your dial, if you are not stressed, you <b>must</b> execute a white [1&nbsp;%BANKLEFT%], [1&nbsp;%STRAIGHT%], or [1&nbsp;%BANKRIGHT%] maneuver.</sasmall>"
    },
    "Black Squadron Ace (T-70)": {
        display_name: "Black Squadron Ace",
        text: "<i class = flavor_text>During the Cold War, Poe Dameron’s Black Squadron conducted daring covert operations against the First Order in defiance of treaties ratified by the New Republic Senate.</i>%LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1&nbsp;%CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Black Sun Ace": {
        display_name: "Black Sun Ace",
        text: "<i class = flavor_text>The Kihraxz assault fighter was developed specifically for the Black Sun crime syndicate, whose highly paid ace pilots demanded a nimble, powerful ship to match their skills.</i>"
    },
    "Black Sun Assassin": {
        display_name: "Black Sun Assassin",
        text: "<i class = flavor_text>Although assassinations can be handled with a shot in the dark or a dire substance added to a drink, a flaming shuttle tumbling from the sky sends a special kind of message.</i> %LINEBREAK% <strong>Microthrusters:</strong> While you perform a barrel roll, you <b>must</b> use the %BANKLEFT% or %BANKRIGHT% template instead of the %STRAIGHT% template."
    },
    "Black Sun Enforcer": {
        display_name: "Black Sun Enforcer",
        text: "<i class = flavor_text>Prince Xizor himself collaborated with MandalMotors to design the StarViper-class attack platform, one of the most formidable starfighters in the galaxy.</i> %LINEBREAK% <strong>Microthrusters:</strong> While you perform a barrel roll, you <b>must</b> use the %BANKLEFT% or %BANKRIGHT% template instead of the %STRAIGHT% template."
    },
    "Black Sun Soldier": {
        display_name: "Black Sun Soldier",
        text: "<i class = flavor_text>The vast and influential Black Sun crime syndicate can always find a use for talented pilots, provided they aren’t particular about how they earn their credits.</i>"
    },
    "Blade Squadron Veteran": {
        display_name: "Blade Squadron Veteran",
        text: "<i class = flavor_text>A unique gyrostabilization system surrounds the B-wing’s cockpit, ensuring that the pilot always remains stationary during flight.</i>"
    },
    "Blue Squadron Escort": {
        display_name: "Blue Squadron Escort",
        text: "<i class = flavor_text>Designed by Incom Corporation, the T-65 X-wing quickly proved to be one of the most effective and versatile military vehicles in the galaxy and a boon to the Rebellion.</i>"
    },
    "Blue Squadron Pilot": {
        display_name: "Blue Squadron Pilot",
        text: "<i class = flavor_text>Due to its heavy weapons array and resilient shielding, the B-wing has solidified itself as the Rebel Alliance’s most innovative assault fighter.</i>"
    },
    "Blue Squadron Protector": {
        display_name: "Blue Squadron Protector",
        text: "<i class = flavor_text>Blue Squadron’s elite clone pilots are trained to fly their V-19s in conjunction with Jedi and often support famous commanders such as Anakin Skywalker and Ahsoka Tano.</i>"
    },
    "Blue Squadron Recruit": {
        display_name: "Blue Squadron Recruit",
        text: "<i class = flavor_text>Young beings across the galaxy have grown up on tales of heroism in the Galactic Civil War, and many learned to fly in the same cockpits from which their parents fought the Empire.</i>%LINEBREAK%<strong>Refined Gyrostabilizers:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. After you perform an action, you may perform a red %BOOST% or red %ROTATEARC% action."
    },
    "Blue Squadron Rookie": {
        display_name: "Blue Squadron Rookie",
        text: "<i class = flavor_text>The Incom-FreiTek T-70 X-Wing was designed to improve upon the tactical flexibility of the venerable T-65. The starfighter’s advanced droid socket is compatible with a wide array of astromechs, and its modular weapons pods allow ground crews to tailor its payload for specific missions.</i>%LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1&nbsp;%CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Blue Squadron Scout": {
        display_name: "Blue Squadron Scout",
        text: "<i class = flavor_text>Used for deploying troops under the cover of darkness or into the heat of battle, the UT-60D U-wing fulfills the Rebellion’s need for a swift and hardy troop transport.</i>"
    },
    "Boba Fett": {
        display_name: "Boba Fett",
        text: "While you defend or perform an attack, you may reroll 1 of your dice for each enemy ship at range 0-1."
    },
    "Bodhi Rook": {
        display_name: "Bodhi Rook",
        text: "Friendly ships can acquire locks onto objects at range 0-3 of any friendly ship."
    },
    Bossk: {
        display_name: "Bossk",
        text: "While you perform a primary attack, after the Neutralize Results step, you may spend 1&nbsp;%CRIT% result to add 2&nbsp;%HIT% results."
    },
    "Bounty Hunter": {
        display_name: "Bounty Hunter",
        text: "<i class = flavor_text>The Firespray-class patrol craft is infamous for its association with the deadly bounty hunters Jango Fett and Boba Fett, who packed their craft with countless deadly armaments.</i>"
    },
    "Braylen Stramm": {
        display_name: "Braylen Stramm",
        text: "While you defend or perform an attack, if you are stressed, you may reroll up to 2 of your dice."
    },
    "Captain Cardinal": {
        display_name: "Captain Cardinal",
        text: "While a friendly ship at range 1-2 with lower initiative than you defends or performs an attack, if you have at least 1&nbsp;%CHARGE%, that ship may reroll 1 %FOCUS% result.%LINEBREAK%After an enemy ship at range 0-3 is destroyed, lose 1&nbsp;%CHARGE%.%LINEBREAK%<strong>Linked Battery:</strong> While you perform a %CANNON% attack, roll 1 additional die."
    },
    "Captain Feroph": {
        display_name: "Captain Feroph",
        text: "While you defend, if the attacker does not have any green tokens, you may change 1 of your blank or %FOCUS% results to an %EVADE% result.%LINEBREAK%<strong>Adaptive Ailerons:</strong> Before you reveal your dial, if you are not stressed, you <b>must</b> execute a white [1&nbsp;%BANKLEFT%], [1&nbsp;%STRAIGHT%], or [1&nbsp;%BANKRIGHT%] maneuver."
    },
    "Captain Jonus": {
        display_name: "Captain Jonus",
        text: "While a friendly ship at range 0-1 performs a %TORPEDO% or %MISSILE% attack, that ship may reroll up to 2 attack dice. %LINEBREAK%<strong>Nimble Bomber:</strong> If you would drop a device using a %STRAIGHT% template, you may use a %BANKLEFT% or %BANKRIGHT% template of the same speed instead."
    },
    "Captain Jostero": {
        display_name: "Captain Jostero",
        text: "After an enemy ship suffers damage, if it is not defending, you may perform a bonus attack against that ship."
    },
    "Captain Kagi": {
        display_name: "Captain Kagi",
        text: "At the start of the Engagement Phase, you may choose 1 or more friendly ships at range 0-3. If you do, transfer all enemy lock tokens from the chosen ships to you."
    },
    "Captain Nym": {
        display_name: "Captain Nym",
        text: "Before a friendly bomb or mine would detonate, you may spend 1&nbsp;%CHARGE% to prevent it from detonating.%LINEBREAK% While you defend against an attack obstructed by a bomb or mine, roll 1 additional defense die."
    },
    "Captain Oicunn": {
        display_name: "Captain Oicunn",
        text: "You can perform primary attacks at range 0."
    },
    "Captain Rex": {
        display_name: "Captain Rex",
        text: "After you perform an attack, assign the <strong>Suppressive Fire</strong> condition to the defender."
    },
    "Captain Sear": {
        display_name: "Captain Sear",
        text: "While a friendly ship at range&nbsp;0-3 performs a primary attack, if the defender is in its %BULLSEYEARC%, before the Neutralize Results step, the friendly ship may spend 1 calculate token to cancel 1 %EVADE% result."
    },
    "Captain Seevor": {
        display_name: "Captain Seevor",
        text: "While you defend or perform an attack, before attack dice are rolled, if you are not in the enemy ship’s %BULLSEYEARC%, you may spend 1&nbsp;%CHARGE%. If you do, the enemy ship gains 1&nbsp;jam token.%LINEBREAK%<strong>Notched Stabilizers:</strong> While you move, you ignore asteroids."
    },
    "Cartel Executioner": {
        display_name: "Cartel Executioner",
        text: "<i class = flavor_text>Many veteran pilots in the service of the Hutt kajidics and other criminal operations choose the M12-L Kimogila for its firepower and dreaded reputation alike.</i>%LINEBREAK% <strong>Dead to Rights:</strong> While you perform an attack, if the defender is in your %BULLSEYEARC%, defense dice cannot be modified using green tokens."
    },
    "Cartel Marauder": {
        display_name: "Cartel Marauder",
        text: "<i class = flavor_text>The versatile Kihraxz was modeled after Incom’s popular X-wing starfighter, but an array of after-market modification kits ensure a wide variety of designs. </i>"
    },
    "Cartel Spacer": {
        display_name: "Cartel Spacer",
        text: "<i class = flavor_text>MandalMotors’ M3-A “Scyk” Interceptor is purchased in large quantities by the Hutt Cartel and the Car’das smugglers due to its low cost and customizability.</i> %LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1 %CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Cassian Andor": {
        display_name: "Cassian Andor",
        text: "At the start of the Activation Phase, you may choose 1 friendly ship at range 1-3. If you do, that ship removes 1 stress token."
    },
    Cat: {
        display_name: "Cat",
        text: "While you perform a primary attack, if the defender is at range 0-1 of at least 1&nbsp;friendly device, roll 1 additional die."
    },
    "Cavern Angels Zealot": {
        display_name: "Cavern Angels Zealot",
        text: "<i class = flavor_text>Unlike most Rebel cells, Saw Gerrera’s partisans are willing to use extreme methods to undermine the Galactic Empire’s objectives in brutal battles that rage from Geonosis to Jedha.</i>"
    },
    Chewbacca: {
        display_name: "Chewbacca",
        text: "Before you would be dealt a faceup damage card, you may spend 1&nbsp;%CHARGE% to be dealt the card facedown instead."
    },
    "Chewbacca (Resistance)": {
        display_name: "Chewbacca",
        text: 'After a friendly ship at range 0-3 is destroyed, before that ship is removed, you may perform an action. Then you may perform a bonus attack.%LINEBREAK%<i><strong>Note:</strong>The phrase "before that ship is removed" is not printed on the card, but within the official squad builder.</i>'
    },
    "Cobalt Squadron Bomber": {
        display_name: "Cobalt Squadron Bomber",
        text: "<i class = flavor_text>Whether the ordnance silos of their StarFortresses are loaded with proton bombs or relief supplies, the heroic crews of Cobalt Squadron dedicate their lives to making a difference in the galaxy.</i>"
    },
    "Colonel Jendon": {
        display_name: "Colonel Jendon",
        text: "At the start of the Activation Phase, you may spend 1&nbsp;%CHARGE%. If you do, while friendly ships acquire locks this round, they must acquire locks beyond range 3 instead of at range 0-3."
    },
    "Colonel Vessery": {
        display_name: "Colonel Vessery",
        text: "While you perform an attack against a locked ship, after you roll attack dice, you may acquire a lock on the defender.%LINEBREAK%<strong>Full Throttle:</strong> After you fully execute a speed 3-5 maneuver, you may perform an %EVADE% action."
    },
    "Commander Malarus": {
        display_name: "Commander Malarus",
        text: "At the start of the Engagement Phase, you may spend 1&nbsp;%CHARGE% and gain 1 stress token. If you do, until the end of the round, while you defend or perform an attack, you may change all of your %FOCUS% results to %EVADE% or %HIT% results."
    },
    "Constable Zuvio": {
        display_name: "Constable Zuvio",
        text: "If you would drop a device, you may launch it using a [1&nbsp;%STRAIGHT%] template instead.%LINEBREAK%<strong>Spacetug Tractor Array:</strong> <strong>Action:</strong> Choose a ship in your %FRONTARC% at range 1. That ship gains 1 tractor token, or 2 tractor tokens if it is in your %BULLSEYEARC% at range 1."
    },
    "Contracted Scout": {
        display_name: "Contracted Scout",
        text: "<i class = flavor_text>Built for long-distance reconnaissance and plotting new hyperspace routes, the lightly armed JumpMaster 5000 is often extensively retrofitted with custom upgrades.</i>"
    },
    "Corran Horn": {
        display_name: "Corran Horn",
        text: "At initiative 0, you may perform a bonus primary attack against an enemy ship in your %BULLSEYEARC%. If you do, at the start of the next Planning Phase, gain 1 disarm token.%LINEBREAK%<strong>Experimental Scanners:</strong> You can acquire locks beyond range 3. You cannot acquire locks at range 1."
    },
    "Count Dooku": {
        display_name: "Count Dooku",
        text: "After you defend, if the attacker is in your firing arc, you may spend 1&nbsp;%FORCE% to remove 1 of your blue or red tokens.%LINEBREAK%After you perform an attack that hits, you may spend 1 %FORCE% to perform an action."
    },
    "Countess Ryad": {
        display_name: "Countess Ryad",
        text: "While you would execute a %STRAIGHT% maneuver, you may increase the difficulty of the maneuver. If you do, execute it as a %KTURN% maneuver instead.%LINEBREAK%<strong>Full Throttle:</strong> After you fully execute a speed 3-5 maneuver, you may perform an %EVADE% action."
    },
    "Crymorah Goon": {
        display_name: "Crymorah Goon",
        text: "<i class = flavor_text>Though far from nimble, the Y-wing’s heavy hull, substantial shielding, and turret-mounted cannons make it an excellent patrol craft.</i>"
    },
    "Cutlass Squadron Pilot": {
        display_name: "Cutlass Squadron Pilot",
        text: "<i class = flavor_text>The TIE punisher’s design builds upon the success of the TIE bomber, adding shielding, a second bomb chute, and three additional ordnance pods, each equipped with a twin ion engine.</i>"
    },
    "DBS-32C": {
        display_name: "DBS-32C",
        text: "At the start of the Engagement Phase, you may spend 1 calculate token to perform a %COORDINATE% action. You cannot coordinate ships that do not have the <strong>Networked Calculations</strong> ship ability. %LINEBREAK%<strong>Networked Calculations:</strong> While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range&nbsp;0-1 to change 1&nbsp;%FOCUS% result to an %EVADE% or %HIT% result."
    },
    "DBS-404": {
        display_name: "DBS-404",
        text: "You can perform primary attacks at range 0. While you perform an attack at attack range 0-1, you <strong>must</strong> roll 1 additional die. After the attack hits, suffer 1 %CRIT% damage. %LINEBREAK%<strong>Networked Calculations:</strong> While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range&nbsp;0-1 to change 1&nbsp;%FOCUS% result to an %EVADE% or %HIT% result."
    },
    "DFS-081": {
        display_name: "DFS-081",
        text: "While a friendly ship at range 0-1 defends, it may spend 1 calculate token to change all %CRIT% results to %HIT% results.%LINEBREAK%<strong>Networked Calculations:</strong> While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range&nbsp;0-1 to change 1&nbsp;%FOCUS% result to an %EVADE% or %HIT% result."
    },
    "DFS-311": {
        display_name: "DFS-311",
        text: "At the start of the Engagement Phase, you may transfer 1 of your calculate tokens to another friendly ship at range&nbsp;0-3.%LINEBREAK%<strong>Networked Calculations:</strong> While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range&nbsp;0-1 to change 1&nbsp;%FOCUS% result to an %EVADE% or %HIT% result."
    },
    "Dace Bonearm": {
        display_name: "Dace Bonearm",
        text: "After an enemy ship at range 0-3 receives at least 1 ion token, you may spend 3&nbsp;%CHARGE%. If you do, that ship gains 2 additional ion tokens."
    },
    "Dalan Oberos (StarViper)": {
        display_name: "Dalan Oberos",
        text: "After you fully execute a maneuver, you may gain 1 stress token to rotate your ship 90º.%LINEBREAK% <strong>Microthrusters:</strong> While you perform a barrel roll, you <b>must</b> use the %BANKLEFT% or %BANKRIGHT% template instead of the %STRAIGHT% template."
    },
    "Dalan Oberos": {
        display_name: "Dalan Oberos",
        text: "At the start of the Engagement Phase, you may choose 1 shielded ship in your %BULLSEYEARC% and spend 1&nbsp;%CHARGE%. If you do, that ship loses 1 shield and you recover 1 shield.%LINEBREAK%<strong>Dead to Rights:</strong> While you perform an attack, if the defender is in your %BULLSEYEARC%, defense dice cannot be modified using green tokens."
    },
    "Dark Courier": {
        display_name: "Dark Courier",
        text: "<i class = flavor_text>The vessel called the Scimitar was heavily modified, equipped with stealth technologies and advanced surveillance devices for infiltration and assassination missions.</i>"
    },
    "Darth Maul": {
        display_name: "Darth Maul",
        text: "After you perform an attack, you may spend 2 %FORCE% to perform a bonus primary attack against a different target. If your attack missed, you may perform that bonus primary attack against the same target instead."
    },
    "Darth Vader": {
        display_name: "Darth Vader",
        text: "After you perform an action, you may spend 1&nbsp;%FORCE% to perform an action.%LINEBREAK%<strong>Advanced Targeting Computer:</strong> While you perform a primary attack against a defender you have locked, roll 1 additional attack die and change 1&nbsp;%HIT% result to a %CRIT% result."
    },
    "Dash Rendar": {
        display_name: "Dash Rendar",
        text: "While you move, you ignore obstacles.%LINEBREAK%<strong>Sensor Blindspot:</strong> While you perform a primary attack at attack range 0-1, do not apply the range 0-1 bonus and roll 1 fewer attack die."
    },
    "Del Meeko": {
        display_name: "Del Meeko",
        text: "While a friendly ship at range 0-2 defends against a damaged attacker, the defender may reroll 1 defense die."
    },
    "Delta Squadron Pilot": {
        display_name: "Delta Squadron Pilot",
        text: "<i class = flavor_text>In addition to its missile launchers and six wingtip laser cannons, the formidable TIE defender is equipped with deflector shields and a hyperdrive.</i>%LINEBREAK%<strong>Full Throttle:</strong> After you fully execute a speed 3-5 maneuver, you may perform an %EVADE% action."
    },
    Dengar: {
        display_name: "Dengar",
        text: "After you defend, if the attacker is in your %FRONTARC%, you may spend 1&nbsp;%CHARGE% to perform a bonus attack against the attacker."
    },
    "Drea Renthal": {
        display_name: "Drea Renthal",
        text: "While a friendly non-limited ship performs an attack, if the defender is in your firing arc, the attacker may reroll 1 attack die."
    },
    "Edon Kappehl": {
        display_name: "Edon Kappehl",
        text: "After you fully execute a blue or white maneuver, if you have not dropped or launched a device this round, you may drop 1 device."
    },
    "Edrio Two Tubes": {
        display_name: "Edrio Two Tubes",
        text: "Before you activate, if you are focused, you may perform an action."
    },
    "Ello Asty": {
        display_name: "Ello Asty",
        text: "After you reveal a red Tallon Roll [%TROLLLEFT% or %TROLLRIGHT%] maneuver, if you have 2 or fewer stress tokens, treat that maneuver as white.%LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1&nbsp;%CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Emon Azzameen": {
        display_name: "Emon Azzameen",
        text: "If you would drop a device using a [1&nbsp;%STRAIGHT%] template, you may use the [3&nbsp;%TURNLEFT%], [3&nbsp;%STRAIGHT%], or [3&nbsp;%TURNRIGHT%] template instead."
    },
    "Epsilon Squadron Cadet": {
        display_name: "Epsilon Squadron Cadet",
        text: "<i class = flavor_text>Trained from childhood aboard Resurgent-class Star Destroyers in deep space, many First Order TIE pilots have never even set foot on a planet’s surface.</i>"
    },
    "Esege Tuketu": {
        display_name: "Esege Tuketu",
        text: "While a friendly ship at range 0-2 defends or performs an attack, it may spend your focus tokens as if that ship has them."
    },
    "Evaan Verlaine": {
        display_name: "Evaan Verlaine",
        text: "At the start of the Engagement Phase, you may spend 1 focus token to choose a friendly ship at range 0-1. If you do, that ship rolls 1 additional defense die while defending until the end of the round."
    },
    "Ezra Bridger": {
        display_name: "Ezra Bridger",
        text: "While you defend or perform an attack, if you are stressed, you may spend 1&nbsp;%FORCE% to change up to 2 of your %FOCUS% results to %EVADE% or %HIT% results.%LINEBREAK%<strong>Locked and Loaded:</strong> While you are docked, after your carrier ship performs a primary %FRONTARC% or %TURRET% attack, it may perform a bonus primary %REARARC% attack."
    },
    "Ezra Bridger (Sheathipede)": {
        display_name: "Ezra Bridger",
        text: "While you defend or perform an attack, if you are stressed, you may spend 1&nbsp;%FORCE% to change up to 2 of your %FOCUS% results to %EVADE% /%HIT% results. %LINEBREAK%<strong>Comms Shuttle:</strong> While you are docked, your carrier ship gains %COORDINATE%. Before your carrier ship activates, it may perform a %COORDINATE% action."
    },
    "Ezra Bridger (TIE Fighter)": {
        display_name: "Ezra Bridger",
        text: "While you defend or perform an attack, if you are stressed, you may spend 1&nbsp;%FORCE% to change up to 2 of your %FOCUS% results to %EVADE% or %HIT% results."
    },
    "Feethan Ottraw Autopilot": {
        display_name: "Feethan Ottraw Autopilot",
        text: "<i class = flavor_text>Unlike the more disposable fighters it also built for the Separatists, Feethan Ottraw Scalable Assemblies designed the Belbullab-22 with a solid mix of firepower, durability, and speed.</i>"
    },
    "Fenn Rau (Sheathipede)": {
        display_name: "Fenn Rau",
        text: 'Before an enemy ship in your firing arc engages, if you are not stressed, you may gain 1 stress token. If you do, that ship cannot spend tokens to modify dice while it performs an attack during this phase.%LINEBREAK%<strong>Comms Shuttle:</strong> While you are docked, your carrier ship gains %COORDINATE%. Before your carrier ship activates, it may perform a %COORDINATE% action. %LINEBREAK% <i>Errata (since rules reference 1.1.0): Replaced "After an enemy ship in your firing arc engages")</i>'
    },
    "Fenn Rau": {
        display_name: "Fenn Rau",
        text: "While you defend or perform an attack, if the attack range is 1, you may roll 1 additional die.%LINEBREAK%<strong>Concordia Faceoff:</strong> While you defend, if the attack range is 1 and you are in the attacker’s %FRONTARC%, change 1 result to an %EVADE% result."
    },
    "Finch Dallow": {
        display_name: "Finch Dallow",
        text: "Before you would drop a bomb, you may place it in the play area touching you instead."
    },
    "First Order Test Pilot": {
        display_name: "First Order Test Pilot",
        text: "<i class = flavor_text>Engineered for incredible speed and precise handling, the TIE Silencer is devastating in the hands of those who can unlock its full potential. Any lesser pilot could easily be overwhelmed and lose control of the nimble craft. </i>%LINEBREAK%<strong>Autothrusters:</strong> After you perform an action, you may perform a red %BARRELROLL% or red %BOOST% action."
    },
    "Foreman Proach": {
        display_name: "Foreman Proach",
        text: "Before you engage, you may choose 1&nbsp;enemy ship in your %BULLSEYEARC% at range 1-2 and gain 1 disarm token. If you do, that ship gains 1 tractor token.%LINEBREAK%<strong>Notched Stabilizers:</strong> While you move, you ignore asteroids."
    },
    "Freighter Captain": {
        display_name: "Freighter Captain",
        text: "<i class = flavor_text>Many spacers make a living traveling the Outer Rim, where the difference between smuggler and legitimate merchant is often murky. On the outskirts of civilization, buyers are rarely so discerning to ask where merchandise came from, at least as long as the price is low enough.</i>"
    },
    "Gamma Squadron Ace": {
        display_name: "Gamma Squadron Ace",
        text: "<i class = flavor_text>Though it sacrifices a degree of speed and maneuverability compared to a TIE/ln, the TIE bomber’s increased payload can carry enough firepower to destroy virtually any enemy target.</i> %LINEBREAK%<strong>Nimble Bomber:</strong> If you would drop a device using a %STRAIGHT% template, you may use a %BANKLEFT% or %BANKRIGHT% template of the same speed instead."
    },
    "Gand Findsman": {
        display_name: "Gand Findsman",
        text: "<i class = flavor_text>The legendary Findsmen of Gand worship the enshrouding mists of their home planet, using signs, augurs, and mystical rituals to track their quarry.</i>"
    },
    "Garven Dreis (X-Wing)": {
        display_name: "Garven Dreis",
        text: "After you spend a focus token, you may choose 1 friendly ship at range 1-3. That ship gains 1 focus token."
    },
    "Garven Dreis": {
        display_name: "Garven Dreis",
        text: "After you spend a focus token, you may choose 1 friendly ship at range 1-3. That ship gains 1 focus token."
    },
    "Gavin Darklighter": {
        display_name: "Gavin Darklighter",
        text: "While a friendly ship performs an attack, if the defender is in your %FRONTARC%, the attacker may change 1&nbsp;%HIT% result to a %CRIT% result.%LINEBREAK%<strong>Experimental Scanners:</strong> You can acquire locks beyond range 3. You cannot acquire locks at range 1."
    },
    "General Grievous": {
        display_name: "General Grievous",
        text: "While you perform a primary attack, if you are not in the defender’s firing arc, you may reroll up to 2&nbsp;attack dice."
    },
    "Genesis Red": {
        display_name: "Genesis Red",
        text: "After you acquire a lock, you must remove all of your focus and evade tokens. Then, gain the same number of focus and evade tokens that the locked ship has.%LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1 %CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Gideon Hask": {
        display_name: "Gideon Hask",
        text: "While you perform an attack against a damaged defender, roll 1 additional attack die."
    },
    "Gold Squadron Trooper": {
        display_name: "Gold Squadron Trooper",
        text: "<i class = flavor_text>The V-19 Torrent starfighter was designed to be a light escort to nimble Delta-7 interceptors flown by Jedi Knights, and has a unique flight profile to reflect this role.</i>"
    },
    "Gold Squadron Veteran": {
        display_name: "Gold Squadron Veteran",
        text: "<i class = flavor_text>Commanded by Jon “Dutch” Vander, Gold Squadron played an instrumental role in the Battles of Scarif and Yavin.</i>"
    },
    "Grand Inquisitor": {
        display_name: "Grand Inquisitor",
        text: "While you defend at attack range 1, you may spend 1&nbsp;%FORCE% to prevent the range 1 bonus. %LINEBREAK%While you perform an attack against a defender at attack range 2-3, you may spend 1&nbsp;%FORCE% to apply the range 1 bonus."
    },
    "Gray Squadron Bomber": {
        display_name: "Gray Squadron Bomber",
        text: "<i class = flavor_text>Long after the Y-wing was phased out by the Galactic Empire, its durability, dependability, and heavy armament help it remain a staple in the Rebel fleet.</i>"
    },
    Graz: {
        display_name: "Graz",
        text: "While you defend, if you are behind the attacker, roll 1 additional defense die.%LINEBREAK%While you perform an attack, if you are behind the defender, roll 1 additional attack die."
    },
    "Green Squadron Expert": {
        display_name: "Green Squadron Expert",
        text: "<i class = flavor_text>Years of field-expedient modifications were standardized in the RZ-2 design, but daring pilots see the ship’s improved reliability as a challenge to further push the limits of its performance.</i>%LINEBREAK%<strong>Refined Gyrostabilizers:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. After you perform an action, you may perform a red %BOOST% or red %ROTATEARC% action."
    },
    "Green Squadron Pilot": {
        display_name: "Green Squadron Pilot",
        text: "<i class = flavor_text>Due to its sensitive controls and high maneuverability, only the most talented pilots belong in an A-wing cockpit.</i>%LINEBREAK%<strong>Vectored Thrusters:</strong> After you perform an action, you may perform a red %BOOST% action."
    },
    "Greer Sonnel": {
        display_name: "Greer Sonnel",
        text: "After you fully execute a maneuver, you may rotate your %SINGLETURRETARC%.%LINEBREAK%<strong>Refined Gyrostabilizers:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. After you perform an action, you may perform a red %BOOST% or red %ROTATEARC% action."
    },
    Guri: {
        display_name: "Guri",
        text: "At the start of the Engagement Phase, if there is at least 1 enemy ship at range 0-1, you may gain 1 focus token.%LINEBREAK% <strong>Microthrusters:</strong> While you perform a barrel roll, you <b>must</b> use the %BANKLEFT% or %BANKRIGHT% template instead of the %STRAIGHT% template."
    },
    "Han Solo": {
        display_name: "Han Solo",
        text: "After you roll dice, if you are at range 0-1 of an obstacle, you may reroll all of your dice. This does not count as rerolling for the purpose of other effects."
    },
    "Han Solo (Scum)": {
        display_name: "Han Solo",
        text: "While you defend or perform a primary attack, if the attack is obstructed by an obstacle, you may roll 1 additional die."
    },
    "Han Solo (Resistance)": {
        display_name: "Han Solo",
        text: "<strong>Setup:</strong> You can be placed anywhere in the play area beyond range 3 of enemy ships."
    },
    "Heff Tobber": {
        display_name: "Heff Tobber",
        text: "After an enemy ship executes a maneuver, if it is at range 0, you may perform an action."
    },
    "Hera Syndulla": {
        display_name: "Hera Syndulla",
        text: "After you reveal a red or blue maneuver, you may set your dial to another maneuver of the same difficulty.%LINEBREAK%<strong>Locked and Loaded:</strong> While you are docked, after your carrier ship performs a primary %FRONTARC% or %TURRET% attack, it may perform a bonus primary %REARARC% attack."
    },
    "Hera Syndulla (VCX-100)": {
        display_name: "Hera Syndulla",
        text: "After you reveal a red or blue maneuver, you may set your dial to another maneuver of the same difficulty.%LINEBREAK%<strong>Tail Gun:</strong> While you have a docked ship, you have a primary %REARARC% weapon with an attack value equal to your docked ship’s primary %FRONTARC% attack value."
    },
    "Hired Gun": {
        display_name: "Hired Gun",
        text: "<i class = flavor_text>Just the mention of Imperial credits can bring a host of less-than-trustworthy individuals to your side.</i>"
    },
    "Horton Salm": {
        display_name: "Horton Salm",
        text: "While you perform an attack, you may reroll 1 attack die for each other friendly ship at range 0-1 of the defender."
    },
    "IG-88A": {
        display_name: "IG-88A",
        text: "At the start of the Engagement Phase, you may choose 1 friendly ship with %CALCULATE% on its action bar at range 1-3. If you do, transfer 1 of your calculate tokens to it. %LINEBREAK%<strong>Advanced Droid Brain:</strong> After you perform a %CALCULATE% action, gain 1 calculate token."
    },
    "IG-88B": {
        display_name: "IG-88B",
        text: "After you perform an attack that misses, you may perform a bonus %CANNON% attack.%LINEBREAK%<strong>Advanced Droid Brain:</strong> After you perform a %CALCULATE% action, gain 1 calculate token."
    },
    "IG-88C": {
        display_name: "IG-88C",
        text: "After you perform a %BOOST% action, you may perform an %EVADE% action.%LINEBREAK%<strong>Advanced Droid Brain:</strong> After you perform a %CALCULATE% action, gain 1 calculate token."
    },
    "IG-88D": {
        display_name: "IG-88D",
        text: "While you execute a Segnor’s Loop (%SLOOPLEFT% or %SLOOPRIGHT%) maneuver, you may use another template of the same speed instead: either the turn (%TURNLEFT% or %TURNRIGHT%) of the same direction or the straight (%STRAIGHT%) template.%LINEBREAK%<strong>Advanced Droid Brain:</strong> After you perform a %CALCULATE% action, gain 1 calculate token."
    },
    Ibtisam: {
        display_name: "Ibtisam",
        text: "After you fully execute a maneuver, if you are stressed, you may roll 1 attack die. On a %HIT% or %CRIT% result, remove 1 stress token."
    },
    "Iden Versio": {
        display_name: "Iden Versio",
        text: "Before a friendly TIE/ln fighter at range 0-1 would suffer 1 or more damage, you may spend 1&nbsp;%CHARGE%. If you do, prevent that damage."
    },
    "Imdaar Test Pilot": {
        display_name: "Imdaar Test Pilot",
        text: "<i class = flavor_text>The primary result of a hidden research facility on Imdaar Alpha, the TIE phantom achieves what many thought was impossible: a small starfighter equipped with an advanced cloaking device.</i>%LINEBREAK%<strong>Stygium Array:</strong> After you decloak, you may perform an %EVADE% action. At the start of the End Phase, you may spend 1 evade token to gain 1 cloak token."
    },
    Inaldra: {
        display_name: "Inaldra",
        text: "While you defend or perform an attack, you may suffer 1&nbsp;%HIT% damage to reroll any number of your dice.%LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1 %CANNON%, %TORPEDO%, or %MISSILE% upgrade. "
    },
    Inquisitor: {
        display_name: "Inquisitor",
        text: "<i class = flavor_text>The fearsome Inquisitors are given a great deal of autonomy and access to the Empire’s latest technology, like the prototype TIE Advanced v1.</i>"
    },
    "Jake Farrell": {
        display_name: "Jake Farrell",
        text: "After you perform a %BARRELROLL% or %BOOST% action, you may choose a friendly ship at range 0-1. That ship may perform a %FOCUS% action.%LINEBREAK%<strong>Vectored Thrusters:</strong> After you perform an action, you may perform a red %BOOST% action."
    },
    "Jakku Gunrunner": {
        display_name: "Jakku Gunrunner",
        text: '<i class = flavor_text>The Quadrijet transfer spacetug, commonly called a "Quadjumper," is nimble in space and atmosphere alike, making it popular among both smugglers and explorers.</i> %LINEBREAK%<strong>Spacetug Tractor Array:</strong> <strong>Action:</strong> Choose a ship in your %FRONTARC% at range 1. That ship gains 1 tractor token, or 2 tractor tokens if it is in your %BULLSEYEARC% at range 1.'
    },
    "Jan Ors": {
        display_name: "Jan Ors",
        text: "While a friendly ship in your firing arc performs a primary attack, if you are not stressed, you may gain 1 stress token. If you do, that ship may roll 1 additional attack die."
    },
    "Jaycris Tubbs": {
        display_name: "Jaycris Tubbs",
        text: "After you fully execute a blue maneuver, you may choose a friendly ship at range&nbsp;0-1. If you do, that ship removes 1&nbsp;stress token.%LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1&nbsp;%CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Jedi Knight": {
        display_name: "Jedi Knight",
        text: "<i class = flavor_text>When the Clone Wars began, the Jedi Knights rallied to the cause of preserving the Republic, assuming command of legions of clone troopers and leading them in battle.</i>%LINEBREAK%<strong>Fine-tuned Controls:</strong> After you fully execute a maneuver, you may spend 1&nbsp;%FORCE% to perform a %BOOST% or %BARRELROLL% action."
    },
    "Jek Porkins": {
        display_name: "Jek Porkins",
        text: "After you receive a stress token, you may roll 1 attack die to remove it. On a %HIT% result, suffer 1&nbsp;%HIT% damage."
    },
    "Jessika Pava": {
        display_name: "Jessika Pava",
        text: "While you defend or perform an attack, you may spend 1&nbsp;%CHARGE% or 1 non-recurring&nbsp;%CHARGE% from your equipped %ASTROMECH% upgrade to reroll up to 1&nbsp;of your dice for each other friendly ship at range 0-1.%LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1&nbsp;%CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Joph Seastriker": {
        display_name: "Joph Seastriker",
        text: "After you lose 1 shield, gain 1&nbsp;evade token.%LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1&nbsp;%CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Joy Rekkoff": {
        display_name: "Joy Rekkoff",
        text: "While you perform an attack, you may spend 1&nbsp;%CHARGE% from an equipped %TORPEDO% upgrade. If you do, the defender rolls 1 fewer defense die.%LINEBREAK%<strong>Concordia Faceoff:</strong> While you defend, if the attack range is 1 and you are in the attacker’s %FRONTARC%, change 1 result to an %EVADE% result."
    },
    "Kaa'to Leeachos": {
        display_name: "Kaa’to Leeachos",
        text: "At the start of the Engagement Phase, you may choose 1 friendly ship at range 0-2. If you do, transfer 1 focus or evade token from that ship to yourself. "
    },
    "Kad Solus": {
        display_name: "Kad Solus",
        text: "After you fully execute a red maneuver, gain 2 focus tokens.%LINEBREAK%<strong>Concordia Faceoff:</strong> While you defend, if the attack range is 1 and you are in the attacker’s %FRONTARC%, change 1 result to an %EVADE% result."
    },
    "Kanan Jarrus": {
        display_name: "Kanan Jarrus",
        text: "While a friendly ship in your firing arc defends, you may spend 1&nbsp;%FORCE%. If you do, the attacker rolls 1 fewer attack die.%LINEBREAK%<strong>Tail Gun:</strong> While you have a docked ship, you have a primary %REARARC% weapon with an attack value equal to your docked ship’s primary %FRONTARC% attack value."
    },
    "Kare Kun": {
        display_name: "Kare Kun",
        text: "While you boost, you may use the [1 %TURNLEFT%] or [1 %TURNRIGHT%] template instead.%LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1&nbsp;%CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Kashyyyk Defender": {
        display_name: "Kashyyyk Defender",
        text: "<i class = flavor_text>Equipped with three wide-range Sureggi twin laser cannons, the Auzituck gunship acts as a powerful deterrent to slaver operations in the Kashyyyk system.</i>"
    },
    "Kath Scarlet": {
        display_name: "Kath Scarlet",
        text: "While you perform a primary attack, if there is at least 1 friendly non-limited ship at range 0 of the defender, roll 1 additional attack die."
    },
    Kavil: {
        display_name: "Kavil",
        text: "While you perform a non-%FRONTARC% attack, roll 1 additional attack die."
    },
    "Ketsu Onyo": {
        display_name: "Ketsu Onyo",
        text: "At the start of the Engagement Phase, you may choose 1 ship in both your %FRONTARC% and %SINGLETURRETARC% at range 0-1. If you do, it gains 1 tractor token."
    },
    "Knave Squadron Escort": {
        display_name: "Knave Squadron Escort",
        text: "<i class = flavor_text>Designed to combine the best features of the X-wing series with the A-wing series, the E-wing boasts superior firepower, speed, and maneuverability.</i>%LINEBREAK% <strong>Experimental Scanners:</strong> You can acquire locks beyond range 3. You cannot acquire locks at range 1."
    },
    "Koshka Frost": {
        display_name: "Koshka Frost",
        text: "While you defend or perform an attack, if the enemy ship is stressed, you may reroll 1 of your dice."
    },
    "Krassis Trelix": {
        display_name: "Krassis Trelix",
        text: "You can perform %FRONTARC% special attacks from your %REARARC%.%LINEBREAK%While you perform a special attack, you may reroll 1 attack die."
    },
    "Kullbee Sperado": {
        display_name: "Kullbee Sperado",
        text: "After you perform a %BARRELROLL% or %BOOST% action, you may flip your equipped %CONFIGURATION% upgrade card."
    },
    "Kyle Katarn": {
        display_name: "Kyle Katarn",
        text: "At the start of the Engagement Phase, you may transfer 1 of your focus tokens to a friendly ship in your firing arc."
    },
    "L3-37": {
        display_name: "L3-37",
        text: "If you are not shielded, decrease the difficulty of your bank (%BANKLEFT% and %BANKRIGHT%) maneuvers."
    },
    "L3-37 (Escape Craft)": {
        display_name: "L3-37",
        text: "If you are not shielded, decrease the difficulty of your bank (%BANKLEFT% and %BANKRIGHT%) maneuvers.%LINEBREAK%<strong>Co-Pilot:</strong> While you are docked, your carrier ship has your pilot ability in addition to its own."
    },
    "Laetin A'shera": {
        display_name: "Laetin A’shera",
        text: "After you defend or perform an attack, if the attack missed, gain 1 evade token.%LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1 %CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Lando Calrissian": {
        display_name: "Lando Calrissian",
        text: "After you fully execute a blue maneuver, you may choose a friendly ship at range 0-3. That ship may perform an action."
    },
    "Lando Calrissian (Scum)": {
        display_name: "Lando Calrissian",
        text: "After you roll dice, if you are not stressed, you may gain 1 stress token to reroll all of your blank results."
    },
    "Lando Calrissian (Scum) (Escape Craft)": {
        display_name: "Lando Calrissian",
        text: "After you roll dice, if you are not stressed, you may gain 1 stress token to reroll all of your blank results.%LINEBREAK%<strong>Co-Pilot:</strong> While you are docked, your carrier ship has your pilot ability in addition to its own."
    },
    "Latts Razzi": {
        display_name: "Latts Razzi",
        text: "At the start of the Engagement Phase, you may choose a ship at range 1 and spend a lock you have on that ship. If you do, that ship gains 1 tractor token."
    },
    "Leevan Tenza": {
        display_name: "Leevan Tenza",
        text: "After you perform a %BARRELROLL% or %BOOST% action, you may perform a red %EVADE% action."
    },
    "Lieutenant Bastian": {
        display_name: "Lieutenant Bastian",
        text: "After a ship at range 1-2 is dealt a damage card, you may acquire a lock on that ship.%LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1&nbsp;%CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Lieutenant Blount": {
        display_name: "Lieutenant Blount",
        text: "While you perform a primary attack, if there is at least 1 other friendly ship at range 0-1 of the defender, you may roll 1 additional attack die."
    },
    "Lieutenant Dormitz": {
        display_name: "Lieutenant Dormitz",
        text: '<strong>Setup</strong>: After you are placed, other friendly small ships can be placed anywhere in the play area at range 0-2 of you.%LINEBREAK%<strong>Linked Battery:</strong> While you perform a %CANNON% attack, roll 1 additional die. %LINEBREAK% <i>Errata (since rules reference 1.3.0): Replaced "other friendly ship" with "friendly small ships"</i>'
    },
    "Lieutenant Karsabi": {
        display_name: "Lieutenant Karsabi",
        text: "After you gain a disarm token, if you are not stressed, you may gain 1 stress token to remove 1 disarm token."
    },
    "Lieutenant Kestal": {
        display_name: "Lieutenant Kestal",
        text: "While you perform an attack, after the defender rolls defense dice, you may spend 1 focus token to cancel all of the defender’s blank/%FOCUS% results."
    },
    "Lieutenant Rivas": {
        display_name: "Lieutenant Rivas",
        text: "After a ship at range 1-2 gains a red or orange token, if you do not have that ship locked, you may acquire a lock on that ship."
    },
    "Lieutenant Sai": {
        display_name: "Lieutenant Sai",
        text: "After you a perform a %COORDINATE% action, if the ship you chose performed an action on your action bar, you may perform that action."
    },
    "Lieutenant Tavson": {
        display_name: "Lieutenant Tavson",
        text: "After you suffer damage, you may spend 1&nbsp;%CHARGE% to perform an action.%LINEBREAK%<strong>Linked Battery:</strong> While you perform a %CANNON% attack, roll 1 additional die."
    },
    "Lok Revenant": {
        display_name: "Lok Revenant",
        text: "<i class = flavor_text>The Nubian Design Collective crafted the Scurrg H-6 Bomber with combat versatility in mind, arming it with powerful shields and a bristling array of destructive weaponry.</i>"
    },
    "Lothal Rebel": {
        display_name: "Lothal Rebel",
        text: "<i class = flavor_text>Another successful Corellian Engineering Corporation freighter design, the VCX-100 is larger than the ubiquitous YT-series, boasting more living space and customizability.</i>%LINEBREAK%<strong>Tail Gun:</strong> While you have a docked ship, you have a primary %REARARC% weapon with an attack value equal to your docked ship’s primary %FRONTARC% attack value."
    },
    Lowhhrick: {
        display_name: "Lowhhrick",
        text: "After a friendly ship at range 0-1 becomes the defender, you may spend 1 reinforce token. If you do, that ship gains 1 evade token."
    },
    "Luke Skywalker": {
        display_name: "Luke Skywalker",
        text: "After you become the defender (before dice are rolled), you may recover 1&nbsp;%FORCE%."
    },
    "Luminara Unduli": {
        display_name: "Luminara Unduli",
        text: "While a friendly ship at range&nbsp;0-2 defends, if it is not in the attacker’s %BULLSEYEARC%, you may spend 1&nbsp;%FORCE%. If you do, change 1&nbsp;%CRIT% result to a %HIT% result or 1 %HIT% result to a %FOCUS% result.%LINEBREAK%<strong>Fine-tuned Controls:</strong> After you fully execute a maneuver, you may spend 1&nbsp;%FORCE% to perform a %BOOST% or %BARRELROLL% action."
    },
    "L'ulo L'ampar": {
        display_name: "L’ulo L’ampar",
        text: "While you defend or perform a primary attack, if you are stressed, you <b>must</b> roll 1 fewer defense die or 1 additional attack die.%LINEBREAK%<strong>Refined Gyrostabilizers:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. After you perform an action, you may perform a red %BOOST% or red %ROTATEARC% action."
    },
    "Maarek Stele": {
        display_name: "Maarek Stele",
        text: "While you perform an attack, if the defender would be dealt a faceup damage card, instead draw 3 damage cards, choose 1, and discard the rest.%LINEBREAK%<strong>Advanced Targeting Computer:</strong> While you perform a primary attack against a defender you have locked, roll 1 additional attack die and change 1&nbsp;%HIT% result to a %CRIT% result. "
    },
    "Mace Windu": {
        display_name: "Mace Windu",
        text: "After you fully execute a red maneuver, recover 1&nbsp;%FORCE%.%LINEBREAK%<strong>Fine-tuned Controls:</strong> After you fully execute a maneuver, you may spend 1&nbsp;%FORCE% to perform a %BOOST% or %BARRELROLL% action."
    },
    "Magva Yarro": {
        display_name: "Magva Yarro",
        text: "While a friendly ship at range 0-2 defends, the attacker cannot reroll more than 1 attack die."
    },
    "Major Rhymer": {
        display_name: "Major Rhymer",
        text: "While you perform a %TORPEDO% or %MISSILE% attack, you may increase or decrease the range requirement by 1, to a limit of 0-3. %LINEBREAK%<strong>Nimble Bomber:</strong> If you would drop a device using a %STRAIGHT% template, you may use a %BANKLEFT% or %BANKRIGHT% template of the same speed instead."
    },
    "Major Stridan": {
        display_name: "Major Stridan",
        text: "While you coordinate or resolve the effect of one of your upgrades, you may treat friendly ships at range 2-3 as being at range 0 or range 1.%LINEBREAK%<strong>Linked Battery:</strong> While you perform a %CANNON% attack, roll 1 additional die."
    },
    "Major Vermeil": {
        display_name: "Major Vermeil",
        text: "While you perform an attack, if the defender does not have any green tokens, you may change 1 of your blank or %FOCUS% results to a %HIT% result.%LINEBREAK% %LINEBREAK%<strong>Adaptive Ailerons:</strong> Before you reveal your dial, if you are not stressed, you <b>must</b> execute a white [1&nbsp;%BANKLEFT%], [1&nbsp;%STRAIGHT%], or [1&nbsp;%BANKRIGHT%] maneuver."
    },
    "Major Vynder": {
        display_name: "Major Vynder",
        text: "While you defend, if you are disarmed, roll 1 additional defense die."
    },
    Manaroo: {
        display_name: "Manaroo",
        text: "At the start of the Engagement Phase, you may choose a friendly ship at range 0-1. If you do, transfer all green tokens assigned to you to that ship."
    },
    "Mining Guild Sentry": {
        display_name: "Mining Guild Sentry",
        text: "<i class = flavor_text>As part of its arrangement with the Empire, the Mining Guild receives modified TIE/ln Fighters to protect its operations. These craft have solar panels removed from their stabilizers for improved visibility, and feature more extensive life support systems for the benefit of their corporate pilots.</i>%LINEBREAK%<strong>Notched Stabilizers:</strong> While you move, you ignore asteroids."
    },
    "Mining Guild Surveyor": {
        display_name: "Mining Guild Surveyor",
        text: "<i class = flavor_text>With Imperial construction projects consuming raw materials at an unprecedented rate, the Mining Guild ruthlessly exploits newly discovered deposits of doonium ore on worlds such as Batonn, Lothal, and Umbara.</i>%LINEBREAK%<strong>Notched Stabilizers:</strong> While you move, you ignore asteroids."
    },
    "Miranda Doni": {
        display_name: "Miranda Doni",
        text: "While you perform a primary attack, you may either spend 1 shield to roll 1 additional attack die or, if you are not shielded, you may roll 1 fewer attack die to recover 1 shield."
    },
    "Moralo Eval": {
        display_name: "Moralo Eval",
        text: "If you would flee, you may spend 1&nbsp;%CHARGE%. If you do, place yourself in reserves instead. At the start of the next Planning Phase, place yourself within range 1 of the edge of the play area that you fled from."
    },
    "Nien Nunb": {
        display_name: "Nien Nunb",
        text: "After you gain a stress token, if there is an enemy ship in your %FRONTARC% at range 0-1, you may remove that stress token.%LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1&nbsp;%CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Norra Wexley (Y-Wing)": {
        display_name: "Norra Wexley",
        text: "While you defend, if there is an enemy ship at range 0-1, add 1&nbsp;%EVADE% result to your dice results."
    },
    "Norra Wexley": {
        display_name: "Norra Wexley",
        text: "While you defend, if there is an enemy ship at range 0-1, add 1&nbsp;%EVADE% result to your dice results. %LINEBREAK% <i>Errata (since rules reference 1.0.2): Removed “you may”</i>"
    },
    "Nu Squadron Pilot": {
        display_name: "Nu Squadron Pilot",
        text: "<i class = flavor_text>With a design inspired by other Cygnus Spaceworks vessels, the Alpha-class star wing is a versatile craft assigned to Imperial Navy specialist units that need a starfighter they can outfit for multiple roles.</i>"
    },
    "N'dru Suhlak": {
        display_name: "N’dru Suhlak",
        text: "While you perform a primary attack, if there are no other friendly ships at range 0-2, roll 1 additional attack die."
    },
    "Obi-Wan Kenobi": {
        display_name: "Obi-Wan Kenobi",
        text: "After a friendly ship at range&nbsp;0-2 spends a focus token, you may spend 1&nbsp;%FORCE%. If you do, that ship gains 1&nbsp;focus token.%LINEBREAK%<strong>Fine-tuned Controls:</strong> After you fully execute a maneuver, you may spend 1&nbsp;%FORCE% to perform a %BOOST% or %BARRELROLL% action."
    },
    "Obsidian Squadron Pilot": {
        display_name: "Obsidian Squadron Pilot",
        text: "<i class = flavor_text>The TIE fighter’s Twin Ion Engine system was designed for speed, making the TIE/ln one of the most maneuverable starships ever mass-produced.</i>"
    },
    "Old Teroch": {
        display_name: "Old Teroch",
        text: "At the start of the Engagement Phase, you may choose 1 enemy ship at range 1. If you do and you are in its %FRONTARC%, it removes all of its green tokens.%LINEBREAK%<strong>Concordia Faceoff:</strong> While you defend, if the attack range is 1 and you are in the attacker’s %FRONTARC%, change 1 result to an %EVADE% result."
    },
    "Omega Squadron Ace": {
        display_name: "Omega Squadron Ace",
        text: "<i class = flavor_text>Only pilots who have demonstrated both exceptional skill and unwavering dedication are rewarded with coveted positions in the First Order squadrons operating secretly against the New Republic during the Cold War.</i>"
    },
    "Omega Squadron Expert": {
        display_name: "Omega Squadron Expert",
        text: "<i class = flavor_text>The TIE/sf is a versatile starfighter that carries specialized armament and experimental systems for long-range operations by First Order Special Forces.</i>%LINEBREAK%<strong>Heavy Weapon Turret:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. You <b>must</b> treat the %FRONTARC% requirement of your equipped %MISSILE% upgrades as %SINGLETURRETARC%."
    },
    "Omicron Group Pilot": {
        display_name: "Omicron Group Pilot",
        text: "<i class = flavor_text>Noted for its tri-wing design and advanced sensor suite, the Lambda-class shuttle serves a critical role as a light utility craft in the Imperial Navy.</i>"
    },
    "Onyx Squadron Ace": {
        display_name: "Onyx Squadron Ace",
        text: "<i class = flavor_text>The experimental TIE defender outclasses all other contemporary starfighters, though its size, speed, and array of weapons come at a tremendous cost in credits.</i>%LINEBREAK%<strong>Full Throttle:</strong> After you fully execute a speed 3-5 maneuver, you may perform an %EVADE% action."
    },
    "Onyx Squadron Scout": {
        display_name: "Onyx Squadron Scout",
        text: "<i class = flavor_text>Designed for extended engagements, the TIE/ag is flown primarily by elite pilots trained to leverage both its unique weapons loadout and its maneuverability to full effect.</i>"
    },
    "Outer Rim Pioneer": {
        display_name: "Outer Rim Pioneer",
        text: "Friendly ships at range 0-1 can perform attacks at range 0 of obstacles.%LINEBREAK%<strong>Co-Pilot:</strong> While you are docked, your carrier ship has your pilot ability in addition to its own."
    },
    "Outer Rim Smuggler": {
        display_name: "Outer Rim Smuggler",
        text: "<i class = flavor_text>Known for its durability and modular design, the YT-1300 is one of the most popular, widely used, and extensively customized freighters in the galaxy.</i>"
    },
    "Overseer Yushyn": {
        display_name: "Overseer Yushyn",
        text: "Before a friendly ship at range 1 would gain a disarm token, if that ship is not stressed, you may spend 1&nbsp;%CHARGE%. If you do, that ship gains 1 stress token instead.%LINEBREAK%<strong>Notched Stabilizers:</strong> While you move, you ignore asteroids."
    },
    "Palob Godalhi": {
        display_name: "Palob Godalhi",
        text: "At the start of the Engagement Phase, you may choose 1 enemy ship in your firing arc at range 0-2. If you do, transfer 1 focus or evade token from that ship to yourself."
    },
    "Partisan Renegade": {
        display_name: "Partisan Renegade",
        text: "<i class = flavor_text>Saw Gerrera’s partisans were first established to oppose Separatist forces on Onderon during the Clone Wars, and continued to wage war against galactic tyranny as the Empire rose to power.</i>"
    },
    "Patrol Leader": {
        display_name: "Patrol Leader",
        text: "<i class = flavor_text>To be granted command of a VT-49 Decimator is seen as a significant promotion for a middling officer of the Imperial Navy.</i>"
    },
    "Petty Officer Thanisson": {
        display_name: "Petty Officer Thanisson",
        text: "During the Activation or Engagement Phase, after a ship in your %FRONTARC% at range&nbsp;0-2 gains 1 stress token, you may spend 1&nbsp;%CHARGE%. If you do, that ship gains 1&nbsp;tractor token.%LINEBREAK%<strong>Linked Battery:</strong> While you perform a %CANNON% attack, roll 1 additional die."
    },
    "Phoenix Squadron Pilot": {
        display_name: "Phoenix Squadron Pilot",
        text: "<i class = flavor_text>Led by Commander Jun Sato, the brave but inexperienced pilots of Phoenix Squadron face staggering odds in their battle against the Galactic Empire.</i>%LINEBREAK%<strong>Vectored Thrusters:</strong> After you perform an action, you may perform a red %BOOST% action."
    },
    "Planetary Sentinel": {
        display_name: "Planetary Sentinel",
        text: "<i class = flavor_text>To protect its many military installations, the Empire requires a swift and vigilant defense force.</i>%LINEBREAK% <strong>Adaptive Ailerons:</strong> Before you reveal your dial, if you are not stressed, you <b>must</b> execute a white [1&nbsp;%BANKLEFT%], [1&nbsp;%STRAIGHT%], or [1&nbsp;%BANKRIGHT%] maneuver."
    },
    "Plo Koon": {
        display_name: "Plo Koon",
        text: "At the start of the Engagement Phase, you may spend 1 %FORCE% and choose another friendly ship at range 0-2. If you do, you may transfer 1 green token to it or transfer one orange token from it to yourself.%LINEBREAK%<strong>Fine-tuned Controls:</strong> After you fully execute a maneuver, you may spend 1&nbsp;%FORCE% to perform a %BOOST% or %BARRELROLL% action."
    },
    "Poe Dameron": {
        display_name: "Poe Dameron",
        text: "After you perform an action, you may spend 1&nbsp;%CHARGE% to perform a white action, treating it as red.%LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1&nbsp;%CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Prince Xizor": {
        display_name: "Prince Xizor",
        text: "While you defend, after the Neutralize Results step, another friendly ship at range 0-1 and in the attack arc may suffer 1&nbsp;%HIT% or %CRIT% damage. If it does, cancel 1 matching result.%LINEBREAK%<strong>Microthrusters:</strong> While you perform a barrel roll, you <b>must</b> use the %BANKLEFT% or %BANKRIGHT% template instead of the %STRAIGHT% template."
    },
    "Quinn Jast": {
        display_name: "Quinn Jast",
        text: "At the start of the Engagement Phase, you may gain 1 disarm token to recover 1&nbsp;%CHARGE% on 1 of your equipped upgrades. %LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1 %CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Rear Admiral Chiraneau": {
        display_name: "Rear Admiral Chiraneau",
        text: "While you perform an attack, if you are reinforced and the defender is in the %FULLFRONTARC% or %FULLREARARC% matching your reinforce token, you may change 1 of your %FOCUS% results to a %CRIT% result."
    },
    "Rebel Scout": {
        display_name: "Rebel Scout",
        text: "<i class = flavor_text>Designed to look like a bird in flight by the Corellian Engineering Corporation, “hawk” series ships are exemplary transport craft. Swift and rugged, the HWK-290 is often employed by Rebel agents as a mobile base of operations.</i>"
    },
    "Red Squadron Expert": {
        display_name: "Red Squadron Expert",
        text: "<i class = flavor_text>Although the bulk of the Resistance Starfighter Corps is made up of young volunteers from the New Republic, their ranks are bolstered by veterans of the Galactic Civil War determined to finish what they started decades ago.</i>%LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1&nbsp;%CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Red Squadron Veteran": {
        display_name: "Red Squadron Veteran",
        text: "<i class = flavor_text>Created as an elite starfighter squad, Red Squadron includes some of the best pilots in the Rebel Alliance.</i>"
    },
    "Resistance Sympathizer": {
        display_name: "Resistance Sympathizer",
        text: "<i class = flavor_text>After witnessing the Hosnian Cataclysm, some spacers willingly aided the Resistance with whatever ships they had.</i>"
    },
    "Rexler Brath": {
        display_name: "Rexler Brath",
        text: "After you perform an attack that hits, if you are evading, expose 1 of the defender’s damage cards.%LINEBREAK%<strong>Full Throttle:</strong> After you fully execute a speed 3-5 maneuver, you may perform an %EVADE% action."
    },
    Rey: {
        display_name: "Rey",
        text: "While you defend or perform an attack, if the enemy ship is in your %FRONTARC%, you may spend 1&nbsp;%FORCE% to change 1 of your blank results to an %EVADE% or %HIT% result."
    },
    "Rho Squadron Pilot": {
        display_name: "Rho Squadron Pilot",
        text: "<i class = flavor_text>The elite pilots of Rho Squadron instill terror in the Rebellion, using both the Xg-1 assault configuration and Os-1 arsenal loadout of the Alpha-class star wing to devastating effect.</i>"
    },
    "Roark Garnet": {
        display_name: "Roark Garnet",
        text: "At the start of the Engagement Phase, you may choose 1 ship in your firing arc. If you do, it engages at initiative 7 instead of its standard initiative value this phase."
    },
    "Rogue Squadron Escort": {
        display_name: "Rogue Squadron Escort",
        text: "<i class = flavor_text>The elite pilots of Rogue Squadron are among the Rebellion’s very best.</i> %LINEBREAK% <strong>Experimental Scanners:</strong> You can acquire locks beyond range 3. You cannot acquire locks at range 1."
    },
    "Saber Squadron Ace": {
        display_name: "Saber Squadron Ace",
        text: "<i class = flavor_text>Led by Baron Soontir Fel, the pilots of Saber Squadron are among the Empire’s best. Their TIE interceptors are marked with red stripes to designate pilots with at least ten confirmed kills. </i> %LINEBREAK%  <strong> Autothrusters:</strong> After you perform an action, you may perform a red %BARRELROLL% or red %BOOST% action."
    },
    "Sabine Wren": {
        display_name: "Sabine Wren",
        text: "Before you activate, you may perform a %BARRELROLL% or %BOOST% action.%LINEBREAK%<strong>Locked and Loaded:</strong> While you are docked, after your carrier ship performs a primary %FRONTARC% or %TURRET% attack, it may perform a bonus primary %REARARC% attack."
    },
    "Sabine Wren (TIE Fighter)": {
        display_name: "Sabine Wren",
        text: "Before you activate, you may perform a %BARRELROLL% or %BOOST% action."
    },
    "Sabine Wren (Scum)": {
        display_name: "Sabine Wren",
        text: "While you defend, if the attacker is in your %SINGLETURRETARC% at range 0-2, you may add 1&nbsp;%FOCUS% result to your dice results."
    },
    "Saesee Tiin": {
        display_name: "Saesee Tiin",
        text: "After a friendly ship at range 0-2 reveals its dial, you may spend 1 %FORCE%. If you do, set its dial to another maneuver of the same speed and difficulty.%LINEBREAK%<strong>Fine-tuned Controls:</strong> After you fully execute a maneuver, you may spend 1&nbsp;%FORCE% to perform a %BOOST% or %BARRELROLL% action."
    },
    "Sarco Plank": {
        display_name: "Sarco Plank",
        text: "While you defend, you may treat your agility value as equal to the speed of the maneuver you executed this round.%LINEBREAK%<strong>Spacetug Tractor Array:</strong> <strong>Action:</strong> Choose a ship in your %FRONTARC% at range 1. That ship gains 1 tractor token, or 2 tractor tokens if it is in your %BULLSEYEARC% at range 1."
    },
    "Saw Gerrera": {
        display_name: "Saw Gerrera",
        text: "While a damaged friendly ship at range 0-3 performs an attack, it may reroll 1 attack die."
    },
    "Scarif Base Pilot": {
        display_name: "Scarif Base Pilot",
        text: "<i class = flavor_text>The TIE reaper was designed to ferry elite troops to flashpoints on the battlefield, notably carrying Director Krennic’s dreaded death troopers at the Battle of Scarif.</i>%LINEBREAK%<strong>Adaptive Ailerons:</strong> Before you reveal your dial, if you are not stressed, you <b>must</b> execute a white [1&nbsp;%BANKLEFT%], [1&nbsp;%STRAIGHT%], or [1&nbsp;%BANKRIGHT%] maneuver."
    },
    "Scimitar Squadron Pilot": {
        display_name: "Scimitar Squadron Pilot",
        text: "<i class = flavor_text>The TIE/sa is exceptionally nimble for a bomber, allowing it to pinpoint its target while avoiding excessive collateral damage to the surrounding area.</i> %LINEBREAK%<strong>Nimble Bomber:</strong> If you would drop a device using a %STRAIGHT% template, you may use a %BANKLEFT% or %BANKRIGHT% template of the same speed instead."
    },
    "Separatist Bomber": {
        display_name: "Separatist Bomber",
        text: "<i class = flavor_text>The droid armies of the Separatists are callous to the plight of civilians and make no effort to limit collateral damage.</i>%LINEBREAK%<strong>Networked Calculations:</strong> While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range&nbsp;0-1 to change 1&nbsp;%FOCUS% result to an %EVADE% or %HIT% result."
    },
    "Separatist Drone": {
        display_name: "Separatist Drone",
        text: "<i class = flavor_text>As the Clone Wars escalate, the Separatist Alliance continues to develop the technology of droid starfighters, as well as the tactical droids that command them.</i>%LINEBREAK%<strong>Networked Calculations:</strong> While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range&nbsp;0-1 to change 1&nbsp;%FOCUS% result to an %EVADE% or %HIT% result."
    },
    Serissu: {
        display_name: "Serissu",
        text: "While a friendly ship at range 0-1 defends, it may reroll 1 of its dice.%LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1 %CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Seventh Sister": {
        display_name: "Seventh Sister",
        text: "While you perform a primary attack, before the Neutralize Results step, you may spend 2&nbsp;%FORCE% to cancel 1&nbsp;%EVADE% result."
    },
    "Seyn Marana": {
        display_name: "Seyn Marana",
        text: "While you perform an attack, you may spend 1&nbsp;%CRIT% result. If you do, deal 1 facedown damage card to the defender, then cancel your remaining results."
    },
    "Shadowport Hunter": {
        display_name: "Shadowport Hunter",
        text: "<i class = flavor_text>Crime syndicates augment the lethal skills of their loyal contractors with the best technology available, like the fast and formidable Lancer-class pursuit craft.</i>"
    },
    "Shara Bey": {
        display_name: "Shara Bey",
        text: "While you defend or perform a primary attack, you may spend 1 lock you have on the enemy ship to add 1&nbsp;%FOCUS% result to your dice results."
    },
    "Sienar Specialist": {
        display_name: "Sienar Specialist",
        text: "<i class = flavor_text>During the development of the TIE aggressor, Sienar Fleet Systems valued performance and versatility over raw cost efficiency.</i>"
    },
    "Sienar-Jaemus Engineer": {
        display_name: "Sienar-Jaemus Engineer",
        text: "<i class = flavor_text>Developed by Sienar-Jaemus Fleet Systems as a successor to the vaunted TIE Defender, the TIE/vn Silencer incorporates bleeding-edge technologies developed at research facilities hidden in the Unknown Regions.</i>%LINEBREAK%<strong>Autothrusters:</strong> After you perform an action, you may perform a red %BARRELROLL% or red %BOOST% action."
    },
    "Sigma Squadron Ace": {
        display_name: "Sigma Squadron Ace",
        text: "<i class = flavor_text>Featuring a hyperdrive and shields, the TIE phantom is also equipped with five laser cannons, giving it substantial firepower for an Imperial fighter.</i>%LINEBREAK%<strong>Stygium Array:</strong> After you decloak, you may perform an %EVADE% action. At the start of the End Phase, you may spend 1 evade token to gain 1 cloak token."
    },
    "Skakoan Ace": {
        display_name: "Skakoan Ace",
        text: "<i class = flavor_text>With its powerful engines, devastating triple laser cannons, and high customizability, the Belbullab-22 is the chosen craft of several elite Separatist Alliance pilots, including the infamous General Grievous.</i>"
    },
    "Skull Squadron Pilot": {
        display_name: "Skull Squadron Pilot",
        text: "<i class = flavor_text>The aces of Skull Squadron favor an aggressive approach, using their craft’s pivot wing technology to achieve unmatched agility in the pursuit of their quarry.</i> %LINEBREAK% <strong>Concordia Faceoff:</strong> While you defend, if the attack range is 1 and you are in the attacker’s %FRONTARC%, change 1 result to an %EVADE% result."
    },
    "Sol Sixxa": {
        display_name: "Sol Sixxa",
        text: "If you would drop a device using a [1&nbsp;%STRAIGHT%] template, you may drop it using any speed 1 template instead."
    },
    "Soontir Fel": {
        display_name: "Soontir Fel",
        text: "At the start of the Engagement Phase, if there is an enemy ship in your %BULLSEYEARC%, gain 1 focus token.%LINEBREAK%<strong>Autothrusters:</strong> After you perform an action, you may perform a red %BARRELROLL% or red %BOOST% action."
    },
    "Spice Runner": {
        display_name: "Spice Runner",
        text: "<i class = flavor_text>Though its cargo space is limited compared to other light freighters, the small, swift HWK-290 is a favorite choice of smugglers who specialize in discreetly transporting precious goods.</i>"
    },
    "Squad Seven Veteran": {
        display_name: "Squad Seven Veteran",
        text: "<i class = flavor_text>Clone Flight Seven serves as part of the Open Circle Fleet under legendary Jedi Generals such as Plo Koon and Obi-Wan Kenobi, and won glory at the battles of Coruscant and Cato Neimoidia.</i>"
    },
    "Starkiller Base Pilot": {
        display_name: "Starkiller Base Pilot",
        text: "<i class = flavor_text>The Upsilon-class command shuttle serves as a base of operations for many of the First Order's senior officers and agents. Its powerful sensors and communications equipment allow them to orchestrate the spread of terror across the galaxy.</i>%LINEBREAK%<strong>Linked Battery:</strong> While you perform a %CANNON% attack, roll 1 additional die."
    },
    "Storm Squadron Ace": {
        display_name: "Storm Squadron Ace",
        text: "<i class = flavor_text>The TIE Advanced x1 was produced in limited quantities, but Sienar engineers incorporated many of its best qualities into their next TIE model: the TIE Interceptor.</i>%LINEBREAK%<strong>Advanced Targeting Computer:</strong> While you perform a primary attack against a defender you have locked, roll 1 additional attack die and change 1&nbsp;%HIT% result to a %CRIT% result."
    },
    "Sunny Bounder": {
        display_name: "Sunny Bounder",
        text: "While you defend or perform an attack, after you roll or reroll your dice, if you have the same result on each of your dice, you may add 1 matching result.%LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1 %CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "TN-3465": {
        display_name: "TN-3465",
        text: "While another friendly ship performs an attack, if you are at range 0-1 of the defender, you may suffer 1&nbsp;%CRIT% damage to change 1 of the attacker’s results to a %CRIT% result."
    },
    "Tala Squadron Pilot": {
        display_name: "Tala Squadron Pilot",
        text: "<i class = flavor_text>The AF4 series is the latest in a long line of Headhunter designs. Cheap and relatively durable, it is a favorite among independent outfits like the Rebellion.</i>"
    },
    "Tallissan Lintra": {
        display_name: "Tallissan Lintra",
        text: "While an enemy ship in your %BULLSEYEARC% performs an attack, you may spend 1&nbsp;%CHARGE%.  If you do, the defender rolls 1 additional die.%LINEBREAK%<strong>Refined Gyrostabilizers:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. After you perform an action, you may perform a red %BOOST% or red %ROTATEARC% action."
    },
    "Talonbane Cobra": {
        display_name: "Talonbane Cobra",
        text: "While you defend at attack range 3 or perform an attack at attack range 1, roll 1 additional die."
    },
    "Tansarii Point Veteran": {
        display_name: "Tansarii Point Veteran",
        text: "<i class = flavor_text>The defeat of Black Sun ace Talonbane Cobra by Car’das smugglers turned the tide of the Battle of Tansarii Point Station. Survivors of the clash are respected throughout the sector.</i> %LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1 %CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Techno Union Bomber": {
        display_name: "Techno Union Bomber",
        text: "<i class = flavor_text>Baktoid Armor Workshop developed the Hyena as a strike craft compatible with Trade Federation Vulture swarm tactics.</i>%LINEBREAK%<strong>Networked Calculations:</strong> While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range&nbsp;0-1 to change 1&nbsp;%FOCUS% result to an %EVADE% or %HIT% result."
    },
    "Tel Trevura": {
        display_name: "Tel Trevura",
        text: "If you would be destroyed, you may spend 1&nbsp;%CHARGE%. If you do, discard all of your damage cards, suffer 5&nbsp;%HIT% damage, and place yourself in reserves instead. At the start of the next Planning Phase, place yourself within range 1 of your player edge."
    },
    "Temmin Wexley": {
        display_name: "Temmin Wexley",
        text: "After you fully execute a speed 2-4 maneuver, you may perform a %BOOST% action.%LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1&nbsp;%CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Tempest Squadron Pilot": {
        display_name: "Tempest Squadron Pilot",
        text: "<i class = flavor_text>The TIE Advanced improved on the popular TIE/ln design by adding shielding, better weapons systems, curved solar panels, and a hyperdrive.</i>%LINEBREAK%<strong>Advanced Targeting Computer:</strong> While you perform a primary attack against a defender you have locked, roll 1 additional attack die and change 1&nbsp;%HIT% result to a %CRIT% result."
    },
    "Ten Numb": {
        display_name: "Ten Numb",
        text: "While you defend or perform an attack, you may spend 1 stress token to change all of your %FOCUS% results to %EVADE% or %HIT% results."
    },
    "Thane Kyrell": {
        display_name: "Thane Kyrell",
        text: "While you perform an attack, you may spend 1&nbsp;%FOCUS%, %HIT%, or %CRIT% result to look at the defender’s facedown damage cards, choose 1, and expose it."
    },
    "Tomax Bren": {
        display_name: "Tomax Bren",
        text: "After you perform a %RELOAD% action, you may recover 1&nbsp;%CHARGE% token on 1 of your equipped %TALENT% upgrade cards. %LINEBREAK%<strong>Nimble Bomber:</strong> If you would drop a device using a %STRAIGHT% template, you may use a %BANKLEFT% or %BANKRIGHT% template of the same speed instead."
    },
    "Torani Kulda": {
        display_name: "Torani Kulda",
        text: "After you perform an attack, each enemy ship in your %BULLSEYEARC% suffers 1&nbsp;%HIT% damage unless it removes 1 green token.%LINEBREAK%<strong>Dead to Rights:</strong> While you perform an attack, if the defender is in your %BULLSEYEARC%, defense dice cannot be modified using green tokens."
    },
    "Torkil Mux": {
        display_name: "Torkil Mux",
        text: "At the start of the Engagement Phase, you may choose 1 ship in your firing arc. If you do, that ship engages at initiative 0 instead of its normal initiative value this round."
    },
    "Trade Federation Drone": {
        display_name: "Trade Federation Drone",
        text: "<i class = flavor_text>The Trade Federation deployed countless Vulture Droids at the Battle of Naboo, and continues to use these inexpensive starfighters in the Clone Wars.</i>%LINEBREAK%<strong>Networked Calculations:</strong> While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range&nbsp;0-1 to change 1&nbsp;%FOCUS% result to an %EVADE% or %HIT% result."
    },
    "Trandoshan Slaver": {
        display_name: "Trandoshan Slaver",
        text: "<i class = flavor_text>The spacious triple-decker design of the YV-666 makes it popular among bounty hunters and slavers, who often retrofit an entire deck for prisoner transport.</i>"
    },
    "Turr Phennir": {
        display_name: "Turr Phennir",
        text: "After you perform an attack, you may perform a %BARRELROLL% or %BOOST% action, even if you are stressed.%LINEBREAK%<strong>Autothrusters:</strong> After you perform an action, you may perform a red %BARRELROLL% or red %BOOST% action."
    },
    "Unkar Plutt": {
        display_name: "Unkar Plutt",
        text: "At the start of the Engagement Phase, if there are one or more other ships at range 0, you and each other ship at range 0 gain 1 tractor token.%LINEBREAK%<strong>Spacetug Tractor Array:</strong> <strong>Action:</strong> Choose a ship in your %FRONTARC% at range 1. That ship gains 1 tractor token, or 2 tractor tokens if it is in your %BULLSEYEARC% at range 1."
    },
    "Valen Rudor": {
        display_name: "Valen Rudor",
        text: "After a friendly ship at range 0-1 defends (after damage is resolved, if any), you may perform an action."
    },
    "Ved Foslo": {
        display_name: "Ved Foslo",
        text: "While you execute a maneuver, you may execute a maneuver of the same bearing and difficulty of a speed 1 higher or lower instead.%LINEBREAK%<strong>Advanced Targeting Computer:</strong> While you perform a primary attack against a defender you have locked, roll 1 additional attack die and change 1&nbsp;%HIT% result to a %CRIT% result."
    },
    Vennie: {
        display_name: "Vennie",
        text: "While you defend, if the attacker is in a friendly ship’s %SINGLETURRETARC%, you may add 1 %FOCUS% result to your roll."
    },
    "Viktor Hel": {
        display_name: "Viktor Hel",
        text: "After you defend, if you did not roll exactly 2 defense dice, the attacker gains 1 stress token."
    },
    "Warden Squadron Pilot": {
        display_name: "Warden Squadron Pilot",
        text: "<i class = flavor_text>Koensayr Manufacturing’s K-wing boasts an advanced SubLight Acceleration Motor and an unprecedented 18 hard points, granting it unrivaled speed and firepower.</i>"
    },
    "Wat Tambor": {
        display_name: "Wat Tambor",
        text: "While you perform a primary attack, you may reroll 1 attack die for each calculating friendly ship at range&nbsp;1 of the defender."
    },
    "Wedge Antilles": {
        display_name: "Wedge Antilles",
        text: "While you perform an attack, the defender rolls 1 fewer defense die."
    },
    "Wild Space Fringer": {
        display_name: "Wild Space Fringer",
        text: "<i class = flavor_text>Although stock YT-2400 light freighters have plenty of room for cargo, that space is often annexed to support modified weapon systems and oversized engines.</i>%LINEBREAK%<strong>Sensor Blindspot:</strong> While you perform a primary attack at attack range 0-1, do not apply the range 0-1 bonus and roll 1 fewer attack die."
    },
    Wullffwarro: {
        display_name: "Wullffwarro",
        text: "While you perform a primary attack, if you are damaged, you may roll 1 additional attack die."
    },
    "Zari Bangel": {
        display_name: "Zari Bangel",
        text: "You do not skip your Perform Action step after you partially execute a maneuver.%LINEBREAK%<strong>Refined Gyrostabilizers:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. After you perform an action, you may perform a red %BOOST% or red %ROTATEARC% action."
    },
    "Zealous Recruit": {
        display_name: "Zealous Recruit",
        text: "<i class = flavor_text>Mandalorian Fang fighter pilots must master the Concordia Faceoff maneuver, leveraging their ships’ narrow attack profile to execute deadly head-on charges.</i> %LINEBREAK% <strong>Concordia Faceoff:</strong> While you defend, if the attack range is 1 and you are in the attacker’s %FRONTARC%, change 1 result to an %EVADE% result."
    },
    "Zertik Strom": {
        display_name: "Zertik Strom",
        text: "During the End Phase, you may spend a lock you have on an enemy ship to expose 1 of that ship’s damage cards.%LINEBREAK%<strong>Advanced Targeting Computer:</strong> While you perform a primary attack against a defender you have locked, roll 1 additional attack die and change 1&nbsp;%HIT% result to a %CRIT% result."
    },
    "Zeta Squadron Pilot": {
        display_name: "Zeta Squadron Pilot",
        text: "<i class = flavor_text>Unhampered by a cumbersome galactic bureaucracy, technologies originally researched by the Empire’s TIE Advanced program are now mass-produced on First Order starfighters. As a result, TIE/fo pilots enjoy higher survival rates than their predecessors in the Galactic Empire.</i>"
    },
    "Zeta Squadron Survivor": {
        display_name: "Zeta Squadron Survivor",
        text: "<i class = flavor_text>Humiliated by their failure, the remaining pilots from Starkiller Base are eager to prove their worth in pursuit of the Resistance.</i>%LINEBREAK%<strong>Heavy Weapon Turret:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. You <b>must</b> treat the %FRONTARC% requirement of your equipped %MISSILE% upgrades as %SINGLETURRETARC%."
    },
    Zuckuss: {
        display_name: "Zuckuss",
        text: "While you perform a primary attack, you may roll 1 additional attack die. If you do, the defender rolls 1 additional defense die."
    },
    '"Avenger"': {
        display_name: "“Avenger”",
        text: "After another friendly ship is destroyed, you may perform an action, even while stressed.%LINEBREAK%<strong>Autothrusters:</strong> After you perform an action, you may perform a red %BARRELROLL% or red %BOOST% action."
    },
    '"Axe"': {
        display_name: "“Axe”",
        text: "After you defend or perform an attack, you may choose a friendly ship at range&nbsp;1-2 in your %LEFTARC%  or %RIGHTARC%. If you do, transfer 1 green token to that ship."
    },
    '"Backdraft"': {
        display_name: "“Backdraft”",
        text: "While you perform a %SINGLETURRETARC% primary attack, if the defender is in your %REARARC%, roll 1 additional die.%LINEBREAK%<strong>Heavy Weapon Turret:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. You <b>must</b> treat the %FRONTARC% requirement of your equipped %MISSILE% upgrades as %SINGLETURRETARC%."
    },
    '"Blackout"': {
        display_name: "“Blackout”",
        text: "While you perform an attack, if the attack is obstructed by an obstacle, the defender rolls 2 fewer defense dice.%LINEBREAK%<strong>Autothrusters:</strong> After you perform an action, you may perform a red %BARRELROLL% or red %BOOST% action."
    },
    '"Chopper"': {
        display_name: "“Chopper”",
        text: "At the start of the Engagement Phase, each enemy ship at range 0 gains 2 jam tokens. %LINEBREAK%<strong>Tail Gun:</strong> While you have a docked ship, you have a primary %REARARC% weapon with an attack value equal to your docked ship’s primary %FRONTARC% attack value."
    },
    '"Countdown"': {
        display_name: "“Countdown”",
        text: "While you defend, after the Neutralize Results step, if you are not stressed, you may suffer 1&nbsp;%HIT% damage and gain 1 stress token. If you do, cancel all dice results.%LINEBREAK%<strong>Adaptive Ailerons:</strong> Before you reveal your dial, if you are not stressed, you <b>must</b> execute a white [1&nbsp;%BANKLEFT%], [1&nbsp;%STRAIGHT%], or [1&nbsp;%BANKRIGHT%] maneuver."
    },
    '"Deathfire"': {
        display_name: "“Deathfire”",
        text: "After you are destroyed, before you are removed, you may perform an attack and drop or launch 1 device.%LINEBREAK%<strong>Nimble Bomber:</strong> If you would drop a device using a %STRAIGHT% template, you may use a %BANKLEFT% or %BANKRIGHT% template of the same speed instead."
    },
    '"Deathrain"': {
        display_name: "“Deathrain”",
        text: "After you drop or launch a device, you may perform an action."
    },
    '"Double Edge"': {
        display_name: "“Double Edge”",
        text: "After you perform a %TURRET% or %MISSILE% attack that misses, you may perform a bonus attack using a different weapon."
    },
    '"Duchess"': {
        display_name: "“Duchess”",
        text: "You may choose not to use your <strong>Adaptive Ailerons</strong>. %LINEBREAK%You may use your <strong>Adaptive Ailerons</strong> even while stressed.%LINEBREAK%<strong>Adaptive Ailerons:</strong> Before you reveal your dial, if you are not stressed, you <b>must</b> execute a white [1&nbsp;%BANKLEFT%], [1&nbsp;%STRAIGHT%], or [1&nbsp;%BANKRIGHT%] maneuver."
    },
    '"Dutch" Vander': {
        display_name: "“Dutch” Vander",
        text: "After you perform the %LOCK% action, you may choose 1 friendly ship at range 1-3. That ship may acquire a lock on the object you locked, ignoring range restrictions."
    },
    '"Echo"': {
        display_name: "“Echo”",
        text: "While you decloak, you <b>must</b> use the [2&nbsp;%BANKLEFT%] or [2&nbsp;%BANKRIGHT%] template instead of the [2&nbsp;%STRAIGHT%] template.%LINEBREAK%<strong>Stygium Array:</strong> After you decloak, you may perform an %EVADE% action. At the start of the End Phase, you may spend 1 evade token to gain 1 cloak token."
    },
    '"Howlrunner"': {
        display_name: "“Howlrunner”",
        text: "While a friendly ship at range 0-1 performs a primary attack, that ship may reroll 1 attack die."
    },
    '"Jag"': {
        display_name: "“Jag”",
        text: "After a friendly ship at range&nbsp;1-2 in your %LEFTARC%  or %RIGHTARC%  defends, you may acquire a lock on the attacker."
    },
    '"Kickback"': {
        display_name: "“Kickback”",
        text: "After you perform a %BARRELROLL% action, you may perform a red %LOCK% action."
    },
    '"Leebo"': {
        display_name: "“Leebo”",
        text: "After you defend or perform an attack, if you spent a calculate token, gain 1 calculate token.%LINEBREAK%<strong>Sensor Blindspot:</strong> While you perform a primary attack at attack range 0-1, do not apply the range 0-1 bonus and roll 1 fewer attack die."
    },
    '"Longshot"': {
        display_name: "“Longshot”",
        text: "While you perform a primary attack at attack range 3, roll 1 additional attack die."
    },
    '"Mauler" Mithel': {
        display_name: "“Mauler” Mithel",
        text: "While you perform an attack at attack range 1, roll 1 additional attack die."
    },
    '"Midnight"': {
        display_name: "“Midnight”",
        text: "While you defend or perform an attack, if you have a lock on the enemy ship, that ship’s dice cannot be modified."
    },
    '"Muse"': {
        display_name: "“Muse”",
        text: "At the start of the Engagement Phase, you may choose a friendly ship at range&nbsp;0-1. If you do, that ship removes 1&nbsp;stress token."
    },
    '"Night Beast"': {
        display_name: "“Night Beast”",
        text: "After you fully execute a blue maneuver, you may perform a %FOCUS% action."
    },
    '"Null"': {
        display_name: "“Null”",
        text: "While you are not damaged, treat your initiative value as 7."
    },
    '"Odd Ball"': {
        display_name: "“Odd Ball”",
        text: "After you fully execute a red maneuver or perform a red action, if there is an enemy ship in your %BULLSEYEARC%, you may acquire a lock on that ship."
    },
    '"Odd Ball" (ARC-170)': {
        display_name: "“Odd Ball”",
        text: "After you fully execute a red maneuver or perform a red action, if there is an enemy ship in your %BULLSEYEARC%, you may acquire a lock on that ship."
    },
    '"Pure Sabacc"': {
        display_name: "“Pure Sabacc”",
        text: "While you perform an attack, if you have 1 or fewer damage cards, you may roll 1 additional attack die.%LINEBREAK%<strong>Adaptive Ailerons:</strong> Before you reveal your dial, if you are not stressed, you <b>must</b> execute a white [1&nbsp;%BANKLEFT%], [1&nbsp;%STRAIGHT%], or [1&nbsp;%BANKRIGHT%] maneuver."
    },
    '"Quickdraw"': {
        display_name: "“Quickdraw”",
        text: "After you lose a shield, you may spend 1&nbsp;%CHARGE%. If you do, you may perform a bonus primary attack.%LINEBREAK%<strong>Heavy Weapon Turret:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. You <b>must</b> treat the %FRONTARC% requirement of your equipped %MISSILE% upgrades as %SINGLETURRETARC%."
    },
    '"Recoil"': {
        display_name: "“Recoil”",
        text: "While you are stressed, you may treat enemy ships in your %FRONTARC% at range 0-1 as being in your %BULLSEYEARC%.%LINEBREAK%<strong>Autothrusters:</strong> After you perform an action, you may perform a red %BARRELROLL% or red %BOOST% action."
    },
    '"Redline"': {
        display_name: "“Redline”",
        text: "You can maintain up to 2 locks. %LINEBREAK%After you perform an action, you may acquire a lock."
    },
    '"Scorch"': {
        display_name: "“Scorch”",
        text: "While you perform a primary attack, if you are not stressed, you may gain 1 stress token to roll 1 additional attack die."
    },
    '"Scourge" Skutu': {
        display_name: "“Scourge” Skutu",
        text: "While you perform an attack against a defender in your %BULLSEYEARC%, roll 1 additional attack die."
    },
    '"Sinker"': {
        display_name: "“Sinker”",
        text: "While a friendly ship at range&nbsp;1-2 in your %LEFTARC% or %RIGHTARC% performs a primary attack, it may reroll 1&nbsp;attack die."
    },
    '"Static"': {
        display_name: "“Static”",
        text: "While you perform a primary attack, you may spend your lock on the defender and a focus token to change all of your results to %CRIT% results."
    },
    '"Swoop"': {
        display_name: "“Swoop”",
        text: "After a friendly small or medium ship fully executes a speed 3-4 maneuver, if it is at range&nbsp;0-1, it may perform a red %BOOST% action."
    },
    '"Tucker"': {
        display_name: "“Tucker”",
        text: "After a friendly ship at range&nbsp;1-2 performs an attack against an enemy ship in your %FRONTARC%, you may perform a %FOCUS%&nbsp;action."
    },
    '"Vizier"': {
        display_name: "“Vizier”",
        text: "After you fully execute a speed 1 maneuver using your <strong>Adaptive Ailerons</strong> ship ability, you may perform a %COORDINATE% action. If you do, skip your Perform Action step.%LINEBREAK%<strong>Adaptive Ailerons:</strong> Before you reveal your dial, if you are not stressed, you <b>must</b> execute a white [1&nbsp;%BANKLEFT%], [1&nbsp;%STRAIGHT%], or [1&nbsp;%BANKRIGHT%] maneuver."
    },
    '"Wampa"': {
        display_name: "“Wampa”",
        text: "While you perform an attack, you may spend 1&nbsp;%CHARGE% to roll 1 additional attack die.%LINEBREAK%After defending, lose 1&nbsp;%CHARGE%."
    },
    '"Whisper"': {
        display_name: "“Whisper”",
        text: "After you perform an attack that hits, gain 1 evade token.%LINEBREAK%<strong>Stygium Array:</strong> After you decloak, you may perform an %EVADE% action. At the start of the End Phase, you may spend 1 evade token to gain 1 cloak token."
    },
    '"Wolffe"': {
        display_name: "“Wolffe”",
        text: "While you perform a primary %FRONTARC% attack, you may spend 1 %CHARGE% to reroll 1&nbsp;attack die. %LINEBREAK%While you perform a primary %REARARC% attack, you may recover 1&nbsp;%CHARGE% to roll 1&nbsp;additional attack die. "
    },
    '"Zeb" Orrelios': {
        display_name: "“Zeb” Orrelios",
        text: "While you defend, %CRIT% results are neutralized before %HIT% results.%LINEBREAK%<strong>Locked and Loaded:</strong> While you are docked, after your carrier ship performs a primary %FRONTARC% or %TURRET% attack, it may perform a bonus primary %REARARC% attack."
    },
    '"Zeb" Orrelios (Sheathipede)': {
        display_name: "“Zeb” Orrelios",
        text: "While you defend, %CRIT% results are neutralized before %HIT% results.%LINEBREAK%<strong>Comms Shuttle:</strong> While you are docked, your carrier ship gains %COORDINATE%. Before your carrier ship activates, it may perform a %COORDINATE% action."
    },
    '"Zeb" Orrelios (TIE Fighter)': {
        display_name: "“Zeb” Orrelios",
        text: "While you defend, %CRIT% results are neutralized before %HIT% results."
    },
    "Bombardment Drone": {
        text: "If you would drop a device, you may launch that device instead, using the same template. %LINEBREAK% NETWORKED CALCULATIONS: While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range 0-1 to change 1 %FOCUS% result to an %EVADE% or %HIT% result."
    },
    "Haor Chall Prototype": {
        display_name: "Haor Chall Prototype",
        text: "After an enemy ship in your %BULLSEYEARC% at range&nbsp;0-2 declares another friendly ship as the defender, you may perform a %CALCULATE% or %LOCK% action.%LINEBREAK%<strong>Networked Calculations:</strong> While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range&nbsp;0-1 to change 1&nbsp;%FOCUS% result to an %EVADE% or %HIT% result."
    },
    "Precise Hunter": {
        display_name: "Precise Hunter",
        text: "While you perform an attack, if the defender is in your %BULLSEYEARC%, you may reroll 1&nbsp;blank result.%LINEBREAK%<strong>Networked Calculations:</strong> While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range&nbsp;0-1 to change 1&nbsp;%FOCUS% result to an %EVADE% or %HIT% result."
    },
    "Rose Tico": {
        display_name: "Rose Tico",
        text: "While you defend or perform an attack, you may reroll up to 1 of your results for each other friendly ship in the attack arc."
    },
    "Pammich Nerro Goode": {
        display_name: "Pammich Nerro Goode",
        text: "While you have 2 or fewer stress tokens, you may execute red maneuvers even while stressed."
    },
    "Padmé Amidala": {
        display_name: "Padmé Amidala",
        text: "While an enemy ship in your %FRONTARC% defends or performs an attack, that ship can modify only 1 %FOCUS% result (other results can still be modified). %LINEBREAK%<strong>Full Throttle:</strong> After you fully execute a speed 3-5 maneuver, you may perform an %EVADE% action."
    },
    "Anakin Skywalker (N-1 Starfighter)": {
        display_name: "Anakin Skywalker",
        text: "Before you reveal your maneuver, you may spend 1 %FORCE% to barrel roll (this is not an action). %LINEBREAK%<strong>Full Throttle:</strong> After you fully execute a speed 3-5 maneuver, you may perform an %EVADE% action."
    },
    "Ric Olié": {
        display_name: "Ric Olié",
        text: "While you defend or perform a primary attack, if the speed of your revealed maneuver is higher than the enemy ship's, roll 1 additional die. %LINEBREAK%<strong>Full Throttle:</strong> After you fully execute a speed 3-5 maneuver, you may perform an %EVADE% action."
    },
    "Dineé Ellberger": {
        display_name: "Dineé Ellberger",
        text: "While you defend or perform an attack, if the speed of your revealed maneuver is the same as the enemy ship's, that ship's dice cannot be modified. %LINEBREAK%<strong>Full Throttle:</strong> After you fully execute a speed 3-5 maneuver, you may perform an %EVADE% action."
    },
    "Naboo Handmaiden": {
        display_name: "Naboo Handmaiden",
        text: "<strong>Setup:</strong> After placing forces, assign the <strong>Decoyed</strong> condition to 1 friendly ship other than <strong>Naboo Handmaiden</strong>. %LINEBREAK%<strong>Full Throttle:</strong> After you fully execute a speed 3-5 maneuver, you may perform an %EVADE% action."
    },
    "Bravo Flight Officer": {
        display_name: "Bravo Flight Officer",
        text: "<strong>Full Throttle:</strong> After you fully execute a speed 3-5 maneuver, you may perform an %EVADE% action."
    },
    "BB-8": {
        display_name: "BB-8",
        text: "During the System Phase, you may perform a red %BARRELROLL% or %BOOST% action."
    },
    Finn: {
        display_name: "Finn",
        text: "While you defend or perform an attack, you may add 1 blank result, or you may gain 1 strain token to add 1 focus result instead."
    },
    "Cova Nell": {
        display_name: "Cova Nell",
        text: "While you defend or perform a primary attack, if your revealed maneuver is red, roll 1 additional die."
    },
    "Nodin Chavdri": {
        display_name: "Nodin Chavdri",
        text: "After you coordinate or are coordinated, if you have 2 or fewer stress tokens, you may perform 1 action on your action bar as a red action, even if you are stressed."
    },
    "Vi Moradi": {
        display_name: "Vi Moradi",
        text: "<strong>Setup:</strong> After placing forces, assign the <strong>Compromising Intel</strong> condition to 1 enemy ship."
    },
    "Shadow Squadron Veteran": {
        text: "<strong>Plated Hull:</strong> While you defend, if you are not critically damaged, change 1 %CRIT% to a %HIT% result."
    },
    "Red Squadron Bomber": {
        text: "<strong>Plated Hull:</strong> While you defend, if you are not critically damaged, change 1 %CRIT% to a %HIT% result."
    },
    '"Goji"': {
        text: 'While a friendly ship at range 0-3 defends, it may roll 1 additional defense die for each friendly bomb at 0-1 of it. %LINEBREAK%<strong>Plated Hull:</strong> While you defend, if you are not critically damaged, change 1 %CRIT% to a %HIT% result. %LINEBREAK% <i>Errata (since rules reference 1.1.0): Removed "or mine"</i>'
    },
    '"Broadside"': {
        text: "While you perform a %SINGLETURRETARC% attack, if your %SINGLETURRETARC% indicator is in your %LEFTARC% or %RIGHTARC%, you may change 1 blank result to a %FOCUS% result. %LINEBREAK%<strong>Plated Hull:</strong> While you defend, if you are not critically damaged, change 1 %CRIT% to a %HIT% result."
    },
    '"Matchstick"': {
        text: "While you perform a primary or %SINGLETURRETARC% attack, you may reroll 1 attack die for each red token you have. %LINEBREAK%<strong>Plated Hull:</strong> While you defend, if you are not critically damaged, change 1 %CRIT% to a %HIT% result."
    },
    '"Odd Ball" (Y-Wing)': {
        text: "After you execute a red maneuver or perform a red action, if there is an enemy ship in your %BULLSEYEARC%, you may acquire a lock on that ship. %LINEBREAK%<strong>Plated Hull:</strong> While you defend, if you are not critically damaged, change 1 %CRIT% to a %HIT% result."
    },
    "R2-D2": {
        text: "At the start of the Engagement Phase, if there is an enemy ship in your %REARARC%, gain 1 calculate token.%LINEBREAK%<strong>Plated Hull:</strong> While you defend, if you are not critically damaged, change 1 %CRIT% to a %HIT% result."
    },
    "Anakin Skywalker (Y-Wing)": {
        text: "After you fully execute a maneuver, if there is an enemy ship in your %FRONTARC% at range 0-1 or in your %BULLSEYEARC%, you may spend 1 %FORCE% to remove 1 stress token.%LINEBREAK%<strong>Plated Hull:</strong> While you defend, if you are not critically damaged, change 1 %CRIT% to a %HIT% result."
    },
    "Sun Fac": {
        text: "While you perform a primary attack, if the defender is tractored, roll 1 additional attack die. %LINEBREAK% <strong>Pinpoint Tractor Array:</strong> You cannot rotate your %SINGLETURRETARC% to your %REARARC%. After you execute a maneuver, you may gain 1 tractor token to perform a %ROTATEARC% action."
    },
    "Stalgasin Hive Guard": {
        text: "<strong>Pinpoint Tractor Array:</strong> You cannot rotate your %SINGLETURRETARC% to your %REARARC%. After you execute a maneuver, you may gain 1 tractor token to perform a %ROTATEARC% action."
    },
    "Petranaki Arena Ace": {
        text: "<strong>Pinpoint Tractor Array:</strong> You cannot rotate your %SINGLETURRETARC% to your %REARARC%. After you execute a maneuver, you may gain 1 tractor token to perform a %ROTATEARC% action."
    },
    "Berwer Kret": {
        text: "After you perform an attack that hits, each friendly ship with %CALCULATE% on its action bar and a lock on the defender may perform a red %CALCULATE% action. %LINEBREAK%<strong>Pinpoint Tractor Array:</strong> You cannot rotate your %SINGLETURRETARC% to your %REARARC%. After you execute a maneuver, you may gain 1 tractor token to perform a %ROTATEARC% action."
    },
    Chertek: {
        text: "While you perform a primary attack, if the defender is tractored, you may reroll up to 2 attack dice. %LINEBREAK%<strong>Pinpoint Tractor Array:</strong> You cannot rotate your %SINGLETURRETARC% to your %REARARC%. After you execute a maneuver, you may gain 1 tractor token to perform a %ROTATEARC% action."
    },
    Gorgol: {
        text: "During the System Phase, you may gain 1 disarm token and choose a friendly ship at range 1-2. If you do, it gains 1 tractor token, then repairs 1 of its faceup <strong>Ship</strong> trait damage cards. %LINEBREAK%<strong>Pinpoint Tractor Array:</strong> You cannot rotate your %SINGLETURRETARC% to your %REARARC%. After you execute a maneuver, you may gain 1 tractor token to perform a %ROTATEARC% action."
    },
    "Kazuda Xiono": {
        text: "While you defend or perform a primary attack, if the enemy ship's initiative is higher than the number of damage cards you have, you may roll 1 additional die. %LINEBREAK%<strong>Explosion with Wings:</strong> You are dealt 1 facedown damage card. After you perform a %SLAM% action, you may expose 1 damage card to remove 1 disarm token."
    },
    "Major Vonreg": {
        text: "During the System Phase, you may choose 1 enemy ship in your %BULLSEYEARC%. That ship gains 1 deplete or strain token of your choice. %LINEBREAK%<strong>Fine-Tuned Thrusters:</strong> After you fully execute a maneuver, if you are not depleted or strained, you may gain 1 deplete or strain token to perform a %LOCK% or %BARRELROLL% action."
    },
    "First Order Provocateur": {
        text: "<strong>Fine-Tuned Thrusters:</strong> After you fully execute a maneuver, if you are not depleted or strained, you may gain 1 deplete or strain token to perform a %LOCK% or %BARRELROLL% action."
    },
    '"Ember"': {
        text: "While you perform an attack, if there is a damaged ship friendly to the defender at range 0-1 of the defender, the defender cannot spend focus or calculate tokens. %LINEBREAK%<strong>Fine-Tuned Thrusters:</strong> After you fully execute a maneuver, if you are not depleted or strained, you may gain 1 deplete or strain token to perform a %LOCK% or %BARRELROLL% action."
    },
    '"Holo"': {
        text: "At the start of the Engagement Phase, you <b>must</b> transfer 1 of your tokens to another friendly ship at range 0-2. %LINEBREAK%<strong>Fine-Tuned Thrusters:</strong> After you fully execute a maneuver, if you are not depleted or strained, you may gain 1 deplete or strain token to perform a %LOCK% or %BARRELROLL% action."
    },
    "Captain Phasma": {
        text: "While you defend, after the Neutralize Results step, another friendly ship at range 0-1 <b>must</b> suffer 1 %HIT%/%CRIT% damage to cancel 1 matching result. %LINEBREAK%<strong>Heavy Weapon Turret:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. You <b>must</b> treat the %FRONTARC% requirement of your equipped %MISSILE% upgrades as %SINGLETURRETARC%."
    },
    '"Rush"': {
        text: "While you are damaged, treat your initiative as 6. %LINEBREAK%<strong>Autothrusters:</strong> After you perform an action, you may perform a red %BARRELROLL% or red %BOOST% action."
    },
    "Zizi Tlo": {
        text: "After you defend or perform an attack, you may spend 1 %CHARGE% to gain 1 focus or evade token. %LINEBREAK%<strong>Refined Gyrostabilizers:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. After you perform an action, you may perform a red %BOOST% or red %ROTATEARC% action."
    },
    "Ronith Blario": {
        text: "While you defend or perform an attack, if the enemy ship is in another friendly ship's %SINGLETURRETARC%, you may spend 1 focus token from that friendly ship to change 1 of your %FOCUS% results to an %EVADE% or %HIT% result. %LINEBREAK%<strong>Refined Gyrostabilizers:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. After you perform an action, you may perform a red %BOOST% or red %ROTATEARC% action."
    },
    "Gina Moonsong": {
        text: "At the start of the Engagement Phase, you <b>must</b> transfer 1 of your stress tokens to another friendly ship at range 0-2."
    },
    "K-2SO": {
        text: "After you gain a stress token, gain 1 calculate token."
    },
    "Alexsandr Kallus": {
        text: "While you defend, if the attacker modified any attack dice, you may roll 1 additional defense die. %LINEBREAK%<strong>Tail Gun:</strong> While you have a docked ship, you have a primary %REARARC% weapon with an attack value equal to your docked ship’s primary %FRONTARC% attack value. <br><i>Errata (since rules reference 1.2.0): Added missing ship ability"
    },
    "Leia Organa": {
        text: "After a friendly ship fully executes a red maneuver, if it is at range 0-3, you may spend 1 %FORCE%. If you do, that ship gains 1 focus token or recovers 1 %FORCE%."
    },
    "Paige Tico": {
        text: "After you drop a device, you may spend 1 %CHARGE% to drop an additional device."
    },
    "Fifth Brother": {
        text: "While you perform an attack, after the Neutralize Results step, if the attack hit, you may spend 2 %FORCE% to add 1 %CRIT% result."
    },
    '"Vagabond"': {
        text: "After you fully execute a maneuver using your <strong>Adaptive Ailerons</strong>, if you are not stressed you may drop 1 device. %LINEBREAK%<strong>Adaptive Ailerons:</strong> Before you reveal your dial, if you are not stressed, you <b>must</b> execute a white [1&nbsp;%BANKLEFT%], [1&nbsp;%STRAIGHT%], or [1&nbsp;%BANKRIGHT%] maneuver."
    },
    "Morna Kee": {
        text: "During the End Phase, you may spend 1 %CHARGE% to flip 1 of your reinforce tokens to the other full arc instead of removing it."
    },
    "Lieutenant LeHuse": {
        text: "While you perform an attack, you may spend another friendly ship's lock on the defender to reroll any number of your results. %LINEBREAK%<strong>Heavy Weapon Turret:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. You <b>must</b> treat the %FRONTARC% requirement of your equipped %MISSILE% upgrades as %SINGLETURRETARC%."
    },
    "Bossk (Z-95 Headhunter)": {
        display_name: "Bossk",
        text: "While you perform a primary attack, after the Neutralize Results step, you may spend 1 %CRIT% result to add 2 %HIT% results. %LINEBREAK%<strong>Pursuit Craft:</strong> After you deploy, you may acquire a lock on a ship the friendly <strong>Hound's Tooth</strong> has locked."
    },
    "G4R-GOR V/M": {
        text: "After you defend, each other ship at range 0 suffers 1 %CRIT% damage. %LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1&nbsp;%CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Nom Lumb": {
        text: "After you become the defender, if the attacker is not in your %SINGLETURRETARC%, you <b>must</b> rotate your %SINGLETURRETARC% indicator to a standard arc the attacker is in."
    },
    "Jarek Yeager": {
        text: "While you have 2 or fewer stress tokens, if you are damaged, you can execute red basic maneuvers even while stressed. If you are critically damaged, you can execute red advanced maneuvers even while stressed. %LINEBREAK%<strong>Explosion with Wings:</strong> You are dealt 1 facedown damage card. After you perform a %SLAM% action, you may expose 1 damage card to remove 1 disarm token."
    },
    "R1-J5": {
        text: "Before you expose 1 of your damage cards, you may look at your facedown damage cards, choose 1 and expose that card instead. %LINEBREAK%<strong>Explosion with Wings:</strong> You are dealt 1 facedown damage card. After you perform a %SLAM% action, you may expose 1 damage card to remove 1 disarm token."
    },
    "Colossus Station Mechanic": {
        text: "<strong>Explosion with Wings:</strong> You are dealt 1 facedown damage card. After you perform a %SLAM% action, you may expose 1 damage card to remove 1 disarm token."
    },
    "212th Battalion Pilot": {
        text: "<strong>Fire Convergence:</strong> While a friendly ship performs a non-%SINGLETURRETARC% attack, if the defender is in your turret arc you may spend 1 charge token, if you do the attacker may reroll up to 2 results."
    },
    '"Hawk"': {
        text: "At the start of the End Phase, each friendly ship at range 0-1 that has a revealed maneuver of speed 3-5 may gain 1 strain token to perform a %BARRELROLL% or %BOOST% action. %LINEBREAK%<strong>Fire Convergence:</strong> While a friendly ship performs a non-%SINGLETURRETARC% attack, if the defender is in your turret arc you may spend 1 charge token, if you do the attacker may reroll up to 2 results."
    },
    '"Hound"': {
        text: "After a friendly small ship in your %SINGLETURRETARC% gains a deplete or strain token, if you have no tokens of that type, you may transfer that token to yourself. %LINEBREAK%<strong>Fire Convergence:</strong> While a friendly ship performs a non-%SINGLETURRETARC% attack, if the defender is in your turret arc you may spend 1 charge token, if you do the attacker may reroll up to 2 results."
    },
    '"Warthog"': {
        text: "After you or a friendly non-limited ship at range 0-2 are destroyed during the Engagement Phase, that ship is not removed until the end of that phase. %LINEBREAK%<strong>Fire Convergence:</strong> While a friendly ship performs a non-%SINGLETURRETARC% attack, if the defender is in your turret arc you may spend 1 charge token, if you do the attacker may reroll up to 2 results."
    },
    "Baktoid Drone": {
        text: "%LINEBREAK%<strong>Networked Aim:</strong> You cannot spend your locks to reroll attack dice. While you perform an attack, you may reroll a number of attack dice up to the number of friendly locks on the defender."
    },
    "Separatist Predator": {
        text: "%LINEBREAK%<strong>Networked Aim:</strong> You cannot spend your locks to reroll attack dice. While you perform an attack, you may reroll a number of attack dice up to the number of friendly locks on the defender."
    },
    "DGS-286": {
        text: "Before you engage, you may choose another friendly ship at range 0-1. That ship transfers 1 calculate token to you. %LINEBREAK%<strong>Networked Aim:</strong> You cannot spend your locks to reroll attack dice. While you perform an attack, you may reroll a number of attack dice up to the number of friendly locks on the defender."
    },
    "DGS-047": {
        text: "After you perform an attack, if the defender is in your %FRONTARC%, you may acquire a lock on it. Then, if the defender is in your %BULLSEYEARC%, it gains 1 strain token. %LINEBREAK%<strong>Networked Aim:</strong> You cannot spend your locks to reroll attack dice. While you perform an attack, you may reroll a number of attack dice up to the number of friendly locks on the defender."
    },
    "Geonosian Prototype": {
        text: "While you perform a %MISSILE% or %CANNON% attack, you may remove 1 tractor token from the defender to reroll up to 2 attack dice. %LINEBREAK%<strong>Networked Aim:</strong> You cannot spend your locks to reroll attack dice. While you perform an attack, you may reroll a number of attack dice up to the number of friendly locks on the defender."
    },
    "Onderon Oppressor": {
        text: "After you barrel roll or sideslip, if you are stressed. Gain 1 calculate token. %LINEBREAK%<strong>Networked Aim:</strong> You cannot spend your locks to reroll attack dice. While you perform an attack, you may reroll a number of attack dice up to the number of friendly locks on the defender."
    },
    "Jedi General": {
        text: "<strong>Intuitive Controls:</strong> During the System Phase, you may perform a purple %BARRELROLL% or purple %BOOST% action."
    },
    Yoda: {
        text: "After another friendly ship at range 0-3 spends 1 or more %FORCE%, you may spend 1 %FORCE%. If you do, that ship recovers 1 %FORCE%. %LINEBREAK% <strong>Intuitive Controls:</strong> During the System Phase, you may perform a purple %BARRELROLL% or purple %BOOST% action."
    },
    "Shaak Ti": {
        text: "At the start of the End Phase, you may spend any number of %FORCE% to choose that many friendly ships at range 0-2. Each chosen ship does not remove 1 focus or evade token during this End Phase. %LINEBREAK% <strong>Intuitive Controls:</strong> During the System Phase, you may perform a purple %BARRELROLL% or purple %BOOST% action."
    },
    "Aayla Secura": {
        text: "While an enemy ship in your %FRONTARC% at range 0-1 performs an attack, the defender may change 1 blank result to a %FOCUS% result. %LINEBREAK% <strong>Intuitive Controls:</strong> During the System Phase, you may perform a purple %BARRELROLL% or purple %BOOST% action."
    },
    "Obi-Wan Kenobi (Eta-2)": {
        display_name: "Obi-Wan Kenobi",
        text: "After you or a friendly <b>Anakin Skywalker</b> at range 0-3 executes a maneuver, if there are more enemy ships than other friendly ships at range 0-1 of that ship, you may spend 1 %FORCE%. If you do, that ship gains 1 focus token. %LINEBREAK% <strong>Intuitive Controls:</strong> During the System Phase, you may perform a purple %BARRELROLL% or purple %BOOST% action."
    },
    "Anakin Skywalker (Eta-2)": {
        display_name: "Anakin Skywalker",
        text: "After you or a friendly <b>Obi-Wan Kenobi</b> ship at range 0-3 executes a maneuver, if there are more enemy ships than other friendly ships at range 0-1 of that ship, you may spend 1 %FORCE%. If you do, that ship removes 1 red token of your choice. %LINEBREAK% <strong>Intuitive Controls:</strong> During the System Phase, you may perform a purple %BARRELROLL% or purple %BOOST% action."
    },
    "TransGalMeg Control Link": {
        text: "<strong>Hyperspace Docking Ring:</strong> 1 Delta-7 Aethersprite, Eta-2 Actis, or Nimbus-class V-wing can dock with you. %LINEBREAK% While a ship is docked with you, you gain that ship's initiative and are assigned that ship's dial. While you execute a maneuver, reduce its speed to 1. Before you execute an advanced maneuver, execute a white stationary maneuver (%STOP%) instead, then you may rotate 90º or 180º. %LINEBREAK% While no ship is docked with you, you are not assigned a maneuver dial and do not activate or engage."
    },
    "Jango Fett": {
        text: "While you defend or perform a primary attack, if the difficulty of your revealed maneuver is less than that of the enemy ship's, you may change 1 of the enemy ship's %FOCUS% results to a blank result."
    },
    "Separatist Interceptor": {
        text: " %LINEBREAK%<strong>Networked Calculations:</strong> While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range&nbsp;0-1 to change 1&nbsp;%FOCUS% result to an %EVADE% or %HIT% result."
    },
    "Colicoid Interceptor": {
        text: " %LINEBREAK%<strong>Networked Calculations:</strong> While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range&nbsp;0-1 to change 1&nbsp;%FOCUS% result to an %EVADE% or %HIT% result."
    },
    "Phlac-Arphocc Prototype": {
        text: "During the System Phase, you may spend your lock on a ship to look at that ship's dial. %LINEBREAK%<strong>Networked Calculations:</strong> While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range&nbsp;0-1 to change 1&nbsp;%FOCUS% result to an %EVADE% or %HIT% result."
    },
    "Fearsome Predator": {
        text: "<strong>Setup:</strong> After placing forces, assign the <b>Fearful Prey</b> condition to 1 enemy ship. %LINEBREAK%<strong>Networked Calculations:</strong> While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range&nbsp;0-1 to change 1&nbsp;%FOCUS% result to an %EVADE% or %HIT% result."
    },
    "DIS-347": {
        text: "At the start of the Engagement Phase, you may acquire a lock on an object at range 1-3 that has a friendly lock. %LINEBREAK%<strong>Networked Calculations:</strong> While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range&nbsp;0-1 to change 1&nbsp;%FOCUS% result to an %EVADE% or %HIT% result."
    },
    "DIS-T81": {
        text: "While you defend or perform an attack, you may spend 1 calculate token from a friendly ship in the enemy ship's firing arc to change 1 %FOCUS% result to an %EVADE% or %HIT% result. %LINEBREAK%<strong>Networked Calculations:</strong> While you defend or perform an attack, you may spend 1 calculate token from a friendly ship at range&nbsp;0-1 to change 1&nbsp;%FOCUS% result to an %EVADE% or %HIT% result."
    },
    "Lyttan Dree": {
        text: "While a friendly ship at range 0-2 performs an attack, if you are in the defender's %LEFTARC% or %RIGHTARC%, the attacker may reroll 1 attack die. %LINEBREAK% <strong>Rotating Cannons:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. You must treat the %FRONTARC% requirement of your equipped %CANNON% upgrades as %SINGLETURRETARC%."
    },
    '"Rampage"': {
        text: "After you execute a speed 3-4 maneuver, you may choose a ship in your %SINGLETURRETARC% at range 0-1. If you do, that ship gains 1 strain token, or 2 strain tokens if you are damaged. %LINEBREAK% <strong>Rotating Cannons:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. You must treat the %FRONTARC% requirement of your equipped %CANNON% upgrades as %SINGLETURRETARC%."
    },
    "Onyx Squadron Sentry": {
        text: "%LINEBREAK% <strong>Rotating Cannons:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. You must treat the %FRONTARC% requirement of your equipped %CANNON% upgrades as %SINGLETURRETARC%."
    },
    "Carida Academy Cadet": {
        text: "%LINEBREAK% <strong>Rotating Cannons:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. You must treat the %FRONTARC% requirement of your equipped %CANNON% upgrades as %SINGLETURRETARC%."
    },
    "Poe Dameron (HoH)": {
        text: "After a friendly ship at range 0-2 performs an action during its activation, you may spend 2 %CHARGE%. If you do, that ship may perform a white action, treating it as red. %LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1&nbsp;%CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Temmin Wexley (HoH)": {
        text: "At the start of the Engagement Phase, each friendly T-70 X-wing at range 0-3 may gain 1 strain token to flip its equipped %CONFIGURATION% upgrade. If it does, that ship gains 1 calculate token. %LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1&nbsp;%CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "C'ai Threnalli": {
        text: "After you fully execute a maneuver, if you moved through a friendly ship, you may perform an %EVADE% action. %LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1&nbsp;%CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Nimi Chireen": {
        text: "While you perform an attack, if the defender's initiative is higher than yours, you may change 1 blank result to a %FOCUS% result. %LINEBREAK%<strong>Weapon Hardpoint:</strong> You can equip 1&nbsp;%CANNON%, %TORPEDO%, or %MISSILE% upgrade."
    },
    "Merl Cobben": {
        text: "While a friendly ship at range 0-2 performs a primary attack, if you are in the defender's %BULLSEYEARC%, the defender rolls 1 fewer defense die. %LINEBREAK%<strong>Refined Gyrostabilizers:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. After you perform an action, you may perform a red %BOOST% or red %ROTATEARC% action."
    },
    "Seftin Vanik": {
        text: "After you perform a %BOOST% action, you may transfer 1 evade token to a friendly ship at range 1. %LINEBREAK%<strong>Refined Gyrostabilizers:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. After you perform an action, you may perform a red %BOOST% or red %ROTATEARC% action."
    },
    "Suralinda Javos": {
        text: "After you partially execute a maneuver, you may gain 1 strain token to rotate 90º or 180º. %LINEBREAK%<strong>Refined Gyrostabilizers:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. After you perform an action, you may perform a red %BOOST% or red %ROTATEARC% action."
    },
    "Wrobie Tyce": {
        text: "After you defend at attack range 1, if the attacker modified its dice, the attacker gains 1 deplete token. %LINEBREAK%<strong>Refined Gyrostabilizers:</strong> You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%. After you perform an action, you may perform a red %BOOST% or red %ROTATEARC% action."
    },
    "Agent Terex": {
        text: "<strong>Setup:</strong> After placing forces, choose any number of your equipped %ILLICIT% upgrades and equip them to friendly TIE/fo or TIE/sf fighters. Each ship can be assigned only 1 %ILLICIT% this way. %LINEBREAK% <strong>End of Game:</strong> Return all %ILLICIT% upgrades to their original ships."
    },
    "Commander Malarus (Xi Shuttle)": {
        display_name: "Commander Malarus",
        text: "While a friendly ship at range 0-2 performs a primary attack, before the Modify Dice step, if it has 1 or more blank results, that ship <b>must</b> gain 1 strain token to reroll 1 blank result, if able. %LINEBREAK% <i>Errata (RR: 1.2.0 [06/14/2021]): Added a specific timing window to prevent players from circumventing the downsides of the Pilot Ability</i>"
    },
    "Gideon Hask (Xi Shuttle)": {
        display_name: "Gideon Hask",
        text: "While you or a friendly small ship at range 0-2 performs a primary attack against a damaged defender, if the attacker rolled 2 or fewer attack dice, it may gain 1 strain token to roll 1 additional attack die."
    },
    "Loyalist Volunteer": {
        text: '<strong>Twin Ion Engines:</strong> Ignore the "TIE" ship restriction on upgrade cards.'
    },
    "Shadow Squadron Escort": {
        text: '<strong>Twin Ion Engines:</strong> Ignore the "TIE" ship restriction on upgrade cards.'
    },
    "Wilhuff Tarkin": {
        text: 'During the System Phase, you may choose an object that you have locked at range 1-3. Another friendly ship at range 1-3 may acquire a lock on that object. %LINEBREAK%<strong>Twin Ion Engines:</strong> Ignore the "TIE" ship restriction on upgrade cards.'
    },
    '"Klick"': {
        text: 'While a ship that you have locked at range 1-3 defends or performs an attack, you may spend 1 %CHARGE% to prevent range bonuses from being applied. %LINEBREAK%<strong>Twin Ion Engines:</strong> Ignore the "TIE" ship restriction on upgrade cards.'
    },
    '"Contrail"': {
        text: "While you defend or perform an attack, if the bearing of your revealed maneuver is the same as the enemy ship's, you may change 1 of the enemy ship's %FOCUS% results to a blank result. %LINEBREAK%<strong>Twin Ion Engines:</strong> Ignore the \"TIE\" ship restriction on upgrade cards."
    },
    '"Odd Ball" (V-Wing)': {
        display_name: "“Odd Ball”",
        text: 'After you fully execute a red maneuver or perform a red action, if there is an enemy ship in your %BULLSEYEARC%, you may acquire a lock on that ship. %LINEBREAK%<strong>Twin Ion Engines:</strong> Ignore the "TIE" ship restriction on upgrade cards.'
    },
    "Zam Wesell": {
        text: "<strong>Setup:</strong> Lose 2 %CHARGE%. %LINEBREAK% During the System Phase, you may assign 1 of your secret conditions to yourself facedown: <strong> %LINEBREAK% You Should Thank Me %LINEBREAK% You'd Better Mean Business. </strong>"
    },
    "Hera Syndulla (B-Wing)": {
        display_name: "Hera Syndulla",
        text: "While another friendly ship at range 1-2 defends or performs an attack, during a Modify Dice step, you may transfer 1 of your focus tokens, evade tokens, or locks to that ship. %LINEBREAK% <i>Errata (RR: 1.2.0 [06/14/2021]): Added a specific timing window to prevent players from circumventing the downsides of the Pilot Ability</i>"
    },
    "Netrem Pollard": {
        text: "After you barrel roll, you may choose 1 friendly ship that is not stressed at range 0-1. That ship gain's 1 stress token, then you rotate 180º."
    },
    "Hera Syndulla (A-Wing)": {
        display_name: "Hera Syndulla",
        text: "While another friendly ship at range 1-2 defends or performs an attack, during a Modify Dice step, you may transfer 1 of your focus tokens, evade tokens, or locks to that ship.%LINEBREAK%<strong>Vectored Thrusters:</strong> After you perform an action, you may perform a red %BOOST% action. %LINEBREAK% <i>Errata (RR: 1.2.0 [06/14/2021]): Added a specific timing window to prevent players from circumventing the downsides of the Pilot Ability</i>"
    },
    "Wedge Antilles (A-Wing)": {
        display_name: "Wedge Antilles",
        text: "While you perform a primary attack, if the defender is in your %FRONTARC%, the defender rolls 1 fewer defense die. %LINEBREAK%<strong>Vectored Thrusters:</strong> After you perform an action, you may perform a red %BOOST% action."
    },
    "Sabine Wren (A-Wing)": {
        display_name: "Sabine Wren",
        text: "While you defend or perform an attack, if the attack range is 1 and  you are in the enemy's %FRONTARC%, you may change 1 of your results to an %EVADE% or %HIT% result. %LINEBREAK%<strong>Vectored Thrusters:</strong> After you perform an action, you may perform a red %BOOST% action."
    },
    "Derek Klivian": {
        text: "After you acquire or spend a lock, you may remove 1 red token from yourself. %LINEBREAK%<strong>Vectored Thrusters:</strong> After you perform an action, you may perform a red %BOOST% action."
    },
    "Ahsoka Tano (A-Wing)": {
        display_name: "Ahsoka Tano",
        text: "After you fully execute a maneuver, you may choose a friendly ship at range 1-2 and spend 2 %FORCE%. That ship may perform an action, even while stressed. %LINEBREAK%<strong>Vectored Thrusters:</strong> After you perform an action, you may perform a red %BOOST% action."
    },
    "Shara Bey (A-Wing)": {
        display_name: "Shara Bey",
        text: "While you defend or perform a primary attack, you may spend 1 lock you have on the enemy ship to add 1 %FOCUS% result to your dice results. %LINEBREAK%<strong>Vectored Thrusters:</strong> After you perform an action, you may perform a red %BOOST% action."
    },
    "Darth Vader (TIE Defender)": {
        display_name: "Darth Vader",
        text: "You cannot spend %FORCE% except while attacking. %LINEBREAK% While you perform an attack, you may spend 1 %FORCE% to change 1 blank result to a %HIT% result. %LINEBREAK%<strong>Full Throttle:</strong> After you fully execute a speed 3-5 maneuver, you may perform an %EVADE% action."
    },
    "Captain Dobbs": {
        text: "While another friendly ship at range 0-1 defends, before the Neutralize Results step, if you are in the attack arc and are not ionized, you may gain 1 ion token to cancel 1 %HIT% result. %LINEBREAK%<strong>Full Throttle:</strong> After you fully execute a speed 3-5 maneuver, you may perform an %EVADE% action."
    },
    "Vult Skerris": {
        text: "<strong>Action:</strong> Gain 1 strain token to recover 1 %CHARGE%. %LINEBREAK% Before you engage, you may spend 1 %CHARGE% to perform an action. %LINEBREAK%<strong>Full Throttle:</strong> After you fully execute a speed 3-5 maneuver, you may perform an %EVADE% action."
    },
    "Vult Skerris (TIE Interceptor)": {
        display_name: "Vult Skerris",
        text: "<strong>Action:</strong> Gain 1 strain token to recover 1 %CHARGE%. %LINEBREAK% Before you engage, you may spend 1 %CHARGE% to perform an action. %LINEBREAK%<strong>Autothrusters:</strong> After you perform an action, you may perform a red %BARRELROLL% or red %BOOST% action."
    },
    "Gideon Hask (TIE Interceptor)": {
        display_name: "Gideon Hask",
        text: "While you perform an attack against a damaged defender, roll 1 additional attack die.%LINEBREAK%<strong>Autothrusters:</strong> After you perform an action, you may perform a red %BARRELROLL% or red %BOOST% action."
    },
    "Commandant Goran": {
        text: "After a friendly ship at range 0-3 with a lower initiative than yours partially executes a maneuver, it may perform a red %FOCUS% action. %LINEBREAK%<strong>Autothrusters:</strong> After you perform an action, you may perform a red %BARRELROLL% or red %BOOST% action."
    },
    "Nash Windrider": {
        text: "During the Engagement Phase, after a friendly small ship at range 0-3 is destroyed, if that ship has not engaged this phase, you may spend 1 %CHARGE%. If you do, that ship engages at the current initiative. %LINEBREAK%<strong>Autothrusters:</strong> After you perform an action, you may perform a red %BARRELROLL% or red %BOOST% action."
    },
    "Ciena Ree": {
        text: "After you perform an attack, if the defender was destroyed, gain 1 stress token. %LINEBREAK% After a friendly ship at range 0-3 is destroyed, remove 1 stress token. %LINEBREAK%<strong>Autothrusters:</strong> After you perform an action, you may perform a red %BARRELROLL% or red %BOOST% action."
    },
    "Lieutenant Lorrir": {
        text: "While you barrel roll, you <b>must</b> use the (%BANKLEFT% or %BANKRIGHT%) template instead of the %STRAIGHT% template. %LINEBREAK%<strong>Autothrusters:</strong> After you perform an action, you may perform a red %BARRELROLL% or red %BOOST% action."
    },
    "Kanan Jarrus (HWK-290)": {
        display_name: "Kanan Jarrus",
        text: "While you or a ship in your %SINGLETURRETARC% defends, you may spend 1 %FORCE%. If you do, the attacker rolls 1 fewer attack die."
    },
    "Tápusk": {
        text: "During the End Phase, before an enemy ship in your %SINGLETURRETARC% recovers 1 recurring %CHARGE% or %FORCE%, you may spend 2 %CHARGE%. If you do, that ship does not recover that %CHARGE% or %FORCE%"
    },
    "Gamut Key": {
        text: "At the start of the End Phase, you may spend 2 %CHARGE% to choose yourself or a ship in your %SINGLETURRETARC% with 1 or more circular tokens. During the End Phase, circular tokens are not removed from that ship."
    },
    "Arliz Hadrassian": {
        text: "While you perform a %FRONTARC% attack, if you are damaged,before the Modify Dice step, you may change 1 of your %FOCUS% results to a %CRIT% result. %LINEBREAK% While you defend, if you are damaged, you <b>must</b> change 1 of your %FOCUS% results to a blank result. %LINEBREAK% <i>Errata (RR: 1.2.0 [06/14/2021]): Added a specific timing window to prevent players from circumventing the downsides of the Pilot Ability</i>"
    },
    "Leema Kai": {
        text: "Before you engage, if you are not in any enemy ship's %FRONTARC%, you may acquire a lock on an enemy ship in your %FULLFRONTARC%."
    },
    Padric: {
        text: "After a friendly device that you have locked detonates, each enemy ship at range 0-1 of that device gains 1 strain token."
    },
    "Republic Judiciary": {
        display_name: "Republic Judiciary",
        text: "<i class = flavor_text>The Galactic Republic uses small, swift warships such as the CR90 corvette to respond rapidly to Separatist incursions across the galaxy.</i> %LINEBREAK% <strong>Broadside Batteries:</strong> You can acquire locks and perform primary attacks at range 1-4."
    },
    "Alderaanian Guard": {
        display_name: "Alderaanian Guard",
        text: "<i class = flavor_text>A craft used since before the Clone Wars, the CR90 corvette is favored by the Royal House of Alderaan for its versatility.</i> %LINEBREAK% <strong>Broadside Batteries:</strong> You can acquire locks and perform primary attacks at range 1-4."
    },
    "Outer Rim Patrol": {
        display_name: "Outer Rim Patrol",
        text: "<i class = flavor_text>The <untalic>Raider</untalic>-class corvette is one of the Empire's smallest warships, often used for reconnaissance missions, surgical strikes, or suppressing enemy starfighters with its powerful ordnance.</i> %LINEBREAK% <strong>Concentrated Batteries:</strong> While you perform a primary, %TORPEDO%, or %MISSILE% attack, if the defender is in your %BULLSEYEARC%, roll 1 additional die."
    },
    "First Order Collaborators": {
        display_name: "First Order Collaborators",
        text: "<i class = flavor_text>The First Order's supporters make use of former Imperial vessels, such as the <untalic>Raider</untalic>-class corvette. Though it has outlived the regime that created it, this craft still spreads terror across the galaxy.</i> %LINEBREAK% <strong>Concentrated Batteries:</strong> While you perform a primary, %TORPEDO%, or %MISSILE% attack, if the defender is in your %BULLSEYEARC%, roll 1 additional die."
    },
    "Echo Base Evacuees": {
        display_name: "Echo Base Evacuees",
        text: "<i class = flavor_text>The GR-75 medium transport acquitted itself well at battles such as the evacuation of Hoth, where several of these ships were pivotal to the Rebel forces' escape.</i> %LINEBREAK% <strong>Resupply Craft:</strong> After another friendly ship at range 0-1 performs an action, you may spend 1 %ENERGY%. If you do, it removes 1 orange or red token, or recovers 1 shield."
    },
    "New Republic Volunteers": {
        display_name: "New Republic Volunteers",
        text: "<i class = flavor_text>In use since the Galactic Civil War, groups within the New Republic still utilize the GR-75 medium transport for supply and aid missions.</i> %LINEBREAK% <strong>Resupply Craft:</strong> After another friendly ship at range 0-1 performs an action, you may spend 1 %ENERGY%. If you do, it removes 1 orange or red token, or recovers 1 shield."
    },
    "Outer Rim Garrison": {
        display_name: "Outer Rim Garrison",
        text: "<i class = flavor_text>Capable of carrying TIE fighters and operating independently for long periods of time, the <untalic>Gozanti</untalic>-class cruiser is a common sight in the skies of downtrodden worlds across the Outer Rim.</i> %LINEBREAK% <strong>Docking Clamps:</strong> You can dock up to 4 small ships."
    },
    "First Order Sympathizers": {
        display_name: "First Order Sympathizers",
        text: "<i class = flavor_text>The First Order's swift rise to power rests upon ruthless innovation. However, sympathizers often repurpose Imperial designs, like the venerable <untalic>Gozanti</untalic>-class cruiser, in surveillance and patrol operations.</i> %LINEBREAK% <strong>Docking Clamps:</strong> You can dock up to 4 small ships."
    },
    "Separatist Privateers": {
        display_name: "Separatist Privateers",
        text: "<i class = flavor_text>The Separatist Alliance makes use of all manner of unsavory contacts in its fight against the Galactic Republic, including corsairs and criminal cartels.</i> %LINEBREAK% <strong>Overdrive Burners:</strong> While you defend, if your revealed maneuver is speed 3-5, roll 1 additional defense die."
    },
    "Syndicate Smugglers": {
        display_name: "Syndicate Smugglers",
        text: "<i class = flavor_text>Vessels like the C-ROC Cruiser allow criminal operations across the Outer Rim to move massive amounts of illicit materials, or project power that can bully small colonies into compliance.</i> %LINEBREAK% <strong>Overdrive Burners:</strong> While you defend, if your revealed maneuver is speed 3-5, roll 1 additional defense die."
    },
    "Colicoid Destroyer": {
        display_name: "Colicoid Destroyer",
        text: "<i class = flavor_text>Designed by the Colicoid Creation Nest and equipped with powerful tentacles and a massive drill to tear through the hull of even the toughest starships and fortifications, the Trident-class Assault Ship is a terrifying testament to the threat posed by the Separatist Alliance.</i> %LINEBREAK% <strong>Tractor Grasp:</strong> After you perform a <b>Tractor Tentacles</b> attack that hits, the defender gains 1 tractor token."
    },
    "Lawless Pirates": {
        display_name: "Lawless Pirates",
        text: "<i class = flavor_text>The Separatist Alliance has close ties to certain mercenaries and criminal groups and, as the war rages on, its technology sometimes finds its way into unsavory hands.</i> %LINEBREAK% <strong>Tractor Grasp:</strong> After you perform a <b>Tractor Tentacles</b> attack that hits, the defender gains 1 tractor token."
    }
};
exports.pilotRules = pilotRules;
var upgrades = [{
        name: '"Chopper" (Astromech)',
        id: 0,
        slot: "Astromech",
        canonical_name: '"Chopper"',
        points: 2,
        unique: !0,
        faction: "Rebel Alliance"
    }, {
        name: '"Genius"',
        id: 1,
        slot: "Astromech",
        points: 2,
        unique: !0,
        faction: "Scum and Villainy"
    }, {
        name: "R2 Astromech",
        id: 2,
        slot: "Astromech",
        pointsarray: [3, 3, 5, 8],
        variableagility: !0,
        charge: 2
    }, {
        name: "R2-D2",
        id: 3,
        unique: !0,
        slot: "Astromech",
        pointsarray: [4, 6, 8, 10],
        variableagility: !0,
        charge: 3,
        faction: "Rebel Alliance"
    }, {
        name: "R3 Astromech",
        id: 4,
        slot: "Astromech",
        points: 3
    }, {
        name: "R4 Astromech",
        id: 5,
        slot: "Astromech",
        points: 2,
        restrictions: [
            ["Base", "Small"]
        ],
        modifier_func: function (a) {
            var b, c, d, e;
            if (null != a.maneuvers[1]) {
                for (e = [], b = c = 0, d = a.maneuvers[1].length; 0 <= d ? c < d : c > d; b = 0 <= d ? ++c : --c)
                    b > 4 || (a.maneuvers[1][b] > 1 && a.maneuvers[1][b]--, a.maneuvers[2][b] > 1 ? e.push(a.maneuvers[2][b]--) : e.push(void 0));
                return e;
            }
        }
    }, {
        name: "R5 Astromech",
        id: 6,
        slot: "Astromech",
        points: 4,
        charge: 2
    }, {
        name: "R5-D8",
        id: 7,
        unique: !0,
        slot: "Astromech",
        points: 6,
        charge: 3,
        faction: "Rebel Alliance"
    }, {
        name: "R5-P8",
        id: 8,
        slot: "Astromech",
        points: 4,
        unique: !0,
        faction: "Scum and Villainy",
        charge: 3
    }, {
        name: "R5-TK",
        id: 9,
        slot: "Astromech",
        points: 0,
        unique: !0,
        faction: "Scum and Villainy"
    }, {
        name: "Heavy Laser Cannon",
        id: 10,
        slot: "Cannon",
        points: 5,
        attackbull: 4,
        range: "2-3"
    }, {
        name: "Ion Cannon",
        id: 11,
        slot: "Cannon",
        points: 6,
        attack: 3,
        range: "1-3"
    }, {
        name: "Jamming Beam",
        id: 12,
        slot: "Cannon",
        points: 0,
        attack: 3,
        range: "1-2"
    }, {
        name: "Tractor Beam",
        id: 13,
        slot: "Cannon",
        points: 4,
        attack: 3,
        range: "1-3"
    }, {
        name: "Admiral Sloane",
        id: 14,
        slot: "Crew",
        points: 12,
        unique: !0,
        faction: "Galactic Empire"
    }, {
        name: "Agent Kallus",
        id: 15,
        slot: "Crew",
        points: 5,
        unique: !0,
        faction: "Galactic Empire",
        applies_condition: "Hunted"
    }, {
        name: "Boba Fett",
        id: 16,
        slot: "Crew",
        points: 4,
        unique: !0,
        faction: "Scum and Villainy"
    }, {
        name: "Baze Malbus",
        id: 17,
        slot: "Crew",
        points: 3,
        unique: !0,
        faction: "Rebel Alliance"
    }, {
        name: "C-3PO",
        id: 18,
        slot: "Crew",
        points: 8,
        unique: !0,
        faction: "Rebel Alliance",
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Calculate") < 0)
                return a.actions.push("Calculate");
        }
    }, {
        name: "Cassian Andor",
        id: 19,
        slot: "Crew",
        points: 5,
        unique: !0,
        faction: "Rebel Alliance"
    }, {
        name: "Cad Bane",
        id: 20,
        slot: "Crew",
        points: 3,
        unique: !0,
        faction: "Scum and Villainy"
    }, {
        name: "Chewbacca",
        id: 21,
        slot: "Crew",
        points: 3,
        unique: !0,
        faction: "Rebel Alliance",
        charge: 2,
        recurring: 1
    }, {
        name: "Chewbacca (Scum)",
        id: 22,
        slot: "Crew",
        xws: "chewbacca-crew",
        points: 4,
        unique: !0,
        faction: "Scum and Villainy"
    }, {
        name: '"Chopper" (Crew)',
        id: 23,
        canonical_name: '"Chopper"',
        xws: "chopper-crew",
        slot: "Crew",
        points: 1,
        unique: !0,
        faction: "Rebel Alliance"
    }, {
        name: "Ciena Ree",
        id: 24,
        slot: "Crew",
        points: 6,
        unique: !0,
        faction: "Galactic Empire",
        restrictions: [
            ["Action", "Coordinate"]
        ]
    }, {
        name: "Cikatro Vizago",
        id: 25,
        slot: "Crew",
        points: 1,
        unique: !0,
        faction: "Scum and Villainy"
    }, {
        name: "Darth Vader",
        id: 26,
        slot: "Crew",
        points: 14,
        force: 1,
        unique: !0,
        faction: "Galactic Empire",
        modifier_func: function (a) {
            return a.force += 1;
        }
    }, {
        name: "Death Troopers",
        id: 27,
        slot: "Crew",
        points: 6,
        unique: !0,
        faction: "Galactic Empire",
        restrictions: [
            ["Slot", "Crew"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot(b.slot);
        },
        also_occupies_upgrades: ["Crew"]
    }, {
        name: "Director Krennic",
        id: 28,
        slot: "Crew",
        points: 4,
        unique: !0,
        faction: "Galactic Empire",
        applies_condition: "Optimized Prototype",
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Lock") < 0)
                return a.actions.push("Lock");
        }
    }, {
        name: "Emperor Palpatine",
        id: 29,
        slot: "Crew",
        points: 11,
        force: 1,
        unique: !0,
        faction: "Galactic Empire",
        restrictions: [
            ["Slot", "Crew"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot(b.slot);
        },
        also_occupies_upgrades: ["Crew"],
        modifier_func: function (a) {
            return a.force += 1;
        }
    }, {
        name: "Freelance Slicer",
        id: 30,
        slot: "Crew",
        points: 3
    }, {
        name: "4-LOM",
        id: 31,
        slot: "Crew",
        points: 2,
        unique: !0,
        faction: "Scum and Villainy"
    }, {
        name: 'GNK "Gonk" Droid',
        id: 32,
        slot: "Crew",
        points: 8,
        charge: 1
    }, {
        name: "Grand Inquisitor",
        id: 33,
        slot: "Crew",
        points: 13,
        unique: !0,
        force: 1,
        faction: "Galactic Empire",
        modifier_func: function (a) {
            return a.force += 1;
        }
    }, {
        name: "Grand Moff Tarkin",
        id: 34,
        slot: "Crew",
        points: 4,
        unique: !0,
        faction: "Galactic Empire",
        charge: 2,
        recurring: 1,
        restrictions: [
            ["Action", "Lock"]
        ]
    }, {
        name: "Hera Syndulla",
        id: 35,
        slot: "Crew",
        points: 4,
        unique: !0,
        faction: "Rebel Alliance"
    }, {
        name: "IG-88D",
        id: 36,
        slot: "Crew",
        points: 3,
        unique: !0,
        faction: "Scum and Villainy",
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Calculate") < 0)
                return a.actions.push("Calculate");
        }
    }, {
        name: "Informant",
        id: 37,
        slot: "Crew",
        points: 4,
        unique: !0,
        applies_condition: "Listening Device"
    }, {
        name: "ISB Slicer",
        id: 38,
        slot: "Crew",
        points: 3,
        faction: "Galactic Empire"
    }, {
        name: "Jabba the Hutt",
        id: 39,
        slot: "Crew",
        points: 6,
        unique: !0,
        faction: "Scum and Villainy",
        charge: 4,
        restrictions: [
            ["Slot", "Crew"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot(b.slot);
        },
        also_occupies_upgrades: ["Crew"]
    }, {
        name: "Jyn Erso",
        id: 40,
        slot: "Crew",
        points: 2,
        unique: !0,
        faction: "Rebel Alliance"
    }, {
        name: "Kanan Jarrus",
        id: 41,
        slot: "Crew",
        points: 12,
        force: 1,
        unique: !0,
        faction: "Rebel Alliance",
        modifier_func: function (a) {
            return a.force += 1;
        }
    }, {
        name: "Ketsu Onyo",
        id: 42,
        slot: "Crew",
        points: 4,
        unique: !0,
        faction: "Scum and Villainy"
    }, {
        name: "L3-37",
        id: 43,
        slot: "Crew",
        points: 4,
        unique: !0,
        faction: "Scum and Villainy"
    }, {
        name: "Lando Calrissian",
        id: 44,
        slot: "Crew",
        xws: "landocalrissian",
        points: 2,
        unique: !0,
        faction: "Rebel Alliance"
    }, {
        name: "Lando Calrissian (Scum)",
        id: 45,
        slot: "Crew",
        xws: "landocalrissian-crew",
        points: 6,
        unique: !0,
        faction: "Scum and Villainy"
    }, {
        name: "Leia Organa",
        id: 46,
        slot: "Crew",
        points: 7,
        unique: !0,
        faction: "Rebel Alliance",
        charge: 3,
        recurring: 1
    }, {
        name: "Latts Razzi",
        id: 47,
        slot: "Crew",
        points: 5,
        unique: !0,
        faction: "Scum and Villainy"
    }, {
        name: "Maul",
        id: 48,
        slot: "Crew",
        points: 10,
        unique: !0,
        keyword: ["Dark Side"],
        faction: ["Scum and Villainy", "Rebel Alliance"],
        force: 1,
        restrictions: [
            ["orUnique", "Ezra Bridger"],
            ["Faction", "Scum and Villainy"]
        ],
        modifier_func: function (a) {
            return a.force += 1;
        }
    }, {
        name: "Minister Tua",
        id: 49,
        slot: "Crew",
        points: 7,
        unique: !0,
        faction: "Galactic Empire"
    }, {
        name: "Moff Jerjerrod",
        id: 50,
        slot: "Crew",
        points: 8,
        unique: !0,
        faction: "Galactic Empire",
        charge: 2,
        recurring: 1,
        restrictions: [
            ["Action", "Coordinate"]
        ]
    }, {
        name: "Magva Yarro",
        id: 51,
        slot: "Crew",
        points: 7,
        unique: !0,
        faction: "Rebel Alliance"
    }, {
        name: "Nien Nunb",
        id: 52,
        slot: "Crew",
        points: 5,
        unique: !0,
        faction: "Rebel Alliance",
        modifier_func: function (a) {
            var b, c, d, e, f;
            if (null != a.maneuvers[1]) {
                for (e = a.maneuvers, f = [], c = 0, d = e.length; c < d; c++)
                    b = e[c], b[1] > 1 && b[1]--, b[3] > 1 ? f.push(b[3]--) : f.push(void 0);
                return f;
            }
        }
    }, {
        name: "Novice Technician",
        id: 53,
        slot: "Crew",
        points: 4
    }, {
        name: "Perceptive Copilot",
        id: 54,
        slot: "Crew",
        points: 8
    }, {
        name: "Qi'ra",
        id: 55,
        slot: "Crew",
        points: 2,
        unique: !0,
        faction: "Scum and Villainy"
    }, {
        name: "R2-D2 (Crew)",
        canonical_name: "R2-D2",
        id: 56,
        slot: "Crew",
        xws: "r2d2-crew",
        points: 8,
        unique: !0,
        faction: "Rebel Alliance"
    }, {
        name: "Sabine Wren",
        id: 57,
        slot: "Crew",
        points: 3,
        unique: !0,
        faction: "Rebel Alliance"
    }, {
        name: "Saw Gerrera",
        id: 58,
        slot: "Crew",
        points: 9,
        unique: !0,
        faction: "Rebel Alliance"
    }, {
        name: "Seasoned Navigator",
        id: 59,
        slot: "Crew",
        pointsarray: [2, 3, 4, 5, 6, 7, 8, 9, 10],
        variableinit: !0
    }, {
        name: "Seventh Sister",
        id: 60,
        slot: "Crew",
        points: 9,
        force: 1,
        unique: !0,
        faction: "Galactic Empire",
        modifier_func: function (a) {
            return a.force += 1;
        }
    }, {
        name: "Tactical Officer",
        id: 61,
        slot: "Crew",
        points: 6,
        restrictions: [
            ["Action", "R-Coordinate"]
        ],
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Coordinate") < 0)
                return a.actions.push("Coordinate");
        }
    }, {
        name: "Tobias Beckett",
        id: 62,
        slot: "Crew",
        points: 2,
        unique: !0,
        faction: "Scum and Villainy"
    }, {
        name: "0-0-0",
        id: 63,
        slot: "Crew",
        points: 5,
        unique: !0,
        faction: ["Scum and Villainy", "Galactic Empire"],
        restrictions: [
            ["orUnique", "Darth Vader"],
            ["Faction", "Scum and Villainy"]
        ]
    }, {
        name: "Unkar Plutt",
        id: 64,
        slot: "Crew",
        points: 2,
        unique: !0,
        faction: "Scum and Villainy"
    }, {
        name: '"Zeb" Orrelios',
        id: 65,
        slot: "Crew",
        points: 1,
        unique: !0,
        faction: "Rebel Alliance"
    }, {
        name: "Zuckuss",
        id: 66,
        slot: "Crew",
        points: 2,
        unique: !0,
        faction: "Scum and Villainy"
    }, {
        name: "Bomblet Generator",
        id: 67,
        slot: "Device",
        points: 2,
        charge: 2,
        applies_condition: "Bomblet",
        restrictions: [
            ["Slot", "Device"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot(b.slot);
        },
        also_occupies_upgrades: ["Device"]
    }, {
        name: "Conner Nets",
        id: 68,
        slot: "Device",
        points: 3,
        charge: 1,
        applies_condition: "Conner Net"
    }, {
        name: "Proton Bombs",
        id: 69,
        slot: "Device",
        points: 4,
        charge: 2,
        applies_condition: "Proton Bomb"
    }, {
        name: "Proximity Mines",
        id: 70,
        slot: "Device",
        points: 6,
        charge: 2,
        applies_condition: "Proximity Mine"
    }, {
        name: "Seismic Charges",
        id: 71,
        slot: "Device",
        points: 3,
        charge: 2,
        applies_condition: "Seismic Charge"
    }, {
        name: "Heightened Perception",
        id: 72,
        slot: "Force",
        points: 3
    }, {
        name: "Instinctive Aim",
        id: 73,
        slot: "Force",
        points: 1
    }, {
        name: "Supernatural Reflexes",
        id: 74,
        slot: "Force",
        pointsarray: [4, 4, 4, 8, 16, 24, 32],
        variableinit: !0,
        restrictions: [
            ["Base", "Small"]
        ]
    }, {
        name: "Sense",
        id: 75,
        slot: "Force",
        points: 5
    }, {
        name: "Agile Gunner",
        id: 76,
        slot: "Gunner",
        pointsarray: [6, 5, 4, 3],
        variablebase: !0
    }, {
        name: "Bistan",
        id: 77,
        slot: "Gunner",
        points: 10,
        unique: !0,
        faction: "Rebel Alliance"
    }, {
        name: "Bossk",
        id: 78,
        slot: "Gunner",
        points: 8,
        unique: !0,
        faction: "Scum and Villainy"
    }, {
        name: "BT-1",
        id: 79,
        slot: "Gunner",
        points: 2,
        unique: !0,
        faction: ["Scum and Villainy", "Galactic Empire"],
        restrictions: [
            ["orUnique", "Darth Vader"],
            ["Faction", "Scum and Villainy"]
        ]
    }, {
        name: "Dengar",
        id: 80,
        slot: "Gunner",
        points: 6,
        unique: !0,
        faction: "Scum and Villainy",
        recurring: 1,
        charge: 1
    }, {
        name: "Ezra Bridger",
        id: 81,
        slot: "Gunner",
        points: 12,
        force: 1,
        unique: !0,
        faction: "Rebel Alliance",
        modifier_func: function (a) {
            return a.force += 1;
        }
    }, {
        name: "Fifth Brother",
        id: 82,
        slot: "Gunner",
        points: 12,
        force: 1,
        unique: !0,
        faction: "Galactic Empire",
        modifier_func: function (a) {
            return a.force += 1;
        }
    }, {
        name: "Greedo",
        id: 83,
        slot: "Gunner",
        points: 1,
        unique: !0,
        faction: "Scum and Villainy",
        charge: 1,
        recurring: 1
    }, {
        name: "Han Solo",
        id: 84,
        slot: "Gunner",
        xws: "hansolo",
        points: 12,
        unique: !0,
        faction: "Rebel Alliance"
    }, {
        name: "Han Solo (Scum)",
        id: 85,
        slot: "Gunner",
        xws: "hansolo-gunner",
        points: 10,
        unique: !0,
        faction: "Scum and Villainy"
    }, {
        name: "Hotshot Gunner",
        id: 86,
        slot: "Gunner",
        points: 7
    }, {
        name: "Luke Skywalker",
        id: 87,
        slot: "Gunner",
        points: 26,
        force: 1,
        unique: !0,
        faction: "Rebel Alliance",
        modifier_func: function (a) {
            return a.force += 1;
        }
    }, {
        name: "Skilled Bombardier",
        id: 88,
        slot: "Gunner",
        points: 2
    }, {
        name: "Veteran Tail Gunner",
        id: 89,
        slot: "Gunner",
        points: 4,
        restrictions: [
            ["AttackArc", "Rear Arc"]
        ]
    }, {
        name: "Veteran Turret Gunner",
        id: 90,
        slot: "Gunner",
        pointsarray: [11, 8, 7, 7],
        variablebase: !0,
        restrictions: [
            ["Action", "Rotate Arc"]
        ]
    }, {
        name: "Cloaking Device",
        id: 91,
        slot: "Illicit",
        points: 4,
        unique: !0,
        charge: 2,
        restrictions: [
            ["Base", "Small or Medium"]
        ]
    }, {
        name: "Contraband Cybernetics",
        id: 92,
        slot: "Illicit",
        points: 3,
        charge: 1
    }, {
        name: "Deadman's Switch",
        id: 93,
        slot: "Illicit",
        points: 2
    }, {
        name: "Feedback Array",
        id: 94,
        slot: "Illicit",
        points: 3
    }, {
        name: "Inertial Dampeners",
        id: 95,
        slot: "Illicit",
        pointsarray: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        variableinit: !0
    }, {
        name: "Rigged Cargo Chute",
        id: 96,
        slot: "Illicit",
        points: 4,
        charge: 1,
        restrictions: [
            ["Base", "Medium or Large"]
        ]
    }, {
        name: "Barrage Rockets",
        id: 97,
        slot: "Missile",
        points: 8,
        attack: 3,
        range: "2-3",
        rangebonus: !0,
        charge: 5,
        restrictions: [
            ["Slot", "Missile"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot(b.slot);
        },
        also_occupies_upgrades: ["Missile"]
    }, {
        name: "Cluster Missiles",
        id: 98,
        slot: "Missile",
        points: 4,
        attack: 3,
        range: "1-2",
        rangebonus: !0,
        charge: 4
    }, {
        name: "Concussion Missiles",
        id: 99,
        slot: "Missile",
        points: 6,
        attack: 3,
        range: "2-3",
        rangebonus: !0,
        charge: 3
    }, {
        name: "Homing Missiles",
        id: 100,
        slot: "Missile",
        points: 5,
        attack: 4,
        range: "2-3",
        rangebonus: !0,
        charge: 2
    }, {
        name: "Ion Missiles",
        id: 101,
        slot: "Missile",
        points: 2,
        attack: 3,
        range: "2-3",
        rangebonus: !0,
        charge: 3
    }, {
        name: "Proton Rockets",
        id: 102,
        slot: "Missile",
        points: 5,
        attackbull: 5,
        range: "1-2",
        rangebonus: !0,
        charge: 1
    }, {
        name: "Ablative Plating",
        id: 103,
        slot: "Modification",
        points: 6,
        charge: 2,
        restrictions: [
            ["Base", "Medium or Large"]
        ]
    }, {
        name: "Advanced SLAM",
        id: 104,
        slot: "Modification",
        points: 3,
        restrictions: [
            ["Action", "Slam"]
        ]
    }, {
        name: "Afterburners",
        id: 105,
        slot: "Modification",
        pointsarray: [4, 4, 4, 4, 5, 6, 7],
        variableinit: !0,
        charge: 2,
        restrictions: [
            ["Base", "Small"]
        ]
    }, {
        name: "Electronic Baffle",
        id: 106,
        slot: "Modification",
        points: 2
    }, {
        name: "Engine Upgrade",
        id: 107,
        slot: "Modification",
        pointsarray: [2, 4, 7],
        variablebase: !0,
        restrictions: [
            ["Action", "R-Boost"]
        ],
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Boost") < 0)
                return a.actions.push("Boost");
        }
    }, {
        name: "Munitions Failsafe",
        id: 108,
        slot: "Modification",
        points: 1
    }, {
        name: "Static Discharge Vanes",
        id: 109,
        slot: "Modification",
        points: 6
    }, {
        name: "Tactical Scrambler",
        id: 110,
        slot: "Modification",
        points: 2,
        restrictions: [
            ["Base", "Medium or Large"]
        ]
    }, {
        name: "Advanced Sensors",
        id: 111,
        slot: "Sensor",
        points: 10
    }, {
        name: "Collision Detector",
        id: 112,
        slot: "Sensor",
        points: 6,
        charge: 2
    }, {
        name: "Fire-Control System",
        id: 113,
        slot: "Sensor",
        points: 2
    }, {
        name: "Trajectory Simulator",
        id: 114,
        slot: "Sensor",
        points: 6
    }, {
        name: "Composure",
        id: 115,
        slot: "Talent",
        points: 1,
        restrictions: [
            ["Action", "Focus"]
        ]
    }, {
        name: "Crack Shot",
        id: 116,
        slot: "Talent",
        points: 3,
        charge: 1
    }, {
        name: "Daredevil",
        id: 117,
        slot: "Talent",
        points: 2,
        restrictions: [
            ["Action", "Boost"],
            ["Base", "Small"]
        ]
    }, {
        name: "Debris Gambit",
        id: 118,
        slot: "Talent",
        points: 4,
        restrictions: [
            ["Base", "Small or Medium"]
        ],
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "R-Evade") < 0)
                return a.actions.push("R-Evade");
        }
    }, {
        name: "Elusive",
        id: 119,
        slot: "Talent",
        points: 3,
        charge: 1,
        restrictions: [
            ["Base", "Small or Medium"]
        ]
    }, {
        name: "Expert Handling",
        id: 120,
        slot: "Talent",
        pointsarray: [2, 3, 4],
        variablebase: !0,
        restrictions: [
            ["Action", "R-Barrel Roll"]
        ],
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Barrel Roll") < 0)
                return a.actions.push("Barrel Roll");
        }
    }, {
        name: "Fearless",
        id: 121,
        slot: "Talent",
        points: 3,
        faction: "Scum and Villainy"
    }, {
        name: "Intimidation",
        id: 122,
        slot: "Talent",
        points: 3
    }, {
        name: "Juke",
        id: 123,
        slot: "Talent",
        points: 7,
        restrictions: [
            ["Base", "Small or Medium"]
        ]
    }, {
        name: "Lone Wolf",
        id: 124,
        slot: "Talent",
        points: 5,
        unique: !0,
        recurring: 1,
        charge: 1
    }, {
        name: "Marksmanship",
        id: 125,
        slot: "Talent",
        points: 1
    }, {
        name: "Outmaneuver",
        id: 126,
        slot: "Talent",
        points: 6
    }, {
        name: "Predator",
        id: 127,
        slot: "Talent",
        points: 2
    }, {
        name: "Ruthless",
        id: 128,
        slot: "Talent",
        points: 1,
        faction: "Galactic Empire"
    }, {
        name: "Saturation Salvo",
        id: 129,
        slot: "Talent",
        points: 4,
        restrictions: [
            ["Action", "Reload"]
        ]
    }, {
        name: "Selfless",
        id: 130,
        slot: "Talent",
        points: 2,
        faction: "Rebel Alliance"
    }, {
        name: "Squad Leader",
        id: 131,
        slot: "Talent",
        pointsarray: [2, 4, 6, 8, 10, 12, 14],
        variableinit: !0,
        unique: !0,
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "R-Coordinate") < 0)
                return a.actions.push("R-Coordinate");
        }
    }, {
        name: "Swarm Tactics",
        id: 132,
        slot: "Talent",
        pointsarray: [3, 3, 3, 3, 3, 4, 5],
        variableinit: !0
    }, {
        name: "Trick Shot",
        id: 133,
        slot: "Talent",
        points: 4
    }, {
        name: "Adv. Proton Torpedoes",
        id: 134,
        slot: "Torpedo",
        points: 5,
        attack: 5,
        range: "1",
        rangebonus: !0,
        charge: 1
    }, {
        name: "Ion Torpedoes",
        id: 135,
        slot: "Torpedo",
        points: 4,
        attack: 4,
        range: "2-3",
        rangebonus: !0,
        charge: 2
    }, {
        name: "Proton Torpedoes",
        id: 136,
        slot: "Torpedo",
        points: 12,
        attack: 4,
        range: "2-3",
        rangebonus: !0,
        charge: 2
    }, {
        name: "Dorsal Turret",
        id: 137,
        slot: "Turret",
        points: 2,
        attackt: 2,
        range: "1-2",
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Rotate Arc") < 0)
                return a.actions.push("Rotate Arc");
        }
    }, {
        name: "Ion Cannon Turret",
        id: 138,
        slot: "Turret",
        points: 5,
        attackt: 3,
        range: "1-2",
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Rotate Arc") < 0)
                return a.actions.push("Rotate Arc");
        }
    }, {
        name: "Os-1 Arsenal Loadout",
        id: 139,
        points: 0,
        slot: "Configuration",
        ship: "Alpha-Class Star Wing",
        confersAddons: [{
                type: "Upgrade",
                slot: "Torpedo"
            }, {
                type: "Upgrade",
                slot: "Missile"
            }]
    }, {
        name: "Pivot Wing",
        id: 140,
        points: 0,
        slot: "Configuration",
        ship: "U-Wing"
    }, {
        name: "Pivot Wing (Open)",
        id: 141,
        points: 0,
        skip: !0
    }, {
        name: "Servomotor S-Foils",
        id: 142,
        points: 0,
        slot: "Configuration",
        ship: "X-Wing",
        modifier_func: function (a) {
            return a.actions.push("Boost"), a.actions.push("*Focus"), a.actions.push("R-> Boost");
        }
    }, {
        name: "Blank",
        id: 143,
        skip: !0
    }, {
        name: "Xg-1 Assault Configuration",
        id: 144,
        points: 0,
        slot: "Configuration",
        ship: "Alpha-Class Star Wing",
        confersAddons: [{
                type: "Upgrade",
                slot: "Cannon"
            }]
    }, {
        name: "L3-37's Programming",
        id: 145,
        skip: !0,
        points: 0,
        slot: "Configuration",
        faction: "Scum and Villainy"
    }, {
        name: "Andrasta",
        id: 146,
        slot: "Title",
        points: 2,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Firespray-31",
        confersAddons: [{
                type: "Upgrade",
                slot: "Device"
            }],
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Reload") < 0)
                return a.actions.push("Reload");
        }
    }, {
        name: "Dauntless",
        id: 147,
        slot: "Title",
        points: 4,
        unique: !0,
        faction: "Galactic Empire",
        ship: "VT-49 Decimator"
    }, {
        name: "Ghost",
        id: 148,
        slot: "Title",
        unique: !0,
        points: 0,
        faction: "Rebel Alliance",
        ship: "VCX-100"
    }, {
        name: "Havoc",
        id: 149,
        slot: "Title",
        points: 2,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Scurrg H-6 Bomber",
        unequips_upgrades: ["Crew"],
        also_occupies_upgrades: ["Crew"],
        confersAddons: [{
                type: "Upgrade",
                slot: "Sensor"
            }, {
                type: "Upgrade",
                slot: "Astromech"
            }]
    }, {
        name: "Hound's Tooth",
        id: 150,
        slot: "Title",
        points: 1,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "YV-666"
    }, {
        name: "IG-2000",
        id: 151,
        slot: "Title",
        points: 1,
        faction: "Scum and Villainy",
        ship: "Aggressor"
    }, {
        name: "Lando's Millennium Falcon",
        id: 152,
        slot: "Title",
        points: 3,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Customized YT-1300"
    }, {
        name: "Marauder",
        id: 153,
        slot: "Title",
        points: 6,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Firespray-31",
        confersAddons: [{
                type: "Upgrade",
                slot: "Gunner"
            }]
    }, {
        name: "Millennium Falcon",
        id: 154,
        slot: "Title",
        points: 3,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "YT-1300",
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Evade") < 0)
                return a.actions.push("Evade");
        }
    }, {
        name: "Mist Hunter",
        id: 155,
        slot: "Title",
        points: 1,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "G-1A Starfighter",
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Barrel Roll") < 0)
                return a.actions.push("Barrel Roll");
        },
        confersAddons: [{
                type: "Upgrade",
                slot: "Cannon"
            }]
    }, {
        name: "Moldy Crow",
        id: 156,
        slot: "Title",
        points: 16,
        unique: !0,
        faction: ["Rebel Alliance", "Scum and Villainy"],
        ship: "HWK-290",
        modifier_func: function (a) {
            return a.attack = 3;
        }
    }, {
        name: "Outrider",
        id: 157,
        slot: "Title",
        points: 14,
        unique: !0,
        faction: "Rebel Alliance",
        ship: "YT-2400"
    }, {
        id: 158,
        skip: !0
    }, {
        name: "Punishing One",
        id: 159,
        slot: "Title",
        points: 5,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "JumpMaster 5000",
        unequips_upgrades: ["Crew"],
        also_occupies_upgrades: ["Crew"],
        confersAddons: [{
                type: "Upgrade",
                slot: "Astromech"
            }]
    }, {
        name: "Shadow Caster",
        id: 160,
        slot: "Title",
        points: 1,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Lancer-Class Pursuit Craft"
    }, {
        name: "Slave I",
        id: 161,
        slot: "Title",
        points: 6,
        unique: !0,
        faction: "Scum and Villainy",
        ship: "Firespray-31",
        confersAddons: [{
                type: "Upgrade",
                slot: "Torpedo"
            }]
    }, {
        name: "ST-321",
        id: 162,
        slot: "Title",
        points: 4,
        unique: !0,
        faction: "Galactic Empire",
        ship: "Lambda-Class Shuttle"
    }, {
        name: "Virago",
        id: 163,
        slot: "Title",
        points: 7,
        unique: !0,
        charge: 2,
        ship: "StarViper",
        modifier_func: function (a) {
            return a.shields += 1;
        },
        confersAddons: [{
                type: "Upgrade",
                slot: "Modification"
            }]
    }, {
        name: "Hull Upgrade",
        id: 164,
        slot: "Modification",
        pointsarray: [2, 3, 5, 7],
        variableagility: !0,
        modifier_func: function (a) {
            return a.hull += 1;
        }
    }, {
        name: "Shield Upgrade",
        id: 165,
        slot: "Modification",
        pointsarray: [3, 4, 6, 8],
        variableagility: !0,
        modifier_func: function (a) {
            return a.shields += 1;
        }
    }, {
        name: "Stealth Device",
        id: 166,
        slot: "Modification",
        pointsarray: [3, 4, 6, 8],
        variableagility: !0,
        charge: 1
    }, {
        name: "Phantom",
        id: 167,
        slot: "Title",
        points: 0,
        unique: !0,
        faction: "Rebel Alliance",
        ship: ["Attack Shuttle", "Sheathipede-Class Shuttle"]
    }, {
        id: 168,
        skip: !0
    }, {
        id: 169,
        skip: !0
    }, {
        id: 170,
        skip: !0
    }, {
        name: "Black One",
        id: 171,
        slot: "Title",
        unique: !0,
        charge: 1,
        points: 5,
        faction: "Resistance",
        ship: "T-70 X-Wing",
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Slam") < 0)
                return a.actions.push("Slam");
        }
    }, {
        name: "Heroic",
        id: 172,
        slot: "Talent",
        pointsarray: [1, 1, 1, 2],
        variableagility: !0,
        faction: "Resistance"
    }, {
        name: "Rose Tico",
        id: 173,
        slot: "Crew",
        points: 9,
        unique: !0,
        faction: "Resistance"
    }, {
        name: "Finn",
        id: 174,
        slot: "Gunner",
        points: 9,
        unique: !0,
        faction: "Resistance"
    }, {
        name: "Integrated S-Foils",
        id: 175,
        slot: "Configuration",
        points: 0,
        ship: "T-70 X-Wing",
        modifier_func: function (a) {
            return a.actions.push("Barrel Roll"), a.actions.push("*Focus"), a.actions.push("R-> Barrel Roll");
        }
    }, {
        name: "Integrated S-Foils (Open)",
        id: 176,
        skip: !0
    }, {
        name: "Targeting Synchronizer",
        id: 177,
        slot: "Tech",
        points: 4,
        restrictions: [
            ["Action", "Lock"]
        ]
    }, {
        name: "Primed Thrusters",
        id: 178,
        slot: "Tech",
        pointsarray: [4, 5, 6, 7, 8, 9, 10],
        variableinit: !0,
        restrictions: [
            ["Base", "Small"]
        ]
    }, {
        name: "Kylo Ren",
        id: 179,
        slot: "Crew",
        points: 11,
        force: 1,
        faction: "First Order",
        unique: !0,
        applies_condition: "I'll Show You the Dark Side",
        modifier_func: function (a) {
            return a.force += 1;
        }
    }, {
        name: "General Hux",
        id: 180,
        slot: "Crew",
        points: 6,
        unique: !0,
        faction: "First Order",
        restrictions: [
            ["Action", "Coordinate"]
        ]
    }, {
        name: "Fanatical",
        id: 181,
        slot: "Talent",
        points: 2,
        faction: "First Order"
    }, {
        name: "Special Forces Gunner",
        id: 182,
        slot: "Gunner",
        points: 9,
        faction: "First Order",
        ship: "TIE/SF Fighter"
    }, {
        name: "Captain Phasma",
        id: 183,
        slot: "Crew",
        unique: !0,
        points: 5,
        faction: "First Order"
    }, {
        name: "Supreme Leader Snoke",
        id: 184,
        slot: "Crew",
        unique: !0,
        points: 13,
        force: 1,
        faction: "First Order",
        restrictions: [
            ["Slot", "Crew"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot(b.slot);
        },
        also_occupies_upgrades: ["Crew"],
        modifier_func: function (a) {
            return a.force += 1;
        }
    }, {
        name: "Hyperspace Tracking Data",
        id: 185,
        slot: "Tech",
        faction: "First Order",
        points: 2,
        restrictions: [
            ["Base", "Large"]
        ]
    }, {
        name: "Advanced Optics",
        id: 186,
        slot: "Tech",
        points: 5
    }, {
        name: "Rey",
        id: 187,
        slot: "Gunner",
        xws: "rey-gunner",
        points: 13,
        unique: !0,
        force: 1,
        faction: "Resistance",
        modifier_func: function (a) {
            return a.force += 1;
        }
    }, {
        name: "Chewbacca (Resistance)",
        id: 188,
        slot: "Crew",
        xws: "chewbacca-crew-swz19",
        points: 4,
        charge: 2,
        unique: !0,
        faction: "Resistance"
    }, {
        name: "Paige Tico",
        id: 189,
        slot: "Gunner",
        points: 6,
        unique: !0,
        faction: "Resistance"
    }, {
        name: "R2-HA",
        id: 190,
        slot: "Astromech",
        points: 3,
        unique: !0,
        faction: "Resistance"
    }, {
        name: "C-3PO (Resistance)",
        canonical_name: "C-3PO",
        id: 191,
        slot: "Crew",
        xws: "c3po-crew",
        points: 5,
        unique: !0,
        faction: "Resistance",
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Calculate") < 0 && a.actions.push("Calculate"), __indexOf.call(a.actions, "R-Coordinate") < 0)
                return a.actions.push("R-Coordinate");
        }
    }, {
        name: "Han Solo (Resistance)",
        id: 192,
        slot: "Crew",
        xws: "hansolo-crew",
        points: 3,
        unique: !0,
        faction: "Resistance",
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "R-Evade") < 0)
                return a.actions.push("R-Evade");
        }
    }, {
        name: "Rey's Millennium Falcon",
        id: 193,
        slot: "Title",
        points: 2,
        unique: !0,
        ship: "Scavenged YT-1300",
        faction: "Resistance"
    }, {
        name: "Petty Officer Thanisson",
        id: 194,
        slot: "Crew",
        points: 4,
        unique: !0,
        faction: "First Order"
    }, {
        name: "BB-8",
        id: 195,
        slot: "Astromech",
        pointsarray: [2, 3, 4, 5, 6, 7, 8],
        variableinit: !0,
        charge: 2,
        unique: !0,
        faction: "Resistance"
    }, {
        name: "BB Astromech",
        id: 196,
        slot: "Astromech",
        pointsarray: [0, 1, 2, 3, 4, 5, 6],
        variableinit: !0,
        charge: 2,
        faction: "Resistance"
    }, {
        name: "M9-G8",
        id: 197,
        slot: "Astromech",
        points: 6,
        unique: !0,
        faction: "Resistance"
    }, {
        name: "Ferrosphere Paint",
        id: 198,
        slot: "Tech",
        points: 4,
        faction: "Resistance"
    }, {
        name: "Brilliant Evasion",
        id: 199,
        slot: "Force",
        points: 2
    }, {
        name: "Calibrated Laser Targeting",
        id: 200,
        slot: "Configuration",
        ship: "Delta-7 Aethersprite",
        pointsarray: [0, 0, 1, 2, 3, 4, 5],
        variableinit: !0,
        restrictions: [
            ["Slot", "Modification"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Modification");
        },
        also_occupies_upgrades: ["Modification"]
    }, {
        name: "Delta-7B",
        id: 201,
        slot: "Configuration",
        ship: "Delta-7 Aethersprite",
        pointsarray: [4, 4, 8, 12, 16, 20, 24],
        variableinit: !0,
        modifier_func: function (a) {
            return a.attack += 1, a.agility += -1, a.shields += 2;
        }
    }, {
        name: "Biohexacrypt Codes",
        id: 202,
        slot: "Tech",
        points: 1,
        faction: "First Order",
        restrictions: [
            ["Action", "Lock"]
        ]
    }, {
        name: "Predictive Shot",
        id: 203,
        slot: "Force",
        points: 1
    }, {
        name: "Hate",
        id: 204,
        slot: "Force",
        pointsarray: [3, 6, 9],
        variablebase: !0,
        restrictions: [
            ["Keyword", "Dark Side"]
        ]
    }, {
        name: "R5-X3",
        id: 205,
        unique: !0,
        slot: "Astromech",
        faction: "Resistance",
        charge: 2,
        points: 5
    }, {
        name: "Pattern Analyzer",
        id: 206,
        slot: "Tech",
        points: 5
    }, {
        name: "Impervium Plating",
        id: 207,
        ship: "Belbullab-22 Starfighter",
        charge: 2,
        slot: "Modification",
        points: 4
    }, {
        name: "Grappling Struts",
        id: 208,
        ship: "Vulture-class Droid Fighter",
        slot: "Configuration",
        points: 1
    }, {
        name: "Energy-Shell Charges",
        id: 209,
        faction: "Separatist Alliance",
        slot: "Missile",
        attack: 3,
        range: "2-3",
        rangebonus: !0,
        charge: 1,
        points: 5,
        restrictions: [
            ["Action", "Calculate"]
        ]
    }, {
        name: "Dedicated",
        id: 210,
        faction: "Galactic Republic",
        slot: "Talent",
        points: 1,
        restrictions: [
            ["isUnique", !1]
        ]
    }, {
        name: "Synchronized Console",
        id: 211,
        faction: "Galactic Republic",
        slot: "Modification",
        points: 1,
        restrictions: [
            ["Action", "Lock"]
        ]
    }, {
        name: "Battle Meditation",
        id: 212,
        faction: "Galactic Republic",
        slot: "Force",
        pointsarray: [3, 3, 3, 3, 4, 6, 8],
        variableinit: !0,
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "F-Coordinate") < 0)
                return a.actions.push("F-Coordinate");
        }
    }, {
        name: "R4-P Astromech",
        id: 213,
        faction: "Galactic Republic",
        slot: "Astromech",
        charge: 2,
        points: 2
    }, {
        name: "R4-P17",
        id: 214,
        unique: !0,
        faction: "Galactic Republic",
        slot: "Astromech",
        charge: 2,
        points: 5
    }, {
        name: "Spare Parts Canisters",
        id: 215,
        slot: "Modification",
        charge: 1,
        points: 4,
        restrictions: [
            ["Equipped", "Astromech"]
        ]
    }, {
        name: "Scimitar",
        id: 216,
        unique: !0,
        ship: "Sith Infiltrator",
        slot: "Title",
        faction: "Separatist Alliance",
        points: 4,
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "R-Cloak") < 0 && a.actions.push("R-Cloak"), __indexOf.call(a.actions, "Jam") < 0)
                return a.actions.push("Jam");
        }
    }, {
        name: "Chancellor Palpatine",
        id: 217,
        unique: !0,
        slot: "Crew",
        faction: ["Galactic Republic", "Separatist Alliance"],
        force: 1,
        points: 14,
        modifier_func: function (a) {
            if (a.force += 1, __indexOf.call(a.actions, "F-Coordinate") < 0)
                return a.actions.push("F-Coordinate");
        }
    }, {
        name: "Count Dooku",
        id: 218,
        unique: !0,
        slot: "Crew",
        force: 1,
        faction: "Separatist Alliance",
        points: 10,
        modifier_func: function (a) {
            return a.force += 1;
        }
    }, {
        name: "General Grievous",
        id: 219,
        unique: !0,
        slot: "Crew",
        charge: 1,
        faction: "Separatist Alliance",
        points: 3
    }, {
        name: "K2-B4",
        id: 220,
        unique: !0,
        solitary: !0,
        slot: "Tactical Relay",
        faction: "Separatist Alliance",
        points: 5
    }, {
        name: "DRK-1 Probe Droids",
        id: 221,
        slot: "Device",
        unique: !0,
        faction: "Separatist Alliance",
        charge: 2,
        points: 5,
        applies_condition: "DRK-1 Probe Droid"
    }, {
        name: "Kraken",
        id: 222,
        unique: !0,
        slot: "Tactical Relay",
        solitary: !0,
        faction: "Separatist Alliance",
        points: 11,
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Calculate") < 0)
                return a.actions.push("Calculate");
        }
    }, {
        name: "TV-94",
        id: 223,
        unique: !0,
        solitary: !0,
        slot: "Tactical Relay",
        faction: "Separatist Alliance",
        points: 5
    }, {
        name: "Discord Missiles",
        id: 224,
        slot: "Missile",
        faction: "Separatist Alliance",
        charge: 1,
        max_per_squad: 3,
        points: 4,
        applies_condition: "Buzz Droid Swarm"
    }, {
        name: "Clone Commander Cody",
        id: 225,
        unique: !0,
        slot: "Gunner",
        faction: "Galactic Republic",
        points: 4
    }, {
        name: "R4-P44",
        id: 226,
        unique: !0,
        faction: "Galactic Republic",
        slot: "Astromech",
        points: 3
    }, {
        name: "Seventh Fleet Gunner",
        id: 227,
        charge: 1,
        slot: "Gunner",
        faction: "Galactic Republic",
        points: 9
    }, {
        name: "Treacherous",
        id: 228,
        charge: 1,
        slot: "Talent",
        faction: "Separatist Alliance",
        points: 2
    }, {
        name: "Soulless One",
        id: 229,
        slot: "Title",
        unique: !0,
        ship: "Belbullab-22 Starfighter",
        faction: "Separatist Alliance",
        points: 6,
        modifier_func: function (a) {
            return a.hull += 2;
        }
    }, {
        name: "GA-97",
        id: 230,
        slot: "Crew",
        points: 6,
        charge: 5,
        recurring: 1,
        faction: "Resistance",
        unique: !0,
        modifier_func: function (a) {
            return __indexOf.call(a.actions, "Calculate") < 0 && a.actions.push("Calculate"), {
                applies_condition: "It's the Resistance"
            };
        }
    }, {
        name: "Kaydel Connix",
        id: 231,
        slot: "Crew",
        points: 5,
        faction: "Resistance",
        unique: !0
    }, {
        name: "Autoblasters",
        id: 232,
        slot: "Cannon",
        points: 3,
        attack: 2,
        range: "1-2"
    }, {
        name: "R2-C4",
        id: 233,
        unique: !0,
        slot: "Astromech",
        points: 5,
        faction: "Galactic Republic"
    }, {
        name: "Plasma Torpedoes",
        id: 234,
        slot: "Torpedo",
        points: 7,
        attack: 3,
        range: "2-3",
        rangebonus: !0,
        charge: 2
    }, {
        name: "Electro-Proton Bomb",
        id: 235,
        unique: !0,
        slot: "Device",
        points: 10,
        charge: 1,
        restrictions: [
            ["Action", "Reload"],
            ["Slot", "Modification"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Modification");
        },
        also_occupies_upgrades: ["Modification"],
        applies_condition: "Electro-Proton Bomb"
    }, {
        name: "Delayed Fuses",
        id: 236,
        slot: "Modification",
        points: 1
    }, {
        name: "Landing Struts",
        id: 237,
        ship: "Hyena-Class Droid Bomber",
        slot: "Configuration",
        points: 1
    }, {
        name: "Diamond-Boron Missiles",
        id: 238,
        unique: !0,
        slot: "Missile",
        points: 5,
        attack: 3,
        range: "2-3",
        rangebonus: !0,
        charge: 3,
        restrictions: [
            ["Slot", "Missile"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot(b.slot);
        },
        also_occupies_upgrades: ["Missile"]
    }, {
        name: "TA-175",
        id: 239,
        unique: !0,
        slot: "Tactical Relay",
        solitary: !0,
        faction: "Separatist Alliance",
        points: 11
    }, {
        name: "Passive Sensors",
        id: 240,
        slot: "Sensor",
        charge: 1,
        recurring: 1,
        pointsarray: [2, 2, 2, 2, 2, 4, 6, 8, 10],
        variableinit: !0
    }, {
        name: "R2-A6",
        id: 241,
        unique: !0,
        slot: "Astromech",
        faction: "Galactic Republic",
        points: 6
    }, {
        name: "Amilyn Holdo",
        id: 242,
        unique: !0,
        slot: "Crew",
        faction: "Resistance",
        points: 8
    }, {
        name: "Larma D'Acy",
        id: 243,
        unique: !0,
        slot: "Crew",
        faction: "Resistance",
        points: 4
    }, {
        name: "Leia Organa (Resistance)",
        id: 244,
        xws: "leiaorgana-resistance",
        unique: !0,
        slot: "Crew",
        faction: "Resistance",
        force: 1,
        points: 17,
        restrictions: [
            ["Slot", "Crew"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot(b.slot);
        },
        also_occupies_upgrades: ["Crew"],
        modifier_func: function (a) {
            if (a.force += 1, __indexOf.call(a.actions, "F-Coordinate") < 0)
                return a.actions.push("F-Coordinate");
        }
    }, {
        name: "Korr Sella",
        id: 245,
        unique: !0,
        slot: "Crew",
        faction: "Resistance",
        points: 6
    }, {
        name: "PZ-4CO",
        id: 246,
        unique: !0,
        slot: "Crew",
        faction: "Resistance",
        points: 5,
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Calculate") < 0)
                return a.actions.push("Calculate");
        }
    }, {
        name: "Angled Deflectors",
        id: 247,
        slot: "Modification",
        pointsarray: [6, 3, 1, 1],
        variableagility: !0,
        restrictions: [
            ["ShieldsGreaterThan", 0],
            ["Base", "Small or Medium"]
        ],
        modifier_func: function (a) {
            if (a.shields -= 1, __indexOf.call(a.actions, "Reinforce") < 0)
                return a.actions.push("Reinforce");
        }
    }, {
        name: "Ensnare",
        id: 248,
        slot: "Talent",
        pointsarray: [19, 19, 19, 19, 19, 21, 24],
        variableinit: !0,
        ship: "Nantex-Class Starfighter"
    }, {
        name: "Targeting Computer",
        id: 249,
        slot: "Modification",
        points: 3,
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Lock") < 0)
                return a.actions.push("Lock");
        }
    }, {
        name: "Precognitive Reflexes",
        id: 250,
        slot: "Force",
        pointsarray: [3, 3, 3, 4, 7, 10, 13],
        variableinit: !0,
        restrictions: [
            ["Base", "Small"]
        ]
    }, {
        name: "Foresight",
        slot: "Force",
        points: 4,
        id: 251,
        attackbull: 2,
        range: "1-3",
        rangebonus: !0
    }, {
        name: "C1-10P",
        id: 252,
        unique: !0,
        slot: "Astromech",
        charge: 2,
        points: 8,
        faction: "Galactic Republic"
    }, {
        name: "Ahsoka Tano",
        id: 253,
        unique: !0,
        slot: "Gunner",
        points: 12,
        faction: "Galactic Republic",
        force: 1,
        modifier_func: function (a) {
            return a.force += 1;
        }
    }, {
        name: "C-3PO (Republic)",
        canonical_name: "C-3PO",
        id: 254,
        unique: !0,
        slot: "Crew",
        xws: "c3po-republic",
        points: 8,
        faction: "Galactic Republic",
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Calculate") < 0)
                return a.actions.push("Calculate");
        }
    }, {
        name: "Gravitic Deflection",
        id: 255,
        slot: "Talent",
        points: 4,
        ship: "Nantex-Class Starfighter"
    }, {
        name: "Snap Shot",
        id: 256,
        slot: "Talent",
        pointsarray: [7, 8, 9, 10],
        variablebase: !0,
        attack: 2,
        range: "2",
        rangebonus: !0
    }, {
        name: "Agent of the Empire",
        id: 257,
        unique: !0,
        faction: "Galactic Empire",
        slot: "Command",
        points: 4,
        ship: ["TIE Advanced", "TIE Advanced Prototype"],
        restrictions: [
            ["Base", "Small"]
        ]
    }, {
        name: "First Order Elite",
        id: 258,
        unique: !0,
        faction: "First Order",
        slot: "Command",
        ship: ["TIE/SF Fighter", "TIE/VN Silencer"],
        points: 4,
        restrictions: [
            ["Base", "Small"]
        ]
    }, {
        name: "Veteran Wing Leader",
        id: 259,
        slot: "Command",
        points: 2,
        restrictions: [
            ["Base", "Small"]
        ]
    }, {
        name: "Dreadnought Hunter",
        id: 260,
        slot: "Command",
        points: 6,
        max_per_squad: 2,
        restrictions: [
            ["Base", "Small"],
            ["InitiativeGreaterThan", 3]
        ]
    }, {
        name: "Admiral Ozzel",
        id: 261,
        unique: !0,
        slot: "Command",
        points: 6,
        faction: "Galactic Empire",
        restrictions: [
            ["Slot", "Crew"],
            ["Base", "Huge"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Crew");
        },
        also_occupies_upgrades: ["Crew"]
    }, {
        name: "Azmorigan",
        id: 262,
        unique: !0,
        slot: "Command",
        points: 4,
        faction: "Scum and Villainy",
        restrictions: [
            ["Slot", "Crew"],
            ["Base", "Huge"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Crew");
        },
        also_occupies_upgrades: ["Crew"]
    }, {
        name: "Captain Needa",
        id: 263,
        unique: !0,
        faction: "Galactic Empire",
        slot: "Command",
        points: 8,
        charge: 4,
        restrictions: [
            ["Slot", "Crew"],
            ["Base", "Huge"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Crew");
        },
        also_occupies_upgrades: ["Crew"]
    }, {
        name: "Carlist Rieekan",
        id: 264,
        unique: !0,
        faction: "Rebel Alliance",
        slot: "Command",
        points: 6,
        restrictions: [
            ["Slot", "Crew"],
            ["Base", "Huge"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Crew");
        },
        also_occupies_upgrades: ["Crew"]
    }, {
        name: "Jan Dodonna",
        id: 265,
        unique: !0,
        faction: "Rebel Alliance",
        slot: "Command",
        points: 4,
        restrictions: [
            ["Slot", "Crew"],
            ["Base", "Huge"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Crew");
        },
        also_occupies_upgrades: ["Crew"]
    }, {
        name: "Raymus Antilles",
        id: 266,
        unique: !0,
        slot: "Command",
        points: 12,
        faction: "Rebel Alliance",
        restrictions: [
            ["Slot", "Crew"],
            ["Base", "Huge"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Crew");
        },
        also_occupies_upgrades: ["Crew"]
    }, {
        name: "Stalwart Captain",
        id: 267,
        unique: !0,
        slot: "Command",
        points: 6,
        restrictions: [
            ["Slot", "Crew"],
            ["Base", "Huge"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Crew");
        },
        also_occupies_upgrades: ["Crew"]
    }, {
        name: "Strategic Commander",
        id: 268,
        unique: !0,
        slot: "Command",
        charge: 3,
        points: 6,
        restrictions: [
            ["Slot", "Crew"],
            ["Base", "Huge"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Crew");
        },
        also_occupies_upgrades: ["Crew"]
    }, {
        name: "Ion Cannon Battery",
        id: 269,
        slot: "Hardpoint",
        points: 5,
        attackt: 4,
        range: "2-4",
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Rotate Arc") < 0)
                return a.actions.push("Rotate Arc");
        }
    }, {
        name: "Targeting Battery",
        id: 270,
        slot: "Hardpoint",
        points: 6,
        attackt: 3,
        range: "2-5",
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Rotate Arc") < 0)
                return a.actions.push("Rotate Arc");
        }
    }, {
        name: "Ordnance Tubes",
        id: 271,
        slot: "Hardpoint",
        points: 1
    }, {
        name: "Point-Defense Battery",
        id: 272,
        slot: "Hardpoint",
        points: 9,
        attackdt: 2,
        range: "1-2",
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Rotate Arc") < 0)
                return a.actions.push("Rotate Arc");
        }
    }, {
        name: "Turbolaser Battery",
        id: 273,
        slot: "Hardpoint",
        points: 13,
        attackt: 3,
        range: "3-5",
        restrictions: [
            ["EnergyGreaterThan", 4]
        ],
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Rotate Arc") < 0)
                return a.actions.push("Rotate Arc");
        }
    }, {
        name: "Toryn Farr",
        id: 274,
        unique: !0,
        faction: "Rebel Alliance",
        slot: "Crew",
        points: 4,
        restrictions: [
            ["Base", "Huge"]
        ],
        modifier_func: function (a) {
            return a.actions.push("*Lock"), a.actions.push("R-> Coordinate");
        }
    }, {
        name: "Bombardment Specialists",
        id: 275,
        slot: "Team",
        points: 6,
        modifier_func: function (a) {
            return a.actions.push("*Lock"), a.actions.push("> Calculate");
        }
    }, {
        name: "Comms Team",
        id: 276,
        slot: "Team",
        points: 8,
        modifier_func: function (a) {
            return a.actions.push("*Coordinate"), a.actions.push("> Calculate"), a.actions.push("*Jam"), a.actions.push("> Calculate");
        }
    }, {
        name: "Damage Control Team",
        id: 277,
        slot: "Team",
        points: 3,
        modifier_func: function (a) {
            return a.actions.push("*Reinforce"), a.actions.push("> Calculate");
        }
    }, {
        name: "Gunnery Specialists",
        id: 278,
        slot: "Team",
        points: 8,
        modifier_func: function (a) {
            return a.actions.push("*Rotate Arc"), a.actions.push("> Calculate");
        }
    }, {
        name: "IG-RM Droids",
        id: 279,
        slot: "Team",
        faction: "Scum and Villainy",
        points: 2,
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Calculate") < 0)
                return a.actions.push("Calculate");
        }
    }, {
        name: "Ordnance Team",
        id: 280,
        slot: "Team",
        points: 4,
        modifier_func: function (a) {
            return a.actions.push("*Reload"), a.actions.push("> Calculate");
        }
    }, {
        name: "Sensor Experts",
        id: 281,
        slot: "Team",
        points: 10,
        modifier_func: function (a) {
            return a.actions.push("*Lock"), a.actions.push("> Calculate");
        }
    }, {
        name: "Adaptive Shields",
        id: 282,
        slot: "Cargo",
        points: 10
    }, {
        name: "Boosted Scanners",
        id: 283,
        slot: "Cargo",
        points: 8
    }, {
        id: 284,
        skip: !0
    }, {
        name: "Tibanna Reserves",
        id: 285,
        slot: "Cargo",
        points: 3,
        charge: 3
    }, {
        name: "Optimized Power Core",
        id: 286,
        slot: "Cargo",
        points: 6
    }, {
        name: "Quick-Release Locks",
        id: 287,
        slot: "Illicit",
        charge: 2,
        points: 5,
        restrictions: [
            ["Base", "Huge"]
        ]
    }, {
        name: "Saboteur's Map",
        id: 288,
        slot: "Illicit",
        points: 3,
        restrictions: [
            ["Base", "Huge"]
        ]
    }, {
        name: "Scanner Baffler",
        id: 289,
        slot: "Illicit",
        points: 8,
        restrictions: [
            ["Base", "Huge"]
        ]
    }, {
        name: "Dodonna's Pride",
        id: 290,
        slot: "Title",
        unique: !0,
        ship: "CR90 Corellian Corvette",
        faction: "Rebel Alliance",
        points: 8,
        modifier_func: function (a) {
            return a.shields -= 2, a.actions.push("*Evade"), a.actions.push("R-> Coordinate"), a.actions.push("*Focus"), a.actions.push("R-> Coordinate");
        },
        confersAddons: [{
                type: "Upgrade",
                slot: "Team"
            }, {
                type: "Upgrade",
                slot: "Cargo"
            }]
    }, {
        name: "Jaina's Light",
        id: 291,
        slot: "Title",
        unique: !0,
        ship: "CR90 Corellian Corvette",
        faction: "Rebel Alliance",
        points: 6,
        modifier_func: function (a) {
            return a.shields += 1, a.energy -= 1;
        }
    }, {
        name: "Liberator",
        id: 292,
        slot: "Title",
        unique: !0,
        ship: "CR90 Corellian Corvette",
        faction: "Rebel Alliance",
        points: 5,
        modifier_func: function (a) {
            return a.energy += 1;
        }
    }, {
        name: "Tantive IV",
        id: 293,
        slot: "Title",
        unique: !0,
        ship: "CR90 Corellian Corvette",
        faction: "Rebel Alliance",
        points: 6,
        confersAddons: [{
                type: "Upgrade",
                slot: "Crew"
            }, {
                type: "Upgrade",
                slot: "Crew"
            }]
    }, {
        name: "Bright Hope",
        id: 294,
        slot: "Title",
        unique: !0,
        ship: "GR-75 Medium Transport",
        faction: "Rebel Alliance",
        points: 5
    }, {
        name: "Luminous",
        id: 295,
        slot: "Title",
        unique: !0,
        ship: "GR-75 Medium Transport",
        faction: "Rebel Alliance",
        points: 12,
        modifier_func: function (a) {
            return a.shields -= 1, a.energy += 2;
        }
    }, {
        name: "Quantum Storm",
        id: 296,
        slot: "Title",
        unique: !0,
        ship: "GR-75 Medium Transport",
        faction: "Rebel Alliance",
        points: 3,
        modifier_func: function (a) {
            return a.energy += 1;
        },
        confersAddons: [{
                type: "Upgrade",
                slot: "Team"
            }, {
                type: "Upgrade",
                slot: "Cargo"
            }]
    }, {
        name: "Assailer",
        id: 297,
        slot: "Title",
        unique: !0,
        ship: "Raider-class Corvette",
        faction: "Galactic Empire",
        points: 7,
        modifier_func: function (a) {
            return a.shields -= 2, a.hull += 2;
        },
        confersAddons: [{
                type: "Upgrade",
                slot: "Gunner"
            }]
    }, {
        name: "Corvus",
        id: 298,
        slot: "Title",
        unique: !0,
        ship: "Raider-class Corvette",
        faction: "Galactic Empire",
        points: 3
    }, {
        name: "Impetuous",
        id: 299,
        slot: "Title",
        unique: !0,
        ship: "Raider-class Corvette",
        faction: "Galactic Empire",
        points: 4,
        modifier_func: function (a) {
            return a.shields -= 2, a.energy += 2;
        },
        confersAddons: [{
                type: "Upgrade",
                slot: "Crew"
            }]
    }, {
        name: "Instigator",
        id: 300,
        slot: "Title",
        unique: !0,
        ship: "Raider-class Corvette",
        faction: "Galactic Empire",
        points: 6,
        confersAddons: [{
                type: "Upgrade",
                slot: "Team"
            }]
    }, {
        name: "Blood Crow",
        id: 301,
        slot: "Title",
        unique: !0,
        ship: "Gozanti-class Cruiser",
        faction: "Galactic Empire",
        points: 5,
        modifier_func: function (a) {
            return a.shields -= 1, a.energy += 2;
        },
        confersAddons: [{
                type: "Upgrade",
                slot: "Gunner"
            }]
    }, {
        name: "Requiem",
        id: 302,
        slot: "Title",
        unique: !0,
        ship: "Gozanti-class Cruiser",
        faction: "Galactic Empire",
        points: 7,
        modifier_func: function (a) {
            return a.hull -= 1, a.energy += 1;
        }
    }, {
        name: "Suppressor",
        id: 303,
        slot: "Title",
        unique: !0,
        ship: "Gozanti-class Cruiser",
        faction: "Galactic Empire",
        points: 6,
        modifier_func: function (a) {
            return a.shields += 2, a.hull -= 2;
        },
        confersAddons: [{
                type: "Upgrade",
                slot: "Sensor"
            }]
    }, {
        name: "Vector",
        id: 304,
        slot: "Title",
        unique: !0,
        ship: "Gozanti-class Cruiser",
        faction: "Galactic Empire",
        points: 8,
        confersAddons: [{
                type: "Upgrade",
                slot: "Crew"
            }, {
                type: "Upgrade",
                slot: "Cargo"
            }]
    }, {
        name: "Broken Horn",
        id: 305,
        slot: "Title",
        unique: !0,
        ship: "C-ROC Cruiser",
        faction: "Scum and Villainy",
        points: 4,
        confersAddons: [{
                type: "Upgrade",
                slot: "Crew"
            }, {
                type: "Upgrade",
                slot: "Illicit"
            }]
    }, {
        name: "Merchant One",
        id: 306,
        slot: "Title",
        unique: !0,
        ship: "C-ROC Cruiser",
        faction: "Scum and Villainy",
        points: 8,
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "R-Evade") < 0 && a.actions.push("R-Evade"), __indexOf.call(a.actions, "Coordinate") < 0)
                return a.actions.push("Coordinate");
        },
        confersAddons: [{
                type: "Upgrade",
                slot: "Turret"
            }, {
                type: "Upgrade",
                slot: "Team"
            }, {
                type: "Upgrade",
                slot: "Cargo"
            }]
    }, {
        name: "Insatiable Worrt",
        id: 307,
        slot: "Title",
        unique: !0,
        ship: "C-ROC Cruiser",
        faction: "Scum and Villainy",
        points: 7,
        modifier_func: function (a) {
            return a.hull += 3, a.shields -= 1, a.energy -= 1;
        },
        confersAddons: [{
                type: "Upgrade",
                slot: "Cargo"
            }]
    }, {
        name: "Corsair Refit",
        id: 308,
        slot: "Configuration",
        ship: "C-ROC Cruiser",
        max_per_squad: 2,
        points: 15,
        modifier_func: function (a) {
            return a.hull += 2, a.shields -= 2, a.energy += 1;
        },
        confersAddons: [{
                type: "Upgrade",
                slot: "Cannon"
            }, {
                type: "Upgrade",
                slot: "Turret"
            }, {
                type: "Upgrade",
                slot: "Missile"
            }]
    }, {
        name: "Thunderstrike",
        id: 309,
        slot: "Title",
        unique: !0,
        ship: "CR90 Corellian Corvette",
        faction: "Rebel Alliance",
        points: 4,
        modifier_func: function (a) {
            return a.hull += 3, a.shields -= 3;
        },
        confersAddons: [{
                type: "Upgrade",
                slot: "Gunner"
            }]
    }, {
        name: "Coaxium Hyperfuel",
        id: 310,
        slot: "Illicit",
        points: 1,
        restrictions: [
            ["Action", "Slam"]
        ]
    }, {
        name: "Mag-Pulse Warheads",
        id: 311,
        slot: "Missile",
        points: 5,
        attack: 3,
        range: "1-3",
        rangebonus: !0,
        charge: 2
    }, {
        name: "R1-J5",
        id: 312,
        slot: "Astromech",
        faction: "Resistance",
        unique: !0,
        points: 5,
        charge: 3
    }, {
        name: "Stabilized S-Foils",
        id: 313,
        slot: "Configuration",
        ship: "B-Wing",
        points: 2,
        modifier_func: function (a) {
            return a.actions.push("*Barrel Roll"), a.actions.push("R-> Evade"), a.actions.push("*Barrel Roll"), a.actions.push("R-> Lock"), a.actions.push("R-Reload");
        }
    }, {
        name: "K-2SO",
        id: 314,
        slot: "Crew",
        faction: "Rebel Alliance",
        unique: !0,
        points: 7,
        modifier_func: function (a) {
            return a.actions.push("Calculate"), a.actions.push("Jam");
        }
    }, {
        name: "Kaz's Fireball",
        id: 315,
        slot: "Title",
        ship: "Fireball",
        faction: "Resistance",
        unique: !0,
        points: 2
    }, {
        name: "Cluster Mines",
        id: 316,
        slot: "Device",
        charge: 1,
        points: 7,
        applies_condition: "Cluster Mine"
    }, {
        name: "Ion Bombs",
        id: 317,
        slot: "Device",
        points: 3,
        charge: 2,
        applies_condition: "Ion Bomb"
    }, {
        name: "Deuterium Power Cells",
        id: 318,
        slot: "Tech",
        points: 9,
        charge: 2,
        faction: "First Order",
        restrictions: [
            ["Slot", "Modification"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Modification");
        },
        also_occupies_upgrades: ["Modification"]
    }, {
        name: "Proud Tradition",
        id: 319,
        slot: "Talent",
        faction: "First Order",
        points: 2
    }, {
        name: "Commander Pyre",
        id: 320,
        slot: "Crew",
        unique: !0,
        faction: "First Order",
        points: 5
    }, {
        name: "Clone Captain Rex",
        id: 321,
        slot: "Gunner",
        unique: !0,
        faction: "Galactic Republic",
        points: 2
    }, {
        name: "Yoda",
        id: 322,
        slot: "Crew",
        unique: !0,
        force: 2,
        faction: "Galactic Republic",
        points: 15,
        modifier_func: function (a) {
            if (a.force += 2, __indexOf.call(a.actions, "F-Coordinate") < 0)
                return a.actions.push("F-Coordinate");
        }
    }, {
        name: "Repulsorlift Stabilizers",
        id: 323,
        slot: "Configuration",
        ship: "HMP Droid Gunship",
        faction: "Separatist Alliance",
        points: 3
    }, {
        name: "Agent Terex",
        id: 324,
        slot: "Crew",
        unique: !0,
        faction: "First Order",
        points: 7
    }, {
        name: "Plo Koon",
        id: 325,
        slot: "Crew",
        unique: !0,
        force: 1,
        faction: "Galactic Republic",
        points: 10,
        modifier_func: function (a) {
            if (a.force += 1, __indexOf.call(a.actions, "F-Reinforce") < 0)
                return a.actions.push("F-Reinforce");
        }
    }, {
        name: "Multi-Missile Pods",
        id: 326,
        slot: "Missile",
        points: 6,
        attackf: 2,
        range: "1-2",
        rangebonus: !0,
        charge: 5,
        restrictions: [
            ["Slot", "Missile"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot(b.slot);
        },
        also_occupies_upgrades: ["Missile"]
    }, {
        name: "Kit Fisto",
        id: 327,
        slot: "Crew",
        unique: !0,
        force: 1,
        faction: "Galactic Republic",
        points: 9,
        modifier_func: function (a) {
            if (a.force += 1, __indexOf.call(a.actions, "F-Evade") < 0)
                return a.actions.push("F-Evade");
        }
    }, {
        name: "Aayla Secura",
        id: 328,
        slot: "Crew",
        unique: !0,
        force: 1,
        faction: "Galactic Republic",
        points: 16,
        modifier_func: function (a) {
            return a.force += 1, a.actions.push("*Focus"), a.actions.push("> F-Coordinate");
        }
    }, {
        name: "Maneuver-Assist MGK-300",
        id: 329,
        slot: "Configuration",
        ship: "TIE/rb Heavy",
        faction: "Galactic Empire",
        points: 2,
        modifier_func: function (a) {
            var b, c, d;
            if (a.actions.push("Calculate"), a.actions.push("*Barrel Roll"), a.actions.push("*R-> Calculate"), null != a.maneuvers[3]) {
                for (d = [], b = c = 1; c < 4; b = ++c)
                    a.maneuvers[3][b] > 1 ? d.push(a.maneuvers[3][b]--) : d.push(void 0);
                return d;
            }
        }
    }, {
        name: "Ion Limiter Override",
        id: 330,
        slot: "Talent",
        points: 3,
        restrictions: [
            ["Keyword", "TIE"]
        ]
    }, {
        name: "Marg Sabl Closure",
        id: 331,
        slot: "Talent",
        points: 1,
        restrictions: [
            ["Base", "Small or Medium"]
        ]
    }, {
        name: "XX-23 S-Thread Tracers",
        id: 332,
        slot: "Missile",
        attack: 3,
        range: "1-3",
        rangebonus: !0,
        max_per_squad: 2,
        charge: 2,
        points: 2
    }, {
        name: "Hondo Ohnaka",
        id: 333,
        unique: !0,
        slot: "Crew",
        points: 6
    }, {
        name: "Boba Fett (Separatist)",
        canonical_name: "Boba Fett",
        xws: "bobafett-gunner",
        id: 334,
        slot: "Gunner",
        unique: !0,
        points: 6,
        faction: ["Scum and Villainy", "Separatist Alliance"]
    }, {
        name: "Jango Fett",
        id: 335,
        slot: "Crew",
        unique: !0,
        faction: ["Scum and Villainy", "Separatist Alliance"],
        points: 7
    }, {
        name: "Zam Wesell",
        id: 336,
        slot: "Crew",
        unique: !0,
        charge: 2,
        faction: ["Scum and Villainy", "Separatist Alliance"],
        points: 4,
        applies_condition: ["You'd Better Mean Business", "You Should Thank Me"]
    }, {
        name: 'Alpha-3B "Besh"',
        id: 337,
        slot: "Configuration",
        ship: "Nimbus-class V-Wing",
        points: 2,
        confersAddons: [{
                type: "Upgrade",
                slot: "Device"
            }]
    }, {
        name: "Precision Ion Engines",
        id: 338,
        slot: "Modification",
        points: 3,
        charge: 2,
        restrictions: [
            ["Keyword", "TIE"],
            ["AgilityEquals", 3]
        ]
    }, {
        name: "Thermal Detonators",
        id: 339,
        slot: "Device",
        charge: 4,
        points: 3,
        applies_condition: "Thermal Detonator"
    }, {
        name: "R2-D2 (Republic)",
        canonical_name: "R2-D2",
        id: 340,
        charge: 2,
        unique: !0,
        faction: "Galactic Republic",
        slot: "Astromech",
        pointsarray: [4, 6, 8, 10],
        variableagility: !0
    }, {
        name: "Extreme Maneuvers",
        id: 341,
        points: 4,
        slot: "Force",
        restrictions: [
            ["Action", "Boost"],
            ["Base", "Small"]
        ]
    }, {
        name: "Patience",
        id: 342,
        slot: "Force",
        points: 2,
        restrictions: [
            ["Keyword", "Light Side"]
        ]
    }, {
        name: "Deadeye Shot",
        id: 343,
        slot: "Talent",
        points: 1,
        restrictions: [
            ["Base", "Small or Medium"]
        ]
    }, {
        name: "Starbird Slash",
        id: 344,
        slot: "Talent",
        points: 1,
        restrictions: [
            ["Keyword", "A-Wing"]
        ]
    }, {
        name: "Overdrive Thruster",
        id: 345,
        ship: "T-70 X-Wing",
        unique: !0,
        slot: "Modification",
        pointsarray: [2, 3, 4, 5, 6, 7, 8],
        variableinit: !0
    }, {
        name: '"Fives"',
        id: 346,
        unique: !0,
        faction: "Galactic Republic",
        slot: "Crew",
        points: 3
    }, {
        name: "Commander Malarus",
        id: 347,
        unique: !0,
        faction: "First Order",
        slot: "Crew",
        points: 7
    }, {
        name: "Automated Target Priority",
        id: 348,
        slot: "Tech",
        points: 1,
        restrictions: [
            ["InitiativeLessThan", 4]
        ]
    }, {
        name: "Sensor Buoy Suite",
        id: 349,
        faction: "First Order",
        unique: !0,
        slot: "Tech",
        points: 4,
        restrictions: [
            ["Base", "Medium or Large"]
        ],
        applies_condition: "Sensor Buoy"
    }, {
        name: "Suppressive Gunner",
        id: 350,
        slot: "Gunner",
        pointsarray: [8, 7, 6, 5],
        variablebase: !0
    }, {
        name: "Ghost Company",
        id: 351,
        faction: "Galactic Republic",
        unique: !0,
        slot: "Crew",
        points: 5,
        restrictions: [
            ["Action", "Rotate Arc"],
            ["Slot", "Gunner"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Gunner");
        },
        also_occupies_upgrades: ["Gunner"],
        modifier_func: function (a) {
            return a.actions.push("*Rotate Arc"), a.actions.push("R-> Focus");
        }
    }, {
        name: "Wolfpack",
        id: 352,
        faction: "Galactic Republic",
        unique: !0,
        slot: "Crew",
        points: 4,
        restrictions: [
            ["Slot", "Gunner"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Gunner");
        },
        also_occupies_upgrades: ["Gunner"]
    }, {
        name: "Kalani",
        id: 353,
        charge: 3,
        unique: !0,
        recurring: 1,
        slot: "Tactical Relay",
        solitary: !0,
        faction: "Separatist Alliance",
        points: 5,
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Calculate") < 0)
                return a.actions.push("Calculate");
        }
    }, {
        name: "Synced Laser Cannons",
        id: 354,
        slot: "Cannon",
        points: 6,
        attack: 3,
        range: "2-3",
        restrictions: [
            ["Slot", "Cannon"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot(b.slot);
        },
        also_occupies_upgrades: ["Cannon"]
    }, {
        name: "Concussion Bombs",
        id: 355,
        slot: "Device",
        charge: 3,
        points: 4,
        applies_condition: "Concussion Bomb"
    }, {
        name: "Target-Assist MGK-300",
        id: 356,
        slot: "Configuration",
        ship: "TIE/rb Heavy",
        faction: "Galactic Empire",
        points: 3,
        modifier_func: function (a) {
            return a.actions.push("Calculate"), a.actions.push("*Rotate Arc"), a.actions.push("> Calculate");
        }
    }, {
        name: "Backwards Tailslide",
        id: 357,
        slot: "Talent",
        points: 2,
        restrictions: [
            ["Keyword", "X-Wing"],
            ["Equipped", "Configuration"]
        ]
    }, {
        name: "R2-D2 (Resistance)",
        canonical_name: "R2-D2",
        id: 358,
        slot: "Astromech",
        points: 6,
        unique: !0,
        charge: 4,
        faction: "Resistance"
    }, {
        name: "R6-D8",
        id: 359,
        points: 4,
        unique: !0,
        slot: "Astromech",
        faction: "Resistance"
    }, {
        name: "Underslung Blaster Cannon",
        id: 360,
        points: 3,
        slot: "Cannon",
        attackt: 2,
        range: "1",
        rangebonus: !0,
        faction: "Resistance",
        restrictions: [
            ["Keyword", "X-Wing"]
        ],
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "Rotate Arc") < 0)
                return a.actions.push("Rotate Arc");
        }
    }, {
        name: "Jedi Commander",
        id: 361,
        points: 3,
        ship: ["Eta-2 Actis", "Delta-7 Aethersprite"],
        slot: "Command"
    }, {
        name: "Syliure-31 Hyperdrive",
        id: 362,
        points: 0,
        slot: "Hyperdrive",
        ship: "Syliure-class Hyperspace Ring"
    }, {
        name: 'Alpha-3E "Esk"',
        id: 363,
        slot: "Configuration",
        ship: "Nimbus-class V-Wing",
        points: 1,
        charge: 2,
        recurring: 1
    }, {
        name: "R7-A7",
        id: 364,
        points: 3,
        unique: !0,
        charge: 3,
        slot: "Astromech",
        faction: "Galactic Republic"
    }, {
        name: "Q7 Astromech",
        id: 365,
        points: 4,
        slot: "Astromech",
        faction: "Galactic Republic"
    }, {
        name: "Intercept Booster",
        id: 366,
        points: 1,
        slot: "Configuration",
        ship: "Droid Tri-Fighter",
        faction: "Separatist Alliance",
        charge: 3,
        modifier_func: function (a) {
            return a.actions.push("Slam"), a.actions.push("R-> Lock");
        }
    }, {
        name: "Independent Calculations",
        id: 367,
        points: 4,
        standardized: !0,
        slot: "Modification",
        restrictions: [
            ["Keyword", "Networked Calculations"]
        ]
    }, {
        name: "Weapons Systems Officer",
        id: 368,
        points: 7,
        slot: "Gunner"
    }, {
        name: "False Transponder Codes",
        id: 369,
        points: 2,
        charge: 1,
        slot: "Illicit"
    }, {
        name: "Slave I (Separatist)",
        canonical_name: "Slave I",
        xws: "slavei-swz82",
        id: 370,
        points: 3,
        slot: "Title",
        unique: !0,
        faction: ["Scum and Villainy", "Separatist Alliance"],
        ship: "Firespray-31",
        confersAddons: [{
                type: "Upgrade",
                slot: "Gunner"
            }]
    }, {
        name: "Vectored Cannons (RZ-1)",
        id: 371,
        points: 1,
        slot: "Configuration",
        standardized: !0,
        restrictions: [
            ["Keyword", "Vectored Thrusters"]
        ]
    }, {
        name: "B6 Blade Wing Prototype",
        id: 372,
        points: 2,
        unique: !0,
        slot: "Title",
        ship: "B-Wing",
        faction: "Rebel Alliance",
        confersAddons: [{
                type: "Upgrade",
                slot: "Gunner"
            }]
    }, {
        name: "TIE Defender Elite",
        id: 373,
        points: 2,
        slot: "Configuration",
        faction: "Galactic Empire",
        ship: "TIE Defender",
        standardized: !0,
        modifier_func: function (a) {
            var b, c, d, e, f;
            if (null != a.maneuvers[1]) {
                for (e = a.maneuvers, f = [], c = 0, d = e.length; c < d; c++)
                    b = e[c], b[0] > 1 && b[0]--, b[4] > 1 && b[4]--, b[5] < 3 && 0 !== b[5] ? f.push(b[5]++) : f.push(void 0);
                return f;
            }
        }
    }, {
        name: "Sensitive Controls",
        id: 374,
        points: 2,
        slot: "Configuration",
        standardized: !0,
        restrictions: [
            ["Keyword", "Autothrusters"]
        ]
    }, {
        name: "Cutthroat",
        id: 375,
        points: 1,
        slot: "Talent",
        faction: "Scum and Villainy"
    }, {
        name: "Tierfon Belly Run",
        id: 376,
        points: 2,
        slot: "Talent",
        restrictions: [
            ["Keyword", "Y-Wing"]
        ]
    }, {
        name: "B6 Blade Wing Prototype (Epic)",
        canonical_name: "B6 Blade Wing Prototype",
        xws: "b6bladewingprototype-command",
        id: 377,
        points: 12,
        unique: !0,
        slot: "Command",
        ship: "B-Wing",
        faction: "Rebel Alliance",
        attack: 3,
        range: -2,
        confersAddons: [{
                type: "Upgrade",
                slot: "Gunner"
            }],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Title");
        },
        also_occupies_upgrades: ["Title"]
    }, {
        name: "Hopeful",
        id: 378,
        points: 1,
        slot: "Talent",
        faction: "Rebel Alliance"
    }, {
        name: "Sabine Wren (Gunner)",
        canonical_name: "Sabine Wren",
        xws: "sabinewren-gunner",
        id: 379,
        points: 2,
        unique: !0,
        slot: "Gunner",
        faction: "Rebel Alliance"
    }, {
        name: "Phoenix Squadron",
        id: 380,
        points: 5,
        unique: !0,
        slot: "Command",
        faction: "Rebel Alliance",
        ship: "VCX-100"
    }, {
        name: "Disciplined",
        id: 381,
        points: 1,
        slot: "Talent",
        faction: "Galactic Empire"
    }, {
        name: "Skystrike Academy Class",
        id: 382,
        points: 3,
        max_per_squad: 2,
        slot: "Command",
        faction: "Galactic Empire",
        ship: ["TIE Fighter", "TIE Interceptor"]
    }, {
        name: "Shadow Wing",
        id: 383,
        points: 6,
        unique: !0,
        slot: "Command",
        faction: "Galactic Empire",
        ship: ["TIE Fighter", "TIE Interceptor", "TIE Bomber"]
    }, {
        name: "In It For The Money",
        id: 384,
        points: 5,
        slot: "Command",
        faction: "Scum and Villainy",
        restrictions: [
            ["isUnique", !0],
            ["Base", "Standard"]
        ]
    }, {
        name: "Bounty",
        id: 385,
        points: 5,
        slot: "Command",
        faction: "Scum and Villainy",
        restrictions: [
            ["isUnique", !0],
            ["Base", "Standard"]
        ]
    }, {
        name: "Gamut Key",
        id: 386,
        unique: !0,
        points: 6,
        slot: "Crew",
        charge: 2,
        recurring: 1,
        faction: "Scum and Villainy"
    }, {
        name: "Interloper Turn",
        id: 387,
        points: 1,
        slot: "Talent",
        recurring: 1,
        ship: "TIE Defender"
    }, {
        name: "Protectorate Gleb",
        id: 388,
        unique: !0,
        points: 2,
        slot: "Crew",
        faction: ["Galactic Empire", "First Order", "Scum and Villainy"],
        modifier_func: function (a) {
            if (__indexOf.call(a.actions, "R-Coordinate") < 0)
                return a.actions.push("R-Coordinate");
        }
    }, {
        name: "R4-B11",
        id: 389,
        points: 3,
        unique: !0,
        slot: "Astromech",
        faction: "Scum and Villainy"
    }, {
        name: "Asajj Ventress (Command)",
        id: 390,
        unique: !0,
        slot: "Command",
        points: 8,
        faction: ["Scum and Villainy", "Separatist Alliance"],
        restrictions: [
            ["Slot", "Crew"],
            ["Base", "Huge"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Crew");
        },
        also_occupies_upgrades: ["Crew"],
        force: 1,
        modifier_func: function (a) {
            return a.force += 1, a.actions.push("*Focus"), a.actions.push("F-> Coordinate");
        }
    }, {
        name: "General Grievous (Command)",
        id: 391,
        unique: !0,
        slot: "Command",
        points: 5,
        faction: "Separatist Alliance",
        restrictions: [
            ["Slot", "Crew"],
            ["Base", "Huge"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Crew");
        },
        also_occupies_upgrades: ["Crew"]
    }, {
        name: "Hondo Ohnaka (Command)",
        id: 392,
        unique: !0,
        slot: "Command",
        points: 7,
        charge: 2,
        restrictions: [
            ["Slot", "Crew"],
            ["Base", "Huge"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Crew");
        },
        also_occupies_upgrades: ["Crew"],
        modifier_func: function (a) {
            return a.actions.push("*Coordinate"), a.actions.push("R-> Jam");
        }
    }, {
        name: "Mar Tuuk",
        id: 393,
        unique: !0,
        slot: "Command",
        points: 4,
        faction: "Separatist Alliance",
        restrictions: [
            ["Slot", "Crew"],
            ["Base", "Huge"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Crew");
        },
        also_occupies_upgrades: ["Crew"]
    }, {
        name: "Riff Tamson",
        id: 394,
        unique: !0,
        slot: "Command",
        points: 6,
        faction: "Separatist Alliance",
        restrictions: [
            ["Slot", "Crew"],
            ["Base", "Huge"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Crew");
        },
        also_occupies_upgrades: ["Crew"]
    }, {
        name: "Zealous Captain",
        id: 395,
        unique: !0,
        slot: "Command",
        points: 4,
        restrictions: [
            ["Slot", "Crew"],
            ["Base", "Huge"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Crew");
        },
        also_occupies_upgrades: ["Crew"]
    }, {
        name: "Tractor Tentacles",
        id: 396,
        slot: "Hardpoint",
        points: 0,
        attackb: 2,
        range: "1-2",
        rangebonus: !0,
        ship: "Trident-class Assault Ship",
        restrictions: [
            ["Base", "Huge"]
        ]
    }, {
        name: "Drill Beak",
        id: 397,
        slot: "Hardpoint",
        points: 4,
        attackb: 3,
        range: "0-1",
        rangebonus: !0,
        ship: "Trident-class Assault Ship",
        restrictions: [
            ["Slot", "Cargo"],
            ["Base", "Huge"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Cargo");
        },
        also_occupies_upgrades: ["Cargo"]
    }, {
        name: "Enhanced Propulsion",
        id: 398,
        slot: "Hardpoint",
        points: 6,
        ship: "Trident-class Assault Ship",
        restrictions: [
            ["Slot", "Cargo"],
            ["Base", "Huge"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Cargo");
        },
        also_occupies_upgrades: ["Cargo"]
    }, {
        name: "Proton Cannon Battery",
        id: 399,
        slot: "Hardpoint",
        points: 10,
        attackbull: 4,
        range: "2-5",
        restrictions: [
            ["Slot", "Cargo"],
            ["Base", "Huge"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Cargo");
        },
        also_occupies_upgrades: ["Cargo"]
    }, {
        name: "Droid Crew",
        id: 400,
        slot: "Team",
        points: 5,
        faction: "Separatist Alliance",
        modifier_func: function (a) {
            return a.actions.push("*Calculate"), a.actions.push("R-> Lock");
        }
    }, {
        name: "Tractor Technicians",
        id: 401,
        slot: "Team",
        points: 2
    }, {
        name: "Corsair Crew",
        id: 402,
        slot: "Team",
        points: 5,
        faction: "Scum and Villainy",
        restrictions: [
            ["Slot", "Gunner"]
        ],
        validation_func: function (a, b) {
            return b.occupiesAnUpgradeSlot("Gunner");
        },
        also_occupies_upgrades: ["Gunner"]
    }, {
        name: "Grappler",
        id: 403,
        unique: !0,
        slot: "Title",
        ship: "Trident-class Assault Ship",
        points: 3,
        modifier_func: function (a) {
            return a.hull += 2, a.shields -= 1;
        }
    }, {
        name: "Nautolan's Revenge",
        id: 404,
        unique: !0,
        slot: "Title",
        points: 2,
        ship: "Trident-class Assault Ship",
        faction: "Scum and Villainy",
        modifier_func: function (a) {
            return a.hull -= 2, a.shields += 1, a.energy += 1;
        }
    }, {
        name: "Neimoidian Grasp",
        id: 405,
        unique: !0,
        slot: "Title",
        points: 2,
        ship: "Trident-class Assault Ship",
        faction: "Separatist Alliance",
        modifier_func: function (a) {
            return a.shields -= 2;
        }
    }, {
        name: "Trident",
        id: 406,
        unique: !0,
        slot: "Title",
        points: 4,
        ship: "Trident-class Assault Ship",
        faction: "Separatist Alliance",
        modifier_func: function (a) {
            return a.energy += 1;
        }
    }, {
        name: "Tracking Torpedoes",
        id: 407,
        slot: "Torpedo",
        points: 8,
        attack: 4,
        charge: 3,
        restrictions: [
            ["Base", "Huge"]
        ]
    }];
exports.upgrades = upgrades;
var upgradeRules = {
    "0-0-0": {
        display_name: "0-0-0",
        text: "At the start of the Engagement Phase, you may choose 1 enemy ship at range 0-1. If you do, you gain 1 calculate token unless that ship chooses to gain 1 stress token."
    },
    "4-LOM": {
        display_name: "4-LOM",
        text: "While you perform an attack, after rolling attack dice, you may name a type of green token. If you do, gain 2 ion tokens and, during this attack, the defender cannot spend tokens of the named type."
    },
    Andrasta: {
        display_name: "Andrasta",
        text: " "
    },
    "Black One": {
        display_name: "Black One",
        text: "After you perform a %SLAM% action, lose 1&nbsp;%CHARGE%. Then you may gain 1 ion token to remove 1 disarm token.%LINEBREAK%If your %CHARGE% is inactive, you cannot perform the %SLAM% action."
    },
    Dauntless: {
        display_name: "Dauntless",
        text: "After you partially execute a maneuver, you may perform 1 white action, treating that action as red."
    },
    Ghost: {
        display_name: "Ghost",
        text: "You can dock 1 attack shuttle or Sheathipede-class shuttle.%LINEBREAK%Your docked ships can deploy only from your rear guides."
    },
    Havoc: {
        display_name: "Havoc",
        text: "  "
    },
    "Hound's Tooth": {
        display_name: "Hound’s Tooth",
        text: "1 Z-95-AF4 headhunter can dock with you."
    },
    "IG-2000": {
        display_name: "IG-2000",
        text: "You have the pilot ability of each other friendly ship with the <strong>IG-2000</strong> upgrade."
    },
    Marauder: {
        display_name: "Marauder",
        text: "While you perform a primary %REARARC% attack, you may reroll 1 attack die."
    },
    "Millennium Falcon": {
        display_name: "Millennium Falcon",
        text: "While you defend, if you are evading, you may reroll 1 defense die."
    },
    "Mist Hunter": {
        display_name: "Mist Hunter",
        text: " "
    },
    "Moldy Crow": {
        display_name: "Moldy Crow",
        text: "Gain a %FRONTARC% primary weapon with a value of “3.”%LINEBREAK%During the End Phase, do not remove up to 2 focus tokens."
    },
    Outrider: {
        display_name: "Outrider",
        text: ' While you perform an attack that is obstructed by an obstacle, the defender rolls 1 fewer defense die. %LINEBREAK% After you fully execute a maneuver, if you moved through or overlapped an obstacle, you may remove 1 of your red or orange tokens. %LINEBREAK% <i>Errata (since rules reference 1.0.2): changed "obstructed attack" to "an attack that is obstructed by an obstacle"</i>'
    },
    Phantom: {
        display_name: "Phantom",
        text: "You can dock at range 0-1."
    },
    "Punishing One": {
        display_name: "Punishing One",
        text: "While you perform a primary attack, if the defender is in your %FRONTARC%, roll 1 additional attack die."
    },
    "ST-321": {
        display_name: "ST-321",
        text: "After you perform a %COORDINATE% action, you may choose an enemy ship at range 0-3 of the ship you coordinated. If you do, acquire a lock on that enemy ship, ignoring range restrictions."
    },
    Scimitar: {
        display_name: "Scimitar",
        text: "<strong>Setup:</strong> After the Place Forces step, you may cloak.%LINEBREAK%After you decloak, you may choose an enemy ship in your %BULLSEYEARC%. If you do, it gains 1&nbsp;jam token."
    },
    "Shadow Caster": {
        display_name: "Shadow Caster",
        text: "After you perform an attack that hits, if the defender is in your %SINGLETURRETARC% and your %FRONTARC%, the defender gains 1 tractor token."
    },
    "Slave I": {
        display_name: "Slave I",
        text: 'After you reveal a turn (%TURNLEFT% or %TURNRIGHT%) or bank (%BANKLEFT% or %BANKRIGHT%) maneuver you may set your dial to the maneuver of the same speed and bearing in the other direction. %LINEBREAK%<i>Errata (since rules reference 1.0.2): removed "you may gain 1 stress token. If you do,"</i>'
    },
    Virago: {
        display_name: "Virago",
        text: "During the End Phase, you may spend 1&nbsp;%CHARGE% to perform a red %BOOST% action."
    },
    "Soulless One": {
        display_name: "Soulless One",
        text: "While you defend, if the attacker is outside your firing arc, you may reroll 1&nbsp;defense die."
    },
    "Ablative Plating": {
        display_name: "Ablative Plating",
        text: "Before you would suffer damage from an obstacle or from a friendly bomb detonating, you may spend 1&nbsp;%CHARGE%. If you do, prevent 1 damage."
    },
    "Admiral Sloane": {
        display_name: "Admiral Sloane",
        text: "After another friendly ship at range 0-3 defends, if it is destroyed, the attacker gains 2 stress tokens.%LINEBREAK%While a friendly ship at range 0-3 performs an attack against a stressed ship, it may reroll 1 attack die."
    },
    "Adv. Proton Torpedoes": {
        display_name: "Adv. Proton Torpedoes",
        text: "<strong>Attack (%LOCK%):</strong> Spend 1&nbsp;%CHARGE%. Change 1&nbsp;%HIT% result to a %CRIT% result."
    },
    "Advanced Optics": {
        display_name: "Advanced Optics",
        text: "While you perform an attack, you may spend 1 focus token to change 1 of your blank results to a %HIT% result."
    },
    "Advanced SLAM": {
        display_name: "Advanced SLAM",
        text: "After you perform a %SLAM% action, if you fully executed the maneuver, you may perform a white action on your action bar, treating that action as red."
    },
    "Advanced Sensors": {
        display_name: "Advanced Sensors",
        text: "After you reveal your dial, you may perform 1 action.%LINEBREAK%If you do, you cannot perform another action during your activation."
    },
    Afterburners: {
        display_name: "Afterburners",
        text: "After you fully execute a speed 3-5 maneuver, you may spend 1&nbsp;%CHARGE% to perform a %BOOST% action, even while stressed."
    },
    "Agent Kallus": {
        display_name: "Agent Kallus",
        text: '<strong>Setup:</strong> After placing forces, assign the <strong>Hunted</strong> condition to 1 enemy ship.%LINEBREAK%While you perform an attack against the ship with the <strong>Hunted</strong> condition, you may change 1 of your %FOCUS% results to a %HIT% result.%LINEBREAK%<i>Errata (since rules reference 1.1.0)</i>:"Added After placing forces,"</i>'
    },
    "Agile Gunner": {
        display_name: "Agile Gunner",
        text: "During the End Phase, you may rotate your %SINGLETURRETARC% indicator."
    },
    "BB Astromech": {
        display_name: "BB Astromech",
        text: "Before you execute a blue maneuver, you may spend 1&nbsp;%CHARGE% to perform a %BARRELROLL% action."
    },
    "BB-8": {
        display_name: "BB-8",
        text: "Before you execute a blue maneuver, you may spend 1&nbsp;%CHARGE% to perform a&nbsp;%BARRELROLL% or&nbsp;%BOOST% action."
    },
    "BT-1": {
        display_name: "BT-1",
        text: "While you perform an attack, you may change 1&nbsp;%HIT% result to a %CRIT% result for each stress token the defender has."
    },
    "Barrage Rockets": {
        display_name: "Barrage Rockets",
        text: "<strong>Attack (%FOCUS%):</strong> Spend 1&nbsp;%CHARGE%. If the defender is in your %BULLSEYEARC%, you may spend 1 or more %CHARGE% to reroll that many attack dice."
    },
    "Battle Meditation": {
        display_name: "Battle Meditation",
        text: "You cannot coordinate limited ships.%LINEBREAK% While you perform a purple %COORDINATE% action, you may coordinate 1 additional friendly non-limited ship of the same type. Both ships must perform the same action."
    },
    "Baze Malbus": {
        display_name: "Baze Malbus",
        text: "While you perform a %FOCUS% action, you may treat it as red. If you do, gain 1 additional focus token for each enemy ship at range 0-1, to a maximum of 2."
    },
    "Biohexacrypt Codes": {
        display_name: "Biohexacrypt Codes",
        text: "While you coordinate or jam, if you have a lock on a ship, you may spend that lock to choose that ship, ignoring range restrictions."
    },
    Bistan: {
        display_name: "Bistan",
        text: "After you perform a primary attack, if you are focused, you may perform a bonus %SINGLETURRETARC% attack against a ship you have not already attacked this round."
    },
    "Boba Fett": {
        display_name: "Boba Fett",
        text: "<strong>Setup:</strong> Start in reserve.%LINEBREAK%At the end of Setup, place yourself at range 0 of an obstacle and beyond range 3 of any enemy ship."
    },
    "Bomblet Generator": {
        display_name: "Bomblet Generator",
        text: "<strong>Bomb</strong>%LINEBREAK%During the System Phase, you may spend 1&nbsp;%CHARGE% to drop a Bomblet with the [1&nbsp;%STRAIGHT%] template.%LINEBREAK%At the start of the Activation Phase, you may spend 1 shield to recover 2 %CHARGE%."
    },
    Bossk: {
        display_name: "Bossk",
        text: "After you perform a primary attack that misses, if you are not stressed, you <b>must</b> receive 1 stress token to perform a bonus primary attack against the same target."
    },
    "Brilliant Evasion": {
        display_name: "Brilliant Evasion",
        text: "While you defend, if you are not in the attacker's %BULLSEYEARC%, you may spend 1 %FORCE% to change 2 of your %FOCUS% results to %EVADE%&nbsp;results."
    },
    "C-3PO": {
        display_name: "C-3PO",
        text: "Before rolling defense dice, you may spend 1 calculate token to guess aloud a number 1 or higher. If you do and you roll exactly that many %EVADE% results, add 1&nbsp;%EVADE% result.%LINEBREAK%After you perform the %CALCULATE% action, gain 1 calculate token."
    },
    "C-3PO (Resistance)": {
        display_name: "C-3PO",
        text: "While you coordinate, you can choose friendly ships beyond range 2 if they have&nbsp;%CALCULATE% on their action bar.%LINEBREAK%After you perform the&nbsp;%CALCULATE% or&nbsp;%COORDINATE% action, gain 1&nbsp;calculate token."
    },
    "Cad Bane": {
        display_name: "Cad Bane",
        text: "After you drop or launch a device, you may perform a red %BOOST% action."
    },
    "Calibrated Laser Targeting": {
        display_name: "Calibrated Laser Targeting",
        text: "While you perform a primary attack, if&nbsp;the defender is in your %BULLSEYEARC%, add 1&nbsp;%FOCUS%&nbsp;result."
    },
    "Captain Phasma": {
        display_name: "Captain Phasma",
        text: "At the end of the Engagement Phase, each enemy ship at range 0-1 that is not stressed gains 1 stress token."
    },
    "Cassian Andor": {
        display_name: "Cassian Andor",
        text: "During the System Phase, you may choose 1 enemy ship at range 1-2 and guess aloud a bearing and speed, then look at that ship’s dial. If the chosen ship’s bearing and speed match your guess, you may set your dial to another maneuver."
    },
    "Chancellor Palpatine": {
        display_name: "Chancellor Palpatine",
        text: "Chancellor Palpatine:%LINEBREAK%<strong>Setup:</strong> Equip this side faceup.%LINEBREAK%After you defend, if the attacker is at range 0-2, you may spend 1 %FORCE%. If you do, the attacker gains 1 stress token.%LINEBREAK%During the End Phase, you may flip this card.%LINEBREAK%Darth Sidious%LINEBREAK%After you perform a purple&nbsp;%COORDINATE%&nbsp;action, the ship you coordinated gains 1&nbsp;stress token. Then, it gains 1&nbsp;focus token or recovers 1&nbsp;%FORCE%."
    },
    Chewbacca: {
        display_name: "Chewbacca",
        text: "At the start of the Engagement Phase, you may spend 2 %CHARGE% to repair 1 faceup damage card."
    },
    "Chewbacca (Scum)": {
        display_name: "Chewbacca",
        text: "At the start of the End Phase, you may spend 1 focus token to repair 1 of your faceup damage cards."
    },
    "Chewbacca (Resistance)": {
        display_name: "Chewbacca",
        text: "<strong>Setup:</strong> Lose 1&nbsp;%CHARGE%.%LINEBREAK%After a friendly ship at range&nbsp;0-3 is dealt 1&nbsp;damage card, recover 1&nbsp;%CHARGE%.%LINEBREAK%While you perform an attack, you may spend 2&nbsp;%CHARGE% to change 1&nbsp;%FOCUS% result to a&nbsp;%CRIT% result."
    },
    "Ciena Ree": {
        display_name: "Ciena Ree",
        text: "After you perform a %COORDINATE% action, if the ship you coordinated performed a %BARRELROLL% or %BOOST% action, it may gain 1 stress token to rotate 90°."
    },
    "Cikatro Vizago": {
        display_name: "Cikatro Vizago",
        text: "During the End Phase, you may choose 2 %ILLICIT% upgrades equipped to friendly ships at range 0-1. If you do, you may exchange these upgrades.%LINEBREAK%<strong>End of Game:</strong> Return all %ILLICIT% upgrades to their original ships."
    },
    "Cloaking Device": {
        display_name: "Cloaking Device",
        text: "<strong>Action:</strong> Spend 1&nbsp;%CHARGE% to perform a %CLOAK% action.%LINEBREAK%At the start of the Planning Phase, roll 1 attack die. On a %FOCUS% result, decloak or discard your cloak token."
    },
    "Clone Commander Cody": {
        display_name: "Clone Commander Cody",
        text: "After you perform an attack that missed, if 1&nbsp;or more %HIT%/%CRIT% results were neutralized, the defender gains 1&nbsp;strain token."
    },
    "Cluster Missiles": {
        display_name: "Cluster Missiles",
        text: "<strong>Attack (%LOCK%):</strong> Spend 1&nbsp;%CHARGE%. After this attack, you may perform this attack as a bonus attack against a different target at range 0-1 of the defender, ignoring the %LOCK% requirement."
    },
    "Collision Detector": {
        display_name: "Collision Detector",
        text: "While you boost or barrel roll, you can move through and overlap obstacles.%LINEBREAK%After you move through or overlap an obstacle, you may spend 1&nbsp;%CHARGE% to ignore its effects until the end of the round."
    },
    Composure: {
        display_name: "Composure",
        text: 'After you fail an action, if you have no green tokens, you may perform a %FOCUS% action. If you do, you cannot perform additional actions this round. %LINEBREAK% <i>Errata (since rules reference 1.1.0): Added "If you do, you cannot perform additional actions this round."</i>'
    },
    "Concussion Missiles": {
        display_name: "Concussion Missiles",
        text: "<strong>Attack (%LOCK%):</strong> Spend 1&nbsp;%CHARGE%. After this attack hits, each ship at range 0-1 of the defender exposes 1 of its damage cards."
    },
    "Conner Nets": {
        display_name: "Conner Nets",
        text: "<strong>Mine</strong>%LINEBREAK%During the System Phase, you may spend 1&nbsp;%CHARGE% to drop a Conner Net using the [1&nbsp;%STRAIGHT%] template.%LINEBREAK%This card’s %CHARGE% cannot be recovered."
    },
    "Contraband Cybernetics": {
        display_name: "Contraband Cybernetics",
        text: "Before you activate, you may spend 1&nbsp;%CHARGE%. If you do, until the end of the round, you can perform actions and execute red maneuvers, even while stressed."
    },
    "Count Dooku": {
        display_name: "Count Dooku",
        text: "Before a ship at range&nbsp;0-2 rolls attack or defense dice, if all of your %FORCE% are active, you may spend 1 %FORCE% and name a result. If the roll does not contain the named result, the ship must change 1&nbsp;die to that result."
    },
    "Crack Shot": {
        display_name: "Crack Shot",
        text: "While you perform a primary attack, if the defender is in your %BULLSEYEARC%, before the Neutralize Results step, you may spend 1&nbsp;%CHARGE% to cancel 1&nbsp;%EVADE% result."
    },
    "DRK-1 Probe Droids": {
        display_name: "DRK-1 Probe Droids",
        text: "During the End Phase, you may spend 1&nbsp;%CHARGE% to drop or launch 1&nbsp;DRK-1 probe droid using a speed 3 template.%LINEBREAK%This card’s %CHARGE% cannot be recovered."
    },
    Daredevil: {
        display_name: "Daredevil",
        text: "While you perform a white %BOOST% action, you may treat it as red to use the [1&nbsp;%TURNLEFT%] or [1&nbsp;%TURNRIGHT%] template instead."
    },
    "Darth Vader": {
        display_name: "Darth Vader",
        text: "At the start of the Engagement Phase, you may choose 1 ship in your firing arc at range 0-2 and spend 1&nbsp;%FORCE%. If you do, that ship suffers 1&nbsp;%HIT% damage unless it chooses to remove 1 green token."
    },
    "Deadman's Switch": {
        display_name: "Deadman’s Switch",
        text: "After you are destroyed, each other ship at range 0-1 suffers 1&nbsp;%HIT% damage."
    },
    "Death Troopers": {
        display_name: "Death Troopers",
        text: "During the Activation Phase, enemy ships at range 0-1 cannot remove stress tokens."
    },
    "Debris Gambit": {
        display_name: "Debris Gambit",
        text: "While you perform a red %EVADE% action, if there is an obstacle at range 0-1, treat the action as white instead."
    },
    Dedicated: {
        display_name: "Dedicated",
        text: "While another friendly ship in your %LEFTARC%&nbsp;or %RIGHTARC% at range&nbsp;0-2 defends, if it is limited or has the <strong>Dedicated</strong> upgrade and you are not strained, you may gain 1 strain token. If you do, the defender rerolls 1&nbsp;of their blank results."
    },
    "Delayed Fuses": {
        display_name: "Delayed Fuses",
        text: "After you drop, launch or place a bomb or mine, you may place 1 fuse marker on that device."
    },
    "Delta-7B": {
        display_name: "Delta-7B",
        text: "<i class = flavor_text>The Delta-7B was designed as a heavier variant of the Delta-7 Aethersprite-class Interceptor, identifiable by the repositioned astromech slot. Many Jedi Generals favor this craft’s greater firepower and durability.</i>"
    },
    Dengar: {
        display_name: "Dengar",
        text: "After you defend, if the attacker is in your firing arc, you may spend 1&nbsp;%CHARGE%. If you do, roll 1 attack die unless the attacker chooses to remove 1 green token. On a %HIT% or %CRIT% result, the attacker suffers 1&nbsp;%HIT% damage."
    },
    "Diamond-Boron Missiles": {
        display_name: "Diamond-Boron Missiles",
        text: "<strong>Attack (%LOCK%):</strong> Spend 1&nbsp;%CHARGE%. After this attack hits, you may spend 1 %CHARGE%. If you do, each ship at range 0-1 of the defender with agility equal to or less than the defender's rolls 1 attack die and suffers 1 %HIT%/%CRIT% damage for each matching result. "
    },
    "Director Krennic": {
        display_name: "Director Krennic",
        text: "<strong>Setup:</strong> Before placing forces, assign the <strong>Optimized Prototype</strong> condition to another friendly ship."
    },
    "Discord Missiles": {
        display_name: "Discord Missiles",
        text: "At the start of the Engagement Phase, you may spend 1&nbsp;calculate token and 1&nbsp;%CHARGE% to launch 1&nbsp;buzz droid swarm using the [3&nbsp;%BANKLEFT%], [3&nbsp;%STRAIGHT%], or [3&nbsp;%BANKRIGHT%] template.%LINEBREAK%This card’s %CHARGE% cannot be recovered."
    },
    "Dorsal Turret": {
        display_name: "Dorsal Turret",
        text: "<strong>Attack</strong>"
    },
    "Electronic Baffle": {
        display_name: "Electronic Baffle",
        text: "During the End Phase, you may suffer 1&nbsp;%HIT% damage to remove 1 red token."
    },
    Elusive: {
        display_name: "Elusive",
        text: "While you defend, you may spend 1&nbsp;%CHARGE% to reroll 1 defense die.%LINEBREAK%After you fully execute a red maneuver, recover 1&nbsp;%CHARGE%."
    },
    "Emperor Palpatine": {
        display_name: "Emperor Palpatine",
        text: "While another friendly ship defends or performs an attack, you may spend 1&nbsp;%FORCE% to modify 1 of its dice as though that ship had spent 1&nbsp;%FORCE%."
    },
    "Energy-Shell Charges": {
        display_name: "Energy-Shell Charges",
        text: "<strong>Attack (%CALCULATE%):</strong> Spend 1&nbsp;%CHARGE%. While you perform this attack, you may spend 1&nbsp;calculate token to change 1&nbsp;%FOCUS% result to a %CRIT% result.%LINEBREAK%<strong>Action</strong>: Reload this card."
    },
    "Engine Upgrade": {
        display_name: "Engine Upgrade",
        text: "<i class = flavor_text>Large military forces such as the Galactic Empire have standardized engines, but individual pilots and small organizations often replace the power couplings, add thrusters, or use high-performance fuel to get extra push out of their engines.</i>"
    },
    Ensnare: {
        text: "At the end of the Activation Phase, if you are tractored, you may choose 1 ship in your %SINGLETURRETARC% arc at range 0-1. Transfer 1 tractor token to it."
    },
    "Expert Handling": {
        display_name: "Expert Handling",
        text: "<i class = flavor_text>While heavy fighters can often be coaxed into a barrel roll, seasoned pilots know how to do it without putting undue stress on their craft or leaving themselves open to attack.</i>"
    },
    "Ezra Bridger": {
        display_name: "Ezra Bridger",
        text: "After you perform a primary attack, you may spend 1&nbsp;%FORCE% to perform a bonus %SINGLETURRETARC% attack from a %SINGLETURRETARC% you have not attacked from this round. If you do and you are stressed, you may reroll 1 attack die."
    },
    Fanatical: {
        display_name: "Fanatical",
        text: "While you perform a primary attack, if you are not shielded, you may change 1&nbsp;%FOCUS% result to a %HIT% result."
    },
    Fearless: {
        display_name: "Fearless",
        text: "While you perform a %FRONTARC% primary attack, if the attack range is 1 and you are in the defender’s %FRONTARC%, you may change 1 of your results to a %HIT% result."
    },
    "Feedback Array": {
        display_name: "Feedback Array",
        text: "Before you engage, you may gain 1 ion token and 1 disarm token. If you do, each ship at range 0 suffers 1&nbsp;%HIT% damage."
    },
    "Ferrosphere Paint": {
        display_name: "Ferrosphere Paint",
        text: "After an enemy ship locks you, if you are not in that ship’s %BULLSEYEARC%, that ship gains 1 stress token."
    },
    "Fifth Brother": {
        display_name: "Fifth Brother",
        text: "While you perform an attack, you may spend 1&nbsp;%FORCE% to change 1 of your %FOCUS% results to a %CRIT% result."
    },
    Finn: {
        display_name: "Finn",
        text: "While you defend or perform a primary attack, if the enemy ship is in your %FRONTARC%, you may add 1 blank result to your roll (this die can be rerolled or otherwise modified)."
    },
    "Fire-Control System": {
        display_name: "Fire-Control System",
        text: "While you perform an attack, if you have a lock on the defender, you may reroll 1 attack die. If you do, you cannot spend your lock during this attack."
    },
    "Freelance Slicer": {
        display_name: "Freelance Slicer",
        text: "While you defend, before attack dice are rolled, you may spend a lock you have on the attacker to roll 1 attack die. If you do, the attacker gains 1 jam token. Then, on a %HIT% or %CRIT% result, gain 1 jam token."
    },
    "GA-97": {
        text: "<strong>Setup:</strong> Before placing forces, you may spend 3-5 %CHARGE%. If you do, choose another friendly ship and assign the <strong>It's the Resistance</strong> condition to it."
    },
    'GNK "Gonk" Droid': {
        display_name: "GNK “Gonk” Droid",
        text: "<strong>Setup:</strong> Lose 1&nbsp;%CHARGE%.%LINEBREAK%<strong>Action:</strong> Recover 1&nbsp;%CHARGE%.%LINEBREAK%<strong>Action:</strong> Spend 1&nbsp;%CHARGE% to recover 1 shield."
    },
    "General Grievous": {
        display_name: "General Grievous",
        text: "While you defend, after the Neutralize Results step, if there are 2 or more %HIT%/%CRIT% results, you may spend 1&nbsp;%CHARGE% to cancel 1 %HIT% or %CRIT%&nbsp;result. %LINEBREAK%After a friendly ship is destroyed, recover 1&nbsp;%CHARGE%."
    },
    "General Hux": {
        display_name: "General Hux",
        text: "While you perform a white %COORDINATE% action, you may treat it as red. If you do, you may coordinate up to 2 additional ships of the same ship type, and each ship you coordinate must perform the same action, treating that action as red."
    },
    "Grand Inquisitor": {
        display_name: "Grand Inquisitor",
        text: "After an enemy ship at range 0-2 reveals its dial, you may spend 1&nbsp;%FORCE% to perform 1 white action on your action bar, treating that action as red."
    },
    "Grand Moff Tarkin": {
        display_name: "Grand Moff Tarkin",
        text: "During the System Phase, you may spend 2 %CHARGE%. If you do, each friendly ship may acquire a lock on a ship that you have locked."
    },
    "Grappling Struts": {
        display_name: "Grappling Struts",
        text: "Closed:%LINEBREAK%<strong>Setup:</strong> Equip this side faceup.%LINEBREAK%While you execute a maneuver, if you overlap an asteroid or debris cloud and there are 1 or fewer other friendly ships at range 0 of that obstacle, you may flip this card.%LINEBREAK%Open:%LINEBREAK%You ignore obstacles at range&nbsp;0 and while you move through them. After you reveal your dial, if you reveal a maneuver other than a [2&nbsp;%STRAIGHT%] and are at range 0 of an asteroid or debris cloud, skip your Execute Maneuver step and remove 1 stress token; if you revealed a right or left maneuver, rotate your ship 90º in that direction. After you execute a maneuver, flip this card."
    },
    Greedo: {
        display_name: "Greedo",
        text: "While you perform an attack, you may spend 1&nbsp;%CHARGE% to change 1&nbsp;%HIT% result to a %CRIT% result.%LINEBREAK%While you defend, if your %CHARGE% is active, the attacker may change 1&nbsp;%HIT% result to a %CRIT% result."
    },
    "Han Solo": {
        display_name: "Han Solo",
        text: "During the Engagement Phase, at initiative 7, you may perform a %SINGLETURRETARC% attack. You cannot attack from that %SINGLETURRETARC% again this round."
    },
    "Han Solo (Scum)": {
        display_name: "Han Solo",
        text: "Before you engage, you may perform a red %FOCUS% action."
    },
    "Han Solo (Resistance)": {
        display_name: "Han Solo",
        text: "After you perform an %EVADE% action, gain additional evade tokens equal to the number of enemy ships at range 0-1."
    },
    Hate: {
        display_name: "Hate",
        text: "After you suffer 1 or more damage, recover that many %FORCE%."
    },
    "Heavy Laser Cannon": {
        display_name: "Heavy Laser Cannon",
        text: "<strong>Attack:</strong> After the Modify Attack Dice step, change all %CRIT% results to %HIT% results."
    },
    "Heightened Perception": {
        display_name: "Heightened Perception",
        text: "At the start of the Engagement Phase, you may spend 1&nbsp;%FORCE%. If you do, engage at initiative 7 instead of your standard initiative value this phase."
    },
    "Hera Syndulla": {
        display_name: "Hera Syndulla",
        text: "You can execute red maneuvers even while stressed. After you fully execute a red maneuver, if you have 3 or more stress tokens, remove 1 stress token and suffer 1&nbsp;%HIT% damage."
    },
    Heroic: {
        display_name: "Heroic",
        text: "While you defend or perform an attack, if you have only blank results and have 2 or more results, you may reroll any number of your dice."
    },
    "Homing Missiles": {
        display_name: "Homing Missiles",
        text: "<strong>Attack (%LOCK%):</strong> Spend 1&nbsp;%CHARGE%. After you declare the defender, the defender may choose to suffer 1&nbsp;%HIT% damage. If it does, skip the Attack and Defense Dice steps and the attack is treated as hitting."
    },
    "Hotshot Gunner": {
        display_name: "Hotshot Gunner",
        text: "While you perform a %SINGLETURRETARC% attack, after the Modify Defense Dice step, the defender removes 1 focus or calculate token."
    },
    "Hull Upgrade": {
        display_name: "Hull Upgrade",
        text: "<i class = flavor_text>For those who cannot afford an enhanced shield generator, bolting additional plates onto the hull of a ship can serve as an adequate substitute.</i>"
    },
    "Hyperspace Tracking Data": {
        display_name: "Hyperspace Tracking Data",
        text: "<strong>Setup:</strong> Before placing forces, you may choose a number between 0 and 6. Treat your initiative as the chosen value during Setup.%LINEBREAK%After Setup, assign 1 focus or evade token to each friendly ship at range&nbsp;0-2."
    },
    "IG-88D": {
        display_name: "IG-88D",
        text: "You have the pilot ability of each other friendly ship with the <strong>IG-2000</strong> upgrade.%LINEBREAK%After you perform a %CALCULATE% action, gain 1 calculate token."
    },
    "Ion Bombs": {
        display_name: "Ion Bombs",
        text: "<strong>Bomb</strong>%LINEBREAK% During the System Phase, you may spend 1 %CHARGE% to drop an Ion Bomb using the [1 %STRAIGHT%] template."
    },
    "ISB Slicer": {
        display_name: "ISB Slicer",
        text: "During the End Phase, enemy ships at range 1-2 cannot remove jam tokens."
    },
    "Impervium Plating": {
        display_name: "Impervium Plating",
        text: "Before you would be dealt a faceup <strong>Ship</strong> damage card, you may spend 1&nbsp;%CHARGE% to discard it instead."
    },
    "Inertial Dampeners": {
        display_name: "Inertial Dampeners",
        text: "Before you would execute a maneuver, you may spend 1 shield. If you do, execute a white [0&nbsp;%STOP%] instead of the maneuver you revealed, then gain 1 stress token."
    },
    Informant: {
        display_name: "Informant",
        text: "<strong>Setup:</strong> After placing forces, choose 1 enemy ship and assign the <strong>Listening Device</strong> condition to it."
    },
    "Instinctive Aim": {
        display_name: "Instinctive Aim",
        text: "While you perform a special attack, you may spend 1&nbsp;%FORCE% to ignore the %FOCUS% or %LOCK% requirement."
    },
    "Integrated S-Foils": {
        display_name: "Integrated S-Foils",
        text: '<strong>Closed: </strong><i>%BARRELROLL%, %FOCUS% <i class="xwing-miniatures-font xwing-miniatures-font-linked"></i> <r>%BARRELROLL%</r></i>%LINEBREAK% While you perform a primary attack, if the defender is not in your %BULLSEYEARC%, roll 1 fewer attack die. %LINEBREAK% Before you activate, you may flip this card. %LINEBREAK% <b>Open:</b> Before you activate, you may flip this card.'
    },
    Intimidation: {
        display_name: "Intimidation",
        text: "While an enemy ship at range 0 defends, it rolls 1 fewer defense die."
    },
    "Ion Cannon": {
        display_name: "Ion Cannon",
        text: "<strong>Attack:</strong> If this attack hits, spend 1&nbsp;%HIT% or %CRIT% result to cause the defender to suffer 1&nbsp;%HIT% damage. All remaining %HIT%/%CRIT% results inflict ion tokens instead of damage."
    },
    "Ion Cannon Turret": {
        display_name: "Ion Cannon Turret",
        text: "<strong>Attack:</strong> If this attack hits, spend 1&nbsp;%HIT% or %CRIT% result to cause the defender to suffer 1&nbsp;%HIT% damage. All remaining %HIT%/%CRIT% results inflict ion tokens instead of damage."
    },
    "Ion Missiles": {
        display_name: "Ion Missiles",
        text: "<strong>Attack (%LOCK%):</strong> Spend 1&nbsp;%CHARGE%. If this attack hits, spend 1&nbsp;%HIT% or %CRIT% result to cause the defender to suffer 1&nbsp;%HIT% damage. All remaining %HIT%/%CRIT% results inflict ion tokens instead of damage."
    },
    "Ion Torpedoes": {
        display_name: "Ion Torpedoes",
        text: "<strong>Attack (%LOCK%):</strong> Spend 1&nbsp;%CHARGE%. If this attack hits, spend 1&nbsp;%HIT% or %CRIT% result to cause the defender to suffer 1&nbsp;%HIT% damage. All remaining %HIT%/%CRIT% results inflict ion tokens instead of damage."
    },
    "Jabba the Hutt": {
        display_name: "Jabba the Hutt",
        text: "During the End Phase, you may choose 1 friendly ship at range 0-2 and spend 1&nbsp;%CHARGE%. If you do, that ship recovers 1&nbsp;%CHARGE% on 1 of its equipped %ILLICIT% upgrades."
    },
    "Jamming Beam": {
        display_name: "Jamming Beam",
        text: "<strong>Attack:</strong> If this attack hits, all %HIT%/%CRIT% results inflict jam tokens instead of damage."
    },
    Juke: {
        display_name: "Juke",
        text: "While you perform an attack, if you are evading, you may change 1 of the defender’s %EVADE% results to a %FOCUS% result."
    },
    "Jyn Erso": {
        display_name: "Jyn Erso",
        text: "If a friendly ship at range 0-3 would gain a focus token, it may gain 1 evade token instead."
    },
    "K2-B4": {
        display_name: "K2-B4",
        text: "While a friendly ship at range&nbsp;0-3 defends, it may spend 1 calculate token. If it does, add 1 %EVADE% result unless the attacker chooses to gain 1&nbsp;strain token."
    },
    "Kanan Jarrus": {
        display_name: "Kanan Jarrus",
        text: "After a friendly ship at range 0-2 fully executes a white maneuver, you may spend 1&nbsp;%FORCE% to remove 1 stress token from that ship."
    },
    "Ketsu Onyo": {
        display_name: "Ketsu Onyo",
        text: "At the start of the End Phase, you may choose 1 enemy ship at range 0-2 in your firing arc. If you do, that ship does not remove its tractor tokens."
    },
    Kraken: {
        display_name: "Kraken",
        text: "During the End Phase, you may choose up to 3&nbsp;friendly ships at range&nbsp;0-3. If you do, each of these ships does not remove 1&nbsp;calculate token."
    },
    "L3-37": {
        display_name: "L3-37",
        text: "<strong>Setup:</strong> Equip this side faceup.%LINEBREAK%While you defend, you may flip this card. If you do, the attacker must reroll all attack dice.%LINEBREAK%<strong>L3-37’s Programming:</strong> If you are not shielded, decrease the difficulty of your bank (%BANKLEFT% and %BANKRIGHT%) maneuvers."
    },
    "Kylo Ren": {
        display_name: "Kylo Ren",
        text: "<strong>Action:</strong> Choose 1 enemy ship at range 1-3. If you do, spend 1&nbsp;%FORCE% to assign the <strong>I’ll Show You the Dark Side</strong> condition to that ship."
    },
    "Landing Struts": {
        display_name: "Landing Struts",
        text: "Closed:%LINEBREAK%<strong>Setup:</strong> Equip this side faceup.%LINEBREAK%While you execute a maneuver, if you overlap an asteroid or debris cloud and there are 1 or fewer other friendly ships at range 0 of that obstacle, you may flip this card.%LINEBREAK%Open:%LINEBREAK%You ignore obstacles at range&nbsp;0 and while you move through them. After you reveal your dial, if you reveal a maneuver other than a [2&nbsp;%STRAIGHT%] and are at range 0 of an asteroid or debris cloud, skip your Execute Maneuver step and remove 1 stress token; if you revealed a right or left maneuver, rotate your ship 90º in that direction. After you execute a maneuver, flip this card."
    },
    "Lando Calrissian": {
        display_name: "Lando Calrissian",
        text: "<strong>Action:</strong> Roll 2 defense dice. For each %FOCUS% result, gain 1 focus token. For each %EVADE% result, gain 1 evade token. If both results are blank, the opposing player chooses focus or evade. You gain 1 token of that type."
    },
    "Lando Calrissian (Scum)": {
        display_name: "Lando Calrissian",
        text: "After you roll dice, you may spend 1 green token to reroll up to 2 of your results."
    },
    "Lando's Millennium Falcon": {
        display_name: "Lando’s Millennium Falcon",
        text: '1 escape shuttle may dock with you.%LINEBREAK%While you have an escape shuttle docked, you may treat its shields as if they were on your ship card.%LINEBREAK%While you perform a primary attack against a stressed ship, roll 1 additional attack die. %LINEBREAK%<i>Errata (since rules reference 1.1.0): Replaced “spend" with "treat"</i>'
    },
    "Latts Razzi": {
        display_name: "Latts Razzi",
        text: "While you defend, if the attacker is stressed, you may remove 1 stress from the attacker to change 1 of your blank/%FOCUS% results to an %EVADE% result."
    },
    "Leia Organa": {
        display_name: "Leia Organa",
        text: "At the start of the Activation Phase, you may spend 3 %CHARGE%. During this phase, each friendly ship reduces the difficulty of its red maneuvers."
    },
    "Lone Wolf": {
        display_name: "Lone Wolf",
        text: "While you defend or perform an attack, if there are no other friendly ships at range 0-2, you may spend 1&nbsp;%CHARGE% to reroll 1 of your dice."
    },
    "Luke Skywalker": {
        display_name: "Luke Skywalker",
        text: "At the start of the Engagement Phase, you may spend 1&nbsp;%FORCE% to rotate your %SINGLETURRETARC% indicator."
    },
    "M9-G8": {
        display_name: "M9-G8",
        text: "While a ship you are locking performs an attack, you may choose 1 attack die. If you do, the attacker rerolls that die."
    },
    "Magva Yarro": {
        display_name: "Magva Yarro",
        text: "After you defend, if the attack hit, you may acquire a lock on the attacker."
    },
    Marksmanship: {
        display_name: "Marksmanship",
        text: "While you perform an attack, if the defender is in your %BULLSEYEARC%, you may change 1&nbsp;%HIT% result to a %CRIT% result."
    },
    Maul: {
        display_name: "Maul",
        text: "After you suffer damage, you may gain 1 stress token to recover 1&nbsp;%FORCE%.%LINEBREAK%You can equip “Dark Side” upgrades."
    },
    "Minister Tua": {
        display_name: "Minister Tua",
        text: "At the start of the Engagement Phase, if you are damaged, you may perform a red %REINFORCE% action."
    },
    "Moff Jerjerrod": {
        display_name: "Moff Jerjerrod",
        text: "During the System Phase, you may spend 2 %CHARGE%. If you do, choose the [1&nbsp;%BANKLEFT%], [1&nbsp;%STRAIGHT%], or [1&nbsp;%BANKRIGHT%] template. Each friendly ship may perform a red %BOOST% action using that template."
    },
    "Munitions Failsafe": {
        display_name: "Munitions Failsafe",
        text: "While you perform a %TORPEDO% or %MISSILE% attack, after rolling attack dice, you may cancel all dice results to recover 1&nbsp;%CHARGE% you spent as a cost for the attack."
    },
    "Nien Nunb": {
        display_name: "Nien Nunb",
        text: "Decrease the difficulty of your bank maneuvers (%BANKLEFT% and %BANKRIGHT%)."
    },
    "Novice Technician": {
        display_name: "Novice Technician",
        text: "At the end of the round, you may roll 1 attack die to repair 1 faceup damage card. Then on a %HIT% result, expose 1 damage card."
    },
    "Os-1 Arsenal Loadout": {
        display_name: "Os-1 Arsenal Loadout",
        text: "While you have exactly 1 disarm token, you can still perform %TORPEDO% and %MISSILE% attacks against targets you have locked. If you do, you cannot spend your lock during the attack."
    },
    Outmaneuver: {
        display_name: "Outmaneuver",
        text: "While you perform a %FRONTARC% attack, if you are not in the defender’s firing arc, the defender rolls 1 fewer defense die."
    },
    "Paige Tico": {
        display_name: "Paige Tico",
        text: "After you perform a primary attack, you may drop 1 bomb or rotate your %SINGLETURRETARC%.%LINEBREAK%After you are destroyed, you may drop 1 bomb."
    },
    "Pattern Analyzer": {
        display_name: "Pattern Analyzer",
        text: "While you fully execute a red maneuver, before the Check Difficulty step, you may perform 1 action."
    },
    "Perceptive Copilot": {
        display_name: "Perceptive Copilot",
        text: "After you perform a %FOCUS% action, gain 1 focus token."
    },
    "Petty Officer Thanisson": {
        display_name: "Petty Officer Thanisson",
        text: "During the Activation or Engagement Phase, after an enemy ship in your %FRONTARC% at range 0-1 gains a red or orange token, if you are not stressed, you may gain 1 stress token. If you do, that ship gains 1 additional token of the type that it gained."
    },
    "Plasma Torpedoes": {
        display_name: "Plasma Torpedoes",
        text: "<strong>Attack (%LOCK%):</strong> Spend 1&nbsp;%CHARGE%. During the Neutralize Results step, %CRIT% results are cancelled before %HIT% results. After this attack hits, the defender loses 1 shield."
    },
    "Pivot Wing": {
        display_name: "Pivot Wing",
        text: "<strong>Closed: </strong>While you defend, roll 1 fewer defense die.%LINEBREAK%After you execute a [0&nbsp;%STOP%] maneuver, you may rotate your ship 90º or 180º.%LINEBREAK%Before you activate, you may flip this card.%LINEBREAK%<strong>Open:</Strong> Before you activate, you may flip this card."
    },
    Predator: {
        display_name: "Predator",
        text: "While you perform a primary attack, if the defender is in your %BULLSEYEARC%, you may reroll 1 attack die."
    },
    "Predictive Shot": {
        display_name: "Predictive Shot",
        text: "After you declare an attack, if the defender is in your %BULLSEYEARC%, you may spend 1&nbsp;%FORCE%. If you do, during the Roll Defense Dice step, the defender cannot roll more defense dice than the number of your %HIT%/%CRIT% results."
    },
    "Primed Thrusters": {
        display_name: "Primed Thrusters",
        text: "While you have 2 or fewer stress tokens, you can perform %BARRELROLL% and %BOOST% actions even while stressed."
    },
    "Proton Bombs": {
        display_name: "Proton Bombs",
        text: "<strong>Bomb</strong>%LINEBREAK%During the System Phase, you may spend 1&nbsp;%CHARGE% to drop a Proton Bomb using the [1&nbsp;%STRAIGHT%] template."
    },
    "Proton Rockets": {
        display_name: "Proton Rockets",
        text: "<strong>Attack (%FOCUS%):</strong> Spend 1&nbsp;%CHARGE%."
    },
    "Proton Torpedoes": {
        display_name: "Proton Torpedoes",
        text: "<strong>Attack (%LOCK%):</strong> Spend 1&nbsp;%CHARGE%. Change 1&nbsp;%HIT% result to a %CRIT% result."
    },
    "Proximity Mines": {
        display_name: "Proximity Mines",
        text: "<strong>Mine</strong>%LINEBREAK%During the System Phase, you may spend 1&nbsp;%CHARGE% to drop a Proximity Mine using the [1&nbsp;%STRAIGHT%] template.%LINEBREAK%This card’s %CHARGE% cannot be recovered."
    },
    "Qi'ra": {
        display_name: "Qi’ra",
        text: "While you move and perform attacks, you ignore obstacles that you are locking."
    },
    "R2 Astromech": {
        display_name: "R2 Astromech",
        text: "After you reveal your dial, you may spend 1&nbsp;%CHARGE% and gain 1 disarm token to recover 1 shield."
    },
    "R2-D2 (Crew)": {
        display_name: "R2-D2",
        text: "During the End Phase, if you are damaged and not shielded, you may roll 1 attack die to recover 1 shield. On a %HIT% result, expose 1 of your damage cards."
    },
    "R2-D2": {
        display_name: "R2-D2",
        text: "After you reveal your dial, you may spend 1&nbsp;%CHARGE% and gain 1 disarm token to recover 1 shield."
    },
    "R2-HA": {
        display_name: "R2-HA",
        text: "While you defend, you may spend your lock on the attacker to reroll any number of your defense dice."
    },
    "R3 Astromech": {
        display_name: "R3 Astromech",
        text: "You can maintain up to 2 locks. Each lock must be on a different object.%LINEBREAK%After you perform a %LOCK% action, you may acquire a lock."
    },
    "R4 Astromech": {
        display_name: "R4 Astromech",
        text: "Decrease the difficulty of your speed 1-2 basic maneuvers (%TURNLEFT%, %BANKLEFT%, %STRAIGHT%, %BANKRIGHT%, %TURNRIGHT%)."
    },
    "R4-P Astromech": {
        display_name: "R4-P Astromech",
        text: "Before you execute a basic maneuver, you may spend 1&nbsp;%CHARGE%. If you do, while you execute that maneuver, reduce its difficulty."
    },
    "R4-P17": {
        display_name: "R4-P17",
        text: "After you fully execute a red maneuver, you may spend 1&nbsp;%CHARGE% to perform an action, even while stressed."
    },
    "R4-P44": {
        display_name: "R4-P44",
        text: "After you fully execute a red maneuver, if there is an enemy ship in your %BULLSEYEARC%, gain 1&nbsp;calculate token."
    },
    "R5 Astromech": {
        display_name: "R5 Astromech",
        text: "<strong>Action:</strong> Spend 1&nbsp;%CHARGE% to repair 1 facedown damage card.%LINEBREAK%<strong>Action:</strong> Repair 1 faceup <strong>Ship</strong> damage card."
    },
    "R5-D8": {
        display_name: "R5-D8",
        text: "<strong>Action:</strong> Spend 1&nbsp;%CHARGE% to repair 1 facedown damage card.%LINEBREAK%<strong>Action:</strong> Repair 1 faceup <strong>Ship</strong> damage card."
    },
    "R5-P8": {
        display_name: "R5-P8",
        text: "While you perform an attack against a defender in your %FRONTARC%, you may spend 1&nbsp;%CHARGE% to reroll 1 attack die. If the rerolled result is a %CRIT% result, suffer 1&nbsp;%CRIT% damage."
    },
    "R5-TK": {
        display_name: "R5-TK",
        text: "You can perform attacks against friendly ships."
    },
    "R5-X3": {
        display_name: "R5-X3",
        text: "Before you activate or engage, you may spend 1&nbsp;%CHARGE% to ignore obstacles until the end of this phase."
    },
    Rey: {
        display_name: "Rey",
        text: "While you defend or perform an attack, if the enemy ship is in your %SINGLETURRETARC%, you may spend 1&nbsp;%FORCE% to change 1 of your blank results to a %EVADE% or %HIT% result."
    },
    "Rey's Millennium Falcon": {
        display_name: "Rey’s Millennium Falcon",
        text: "If you have 2 or fewer stress tokens, you can execute red Segnor’s Loop [%SLOOPLEFT% or %SLOOPRIGHT%] maneuvers and perform %BOOST% and&nbsp;%ROTATEARC% actions even while stressed."
    },
    "Rigged Cargo Chute": {
        display_name: "Rigged Cargo Chute",
        text: "<strong>Action:</strong> Spend 1&nbsp;%CHARGE%. Drop 1 loose cargo using the [1&nbsp;%STRAIGHT%] template."
    },
    "Rose Tico": {
        display_name: "Rose Tico",
        text: "While you defend or perform an attack, you may spend 1 of your results to acquire a lock on the enemy ship."
    },
    Ruthless: {
        display_name: "Ruthless",
        text: "While you perform an attack, you may choose another friendly ship at range 0-1 of the defender. If you do, that ship suffers 1&nbsp;%HIT% damage and you may change 1 of your die results to a %HIT% result."
    },
    "Sabine Wren": {
        display_name: "Sabine Wren",
        text: "<strong>Setup:</strong> Place 1 ion, 1 jam, 1 stress, and 1 tractor token on this card. %LINEBREAK%After a ship suffers the effect of a friendly bomb, you may remove 1 ion, jam, stress, or tractor token from this card. If you do, that ship gains a matching token."
    },
    "Saturation Salvo": {
        display_name: "Saturation Salvo",
        text: "While you perform a %TORPEDO% or %MISSILE% attack, you may spend 1&nbsp;%CHARGE% from that upgrade. If you do, choose two defense dice. The defender must reroll those dice."
    },
    "Saw Gerrera": {
        display_name: "Saw Gerrera",
        text: "While you perform an attack, you may suffer 1&nbsp;%HIT% damage to change all of your %FOCUS% results to %CRIT% results."
    },
    "Seasoned Navigator": {
        display_name: "Seasoned Navigator",
        text: "After you reveal your dial, you may set your dial to another non-red maneuver of the same speed. While you execute that maneuver, increase its difficulty."
    },
    "Seismic Charges": {
        display_name: "Seismic Charges",
        text: "<strong>Bomb</strong>%LINEBREAK%During the System Phase, you may spend 1&nbsp;%CHARGE% to drop a Seismic Charge with the [1&nbsp;%STRAIGHT%] template."
    },
    Selfless: {
        display_name: "Selfless",
        text: "While another friendly ship at range 0-1 defends, before the Neutralize Results step, if you are in the attack arc, you may suffer 1&nbsp;%CRIT% damage to cancel 1&nbsp;%CRIT% result."
    },
    Sense: {
        display_name: "Sense",
        text: "During the System Phase, you may choose 1 ship at range 0-1 and look at its dial. If you spend 1&nbsp;%FORCE%, you may choose a ship at range 0-3 instead."
    },
    "Servomotor S-Foils": {
        display_name: "Servomotor S-Foils",
        text: '<strong>Closed: </strong><i>%BOOST%, %FOCUS% <i class="xwing-miniatures-font xwing-miniatures-font-linked"></i> <r>%BOOST%</r></i>%LINEBREAK% While you perform a primary attack, roll 1 fewer attack die.%LINEBREAK%Before you activate, you may flip this card.%LINEBREAK%<strong>Open:</strong> Before you activate, you may flip this card.'
    },
    "Seventh Fleet Gunner": {
        display_name: "Seventh Fleet Gunner",
        text: "While another friendly ship performs a primary attack, if the defender is in your firing arc, you may spend 1 %CHARGE%. If you do, the attacker rolls 1&nbsp;additional die, to a maximum of 4. During the System Phase, you may gain 1 disarm token to recover 1 %CHARGE%."
    },
    "Seventh Sister": {
        display_name: "Seventh Sister",
        text: "If an enemy ship at range 0-1 would gain a stress token, you may spend 1&nbsp;%FORCE% to have it gain 1 jam or tractor token instead."
    },
    "Shield Upgrade": {
        display_name: "Shield Upgrade",
        text: "<i class = flavor_text>Deflector shields are a substantial line of defense on most starships beyond the lightest fighters. While enhancing a ship’s shield capacity can be costly, all but the most confident or reckless pilots see the value in this sort of investment.</i>"
    },
    "Skilled Bombardier": {
        display_name: "Skilled Bombardier",
        text: "If you would drop or launch a device, you may use a template of the same bearing with a speed 1 higher or lower."
    },
    "Spare Parts Canisters": {
        display_name: "Spare Parts Canisters",
        text: "<strong>Action:</strong> Spend 1&nbsp;%CHARGE% to recover 1&nbsp;charge on one of your equipped %ASTROMECH% upgrades. %LINEBREAK%<strong>Action:</strong> Spend 1&nbsp;%CHARGE% to drop 1 spare parts, then break all locks assigned to you."
    },
    "Special Forces Gunner": {
        display_name: "Special Forces Gunner",
        text: "While you perform a primary %FRONTARC% attack, if your %SINGLETURRETARC% is in your %FRONTARC%, you may roll 1&nbsp;additional attack die.%LINEBREAK%After you perform a primary %FRONTARC% attack, if your %SINGLETURRETARC% is in your %REARARC%, you may perform a bonus primary %SINGLETURRETARC% attack."
    },
    "Squad Leader": {
        display_name: "Squad Leader",
        text: "While you coordinate, the ship you choose can perform an action only if that action is also on your action bar."
    },
    "Static Discharge Vanes": {
        display_name: "Static Discharge Vanes",
        text: 'Before you would gain 1 ion or jam token, if you are not stressed, you may choose another ship at range 0-1 and gain 1 stress token. If you do, the chosen ship gains that ion or jam token instead, then you suffer 1 %HIT% damage. %LINEBREAK%<i>Errata (since rules reference 1.1.0): Changed from "If you would gain an ion or jam token, if you are not stressed, you may choose a ship at range 0-1. If you do, gain 1 stress token and transfer 1 ion or jam token to that ship."</i>'
    },
    "Stealth Device": {
        display_name: "Stealth Device",
        text: "While you defend, if your %CHARGE% is active, roll 1 additional defense die.%LINEBREAK%After you suffer damage, lose 1&nbsp;%CHARGE%."
    },
    "Supernatural Reflexes": {
        display_name: "Supernatural Reflexes",
        text: "Before you activate, you may spend 1&nbsp;%FORCE% to perform a %BARRELROLL% or %BOOST% action. Then, if you performed an action you do not have on your action bar, suffer 1&nbsp;%HIT% damage."
    },
    "Supreme Leader Snoke": {
        display_name: "Supreme Leader Snoke",
        text: "During the System Phase, you may choose any number of enemy ships beyond range 1. If you do, spend that many %FORCE% to flip each chosen ship’s dial faceup."
    },
    "Swarm Tactics": {
        display_name: "Swarm Tactics",
        text: "At the start of the Engagement Phase, you may choose 1 friendly ship at range 1. If you do, that ship treats its initiative as equal to yours until the end of the round."
    },
    "Synchronized Console": {
        display_name: "Synchronized Console",
        text: "After you perform an attack, you may choose a friendly ship at range 1 or a friendly ship with the <strong>Synchronized Console</strong> upgrade at range 1-3 and spend a lock you have on the defender. If you do, the friendly ship you chose may acquire a lock on the defender."
    },
    "TA-175": {
        display_name: "TA-175",
        text: "After a friendly ship at range 0-3 with %CALCULATE% on its action bar is destroyed, each friendly ship at range 0-3 with %CALCULATE% in its action bar gains 1 calculate token."
    },
    "TV-94": {
        display_name: "TV-94",
        text: "While a friendly ship at range&nbsp;0-3 performs a primary attack against a defender in its %BULLSEYEARC%, if there are 2&nbsp;or fewer attack dice, it may spend 1&nbsp;calculate token to add 1&nbsp;%HIT%&nbsp;result."
    },
    "Tactical Officer": {
        display_name: "Tactical Officer",
        text: "<i class = flavor_text>In the chaos of a starfighter battle, a single order can mean the difference between a victory and a massacre.</i>"
    },
    "Tactical Scrambler": {
        display_name: "Tactical Scrambler",
        text: "While you obstruct an enemy ship’s attack, the defender rolls 1 additional defense die."
    },
    "Targeting Computer": {
        text: " "
    },
    "Targeting Synchronizer": {
        display_name: "Targeting Synchronizer",
        text: "While a friendly ship at range 1-2 performs an attack against a target you have locked, that ship ignores the&nbsp;%LOCK% attack requirement."
    },
    "Tobias Beckett": {
        display_name: "Tobias Beckett",
        text: "<strong>Setup:</strong> After placing forces, you may choose 1 obstacle in the play area. If you do, place it anywhere in the play area beyond range 2 of any board edge or ship and beyond range 1 of other obstacles."
    },
    "Tractor Beam": {
        display_name: "Tractor Beam",
        text: "<strong>Attack:</strong> If this attack hits, all %HIT%/%CRIT% results inflict tractor tokens instead of damage."
    },
    "Trajectory Simulator": {
        display_name: "Trajectory Simulator",
        text: "During the System Phase, if you would drop or launch a bomb, you may launch it using the [5&nbsp;%STRAIGHT%] template instead."
    },
    Treacherous: {
        display_name: "Treacherous",
        text: "While you defend, you may choose a ship obstructing the attack and spend 1 %CHARGE%. If you do, cancel 1 %HIT% or %CRIT% result, and the ship you chose gains 1 strain token.%LINEBREAK%After a ship at range 0-3 is destroyed, recover 1 %CHARGE%."
    },
    "Trick Shot": {
        display_name: "Trick Shot",
        text: "While you perform an attack that is obstructed by an obstacle, roll 1 additional attack die."
    },
    "Unkar Plutt": {
        display_name: "Unkar Plutt",
        text: "After you partially execute a maneuver, you may suffer 1&nbsp;%HIT% damage to perform 1 white action."
    },
    "Veteran Tail Gunner": {
        display_name: "Veteran Tail Gunner",
        text: "After you perform a primary %FRONTARC% attack, you may perform a bonus primary %REARARC% attack."
    },
    "Veteran Turret Gunner": {
        display_name: "Veteran Turret Gunner",
        text: "After you perform a primary attack, you may perform a bonus %SINGLETURRETARC% attack using a %SINGLETURRETARC% you did not already attack from this round."
    },
    "Xg-1 Assault Configuration": {
        display_name: "Xg-1 Assault Configuration",
        text: "While you have exactly 1 disarm token, you can still perform %CANNON% attacks. While you perform a %CANNON% attack while disarmed, roll a maximum of 3 attack dice."
    },
    Zuckuss: {
        display_name: "Zuckuss",
        text: "While you perform an attack, if you are not stressed, you may choose 1 defense die and gain 1 stress token. If you do, the defender must reroll that die."
    },
    '"Chopper" (Crew)': {
        display_name: "“Chopper”",
        text: "During the Perform Action step, you may perform 1 action, even while stressed. After you perform an action while stressed, suffer 1&nbsp;%HIT% damage unless you expose 1 of your damage cards."
    },
    '"Chopper" (Astromech)': {
        display_name: "“Chopper”",
        text: "<strong>Action:</strong> Spend 1 non-recurring &nbsp;%CHARGE% from another equipped upgrade to recover 1 shield. %LINEBREAK%<strong>Action:</strong> Spend 2 shields to recover 1 non-recurring %CHARGE% on an equipped upgrade."
    },
    '"Genius"': {
        display_name: "“Genius”",
        text: "After you fully execute a maneuver, if you have not dropped or launched a device this round, you may drop 1 bomb."
    },
    '"Zeb" Orrelios': {
        display_name: "“Zeb” Orrelios",
        text: "You can perform primary attacks at range 0. Enemy ships at range 0 can perform primary attacks against you."
    },
    "Kaydel Connix": {
        display_name: "Kaydel Connix",
        text: "After you reveal your dial, you may set your dial to a basic maneuver of the next higher speed. While you execute that maneuver, increase its' difficulty."
    },
    Autoblasters: {
        display_name: "Autoblasters",
        text: "<strong>Attack:</strong> If the defender is in your %BULLSEYEARC%, roll 1 additional die. During the Neutralize Results step, if you are not in the defender's %FRONTARC%, %EVADE% results do not cancel %CRIT% results. "
    },
    "R2-C4": {
        display_name: "R2-C4",
        text: "While you perform an attack, you may spend 1 evade token to change 1 %FOCUS% result to a %HIT% result. "
    },
    "Electro-Proton Bomb": {
        display_name: "Electro-Proton Bomb",
        text: "<strong>Bomb</strong>%LINEBREAK%During the System Phase, you may spend 1 %CHARGE% to drop an Electro-Proton Bomb with the [1 %STRAIGHT%] template. Then place 1 fuse marker on that device. %LINEBREAK%This card’s %CHARGE% cannot be recovered."
    },
    "Passive Sensors": {
        display_name: "Passive Sensors",
        text: "<strong>Action:</strong> Spend 1 %CHARGE%. You can only perform this action in your Perform Action step. %LINEBREAK% While your %CHARGE% is inactive, you cannot be coordinated. Before you engage, if your %CHARGE% is inactive, you may perform a %CALCULATE% or %LOCK% action."
    },
    "R2-A6": {
        display_name: "R2-A6",
        text: " After you reveal your dial, you may set your dial to a maneuver of the same bearing of a speed 1 higher or lower."
    },
    "Amilyn Holdo": {
        display_name: "Amilyn Holdo",
        text: " Before you engage, you may choose another friendly ship at range 1-2. You may transfer to that ship 1 token of a type that ship does not have. That ship may transfer 1 token to you of a type you do not have."
    },
    "Larma D'Acy": {
        display_name: "Larma D'Acy",
        text: " While you have 2 or fewer stress tokens, you can perform %REINFORCE%, %COORDINATE%, and %JAM% actions, even while stressed.%LINEBREAK% While you perform a white %REINFORCE%, %COORDINATE%, or %JAM% action, if you are stressed, treat that action as red."
    },
    "PZ-4CO": {
        display_name: "PZ-4CO",
        text: "At the end of the Activation Phase, you may choose 1 friendly ship at range 1-2. If you do, transfer 1 calculate token to that ship. If your revealed maneuver is blue, you may transfer 1 focus token instead."
    },
    "Leia Organa (Resistance)": {
        display_name: "Leia Organa",
        text: "After a friendly ship reveals its dial, you may spend 1 %FORCE%. If you do, the chosen ship reduces the difficulty of that maneuver."
    },
    "Korr Sella": {
        display_name: "Korr Sella",
        text: "After you fully execute a blue maneuver, remove all of your stress tokens."
    },
    "Precognitive Reflexes": {
        display_name: "Precognitive Reflexes",
        text: "After you reveal your dial, you may spend 1 %FORCE% to perform a %BARRELROLL% or %BOOST% action. Then, if you performed an action you do not have on your action bar, gain 1 strain token. %LINEBREAK% If you do, you cannot perform another action during your activation."
    },
    Foresight: {
        display_name: "Foresight",
        text: "After an enemy ship executes a maneuver, you may spend 1 %FORCE% to perform this attack against it as a bonus attack. %LINEBREAK% <strong>Attack:</strong> You may change 1 %FOCUS% result to a %HIT% result; your dice cannot be modified otherwise."
    },
    "Angled Deflectors": {
        display_name: "Angled Deflectors",
        text: " "
    },
    "C1-10P": {
        display_name: "C1-10P",
        text: "<strong>C1-10P: </strong>Setup: Equip this side faceup. %LINEBREAK% After you execute a maneuver, you may spend 1 %CHARGE% to perform a red %EVADE% action, even while stressed. %LINEBREAK% During the End Phase, if this card has 0 active %CHARGE%, flip it. %LINEBREAK% <strong>C1-10P (Erratic):</strong> After you execute a maneuver, you <strong>must</strong> choose a ship at range 0-1. It gains 1 jam token."
    },
    "Ahsoka Tano": {
        display_name: "Ahsoka Tano",
        text: "After you execute a maneuver, you may spend 1 %FORCE% and choose a friendly ship at range 1-3 in your firing arc. If you do, it may perform a red %FOCUS% action, even while stressed."
    },
    "C-3PO (Republic)": {
        display_name: "C-3PO",
        text: "While you defend, if you are calculating, you may reroll 1 defense die. %LINEBREAK% After you perform a %CALCULATE% action, gain 1 calculate token."
    },
    "Gravitic Deflection": {
        display_name: "Gravitic Deflection",
        text: "While you defend, you may reroll 1 defense die for each tractored ship in the attack arc."
    },
    "Snap Shot": {
        display_name: "Snap Shot",
        text: "After an enemy ship executes a maneuver, you may perform this attack against it as a bonus attack. %LINEBREAK% <strong>Attack:</strong> Your dice cannot be modified."
    },
    "Deuterium Power Cells": {
        display_name: "Deuterium Power Cells",
        text: "During the System Phase, you may spend 1 %CHARGE% and gain 1 disarm token to recover 1 %SHIELD%. Before you would gain 1 non-lock token, if you are not stressed, you may spend 1 %CHARGE% to gain 1 stress token instead."
    },
    "Mag-Pulse Warheads": {
        display_name: "Mag-Pulse Warheads",
        text: "<strong>Attack (%LOCK%):</strong> Spend 1 %CHARGE%. If this attack hits, the defender suffers 1 %CRIT% damage and gains 1 deplete and 1 jam token. Then cancel all %HIT%/%CRIT% results."
    },
    "Coaxium Hyperfuel": {
        display_name: "Coaxium Hyperfuel",
        text: "You can perform the %SLAM% action even while stressed. If you do, you suffer 1 %CRIT% damage unless you expose 1 of your damage cards. %LINEBREAK% After you partially execute a maneuver, you may expose 1 of your damage cards or suffer 1 %CRIT% damage to perform a %SLAM% action."
    },
    "R1-J5": {
        display_name: "R1-J5",
        text: "While you have 2 or fewer stress tokens, you can perform actions on damage cards even while stressed. %LINEBREAK% After you repair a damage card with the <b>Ship</b> trait, you may spend 1 %CHARGE% to repair that card again."
    },
    "Stabilized S-Foils": {
        display_name: "Stabilized S-Foils",
        text: '<strong>Closed: </strong><i><r>%RELOAD%</r>, %BARRELROLL% <i class="xwing-miniatures-font xwing-miniatures-font-linked"></i><r> %EVADE%</r></i>%LINEBREAK% Before you activate, if you are not critically damaged, you may flip this card. %LINEBREAK% <strong>Open:</strong> <i>%BARRELROLL% <i class="xwing-miniatures-font xwing-miniatures-font-linked"></i><r> %LOCK%</r></i>%LINEBREAK% After you perform an attack, you may spend your lock on the defender to perform a bonus %CANNON% attack against that ship using a %CANNON% upgrade you have not attacked with this turn. %LINEBREAK% Before you activate, if you are not critically damaged, you may flip this card.'
    },
    "K-2SO": {
        text: "During the System Phase, you may choose a friendly ship at range 0-3. That ship gains 1 calculate token and 1 stress token."
    },
    "Proud Tradition": {
        text: "<strong>Proud Tradition</strong>%LINEBREAK%<strong>Setup:</strong> Equip this side faceup. %LINEBREAK% While you have 2 or fewer stress tokens, you may perform %FOCUS% actions even while stressed. After you perform an attack, if you are stressed, the defender may spend 1 focus token or suffer 1 %CRIT% damage to flip this card. %LINEBREAK% <strong>False Tradition</strong>%LINEBREAK% Treat your %FOCUS% actions as red."
    },
    "Cluster Mines": {
        text: "<strong>Mine</strong>%LINEBREAK% During the System Phase, you may spend 1 %CHARGE% to drop a Cluster Mine set using the [1 %STRAIGHT%] template. %LINEBREAK% This card's %CHARGE% cannot be recovered."
    },
    "Kaz's Fireball": {
        text: "<strong>Setup:</strong> When you resolve <strong>Explosion with Wings</strong>, you may search the damage deck and choose a damage card with the <b>Ship</b> trait: you are dealt that card instead. Then, shuffle the damage deck. %LINEBREAK% You can perform actions of damage cards even while ionized."
    },
    "Agent Terex": {
        text: "<strong>Setup:</strong> Equip this side faceup and place 3 calculate tokens on this card. %LINEBREAK% At the start of the Engagement Phase, you may choose a friendly ship at range 0-3 and remove 1 calculate token from this card to have that ship gain a matching token. Then, if there are no calculate tokens on this card, flip it. %LINEBREAK%<strong>Cyborg:</strong> During the System Phase, roll 1 attack die. On a %HIT% or %CRIT% result, gain 1 calculate token. Otherwise gain 1 jam token. %LINEBREAK% <strong>Action:</strong> Transfer 1 calculate token or 1 jam token to a ship at range 0-3."
    },
    "Clone Captain Rex": {
        text: "While you perform an attack, you may spend 1 %FOCUS% result. If you do, each friendly ship that has the defender in its %BULLSEYEARC% may gain 1 strain token to perform a %FOCUS% action."
    },
    '"Fives"': {
        text: "After you perform an attack that missed, if the defender's initiative is equal or greater than your initiative, place 1 evade or focus token on this card. %LINEBREAK% Before you engage, you may remove 1 token from this card to gain 1 matching token."
    },
    "Suppressive Gunner": {
        text: "While you perform an attack, you may spend 1 %FOCUS% result. If you do, the defender gains 1 deplete token unless it chooses to suffer 1 %HIT% damage."
    },
    "Ghost Company": {
        text: "After you perform a primary attack, if you are focused, you may perform a %SINGLETURRETARC% attack against a ship you have not attacked this round as a bonus attack."
    },
    Wolfpack: {
        text: "After a friendly ship at range 0-3 defends, if the attacker is in your firing arc, the defender may gain 1 strain token to acquire a lock on the attacker."
    },
    Yoda: {
        text: "After another friendly ship at range 0-2 fully executes a purple maneuver or performs a purple action, you may spend 1 %FORCE%. If you do, that ship recovers 1 %FORCE%."
    },
    "Kit Fisto": {
        text: "At the start of the Engagement Phase, you may choose 1 friendly ship at range 0-1 and spend 1 %FORCE%. If you do, it may perform a red %EVADE% action."
    },
    "Plo Koon": {
        text: "At the start of the End Phase, if you are reinforced, you may choose 1 friendly ship at range 0 or in your %LEFTARC% or %RIGHTARC% at range 1. That ship removes 1 deplete or strain token, or repairs 1 faceup damage card."
    },
    "Repulsorlift Stabilizers": {
        text: "<strong>Inactive: Setup:</strong> Equip this side faceup. Reduce the difficulty of your straight (%STRAIGHT%) maneuvers. %LINEBREAK% After you fully execute a maneuver, you may flip this card. %LINEBREAK%<strong>Active: </strong> After you reveal a bank (%BANKLEFT% or %BANKRIGHT%) or turn (%TURNLEFT% or %TURNRIGHT%), you <b>must</b> perform that maneuver as a slideslip, then flip this card. %LINEBREAK% After you fully execute a non-sideslip maneuver, you may flip this card."
    },
    "Multi-Missile Pods": {
        text: "<strong>Attack (%CALCULATE% or %LOCK%):</strong> Spend 1 %CHARGE%. If the defender is in your %FRONTARC%, you may spend 1 %CHARGE% to roll 1 additional attack die. If the defender is in your %BULLSEYEARC%, you may spend up to 2 %CHARGE% to roll that many additional attack dice instead."
    },
    "Synced Laser Cannons": {
        text: "<strong>Attack:</strong> If you are calculating, the defender does not apply the range bonus."
    },
    "Concussion Bombs": {
        text: 'During the System Phase, if any of this card\'s %CHARGE% are inactive, you <b>must</b> spend 1 %CHARGE% to drop 1 concussion bomb, if able, using the [1 %STRAIGHT%] template. Otherwise, you may spend 1 %CHARGE% to drop 1 concussion bomb. %LINEBREAK% <i>Errata (since rules reference 1.3.0): Added ""using the [1 %STRAIGHT%] template"</i>'
    },
    "Maneuver-Assist MGK-300": {
        text: "Reduce the difficulty of your 3 straight (%STRAIGHT%) and bank (%BANKLEFT% or %BANKRIGHT%) maneuvers."
    },
    "Target-Assist MGK-300": {
        text: "Before you engage, if you have no green tokens and you are not stressed, gain 1 calculate token for each enemy ship at range 2-3 in your firing arc, to a maximum of 2."
    },
    "Deadeye Shot": {
        text: "While you perform a primary attack, if the defender is in your %BULLSEYEARC%, you may spend 1 %HIT% result or change 1 %CRIT% result to a %HIT% result. If you do, the defender exposes 1 of its damage cards."
    },
    "Marg Sabl Closure": {
        text: "After you fully execute a maneuver, if you moved through an obstacle, structure, or huge ship, or if you deployed, you may choose 1 enemy ship in your %FRONTARC% at range 1-2. That ship gains 1 strain token."
    },
    "Hondo Ohnaka": {
        text: "<strong>Action:</strong> Choose 2 ships at range 1-3 of you that are friendly to each other. Coordinate one of the chosen ships, then jam the other, ignoring range restrictions."
    },
    "R2-D2 (Republic)": {
        text: "After you activate, you may spend 1 %CHARGE% and gain 1 deplete token to repair 1 damage card, recover 1 shield or remove 1 device at range 0-1."
    },
    Patience: {
        text: "At the start of the Engagement Phase, if there is an enemy ship in your %FRONTARC%, you may gain 1 deplete token to recover 1 %FORCE%."
    },
    "Syliure-31 Hyperdrive": {
        text: "<strong>Setup:</strong> You can be placed anywhere in the play area beyond range 1 of obstacles, beyond range 3 of enemy ships, and beyond range 3 of the enemy table edge."
    },
    "Jedi Commander": {
        text: "<strong>Setup Side:</strong>%LINEBREAK%Setup: Equip this side faceup. %LINEBREAK% You are a <b>wing leader</b>. Your wingmates must be 2-5 V-19 Torrents or 2-5 Nimbus-class V-wings. %LINEBREAK% After you are placed, flip this card. %LINEBREAK% <strong>Play Side:</strong>%LINEBREAK% While your wingmates execute purple maneuvers, they treat those maneuvers as red instead. %LINEBREAK% While you defend, up to 2 of your wingmates in the attack arc may each suffer 1 %HIT%/%CRIT% damage to cancel 1 matching result."
    },
    "Extreme Maneuvers": {
        text: "While you perform a %BOOST% action, you may spend 1 %FORCE% to use the turn (%TURNLEFT% or %TURNRIGHT%) template instead."
    },
    "Starbird Slash": {
        text: "After you fully execute a maneuver, you may choose 1 enemy ship you moved through. That ship gains 1 strain token. Then, if you are in that ship's firing arc, you gain 1 strain token."
    },
    "Backwards Tailslide": {
        text: 'While you boost or barrel roll, if your equipped %CONFIGURATION% upgrade has the "(Closed)" side faceup, you can move through and overlap obstacles. %LINEBREAK% After you boost or barrel roll through an obstacle, if you are not at range 0 of it, gain 1 evade token. '
    },
    "Overdrive Thruster": {
        text: "While you perform a red %BOOST%. %BARRELROLL%, or %SLAM% action, you <b>must</b> use a template of 1 speed higher if able."
    },
    "R2-D2 (Resistance)": {
        text: "During the End Phase, you may spend 1 %CHARGE% and 1 %SHIELD% to remove 1 red token. %LINEBREAK% During the End Phase, if you have no active %SHIELD%, you may spend 2 %CHARGE% to recover 1 %SHIELD% and gain 1 deplete token."
    },
    "R6-D8": {
        text: "While you perform an attack, you may reroll a number of attack dice up to the number of friendly ships at range 0-3 that have the defender in their %BULLSEYEARC%."
    },
    "Underslung Blaster Cannon": {
        text: "After an enemy ship executes a maneuver, you may perform this attack against it as a bonus attack. %LINEBREAK% <strong>Attack (%LOCK%):</strong> Your dice can be modified only by spending a lock for the default effect."
    },
    "Commander Pyre": {
        text: "<strong>Setup:</strong> After placing forces, choose an enemy ship. It gains 2 stress tokens. %LINEBREAK% While you defend, if the attacker is stressed, you may reroll 1 defense die."
    },
    "Commander Malarus": {
        text: "<strong>Setup:</strong> Equip this side face up. %LINEBREAK% While a friendly non-limited ship at range 0-1 performs a primary attack, that ship may reroll 1 blank result. If it does and the attack does not hit, you <b>must</b> flip this card. %LINEBREAK%<strong>Perfected:</strong> While you perform an attack, if the defender is in your %BULLSEYEARC%, you <b>must</b> convert all %FOCUS% results to %HIT% results and gain 1 stress token. Then, if you have 2 or more stress tokens, suffer 1 %HIT% damage."
    },
    "Automated Target Priority": {
        text: "While you perform an attack, you <b>must</b> choose a defender at the closest valid attack range. %LINEBREAK% After you perform an attack that missed, place 1 calculate token on this card. %LINEBREAK% Before you engage, you may remove 1 calculate token from this card to gain a matching token."
    },
    "Sensor Buoy Suite": {
        text: "<strong>Setup:</strong> Before placing forces, place 2 sensor buoy remotes beyond range 2 of any edge. %LINEBREAK% Before you engage, you may acquire a lock on a ship at range 0-1 of a friendly sensor buoy, ignoring range restrictions."
    },
    Kalani: {
        text: "After an enemy ship executes a maneuver, if it is in the %BULLSEYEARC% of a friendly ship at range 0-3, you may spend 1 %CHARGE%. If you do, that friendly ship acquires a lock on that enemy ship, then gains 1 stress token."
    },
    'Alpha-3B "Besh"': {
        text: "While you perform a primary attack, you may spend your lock on the defender to change 1 of your blank or %FOCUS% results to a %HIT% result."
    },
    'Alpha-3E "Esk"': {
        text: "While you perform a primary attack, before rolling attack dice, you may spend 2 charges. If you do, your %CRIT% results inflict ion tokens instead of damage."
    },
    "Thermal Detonators": {
        text: "<strong>Bomb</strong>%LINEBREAK% During the System Phase, you may spend up to 2 %CHARGE% to drop that many Thermal Detonators using the [1 %STRAIGHT%] or [2 %STRAIGHT%] template. Each must be placed using a different template. %LINEBREAK% When you reload this card, recover 1 additional %CHARGE%."
    },
    "R7-A7": {
        text: "While you perform an attack, you may spend 1 %CHARGE% to change 1 %HIT% result to a %CRIT% result."
    },
    "Q7 Astromech": {
        text: "While you barrel roll or boost, you can move through and overlap obstacles."
    },
    "Ion Limiter Override": {
        text: "After you fully execute a red maneuver, you may perform a %BARRELROLL% action, even while stressed. If you do, roll an attack die: On a %HIT% result gain 1 strain token, and on a %CRIT% result gain 1 ion token."
    },
    "Precision Ion Engines": {
        text: "Before you execute a speed 1-3 Koiogran Turn [%KTURN%] maneuver, you may spend 1 %CHARGE% to execute that maneuver as a Segnor's Loop [%SLOOPLEFT% or %SLOOPRIGHT%] maneuver instead."
    },
    "Intercept Booster": {
        text: '<strong>Attached:</strong> %SLAM% <i class="xwing-miniatures-font xwing-miniatures-font-linked"></i> <r>%LOCK%</r></i>%LINEBREAK% <strong>Setup:</strong> Equip this side faceup. %LINEBREAK% <i>(Added Actions available on this side only)</i>%LINEBREAK% During the System Phase, gain 1 disarm token unless you flip this card. %LINEBREAK% At the end of the End Phase, if you have no active %CHARGE%, flip this card. %LINEBREAK% <strong>Detached:</strong> <i>Empty</i>'
    },
    "XX-23 S-Thread Tracers": {
        text: "<strong>Attack: [%FOCUS%, %CALCULATE%, or %LOCK%]</strong>&nbspSpend 1 %CHARGE%. If this attack hits, each friendly ship at range 1-3 of the defender may acquire a lock on the defender. Then cancel all dice results."
    },
    "Independent Calculations": {
        text: "Replace your <strong>Networked Calculations</strong> ship ability with the following: %LINEBREAK% <strong>Independent Calculations:</strong> While you perform a white %CALCULATE% action, you may treat it as red to gain 1 additional calculate token. Other ships cannot spend your calculate tokens using the <strong>Networked Calculations</strong> ship ability."
    },
    "Jango Fett": {
        text: "While you defend or perform an attack, you may spend your lock on the enemy ship to change 1 of the enemy ship's %FOCUS% results to a blank result."
    },
    "Zam Wesell": {
        text: "<strong>Setup:</strong> Lose 2 %CHARGE%. %LINEBREAK% During the System Phase, you may assign 1 of your secret conditions to yourself facedown: <strong> %LINEBREAK% You Should Thank Me %LINEBREAK% You'd Better Mean Business. </strong>"
    },
    "Boba Fett (Separatist)": {
        display_name: "Boba Fett",
        text: "While you perform an attack, if there are no other ships in the attack arc, you may change 1 of your %FOCUS% results to a %HIT% result."
    },
    "Slave I (Separatist)": {
        display_name: "Slave I",
        text: "While you perform a %FRONTARC% attack, if you are in the defender's %FULLREARARC%, you may change 1 %HIT% result to a %CRIT% result."
    },
    "Weapons Systems Officer": {
        text: "After you perform a special attack with the %LOCK% requirement, you may acquire a lock on the defender."
    },
    "False Transponder Codes": {
        text: "After you acquire a lock on an object or an object acquires a lock on you, if you have 1 active %CHARGE%, lose 1 %CHARGE% and jam that object, ignoring range restrictions."
    },
    "Vectored Cannons (RZ-1)": {
        text: "Gain a %SINGLETURRETARC% indicator. Treat the arc requirement of your %FRONTARC% primary attack as %SINGLETURRETARC%. %LINEBREAK% Replace your <strong>Vectored Thrusters</strong> ship ability with the following: %LINEBREAK%<strong>Vectored Cannons:</strong> During the System Phase, you may perform a red %BOOST% or red %ROTATEARC% action. You can rotate your %SINGLETURRETARC% indicator only to your %FRONTARC% or %REARARC%."
    },
    "B6 Blade Wing Prototype (Epic)": {
        text: "Attack (%LOCK%): Gain 1 ion token to perform this attack. If this attack hits, the defender suffers 1 additional %HIT%/%CRIT% damage for each matching uncanceled result after the first."
    },
    "TIE Defender Elite": {
        text: "Decrease the difficulty of your turn (%TURNLEFT% or %TURNRIGHT%) maneuvers. Increase the difficulty of your Koiogran Turn (%KTURN%) maneuvers. Replace your <strong>Full Throttle</strong> ship ability with the following: %LINEBREAK% <strong>Advanced Fire Control:</strong> After you perform a %CANNON% or %MISSILE% attack, if you have a lock on the defender, you may perform a bonus primary attack against the defender."
    },
    "Sensitive Controls": {
        text: "Replace your <strong>Autothrusters</strong> ship ability with the following: %LINEBREAK%<strong>Sensitive Controls:</strong> During the System Phase, you may perform a red %BARRELROLL% or red %BOOST% action."
    },
    Cutthroat: {
        text: "After another friendly ship at range 0-3 is destroyed, if that ship is limited or has the <strong>Cutthroat</strong> upgrade, you may remove 1 of your orange or red tokens, or recover 1 non-recurring %CHARGE% on your ship card or one of your equipped upgrade cards."
    },
    "Tierfon Belly Run": {
        text: "You can perform special attacks even while at range 0 of asteroids. %LINEBREAK% While you defend, if you are at range 0 of an obstacle, attack dice cannot be rerolled."
    },
    "B6 Blade Wing Prototype": {
        text: " "
    },
    "Phoenix Squadron": {
        text: "<strong>Setup Side:</strong>%LINEBREAK%Setup: Equip this side faceup. %LINEBREAK% You are a <b>wing leader</b>. Your wingmates must be 2-5 of the following: %LINEBREAK% - 0-1 Attack Shuttle %LINEBREAK% - 0-1 Sheathipede-class Shuttle %LINEBREAK% - 0-5 RZ-1 A-wings %LINEBREAK% After you are placed, flip this card. %LINEBREAK% <strong>Play Side:</strong>%LINEBREAK% At the start of the Planning Phase, 1 of your wingmates that is docked with you may join your wing without gaining a stress token. %LINEBREAK% While you or your Attack Shuttle wingmate or Sheathipede-class wingmate defends, up to 2 of your RZ-1 A-Wing wingmates in the attack arc may each suffer 1 %HIT%/%CRIT% damage to cancel 1 matching result."
    },
    Hopeful: {
        text: "After another friendly ship at range 0-3 is destroyed, if that ship is limited or has the <strong>Hopeful</strong> upgrade, you may perform a %FOCUS% or %BOOST% action."
    },
    "Sabine Wren (Gunner)": {
        display_name: "Sabine Wren",
        text: "After you perform a special attack, you may choose a number of friendly ships at range 0-3 of the defender up to the number of damage cards dealt to the defender during that attack. Each chosen ship may remove 1 strain or stress token."
    },
    Disciplined: {
        text: "After another friendly ship at range 0-3 is destroyed, if that ship is limited or has the <strong>Disciplined</strong> upgrade, you may perform a %LOCK% or %BARRELROLL% action."
    },
    "Shadow Wing": {
        text: "<strong>Setup Side:</strong>%LINEBREAK%Setup: Equip this side faceup. %LINEBREAK% You are a <b>wing leader</b>. Your wingmates must be 2-5 other ships of your type. %LINEBREAK% After you are placed, flip this card. %LINEBREAK% <strong>Play Side:</strong>%LINEBREAK% Your wingmates can perform %BARRELROLL% or %BOOST% actions. If they do, they voluntarily split from the wing. %LINEBREAK% While you defend, up to 2 of your wingmates in the attack arc may each suffer 1 %HIT%/%CRIT% damage to cancel 1 matching result."
    },
    "Skystrike Academy Class": {
        text: "<strong>Setup Side:</strong>%LINEBREAK%Setup: Equip this side faceup. %LINEBREAK% You are a <b>wing leader</b>. Your wingmates must be 2-5 TIE/ln FIghters with initiative lower than yours. %LINEBREAK% After you are placed, flip this card. %LINEBREAK% <strong>Play Side:</strong>%LINEBREAK% After you barrel roll or boost, each of your wingmates is forced to split from the wing %LINEBREAK% While you defend, up to 5 of your wingmates in the attack arc may each suffer 1 %HIT%/%CRIT% damage to cancel 1 matching result."
    },
    "In It For The Money": {
        text: "<strong>In It For The Money:</strong>%LINEBREAK%Setup: Equip this side faceup. %LINEBREAK% You can be included in Republic, Rebel, and Resistance squads. %LINEBREAK% After an allied limited ship in your squad is destroyed, gain 1 focus token and flip this card. %LINEBREAK% <strong>In It For Your Rebellion:</strong>%LINEBREAK% Non-Scum ships in your squad are treated as friendly instead of allied."
    },
    Bounty: {
        text: "<strong>Hired:</strong>%LINEBREAK%Setup: Equip this side faceup. %LINEBREAK% You can be included in Separatist, Imperial , and First Order squads. %LINEBREAK% After you perform an attack, if the defender was a limited ship and was destroyed, you may recover 1 %CHARGE% on your ship card and each of your upgrade cards. Then flip this card. %LINEBREAK% <strong>Paid:</strong>%LINEBREAK% "
    },
    "Gamut Key": {
        text: "At the start of the End Phase, you may spend 2 %CHARGE% to choose a ship at range 0-1 with 1 or more circular tokens. During the End Phase, circular tokens are not removed from that ship."
    },
    "Interloper Turn": {
        text: "Before you execute a speed 1-2 turn (%TURNLEFT% or %TURNRIGHT%) or speed 1-2 Koiogran Turn (%KTURN%), if you are at range 0-1 of an asteroid, structure, or huge ship, you may gain 1 tractor token."
    },
    "Protectorate Gleb": {
        text: "After you coordinate a friendly ship, you may transfer 1 orange or red token to the ship you coordinated. %LINEBREAK% <i>Errata (RR: 1.2.0 [06/14/2021]): Added restriction stipulating friendly ship</i>"
    },
    "R4-B11": {
        text: "While you perform an attack, you may remove 1 orange or red token from the defender to reroll any number of defense dice"
    },
    "Admiral Ozzel": {
        display_name: "Admiral Ozzel",
        text: "While a friendly large or huge ship at range 0-3 executes a maneuver, it may suffer 1 %HIT% damage to execute a maneuver of the same bearing and difficulty of a speed 1 higher or lower instead."
    },
    Azmorigan: {
        display_name: "Azmorigan",
        text: "During the End Phase, you may choose up to 2 friendly ships at range 0-1. If you do, each of these ships does not remove 1 calculate or evade token."
    },
    "Captain Needa": {
        display_name: "Captain Needa",
        text: "After a friendly ship at range 0-4 reveals its dial, you may spend 1 %CHARGE%. If you do, it sets its dial to another maneuver of the same difficulty and speed."
    },
    "Strategic Commander": {
        display_name: "Strategic Commander",
        text: "After a friendly ship at range 0-4 reveals its dial, you may spend 1 %CHARGE%. If you do, it sets its dial to another maneuver of the same difficulty and speed."
    },
    "Carlist Rieekan": {
        display_name: "Carlist Rieekan",
        text: "After a friendly ship at range 0-2 is destroyed, you may choose a friendly ship at range 0-2. If you do, it may perform a red %EVADE% action."
    },
    "Jan Dodonna": {
        display_name: "Jan Dodonna",
        text: "Friendly ships at range 0-3 can spend your focus and evade tokens."
    },
    "Raymus Antilles": {
        display_name: "Raymus Antilles",
        text: "After you are destroyed, each friendly ship at range 0-1 gains 1 focus token. After you are destroyed, you are not removed until the end of the End Phase."
    },
    "Stalwart Captain": {
        display_name: "Stalwart Captain",
        text: "After you are destroyed, you are not removed until the end of the End Phase."
    },
    "Agent of the Empire": {
        display_name: "Agent of the Empire",
        text: "You are a <strong>wing leader</strong>. Your wingmates must be 2, 3, 4, or 5 TIE/ln fighters. %LINEBREAK% While you defend, up to 2 of your wingmates in the attack arc may suffer 1 %HIT% or %CRIT% damage to cancel a matching result."
    },
    "First Order Elite": {
        display_name: "First Order Elite",
        text: "You are a <strong>wing leader</strong>. Your wingmates must be 2 or 3 TIE/fo fighters or TIE/sf fighters. %LINEBREAK% While you defend, up to 2 of your wingmates in the attack arc may suffer 1 %HIT% or %CRIT% damage to cancel a matching result."
    },
    "Veteran Wing Leader": {
        display_name: "Veteran Wing Leader",
        text: "You are a <strong>wing leader</strong>. Your wingmates must be 2, 3, 4, or 5 other ships of your ship type. %LINEBREAK% While you defend, up to 2 of your wingmates in the attack arc may suffer 1 %HIT% or %CRIT% damage to cancel a matching result."
    },
    "Dreadnought Hunter": {
        display_name: "Dreadnought Hunter",
        text: "While you perform an attack against a huge ship, if the attack deals a faceup damage card to the defender and the defender is in your %BULLSEYEARC%, you may apply the <strong>Precision Shot</strong> effect even if you are not in the specified arc."
    },
    "Ion Cannon Battery": {
        display_name: "Ion Cannon Battery",
        text: "<strong>Online: </strong> Setup: Equip this side faceup.%LINEBREAK% Bonus Attack: Spend 1 %ENERGY%. If this attack hits, the defender suffers 1 %CRIT% damage, and all %HIT%/%CRIT% results inflict ion tokens instead of damage. %LINEBREAK%<strong>Offline: </strong> %LINEBREAK% After you engage, you may spend 2 %ENERGY% to flip this card."
    },
    "Targeting Battery": {
        display_name: "Targeting Battery",
        text: "<strong>Online: </strong> Setup: Equip this side faceup.%LINEBREAK% Bonus Attack: Spend 1 %ENERGY%. After you perform this attack, you may acquire a lock on the defender. %LINEBREAK%<strong>Offline: </strong> %LINEBREAK% After you engage, you may spend 2 %ENERGY% to flip this card."
    },
    "Ordnance Tubes": {
        display_name: "Ordnance Tubes",
        text: "<strong>Online: </strong> Setup: Equip this side faceup. %LINEBREAK% You can perform %TORPEDO% and %MISSILE% attacks only as bonus attacks. You <strong>must</strong> treat the %FRONTARC% requirement of your equipped %TORPEDO% and %MISSILE% upgrades as %FULLFRONTARC%. %LINEBREAK% Bonus Attack: Perform a %TORPEDO% attack. %LINEBREAK% Bonus Attack: Perform a %MISSILE% attack. %LINEBREAK%<strong>Offline: </strong> %LINEBREAK% You must treat the %FRONTARC% requirement of your equipped %TORPEDO% and %MISSILE% upgrades as %BULLSEYEARC%. %LINEBREAK% Action: Spend 2 %ENERGY% to flip this card."
    },
    "Point-Defense Battery": {
        display_name: "Point-Defense Battery",
        text: "<strong>Online: </strong> Setup: Equip this side faceup. %LINEBREAK% Bonus Attack: Spend 1 %ENERGY%. %LINEBREAK% Bonus Attack: Spend 1 %ENERGY%. %LINEBREAK% Bonus Attack: Spend 1 %ENERGY%. %LINEBREAK% Bonus Attack: Spend 1 %ENERGY%. %LINEBREAK%<strong>Offline: </strong> %LINEBREAK% After you engage, you may spend 2 %ENERGY% to flip this card."
    },
    "Turbolaser Battery": {
        display_name: "Turbolaser Battery",
        text: "<strong>Online: </strong> Setup: Equip this side faceup.%LINEBREAK% Bonus Attack (%LOCK%): Spend 3 %ENERGY%. If this attack hits, add 3 %HIT% results. %LINEBREAK% <strong>Offline: </strong> %LINEBREAK% After you engage, you may spend 2 %ENERGY% to flip this card."
    },
    "Bombardment Specialists": {
        display_name: "Bombardment Specialists",
        text: "While you perform an attack, you may spend 1 calculate token to increase or decrease the range requirement by 1, to a limit of 0-5."
    },
    "Comms Team": {
        display_name: "Comms Team",
        text: "After you perform a %COORDINATE% action, you may spend up to 2 %ENERGY% to coordinate that many additional ships at range 0-1 of the ship you coordinated."
    },
    "IG-RM Droids": {
        display_name: "IG-RM Droids",
        text: "While you perform an attack, if you are calculating, you may change 1 %HIT% result to a %CRIT% result."
    },
    "Gunnery Specialists": {
        display_name: "Gunnery Specialists",
        text: "While you perform a primary or %HARDPOINT% attack, you may spend 1 or more %ENERGY% to reroll that many attack dice."
    },
    "Damage Control Team": {
        display_name: "Damage Control Team",
        text: "Before you engage, you may spend 1 or more %ENERGY% to flip that many of your <strong>Offline</strong> upgrade cards.%LINEBREAK% Action: Spend 1 or more %ENERGY% to repair that many of your faceup <strong>Ship</strong> damage cards."
    },
    "Ordnance Team": {
        display_name: "Ordnance Team",
        text: "While you perform a %RELOAD% action, you may spend up to 3 %ENERGY% to reload that many additional %CHARGE% on your equipped %MISSILE%/%TORPEDO% upgrades. %LINEBREAK% After you perform a %RELOAD% action, you may spend 1 %ENERGY% to remove 1 disarm token."
    },
    "Sensor Experts": {
        display_name: "Sensor Experts",
        text: "You can maintain up to 3 locks on different objects. %LINEBREAK% After you perform a %LOCK% action, you may spend up to 2 %ENERGY% to acquire a lock on that many other objects at range 0-1 of the object you locked, ignoring range restrictions."
    },
    "Quick-Release Locks": {
        display_name: "Quick-Release Locks",
        text: "During the System Phase, you may spend 1 %CHARGE% to place 1 cargo crate drift in your %REARARC% at range 0. It cannot overlap a ship this way.%LINEBREAK% This card's %CHARGE% cannot be recovered."
    },
    "Saboteur's Map": {
        display_name: "Saboteur's Map",
        text: "At the end of Setup, you may spend up to 1 %CHARGE% from each of your equipped <strong>Mine</strong> upgrades to place the corresponding device in the play area beyond range 2 of any enemy ship, strategic marker, or other device."
    },
    "Scanner Baffler": {
        display_name: "Scanner Baffler",
        text: "At the end of Setup, you may choose any number of other friendly, non-huge ships in your deployment area at range 0-1. If you do, place those ships anywhere in the same deployment area."
    },
    "Adaptive Shields": {
        display_name: "Adaptive Shields",
        text: "While another friendly ship at range 0-1 defends, if it is a smaller size than you, you may spend 1 shield or 2 %ENERGY% to cancel 1 %HIT% or %CRIT% result."
    },
    "Boosted Scanners": {
        display_name: "Boosted Scanners",
        text: "While you lock, coordinate, or jam, you may spend up to 3 %ENERGY% to increase the range at which you can choose an object by 1 per %ENERGY% spent this way, to a maximum of range 5."
    },
    "Optimized Power Core": {
        display_name: "Optimized Power Core",
        text: "After you execute a blue maneuver, recover 1 %ENERGY%."
    },
    "Tibanna Reserves": {
        display_name: "Tibanna Reserves",
        text: "Action: Spend 1 %CHARGE% to recover 2 %ENERGY%."
    },
    "Toryn Farr": {
        display_name: "Toryn Farr",
        text: "After you coordinate a friendly ship, it may acquire a lock on a ship you are locking, ignoring range restrictions."
    },
    "Dodonna's Pride": {
        display_name: "Dodonna's Pride",
        text: " "
    },
    "Jaina's Light": {
        display_name: "Jaina's Light",
        text: "While a friendly ship at range 0-2 defends, if the attack is obstructed by an obstacle, you may spend 1 %ENERGY%. If you do, the defender rolls 1 additional defense die."
    },
    Liberator: {
        display_name: "Liberator",
        text: "You can dock up to 2 small ships. %LINEBREAK% After a ship deploys from you, it may perform a %FOCUS% or %BARRELROLL% action."
    },
    "Tantive IV": {
        display_name: "Tantive IV",
        text: "While you defend, if the attacker is in your %REARARC%, you may roll 1 additional defense die."
    },
    Thunderstrike: {
        display_name: "Thunderstrike",
        text: "While you perform a bonus attack, if you have not attacked the defender this round, you may reroll 1 attack die."
    },
    "Bright Hope": {
        display_name: "Bright Hope",
        text: "You can reinforce only your %FULLFRONTARC%. %LINEBREAK% While you defend, if you are reinforced and the attacker is in your %FULLFRONTARC%, you may roll 1 additional defense die."
    },
    Luminous: {
        display_name: "Luminous",
        text: "Setup: You are placed in reserve. %LINEBREAK% At the end of setup, you are placed in the play area at range 0-2 of a friendly ship."
    },
    "Quantum Storm": {
        display_name: "Quantum Storm",
        text: "After you fully execute a white maneuver, recover 1 %ENERGY%."
    },
    Assailer: {
        display_name: "Assailer",
        text: "While you defend, if the attack range is 1, you may roll 1 additional defense die."
    },
    Corvus: {
        display_name: "Corvus",
        text: "You can dock up to 2 small ships. %LINEBREAK% After you perform a %CALCULATE% action, gain 1 calculate token."
    },
    Impetuous: {
        display_name: "Impetuous",
        text: "After you perform an attack, if the defender was destroyed, you may perform a %FOCUS% or %LOCK% action."
    },
    Instigator: {
        display_name: "Instigator",
        text: "While you perform an attack, if the defender has an orange or red token, you may reroll up to 2 attack dice."
    },
    "Blood Crow": {
        display_name: "Blood Crow",
        text: "While you perform an attack at attack range 1-2, you may add 1 %FOCUS% result."
    },
    Requiem: {
        display_name: "Requiem",
        text: "After a ship deploys from you, it may acquire a lock on one ship you are locking, ignoring range restrictions."
    },
    Suppressor: {
        display_name: "Suppressor",
        text: "After you coordinate a friendly ship, you may spend 1 %ENERGY% to jam an enemy ship at range 0-2 of that ship, ignoring range restrictions."
    },
    Vector: {
        display_name: "Vector",
        text: "After a ship deploys from you, it may perform a %EVADE% or %BOOST% action."
    },
    "Broken Horn": {
        display_name: "Broken Horn",
        text: "If you are damaged, reduce the difficulty of your speed 3-5 maneuvers."
    },
    "Merchant One": {
        display_name: "Merchant One",
        text: "Bonus Attack: Perform a %TURRET% attack."
    },
    "Insatiable Worrt": {
        display_name: "Insatiable Worrt",
        text: "During the End Phase, you may recover 1 additional shield or 1 additional %ENERGY%."
    },
    "Corsair Refit": {
        display_name: "Corsair Refit",
        text: "Bonus Attack: Spend 1 %ENERGY% to perform a %CANNON%, %TURRET%, or %MISSILE% attack."
    },
    "Enhanced Propulsion": {
        display_name: "Enhanced Propulsion",
        text: "<strong>Setup:</strong> Equip this side faceup.%LINEBREAK% At the start of the End Phase, you may spend 2 %ENERGY% to execute a white [2 %STRAIGHT%], [1 %BANKLEFT%], or [1 %BANKRIGHT%] maneuver. %LINEBREAK% "
    },
    "Drill Beak": {
        display_name: "Drill Beak",
        text: "<strong>Setup:</strong> Equip this side faceup.%LINEBREAK% You can preform this attack at range 0.\n%LINEBREAK% <strong>Bonus Attack:</strong> Spend 1 %ENERGY%. If the attack range is 0, change all %HIT% results to %CRIT% results."
    },
    "Tractor Tentacles": {
        display_name: "Tractor Tentacles",
        text: "<strong>Setup:</strong> Equip this side faceup.\n%LINEBREAK% <strong>Bonus Attack</strong> %LINEBREAK% <strong>Bonus Attack:</strong> Spend 1 %ENERGY%. %LINEBREAK% <strong>Bonus Attack:</strong> Spend 1 %ENERGY%. %LINEBREAK% <strong>Bonus Attack:</strong> Spend 1 %ENERGY%."
    },
    "Tracking Torpedoes": {
        display_name: "Tracking Torpedoes",
        text: "During the System Phase, you may spend up to 3 %CHARGE% to launch that many tracking torpedoes using the [%BANKLEFT% 3], [%STRAIGHT% 4], and [%BANKRIGHT% 3] templates. Each device must use a seperate tempalte. Then each device may acquire a lock on an object you have locked, ignoring range restrictions."
    },
    "Proton Cannon Battery": {
        display_name: "Proton Cannon Battery",
        text: "<strong>Setup:</strong> Equip this side faceup.\n%LINEBREAK% <strong>Bonus Attack:</strong> Change 1 %HIT% result to a %CRIT% result. %LINEBREAK% <strong>Bonus Attack:</strong> Spend 1 %ENERGY%. Change 1 %HIT% result to a %CRIT% result."
    },
    "Tractor Technicians": {
        display_name: "Tractor Technicians",
        text: "During the End Phase, each other ship at range 0-1 cannot remove its tractor tokens. %LINEBREAK% Before a tractored enemy ship at range 0-1 reveals its dial, you may spend 1 %ENERGY%. If you do, while that ship executes its maneuver this activation, it reduces the speed of that maneuver by 1, to a minimum of 1."
    },
    "Asajj Ventress (Command)": {
        display_name: "Asajj Ventress",
        text: "During the System Phase, you may spend 1 %FORCE%. IF you do, each enemy ship in your %FRONTARC% at range 0-1 gains 1 strain token unless it chooses to gain 1 jam token."
    },
    "Hondo Ohnaka (Command)": {
        display_name: "Hondo Ohnaka",
        text: "During the System Phase, you may spend 1 %CHARGE% and choose 1 friendly shiop at range 0-1. Move 1 Victory Token or Objective Token from its ship card to your ship card, or from your ship card to its ship card."
    },
    "Zealous Captain": {
        display_name: "Zealous Captain",
        text: "During the Engagement Phase, at initiative 4, you may spend 1 %ENERGY% to perform a bonus %HARDPOINT% attack."
    },
    "General Grievous (Command)": {
        display_name: "General Grievous",
        text: "During the Engagement Phase, at initiative 4, you may spend 1 %ENERGY% to perform a bonus %HARDPOINT% attack. %LINEBREAK% You can perform attacks against friendly ships. %LINEBREAK% After you perform an attack, if the defender was destroyed, each friendly ship at range 0-2 of it may perform a %CALCULATE% action."
    },
    "Mar Tuuk": {
        display_name: "Mar Tuuk",
        text: "<strong>Setup:</strong> After placing forces, choose 1 friendly wing of ships with %CALCULATE% on their action bars and place that wing in reserve. %LINEBREAK% During the End Phase, you may place that wing within your deployment area or beyond range 2 of any enemy shp. Then you may choose 1 enemy ship at range 0-1 of you; each ship in that wing acquires a lock on it."
    },
    "Riff Tamson": {
        display_name: "Riff Tamson",
        text: "During the Engagement Phase, at initiative 5, you may spend 1 %ENERGY% to perform a bonus %HARDPOINT% attack. %LINEBREAK% After you perform an attack, if the defender was dealt 1 or more faceup damage cards, it gains 2 strain tokens."
    },
    "Corsair Crew": {
        display_name: "Corsair Crew",
        text: "While you perform an attack against a standard ship, you may spend 1 %HIT% result. If you do, the defender gains 1 deplete token."
    },
    Grappler: {
        display_name: "Grappler",
        text: "While you perform a <b>Drill Beak</b> attack, at range 1, if the defender is tractored, treat it as being range 0 instead."
    },
    "Nautolan's Revenge": {
        display_name: "Nautolan's Revenge",
        text: "Before you engage, you may spend up to 2 calculate tokens. If you do, recover that many %ENERGY%."
    },
    "Droid Crew": {
        display_name: "Droid Crew",
        text: "While you perform a white %FOCUS% action, treat it as red instead. %LINEBREAK% At the start of the End Phase, repair all of your faceup <b>Crew</b> damage cards."
    },
    Trident: {
        display_name: "Trident",
        text: "After you overlap a ship or a ship overlaps you, if it is not tractored, you may spend 1 %ENERGY%. If you do, it gains 3 tractor tokens."
    },
    "Neimoidian Grasp": {
        display_name: "Neimoidian Grasp",
        text: "After you perform an attack, you may perform a red  %EVADE% action. While you defend, if you are evading, you may roll 1 addtional defense die."
    }
};
exports.upgradeRules = upgradeRules;
var slots = {
    Astromech: { key: "Astromech", displayName: "Astromech" },
    Force: { key: "Force", displayName: "Force" },
    Bomb: { key: "Bomb", displayName: "Bomb" },
    Cannon: { key: "Cannon", displayName: "Cannon" },
    Crew: { key: "Crew", displayName: "Crew" },
    Missile: { key: "Missile", displayName: "Missile" },
    Sensor: { key: "Sensor", displayName: "Sensor" },
    Torpedo: { key: "Torpedo", displayName: "Torpedo" },
    Turret: { key: "Turret", displayName: "Turret" },
    HardpointShip: { key: "HardpointShip", displayName: "Hardpoint" },
    Hardpoint: { key: "Hardpoint", displayName: "Hardpoint" }, //this hardpoint is for huge ships, the other one is for regular ships that accept cannon, missile, or torpedo in a slot
    Illicit: { key: "Illicit", displayName: "Illicit" },
    Configuration: { key: "Configuration", displayName: "Configuration" },
    Talent: { key: "Talent", displayName: "Talent" },
    Modification: { key: "Modification", displayName: "Modification" },
    Gunner: { key: "Gunner", displayName: "Gunner" },
    Device: { key: "Device", displayName: "Payload" },
    Tech: { key: "Tech", displayName: "Tech" },
    Title: { key: "Title", displayName: "Title" },
    "Tactical Relay": { key: "Tactical Relay", displayName: "Tactical Relay" },
    Command: { key: "Command", displayName: "Command" },
    Hyperdrive: { key: "Hyperdrive", displayName: "Hyperdrive" },
    Team: { key: "Team", displayName: "Team" },
    Cargo: { key: "Cargo", displayName: "Cargo" }
};
exports.slots = slots;
var sloticon = {
    Astromech: '<i class="xwing-miniatures-font xwing-miniatures-font-astromech"></i>',
    Force: '<i class="xwing-miniatures-font xwing-miniatures-font-forcepower"></i>',
    Bomb: '<i class="xwing-miniatures-font xwing-miniatures-font-bomb"></i>',
    Cannon: '<i class="xwing-miniatures-font xwing-miniatures-font-cannon"></i>',
    Crew: '<i class="xwing-miniatures-font xwing-miniatures-font-crew"></i>',
    Talent: '<i class="xwing-miniatures-font xwing-miniatures-font-talent"></i>',
    Missile: '<i class="xwing-miniatures-font xwing-miniatures-font-missile"></i>',
    Sensor: '<i class="xwing-miniatures-font xwing-miniatures-font-sensor"></i>',
    Torpedo: '<i class="xwing-miniatures-font xwing-miniatures-font-torpedo"></i>',
    Turret: '<i class="xwing-miniatures-font xwing-miniatures-font-turret"></i>',
    Illicit: '<i class="xwing-miniatures-font xwing-miniatures-font-illicit"></i>',
    Configuration: '<i class="xwing-miniatures-font xwing-miniatures-font-configuration"></i>',
    Modification: '<i class="xwing-miniatures-font xwing-miniatures-font-modification"></i>',
    Gunner: '<i class="xwing-miniatures-font xwing-miniatures-font-gunner"></i>',
    Device: '<i class="xwing-miniatures-font xwing-miniatures-font-device"></i>',
    Tech: '<i class="xwing-miniatures-font xwing-miniatures-font-tech"></i>',
    Title: '<i class="xwing-miniatures-font xwing-miniatures-font-title"></i>',
    Hardpoint: '<i class="xwing-miniatures-font xwing-miniatures-font-hardpoint"></i>',
    Team: '<i class="xwing-miniatures-font xwing-miniatures-font-team"></i>',
    Cargo: '<i class="xwing-miniatures-font xwing-miniatures-font-cargo"></i>',
    Command: '<i class="xwing-miniatures-font xwing-miniatures-font-command"></i>',
    HardpointShip: '<i class="xwing-miniatures-font xwing-miniatures-font-hardpoint"></i>',
    "Tactical Relay": '<i class="xwing-miniatures-font xwing-miniatures-font-tacticalrelay"></i>'
};
exports.sloticon = sloticon;
var difficulties = {
    impossible: 0,
    blue: 1,
    white: 2,
    red: 3,
    purple: 4
};
exports.difficulties = difficulties;
var bearings = {
    left_hard: "left_hard",
    left_bank: "left_bank",
    straight: "straight",
    right_bank: "right_bank",
    right_hard: "right_hard",
    k_turn: "k_turn",
    left_sloop: "left_sloop",
    right_sloop: "right_sloop",
    left_tallion: "left_tallion",
    right_tallion: "right_tallion",
    stationary: "stationary",
    reverse_left: "reverse_left",
    reverse_straight: "reverse_straight",
    reverse_right: "reverse_right"
};
exports.bearings = bearings;
