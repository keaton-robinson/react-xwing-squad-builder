/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ActionsCpt from "./ActionsCpt";

describe("ActionsCpt", () => {
  test("renders without crashing", () => {
    const { container } = render(<ActionsCpt actions={[]} />);
    expect(container).toBeInTheDocument();
  });

  test("renders each action's class correctly", () => {
    const actions = [
      "Barrel Roll",
      "Boost",
      "Calculate",
      "Cloak",
      "Coordinate",
      "Evade",
      "Focus",
      "Lock",
      "Jam",
      "Reload",
      "Reinforce",
      "Rotate Arc",
      "Slam",
    ];
    const { container } = render(<ActionsCpt actions={actions} />);

    actions.forEach((action) => {
      const iconClass = "xwing-miniatures-font-" + action.toLowerCase().replace(/ /g, "");
      const icons = container.getElementsByClassName(iconClass);
      expect(icons.length).toBe(1);
    });
  });

  test("renders correct separators between actions", () => {
    const actions = ["Focus", "Boost", "R->Lock"];
    const { container } = render(<ActionsCpt actions={actions} />);

    // Check for the linked separator icon between "Focus" and "Lock"
    const lockElement = container.querySelector(".xwing-miniatures-font-lock");
    expect(lockElement.previousSibling).toHaveClass("xwing-miniatures-font-linked");

    // Check for the comma separator between "boost" and "focus"
    const boostElement = container.querySelector(".xwing-miniatures-font-boost");
    expect(boostElement.previousSibling).toHaveTextContent(",");
  });

  test("applies correct difficulty class", () => {
    const actions = ["R-Evade", "F-Focus", "Boost"];
    const { container } = render(<ActionsCpt actions={actions} />);

    const redIcons = container.getElementsByClassName("red");
    expect(redIcons.length).toBe(1);
    const evadeIcon = container.querySelector(".xwing-miniatures-font-evade");
    expect(evadeIcon).toHaveClass("red");

    const forceIcons = container.getElementsByClassName("force");
    expect(forceIcons.length).toBe(1);
    const focusIcon = container.querySelector(".xwing-miniatures-font-focus");
    expect(focusIcon).toHaveClass("force");
  });

  test("handles empty actions array", () => {
    const { container } = render(<ActionsCpt actions={[]} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
