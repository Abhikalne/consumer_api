
import { createSlice } from "@reduxjs/toolkit";
import { film_api } from "./Api_services";


const FilmsSlice = createSlice({
    name: 'films',
    initialState: { films: [] as any,error:'' as string ,loading:true},
    reducers: {},
    extraReducers:builder=> {
        builder.addCase(film_api.fulfilled, (state, action) => {            
            state.films = action.payload
            state.loading = false;
            state.error=''
        })
        builder.addCase(film_api.rejected, (state, action) => {
            
            state.error = action.error.message ? action.error.message : 'Something Went Wrong'
            state.films = [];
            state.loading=false
            
        })
        builder.addCase(film_api.pending, (state, action) => {
            state.loading = true;
            state.error = '';
            state.films=[]
        })
    }
})

export default FilmsSlice.reducer;


