import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import TeesPage from './TeesPage'
import ProductDetail from './ProductDetail'
import ShirtPage from './ShirtPage';
import JacketPage from './JacketPage';
function MensWear() {
    return (
        <div>
            <Route exact path="/Mens/Tees" component={TeesPage}/>
            <Route exact path="/Mens/Shirt" component={ShirtPage}/>
            <Route exact path="/Mens/Jacket" component={JacketPage}/>
            <Route exact path="/Mens/:category/:productId" component={ProductDetail}/>
        </div>
    )
}

export default MensWear
