import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux-store/Store";
import { useNavigate } from "react-router-dom";
import { species_api } from "../../Redux-store/Api_services";
import CardDetails from "../common/CardDetails";

function Species() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { species, error, loading } = useSelector(
    (state: RootState) => state.species
  );

  useEffect(() => {
    dispatch(species_api());
  }, [dispatch]);

  return (
    <div className="people-container">
      <h1 className="heading">Planets</h1>

      {loading ? (
        <div className="loading ">Loading...</div>
      ) : error ? (
        error
      ) : species ? (
        <CardDetails items={species} />
      ) : (
        <div>Something Went wrong</div>
      )}
    </div>
  );
}

export default Species;


