import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux-store/Store";
import { useNavigate } from "react-router-dom";
import { card_api } from "../../Redux-store/Api_services";
import CardDetails from "./CardDetails";

import "./_card.css";
import { SpinningCircles } from "react-loading-icons";

function Card({ category }: any) {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { card, error, loading } = useSelector(
    (state: RootState) => state.card
  );

  useEffect(() => {
    dispatch(card_api(category));
  }, [dispatch, category]);
  return (
    <div className="card-container">
      <h1 className="heading">{category.toUpperCase()}</h1>
      {loading ? (
        <SpinningCircles
          style={{
            marginLeft: "50vw",
            marginTop: "30vh",
            backgroundColor: "grey",
          }}
          data-testid="loading"
        />
      ) : error ? (
        error
      ) : card ? (
        <CardDetails items={card} />
      ) : (
        <div>Something Went wrong</div>
      )}
    </div>
  );
}

export default Card;
