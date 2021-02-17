import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./assets/needle.png"
function Navbar() {
    const location = useLocation();
    const [ showMenu, setShowMenu ]= useState(false);
    const [ shoppingCartItem, setShoppingCartItem ]= useState(0);

    function loadShoppingCartNum(){
        if(localStorage.shoppingCart===undefined){
            setShoppingCartItem(0)
        }else {
            let myCart = JSON.parse(localStorage.shoppingCart);
            let cartItmQty = 0
            myCart.map(item=>{
                cartItmQty = cartItmQty + Number(item.quantity)
            })
            setShoppingCartItem(cartItmQty)
        }
    }
    useEffect( function(){
        loadShoppingCartNum();
    }, [] );
    return (
        <div className="position-relative"> 
            <div style={{height:'10vh'}}></div>
            <nav className="navbar navbar-expand-lg navbar-light p-0 pt-2">
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
                    <Link to="/Kid" className={location.pathname === "/Kid" ? "navLinkActive col-lg-3" : "navLink col-lg-3"}>
                        Kids
                    </Link>
                </div>
                <div className="col-3">
                    <div className="d-flex justify-content-end" style={{position:'relative'}}>
                        <Link to="/ShoppingCart" className={location.pathname === "/ShoppingCart" ? "navLinkActive col-lg-3" : "navLink col-lg-3"}>
                            <i class="fas fa-shopping-cart" style={{fontSize: '1.5rem'}}></i>
                        </Link>
                        { shoppingCartItem === 0 ?'': <p className="shoppingNumber">{shoppingCartItem}</p>}
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
