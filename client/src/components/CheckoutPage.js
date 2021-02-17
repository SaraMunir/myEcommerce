import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

function CheckoutPage() {
    let history = useHistory();

    const [warningCard, setWarningCard ]= useState({ show: false, message: ""});
    const [shippingInfo, setShippingInfo] = useState({
        "firstName": "",
        "lastName": "",
        "emailAddress": "",
        "phoneNumber": "",
        "inputAddress": "",
        "inputAddress2": "",
        "inputCity": "",
        "inputProvince": "",
        "inputPostalCode": ""
    })
    const [billingInfo, setBillingInfo] = useState({
        "inputAddress": "",
        "inputAddress2": "",
        "inputCity": "",
        "inputProvince": "",
        "inputPostalCode": ""
    })
    const [cardInfo, setCardInfo] = useState({
        "nameOnCard": "",
        "cardNumber": "",
        "expiryDate": "",
        "CCV": ""
    })
    const [billingSameAsShipping, setBillingSameAsShipping]= useState(false)
    const [showShipping, setShowShipping] = useState(true);
    const [showPayment, setShowPayment] = useState({status: false, done: false});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [shoppingCart, setShoppingCart]= useState([]);
    const [priceAmount, setPriceAmount]=useState({
        basePrice: 0,
        Taxes: 13/100,
        shipping: 8, 
        totalPrice: 0
    })
    const [totalPrice, setTotalPrice]=useState(0)
    const [orderSummary, setOrderSummary]=useState({})
    const [totalTaxes, setTaxes]=useState(0)
    const inputFirstName = useRef();
    const inputLastName = useRef();
    const inputEmail = useRef();
    const inputPhoneNumber = useRef();
    const inputAddress = useRef();
    const inputCity = useRef();
    const inputProvince = useRef();
    const inputPostalCode = useRef();
    const billingAddress = useRef();
    const billingCity = useRef();
    const billingProvince = useRef();
    const billingPostalCode = useRef();
    const nameOnCard = useRef();
    const cardNumber = useRef();
    const expiryDate = useRef();
    const CCV = useRef();
    function moveToNext(type){
        if(type === "Shipping"){
            if( shippingInfo.firstName === ""){
                inputFirstName.current.focus();
                setWarningCard({ show: true, message: "Please provide First Name."})
                return;
            }
            if( shippingInfo.lastName === ""){
                inputLastName.current.focus();
                setWarningCard({ show: true, message: "Please provide First Name."})
                return;
            }
            if( shippingInfo.emailAddress === ""){
                inputEmail.current.focus();
                setWarningCard({ show: true, message: "Please provide Email Address."})
                return;
            }
            if( shippingInfo.inputAddress === ""){
                inputAddress.current.focus();
                setWarningCard({ show: true, message: "Please provide Shipping Address."})
                return;
            }
            if( shippingInfo.inputCity === ""){
                inputCity.current.focus();
                setWarningCard({ show: true, message: "Please provide City."})
                return;
            }
            if( shippingInfo.inputProvince === ""){
                inputProvince.current.focus();
                setWarningCard({ show: true, message: "Please provide Province."})
                return;
            }
            if( shippingInfo.inputPostalCode === ""){
                inputPostalCode.current.focus();
                setWarningCard({ show: true, message: "Please provide Postal Code."})
                return;
            }
            console.log('shippingInfo: ', shippingInfo)
            setWarningCard({ show: false, message: ""});
            setShowShipping(false)
            setShowPayment({...showPayment, status: true})
        }
        if(type === "Billing"){
            if(billingSameAsShipping=== false){
                if( billingInfo.inputAddress === ""){
                    billingAddress.current.focus();
                    setWarningCard({ show: true, message: "Please provide Shipping Address."})
                    return;
                }
                if( billingInfo.inputCity === ""){
                    billingCity.current.focus();
                    setWarningCard({ show: true, message: "Please provide City."})
                    return;
                }
                if( billingInfo.inputProvince === ""){
                    billingProvince.current.focus();
                    setWarningCard({ show: true, message: "Please provide Province."})
                    return;
                }
                if( billingInfo.inputPostalCode === ""){
                    billingPostalCode.current.focus();
                    setWarningCard({ show: true, message: "Please provide Postal Code."})
                    return;
                }
                if( cardInfo.nameOnCard === ""){
                    nameOnCard.current.focus();
                    setWarningCard({ show: true, message: "Please provide Name on Card."})
                    return;
                }
                if( cardInfo.expiryDate === ""){
                    expiryDate.current.focus();
                    setWarningCard({ show: true, message: "Please provide Expiry Date Card."})
                    return;
                }
                if( cardInfo.CCV === ""){
                    CCV.current.focus();
                    setWarningCard({ show: true, message: "Please provide Security code on Card."})
                    return;
                }
                setWarningCard({ show: false, message: ""});
                setShowPayment({...showPayment, status: false, done: true})
                setShowConfirmation(true)
            }
            if(billingSameAsShipping=== true){
                if( cardInfo.nameOnCard === ""){
                    nameOnCard.current.focus();
                    setWarningCard({ show: true, message: "Please provide Name on Card."})
                    return;
                }
                if( cardInfo.expiryDate === ""){
                    expiryDate.current.focus();
                    setWarningCard({ show: true, message: "Please provide Expiry Date Card."})
                    return;
                }
                if( cardInfo.CCV === ""){
                    CCV.current.focus();
                    setWarningCard({ show: true, message: "Please provide Security code on Card."})
                    return;
                }
                setWarningCard({ show: false, message: ""});
                setShowPayment({...showPayment, status: false, done: true})
                setShowConfirmation(true)
            }
        }
    }
    function editInfo(type){
        if(type==='shipping'){
            setShowShipping(true);
            setShowConfirmation(false)
        }
        if(type==='Billing'){
            setShowShipping(false);
            setShowConfirmation(false)
            setShowPayment({...showPayment, status: true})
        }
    }
    function handleInputChange(e){
        const {value, id} =  e.target;
        setShippingInfo({...shippingInfo, [id]: value});
    }
    function handlePaymentInputChange(e){
        const {value, id} =  e.target;
        setBillingInfo({...billingInfo, [id]: value});
    }
    function handleCardInputChange(e){
        const {value, id} =  e.target;
        setCardInfo({...cardInfo, [id]: value});
    }
    function sameAsBilling(){
        if(billingSameAsShipping===false){
            setBillingSameAsShipping(true)
        }else {
            setBillingSameAsShipping(false)
        }
    }
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
            let taxes = (price*(13/100)).toFixed(2);
            let totalPrice2 = Number(price) + Number(priceAmount.shipping) + Number(taxes)
            setPriceAmount({...priceAmount, basePrice: price, Taxes: taxes,shipping: 8, totalPrice: totalPrice2.toFixed(2)})
            setTotalPrice(price)
            setTaxes(taxes)
        }
    }
    async function processPayment(){

        if(billingSameAsShipping===false){
            const orderObj = {
                firstName: shippingInfo.firstName, 
                lastName: shippingInfo.lastName, 
                emailAddress: shippingInfo.emailAddress, 
                phoneNumber: shippingInfo.phoneNumber, 
                shippingAddress: {
                    address1: shippingInfo.inputAddress, 
                    address2: shippingInfo.inputAddress2, 
                    city: shippingInfo.inputCity, 
                    province: shippingInfo.inputProvince, 
                    postalCode: shippingInfo.inputPostalCode, 
                },
                billingAddress: {
                    address1: billingInfo.inputAddress, 
                    address2: billingInfo.inputAddress2, 
                    city: billingInfo.inputCity, 
                    province: billingInfo.inputProvince, 
                    postalCode: billingInfo.inputPostalCode, 
                },
                // shoppingCartItems: shoppingCart,
                basePrice: priceAmount.basePrice,
                taxes: priceAmount.Taxes,
                shipping: priceAmount.shipping,
                totalPrice: priceAmount.totalPrice,
            }
            console.log('orderObj: ', orderObj)
            const apiResult = await fetch('/api/postOrder', 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderObj)
            }).then( result=>result.json())
            console.log('apiResult: ', apiResult)
            // localStorage.setItem("orderSummary",JSON.stringify(apiResult.postOrder));
            localStorage.setItem("shoppingCart",JSON.stringify([]));
            history.push(`/Confirmation/${apiResult.postOrder._id}`);
            document.location.reload(true);
        }else{
            const orderObj = {
                firstName: shippingInfo.firstName, 
                lastName: shippingInfo.lastName, 
                emailAddress: shippingInfo.emailAddress, 
                phoneNumber: shippingInfo.phoneNumber, 
                shippingAddress: {
                    address1: shippingInfo.inputAddress, 
                    address2: shippingInfo.inputAddress2, 
                    city: shippingInfo.inputCity, 
                    province: shippingInfo.inputProvince, 
                    postalCode: shippingInfo.inputPostalCode, 
                },
                billingAddress: {
                    address1: shippingInfo.inputAddress, 
                    address2: shippingInfo.inputAddress2, 
                    city: shippingInfo.inputCity, 
                    province: shippingInfo.inputProvince, 
                    postalCode: shippingInfo.inputPostalCode, 
                },
                shoppingCartItems: shoppingCart,
                basePrice: priceAmount.basePrice,
                taxes: priceAmount.Taxes,
                shipping: priceAmount.shipping,
                totalPrice: priceAmount.totalPrice,
            }
            console.log('orderObj: ', orderObj)
            const apiResult = await fetch('/api/postOrder', 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderObj)
            }).then( result=>result.json())
            console.log('apiResult: ', apiResult)
            // localStorage.setItem("orderSummary",JSON.stringify(apiResult.postOrder));
            localStorage.setItem("shoppingCart",JSON.stringify([]));
            history.push(`/Confirmation/${apiResult.postOrder._id}`);
            document.location.reload(true);
        }
    }
    useEffect( function(){
        loadShoppingCart();
    }, [] );
    return (
        <div className="checkoutBckgnd">
            <div className="myCardBig mx-auto">
                <h1>checkout</h1>
                <div className="col-8 d-flex justify-content-between mx-auto">
                    <h4 className={showShipping===false ? "activeDone": "active"}>Shipping <i class="fas fa-shipping-fast"></i></h4>
                    <div className="col m-auto">
                        <div className={showShipping===false ? "lineDvdr lineDvdrDone": "lineDvdr lineDvdrInActive"}></div>
                    </div>
                    <h4 className={showPayment.status===true ? "active"
                    :
                    showPayment.done === true ? "activeDone" :
                    "inactive"} >Payment <i class="fas fa-credit-card"></i></h4>
                    <div className="col m-auto">
                        <div className={showPayment.done === true ? "lineDvdr lineDvdrDone": "lineDvdr lineDvdrInActive"}></div>
                    </div>
                    <h4 className={showConfirmation===false ? "inactive": "active"}>Confirmation <i class="fas fa-clipboard-list"></i></h4>
                </div>
                <div className="">
                    <div className={showShipping===false ? "hide": "shipping"}>
                        <form className="col-lg-11 mx-auto text-left">
                            <div className="row text-left">
                                <div className="col">
                                    <label for="firstName">First Name</label>
                                    <input type="text" className="form-control" placeholder="First name" id="firstName" value={shippingInfo.firstName} ref={inputFirstName} onChange={handleInputChange}/>
                                </div>
                                <div className="col">
                                    <label for="lastName">Last Name</label>
                                    <input type="text" className="form-control" placeholder="Last name" id="lastName"  value={shippingInfo.lastName} ref={inputLastName} onChange={handleInputChange}/>
                                </div>
                            </div>
                                <div className="col">
                                    <label for="emailAddress">Email address</label>
                                    <input type="email" className="form-control"  id="emailAddress" aria-describedby="emailHelp" placeholder="Enter email" value={shippingInfo.emailAddress} ref={inputEmail} onChange={handleInputChange}/>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="col">
                                    <label for="phoneNumber">Phone Number</label>
                                    <input type="number" className="form-control"  id="phoneNumber" aria-describedby="emailHelp" placeholder="Enter Phone number" value={shippingInfo.phoneNumber} ref={inputPhoneNumber} onChange={handleInputChange}/>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                            <div className="row text-left">

                            </div>
                            <div className="form-group">
                                <label for="inputAddress">Address</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"  value={shippingInfo.inputAddress} ref={inputAddress} onChange={handleInputChange}/>
                            </div>
                            <div className="form-group">
                                <label for="inputAddress2">Address 2</label>
                                <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" value={shippingInfo.inputAddress2} onChange={handleInputChange} />
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                <label for="inputCity">City</label>
                                <input type="text" className="form-control" id="inputCity" value={shippingInfo.inputCity} ref={inputCity} onChange={handleInputChange}/>
                                </div>
                                <div className="form-group col-md-4">
                                <label for="inputProvince">Province</label>
                                <select id="inputProvince" className="form-control" value={shippingInfo.inputProvince} ref={inputProvince} onChange={handleInputChange}>
                                    <option selected>Choose...</option>
                                    <option>Alberta</option>
                                    <option>British Columbia</option>
                                    <option>Manitoba</option>
                                    <option>New Brunswick</option>
                                    <option>Newfoundland and Labrador</option>
                                    <option>Northwest Territories</option>
                                    <option>Nova Scotia</option>
                                    <option>Nunavut</option>
                                    <option>Ontario</option>
                                    <option>Prince Edward Island</option>
                                    <option>Quebec</option>
                                    <option>Saskatchewan</option>
                                    <option>Yukon</option>
                                </select>
                                </div>
                                <div className="form-group col-md-2">
                                <label for="inputPostalCode">Postal Code</label>
                                <input type="text" className="form-control" id="inputPostalCode" value={shippingInfo.inputPostalCode} ref={inputPostalCode} onChange={handleInputChange}/>
                                </div>
                            </div>
                            <div>
                                {warningCard.show === true ?
                                <div classNameName="warningCard col-8 mb-3">
                                    <p className="m-0 p-2">{warningCard.message}</p>
                                </div> : ''
                                }
                            </div>
                            <div className="row justify-content-end">
                                <div className="mySqrBtnSpecial text-center" onClick={()=>moveToNext('Shipping')}>
                                    NEXT &nbsp; <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={showPayment.status===false ? "hide": "payment"}>
                        
                        <form className="col-lg-11 mx-auto text-left">
                            <div className="col-lg-9 mx-auto">
                                <h4>Billing</h4>
                                <div className="d-flex mx-auto">
                                    {billingSameAsShipping===false? <i class="checkMarkBtn fas fa-square" onClick={sameAsBilling}></i> : <i class="checkMarkBtn fas fa-check-square" onClick={sameAsBilling}></i>}
                                    &nbsp;
                                    {/* <i class="far fa-square"></i>
                                    <i class="far fa-check-square"></i> */}
                                    <p>Same as shipping</p>
                                </div>
                            </div>
                            <div className={billingSameAsShipping===true ? "hide": "billing"}>
                                <div className="card col-lg-9 mx-auto">
                                    <div className="card-body">
                                        <div class="form-group">
                                            <label for="inputAddress">Address</label>
                                            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"  value={billingInfo.inputAddress} ref={billingAddress} onChange={handlePaymentInputChange}/>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputAddress2">Address 2</label>
                                            <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" value={billingInfo.inputAddress2} onChange={handlePaymentInputChange} />
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                            <label for="inputCity">City</label>
                                            <input type="text" class="form-control" id="inputCity" value={billingInfo.inputCity} ref={billingCity} onChange={handlePaymentInputChange}/>
                                            </div>
                                            <div class="form-group col-md-4">
                                            <label for="inputProvince">Province</label>
                                            <select id="inputProvince" class="form-control" value={billingInfo.inputProvince} ref={billingProvince} onChange={handlePaymentInputChange}>
                                                <option selected>Choose...</option>
                                                <option>Alberta</option>
                                                <option>British Columbia</option>
                                                <option>Manitoba</option>
                                                <option>New Brunswick</option>
                                                <option>Newfoundland and Labrador</option>
                                                <option>Northwest Territories</option>
                                                <option>Nova Scotia</option>
                                                <option>Nunavut</option>
                                                <option>Ontario</option>
                                                <option>Prince Edward Island</option>
                                                <option>Quebec</option>
                                                <option>Saskatchewan</option>
                                                <option>Yukon</option>
                                            </select>
                                            </div>
                                            <div class="form-group col-md-2">
                                            <label for="inputPostalCode">Postal Code</label>
                                            <input type="text" class="form-control" id="inputPostalCode" value={billingInfo.inputPostalCode} ref={billingPostalCode} onChange={handlePaymentInputChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-3 col-lg-9 mx-auto">
                                <div className="card-body cardPayment">
                                    <div class="form-group mx-auto">
                                        <label for="nameOnCard">Name On Card</label>
                                        <input type="text" class="form-control" id="nameOnCard" placeholder="Name On Card"  value={cardInfo.nameOnCard} ref={nameOnCard} onChange={handleCardInputChange}/>
                                    </div>
                                    <div class="form-group mx-auto">
                                        <label for="cardNumber">Card Number</label>
                                        <input type="password" class="form-control" id="cardNumber" placeholder="Disabled"  value={cardInfo.cardNumber} ref={cardNumber} disabled onChange={handleCardInputChange}/>
                                    </div>
                                    <div className="row">
                                        <div class="form-group mx-auto col-lg-8">
                                            <label for="expiryDate">Expiry Day</label>
                                            <input type="month" class="form-control" id="expiryDate" placeholder="Disabled"  value={cardInfo.expiryDate} name="expiry month" ref={expiryDate} onChange={handleCardInputChange}/>
                                        </div>
                                        <div class="form-group mx-auto col-lg-4">
                                            <label for="CCV">CCV</label>
                                            <input type="number " maxlength="3"class="form-control" id="CCV" placeholder=""  value={cardInfo.CCV} name="expiry month" ref={CCV} onChange={handleCardInputChange}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {warningCard.show === true ?
                                <div className="warningCard col-8 mb-3">
                                    <p className="m-0 p-2">{warningCard.message}</p>
                                </div> : ''
                                }
                            </div>
                            <div className="row justify-content-between">
                                <div className="mySqrBtnSpecial text-center">
                                <i class="fas fa-chevron-left"></i> &nbsp; Back  
                                </div>
                                <div className="mySqrBtnSpecial text-center" onClick={()=>moveToNext('Billing')}>
                                    NEXT &nbsp; <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={showConfirmation===false ? "hide": "confirmatio"}>
                        <form className="col-lg-12 mx-auto text-left row ">
                            <div className="col-lg-7">
                                <div className="col-lg-9 mx-auto">
                                    <h3>Review</h3>
                                </div>
                                <div className="card mt-3 mx-auto shippingInfo">
                                    <div className="card-body">
                                        <h5>Shipping Info:</h5>
                                        <hr className="m-1"/>
                                        <h4>{shippingInfo.firstName} {shippingInfo.lastName}</h4>
                                        <p>{shippingInfo.emailAddress}</p>
                                        <p>{shippingInfo.inputAddress}, {shippingInfo.inputAddress2}</p>
                                        <p>{shippingInfo.inputCity}, {shippingInfo.inputProvince}, {shippingInfo.inputPostalCode}.</p>
                                        <div className="d-flex justify-content-end">
                                            <div className="mySqrBtnSpecial" onClick={()=>editInfo('shipping')}>Edit</div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    billingSameAsShipping === true ? 
                                    <div className="card mt-3 col-lg-12 mx-auto">
                                        <div className="card-body billingInfo">
                                            <h5>Billing Info: </h5>
                                            <hr className="m-1"/>
                                            <p>Same as shipping</p>
                                            <div className="d-flex justify-content-end">
                                                <div className="mySqrBtnSpecial" onClick={()=>editInfo('Billing')}>Edit</div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="card mt-3 col-lg-12 mx-auto">
                                        <div className="card-body billingInfo">
                                            <h5>Billing Info: </h5>
                                            <hr className="m-1"/>
                                            <p>{billingInfo.inputAddress}, {billingInfo.inputAddress2}</p>
                                            <p>{billingInfo.inputCity}, {billingInfo.inputProvince}, {billingInfo.inputPostalCode}.</p>
                                            <div className="d-flex justify-content-end">
                                                <div className="mySqrBtnSpecial"
                                                onClick={()=>editInfo('Billing')}>Edit</div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="card mt-3 col-lg-12 mb-3 mx-auto cardInfo">
                                    <div className="card-body">
                                        <h5>Card Info:</h5>
                                        <hr className="m-1"/>
                                        <p> <span style={{fontWeight:'bolder'}}>Card Number:</span> ***************</p>
                                        <p><span style={{fontWeight:'bolder'}}>Card Expiry Date:</span> {cardInfo.expiryDate}</p>
                                        <p><span style={{fontWeight:'bolder'}}>Card Security Code: </span> {cardInfo.CCV}</p>
                                        <div className="d-flex justify-content-end">
                                            <div className="mySqrBtnSpecial"onClick={()=>editInfo('Billing')} >Edit</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-3 col-lg-12 mb-3 mx-auto cartList">
                                    <div className="card-body">
                                        <h5>Cart Items:</h5>
                                        <hr className="m-1"/>
                                        {shoppingCart.map(cart=>
                                            <div className="d-flex mt-2 mb-2">
                                                <div className="col-2 position-relative">
                                                    <img src={cart.mainImg} alt=""/>
                                                    <div className="proQty">{cart.quantity}</div>
                                                </div>
                                                <div>
                                                    <p className="m-0 p-0">{cart.productName}</p>
                                                    <p className="m-0 p-0">size: {cart.size} color: {cart.productColor}</p>
                                                    <p className="m-0 p-0">{cart.quantity}</p>
                                                </div>
                                            </div>
                                            )}
                                    </div>
                                </div>
                                <div  className="row justify-content-between">
                                    <div className="mySqrBtnSpecial text-center">
                                    <i class="fas fa-chevron-left"></i> &nbsp; Back  
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="card mt-3 mx-auto orderSummary">
                                    <div className="card-body shippingInfo">
                                        <h5>Order Summary:</h5>
                                        <hr className="m-1"/>
                                        <div className="d-flex justify-content-between">
                                            <p>Subtotal: </p>
                                            <div className="d-flex justify-content-between">
                                                <p>CA$</p>
                                                <p>{priceAmount.basePrice}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p>Shipping(4-5 Business Days): </p>
                                            <div className="d-flex justify-content-between">
                                                <p>CA$</p>
                                                <p>8</p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p>Est. Tax: </p>
                                            <div className="d-flex justify-content-between">
                                                <p>CA$</p>
                                                <p>{totalTaxes}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <h5>Total:</h5>
                                            <h5>CA$ {priceAmount.totalPrice}</h5>
                                        </div>
                                        <div className="d-flex justify-content-center mt-2">
                                            <div className="mySqrBtn" onClick={processPayment}>Process Payment</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage
