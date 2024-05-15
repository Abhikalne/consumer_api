import React, { Fragment, useEffect } from "react";
import { dashboard_api } from "../../store/Api_services";
import { RootState } from "../../store/store";
import { images } from "../../common/imagesData";
import { useNavigate } from "react-router-dom";
import { SpinningCircles } from "react-loading-icons";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

import "./_dashboard.css";

function Dashboard() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { rootData, error, loading } = useAppSelector(
        (state: RootState) => state.dashboard
    );
    useEffect(() => {
        dispatch(dashboard_api());
    }, [dispatch]);

    const handleClick = (key: string) => {
        if(key==='films')
            navigate(key)
        else
            navigate(key+'/1');
    };
    const showData = () => {
        return Object.keys(rootData).map((key: string, i: number) => (
            <div
                key={key + i}
                className="rootData-item"
                onClick={() => handleClick(key)}
            >
                {/* eslint-disable-next-line */}
                {images.map((itm: any, ind: number) => {
                    return (
                        <Fragment key={ind}>
                            {itm[key] ? (
                                <img src={itm[key]} alt={key} loading="lazy" />
                            ) : (
                                <></>
                            )}
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
                    <SpinningCircles
                        className="loading"
                        data-testid="loading"
                        speed={1.5}
                    />
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
