import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../Redux-store/Store";
import { people_api } from "../../Redux-store/Api_services";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

import "./_people.css";

import CardDetails from "../common/CardDetails";
function People() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { people, error, loading, person } = useSelector(
    (state: RootState) => state.people
  );

  useEffect(() => {
    dispatch(people_api());
  }, []);

  return (
    <div className="people-container">
      <h1 className="heading">People</h1>
      {loading ? (
        <div className="loading ">Loading...</div>
      ) : error ? (
        error
      ) : people ? (
        <CardDetails items={people} />
      ) : (
        <div>Something Went wrong</div>
      )}
    </div>
  );
}

export default People;
