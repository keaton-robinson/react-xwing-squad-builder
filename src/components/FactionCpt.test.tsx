/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import FactionCpt from "./FactionCpt";
import { Faction } from "../data/xwing_types";

describe("FactionCpt", () => {
  test("renders without crashing", () => {
    const { container } = render(
      <FactionCpt faction={"Galactic Empire"} selectedFaction={"Galactic Empire"} onClick={null} />,
    );
    expect(container).toBeInTheDocument();
  });

  test("applies selected styles when faction is selected", () => {
    render(<FactionCpt faction={"Galactic Empire"} selectedFaction={"Galactic Empire"} onClick={null} />);
    const listItem = screen.getByRole("listitem");
    expect(listItem).toHaveStyle({ color: "white", backgroundColor: "#337ab7" });
  });

  test("does not apply selected styles when faction is not selected", () => {
    render(<FactionCpt faction={"Galactic Empire"} selectedFaction={"Rebel Alliance"} onClick={null} />);
    const listItem = screen.getByRole("listitem");
    expect(listItem).not.toHaveStyle({ color: "white", backgroundColor: "#337ab7" });
  });

  test("calls onClick with correct faction when clicked", async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    render(<FactionCpt faction={"Galactic Empire"} selectedFaction={"Galactic Empire"} onClick={mockOnClick} />);
    const listItem = screen.getByRole("listitem");
    await user.click(listItem);
    expect(mockOnClick).toHaveBeenCalledWith("Galactic Empire");
  });

  test("renders correct title attribute", () => {
    render(<FactionCpt faction={"Galactic Empire"} selectedFaction={"Galactic Empire"} onClick={null} />);
    const listItem = screen.getByRole("listitem");
    expect(listItem).toHaveAttribute("title", "Galactic Empire");
  });

  test("renders with correct class name for each faction", () => {
    const factions: Faction[] = [
      "Rebel Alliance",
      "Galactic Empire",
      "Scum and Villainy",
      "Resistance",
      "First Order",
      "Galactic Republic",
      "Separatist Alliance",
    ];

    const expectedClassNames = [
      "xwing-miniatures-font-rebel",
      "xwing-miniatures-font-empire",
      "xwing-miniatures-font-scum",
      "xwing-miniatures-font-rebel-outline",
      "xwing-miniatures-font-firstorder",
      "xwing-miniatures-font-republic",
      "xwing-miniatures-font-separatists",
    ];

    factions.forEach((factionToRender, index) => {
      const { container } = render(
        <FactionCpt faction={factionToRender} selectedFaction={"Galactic Empire"} onClick={null} />,
      );
      const iconElement = container.querySelector("i");
      expect(iconElement).toHaveClass(expectedClassNames[index]);
    });
  });
});
