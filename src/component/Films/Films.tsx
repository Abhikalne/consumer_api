import React, { Fragment, useEffect, useState } from "react";
import { RootState } from "../../store/store";
import { film_api } from "../../store/Api_services";
import "./_films.css";
import { SpinningCircles } from "react-loading-icons";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { filmsType } from "../../common/type";

function Films() {
    const dispatch = useAppDispatch();
    const { films, error, loading } = useAppSelector(
        (state: RootState) => state.films
    );
    const [id, setId] = useState("");

    useEffect(() => {
        dispatch(film_api());
    }, [dispatch]);

    return (
        <div className="film-container">
            <h1 className="heading">MOVIES</h1>
            {loading ? (
                <SpinningCircles
                    style={{
                        marginLeft: "50vw",
                        marginTop: "30vh",
                        backgroundColor: "grey",
                    }}
                    speed={1.5}
                    data-testid="loading"
                />
            ) : error ? (
                error
            ) : films ? (
                <table className="film-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Director</th>
                            <th>Release date</th>
                            <th>Episode no</th>
                        </tr>
                    </thead>
                    <tbody>
                        {films.map((ele: filmsType, ind: number) => (
                            <Fragment key={ind}>
                                <tr
                                    onClick={() => (ele.uid === id ? setId("") : setId(ele.uid))}
                                >
                                    <td>{ele.properties.title}</td>
                                    <td>{ele.properties.director}</td>
                                    <td>{ele.properties.release_date}</td>
                                    <td>{ele.properties.episode_id}</td>
                                </tr>
                                {id === ele.uid && (
                                    <tr>
                                        <td colSpan={4} className="film-details">
                                            <h2>Starting Plot</h2>
                                            <h5>{ele.properties.opening_crawl}</h5>
                        
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>Something Went wrong</div>
            )}
        </div>
    );
}

export default Films;
