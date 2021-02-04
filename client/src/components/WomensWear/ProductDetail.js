import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function ProductDetail() {
    const { productId } = useParams();
    const { category } = useParams();
    const [ productDetail, setProductDetail ]= useState({});
    const [ sizes, setSizes ]= useState([
        {
            "sizeN": "XS"
        },
        {
            "sizeN": "S"
        },
        {
            "sizeN": "M"
        },
        {
            "sizeN": "L"
        },
        {
            "sizeN": "XL"
        },
        {
            "sizeN": "XXL"
        },
    ]);

    const [ warningCard, setWarningCard ]= useState({ show: false, message: ""});
    const [ colorArr, setColorArr ]= useState([]);
    const [ stars, setStars ]= useState([]);
    const [ bigPic, setBigPic]= useState('');
    const [ currentSize, setCurrentSize]= useState("XS");
    const [selectedObj, setSelectedObj]= useState({
        "type": "Women",
        "category": `${category}`,
        "id":`${productId}`,
        "productName": "",
        "productColor": "",
        "size": '',
        "price": '',
        "mainImg": '',
        "quantity": 1,
    });
    let starsArr = []
    async function loadProductDetail(){
        const apiTees = await fetch(`/api/Women/${category}`).then( result=>result.json() );
        apiTees.forEach(product=>{
            if(product.id === productId){
                setColorArr(product.colours);
                let i;
                for (i = 0; i < product.rating; i++) {
                starsArr.push('add')
                }
                setProductDetail(product);
                setBigPic(product.mainImg);
                setStars(starsArr);
                setSelectedObj({...selectedObj, "productName": `${product.name}`,"price": `${product.price}`,"mainImg": `${product.mainImg}`})

            }
        })
    }
    function selectMainImg(src){
        setBigPic(src);
    }
    function selectSize(size, idx){
        setCurrentSize(size);
        setSelectedObj({...selectedObj, "size": `${size.sizeN}`})
    }
    // col.mainImg, col.name, col.id
    function selectColor(src, colorName, colorId){
        setBigPic(src);
        setSelectedObj({...selectedObj, "productColor": `${colorName}`})
    }
    function addToCart(){
        if(selectedObj.productColor ===''){
            setWarningCard({ show: true, message: "Please select a color before adding to Cart."})
            return;
        }
        if(selectedObj.size ===''){
            setWarningCard({ show: true, message: "Please select a size before adding to Cart."})
            return;
        }
        setWarningCard({ show: false, message: ""});
        console.log('selectedObj: ', selectedObj)
    }
    useEffect( function(){
        loadProductDetail();
    }, [] );
    return (
        <div className="row container-fluid">
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
                <p className="priceTag">CA${productDetail.price}</p>
                    {
                        stars.map(star=>
                            <i class="far fa-star"></i>
                            )
                    }
                </div>
                <div className="d-flex mt-3">
                    {colorArr.map(col=>
                        <div>
                            <img className="colorSwatches2" src={col.thumbnail} alt="" onClick={()=>selectColor(col.mainImg, col.name, col.id)}/>
                        </div>
                    )}
                </div>
                <div className="sizes d-flex mt-3">
                    {sizes.map((size, idx)=>
                        <p className={size.sizeN === currentSize.sizeN  ? "sizeTxtActive" : "sizeTxt"} onClick={()=>selectSize(size,idx)}>{size.sizeN}</p>
                    )}
                </div>
                {warningCard.show === true ?
                <div className="warningCard col-8">
                    <p className="m-0 p-2">{warningCard.message}</p>
                </div> : ''
                }
                {/* <div className={ alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide' } role="alert">{alertMessage.message}</div> */}
                <div className="mySqrBtn text-center mt-3" style={{width: '60%'}} onClick={()=>addToCart()}>
                    Add To Cart
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
