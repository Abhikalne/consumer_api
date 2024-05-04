import { configureStore } from "@reduxjs/toolkit";
import DashboardReducer from "../../Redux-store/DashboardSlice";
import FilmsReducer from "../../Redux-store/FilmsSlice";
import PeopleReducer from "../../Redux-store/CardSlice";

import Dashboard from "../Dashboard";
import Card from "./Card";
import Films from "../Films/Films";
export function createTestStore() {
    const store = configureStore({
        reducer: {
            dashboard: DashboardReducer,
            films: FilmsReducer,
            people: PeopleReducer,
        },
    });
    return store;
}

export const routesConfig = [
    {
        path: "/",
        element: (
            <>
                <Dashboard setCategory={jest.fn()} />
            </>
        ),
    },
    {
        path: "/films",
        element: (
            <>
                <Films />
            </>
        ),
    },
    {
        path: "/people",
        element: (
            <>
                <Card category={"people"} />
            </>
        ),
    },
];
// export const router = createMemoryRouter(routesConfig);
