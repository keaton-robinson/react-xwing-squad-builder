/**
 * @jest-environment jsdom
 */

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { jest } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { mocked } from "jest-mock";
import HeaderComponent from "./HeaderComponent";
import { useModalSetter } from "../contexts/ModalContext";
import { UserContextBundle, useUserContext } from "../contexts/UserContext";
import { Faction } from "../data/xwing_types";
import FactionCpt from "./FactionCpt";

jest.mock("./FactionCpt");
jest.mock("./modals/LoginModal");
jest.mock("./modals/RegisterModal");
jest.mock("../contexts/UserContext");
jest.mock("../contexts/ModalContext");

const mockedUseUserContextHook = mocked(useUserContext);
const mockedUseModalSetter = mocked(useModalSetter);
const mockUserContextBundle: UserContextBundle = {
  user: null,
  login: jest.fn(),
  logout: jest.fn(),
};
const mockedModalSetter = jest.fn();
const mockedFactionCpt = mocked(FactionCpt);

describe("HeaderComponent", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedUseUserContextHook.mockReturnValue({ ...mockUserContextBundle });
    mockedUseModalSetter.mockReturnValue(mockedModalSetter);
  });

  it("should render a link to the github repo", () => {
    render(<HeaderComponent factions={[]} selectedFaction={"Galactic Empire"} onClick={null} />);
    expect(screen.getByText("GitHub Repository")).toHaveAttribute(
      "href",
      "https://github.com/keaton-robinson/react-xwing-squad-builder",
    );
  });
  it("should render login button when no user logged in", () => {
    render(<HeaderComponent factions={[]} selectedFaction={"Galactic Empire"} onClick={null} />);
    expect(screen.getByText("Log In")).toBeInTheDocument();
  });
  it("should render logout button when a user is logged in", () => {
    mockedUseUserContextHook.mockReturnValue({ ...mockUserContextBundle, user: "some object" });
    render(<HeaderComponent factions={[]} selectedFaction={"Galactic Empire"} onClick={null} />);
    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });
  it("should call logout when user clicks logout button", async () => {
    mockedUseUserContextHook.mockReturnValue({ ...mockUserContextBundle, user: "something" });
    render(<HeaderComponent factions={[]} selectedFaction={"Galactic Empire"} onClick={null} />);
    const logoutButton = screen.getByText("Log Out");
    const user = userEvent.setup();
    await user.click(logoutButton);

    expect(mockUserContextBundle.logout).toHaveBeenCalledTimes(1);
  });
  it("should show login modal when user clicks login button", async () => {
    const user = userEvent.setup();
    render(<HeaderComponent factions={[]} selectedFaction={"Galactic Empire"} onClick={null} />);
    const loginButton = screen.getByText("Log In");
    await user.click(loginButton);

    expect(mockedModalSetter).toHaveBeenCalledWith(expect.objectContaining({ title: "Login" }));
  });
  it("should show register modal when user switches to register", () => {
    render(<HeaderComponent factions={[]} selectedFaction={"Galactic Empire"} onClick={null} />);

    // Trigger login modal
    fireEvent.click(screen.getByText(/Log In/i));

    // Find the switch to register button and click it
    const LoginModalCall = mockedModalSetter.mock.calls[0][0];
    // @ts-ignore
    const switchToRegister = LoginModalCall.children.props.switchToRegister;
    switchToRegister();

    // Verify that the showRegister function was called
    expect(mockedModalSetter).toHaveBeenCalledWith({
      title: "Register",
      children: expect.anything(), // You can add more specific checks if necessary
    });
  });
  it("should show login modal when user switches BACK to login", () => {
    render(<HeaderComponent factions={[]} selectedFaction={"Galactic Empire"} onClick={null} />);

    // Trigger login modal
    fireEvent.click(screen.getByText(/Log In/i));

    // Find the switch to register button and click it
    const LoginModalCall = mockedModalSetter.mock.calls[0][0];
    // @ts-ignore
    const switchToRegister = LoginModalCall.children.props.switchToRegister;
    switchToRegister();

    const RegisterModalCall = mockedModalSetter.mock.calls[1][0];
    // @ts-ignore
    const switchToLogin = RegisterModalCall.children.props.switchToLogin;
    switchToLogin();

    // Verify that the showRegister function was called
    expect(mockedModalSetter).toHaveBeenNthCalledWith(3, {
      title: "Login",
      children: expect.anything(), // You can add more specific checks if necessary
    });
  });
  it("should show a faction choosing component for each faction, with the onClick prop passed to it", () => {
    const factions: Faction[] = [
      "Rebel Alliance",
      "Galactic Empire",
      "Scum and Villainy",
      "Separatist Alliance",
      "Galactic Republic",
      "First Order",
      "Resistance",
    ];
    const myOnClick = () => {};
    render(<HeaderComponent factions={factions} selectedFaction={"Galactic Empire"} onClick={myOnClick} />);

    expect(mockedFactionCpt).toHaveBeenCalledTimes(factions.length);
    for (let i = 0; i < factions.length; i++) {
      expect(mockedFactionCpt).toHaveBeenNthCalledWith(
        i + 1,
        expect.objectContaining({
          faction: factions[i],
          selectedFaction: "Galactic Empire",
          onClick: myOnClick,
        }),
        expect.anything(),
      );
    }
  });
});
