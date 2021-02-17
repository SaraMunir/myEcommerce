import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import GirlsPage from './GirlsPage';
import ProductDetail from './ProductDetail'

function KidsWear() {
    return (
        <div>
            <Route exact path="/Kids/Girls" component={GirlsPage}/>
            <Route exact path="/Kids/:category/:productId" component={ProductDetail}/>
        </div>
    )
}

export default KidsWear
