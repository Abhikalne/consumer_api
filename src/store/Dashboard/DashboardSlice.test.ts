import { dashboard_api } from "../Api_services";
import reducer from "./DashboardSlice";

describe("test cases for DashboardSlice", () => {
  const initialState = {
    rootData: {},
    loading: true,
    error: "",
  };
  it("check for dashboard_api success", () => {
    const payload = {
      result: {
        films: "https://swapi.tech/api/films",
        people: "https://swapi.tech/api/people",
        planets: "https://swapi.tech/api/planets",
        species: "https://swapi.tech/api/species",
        starships: "https://swapi.tech/api/starships",
        vehicles: "https://swapi.tech/api/vehicles",
      },
    };
    const action: any = { type: dashboard_api.fulfilled, payload };
    expect(reducer(initialState, action)).toEqual({
      loading: false,
      rootData: { ...payload },
      error: "",
    });
  });
  it("check for dashboard_api pending", () => {
    const action: any = { type: dashboard_api.pending };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it("check for dashboard_api fail", () => {
    const error = { message: "something went wrong" };

    const action: any = { type: dashboard_api.rejected, error };
    expect(reducer(initialState, action)).toEqual({
      loading: false,
      rootData: {},
      error: "something went wrong",
    });
  });
});
