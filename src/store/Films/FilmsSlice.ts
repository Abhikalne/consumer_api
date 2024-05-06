import { createSlice } from "@reduxjs/toolkit";
import { film_api } from "../Api_services";
import { filmsType } from "../../common/type";

type filmsState = {
  films: filmsType[];
  loading: boolean;
  error: string;
};
const FilmsSlice = createSlice({
  name: "films",
  initialState: { films: [], error: "", loading: true } as filmsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(film_api.fulfilled, (state, action) => {
      state.films = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(film_api.rejected, (state, action) => {
      state.error = action.error.message
        ? action.error.message
        : "Something Went Wrong";
      state.films = [];
      state.loading = false;
    });
    builder.addCase(film_api.pending, (state, action) => {
      state.loading = true;
      state.error = "";
      state.films = [];
    });
  },
});

export default FilmsSlice.reducer;
