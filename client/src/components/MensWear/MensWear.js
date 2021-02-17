import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import TeesPage from './TeesPage'
import ProductDetail from './ProductDetail'
function MensWear() {
    return (
        <div>
                <Route exact path="/Mens/Tees" component={TeesPage}/>
                {/* /api/Women/${category} */}
                <Route exact path="/Mens/:category/:productId" component={ProductDetail}/>
        </div>
    )
}

export default MensWear
