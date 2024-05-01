import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../Redux-store/Store";
import { film_api } from "../../Redux-store/Api_services";

import "./_films.css";
function Films() {
  const dispatch = useDispatch<AppDispatch>();
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const { films, error, loading } = useSelector(
    (state: RootState) => state.films
  );
  console.log(films);
  useEffect(() => {
    dispatch(film_api());
  }, [dispatch]);

  return (
    <div className="film-container">
      <h1 className="heading">Movies</h1>
      {loading ? (
        <div className="loading ">Loading...</div>
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
            {films.map((ele: any, ind: number) => (
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
                      <button>More Details</button>
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



