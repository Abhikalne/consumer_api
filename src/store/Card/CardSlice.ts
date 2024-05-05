import { createSlice } from "@reduxjs/toolkit";
import { card_api } from "../Api_services";
import { cardType } from "../../common/type";

type cardState = {
  card: cardType[];
  loading: boolean;
  error: string;
};
const initialState: cardState = {
  card: [],
  loading: true,
  error: "",
};

const CardSlice = createSlice({
  name: "card",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(card_api.fulfilled, (state, action) => {
      state.loading = false;
      state.card = action.payload;
      state.error = "";
    });
    builder.addCase(card_api.pending, (state, action) => {
      state.loading = true;
      state.card = [];
      state.error = "";
    });

    builder.addCase(card_api.rejected, (state, action) => {
      state.error = action.error.message
        ? action.error.message
        : "something went wrong";
      state.loading = false;
      state.card = [];
    });
  },
  reducers: {},
});

export default CardSlice.reducer;
