import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import axiosMock from "axios-mock-adapter";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import CardDetails from "./CardDetails";
import { createTestStore, routesConfig } from "../../common/utils";
import { Store, UnknownAction } from "@reduxjs/toolkit";

describe("test for Card page", () => {
    const axiosMockInstance = new axiosMock(axios);
    let store: Store<unknown, UnknownAction, unknown>;

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
    const router = createMemoryRouter(routesConfig, {
        initialEntries: ["/", "/films", "/people"],
        initialIndex: 2,
    });

    beforeEach(() => {
        store = createTestStore();
    });

    test("check for button", async () => {
        axiosMockInstance.onGet("https://www.swapi.tech/api/people").reply(200, {
            data,
        });
        const p1 = axiosMockInstance
            .onGet("https://www.swapi.tech/api/people/1")
            .reply(200, {
                result: {
                    properties: {
                        height: "172",
                        mass: "77",
                        hair_color: "blond",
                        skin_color: "fair",
                        eye_color: "blue",
                        birth_year: "19BBY",
                        gender: "male",
                        created: "2024-05-01T21:41:56.596Z",
                        edited: "2024-05-01T21:41:56.596Z",
                        name: "Luke Skywalker",
                        homeworld: "https://www.swapi.tech/api/planets/1",
                        url: "https://www.swapi.tech/api/people/1",
                    },
                },
            });
        const p2 = axiosMockInstance
            .onGet("https://www.swapi.tech/api/people/2")
            .reply(200, {
                result: {
                    properties: {
                        height: "167",
                        mass: "75",
                        hair_color: "n/a",
                        skin_color: "gold",
                        eye_color: "yellow",
                        birth_year: "112BBY",
                        gender: "n/a",
                        created: "2024-05-04T22:54:04.434Z",
                        edited: "2024-05-04T22:54:04.434Z",
                        name: "C-3PO",
                        homeworld: "https://www.swapi.tech/api/planets/1",
                        url: "https://www.swapi.tech/api/people/2",
                    },
                },
            });
        Promise.all([p1, p2]);
        render(
            <Provider store={store}>
                <RouterProvider router={router} />
                <CardDetails items={data.results} />
            </Provider>
        );
        console.log(store.getState());
        expect(screen.getByText(data.results[0].name)).toBeInTheDocument();
        expect(screen.getByTestId("btn-prev")).toBeInTheDocument();
        expect(screen.getByTestId("btn-next")).toBeInTheDocument();
    });

    test("check for person data", async () => {
        axiosMockInstance.onGet("https://www.swapi.tech/api/people").reply(200, {
            data,
        });
        const p1 = axiosMockInstance
            .onGet("https://www.swapi.tech/api/people/1")
            .reply(200, {
                result: {
                    properties: {
                        height: "172",
                        mass: "77",
                        hair_color: "blond",
                        skin_color: "fair",
                        eye_color: "blue",
                        birth_year: "19BBY",
                        gender: "male",
                        created: "2024-05-01T21:41:56.596Z",
                        edited: "2024-05-01T21:41:56.596Z",
                        name: "Luke Skywalker",
                        homeworld: "https://www.swapi.tech/api/planets/1",
                        url: "https://www.swapi.tech/api/people/1",
                    },
                },
            });
        const p2 = axiosMockInstance
            .onGet("https://www.swapi.tech/api/people/2")
            .reply(200, {
                result: {
                    properties: {
                        height: "167",
                        mass: "75",
                        hair_color: "n/a",
                        skin_color: "gold",
                        eye_color: "yellow",
                        birth_year: "112BBY",
                        gender: "n/a",
                        created: "2024-05-04T22:54:04.434Z",
                        edited: "2024-05-04T22:54:04.434Z",
                        name: "C-3PO",
                        homeworld: "https://www.swapi.tech/api/planets/1",
                        url: "https://www.swapi.tech/api/people/2",
                    },
                },
            });
        Promise.all([p1, p2]);

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
                <CardDetails items={data.results} />
            </Provider>
        );
        waitFor(() => {
            expect(screen.getByText("HEIGHT")).toBeInTheDocument();
            expect(screen.getByText("HEIGHT")).toBeInTheDocument();
            expect(screen.getByText("HEIGHT")).toBeInTheDocument();
        });
    });

    test("check for button activity", async () => {
        const handleNext = jest.fn();
        const handlePrev = jest.fn();
        render(
            <Provider store={store}>
                <RouterProvider router={router} />
                <CardDetails items={data.results} />
            </Provider>
        );

        const next = screen.getByTestId("btn-next");

        fireEvent.click(next);

        waitFor(() => expect(handleNext).toBeCalled());
        const prev = screen.getByTestId("btn-prev");
        fireEvent.click(prev);
        waitFor(() => expect(handlePrev).toBeCalled());
    });
});
