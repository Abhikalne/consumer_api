import axios from "axios";
import axiosMock from "axios-mock-adapter";
import { createTestStore, routesConfig } from "../../common/utils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { Store, UnknownAction } from "@reduxjs/toolkit";

let store: Store<unknown, UnknownAction, unknown>;
describe("test for Films page", () => {
    const axiosMockInstance = new axiosMock(axios);
    const router = createMemoryRouter(routesConfig, {
        initialEntries: ["/", "/films"],
        initialIndex: 1,
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
        expect(screen.getByText("MOVIES")).toBeInTheDocument();
        expect(screen.getByTestId("loading")).toBeInTheDocument();
    });

    test("render with data", async () => {
        axiosMockInstance.onGet("https://www.swapi.tech/api/films").reply(200, {
            result: [
                {
                    properties: {
                        title: "A New Hope",
                        episode_id: 4,
                        director: "George Lucas",
                        release_date: "1977-05-25",
                    },
                },
                {
                    properties: {
                        title: "The Empire Strikes Back",
                        episode_id: 5,
                        director: "Irvin Kershner",
                        release_date: "1980-05-17",
                    },
                },
            ],
        });

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );
        expect(screen.getByText("MOVIES")).toBeInTheDocument();

        waitFor(() => {
            expect(screen.findAllByRole("column")).toHaveLength(1),
            expect(screen.findAllByRole("row")).toHaveLength(4),
            expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
        });
    });

    test("check for row expand", async () => {
        render(
            <Provider store={store}>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </Provider>
        );
        waitFor(() => {
            expect(screen.findAllByRole("column")).toHaveLength(4);
            const row: any = screen.findAllByAltText("row");
            fireEvent.click(row[1]);
            expect(screen.getByText("More Details")).toBeInTheDocument();
        });
    });
    test("render with error", async () => {
        axiosMockInstance.onGet("https://www.swapi.tech/api/films").reply(500);

        render(
            <Provider store={store}>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </Provider>
        );
        await waitFor(() =>
            expect(
                screen.getByText("Request failed with status code 500")
            ).toBeInTheDocument()
        );
    });

    test("render with error", async () => {
        axiosMockInstance.onGet("https://www.swapi.tech/api/films").reply(404);

        render(
            <Provider store={store}>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </Provider>
        );
        await waitFor(() =>
            expect(
                screen.getByText("Request failed with status code 404")
            ).toBeInTheDocument()
        );
    });
});
