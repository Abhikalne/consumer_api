import React, { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

import { Store, UnknownAction } from "@reduxjs/toolkit";
import { createTestStore } from "./test/TestDetails";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("test cases for app", () => {
    let store: Store<unknown, UnknownAction, unknown>;
    beforeEach(() => {
        store = createTestStore();
    });

    it("render app", () => {
        act(() =>
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
            )
        );
        expect(screen.getByText("STARWAR API")).toBeInTheDocument();
        expect(screen.getByText("PLANETS")).toBeInTheDocument();
    });

    it("render error boundary", () => {
        act(() =>
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
            )
        );

        expect(screen.getByText("STARWAR API")).toBeInTheDocument();
        waitFor(() => expect(screen.getByText("Error")).toBeInTheDocument());
    });
});
