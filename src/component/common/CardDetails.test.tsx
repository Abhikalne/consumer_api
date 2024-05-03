import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import axiosMock from "axios-mock-adapter";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import CardDetails from "./CardDetails";
import { createTestStore } from "./utils";
import { getData_api } from "../../Redux-store/Api_services";

describe("test for Card page", () => {
  const axiosMockInstance = new axiosMock(axios);
  let store: any;

  const data = {
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
  beforeEach(() => {
    store = createTestStore();
  });

  test("check for button", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["./people"]}>
          <CardDetails items={data.results} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(data.results[0].name)).toBeInTheDocument();
    expect(screen.getByTestId("btn-prev")).toBeInTheDocument();
    expect(screen.getByTestId("btn-next")).toBeInTheDocument();
  });

  test("check for person data", async () => {
    axiosMockInstance.onGet("https://www.swapi.tech/api/people/1").reply(200, {
      result: {
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
    });
    await store.dispatch(getData_api("https://www.swapi.tech/api/people/1"));
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["./people"]}>
          <CardDetails items={data.results} />
        </MemoryRouter>
      </Provider>
    );
    expect(store.getState().person).not.toBeNull();
  });

  test("check for button activity", async () => {
    const handleNext = jest.fn();
    const handlePrev = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["./people"]}>
          <CardDetails items={data.results} />
        </MemoryRouter>
      </Provider>
    );

    const next = screen.getByTestId("btn-next");

    fireEvent.click(next);

    waitFor(() => expect(handleNext).toBeCalled());
    const prev = screen.getByTestId("btn-prev");
    fireEvent.click(prev);
    waitFor(() => expect(handlePrev).toBeCalled());
  });
});
