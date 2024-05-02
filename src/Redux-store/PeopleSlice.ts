


import { createSlice } from "@reduxjs/toolkit";

import { people_api, getData_api } from "./Api_services";


const initialState = {
    people: [],
    person: {} as any,
    loading:true,
    error:''
}

const PeopleSlice = createSlice({
    name: 'people',
    initialState,
    extraReducers: builder => {
        builder.addCase(people_api.pending, (state, action) => {
            state.loading=true
        })
        builder.addCase(people_api.fulfilled, (state, action) => {
            state.loading = false;
            state.people = action.payload;
            state.error=''
        })
        builder.addCase(people_api.rejected, (state, action) => {
            state.error = action.error.message ? action.error.message : 'something went wrong';
            state.loading=false
            state.people=[]
        })
        
        builder.addCase(getData_api.fulfilled, (state, action) => {
        
            state.person = action.payload;
            
        })
        builder.addCase(getData_api.rejected, (state, action) => {
            // state.error = action.error.message ? action.error.message : 'something went wrong';
            state.person = {}

        })
    },
    reducers: {
        resetPerson(state) {
            state.person = {}
        }
    },

})

export const {resetPerson}=PeopleSlice.actions
export default PeopleSlice.reducer


