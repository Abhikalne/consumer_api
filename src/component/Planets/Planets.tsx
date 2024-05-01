
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../Redux-store/Store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { planets_api } from "../../Redux-store/Api_services";
import CardDetails from "../common/CardDetails";

function Planets() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { planets, error, loading } = useSelector(
    (state: RootState) => state.planets
  );

  useEffect(() => {
    dispatch(planets_api());
  }, [dispatch]);

  return (
    <div className="people-container">
      <h1 className="heading">Planets</h1>

      {loading ? (
        <div className="loading ">Loading...</div>
      ) : error ? (
        error
      ) : planets ? (
        <CardDetails items={planets} />
      ) : (
        <div>Something Went wrong</div>
      )}
    </div>
  );
}

export default Planets;

