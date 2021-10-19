import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import Logo from "./assets/needle.png"
function Navbar() {
    const admin = localStorage.category;
    let history = useHistory();
    const location = useLocation();
    const [showSearchInput, setShowSearchInput] = useState(false)
    const [ showMenu, setShowMenu ]= useState(false);
    const [ shoppingCartItem, setShoppingCartItem ]= useState(0);
    const [ searchInput, setSearchInput]= useState({searchInput: ''})
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
    function handleSearchInput(e){
        const {value, id} =  e.target;
        setSearchInput({[id]: value});
    }
    async function search(){
        console.log('searchInput: ', searchInput)
        history.push(`/Search/${searchInput.searchInput}`);
    }
    useEffect( function(){
        loadShoppingCartNum();
    }, [] );
    return (
        <div className="position-relative"> 
            <div style={{height:'10vh'}}></div>
            <nav className="navbar navbar-expand-lg navbar-light p-0 pt-2">
                <div className="col-2 d-flex justify-content-between">
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
                    <Link to="/HomePage" className={location.pathname === "/HomePage" ? "navLinkActive mx-auto" : "navLink mx-auto"}>
                        Home
                    </Link>
                    <Link to="/Women" className={location.pathname === "/Women" ? "navLinkActive mx-auto" : "navLink mx-auto"}>
                        Women
                    </Link>
                    <Link to="/Men" className={location.pathname === "/Men" ? "navLinkActive mx-auto" : "navLink mx-auto"}>
                        Men
                    </Link>
                    <Link to="/Kid" className={location.pathname === "/Kid" ? "navLinkActive mx-auto" : "navLink mx-auto"}>
                        Kids
                    </Link>
                    {
                        admin === 'Admin' ? <Link to="/AdminSetup" className={location.pathname === "/AdminSetup" ? "navLinkActive mx-auto" : "navLink mx-auto"}>
                        Settings
                    </Link> :''
                    }
                </div>
                <div className="col-2 d-flex  justify-content-end">
                    {/* <div className="col-9 searchParent">
                        <i class="searchIcon fas fa-search" onClick={()=>setShowSearchInput(true)}></i>
                        {
                            showSearchInput === false ? <i class="searchIcon fas fa-search" onClick={()=>setShowSearchInput(true)}></i> :
                            <i class="searchIcon fas fa-search" onClick={search}></i>
                        }
                        <input className="myInput" style={showSearchInput === true ? {visibility: 'visible',width: '100%'}: {visibility: 'hidden',width: '0%'}} onChange={handleSearchInput} id="searchInput" value={searchInput.searchInput}/>
                    </div> */}
                    <div className="col-3 d-flex justify-content-end" style={{position:'relative'}}>
                        <Link to="/ShoppingCart" className={location.pathname === "/ShoppingCart" ? "navLinkActive col-lg-12" : "navLink col-lg-12"}>
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
