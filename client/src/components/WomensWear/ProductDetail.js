import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function ProductDetail() {
    const { productId } = useParams();
    const [ productDetail, setProductDetail ]= useState({});
    const [ productDetailImages, setProductDetailImages ]= useState([]);
    const [ colorArr, setColorArr ]= useState([]);
    const [ stars, setStars ]= useState([]);
    const [bigPic, setBigPic]= useState('');
    let imageArr = []
    let starsArr = []
    async function loadProductDetail(){
        const apiTees = await fetch('/api/Tees/Women').then( result=>result.json() );
        apiTees.forEach(product=>{
            if(product.id === productId){
                console.log('this is product:',product)
                setColorArr(product.colours)
                product.colours.map(color=>{
                    console.log('the colors: ', color.imgSrc)
                    color.imgSrc.forEach(img=>{
                        console.log('images sources are: ', img)
                        imageArr.push(img);
                    })
                })
                let i;
                for (i = 0; i < product.rating; i++) {
                starsArr.push('add')
                }
                console.log('starsArr: ', starsArr)
                setProductDetailImages(imageArr)
                setProductDetail(product)
                setBigPic(product.detailImg)
                setStars(starsArr)
            }
        })
    }
    function selectMainImg(src){
        setBigPic(src)
    }

    useEffect( function(){
        loadProductDetail();
    }, [] );
    return (
        <div className="row container-fluid">
            {/* <img className="cardtImg" src={image.mainImg} alt={image.name}/> */}
            <div className="col-md-6 row">
                <div className="col-md-2">
                    {colorArr.map(col=>
                        <div className="">
                            {col.imgSrc.map(img=>
                                <img className="imgThmb" src={img} alt="" onClick={()=>selectMainImg(img)}/>
                            )}
                        </div>
                    )}

                </div>
                <img className="col-md-10" src={bigPic} alt=""/>
            </div>
            <div className="col-md-6 text-left">
                <h3 className="productName">{productDetail.name}</h3>
                <div>
                <p className="priceTag">{productDetail.price}</p>
                    {
                        stars.map(star=>
                            <i class="far fa-star"></i>
                            )
                    }
                </div>
                <div className="sizes d-flex mt-3">
                    <p className="sizeTxtActive">XS</p>
                    <p className="sizeTxt">S</p>
                    <p className="sizeTxt">M</p>
                    <p className="sizeTxt">L</p>
                    <p className="sizeTxt">XL</p>
                    <p className="sizeTxtActive">XXL</p>
                </div>
                <div className="mySqrBtn text-center mt-3" style={{width: '60%'}}>
                    Add To Cart
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
