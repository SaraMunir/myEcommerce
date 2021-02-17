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
                                    <img  className="mx-auto h100 mb-3" src="https://i.pinimg.com/originals/73/31/b5/7331b560f12c8b271903972802e01e0d.jpg" alt=""/>
                                    <h4 className="mt-5 contentCapt">#Tees</h4>

                                </div>
                                <div className="hvrContent greenBcgnd">
                                    <h4 className="mt-5">#Tees</h4>
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
