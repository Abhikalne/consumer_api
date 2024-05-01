
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../Redux-store/Store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { vehicles_api } from "../../Redux-store/Api_services";
import CardDetails from "../common/CardDetails";

function Vehicles() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { vehicles, error, loading } = useSelector(
    (state: RootState) => state.vehicles
  );

  useEffect(() => {
    dispatch(vehicles_api());
  }, [dispatch]);

  return (
    <div className="people-container">
      <h1 className="heading">Vehicles</h1>

      {loading ? (
        <div className="loading ">Loading...</div>
      ) : error ? (
        error
      ) : vehicles ? (
        <CardDetails items={vehicles} />
      ) : (
        <div>Something Went wrong</div>
      )}
    </div>
  );
}

export default Vehicles;

