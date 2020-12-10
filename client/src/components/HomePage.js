import React from 'react';
import { Link, useLocation } from "react-router-dom";

import heroMan from './assets/man1.png'
import heroWoman from './assets/women1.png'
import heroKid from './assets/kids1.png'
import latestImg from './assets/EZlPBAMWAAkyf2F.png'
function HomePage() {
    return (
        <div>
            {/* <div className="hero">
                <div className="row container mx-auto heroPrnt">
                    <div className="heroTxt">
                        <h1>The Stitches</h1>
                    </div>
                    <div className="d-flex col-11 mx-auto">
                        <div className="col-3 mx-auto heroCnt">
                            <img src={heroWoman} className="heroImg mx-auto" alt=""/>
                        </div>
                        <div className="col-6 mx-auto heroCntMid">
                            <img src={heroKid} className="heroImg1 mx-auto" alt=""/>
                        </div>
                        <div className="col-3 mx-auto heroCnt">
                            <img src={heroMan} className="heroImg mx-auto" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <div className="mySqrBtn mt-5 col-2 mx-auto spBtn">explore now</div>
                </div>
            </div> */}
            {/* <div className="row container-fluid m-0 p-0" style={{height:'60vh', backgroundColor:'white'}}>
                <div className="col-lg-8">
                    <h3 className="reviewH3">e-commerce fashion site</h3>
                    <div className="mySqrBtn mt-5 col-4 mx-auto spBtn">New Arrivals</div>
                </div>
                <div className="col-lg-4">
                    <img className="newArrivalImg" src="https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80" alt=""/>
                </div>
            </div> */}
            <div className="container-fluid m-0 p-4" style={{minHeight:'100vh', backgroundColor:'#ebecec'}}>
                <div className="row mx-auto">
                    <div className="col-lg-4">
                        <div className="hovrCntr h40  mb-3">
                            <div className="position-relative">
                                <img  className="mx-auto h40 mb-3" src="https://images.unsplash.com/photo-1596149615678-8488f200b301?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80" alt=""/>
                                <h4 className="mt-5 contentCapt">#Bags</h4>

                            </div>
                            <div className="hvrContent greenBcgnd">
                                <Link to="/Bags"><h4 className="mt-5">#Bags</h4></Link>
                            </div>
                        </div>
                        <div className="hovrCntr h60  mb-3">
                            <div className="position-relative">
                                <img  className="mx-auto h60" src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt=""/>
                                <h4 className="mt-5 contentCapt">#Her</h4>
                            </div>
                            <div className="hvrContent pnkBcgnd">
                                <Link to="/Women"><h4 className="mt-5">#Her</h4></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="hovrCntr h60 mb-3">
                            <div  className="position-relative">
                                <img  className="mx-auto h60" src="https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""/>
                                <h4 className="mt-5 contentCapt">#Kids</h4>
                            </div>
                            <div className="hvrContent orangeBcgnd">
                                <Link to="/Kids"><h4 className="mt-5">#Kids</h4></Link>
                            </div>
                        </div>
                        <div className="hovrCntr h40 mb-3">
                            <div  className="position-relative">
                                <img  className="mx-auto h40" src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt=""/>
                                <h4 className="mt-5 contentCapt">#Accessories</h4>
                            </div>
                            <div className="hvrContent green2Bcgnd">
                                <Link to="/Accessories"><h4 className="mt-5">#Accessories</h4></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="hovrCntr h40  mb-3">
                            <div  className="position-relative">
                                <img  className="mx-auto h40 mb-3" src="https://images.unsplash.com/photo-1593765762957-d8d876a1beeb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80" alt=""/>
                                
                                <h4 className="mt-5 contentCapt">#Shoes</h4>
                            </div>
                            <div className="hvrContent greenBcgnd">
                                <Link to="/Shoes"><h4 className="mt-5">#Shoes</h4></Link>
                            </div>
                        </div>
                        {/* <img  className="mx-auto h40 mb-3" src="https://images.unsplash.com/photo-1593765762957-d8d876a1beeb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80" alt=""/> */}
                        <div className="hovrCntr h60  mb-3">
                            <div  className="position-relative">
                                <img  className="mx-auto h60" src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=726&q=80" alt=""/>
                                <h4 className="mt-5 contentCapt">#His</h4>
                            </div>
                            <div className="hvrContent greenBcgnd">
                                <Link to="/Men"><h4 className="mt-5">#His</h4></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomePage
