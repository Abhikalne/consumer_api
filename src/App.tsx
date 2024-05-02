import React, { useEffect, useState } from "react";

import Dashboard from "./component/Dashboard";
import { Provider } from "react-redux";
import store from "./Redux-store/Store";
import {  Route, Routes, useLocation } from "react-router-dom";
import Films from "./component/Films/Films";
import Card from "./component/common/Card";



function App() {
  const [category,setCategory]= useState('')
  const [path,setPath]=useState('')
  const location=useLocation();
useEffect(() => {
  category
    ? setPath("/" + category)
    : setCategory(location.pathname.slice(1));
}, [category, location]);
return (
  <Provider store={store}>
    <Routes>
      <Route
        path="/"
        element={<Dashboard setCategory={setCategory} />}
      ></Route>
      <Route path="/films" Component={Films}></Route>
      <Route path={path} element={<Card category={category} />}></Route>
    </Routes>
  </Provider>
);
}

export default App;