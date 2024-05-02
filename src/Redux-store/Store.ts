import { configureStore } from "@reduxjs/toolkit";
import FilmsReducer  from './FilmsSlice';
import DashboardReducer from "./DashboardSlice";
import PeopleReducer from "./PeopleSlice";


const store=configureStore({
    reducer: {
        films: FilmsReducer,
        dashboard: DashboardReducer,
        people: PeopleReducer,
       }    
})
export type AppDispatch = typeof store.dispatch
export type RootState= ReturnType<typeof store.getState>
export default store;
