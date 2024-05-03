import {  card_api, getData_api } from "./Api_services";
import reducer, { resetCard } from "./CardSlice";

describe("test cases for CardSlice", () => {
   const initialState = { card: [],cardDetails:{},error:'' ,loading:true}
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
      cardDetails:{},
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
      cardDetails:  {},
      error: "something went wrong",
    });
  });
  it("check for getData_api fail", () => {
    const error = { message: "something went wrong" };

    const action: any = { type: getData_api.rejected, error };
    expect(reducer(initialState, action)).toEqual({
      loading: false,
      card: [],
      cardDetails:  {},
      error: "something went wrong",
    });
  });

  it("check for getData_api pending", () => {
   

    const action: any = { type: getData_api.pending };
    expect(reducer(initialState, action)).toEqual({
      loading: true,
      card: [],
      cardDetails:  {},
      error: "",
    });
  });

  it("check for getData_api success", () => {
   
const payload= {result: {
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
  }}
    const action: any = { type: getData_api.fulfilled,payload };
    expect(reducer(initialState, action)).toEqual({
      loading: true,
      card: [],
      cardDetails:  {...payload},
      error: "",
    });
  });
  it('check for resetCard',()=>{
    expect(reducer(initialState,resetCard())).toEqual({...initialState})
  })
});
