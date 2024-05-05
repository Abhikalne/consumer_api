import React, { useEffect } from "react";
import { RootState } from "../../store/store";
import { card_api } from "../../store/Api_services";
import CardDetails from "../CardDetails/CardDetails";
import { SpinningCircles } from "react-loading-icons";
import { cardProps } from "../../common/type";
import { useAppDispatch } from "../../Hooks/useAppDispatch";
import { useAppSelector } from "../../Hooks/useAppSelector";
import "./_card.css";

function Card({ category }: cardProps) {
    const dispatch = useAppDispatch();

    const { card, loading, error } = useAppSelector(
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
                        marginLeft: "45vw",
                        marginTop: "25vh",
                        backgroundColor: "grey",
                    }}
                    data-testid="loading"
                    speed={1.5}
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
