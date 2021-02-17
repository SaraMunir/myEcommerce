import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function ProductDetail() {
    const { productId } = useParams();
    const { category } = useParams();
    const [ productDetail, setProductDetail ]= useState({});    
    const [ warningCard, setWarningCard ]= useState({ show: false, message: ""});
    const [ shoppingCart, setShoppingCart ]= useState(localStorage.shoppingCart);
    const [ colorArr, setColorArr ]= useState([]);
    const [ stars, setStars ]= useState([]);
    const [ bigPic, setBigPic]= useState('');
    const [ currentSize, setCurrentSize]= useState("");
    const [ currentColor, setCurrentColor]= useState("");
    const [selectedObj, setSelectedObj]= useState({
        "typeOf": "Women",
        "category": `${category}`,
        "id":`${productId}`,
        "productName": "",
        "productColor": "",
        "productColorId": "",
        "size": '',
        "price": '',
        "mainImg": '',
        "quantity": 1,
    });
    const [defaultProd, setDefaultProd]= useState({})
    const [productSizes, setProductSizes]= useState([]);
    let starsArr = []
    async function loadProductDetail(){
        const apiTees = await fetch(`/api/Men/${category}`).then( result=>result.json() );
        apiTees.forEach(product=>{
            if(product.id === productId){
                setColorArr(product.colours);
                let i;
                for (i = 0; i < product.rating; i++) {
                starsArr.push('add')
                }
                setDefaultProd(product.colours[0]);
                setCurrentColor(product.colours[0].id)
                setProductSizes(product.colours[0].sizes)
                setProductDetail(product);
                setBigPic(product.mainImg);
                setStars(starsArr);
                setSelectedObj({...selectedObj, "productName": `${product.name}`,"price": `${product.price}`,"productColor": `${product.colours[0].name}`,"mainImg": `${product.colours[0].mainImg}`, "productColorId": `${product.colours[0].id}`});
            }
        })
    }
    function selectMainImg(src){
        setBigPic(src);
    }
    function selectSize(size){
        setCurrentSize(size);
        setSelectedObj({...selectedObj, "size": `${size.size}`})
    }
    function selectColor(colorObj,src){
        console.log('selected colorObj: ', colorObj)
        setDefaultProd(colorObj);
        setProductSizes(colorObj.sizes)
        setCurrentColor(colorObj.id);
        setCurrentSize("")
        setBigPic(src);
        setSelectedObj({...selectedObj, "productColor": `${colorObj.name}`, "productColorId": `${colorObj.id}`,"size": "","mainImg": `${colorObj.mainImg}`,
    })
    }
    function addToCart(){
        if(selectedObj.productColor ===''){
            setWarningCard({ show: true, message: "Please select a Color before adding to Cart."})
            return;
        }
        if(selectedObj.size ===''){
            setWarningCard({ show: true, message: "Please select a Size before adding to Cart."})
            return;
        }
        setWarningCard({ show: false, message: ""});
        console.log('selectedObj: ', selectedObj)
        if(shoppingCart === undefined){
            let shoppngArr = [];
            shoppngArr.push(selectedObj)
            localStorage.setItem("shoppingCart",JSON.stringify(shoppngArr));
        }else{
            console.log('shopping cart: ', JSON.parse(shoppingCart))
            let shoppngArr = JSON.parse(shoppingCart);
            let itemExists = false;
            shoppngArr.map(item=>{
                if(selectedObj.productColorId===item.productColorId && selectedObj.size===item.size){
                    console.log('selectedObj.productColorId: ', selectedObj.productColorId)
                    console.log('shopping cart item .productColorId: ', item.productColorId)
                    console.log('this item exists in the shopping cart so add one')
                    if(item.quantity > 5 || item.quantity === 5){
                        console.log('this item exceeds the number 5')
                        setWarningCard({ show: true, message: "Sorry you can not purchase  more than 5 of the same item at the same time."})
                        return;
                    } else{
                        itemExists = true;
                        item.quantity = item.quantity + 1
                    }
                }
            })
            if(itemExists === true){
                console.log('shoppngArr new arr: ', shoppngArr);
                localStorage.setItem("shoppingCart",JSON.stringify(shoppngArr));
                document.location.reload(true);
            }else{
                shoppngArr.push(selectedObj);
                localStorage.setItem("shoppingCart",JSON.stringify(shoppngArr));
                document.location.reload(true);

            }
        }
    }
    useEffect( function(){
        loadProductDetail();
    }, [] );
    return (
        <div className="row container-fluid">
            <div className="col-md-6 row">
                <div className="col-md-2 Thumbssect">
                    {colorArr.map(col=>
                        <div className="">
                            {col.imgSrc.map(img=>
                                <img className="imgThmb" src={img} alt="" onClick={()=>selectMainImg(img)}/>
                            )}
                        </div>
                    )}
                </div>
                <img className="col-md-10" style={{objectFit: 'contain'}} src={bigPic} alt=""/>
            </div>
            <div className="col-md-6 text-left">
                <h3 className="productName">{productDetail.name}</h3>
                <div className="d-flex justify-content-between">
                    <p className="priceTag">CA${productDetail.price}</p>
                    <div>
                        {stars.map(star=><i class="far fa-star"></i>)}
                    </div>
                </div>
                <div className="mt-3">
                    <p><span style={{fontWeight: 'bolder'}}>Color:</span> {defaultProd.name}</p>
                    <div className="d-flex">
                        {colorArr.map(col=>
                            <div>
                                <img className={currentColor===col.id ? "colorSwatchesActive":"colorSwatches2"} src={col.thumbnail} alt="" onClick={()=>selectColor(col,col.mainImg)}/>
                            </div>
                        )}
                    </div>
                </div>
                <div className="sizes d-flex mt-3">
                    {productSizes.map(size=>
                        size.qty===0 ? <p className="sizeTxtNot">{size.size}</p> : <p className={size.size === currentSize.size  ? "sizeTxtActive" : "sizeTxt"} onClick={()=>selectSize(size)}>{size.size}</p>
                    )}
                </div>
                {warningCard.show === true ?
                <div className="warningCard col-8">
                    <p className="m-0 p-2">{warningCard.message}</p>
                </div> : ''
                }
                <div className="mySqrBtn text-center mt-3" style={{width: '60%'}} onClick={()=>addToCart()}>
                    Add To Cart
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
