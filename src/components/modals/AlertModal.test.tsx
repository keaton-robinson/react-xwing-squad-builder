/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import AlertModal from "./AlertModal";
import { useModalSetter } from "../../contexts/ModalContext";

// Mock the useModalSetter hook
jest.mock("../../contexts/ModalContext", () => ({
  useModalSetter: jest.fn(),
}));

describe("AlertModal", () => {
  const mockSetModal = jest.fn();
  const mockOkPressed = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    (useModalSetter as jest.Mock).mockReturnValue(mockSetModal);
  });

  test("renders correctly with error message", () => {
    render(<AlertModal errorMessage="Test error message" okPressed={mockOkPressed} />);

    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ok/i })).toBeInTheDocument();
  });

  test("calls setModal and okPressed when Ok button is clicked", () => {
    render(<AlertModal errorMessage="Test error message" okPressed={mockOkPressed} />);

    fireEvent.click(screen.getByRole("button", { name: /ok/i }));

    expect(mockSetModal).toHaveBeenCalledWith(null);
    expect(mockOkPressed).toHaveBeenCalled();
  });
});
