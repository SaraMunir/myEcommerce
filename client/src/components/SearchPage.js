import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function SearchPage() {
    const { searchInput } = useParams();
    async function loadSearchInput(){
        let doesTypeExist = false;
        let newTypeResult=[]
        let newCAtResult=[]
        console.log('searchInput useparams:: ', searchInput)
        const apiResult = await fetch(`/api/loadAll`).then( result=>result.json() );
        console.log('apiResult: ', apiResult)
        var searchArr = searchInput.split(" ");
        searchArr.map(searchItem=>{
            let searchItemLow = searchItem.toLowerCase();
            apiResult.map(item=>{
                let lowerTypeItem = item.typeOf.toLowerCase()
                // console.log("searchItemLow", searchItemLow)
                // console.log("lowerTypeItem", lowerTypeItem)
                if(searchItemLow===lowerTypeItem){
                    doesTypeExist=true;
                }
            })
        })
        if(doesTypeExist===true){
            searchArr.map(searchItem=>{
                let searchItemLow = searchItem.toLowerCase();
                apiResult.map(item=>{
                    let lowerTypeItem = item.typeOf.toLowerCase()
                    let lowerCatItem = item.category.toLowerCase()
                    if(searchItemLow===lowerTypeItem){
                        newTypeResult.push(item);
                    }
                    if(searchItemLow===lowerCatItem){
                        newCAtResult=true;
                    }
                })
            })
        }else{
            // newTypeResult
        }
        console.log('newTypeResult: ', newTypeResult)
            // let newTypeResult2 = apiResult.filter(item=>
            //     searchItemLow === item.typeOf.toLowerCase()
            //     )
            //     newTypeResult=newTypeResult2;
    }
    useEffect( function(){
        loadSearchInput();
    }, [] );
    return (
        <div>
            searchpage
        </div>
    )
}

export default SearchPage
