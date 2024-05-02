import { configureStore } from "@reduxjs/toolkit";
import DashboardReducer from "../../Redux-store/DashboardSlice";
import FilmsReducer from "../../Redux-store/FilmsSlice";
import PeopleReducer from "../../Redux-store/PeopleSlice";
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
