import { ships, slots } from "./xwing_data";

export type Faction =
  | "Rebel Alliance"
  | "Galactic Empire"
  | "Scum and Villainy"
  | "Resistance"
  | "First Order"
  | "Galactic Republic"
  | "Separatist Alliance";

export interface Ship {
  readonly name: string;
  readonly canonical_name?: string;
  readonly xws?: string;
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
  readonly keyword?: string[];
  readonly huge?: boolean;
  readonly large?: boolean;
  readonly medium?: boolean;
  readonly icon?: string;
  readonly shieldrecurr?: number;
  readonly energy?: number;
  readonly energyrecurr?: number;
}

export interface Pilot {
  readonly name: string;
  readonly id: number;
  readonly faction: Faction;
  readonly ship: ShipName;
  readonly keyword?: string[];
  readonly skill: number;
  readonly points: number;
  readonly slots: string[];
  readonly unique?: boolean;
  readonly force?: number;
  readonly canonical_name?: string;
  readonly xws?: string;
  readonly applies_condition?: string | string[];
  readonly charge?: number;
  readonly recurring?: number;
  readonly restrictions?: string[][];
  readonly restriction_func?: (a: any) => any;
  readonly max_per_squad?: number;
  readonly ship_override?: { actions: string[] };
  readonly engagement?: number;
}

export interface Upgrade {
  readonly name: string;
  readonly xws?: string;
  readonly id: number;
  readonly slot: keyof typeof slots;
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
  readonly restrictions?: [string, any][];
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

/**
 * Represents a pilot that has been added to a squad.
 */
export interface SelectedPilotShip extends Pilot, Ship {
  /**
   *  Provide a unique value for react 'key' prop. Needs to be unique relative to the rest of the squad's selected pilots
   */
  readonly uiKey: string;
  /**
   * Array of selected upgrades user has applied to pilot
   */
  readonly selectedUpgrades: SelectedUpgrade[];
}

export interface PilotShip extends Ship {
  readonly force?: number;
  readonly charge?: number;
}

export interface SelectedPilot extends Pilot {
  readonly pilotShip: PilotShip;
  selectedUpgrades: SelectedUpgrade[]; // todo: make readonly
  readonly uiKey?: string;
}

export interface SelectedUpgrade {
  /**
   * Provide unique value for react key prop. Needs to at least be unique within this pilot's collection of upgrades
   */
  readonly key: string;
  /**
   * The upgrade id from the xwing upgrades data
   */
  selectedUpgradeId: number; // todo: make readonly
  /**
   * The slot that the upgrade is applied to.
   */
  readonly slot: string;
  /**
   * For upgrades that take up two slots, this specifies which slot is the 'parent' slot that is causing this slot to be used
   */
  parentUpgradeSlotKey?: string; // todo: make readonly
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

export type ShipName = keyof typeof ships;

export type InfoPanelCard =
  | { readonly type: "Ship"; readonly cardData: Ship }
  | { readonly type: "Pilot"; readonly cardData: Pilot }
  | { readonly type: "SelectedPilot"; readonly cardData: SelectedPilot }
  | { readonly type: "Upgrade"; readonly cardData: Upgrade };

export type ShipBaseSize = "Small" | "Medium" | "Large" | "Huge";
