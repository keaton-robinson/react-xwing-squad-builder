import React, { createContext, useContext } from "react";
import {
  bearings,
  difficulties,
  pilotRules,
  pilots,
  ships,
  sloticon,
  slots,
  upgradeRules,
  upgrades,
} from "../data/xwing_data";
import {
  Bearing,
  Difficulty,
  DifficultyName,
  Pilot,
  PilotRulesText,
  Ship,
  Slot,
  SlotName,
  Upgrade,
  UpgradeRulesText,
} from "../data/xwing_types";

export interface XwingData {
  ships: Record<string, Ship>;
  pilots: Pilot[];
  pilotRules: Record<string, PilotRulesText>;
  upgrades: Upgrade[];
  upgradeRules: Record<string, UpgradeRulesText>;
  slots: Record<string, Slot>;
  sloticon: Partial<Record<SlotName, string>>;
  difficulties: Record<DifficultyName, Difficulty>;
  bearings: Record<Bearing, Bearing>;
}

const XwingDataContext = createContext<XwingData | undefined>(undefined);

// Create a provider component
export const XwingDataProvider = ({ children }) => {
  const xwingData = {
    ships: ships,
    pilots: pilots,
    pilotRules: pilotRules,
    upgrades: upgrades,
    upgradeRules: upgradeRules,
    slots: slots,
    sloticon: sloticon,
    difficulties: difficulties,
    bearings: bearings,
  };

  return <XwingDataContext.Provider value={xwingData}>{children}</XwingDataContext.Provider>;
};

export const useXwingData = () => {
  return useContext(XwingDataContext);
};
