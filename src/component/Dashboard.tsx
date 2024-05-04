import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboard_api } from "../Redux-store/Api_services";
import { AppDispatch, RootState } from "../Redux-store/Store";
import { images } from "./common/imagesData";
import { useNavigate } from "react-router-dom";
import { SpinningCircles } from "react-loading-icons";

import "./_dashboard.css";
import { dashboardType } from "./common/type";


function Dashboard({ setCategory }:dashboardType) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { rootData, error, loading } = useSelector(
        (state: RootState) => state.dashboard
    );
    useEffect(() => {
        dispatch(dashboard_api());
    }, [dispatch]);

    const handleClick = (key: string) => {
        setCategory(key);
        navigate("/" + key);
    };
    const showData = () => {
        return Object.keys(rootData).map((key: string, i: number) => (
            <div key={key+i} className="rootData-item" onClick={() => handleClick(key)}>
                {images.map((itm: any, ind: number) => {
                    return (
                        <Fragment key={ind}>
                            {itm[key] ? <img src={itm[key]} alt={key} /> : <></>}
                        </Fragment>
                    );
                })}
                <div className="title">{key.toUpperCase()}</div>
            </div>
        ));
    };
    return (
        <div className="container">
            <h1>STAR WAR Movie World</h1>
            <div className="parent">
                {loading ? (
                    <SpinningCircles className="loading" data-testid="loading" />
                ) : error ? (
                    error
                ) : (
                    showData()
                )}
            </div>
        </div>
    );
}

export default Dashboard;
