import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function ShirtPage() {
    const [ shirt, setShirt ]= useState([]);
    async function loadShirt(){
        const apiShirt = await fetch(`/api/Men/Shirt`).then( result=>result.json() );
        setShirt( apiShirt );
    }
    function sortBy(type){
        if (type == "High"){
            const sortedList = [...shirt].sort(function(a, b){
                let price1 = a.price;
                let price2 = b.price;
                return (price1 > price2 ? 1 : -1 )});
                setShirt( sortedList );
        }
        if (type == "Low"){
            const sortedList = [...shirt].sort(function(a, b){
                let price1 = a.price;
                let price2 = b.price;
                return (price2 > price1 ? 1 : -1 )});
                setShirt( sortedList );
        }
    }
    useEffect( function(){
        loadShirt();
    }, [] );

    return (
        <div className="container-fluid">
            <div className="text-right mx-auto col-lg-10">
                <div class="dropdown">
                    <button class="mySqrBtn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sort
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div class="dropdown-item" onClick={()=>sortBy("High")}>sort by Price(Low to high)</div>
                        <div class="dropdown-item" onClick={()=>sortBy("Low")}>sort by Price(high to low)</div>
                    </div>
                </div>
            </div>
            <div className="row mx-auto col-lg-10">
                {
                    shirt.map(image=>
                        <Link className="myCard mx-auto"  to={`/Mens/Shirt/${image.id}`}>
                            <div className="">
                                <img className="cardtImg" src={image.mainImg} alt={image.name}/>
                                <p className="cardTitle">{image.name}</p>
                                <p>CA${image.price}</p>
                                <div className="d-flex justify-content-center">
                                    {image.colours.map(colour=>
                                        <img className="colorSwatches" src={colour.thumbnail} alt=""/>
                                        )}
                                </div>
                            </div>
                            <div className="myCardHvr">
                                <div className="mySqrBtn mx-auto" style={{width: '70%', marginTop: '30%'}}>
                                    view detail
                                </div>
                            </div>
                        </Link>
                        )
                }
            </div>
        </div>
    )
}

export default ShirtPage
