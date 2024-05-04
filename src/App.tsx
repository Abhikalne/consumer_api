import React, { useEffect, useState } from "react";

import Dashboard from "./component/Dashboard";
import { Provider } from "react-redux";
import store from "./Redux-store/Store";
import { Route, Routes } from "react-router-dom";
import Films from "./component/Films/Films";
import Card from "./component/common/Card";
import Navbar from "./component/common/Navbar";
import ErrorBoundaryPage from "./component/ErrorBoundary";
import "./App.css";

function App() {
    const [category, setCategory] = useState<string>("");
   
    const location = window.location;
    const arr = ["people", "planets", "species", "starships", "vehicles"];
    useEffect(() => {
        !category && setCategory(location.toString());
    }, [category, location]);
    return (
        <Provider store={store}>
            <Navbar setCategory={setCategory} />
            <ErrorBoundaryPage>
                <Routes>
                    <Route
                        path="/"
                        element={<Dashboard setCategory={setCategory} />}
                    ></Route>
                    <Route path="/films" Component={Films}></Route>
                    {arr.map((ele: string, ind: number) => (
                        <Route
                            key={ele + ind}
                            path={ele}
                            element={<Card category={ele} />}
                        ></Route>
                    ))}
                </Routes>
            </ErrorBoundaryPage>
        </Provider>
    );
}

export default App;
