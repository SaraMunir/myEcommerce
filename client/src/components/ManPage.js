import React from 'react'
import { Link } from "react-router-dom";

function ManPage() {
    return (
        <div>
            <div className="container-fluid m-0 p-4" style={{minHeight:'100vh', backgroundColor:'#ebecec'}}>
            <div className="row mx-auto">
                    <div className="col-lg-4">
                        <Link to="/Mens/Tees">
                            <div className="hovrCntr h100 mb-3">
                                <div className="position-relative">
                                    <img  className="mx-auto h100 mb-3" src="https://spy.com/wp-content/uploads/2020/04/best-t-shirts-for-men-1.jpg" alt=""/>
                                    <h4 className="mt-5 contentCapt">#Tees</h4>

                                </div>
                                <div className="hvrContent greenBcgnd">
                                    <h4 className="mt-5">#Tees</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4">
                        <Link to="/Mens/Shirt">
                            <div className="hovrCntr h100 mb-3">
                                <div className="position-relative">
                                    <img  className="mx-auto h100 mb-3" src="https://i.ibb.co/NZh9zdn/MS-1-Raisin-The-Bar-4.png" alt=""/>
                                    <h4 className="mt-5 contentCapt">#Shirt</h4>
                                </div>
                                <div className="hvrContent greenBcgnd">
                                    <h4 className="mt-5">#Shirt</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4">
                        <Link to="/Mens/Jacket">
                            <div className="hovrCntr h100 mb-3">
                                <div className="position-relative">
                                    <img  className="mx-auto h100 mb-3" src="https://i.ibb.co/8g2PbvX/MJ-2-Meadow-Gold-2.png" alt=""/>
                                    <h4 className="mt-5 contentCapt">#Jacket</h4>
                                </div>
                                <div className="hvrContent greenBcgnd">
                                    <h4 className="mt-5">#Jacket</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManPage
