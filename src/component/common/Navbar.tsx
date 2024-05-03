import React, { useState } from "react";

import "./_navbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux-store/Store";
import { resetCard } from "../../Redux-store/CardSlice";
import { card_api } from "../../Redux-store/Api_services";

function Navbar({ setCategory }: any) {
  const data: string[] = [
    "FILMS",
    "PEOPLE",
    "PLANETS",
    "SPECIES",
    "STARSHIPS",
    "VEHICLES",
  ];
  const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const handleNavigate = (key: string) => {
    // dispatch(resetCard());
    // dispatch(card_api(key));
    // setCategory(key);
    // window.location.href = "http://localhost:3000/" + key;
    // navigate("./" + key);
  };
  return (
    <header className="">
      <nav className="navbar">
        <a href="/" className="logo">
          STARWAR API
        </a>
        <ul className={`navMenu ${isActive ? "active" : ""}`}>
          {data.map((key: string) => (
            <li className="navitem" key={key}>
              <div className="navLink" onClick={() => handleNavigate(key)}>
                {key.toLocaleUpperCase()}
              </div>
            </li>
          ))}
        </ul>
        <div
          className={`hamburger ${isActive ? "active" : ""}`}
          onClick={toggleActiveClass}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
