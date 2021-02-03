import React from 'react';
import { Link, useLocation } from "react-router-dom";

function WomenPage() {
    return (
        <div>
            <div className="container-fluid m-0 p-4" style={{minHeight:'100vh', backgroundColor:'#ebecec'}}>
                <div className="row mx-auto">
                    <div className="col-lg-4">
                        <Link to="/Womens/Tees">
                            <div className="hovrCntr h100 mb-3">
                                <div className="position-relative">
                                    <img  className="mx-auto h100 mb-3" src="https://i.pinimg.com/originals/73/31/b5/7331b560f12c8b271903972802e01e0d.jpg" alt=""/>
                                    <h4 className="mt-5 contentCapt">#Tees</h4>

                                </div>
                                <div className="hvrContent greenBcgnd">
                                    <h4 className="mt-5">#Tees</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4">
                        <Link to="/Womens/Dresses">
                            <div className="hovrCntr h100 mb-3">
                                <div className="position-relative">
                                    <img  className="mx-auto h100" src="https://imagescdn.simons.ca/images/6650/70815/4/A1_1.jpg?__=13" alt=""/>
                                    <h4 className="mt-5 contentCapt">#Dresses</h4>
                                </div>
                                <div className="hvrContent pnkBcgnd">
                                        <h4 className="mt-5">#Dresses</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4">
                        <Link to="/Womens/Jackets&Blazers">
                            <div className="hovrCntr h100  mb-3">
                                <div  className="position-relative">
                                    <img  className="mx-auto h100 mb-3" src="https://imagescdn.simons.ca/images/9391/202229/1/A1_1.jpg?__=6" alt=""/>
                                    <h4 className="mt-5 contentCapt">#Jackets & Blazers</h4>
                                </div>
                                <div className="hvrContent greenBcgnd">
                                    <h4 className="mt-5">#Jackets & Blazers</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div>
                    <hr style={{marginTop:'10vh'}}/>
                    
                    <h1>below design to be the final design</h1>
                </div>
                <div className="row mx-auto">
                    <div className="col-lg-4">
                        <Link to="/Womens/Tees">
                            <div className="hovrCntr h40  mb-3">
                                <div className="position-relative">
                                    <img  className="mx-auto h40 mb-3" src="https://i.pinimg.com/originals/73/31/b5/7331b560f12c8b271903972802e01e0d.jpg" alt=""/>
                                    <h4 className="mt-5 contentCapt">#Tees</h4>

                                </div>
                                <div className="hvrContent greenBcgnd">
                                
                                    <h4 className="mt-5">#Tees</h4>
                                </div>
                            </div>
                        </Link>
                        <div className="hovrCntr h60  mb-3">
                            <div className="position-relative">
                                <img  className="mx-auto h60" src="https://imagescdn.simons.ca/images/6650/70815/4/A1_1.jpg?__=13" alt=""/>
                                <h4 className="mt-5 contentCapt">#Dresses</h4>
                            </div>
                            <div className="hvrContent pnkBcgnd">
                                <Link to="/Womens/Dresses">
                                    <h4 className="mt-5">#Dresses</h4>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="hovrCntr h60 mb-3">
                            <div  className="position-relative">
                                <img  className="mx-auto h60" src="https://img.ltwebstatic.com/images3_pi/2020/09/04/15991860444489cf56a0d11974f0f44781d1743d74.webp" alt=""/>
                                <h4 className="mt-5 contentCapt">#Tops</h4>
                            </div>
                            <div className="hvrContent orangeBcgnd">
                                <Link to="/Womens/Tops"><h4 className="mt-5">#Tops</h4></Link>
                            </div>
                        </div>
                        <div className="hovrCntr h40 mb-3">
                            <div  className="position-relative">
                                <img  className="mx-auto h40" src="https://www.datocms-assets.com/16284/1602107147-mos-flats-women-s-fusion-lt-ankle-pant-navy-tweed.jpg?q=50&auto=format&dpr=1&w=400&h=533&fit=crop" alt=""/>
                                <h4 className="mt-5 contentCapt">#Bottoms</h4>
                            </div>
                            <div className="hvrContent green2Bcgnd">
                                <Link to="/Womens/Bottoms"><h4 className="mt-5">#Bottoms</h4></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="hovrCntr h40  mb-3">
                            <div  className="position-relative">
                                <img  className="mx-auto h40 mb-3" src="https://imagescdn.simons.ca/images/9391/202229/1/A1_1.jpg?__=6" alt=""/>
                                <h4 className="mt-5 contentCapt">#Jackets & Blazers</h4>
                            </div>
                            <div className="hvrContent greenBcgnd">
                            <Link to="/Womens/Jackets&Blazers"><h4 className="mt-5">#Jackets & Blazers</h4></Link>
                            </div>
                        </div>
                        <div className="hovrCntr h60  mb-3">
                            <div  className="position-relative">
                                <img  className="mx-auto h60" src="https://imagescdn.simons.ca/images/7023/202528/55/A1_1.jpg?__=13" alt=""/>
                                <h4 className="mt-5 contentCapt">#Skirts</h4>
                            </div>
                            <div className="hvrContent greenBcgnd">
                                <Link to="/Womens/Skirts"><h4 className="mt-5">#Skirts</h4></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WomenPage
