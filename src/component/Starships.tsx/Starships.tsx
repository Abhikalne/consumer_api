
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../Redux-store/Store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { starships_api } from "../../Redux-store/Api_services";
import CardDetails from "../common/CardDetails";

function Starships() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { starships, error, loading } = useSelector(
    (state: RootState) => state.starships
  );

  useEffect(() => {
    dispatch(starships_api());
  }, [dispatch]);

  return (
    <div className="people-container">
      <h1 className="heading">Starships</h1>

      {loading ? (
        <div className="loading ">Loading...</div>
      ) : error ? (
        error
      ) : starships ? (
        <CardDetails items={starships} />
      ) : (
        <div>Something Went wrong</div>
      )}
    </div>
  );
}

export default Starships;

