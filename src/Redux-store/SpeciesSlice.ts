import { createSlice } from "@reduxjs/toolkit"
import { species_api } from "./Api_services"

const initialState = {
    species: [],
    loading:true,
    error:''
}

const SpeciesSlice = createSlice({
    name: 'species',
    initialState,
    extraReducers: builder => {
        builder.addCase(species_api.pending, (state, action) => {
            state.loading=true
        })
        builder.addCase(species_api.fulfilled, (state, action) => {
            state.loading = false;
            state.species = action.payload;
            state.error=''
        })
        builder.addCase(species_api.rejected, (state, action) => {
            state.error = action.error.message ? action.error.message : 'something went wrong';
            state.loading=false
            state.species=[]
        })
        
        
    },
    reducers: {}
})

export default SpeciesSlice.reducer


