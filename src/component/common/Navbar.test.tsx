import { render, screen } from "@testing-library/react"
import Navbar from "./Navbar"
import { Provider } from "react-redux"
import axiosMock from "axios-mock-adapter";
import axios from "axios";
import { createTestStore } from "./utils";


describe('test cases for navbar',()=>{
    const axiosMockInstance = new axiosMock(axios);
  let store: any;
    beforeEach(() => {
        store = createTestStore();
      });
    it('render navbar',()=>{
        render(
            <Provider store={store}>
                <Navbar/>
            </Provider>
        )
        expect(screen.getByText('STARWAR API')).toBeInTheDocument()
        expect(screen.getByText('FILMS')).toBeInTheDocument()
        expect(screen.getByText('SPECIES')).toBeInTheDocument()
    })
})