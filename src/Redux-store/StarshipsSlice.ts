import { createSlice } from "@reduxjs/toolkit"
import { starships_api } from "./Api_services"

const initialState = {
    starships: [],
    loading:true,
    error:''
}

const StarshipsSlice = createSlice({
    name: 'starships',
    initialState,
    extraReducers: builder => {
        builder.addCase(starships_api.pending, (state, action) => {
            state.loading=true
        })
        builder.addCase(starships_api.fulfilled, (state, action) => {
            state.loading = false;
            state.starships = action.payload;
            state.error=''
        })
        builder.addCase(starships_api.rejected, (state, action) => {
            state.error = action.error.message ? action.error.message : 'something went wrong';
            state.loading=false
            state.starships=[]
        })
        
        
    },
    reducers: {}
})

export default StarshipsSlice.reducer


