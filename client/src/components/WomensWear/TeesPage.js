import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function TeesPage() {
    const [ tees, setTees ]= useState([]);
    
    async function loadTees(){
        const apiTees = await fetch('/api/Tees/Women').then( result=>result.json() );
        setTees( apiTees );
        console.log('apiTees: ', apiTees)
    }

    useEffect( function(){
        loadTees();
    }, [] );


    return (
        <div className="container-fluid">
            <div>sort by</div>
            <div className="row mx-auto col-lg-10">
                {
                    tees.map(image=>
                        <Link className="myCard mx-auto"  to={`/Womens/Tees/${image.id}`}>
                            <div className="">
                                <img className="cardtImg" src={image.mainImg} alt={image.name}/>
                                <p className="cardTitle">{image.name}</p>
                                <p>{image.price}</p>
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

export default TeesPage
