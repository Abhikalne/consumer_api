import React from "react";
import { Route, Routes } from "react-router-dom";
import Card from "../component/Card/Card";
import Films from "../component/Films/Films";
import Dashboard from "../component/Dashboard/Dashboard";

function RoutePath() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/films" Component={Films}></Route>
            <Route path="/people/" element={<Card category="people" />}></Route>
            <Route path="/planets/" element={<Card category="planets" />}></Route>
            <Route path="/species/" element={<Card category="species" />}></Route>
            <Route path="/starships/" element={<Card category="starships" />}></Route>
            <Route path="/vehicles/" element={<Card category="vehicles" />}></Route>
            <Route path="/people/:id" element={<Card category="people" />}></Route>
            <Route path="/planets/:id" element={<Card category="planets" />}></Route>
            <Route path="/species/:id" element={<Card category="species" />}></Route>
            <Route
                path="/starships/:id"
                element={<Card category="starships" />}
            ></Route>
            <Route
                path="/vehicles/:id"
                element={<Card category="vehicles" />}
            ></Route>
        </Routes>
    );
}

export default RoutePath;
