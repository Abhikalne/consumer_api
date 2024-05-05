import { createSlice } from "@reduxjs/toolkit";
import { dashboard_api } from "../Api_services";

export type dashboardState = {
  rootData: any;
  loading: boolean;
  error: string;
};
const initialState = <dashboardState>{
  rootData: {},
  loading: true,
  error: "",
};

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(dashboard_api.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(dashboard_api.fulfilled, (state, action) => {
      state.loading = false;
      state.rootData = action.payload;
      state.error = "";
    });
    builder.addCase(dashboard_api.rejected, (state, action) => {
      state.error = action.error.message
        ? action.error.message
        : "something went wrong";
      state.loading = false;
    });
  },
  reducers: {},
});

export default DashboardSlice.reducer;
