import React,{useState} from 'react'
import { Link, useLocation } from "react-router-dom";
import Logo from "./assets/needle.png"
function Navbar() {
    const location = useLocation();
    const [ showMenu, setShowMenu ]= useState(false);

    return (
        <div className="position-relative"> 
            <div style={{height:'8vh'}}></div>
            <nav className="navbar navbar-expand-lg navbar-light p-0">
                <div className="col-3 d-flex justify-content-between">
                    <i class="fas fa-bars hambuger" onClick={()=>setShowMenu(true)}></i>
                    <Link to="/HomePage" className={location.pathname === "/HomePage" ? "nav-link active" : "nav-link"}>
                        <div className="d-flex">
                            <img className="logoImg" src={Logo} alt=""/>
                            <h4 className="brandName">titches</h4>
                        </div>
                    </Link>
                </div>
                {/* row mx-auto hamMenu hideHamMenu */}
                <div className={showMenu === false? "row mx-auto hamMenu hideHamMenu" : "row mx-auto hamMenu"} >
                    <div className="navLink menuClosBtn" onClick={()=>setShowMenu(false)}>
                        <i class="fas fa-times"></i>
                    </div>
                    <Link to="/HomePage" className={location.pathname === "/HomePage" ? "navLinkActive col-lg-3 mx-auto" : "navLink col-lg-3 mx-auto"}>
                        Home
                    </Link>
                    <Link to="/Women" className={location.pathname === "/Women" ? "navLinkActive col-lg-3" : "navLink col-lg-3"}>
                        Women
                    </Link>
                    <Link to="/Men" className={location.pathname === "/Men" ? "navLinkActive col-lg-3" : "navLink col-lg-3"}>
                        Men
                    </Link>
                    <Link to="/Kids" className={location.pathname === "/Kids" ? "navLinkActive col-lg-3" : "navLink col-lg-3"}>
                        Kids
                    </Link>
                </div>
                <div className="col-3">
                    <div className="d-flex justify-content-end">
                        <i class="fas fa-2x fa-shopping-cart"></i>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
