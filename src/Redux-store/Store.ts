import { configureStore } from "@reduxjs/toolkit";
import FilmsReducer  from './FilmsSlice';
import DashboardReducer from "./DashboardSlice";
import CardReducer from "./CardSlice";


const store=configureStore({
    reducer: {
        films: FilmsReducer,
        dashboard: DashboardReducer,
        card: CardReducer,
       }    
})
export type AppDispatch = typeof store.dispatch
export type RootState= ReturnType<typeof store.getState>
export default store;
