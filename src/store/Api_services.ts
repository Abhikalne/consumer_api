import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url: string = "https://www.swapi.tech/api";

export const dashboard_api = createAsyncThunk("dashboard", async () => {
  const response = await axios.get(url);
  return response.data.result;
});

export const film_api = createAsyncThunk("api/films", async () => {
  const response = await axios.get(url + "/films");
  return response.data.result;
});

export const card_api = createAsyncThunk("api/people", async (data: string) => {
  const response = await axios.get(url + "/" + data);
  return response.data.results;
});

export const getData_api = createAsyncThunk(
  "api/getData",
  async (url: string) => {
    const response = await axios.get(url);
    return response.data.result;
  }
);
