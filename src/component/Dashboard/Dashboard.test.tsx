import axiosMock from "axios-mock-adapter";

import axios from "axios";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { createTestStore, routesConfig } from "../../common/utils";
import { Store, UnknownAction } from "@reduxjs/toolkit";
import { act } from "react";

describe("test for dashboard", () => {
    const axiosMockInstance = new axiosMock(axios);
    let store: Store<unknown, UnknownAction, unknown>;
    const router = createMemoryRouter(routesConfig, {
        initialEntries: ["/", "/films"],
        initialIndex: 0,
    });
    beforeEach(() => {
        store = createTestStore();
    });

    test("render without data loading", async () => {
        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );
        expect(screen.getByText("STAR WAR Movie World")).toBeInTheDocument();
        expect(screen.getByTestId("loading")).toBeInTheDocument();
    });

    test("render with data", async () => {
        axiosMockInstance.onGet("https://www.swapi.tech/api").reply(200, {
            result: {
                films: "https://swapi.tech/api/films",
                people: "https://swapi.tech/api/people",
                planets: "https://swapi.tech/api/planets",
                species: "https://swapi.tech/api/species",
                starships: "https://swapi.tech/api/starships",
                vehicles: "https://swapi.tech/api/vehicles",
            },
        });
        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );
        expect(screen.getByText("STAR WAR Movie World")).toBeInTheDocument();
        expect(screen.getByTestId("loading")).toBeInTheDocument();
        await waitFor(() => expect(screen.getByText("FILMS")).toBeInTheDocument());
    });

    test("render with data", async () => {
        axiosMockInstance.onGet("https://www.swapi.tech/api").reply(200, {
            result: {
                films: "https://swapi.tech/api/films",
                people: "https://swapi.tech/api/people",
                planets: "https://swapi.tech/api/planets",
                species: "https://swapi.tech/api/species",
                starships: "https://swapi.tech/api/starships",
                vehicles: "https://swapi.tech/api/vehicles",
            },
        });
        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );
        const handleClick = jest.fn();
        expect(screen.getByText("STAR WAR Movie World")).toBeInTheDocument();
        await waitFor(() => expect(screen.getByText("FILMS")).toBeInTheDocument());
        const films = screen.getByText("FILMS");
        act(() => fireEvent.click(films));
        waitFor(() => expect(handleClick).toBeCalled());
    });

    test("render with error", async () => {
        axiosMockInstance.onGet("https://www.swapi.tech/api").reply(500);

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );
        await waitFor(() =>
            expect(
                screen.getByText("Request failed with status code 404")
            ).toBeInTheDocument()
        );
    });
});
