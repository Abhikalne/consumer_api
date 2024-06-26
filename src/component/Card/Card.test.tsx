import axios from "axios";
import axiosMock from "axios-mock-adapter";
import { createTestStore, routesConfig } from "../../test/TestDetails";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { Store, UnknownAction } from "@reduxjs/toolkit";
import { act } from "react";

describe("test for Card page", () => {
    const axiosMockInstance = new axiosMock(axios);
    let store: Store<unknown, UnknownAction, unknown>;
    const router = createMemoryRouter(routesConfig, {
        initialEntries: ["/", "/films", "/people"],
        initialIndex: 2,
    });
    const data = {
        results: [
            {
                uid: "1",
                name: "Luke Skywalker",
                url: "https://www.swapi.tech/api/people/1",
            },
            {
                uid: "2",
                name: "C-3PO",
                url: "https://www.swapi.tech/api/people/2",
            },
        ],
    };
    beforeEach(() => {
        store = createTestStore();
    });

    test("render without data loading", async () => {
        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );

        waitFor(
            () => (
                expect(screen.getByText("PEOPLE")).toBeInTheDocument(),
                expect(screen.getByTestId("loading")).toBeInTheDocument()
            )
        );
    });

    test("render with data", async () => {
        axiosMockInstance.onGet("https://www.swapi.tech/api/people").reply(200, {
            data,
        });

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );

        waitFor(() => {
            expect(screen.getByText("PEOPLE")).toBeInTheDocument();
            expect(screen.getByText(data.results[0].name)).toBeInTheDocument();
            act(() => fireEvent.click(screen.getByTestId("btn-next")));
            expect(screen.getByText(data.results[1].name)).toBeInTheDocument();
        });
    });

    test("render without data", async () => {
        axiosMockInstance.onGet("https://www.swapi.tech/api/people").reply(404);

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );

        waitFor(
            () => (
                expect(screen.getByText("PEOPLE")).toBeInTheDocument(),
                expect(
                    screen.getByText("Request failed with status code 404")
                ).toBeInTheDocument()
            )
        );
    });

    test("render error", async () => {
        axiosMockInstance.onGet("https://www.swapi.tech/api/people").reply(400);

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );

        expect(screen.getByText("PEOPLE")).toBeInTheDocument();
        waitFor(() =>
            expect(
                screen.getByText("Request failed with status code 404")
            ).toBeInTheDocument()
        );
    });
});
