import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddKidProduct from './AddKidProduct';
import AddMenProduct from './AddMenProduct';
import AddWomenProduct from './AddWomenProduct';
import ProductDetail from './ProductDetail';
import SideMenu from './SideMenu';

function AddProduct() {
    return (
        <div>
            <div>
                <Router>
                    <div  className="d-flex">
                        <SideMenu/>
                        <div className="settingBckg container" style={{width: '85%'}}>
                            <Route exact path="/AddProduct/Women" component={AddWomenProduct}/>
                            <Route path="/AddProduct/Women/:productId" component={ProductDetail}/>
                            <Route path="/AddProduct/Men" component={AddMenProduct}/>
                            <Route path="/AddProduct/Kids" component={AddKidProduct}/>
                        </div>
                    </div>
                </Router>
            </div>

        </div>
    )
}

export default AddProduct
