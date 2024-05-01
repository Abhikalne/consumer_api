
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../Redux-store/Store";
import { useDispatch, useSelector } from "react-redux";
import { getData_api } from "../../Redux-store/Api_services";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

function CardDetails({ items }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [slideIndex, setslideIndex] = useState(0);
  const { person } = useSelector((state: RootState) => state.people);
  console.log(person);
  const handlePrev = () => {
    setslideIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setslideIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    dispatch(getData_api(items[slideIndex].url));
  }, [dispatch, slideIndex, items]);

  return (
    <div className="people-parent">
      <div className="arrow-button" onClick={handlePrev}>
        <FaAngleLeft />
      </div>
      {items.map((ele: any, ind: number) => {
        return (
          <div
            key={ind}
            className={slideIndex === ind ? "slide active" : "slide"}
          >
            <h3>{ele.name}</h3>
            <div>
              {Object.keys(person).length && Object.entries(person.properties)?.map(([key, value]: any) => (
                <h5 key={key + value}>
                  {key.toUpperCase()}:- {value}
                </h5>
              ))}
            </div>
          </div>
        );
      })}
      <div className="arrow-button" onClick={handleNext}>
        <FaAngleRight size={16} />
      </div>
    </div>
  );
}

export default CardDetails;



