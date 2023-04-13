import React from "react";
import { NavLink } from "react-router-dom";
import './Navigation.css';


const Navigation = (props) => {
    return (
        <span className="NavLink">
            <NavLink to={props.to} end={props.end}>{props.children}</NavLink>
        </span>
    );
};


export default Navigation;