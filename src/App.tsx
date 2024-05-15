import React from "react";

import { Provider } from "react-redux";
import store from "./store/store";
import Navbar from "./component/Navbar/Navbar";
import ErrorBoundaryPage from "./component/ErrorBoundary";
import "./App.css";
import RoutePath from "./route/RoutePath";

function App() {
    return (
        <Provider store={store}>
            <Navbar />
            <ErrorBoundaryPage>
                <RoutePath />
            </ErrorBoundaryPage>
        </Provider>
    );
}

export default App;
