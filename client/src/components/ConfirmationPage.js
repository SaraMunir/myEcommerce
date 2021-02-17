import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
 
function ConfirmationPage() {
    const { ordernumber } = useParams();
    const [ orderSummary, setOrderSummary ]= useState([]);
    const [ orderShippingAddress, setOrderShippingAddress ]= useState({});
    const [ orderBillingAddress, setOrderBillingAddress ]= useState({});
    const [ orderItems, setOrderItems ]= useState([]);
    const [ orderDate, setOrderDate ]= useState();
    async function loadOrder(){
        const fetchOrderNum = await fetch (`/api/orderNumber/${ordernumber}`).then( res => res.json());
        console.log('fetchOrderNum: ', fetchOrderNum)
        var dateobj = new Date(fetchOrderNum.createdAt);
        var B = dateobj.toLocaleDateString();
        setOrderShippingAddress(fetchOrderNum.shippingAddress)
        setOrderBillingAddress(fetchOrderNum.billingAddress)
        setOrderItems(fetchOrderNum.shoppingCartItems)
        setOrderDate(B)
        setOrderSummary(fetchOrderNum)
    }
    useEffect( function(){
        loadOrder();
    }, [] );
    return (
        <div className="text-center mb-4">
            <h3>Thank You For Your Order</h3>
            <p className="m-0 p-0">Order Number: #{orderSummary._id}</p>
            <p className="m-0 p-0">Order Date: {orderDate}</p>
            <hr className="col-lg-6"/>
            <h3>ORDER DETAILS</h3>
            <h5>CUSTOMER INFORMATION</h5>
            <div className="row container mx-auto mb-4 col-lg-9">
                <div className="shippingAddress col-lg-6 mx-auto">
                    <h5>Shipping Address</h5>
                    <h6>{orderSummary.firstName} {orderSummary.lastName}</h6>
                    <p className="m-0 p-0">{orderSummary.emailAddress}</p>
                    <p className="m-0 p-0">{orderSummary.phoneNumber}</p>
                    <p className="m-0 p-0">{orderShippingAddress.address1}, {orderShippingAddress.address2}</p>
                    <p className="m-0 p-0">{orderShippingAddress.city}, {orderShippingAddress.province}, {orderShippingAddress.postalCode}</p>
                </div>
                <div className="BillingAddress col-lg-6 mx-auto">
                    <h5>Billing Address</h5>
                    <h6>{orderSummary.firstName} {orderSummary.lastName}</h6>
                    <p className="m-0 p-0">{orderBillingAddress.address1}, {orderBillingAddress.address2}</p>
                    <p className="m-0 p-0">{orderBillingAddress.city}, {orderBillingAddress.province}, {orderBillingAddress.postalCode}</p>
                </div>
            </div>
            <h4 className="mb-3">ORDER SUMMARY</h4>
            <div className='mx-auto'>
                {orderItems.map(items=>
                    <div className="col-lg-8 d-flex mx-auto mb-1">
                        <img className="col-2 orderConImg" src={items.mainImg} alt=""/>
                        <div className="col-7 text-left">
                            <p className="m-0 p-0">{items.productName}</p>
                            <p className="m-0 p-0">Size: {items.size}</p>
                            <p className="m-0 p-0">Qty: {items.quantity}</p>
                        </div>
                        <div className="col-3">
                            <p className="m-0 p-0">CAD ${items.price}</p>
                        </div>
                    </div>
                    )}
                    <hr className="col-lg-7"/>
                    <div className="col-lg-8 d-flex mx-auto">
                        <div className="col-6">
                            <p className="m-0 p-0">payment</p>
                        </div>
                        <div className="col-6 d-flex justify-content-around mx-auto">
                            <div className="col-6 text-right">
                                <p className="m-0 p-0">Sub Total:</p>
                                <p className="m-0 p-0">Shipping:</p>
                                <p className="m-0 p-0">Taxes:</p>
                            </div>
                            <div className="col-6 text-right bold">
                                <p className=" m-0 p-0">CAD ${orderSummary.basePrice}</p>
                                <p className="m-0 p-0">CAD ${orderSummary.shipping}.00</p>
                                <p className="m-0 p-0">CAD ${orderSummary.taxes}</p>
                            </div>
                        </div>
                    </div>
                    <hr className="col-lg-7"/>
                    <div  className="col-lg-8 d-flex mx-auto">
                        <div className="col-6">
                            <p className="m-0 p-0"></p>
                        </div>
                        <div className="col-6 d-flex justify-content-around mx-auto">
                            <div className="col-6 text-right">
                                <h5 className="m-0 p-0">Total:</h5>
                            </div>
                            <div className="col-6 text-right bold">
                                <h4 className="m-0 p-0">CAD ${orderSummary.totalPrice}</h4>
                            </div>
                        </div>
                    </div>
            </div>


        </div>
    )
}

export default ConfirmationPage
