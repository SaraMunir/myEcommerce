import React from 'react'
import { Link, useLocation } from "react-router-dom";

function WomenMenu() {
    return (
        <ul className="topMenu d-flex">
            <div>
                <Link to="/AddProduct/Women/Dress">
                    <li className="">Dress</li>
                </Link>
            </div>
            <div>
                <Link to="/AddProduct/Women/Tees">
                    <li className="">Tees</li>
                </Link>

            </div>
            <div>
                <Link to="/AddProduct/Women/Jackets">
                    <li className="">Jackets</li>
                </Link>

            </div>
        </ul>
    )
}

export default WomenMenu
