import { configureStore } from "@reduxjs/toolkit";
import DashboardReducer from "../store/Dashboard/DashboardSlice";
import FilmsReducer from "../store/Films/FilmsSlice";
import cardReducer from "../store/Card/CardSlice";
import cardDetailReducer from "../store/CardDetails/CardDetailsSlice";
import Dashboard from "../component/Dashboard/Dashboard";
import Card from "../component/Card/Card";
import Films from "../component/Films/Films";
import CardDetails from "../component/CardDetails/CardDetails";
export function createTestStore() {
    const store = configureStore({
        reducer: {
            dashboard: DashboardReducer,
            films: FilmsReducer,
            card: cardReducer,
            cardDetail: cardDetailReducer,
        },
    });
    return store;
}

export const routesConfig = [
    {
        path: "/",
        element: (
            <>
                <Dashboard />
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
    {
        path: "/people/:id",
        element: (
            <>
                <CardDetails items={[
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
                ]} />
            </>
        ),
    },

];
