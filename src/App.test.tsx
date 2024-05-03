import React from "react";
import { render, screen } from "@testing-library/react";
import axiosMock from "axios-mock-adapter";

import App from "./App";
import axios from "axios";
import { Store, UnknownAction } from "@reduxjs/toolkit";
import { createTestStore } from "./component/common/utils";
import { Provider } from "react-redux";

describe("test cases for app", () => {
  const axiosMockInstance = new axiosMock(axios);
  let store: Store<unknown, UnknownAction, unknown>;
  beforeEach(() => {
    store = createTestStore();
  });

  it("render app", () => {
    // render(
    //   <Provider store={store}>
    //     <App />
    //   </Provider>
    // );
    // expect(screen.getByText("STARWAR API")).toBeInTheDocument();
    // expect(screen.getByText("PLANETS")).toBeInTheDocument();
  });

  it("render error boundary", () => {
    // render(
    //   <Provider store={store}>
    //     <App />
    //   </Provider>
    // );
    // expect(screen.getByText("STARWAR API")).toBeInTheDocument();
    // expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
