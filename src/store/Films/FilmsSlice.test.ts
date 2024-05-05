import {
  AsyncThunkConfig,
  AsyncThunkFulfilledActionCreator,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { film_api } from "../Api_services";
import reducer from "./FilmsSlice";
import store from "../store";

describe("test cases for FilmsSlice", () => {
  const initialState = { films: [], error: "", loading: true };
  it("check for film_api success", () => {
    const payload = {
      result: [
        {
          properties: {
            title: "A New Hope",
            episode_id: 4,
            director: "George Lucas",
            release_date: "1977-05-25",
          },
        },
        {
          properties: {
            title: "The Empire Strikes Back",
            episode_id: 5,
            director: "Irvin Kershner",
            release_date: "1980-05-17",
          },
        },
      ],
    };
    const action: any = { type: film_api.fulfilled, payload };

    expect(reducer(initialState, action)).toEqual({
      loading: false,
      films: { ...payload },
      error: "",
    });
  });
  it("check for film_api pending", () => {
    const action: any = { type: film_api.pending };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("check for film_api fail", () => {
    const error = { message: "something went wrong" };

    const action: any = { type: film_api.rejected, error };
    expect(reducer(initialState, action)).toEqual({
      loading: false,
      films: [],
      error: "something went wrong",
    });
  });
});
