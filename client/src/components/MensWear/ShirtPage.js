import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function ShirtPage() {
    const [ shirt, setShirt ]= useState([]);
    async function loadShirt(){
        const apiShirt = await fetch(`/api/Men/Shirt`).then( result=>result.json() );
        console.log('apiShirt:', apiShirt)
        setShirt( apiShirt );
    }
    useEffect( function(){
        loadShirt();
    }, [] );

    return (
        <div className="container-fluid">
            <div className="text-right mx-auto col-lg-10">
                <h4>Sort By <i class="fas fa-chevron-down"></i></h4>
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
