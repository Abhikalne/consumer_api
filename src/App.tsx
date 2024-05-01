import React from "react";

import "./App.css";
import Dashboard from "./component/Dashboard";
import { Provider } from "react-redux";
import store from "./Redux-store/Store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Films from "./component/Films/Films";
import People from "./component/People/People";
import Planets from "./component/Planets/Planets";
import Species from "./component/Species/Species";
import Starships from "./component/Starships.tsx/Starships";
import Vehicles from "./component/Vehicles/Vehicles";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Dashboard}></Route>
          <Route path="/films" Component={Films}></Route>
          <Route path="/people" Component={People}></Route>
          <Route path="/planets" Component={Planets}></Route>
          <Route path="/species" Component={Species}></Route>
          <Route path="/starships" Component={Starships}></Route>
          <Route path="/vehicles" Component={Vehicles}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
