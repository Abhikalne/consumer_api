import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Navbar from "./Navbar";
import { Provider } from "react-redux";
import axiosMock from "axios-mock-adapter";
import axios from "axios";
import { createTestStore, routesConfig } from "./utils";
import {
  BrowserRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import { act } from "react";
describe("test cases for navbar", () => {
  const axiosMockInstance = new axiosMock(axios);
  let store: any;
  const router = createMemoryRouter(routesConfig, {
    initialEntries: ["/", "/films"],
    initialIndex: 0,
  });
  beforeEach(() => {
    store = createTestStore();
  });
  it("render navbar", () => {
    render(
      <Provider store={store}>
        {" "}
        <BrowserRouter>
          {" "}
          <Navbar />{" "}
        </BrowserRouter>{" "}
      </Provider>
    );
    expect(screen.getByText("STARWAR API")).toBeInTheDocument();
    expect(screen.getByText("FILMS")).toBeInTheDocument();
    expect(screen.getByText("SPECIES")).toBeInTheDocument();
  });
  it("render navbar click on films", () => {
    render(
      <Provider store={store}>
        {" "}
        <BrowserRouter>
          {" "}
          <Navbar setCategory={jest.fn()} />{" "}
        </BrowserRouter>{" "}
      </Provider>
    );
    let films = screen.getByText("FILMS");
    act(() => {
      fireEvent.click(films);
    });
    waitFor(() => expect(window.location.pathname).toBe("/films"));
  });
  it("render navbar click on films", () => {
    const toggleActiveClass = jest.fn();
    render(
      <Provider store={store}>
        {" "}
        <BrowserRouter>
          {" "}
          <Navbar setCategory={jest.fn()} />{" "}
        </BrowserRouter>{" "}
      </Provider>
    );
    let hamburger = screen.getByTestId("hamburger");
    act(() => {
      fireEvent.click(hamburger);
    });
    waitFor(() => expect(toggleActiveClass).toBeCalled());
  });
});
