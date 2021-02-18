import React from 'react'
import { Link } from "react-router-dom";

function KidsPage() {
    return (
        <div>
            <div className="container-fluid m-0 p-4" style={{minHeight:'100vh', backgroundColor:'#ebecec'}}>
            <div className="row mx-auto">
                    <div className="col-lg-4">
                        <Link to="/Kids/Girls">
                            <div className="hovrCntr h100 mb-3">
                                <div className="position-relative">
                                    <img  className="mx-auto h100 mb-3" src="https://i.pinimg.com/736x/a6/72/80/a672804ccb5101f5dde62fd0b6254ee7.jpg" alt=""/>
                                    <h4 className="mt-5 contentCapt">#Girls</h4>
                                </div>
                                <div className="hvrContent green2Bcgnd">
                                    <h4 className="mt-5">#Girls</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4">
                        <Link to="/Kids/Boys">
                            <div className="hovrCntr h100 mb-3">
                                <div className="position-relative">
                                    <img  className="mx-auto h100 mb-3" src="https://www.momjunction.com/wp-content/uploads/2016/04/Cool-Fashion-Tips-For-Teen-Boys-1.jpg" alt=""/>
                                    <h4 className="mt-5 contentCapt">#Boys</h4>
                                </div>
                                <div className="hvrContent greenBcgnd">
                                    <h4 className="mt-5">#Boys</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4">
                        <Link to="/Kids/Toddlers">
                            <div className="hovrCntr h100 mb-3">
                                <div className="position-relative">
                                    <img  className="mx-auto h100 mb-3" src="https://youaremom.com/wp-content/uploads/2018/07/clothing-for-children.jpg" alt=""/>
                                    <h4 className="mt-5 contentCapt">#Toddlers</h4>
                                </div>
                                <div className="hvrContent pink2Bcgnd">
                                    <h4 className="mt-5">#Toddlers</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KidsPage
