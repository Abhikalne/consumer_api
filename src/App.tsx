import React, { useEffect, useState } from "react";

import Dashboard from "./component/Dashboard";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "./Redux-store/Store";
import { Route, Routes, useLocation } from "react-router-dom";
import Films from "./component/Films/Films";
import Card from "./component/common/Card";
import Navbar from "./component/common/Navbar";
import ErrorBoundaryPage from "./component/ErrorBoundary";

// import './App.css'

function App() {
  const [category, setCategory] = useState("");
  const [path, setPath] = useState("");
  const location = window.location;
  console.log(location);
  useEffect(() => {
    category ? setPath("/" + category) : setCategory(location.toString());
  }, [category, location]);
  return (
    <Provider store={store}>
      <ErrorBoundaryPage>
        <Navbar setCategory={setCategory} />
        <Routes>
          <Route
            path="/"
            element={<Dashboard setCategory={setCategory} />}
          ></Route>
          <Route path="/films" Component={Films}></Route>
          <Route path={path} element={<Card category={category} />}></Route>
        </Routes>
      </ErrorBoundaryPage>
    </Provider>
  );
}

export default App;
