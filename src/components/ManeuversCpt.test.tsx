/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { difficulties, bearings } from "../data/xwing_data";
import ManeuversCpt from "./ManeuversCpt";
import { Bearing, Difficulty } from "../data/xwing_types";

jest.mock("./ManeuverCpt", () => {
  return {
    __esModule: true,
    default: ({ difficulty, bearing }: { difficulty: Difficulty; bearing: Bearing }) => {
      return `${difficulty}_${bearing}_maneuver`;
    },
  };
});

describe("ManeuversCpt", () => {
  describe("rendering speeds", () => {
    it("doesn't render row 0 when there is no stationary maneuver", () => {
      const testManeuvers: Difficulty[][] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 3, 0, 3],
        [2, 1, 1, 1, 2, 0, 3, 3, 0, 0, 0, 3, 0],
        [0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];

      render(<ManeuversCpt maneuvers={testManeuvers} />);

      expect(screen.queryByText("0")).not.toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });
    it("will render row 0 when there is a stationary maneuver", () => {
      const testManeuvers: Difficulty[][] = [
        [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 3, 0, 3],
        [2, 1, 1, 1, 2, 0, 3, 3, 0, 0, 0, 3, 0],
        [0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];

      render(<ManeuversCpt maneuvers={testManeuvers} />);

      expect(screen.getByText("0")).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });
    it("renders 1 row when only 1 speed", () => {
      const testManeuvers: Difficulty[][] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 1, 1, 1, 2, 0, 3, 3, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];

      render(<ManeuversCpt maneuvers={testManeuvers} />);

      expect(screen.queryByText("0")).not.toBeInTheDocument();
      expect(screen.queryByText("1")).not.toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.queryByText("3")).not.toBeInTheDocument();
    });
    it("renders 5 rows when there are 5 speeds", () => {
      const aWingManeuvers: Difficulty[][] = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 2, 0, 0, 0],
        [1, 1, 1, 1, 1, 0, 0, 0],
        [2, 2, 1, 2, 2, 0, 3, 3],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 3, 0, 0],
      ];

      render(<ManeuversCpt maneuvers={aWingManeuvers} />);

      expect(screen.queryByText("0")).not.toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
      expect(screen.getByText("4")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });
  describe("rendering bearings / columns", () => {
    it("should render stationary bearing instead of straight in row 0", () => {
      const testStationaryManeuvers: Difficulty[][] = [[0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

      render(<ManeuversCpt maneuvers={testStationaryManeuvers} />);

      expect(screen.getByText(`${difficulties.red}_${bearings.stationary}_maneuver`)).toBeInTheDocument();
      expect(screen.queryByText(`${difficulties.red}_${bearings.straight}_maneuver`)).not.toBeInTheDocument();
    });
    it("should render correct bearing in each column", () => {
      const allManeuversExceptStationary: Difficulty[][] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], // renders as every maneuver at speed 1 white difficulty, except for stationary (which can't be spd 1)
      ];

      render(<ManeuversCpt maneuvers={allManeuversExceptStationary} />);

      const renderedManeuvers = screen.getAllByText(/2/).map((node) => node.textContent);
      expect(renderedManeuvers).toEqual([
        "2_left_hard_maneuver",
        "2_left_bank_maneuver",
        "2_straight_maneuver",
        "2_right_bank_maneuver",
        "2_right_hard_maneuver",
        "2_k_turn_maneuver",
        "2_left_sloop_maneuver",
        "2_right_sloop_maneuver",
        "2_left_tallion_maneuver",
        "2_right_tallion_maneuver",
        "2_reverse_left_maneuver",
        "2_reverse_straight_maneuver",
        "2_reverse_right_maneuver",
      ]);
    });
    it("should omit columns that are all zero/impossible maneuvers", () => {
      const testManeuvers: Difficulty[][] = [
        /**
         0, 1, 2, 3, 4, 5, 6   columns 1, 3, and 5 should be rendered */
        [0, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 2, 0, 2, 0],
      ];

      render(<ManeuversCpt maneuvers={testManeuvers} />);

      // Query all rendered rows
      const rows = screen.getAllByRole("row");

      // Check the first row for the correct columns
      const cells = rows[0].querySelectorAll("td");

      // There should be 4 cells: one for the speed and three for maneuvers
      expect(cells.length).toBe(4);

      // Check that the cells correspond to the correct bearings
      // The first cell is the speed
      expect(cells[0].textContent).toBe("1");
      expect(cells[1].className).toBe("left_bank");
      expect(cells[2].className).toBe("right_bank");
      expect(cells[3].className).toBe("k_turn");
    });
  });
  describe("rendering difficulties", () => {
    it("should pass difficulty through", () => {
      const testManeuvers: Difficulty[][] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [
          difficulties.blue,
          difficulties.white,
          difficulties.red,
          difficulties.purple,
          difficulties.blue,
          difficulties.white,
          difficulties.red,
          difficulties.purple,
          difficulties.blue,
          difficulties.white,
          difficulties.red,
          difficulties.purple,
          difficulties.blue,
        ],
      ];

      render(<ManeuversCpt maneuvers={testManeuvers} />);

      const renderedManeuvers = screen.getAllByText(/maneuver/).map((node) => node.textContent);
      expect(renderedManeuvers).toEqual([
        `${difficulties.blue}_left_hard_maneuver`,
        `${difficulties.white}_left_bank_maneuver`,
        `${difficulties.red}_straight_maneuver`,
        `${difficulties.purple}_right_bank_maneuver`,
        `${difficulties.blue}_right_hard_maneuver`,
        `${difficulties.white}_k_turn_maneuver`,
        `${difficulties.red}_left_sloop_maneuver`,
        `${difficulties.purple}_right_sloop_maneuver`,
        `${difficulties.blue}_left_tallion_maneuver`,
        `${difficulties.white}_right_tallion_maneuver`,
        `${difficulties.red}_reverse_left_maneuver`,
        `${difficulties.purple}_reverse_straight_maneuver`,
        `${difficulties.blue}_reverse_right_maneuver`,
      ]);
    });
    it("should account for upgraded manuevering", () => {
      const maneuversBeforeUpgrades: Difficulty[][] = [[0], [3]];
      const maneuversAfterUpgrades: Difficulty[][] = [[0], [2]];

      render(<ManeuversCpt maneuvers={maneuversBeforeUpgrades} maneuversAfterUpgrades={maneuversAfterUpgrades} />);

      const renderedManeuver = screen.getByText(/maneuver/);
      expect(renderedManeuver.textContent).toBe(`2_left_hard_maneuver`);
    });
  });
});
