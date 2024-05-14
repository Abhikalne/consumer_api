import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { cardDetailsType, cardType } from "../common/type";

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
    // try {
    //   const response = await Promise.all(
    //     items.map((ele: cardType) => axios.get(ele.url))
    //   );
    //   const dataList: cardDetailsType[] = response.map(
    //     (res: any) => res.data.result
    //   );
    //   return dataList;
    // } catch (err) {
    //   return err;
    // }
  }
);
