/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { difficulties, bearings } from "../data/xwing_data";
import ManeuverCpt from "./ManeuverCpt";

describe("ManeuverCpt", () => {
  it("returns null if difficulty is not provided", () => {
    const { container } = render(<ManeuverCpt difficulty={null} bearing={bearings.straight} />);

    expect(container.firstChild).toBeNull();
  });
  describe("difficulty colors", () => {
    it("renders dodgerblue for blue difficulty", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.blue} bearing={bearings.left_hard} />);

      const pathElements = container.querySelectorAll("path");
      expect(pathElements[1]).toHaveAttribute("fill", "dodgerblue");
      expect(pathElements[2]).toHaveAttribute("stroke", "dodgerblue");
    });
    it("renders white for white difficulty", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.white} bearing={bearings.left_hard} />);

      const pathElements = container.querySelectorAll("path");
      expect(pathElements[1]).toHaveAttribute("fill", "white");
      expect(pathElements[2]).toHaveAttribute("stroke", "white");
    });
    it("renders red for red difficulty", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.red} bearing={bearings.left_hard} />);

      const pathElements = container.querySelectorAll("path");
      expect(pathElements[1]).toHaveAttribute("fill", "red");
      expect(pathElements[2]).toHaveAttribute("stroke", "red");
    });
    it("renders purple for purple difficulty", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.purple} bearing={bearings.left_hard} />);

      const pathElements = container.querySelectorAll("path");
      expect(pathElements[1]).toHaveAttribute("fill", "purple");
      expect(pathElements[2]).toHaveAttribute("stroke", "purple");
    });
  });
  describe("bearings", () => {
    it("renders left hard maneuver with correct paths", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.white} bearing={bearings.left_hard} />);

      const pathElements = container.querySelectorAll("path");
      expect(pathElements[0]).toHaveAttribute("d", "M160,180 L160,70 80,70");
      expect(pathElements[1]).toHaveAttribute("d", "M80,100 V40 L30,70 Z");
      expect(pathElements[2]).toHaveAttribute("d", "M160,180 L160,70 80,70");
    });
    it("renders left bank with correct paths", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.white} bearing={bearings.left_bank} />);

      const pathElements = container.querySelectorAll("path");
      expect(pathElements[0]).toHaveAttribute("d", "M150,180 S150,120 80,60");
      expect(pathElements[1]).toHaveAttribute("d", "M80,100 V40 L30,70 Z");
      expect(pathElements[1]).toHaveAttribute("transform", "translate(-5 -15) rotate(45 70 90)");
      expect(pathElements[2]).toHaveAttribute("d", "M150,180 S150,120 80,60");
    });
    it("renders straight maneuver with correct paths", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.white} bearing={bearings.straight} />);

      const pathElements = container.querySelectorAll("path");
      expect(pathElements[0]).toHaveAttribute("d", "M100,180 L100,100 100,80");
      expect(pathElements[1]).toHaveAttribute("d", "M70,80 H130 L100,30 Z");
      expect(pathElements[2]).toHaveAttribute("d", "M100,180 L100,100 100,80");
    });
    it("renders right bank maneuver with correct paths", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.white} bearing={bearings.right_bank} />);

      const pathElements = container.querySelectorAll("path");
      expect(pathElements[0]).toHaveAttribute("d", "M50,180 S50,120 120,60");
      expect(pathElements[1]).toHaveAttribute("d", "M120,100 V40 L170,70 Z");
      expect(pathElements[1]).toHaveAttribute("transform", "translate(5 -15) rotate(-45 130 90)");
      expect(pathElements[2]).toHaveAttribute("d", "M50,180 S50,120 120,60");
    });
    it("renders right hard maneuver with correct paths", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.white} bearing={bearings.right_hard} />);

      const pathElements = container.querySelectorAll("path");
      expect(pathElements[0]).toHaveAttribute("d", "M40,180 L40,70 120,70");
      expect(pathElements[1]).toHaveAttribute("d", "M120,100 V40 L170,70 Z");
      expect(pathElements[2]).toHaveAttribute("d", "M40,180 L40,70 120,70");
    });
    it("renders k turn maneuver with correct paths", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.white} bearing={bearings.k_turn} />);

      const pathElements = container.querySelectorAll("path");
      expect(pathElements[0]).toHaveAttribute("d", "M50,180 L50,100 C50,10 140,10 140,100 L140,120");
      expect(pathElements[1]).toHaveAttribute("d", "M170,120 H110 L140,180 Z");
      expect(pathElements[2]).toHaveAttribute("d", "M50,180 L50,100 C50,10 140,10 140,100 L140,120");
    });
    it("renders left sloop maneuver with correct paths", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.white} bearing={bearings.left_sloop} />);

      const pathElements = container.querySelectorAll("path");
      expect(pathElements[0]).toHaveAttribute("d", "M150,180 S150,120 80,60");
      expect(pathElements[1]).toHaveAttribute("d", "M80,100 V40 L30,70 Z");
      expect(pathElements[1]).toHaveAttribute("transform", "translate(0 50)");
      expect(pathElements[2]).toHaveAttribute("d", "M150,175 S150,120 85,65");
    });
    it("renders right sloop maneuver with correct paths", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.white} bearing={bearings.right_sloop} />);

      const pathElements = container.querySelectorAll("path");
      expect(pathElements[0]).toHaveAttribute("d", "M50,180 S50,120 120,60");
      expect(pathElements[1]).toHaveAttribute("d", "M120,100 V40 L170,70 Z");
      expect(pathElements[1]).toHaveAttribute("transform", "translate(0 50)");
      expect(pathElements[2]).toHaveAttribute("d", "M50,175 S50,120 115,65");
    });
    it("renders left tallion maneuver with correct paths", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.white} bearing={bearings.left_tallion} />);

      const pathElements = container.querySelectorAll("path");
      expect(pathElements[0]).toHaveAttribute("d", "M160,180 L160,70 80,70");
      expect(pathElements[1]).toHaveAttribute("d", "M60,100 H100 L80,140 Z");
      expect(pathElements[2]).toHaveAttribute("d", "M160,180 L160,70 80,70");
    });
    it("renders right tallion maneuver with correct paths", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.white} bearing={bearings.right_tallion} />);

      const pathElements = container.querySelectorAll("path");
      expect(pathElements[0]).toHaveAttribute("d", "M40,180 L40,70 120,70");
      expect(pathElements[1]).toHaveAttribute("d", "M100,100 H140 L120,140 Z");
      expect(pathElements[2]).toHaveAttribute("d", "M40,180 L40,70 120,70");
    });
    it("renders stationary maneuver with correct shape", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.white} bearing={bearings.stationary} />);

      const rect = container.querySelector("rect");
      expect(rect).toHaveAttribute("x", "50");
      expect(rect).toHaveAttribute("y", "50");
      expect(rect).toHaveAttribute("width", "100");
      expect(rect).toHaveAttribute("height", "100");
    });
    it("renders reverse left maneuver with correct paths", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.white} bearing={bearings.reverse_left} />);

      const pathElements = container.querySelectorAll("path");
      expect(pathElements[0]).toHaveAttribute("d", "M50,180 S50,120 120,60");
      expect(pathElements[1]).toHaveAttribute("d", "M120,100 V40 L170,70 Z");
      expect(pathElements[1]).toHaveAttribute("transform", "translate(5 -15) rotate(-45 130 90)");
      expect(pathElements[2]).toHaveAttribute("d", "M50,175 S50,120 120,60");
    });
    it("renders reverse straight maneuver with correct paths", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.white} bearing={bearings.reverse_straight} />);

      const pathElements = container.querySelectorAll("path");
      expect(pathElements[0]).toHaveAttribute("d", "M100,180 L100,100 100,80");
      expect(pathElements[1]).toHaveAttribute("d", "M70,80 H130 L100,30 Z");
      expect(pathElements[2]).toHaveAttribute("d", "M100,175 L100,100 100,70");
    });
    it("renders reverse right maneuver with correct paths", () => {
      const { container } = render(<ManeuverCpt difficulty={difficulties.white} bearing={bearings.reverse_right} />);

      const pathElements = container.querySelectorAll("path");
      expect(pathElements[0]).toHaveAttribute("d", "M150,180 S150,120 80,60");
      expect(pathElements[1]).toHaveAttribute("d", "M80,100 V40 L30,70 Z");
      expect(pathElements[1]).toHaveAttribute("transform", "translate(-5 -15) rotate(45 70 90)");
      expect(pathElements[2]).toHaveAttribute("d", "M150,175 S150,120 80,60");
    });
  });
});
