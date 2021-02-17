import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function ShoppingCart() {
    const [ shoppingCart, setShoppingCart ]= useState([]);
    const [totalPrice, setTotalPrice]=useState(0)
    function loadShoppingCart(){
        if(localStorage.shoppingCart===undefined){
            setShoppingCart([])
        }else {
            let myCart = JSON.parse(localStorage.shoppingCart)
            setShoppingCart(myCart)
            calculatePrice()
        }
    }
    function calculatePrice(){
        if(shoppingCart===''){
            setTotalPrice(0)
        }else{
            let price=0;
            let myCart = JSON.parse(localStorage.shoppingCart)
            myCart.map(item=>{
                let itemTotalPrice = Number(item.price)*Number(item.quantity)
                price = price + itemTotalPrice;
            })
            price = price.toFixed(2)
            setTotalPrice(price)
        }
    }
    function handleInputChange(e){
        let shoppinCt = shoppingCart;
        const {value, id} =  e.target
        shoppinCt[id].quantity = value;
        localStorage.setItem("shoppingCart",JSON.stringify(shoppinCt));
        loadShoppingCart();
        calculatePrice();
        document.location.reload(true);

    }
    function removeItem(idx){
        let shoppinCt = shoppingCart;
        let deletedShoppingCt = shoppinCt.filter( el => el.id !==  shoppingCart[idx].id ); 
        console.log('deletedShoppingCt: ',deletedShoppingCt)
        localStorage.setItem("shoppingCart",JSON.stringify(deletedShoppingCt));
        loadShoppingCart();
        calculatePrice();
        document.location.reload(true);
    }
    useEffect( function(){
        loadShoppingCart();
    }, [] );
    return (
        <div>
            <h1>Shopping cart</h1>
            <div className="row container-fluid">
                <div className="cart col-lg-8 text-left mx-auto">
                    <h4 className="col-10 mx-auto">Your Cart</h4>
                    {
                        shoppingCart==='' ? <h4 className="m-0 p-0">You do not have any items in your cart</h4>:
                        shoppingCart.map((item,idx)=>
                            <div className="card col-10 mb-2 mx-auto">
                                <div className="card-body">
                                    <div className="d-flex justify-content-end">
                                        <i class="cursor deleteBtn fas fa-times" onClick={()=>removeItem(idx)}></i>
                                    </div>
                                    <div className="row">
                                        <img className="col-3" src={item.mainImg} alt="ss"/>
                                        <div className="col-9 text-left">
                                            <h6 className="mt-1 mb-1">{item.productName}</h6>
                                            <p className="mt-1 mb-1"><span>Price:</span> CA${(item.price * item.quantity).toFixed(2)}</p>
                                            <p className="mt-1 mb-1"><span>Size:</span> {item.size}</p>
                                            <select class="form-control col-2" id={idx} value={item.quantity} onChange={handleInputChange}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="col-lg-4 text-left">
                    <h4 className="col-10 mx-auto">Estimated price</h4>

                    <div className="estimatedPrice">
                        <div className="d-flex justify-content-between"  style={{fontWeight: 'bolder', minHeight: "100px"}}>
                            <p>Merchandise subtotal</p>
                            <p>CA$ {totalPrice}</p>
                        </div>
                        {shoppingCart.length<1 ? 
                            <div className="mySqrBtnSpecialInactive text-center">
                                Checkout &nbsp; <i class="fas fa-chevron-right"></i>
                            </div>
                            : 
                            <Link to="/Checkout">
                            <div className="mySqrBtnSpecial text-center">
                                Checkout &nbsp; <i class="fas fa-chevron-right"></i>
                            </div>
                            </Link>
                        }
                        
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ShoppingCart
