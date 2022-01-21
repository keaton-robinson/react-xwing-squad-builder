//need this because coffeescript generated this on yasb's end, and I'm not using coffeescript currently
const __indexOf = [].indexOf || function(a) {
    for (var b = 0, c = this.length; b < c; b++)
        if (b in this && this[b] === a)
            return b;
    return -1
}



const factionNames = {
    "Rebel Alliance": "Rebel Alliance",
    "Galactic Empire": "Galactic Empire",
    "Scum and Villainy": "Scum and Villainy",
    Resistance: "Resistance",
    "First Order": "First Order",
    "Galactic Republic": "Galactic Republic",
    "Separatist Alliance": "Separatist Alliance"
}

const ships = {
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
}

const pilots = [{
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
    keyword: ["Light Side"],
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
    restriction_func: function(a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n;
        b = a.builder, l = b.uniques_in_use;
        for (d in l)
            if (f = l[d], "Slot" !== d && __indexOf.call(function() {
                    var a, b, c;
                    for (c = [], a = 0, b = f.length; a < b; a++) e = f[a], c.push(e.canonical_name.getXWSBaseName());
                    return c
                }(), "houndstooth") >= 0) {
                for (m = a.builder.ships, h = 0, j = m.length; h < j; h++)
                    for (c = m[h], n = c.upgrades, i = 0, k = n.length; i < k; i++)
                        if (g = n[i], null != g.data && null != a.pilot && "Hound's Tooth" === g.data.name) {
                            a.pilot.skill = c.pilot.skill;
                            break
                        } return !0
            } return !1
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

const slots = {
    Astromech: { key: "Astromech", displayName: "Astromech" }, 
    Force: { key: "Force", displayName: "Force" },
    Bomb: { key: "Bomb", displayName: "Bomb" } ,
    Cannon: { key: "Cannon", displayName: "Cannon" },
    Crew: { key: "Crew", displayName: "Crew" },
    Missile: { key: "Missile", displayName: "Missile" },
    Sensor: { key: "Sensor", displayName: "Sensor" },
    Torpedo: { key: "Torpedo", displayName: "Torpedo"},
    Turret: { key: "Turret", displayName: "Turret" },
    HardpointShip: { key: "HardpointShip", displayName: "Hardpoint" },
    Hardpoint: { key: "Hardpoint", displayName: "Hardpoint" },  //this hardpoint is for huge ships, the other one is for regular ships that accept cannon, missile, or torpedo in a slot
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

const sloticon = {
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
}

const upgrades = [{
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
    modifier_func: function(a) {
        var b, c, d, e;
        if (null != a.maneuvers[1]) {
            for (e = [], b = c = 0, d = a.maneuvers[1].length; 0 <= d ? c < d : c > d; b = 0 <= d ? ++c : --c) b > 4 || (a.maneuvers[1][b] > 1 && a.maneuvers[1][b]--, a.maneuvers[2][b] > 1 ? e.push(a.maneuvers[2][b]--) : e.push(void 0));
            return e
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Calculate") < 0) return a.actions.push("Calculate")
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
    modifier_func: function(a) {
        return a.force += 1
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot(b.slot)
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Lock") < 0) return a.actions.push("Lock")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot(b.slot)
    },
    also_occupies_upgrades: ["Crew"],
    modifier_func: function(a) {
        return a.force += 1
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
    modifier_func: function(a) {
        return a.force += 1
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Calculate") < 0) return a.actions.push("Calculate")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot(b.slot)
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
    modifier_func: function(a) {
        return a.force += 1
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
    modifier_func: function(a) {
        return a.force += 1
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
    modifier_func: function(a) {
        var b, c, d, e, f;
        if (null != a.maneuvers[1]) {
            for (e = a.maneuvers, f = [], c = 0, d = e.length; c < d; c++) b = e[c], b[1] > 1 && b[1]--, b[3] > 1 ? f.push(b[3]--) : f.push(void 0);
            return f
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
    modifier_func: function(a) {
        return a.force += 1
    }
}, {
    name: "Tactical Officer",
    id: 61,
    slot: "Crew",
    points: 6,
    restrictions: [
        ["Action", "R-Coordinate"]
    ],
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Coordinate") < 0) return a.actions.push("Coordinate")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot(b.slot)
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
    modifier_func: function(a) {
        return a.force += 1
    }
}, {
    name: "Fifth Brother",
    id: 82,
    slot: "Gunner",
    points: 12,
    force: 1,
    unique: !0,
    faction: "Galactic Empire",
    modifier_func: function(a) {
        return a.force += 1
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
    modifier_func: function(a) {
        return a.force += 1
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot(b.slot)
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Boost") < 0) return a.actions.push("Boost")
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "R-Evade") < 0) return a.actions.push("R-Evade")
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Barrel Roll") < 0) return a.actions.push("Barrel Roll")
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "R-Coordinate") < 0) return a.actions.push("R-Coordinate")
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Rotate Arc") < 0) return a.actions.push("Rotate Arc")
    }
}, {
    name: "Ion Cannon Turret",
    id: 138,
    slot: "Turret",
    points: 5,
    attackt: 3,
    range: "1-2",
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Rotate Arc") < 0) return a.actions.push("Rotate Arc")
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
    modifier_func: function(a) {
        return a.actions.push("Boost"), a.actions.push("*Focus"), a.actions.push("R-> Boost")
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Reload") < 0) return a.actions.push("Reload")
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Evade") < 0) return a.actions.push("Evade")
    }
}, {
    name: "Mist Hunter",
    id: 155,
    slot: "Title",
    points: 1,
    unique: !0,
    faction: "Scum and Villainy",
    ship: "G-1A Starfighter",
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Barrel Roll") < 0) return a.actions.push("Barrel Roll")
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
    modifier_func: function(a) {
        return a.attack = 3
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
    modifier_func: function(a) {
        return a.shields += 1
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
    modifier_func: function(a) {
        return a.hull += 1
    }
}, {
    name: "Shield Upgrade",
    id: 165,
    slot: "Modification",
    pointsarray: [3, 4, 6, 8],
    variableagility: !0,
    modifier_func: function(a) {
        return a.shields += 1
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Slam") < 0) return a.actions.push("Slam")
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
    modifier_func: function(a) {
        return a.actions.push("Barrel Roll"), a.actions.push("*Focus"), a.actions.push("R-> Barrel Roll")
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
    modifier_func: function(a) {
        return a.force += 1
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot(b.slot)
    },
    also_occupies_upgrades: ["Crew"],
    modifier_func: function(a) {
        return a.force += 1
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
    modifier_func: function(a) {
        return a.force += 1
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Calculate") < 0 && a.actions.push("Calculate"), __indexOf.call(a.actions, "R-Coordinate") < 0) return a.actions.push("R-Coordinate")
    }
}, {
    name: "Han Solo (Resistance)",
    id: 192,
    slot: "Crew",
    xws: "hansolo-crew",
    points: 3,
    unique: !0,
    faction: "Resistance",
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "R-Evade") < 0) return a.actions.push("R-Evade")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Modification")
    },
    also_occupies_upgrades: ["Modification"]
}, {
    name: "Delta-7B",
    id: 201,
    slot: "Configuration",
    ship: "Delta-7 Aethersprite",
    pointsarray: [4, 4, 8, 12, 16, 20, 24],
    variableinit: !0,
    modifier_func: function(a) {
        return a.attack += 1, a.agility += -1, a.shields += 2
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "F-Coordinate") < 0) return a.actions.push("F-Coordinate")
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "R-Cloak") < 0 && a.actions.push("R-Cloak"), __indexOf.call(a.actions, "Jam") < 0) return a.actions.push("Jam")
    }
}, {
    name: "Chancellor Palpatine",
    id: 217,
    unique: !0,
    slot: "Crew",
    faction: ["Galactic Republic", "Separatist Alliance"],
    force: 1,
    points: 14,
    modifier_func: function(a) {
        if (a.force += 1, __indexOf.call(a.actions, "F-Coordinate") < 0) return a.actions.push("F-Coordinate")
    }
}, {
    name: "Count Dooku",
    id: 218,
    unique: !0,
    slot: "Crew",
    force: 1,
    faction: "Separatist Alliance",
    points: 10,
    modifier_func: function(a) {
        return a.force += 1
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Calculate") < 0) return a.actions.push("Calculate")
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
    modifier_func: function(a) {
        return a.hull += 2
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
    modifier_func: function(a) {
        return __indexOf.call(a.actions, "Calculate") < 0 && a.actions.push("Calculate"), {
            applies_condition: "It's the Resistance"
        }
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Modification")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot(b.slot)
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot(b.slot)
    },
    also_occupies_upgrades: ["Crew"],
    modifier_func: function(a) {
        if (a.force += 1, __indexOf.call(a.actions, "F-Coordinate") < 0) return a.actions.push("F-Coordinate")
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Calculate") < 0) return a.actions.push("Calculate")
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
    modifier_func: function(a) {
        if (a.shields -= 1, __indexOf.call(a.actions, "Reinforce") < 0) return a.actions.push("Reinforce")
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Lock") < 0) return a.actions.push("Lock")
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
    modifier_func: function(a) {
        return a.force += 1
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Calculate") < 0) return a.actions.push("Calculate")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Crew")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Crew")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Crew")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Crew")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Crew")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Crew")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Crew")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Crew")
    },
    also_occupies_upgrades: ["Crew"]
}, {
    name: "Ion Cannon Battery",
    id: 269,
    slot: "Hardpoint",
    points: 5,
    attackt: 4,
    range: "2-4",
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Rotate Arc") < 0) return a.actions.push("Rotate Arc")
    }
}, {
    name: "Targeting Battery",
    id: 270,
    slot: "Hardpoint",
    points: 6,
    attackt: 3,
    range: "2-5",
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Rotate Arc") < 0) return a.actions.push("Rotate Arc")
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Rotate Arc") < 0) return a.actions.push("Rotate Arc")
    }
}, {
    name: "Turbolaser Battery",
    id: 273,
    slot: "Hardpoint",
    points: 13,
    attackt: 3,
    range: "3-5",
    restrictions: [
        ["EnergyGreatterThan", 4]
    ],
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Rotate Arc") < 0) return a.actions.push("Rotate Arc")
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
    modifier_func: function(a) {
        return a.actions.push("*Lock"), a.actions.push("R-> Coordinate")
    }
}, {
    name: "Bombardment Specialists",
    id: 275,
    slot: "Team",
    points: 6,
    modifier_func: function(a) {
        return a.actions.push("*Lock"), a.actions.push("> Calculate")
    }
}, {
    name: "Comms Team",
    id: 276,
    slot: "Team",
    points: 8,
    modifier_func: function(a) {
        return a.actions.push("*Coordinate"), a.actions.push("> Calculate"), a.actions.push("*Jam"), a.actions.push("> Calculate")
    }
}, {
    name: "Damage Control Team",
    id: 277,
    slot: "Team",
    points: 3,
    modifier_func: function(a) {
        return a.actions.push("*Reinforce"), a.actions.push("> Calculate")
    }
}, {
    name: "Gunnery Specialists",
    id: 278,
    slot: "Team",
    points: 8,
    modifier_func: function(a) {
        return a.actions.push("*Rotate Arc"), a.actions.push("> Calculate")
    }
}, {
    name: "IG-RM Droids",
    id: 279,
    slot: "Team",
    faction: "Scum and Villainy",
    points: 2,
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Calculate") < 0) return a.actions.push("Calculate")
    }
}, {
    name: "Ordnance Team",
    id: 280,
    slot: "Team",
    points: 4,
    modifier_func: function(a) {
        return a.actions.push("*Reload"), a.actions.push("> Calculate")
    }
}, {
    name: "Sensor Experts",
    id: 281,
    slot: "Team",
    points: 10,
    modifier_func: function(a) {
        return a.actions.push("*Lock"), a.actions.push("> Calculate")
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
    modifier_func: function(a) {
        return a.shields -= 2, a.actions.push("*Evade"), a.actions.push("R-> Coordinate"), a.actions.push("*Focus"), a.actions.push("R-> Coordinate")
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
    modifier_func: function(a) {
        return a.shields += 1, a.energy -= 1
    }
}, {
    name: "Liberator",
    id: 292,
    slot: "Title",
    unique: !0,
    ship: "CR90 Corellian Corvette",
    faction: "Rebel Alliance",
    points: 5,
    modifier_func: function(a) {
        return a.energy += 1
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
    modifier_func: function(a) {
        return a.shields -= 1, a.energy += 2
    }
}, {
    name: "Quantum Storm",
    id: 296,
    slot: "Title",
    unique: !0,
    ship: "GR-75 Medium Transport",
    faction: "Rebel Alliance",
    points: 3,
    modifier_func: function(a) {
        return a.energy += 1
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
    modifier_func: function(a) {
        return a.shields -= 2, a.hull += 2
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
    modifier_func: function(a) {
        return a.shields -= 2, a.energy += 2
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
    modifier_func: function(a) {
        return a.shields -= 1, a.energy += 2
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
    modifier_func: function(a) {
        return a.hull -= 1, a.energy += 1
    }
}, {
    name: "Suppressor",
    id: 303,
    slot: "Title",
    unique: !0,
    ship: "Gozanti-class Cruiser",
    faction: "Galactic Empire",
    points: 6,
    modifier_func: function(a) {
        return a.shields += 2, a.hull -= 2
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "R-Evade") < 0 && a.actions.push("R-Evade"), __indexOf.call(a.actions, "Coordinate") < 0) return a.actions.push("Coordinate")
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
    modifier_func: function(a) {
        return a.hull += 3, a.shields -= 1, a.energy -= 1
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
    modifier_func: function(a) {
        return a.hull += 2, a.shields -= 2, a.energy += 1
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
    modifier_func: function(a) {
        return a.hull += 3, a.shields -= 3
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
    modifier_func: function(a) {
        return a.actions.push("*Barrel Roll"), a.actions.push("R-> Evade"), a.actions.push("*Barrel Roll"), a.actions.push("R-> Lock"), a.actions.push("R-Reload")
    }
}, {
    name: "K-2SO",
    id: 314,
    slot: "Crew",
    faction: "Rebel Alliance",
    unique: !0,
    points: 7,
    modifier_func: function(a) {
        return a.actions.push("Calculate"), a.actions.push("Jam")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Modification")
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
    modifier_func: function(a) {
        if (a.force += 2, __indexOf.call(a.actions, "F-Coordinate") < 0) return a.actions.push("F-Coordinate")
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
    modifier_func: function(a) {
        if (a.force += 1, __indexOf.call(a.actions, "F-Reinforce") < 0) return a.actions.push("F-Reinforce")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot(b.slot)
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
    modifier_func: function(a) {
        if (a.force += 1, __indexOf.call(a.actions, "F-Evade") < 0) return a.actions.push("F-Evade")
    }
}, {
    name: "Aayla Secura",
    id: 328,
    slot: "Crew",
    unique: !0,
    force: 1,
    faction: "Galactic Republic",
    points: 16,
    modifier_func: function(a) {
        return a.force += 1, a.actions.push("*Focus"), a.actions.push("> F-Coordinate")
    }
}, {
    name: "Maneuver-Assist MGK-300",
    id: 329,
    slot: "Configuration",
    ship: "TIE/rb Heavy",
    faction: "Galactic Empire",
    points: 2,
    modifier_func: function(a) {
        var b, c, d;
        if (a.actions.push("Calculate"), a.actions.push("*Barrel Roll"), a.actions.push("*R-> Calculate"), null != a.maneuvers[3]) {
            for (d = [], b = c = 1; c < 4; b = ++c) a.maneuvers[3][b] > 1 ? d.push(a.maneuvers[3][b]--) : d.push(void 0);
            return d
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Gunner")
    },
    also_occupies_upgrades: ["Gunner"],
    modifier_func: function(a) {
        return a.actions.push("*Rotate Arc"), a.actions.push("R-> Focus")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Gunner")
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Calculate") < 0) return a.actions.push("Calculate")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot(b.slot)
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
    modifier_func: function(a) {
        return a.actions.push("Calculate"), a.actions.push("*Rotate Arc"), a.actions.push("> Calculate")
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "Rotate Arc") < 0) return a.actions.push("Rotate Arc")
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
    modifier_func: function(a) {
        return a.actions.push("Slam"), a.actions.push("R-> Lock")
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
    modifier_func: function(a) {
        var b, c, d, e, f;
        if (null != a.maneuvers[1]) {
            for (e = a.maneuvers, f = [], c = 0, d = e.length; c < d; c++) b = e[c], b[0] > 1 && b[0]--, b[4] > 1 && b[4]--, b[5] < 3 && 0 !== b[5] ? f.push(b[5]++) : f.push(void 0);
            return f
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Title")
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
    modifier_func: function(a) {
        if (__indexOf.call(a.actions, "R-Coordinate") < 0) return a.actions.push("R-Coordinate")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Crew")
    },
    also_occupies_upgrades: ["Crew"],
    force: 1,
    modifier_func: function(a) {
        return a.force += 1, a.actions.push("*Focus"), a.actions.push("F-> Coordinate")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Crew")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Crew")
    },
    also_occupies_upgrades: ["Crew"],
    modifier_func: function(a) {
        return a.actions.push("*Coordinate"), a.actions.push("R-> Jam")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Crew")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Crew")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Crew")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Cargo")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Cargo")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Cargo")
    },
    also_occupies_upgrades: ["Cargo"]
}, {
    name: "Droid Crew",
    id: 400,
    slot: "Team",
    points: 5,
    faction: "Separatist Alliance",
    modifier_func: function(a) {
        return a.actions.push("*Calculate"), a.actions.push("R-> Lock")
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
    validation_func: function(a, b) {
        return b.occupiesAnUpgradeSlot("Gunner")
    },
    also_occupies_upgrades: ["Gunner"]
}, {
    name: "Grappler",
    id: 403,
    unique: !0,
    slot: "Title",
    ship: "Trident-class Assault Ship",
    points: 3,
    modifier_func: function(a) {
        return a.hull += 2, a.shields -= 1
    }
}, {
    name: "Nautolan's Revenge",
    id: 404,
    unique: !0,
    slot: "Title",
    points: 2,
    ship: "Trident-class Assault Ship",
    faction: "Scum and Villainy",
    modifier_func: function(a) {
        return a.hull -= 2, a.shields += 1, a.energy += 1
    }
}, {
    name: "Neimoidian Grasp",
    id: 405,
    unique: !0,
    slot: "Title",
    points: 2,
    ship: "Trident-class Assault Ship",
    faction: "Separatist Alliance",
    modifier_func: function(a) {
        return a.shields -= 2
    }
}, {
    name: "Trident",
    id: 406,
    unique: !0,
    slot: "Title",
    points: 4,
    ship: "Trident-class Assault Ship",
    faction: "Separatist Alliance",
    modifier_func: function(a) {
        return a.energy += 1
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

const difficulties = {
    impossible: 0,
    blue: 1,
    white: 2,
    red: 3,
    purple: 4
};

const bearings = {
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

// const cardRulesEnglish = 
//virtually unlimited object property keys are possible
// but it may be worth spreading the various upgrade card types out
// names like "Luke Skywalker" and "Darth Vader" have pilot and crew cards...

export { factionNames, ships, pilots, slots, sloticon, upgrades, difficulties, bearings };