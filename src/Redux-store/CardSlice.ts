


import { createSlice } from "@reduxjs/toolkit";

import { card_api, getData_api } from "./Api_services";


const initialState = {
    card: [],
    cardDetails:{} as any,
    loading:true,
    error:''
}

const CardSlice = createSlice({
    name: 'card',
    initialState,
    extraReducers: builder => {
        builder.addCase(card_api.pending, (state, action) => {
            state.loading=true
        })
        builder.addCase(card_api.fulfilled, (state, action) => {
            state.loading = false;
            state.card = action.payload;
            state.error=''
        })
        builder.addCase(card_api.rejected, (state, action) => {
            state.error = action.error.message ? action.error.message : 'something went wrong';
            state.loading=false
            state.card=[]
        })
        
        builder.addCase(getData_api.fulfilled, (state, action) => {
            state.cardDetails = action.payload;
            state.error=''
            
        })
        builder.addCase(getData_api.rejected, (state, action) => {
            state.error = action.error.message ? action.error.message : 'something went wrong';
            
            state.loading=false

        })
    },
    reducers: {
        resetCard(state) {
           state={...state,cardDetails:{}}
        }
    },

})

export const {resetCard}=CardSlice.actions
export default CardSlice.reducer


