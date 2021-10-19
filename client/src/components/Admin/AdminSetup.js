import React from 'react'
import { Link, useLocation } from "react-router-dom";

function AdminSetup() {
    return (
        <div>
            <div className="row container mx-auto">
                <Link to="/ProductList" className="mx-auto">
                    <div className="myTab mx-auto">
                        <div className="card-body">
                            <h3>Product List</h3>
                        </div>
                    </div>
                </Link>
                <Link to="/AddProduct" className="mx-auto">
                    <div className="myTab mx-auto">
                        <div className="card-body">
                            <h3>Add Product</h3>
                        </div>
                    </div>
                </Link>
                <div className="myTab mx-auto">
                    <div className="card-body">
                        <h3>Change Setting</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSetup
