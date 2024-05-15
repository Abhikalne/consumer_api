import React, { useState } from "react";

import "./_navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { resetCard } from "../../store/CardDetails/CardDetailsSlice";
import { card_api } from "../../store/Api_services";

function Navbar() {
    const data: string[] = [
        "FILMS",
        "PEOPLE",
        "PLANETS",
        "SPECIES",
        "STARSHIPS",
        "VEHICLES",
    ];
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);

    const toggleActiveClass = () => {
        setIsActive(!isActive);
    };

    const handleNavigate = (key: string) => {
        dispatch(resetCard());
        dispatch(card_api(key));

        navigate(key);
    };
    return (
        <header className="">
            <nav className="navbar">
                <NavLink to="/" className="logo">
          STARWAR API
                </NavLink>
                <ul className={`navMenu ${isActive ? "active" : ""}`}>
                    {data.map((key: string) => (
                        <NavLink
                            to={key.toLocaleLowerCase()}
                            key={key}
                            className="navLink navitem"
                            onClick={() => handleNavigate(key)}
                        >
                            {key.toLocaleUpperCase()}
                        </NavLink>
                    ))}
                </ul>
                <div
                    className={`hamburger ${isActive ? "active" : ""}`}
                    onClick={toggleActiveClass}
                    data-testid="hamburger"
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
