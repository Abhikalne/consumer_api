
import { createSlice } from "@reduxjs/toolkit";

import { planets_api } from "./Api_services";


const initialState = {
    planets: [],
    loading:true,
    error:''
}

const PlanetsSlice = createSlice({
    name: 'planets',
    initialState,
    extraReducers: builder => {
        builder.addCase(planets_api.pending, (state, action) => {
            state.loading=true
        })
        builder.addCase(planets_api.fulfilled, (state, action) => {
            state.loading = false;
            state.planets = action.payload;
            state.error=''
        })
        builder.addCase(planets_api.rejected, (state, action) => {
            state.error = action.error.message ? action.error.message : 'something went wrong';
            state.loading=false
            state.planets=[]
        })
        
        
    },
    reducers: {}
})

export default PlanetsSlice.reducer

