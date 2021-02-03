import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function DressesPage() {
    const [ dress, setDress ]= useState([]);
    
    async function loadDress(){
        const apiDress = await fetch('/api/Women/Dress').then( result=>result.json() );
        setDress( apiDress );
        console.log('apiDress: ', apiDress)
    }
    useEffect( function(){
        loadDress();
    }, [] );
    return (
        <div className="container-fluid">
            <div className="text-right mx-auto col-lg-10">
                <h5>Sort By <i class="fas fa-chevron-down"></i></h5>
            </div>
            <div className="row mx-auto col-lg-10">
                {
                    dress.map(image=>
                        <Link className="myCard mx-auto"  to={`/Womens/Dress/${image.id}`}>
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

export default DressesPage
