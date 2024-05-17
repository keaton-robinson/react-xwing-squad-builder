import { ships, slots } from "./xwing_data";

export type UniqueKey = string & { brand: "UniqueKey" };

export type Faction =
  | "Rebel Alliance"
  | "Galactic Empire"
  | "Scum and Villainy"
  | "Resistance"
  | "First Order"
  | "Galactic Republic"
  | "Separatist Alliance";

export interface BaseShip {
  readonly factions: Faction[];
  readonly attack?: number;
  readonly attackf?: number;
  readonly attackb?: number;
  readonly attackl?: number;
  readonly attackr?: number;
  readonly attackbull?: number;
  readonly attackt?: number;
  readonly attackdt?: number;
  readonly agility: number;
  readonly hull: number;
  readonly shields: number;
  readonly actions: string[];
  readonly maneuvers: Difficulty[][];
  readonly autoequip?: string[]; // Optional property
  readonly huge?: boolean;
  readonly large?: boolean;
  readonly medium?: boolean;
  readonly icon?: string;
  readonly shieldrecurr?: number;
  readonly energy?: number;
  readonly energyrecurr?: number;
}
export interface Ship extends BaseShip {
  readonly name: string;
  readonly xws?: string;
  readonly canonical_name?: string;
  readonly keyword?: string[];
}

export interface BasePilot {
  readonly faction: Faction;
  readonly ship: ShipName;
  readonly skill: number;
  readonly points: number;
  readonly slots: SlotName[];
  readonly unique?: boolean;
  readonly force?: number;
  readonly applies_condition?: string | string[];
  readonly charge?: number;
  readonly recurring?: number;
  readonly restrictions?: string[][];
  readonly restriction_func?: (a: any) => any;
  readonly max_per_squad?: number;
  readonly ship_override?: { actions: string[] };
  readonly engagement?: number;
}

export interface Pilot extends BasePilot {
  readonly name: string;
  readonly id: number;
  readonly keyword?: string[];
  readonly xws?: string;
  readonly canonical_name?: string;
}

export interface Upgrade {
  readonly name: string;
  readonly xws?: string;
  readonly id: number;
  readonly slot: SlotName;
  readonly canonical_name?: string;
  readonly points?: number;
  readonly pointsarray?: number[];
  readonly unique?: boolean;
  readonly faction?: Faction | Faction[];
  readonly variableagility?: boolean;
  readonly variablebase?: boolean;
  readonly variableinit?: boolean;
  readonly force?: number;
  readonly charge?: number;
  readonly restrictions?: Restriction[];
  readonly modifier_func?: (a: any) => any;
  readonly attack?: number;
  readonly attackf?: number;
  readonly attackb?: number;
  readonly attackl?: number;
  readonly attackr?: number;
  readonly attackbull?: number;
  readonly attackt?: number;
  readonly attackdt?: number;
  readonly range?: any;
  readonly ship?: ShipName | ShipName[];
  readonly validation_func?: Function;
  readonly also_occupies_upgrades?: string[];
  readonly rangebonus?: boolean;
  readonly standardized?: boolean;
  readonly recurring?: number;
  readonly applies_condition?: string | string[];
  readonly solitary?: boolean;
  readonly max_per_squad?: number;
  readonly confersAddons?: { type: string; slot: string }[];
  readonly unequips_upgrades?: string[];
  readonly keyword?: string[];
}

export interface Squad {
  readonly id?: string;
  readonly name: string;
  readonly faction: Faction;
  readonly squadPilots: SquadPilotShip[];
}

/**
 * Represents a pilot that has been added to a squad.
 */
export interface SquadPilotShip extends BasePilot, BaseShip {
  /**
   *  Provide a unique value for react 'key' prop.
   */
  readonly squadPilotShipId: UniqueKey;
  /**
   * Array of selected upgrades user has applied to pilot
   */
  readonly upgrades: SquadPilotShipUpgradeSlot[];

  // properties from pilot and ship that need to be renamed to avoid name conflict
  readonly shipCanonicalName: string | null | undefined;
  readonly ship_keyword: string[] | null | undefined;
  readonly pilotName: string | null | undefined;
  readonly pilotId: number | null | undefined;
  readonly pilotKeyword: string[] | null | undefined;
  readonly pilotCanonicalName: string | null | undefined;
}

/**
 * Represents an upgrade slot that a squad pilot has
 */
export interface SquadPilotShipUpgradeSlot {
  /**
   * Provide unique value for react key prop.
   */
  readonly squadPilotUpgradeSlotKey: string;
  /**
   * The type of this upgrade slot holds
   */
  readonly slot: SlotName;
  /**
   * The upgrade currently in this upgrade slot
   */
  readonly upgrade: Upgrade | null;
  /**
   * For upgrades that take up two slots, this specifies which slot is the 'parent' slot that is causing this slot to be used
   */
  readonly parentSquadPilotUpgradeSlotId?: string;
}

export interface PilotShip extends Ship {
  readonly force?: number;
  readonly charge?: number;
}

// TODO: delete this type
export interface SelectedPilotThatAllowsMutations extends Pilot {
  readonly pilotShip: PilotShip;
  selectedUpgrades: SelectedUpgradeThatAllowsMutations[];
  readonly uiKey?: string;
}

// TODO: delete this type
export interface SelectedUpgradeThatAllowsMutations {
  /**
   * Provide unique value for react key prop. Needs to at least be unique within this pilot's collection of upgrades
   */
  readonly key: string;
  /**
   * The upgrade id from the xwing upgrades data
   */
  selectedUpgradeId: number;
  /**
   * The slot that the upgrade is applied to.
   */
  readonly slot: string;
  /**
   * For upgrades that take up two slots, this specifies which slot is the 'parent' slot that is causing this slot to be used
   */
  parentUpgradeSlotKey?: string;
}

export interface PilotRulesText {
  readonly display_name?: string;
  readonly text: string;
}
export interface UpgradeRulesText {
  readonly display_name?: string;
  readonly text: string;
}

export interface Slot {
  readonly key: string;
  readonly displayName: string;
}
export type SlotName = keyof typeof slots;

export type DifficultyName = "impossible" | "blue" | "white" | "red" | "purple";
export type Difficulty = 0 | 1 | 2 | 3 | 4;

export type Bearing =
  | "left_hard"
  | "left_bank"
  | "straight"
  | "right_bank"
  | "right_hard"
  | "k_turn"
  | "left_sloop"
  | "right_sloop"
  | "left_tallion"
  | "right_tallion"
  | "stationary"
  | "reverse_left"
  | "reverse_straight"
  | "reverse_right";

export type Restriction =
  | ["Base", "Small" | "Large" | "Huge" | "Small or Medium" | "Medium or Large" | "Standard"]
  | ["Action", string]
  | ["Slot", string]
  | ["orUnique", string]
  | ["Faction", Faction]
  | ["AttackArc", "Rear Arc"]
  | ["Keyword", string]
  | ["isUnique", boolean]
  | ["Equipped", string]
  | ["ShieldsGreaterThan", number]
  | ["InitiativeGreaterThan", number]
  | ["InitiativeLessThan", number]
  | ["EnergyGreaterThan", number]
  | ["EnergyLessThan", number]
  | ["AgilityEquals", number];

export type ShipName = keyof typeof ships;

export type InfoPanelCard =
  | { readonly type: "Ship"; readonly cardData: Ship; readonly faction: Faction }
  | { readonly type: "Pilot"; readonly cardData: SquadPilotShip }
  | { readonly type: "Upgrade"; readonly cardData: Upgrade };

export type ShipBaseSize = "Small" | "Medium" | "Large" | "Huge";
