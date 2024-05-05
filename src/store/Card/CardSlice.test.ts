import { card_api, getData_api } from "../Api_services";
import reducer from "./CardSlice";

describe("test cases for CardSlice", () => {
  const initialState = { card: [], cardDetails: {}, error: "", loading: true };
  it("check for card_api success", () => {
    const payload = {
      results: [
        {
          uid: "1",
          name: "Luke Skywalker",
          url: "https://www.swapi.tech/api/people/1",
        },
        {
          uid: "2",
          name: "C-3PO",
          url: "https://www.swapi.tech/api/people/2",
        },
      ],
    };
    const action: any = { type: card_api.fulfilled, payload };
    expect(reducer(initialState, action)).toEqual({
      loading: false,
      card: { ...payload },
      cardDetails: {},
      error: "",
    });
  });
  it("check for card_api pending", () => {
    const action: any = { type: card_api.pending };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("check for card_api fail", () => {
    const error = { message: "something went wrong" };

    const action: any = { type: card_api.rejected, error };
    expect(reducer(initialState, action)).toEqual({
      loading: false,
      card: [],
      cardDetails: {},
      error: "something went wrong",
    });
  });
});
