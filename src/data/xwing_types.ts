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
  name: string;
  canonical_name?: string;
  xws: string;
  factions: Faction[];
  attack?: number;
  attackf?: number;
  attackb?: number;
  attackl?: number;
  attackr?: number;
  attackbull?: number;
  attackt?: number;
  attackdt?: number;
  agility: number;
  hull: number;
  shields: number;
  actions: string[];
  maneuvers: Difficulty[][];
  autoequip?: string[]; // Optional property
  keyword?: string[];
  huge?: boolean;
  large?: boolean;
  medium?: boolean;
  icon?: string;
  shieldrecurr?: number;
  energy?: number;
  energyrecurr?: number;
}

export interface Pilot {
  name: string;
  id: number;
  faction: Faction;
  ship: ShipName;
  keyword?: string[];
  skill: number;
  points: number;
  slots: string[];
  unique?: boolean;
  force?: number;
  canonical_name?: string;
  xws?: string;
  applies_condition?: string | string[];
  charge?: number;
  recurring?: number;
  restrictions?: string[][];
  restriction_func?: (a: any) => any;
  max_per_squad?: number;
  ship_override?: { actions: string[] };
  engagement?: number;
}

export interface Upgrade {
  name: string;
  xws?: string;
  id: number;
  slot: keyof typeof slots;
  canonical_name?: string;
  points?: number;
  pointsarray?: number[];
  unique?: boolean;
  faction?: Faction | Faction[];
  variableagility?: boolean;
  variablebase?: boolean;
  variableinit?: boolean;
  force?: number;
  charge?: number;
  restrictions?: [string, any][];
  modifier_func?: (a: any) => any;
  attack?: number;
  attackf?: number;
  attackb?: number;
  attackl?: number;
  attackr?: number;
  attackbull?: number;
  attackt?: number;
  attackdt?: number;
  range?: any;
  ship?: ShipName | ShipName[];
  validation_func?: Function;
  also_occupies_upgrades?: string[];
  rangebonus?: boolean;
  standardized?: boolean;
  recurring?: number;
  applies_condition?: string | string[];
  solitary?: boolean;
  max_per_squad?: number;
  confersAddons?: { type: string; slot: string }[];
  unequips_upgrades?: string[];
  keyword?: string[];
}

export interface PilotShip extends Ship {
  force?: number;
  charge?: number;
}

export interface SelectedPilot extends Pilot {
  pilotShip: PilotShip;
  selectedUpgrades: SelectedUpgrade[];
  uiKey?: string;
}

export interface SelectedUpgrade {
  slot: string;
  key: string;
  parentUpgradeSlotKey?: string;
  selectedUpgradeId: number;
}

export interface PilotRulesText {
  display_name?: string;
  text: string;
}
export interface UpgradeRulesText {
  display_name?: string;
  text: string;
}

export interface Slot {
  key: string;
  displayName: string;
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
  | { type: "Ship"; cardData: Ship }
  | { type: "Pilot"; cardData: Pilot }
  | { type: "SelectedPilot"; cardData: SelectedPilot }
  | { type: "Upgrade"; cardData: Upgrade };

export type ShipBaseSize = "Small" | "Medium" | "Large" | "Huge";
