import { configureStore } from "@reduxjs/toolkit";
import FilmsReducer from "./Films/FilmsSlice";
import DashboardReducer from "./Dashboard/DashboardSlice";
import CardReducer from "./Card/CardSlice";
import CardDetailsReducer from "./CardDetails/CardDetailsSlice";

const store = configureStore({
  reducer: {
    films: FilmsReducer,
    dashboard: DashboardReducer,
    card: CardReducer,
    cardDetail: CardDetailsReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
