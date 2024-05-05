import { getData_api } from "../Api_services";
import reducer, { resetCard } from "./CardDetailsSlice";

describe("test cases for cardDetails", () => {
  const initialState = {
    cardDetails: [],
    loading: true,
    error: "",
  };

  it("check for getData_api fail", () => {
    const error = { message: "something went wrong" };

    const action: any = { type: getData_api.rejected, error };
    expect(reducer(initialState, action)).toEqual({
      loading: false,
      cardDetails: [],
      error: "something went wrong",
    });
  });

  it("check for getData_api pending", () => {
    const action: any = { type: getData_api.pending };
    expect(reducer(initialState, action)).toEqual({
      loading: true,
      cardDetails: [],
      error: "",
    });
  });

  it("check for getData_api success", () => {
    const payload = [
      {
        properties: {
          height: "172",
          mass: "77",
          hair_color: "blond",
          skin_color: "fair",
          eye_color: "blue",
          birth_year: "19BBY",
          gender: "male",
          created: "2024-05-01T21:41:56.596Z",
          edited: "2024-05-01T21:41:56.596Z",
          name: "Luke Skywalker",
          homeworld: "https://www.swapi.tech/api/planets/1",
          url: "https://www.swapi.tech/api/people/1",
        },
      },
      {
        properties: {
          height: "167",
          mass: "75",
          hair_color: "n/a",
          skin_color: "gold",
          eye_color: "yellow",
          birth_year: "112BBY",
          gender: "n/a",
          created: "2024-05-04T22:54:04.434Z",
          edited: "2024-05-04T22:54:04.434Z",
          name: "C-3PO",
          homeworld: "https://www.swapi.tech/api/planets/1",
          url: "https://www.swapi.tech/api/people/2",
        },
      },
    ];

    const action: any = { type: getData_api.fulfilled, payload };
    expect(reducer(initialState, action)).toEqual({
      loading: false,
      cardDetails: payload,
      error: "",
    });
  });
  it("check for resetCard", () => {
    expect(reducer(initialState, resetCard())).toEqual({ ...initialState });
  });
});
