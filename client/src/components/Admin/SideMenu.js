import React from 'react'
import { Link, useLocation } from "react-router-dom";

function SideMenu() {
    const location = useLocation();

    return (
        <div className="sideMenu">
            <ul className="list-group">
                <li className="sideMenuItem">Settings</li>
                <Link to="/AddProduct/Women">
                    <li className={location.pathname === "/AddProduct/Women" ? "sideMenuItemActive borderBottom borderTop" : "sideMenuItem borderBottom borderTop"} >Women</li>
                </Link>
                <Link to="/AddProduct/Men">
                    <li className={location.pathname === "/AddProduct/Men" ? "sideMenuItemActive borderBottom " : "sideMenuItem borderBottom"}>Men</li>
                </Link>
                <Link to="/AddProduct/Kids">
                    <li className={location.pathname === "/AddProduct/Kids" ? "sideMenuItemActive borderBottom " : "sideMenuItem borderBottom"}>Kids</li>
                </Link>
            </ul>
        </div>
    )
}

export default SideMenu
