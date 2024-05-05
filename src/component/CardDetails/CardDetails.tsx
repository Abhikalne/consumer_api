import React, { useEffect, useState } from "react";
import { RootState } from "../../store/store";
import { getData_api } from "../../store/Api_services";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { SpinningCircles } from "react-loading-icons";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { cardDetailsProps, cardDetailsType, cardType } from "../../common/type";

function CardDetails({ items }: cardDetailsProps) {
    const dispatch = useAppDispatch();
    const { cardDetails, loading, error } = useAppSelector(
        (state: RootState) => state.cardDetail
    );
    const [slideIndex, setslideIndex] = useState(0);

    const handlePrev = () => {
        setslideIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };
    const handleNext = () => {
        setslideIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    };
    useEffect(() => {
        dispatch(getData_api(items));
    }, [dispatch, items]);
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
                            ) : (
                                cardDetails?.map(
                                    (itm: cardDetailsType) =>
                                        itm.properties?.name === ele.name &&
                    Object.entries(itm.properties)?.map(([key, value]: any) => (
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
                    ))
                                )
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
