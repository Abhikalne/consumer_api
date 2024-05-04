import React, { useState } from "react";

import "./_navbar.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux-store/Store";
import { resetCard } from "../../Redux-store/CardSlice";
import { card_api } from "../../Redux-store/Api_services";
import { navbarType } from "./type";

function Navbar({ setCategory }: navbarType) {
    const data: string[] = [
        "FILMS",
        "PEOPLE",
        "PLANETS",
        "SPECIES",
        "STARSHIPS",
        "VEHICLES",
    ];
    const dispatch = useDispatch<AppDispatch>();

    const [isActive, setIsActive] = useState(false);

    const toggleActiveClass = () => {
        setIsActive(!isActive);
    };

    const handleNavigate = (key: string) => {
        dispatch(resetCard());
        dispatch(card_api(key));
        setCategory(key);
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
                            to={key}
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