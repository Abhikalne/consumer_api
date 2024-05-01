import { createSlice } from "@reduxjs/toolkit"
import { vehicles_api } from "./Api_services"

const initialState = {
    vehicles: [],
    loading:true,
    error:''
}

const VehiclesSlice = createSlice({
    name: 'vehicles',
    initialState,
    extraReducers: builder => {
        builder.addCase(vehicles_api.pending, (state, action) => {
            state.loading=true
        })
        builder.addCase(vehicles_api.fulfilled, (state, action) => {
            state.loading = false;
            state.vehicles = action.payload;
            state.error=''
        })
        builder.addCase(vehicles_api.rejected, (state, action) => {
            state.error = action.error.message ? action.error.message : 'something went wrong';
            state.loading=false
            state.vehicles=[]
        })
        
        
    },
    reducers: {}
})

export default VehiclesSlice.reducer


