import React, { useEffect, useState } from "react";
import { RootState } from "../../store/store";
import { getData_api } from "../../store/Api_services";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { resetCard } from "../../store/CardDetails/CardDetailsSlice";
import { SpinningCircles } from "react-loading-icons";
import { useAppSelector } from "../../Hooks/useAppSelector";
import { useAppDispatch } from "../../Hooks/useAppDispatch";
import { cardDetailsProps, cardType } from "../../common/type";

function CardDetails({ items }: cardDetailsProps) {
    const dispatch = useAppDispatch();
    const { cardDetails, loading, error } = useAppSelector(
        (state: RootState) => state.cardDetail
    );
    const [slideIndex, setslideIndex] = useState(0);

    const handlePrev = () => {
        dispatch(resetCard());
        setslideIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };
    const handleNext = () => {
        dispatch(resetCard());
        setslideIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    };
    useEffect(() => {
        dispatch(getData_api(items[slideIndex].url));
    }, [dispatch, slideIndex, items]);
    return (
        <div className="card-parent">
            {" "}
            <div className="arrow-button" onClick={handlePrev}>
                {" "}
                <FaAngleLeft data-testid="btn-prev" />{" "}
            </div>{" "}
            {items.map((ele: cardType, ind: number) => {
                return (
                    <div
                        key={ind}
                        className={slideIndex === ind ? "slide active" : "slide"}
                    >
                        {" "}
                        <h3>{ele.name}</h3>{" "}
                        <div>
                            {" "}
                            {loading ? (
                                <SpinningCircles
                                    className="loading"
                                    data-testid="loading"
                                    speed={1.5}
                                />
                            ) : error ? (
                                error
                            ) : cardDetails.properties &&
                cardDetails.properties?.name === ele.name ? (
                                    Object.entries(cardDetails.properties)?.map(
                                        ([key, value]: any) => (
                                            <h5 key={key + value}>
                                                {" "}
                                                {key.replace("_", " ").toUpperCase()}:-{" "}
                                                {Array.isArray(value)
                                                    ? value.map((itm: string) => (
                                                        <pre key={itm} style={{ fontSize: "0.8rem" }}>
                                                            {" "}
                                                            {itm}{" "}
                                                        </pre>
                                                    ))
                                                    : value}{" "}
                                            </h5>
                                        )
                                    )
                                ) : (
                                    <SpinningCircles
                                        className="loading"
                                        data-testid="loading"
                                        speed={1.5}
                                    />
                                )}{" "}
                        </div>{" "}
                    </div>
                );
            })}{" "}
            <div className="arrow-button" onClick={handleNext}>
                {" "}
                <FaAngleRight size={16} data-testid="btn-next" />{" "}
            </div>{" "}
        </div>
    );
}
export default React.memo(CardDetails);
