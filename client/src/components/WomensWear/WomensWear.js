import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import TeesPage from './TeesPage'
import TopsPage from './TopsPage';
import JacketsBlazersPage from './JacketsBlazersPage';
import BottomsPage from './BottomsPage';
import DressesPage from './DressesPage';
import SkirtsPage from './SkirtsPage';
import ProductDetail from './ProductDetail';
function WomensWear() {
    return (
        <div>
            <Router>
                <Route exact path="/Womens/Tees" component={TeesPage}/>
                {/* /api/Women/${category} */}
                <Route exact path="/Womens/:category/:productId" component={ProductDetail}/>
                <Route exact path="/Womens/Tops" component={TopsPage}/>
                <Route exact path="/Womens/Dresses" component={DressesPage}/>
                <Route exact path="/Womens/Skirts" component={SkirtsPage}/>
                <Route exact path="/Womens/Bottoms" component={BottomsPage}/>
                <Route exact path="/Womens/Jackets&Blazers" component={JacketsBlazersPage}/>
            </Router>
        </div>
    )
}

export default WomensWear
