import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Navbar from "./Navbar";
import { Provider } from "react-redux";

import { createTestStore } from "../../test/utils";
import { BrowserRouter } from "react-router-dom";
import { act } from "react";
import { Store, UnknownAction } from "@reduxjs/toolkit";
describe("test cases for navbar", () => {
    let store: Store<unknown, UnknownAction, unknown>;

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
                    <Navbar />{" "}
                </BrowserRouter>{" "}
            </Provider>
        );

        const films = screen.getByText("FILMS");
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
                    <Navbar />{" "}
                </BrowserRouter>{" "}
            </Provider>
        );

        const hamburger = screen.getByTestId("hamburger");
        act(() => {
            fireEvent.click(hamburger);
        });
        waitFor(() => expect(toggleActiveClass).toBeCalled());
    });
});
