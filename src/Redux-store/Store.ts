import { configureStore } from "@reduxjs/toolkit";
import FilmsReducer  from './FilmsSlice';
import DashboardReducer from "./DashboardSlice";
import PeopleReducer from "./PeopleSlice";
import PlanetsReducer from "./PlanetsSlice";
import SpeciesReducer from "./SpeciesSlice"
import StarshipsReducer from "./StarshipsSlice"
import VehiclesReducer from "./VehiclesSlice"

const store=configureStore({
    reducer: {
        films: FilmsReducer,
        dashboard: DashboardReducer,
        people: PeopleReducer,
        planets: PlanetsReducer,
    species:SpeciesReducer,
    starships:StarshipsReducer,
    vehicles:VehiclesReducer}    
})
export type AppDispatch = typeof store.dispatch
export type RootState= ReturnType<typeof store.getState>
export default store;
