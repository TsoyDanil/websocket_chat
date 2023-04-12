import React from "react";
import { NavLink } from "react-router-dom";
import './Navigation.css';


const Navigation = ({to, end, children}) => {
    return (
        <span className="NavLink">
            <NavLink to={to} end={end}>{children}</NavLink>
        </span>
    );
};


export default Navigation;