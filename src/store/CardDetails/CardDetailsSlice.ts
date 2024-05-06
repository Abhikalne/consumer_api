import { createSlice } from "@reduxjs/toolkit";

import { getData_api } from "../Api_services";

const initialState = {
  cardDetails: [] as any,
  loading: true,
  error: "",
};
const CardDetailsSlice = createSlice({
  name: "card",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getData_api.fulfilled, (state, action) => {
      state.cardDetails = action.payload;
      state.error = "";
      state.loading = false;
    });
    builder.addCase(getData_api.rejected, (state, action) => {
      state.error = action.error.message
        ? action.error.message
        : "something went wrong";
      state.cardDetails = [];
      state.loading = false;
    });
    builder.addCase(getData_api.pending, (state, action) => {
      state.loading = true;
      state.cardDetails = [];
      state.error = "";
    });
  },
  reducers: {
    resetCard(state) {
      state = { ...state, cardDetails: [] };
    },
  },
});

export const { resetCard } = CardDetailsSlice.actions;
export default CardDetailsSlice.reducer;
