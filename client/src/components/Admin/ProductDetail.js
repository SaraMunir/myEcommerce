import React, {useEffect, useRef, useState} from 'react';
import { Link, useParams } from "react-router-dom";

function ProductDetail() {
    const { productId } = useParams();
    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );
    const[showModal, setShowModal]= useState(false);
    const[showModal2, setShowModal2]= useState(false);
    const [newColor, setNewColor]=useState({
        name: "", productId: productId
    })
    const [colorSizes, setColorSizes]=useState({
        colorId: '', xs: 100, s: 200, m:300, l:400, xl:500
    })
    const [ showHideBtnsArr, setShowHideBtnsArr]=useState([])
    const inputName = useRef();
    const [colours, setColours]=useState([])
    const [productDetail, setProductDetail] =useState({});
    const [myPic, setMyPic] = useState ('');
    const [pic, setPic] = useState ([]);
    const [uploadBtn, setUploadBtn] = useState ([]);
    // const [showForm2, setShowForm2] = useState( false );
    function handleInputChange( e ){
        const { id, value } = e.target; 
        setNewColor( { ...newColor, [id]: value } );
        }
    function handleSizeChange( e ){
        const { id, value } = e.target; 
        setColorSizes( { ...colorSizes, [id]: value } );
        }
    function setSizes(clrId){
        setColorSizes( { ...colorSizes, colorId: clrId } );
        setShowModal2(true)
    }
    async function loadProductDetail(){
        const fetchProduct = await fetch (`/api/productDetail/${productId}`).then( res => res.json());
        console.log('fetchProduct: ', fetchProduct);
        setProductDetail(fetchProduct)
        setTimeout(() => {
            loadColors()
        }, 300);

    }
    async function createColor(){
        if(newColor.name === ""){
            inputName.current.focus();
            setAlertMessage( { type: 'danger', message: 'Please Provide Name of the product!' } );
            return;
        }
        const apiResult = await fetch('/api/newColor', 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newColor)
            }).then( result=>result.json())
        console.log('apiResult: ', apiResult)
        setAlertMessage( { type: 'success', message: 'Color Successfully Created' } );
        loadProductDetail()
        loadColors() 
        setShowModal(false);
        setAlertMessage( { type: "", message: ""} );
        setNewColor({
            name: "", productId: productId
        })
    }
    async function addSizes(){
        const apiResult = await fetch('/api/colorSizes', 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(colorSizes)
            }).then( result=>result.json());
            setColorSizes({colorId: '', xs: 100, s: 100, m:100, l:100, xl:100});
            setShowModal2(false);
            loadColors()
            loadProductDetail()
    }
    async function AddPictures(){
        console.log('add pictures')
    }
    async function loadColors(){
        const fetchColor = await fetch (`/api/getColors/${productId}`).then( res => res.json());
        // delete below later
        let pictureArr=[]
        // keep below
        let showBtnsArr = []

        console.log('fetchColor: ', fetchColor);
        setColours(fetchColor)
        fetchColor.map((color,idx)=>{
            console.log("color: ", color )
            console.log("idx: ", idx )
            showBtnsArr.push({[idx]: false})
            let colorObj = ''
            pictureArr.push(colorObj)
        })
        console.log("pictureArr: ", pictureArr)
        console.log("showBtnsArr: ", showBtnsArr)
        // console.log("pictureArr: ", pictureArr[1].idx);
        setShowHideBtnsArr(showBtnsArr)
        setPic(pictureArr);
        setUploadBtn(pictureArr)
    }
    function checkBtnsArr(){
        console.log('checking showHideBtnsArr: ', showHideBtnsArr)
    }
    //   upload
    // function handleChange(e){
    //     const file = e.target.files[0];
    //     setMyPic(file)
    // }
    const handleChange = (idx, value) => e =>{
        console.log('value', value)
        console.log('idx', idx)
        let picArr2 = pic
        console.log('picArr2', picArr2)
        const file = e.target.files[0];
        let picArr = uploadBtn
        picArr[idx] = file;
        console.log('picArr: ', picArr)
        setUploadBtn(picArr)
        let newArr = showHideBtnsArr
        newArr.map((arr,idx2)=>{
            if(idx2 === parseInt(idx)){
                arr[idx2] = value
            }
        })
        setShowHideBtnsArr(newArr)
        // setMyPic(file)
    }
    const handleChangeThmb = idx => e =>{
        console.log('whats hapening?')
        const file = e.target.files[0];
        let picArr = pic
        picArr[idx] = file
        console.log('picArr: ', picArr[idx])
        console.log('idx: ', idx)
        setPic(picArr)
    }

    async function handleUpload(colorId, idx){
        if(myPic){
            let myForm = document.getElementById(`myForm${idx}`);
            let formData = new FormData(myForm);
            const uploadPic = await fetch(`/api/uploadImages/${colorId}`, 
                {
                    method: 'PUT',
                    body: formData
                }
            ).then( result=>result.json())}
            loadColors();
            setMyPic('')
    }
    async function handleThmbUpload(colorId, idx){
        console.log("pic: ", pic)
        if(pic[idx]){
            let myForm = document.getElementById(`myThmbForm${idx}`);
            let formData = new FormData(myForm);
            const uploadPic = await fetch(`/api/uploadThmbImage/${colorId}`, 
                {
                    method: 'PUT',
                    body: formData
                }
            ).then( result=>result.json())}

            loadColors();
    }
    async function deleteImg(indx, colorId, img){
        let imgObj = {
            indexNo: indx,
            colorId: colorId,
            img: img,
        }
        const deleteOldPIc = await fetch(`/api/deleteImage`, 
        {   method: 'post',
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(imgObj)
        }).then( result=>result.json());
        loadColors()
    }
    async function deleteThmbImg(colorId, img){
        let imgThmbObj = {
            colorId: colorId,
            img: img,
        }
        const deleteOldPIc = await fetch(`/api/deleteThmbImage`, 
        {   method: 'post',
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(imgThmbObj)
        }).then( result=>result.json());
        loadColors()
    }
    useEffect(function(){
        loadProductDetail()
    },[])
    return (
        <div className="text-left">
            {showModal=== false ?"":
                <div className="myModal">
                    <div className="card col-lg-8 mx-auto mt-5">
                        <div className="card-body col-lg-12 mx-auto text-left">
                            <form>
                                <div className="d-flex justify-content-end">
                                    <div className="form-group">
                                        <div className="smallBtn text-center" onClick={()=>setShowModal(false)}><i className="fas fa-times"></i></div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="form-group col-12">
                                        <label for="name">Name Of The Color</label>
                                        <input className="form-control" type="text" placeholder="Color Name"
                                        ref={inputName}
                                        onChange={handleInputChange}
                                        id="name" value={newColor.name}/>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start mt-4">
                                    <div className="form-group col-12">
                                        <div className={ alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide' } role="alert">{alertMessage.message}</div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start mt-2">
                                    <div className="form-group col-12">
                                        <div className="smallBtn col-3 text-center" onClick={createColor}>Create Color</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
            {showModal2=== false ?"":
                <div className="myModal">
                    <div className="card col-lg-8 mx-auto mt-5">
                        <div className="card-body col-lg-12 mx-auto text-left">
                            <form>
                                <div className="d-flex justify-content-end">
                                    <div className="form-group">
                                        <div className="smallBtn text-center" onClick={()=>setShowModal2(false)}><i className="fas fa-times"></i></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 form-group d-flex">
                                        <label className="pt-2 col-4 text-right" for="name">XS</label>
                                        <input className="ml-2 col-8 form-control" type="number" placeholder=""
                                        onChange={handleSizeChange}
                                        id="xs" value={colorSizes.xs}/>
                                    </div>
                                    <div className="col-md-4 form-group d-flex">
                                        <label className="pt-2 col-4 text-right" for="name">S</label>
                                        <input className="ml-2 col-8 form-control" type="number" placeholder=""
                                        onChange={handleSizeChange}
                                        id="s" value={colorSizes.s}/>
                                    </div>
                                    <div className="col-md-4 form-group d-flex">
                                        <label className="pt-2 col-4 text-right" for="name">M</label>
                                        <input className="ml-2 col-8 form-control" type="number" placeholder=""
                                        onChange={handleSizeChange}
                                        id="m" value={colorSizes.m}/>
                                    </div>
                                    <div className="col-md-4 form-group d-flex">
                                        <label className="pt-2 col-4 text-right" for="name">L</label>
                                        <input className="ml-2 col-8 form-control" type="number" placeholder=""
                                        onChange={handleSizeChange}
                                        id="l" value={colorSizes.l}/>
                                    </div>
                                    <div className="col-md-4 form-group d-flex">
                                        <label className="pt-2 col-4 text-right" for="name">XL</label>
                                        <input className="ml-2 col-8 form-control" type="number" placeholder=""
                                        onChange={handleSizeChange}
                                        id="xl" value={colorSizes.xl}/>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start mt-4">
                                    <div className="form-group col-12">
                                        <div className={ alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide' } role="alert">{alertMessage.message}</div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start mt-2">
                                    <div className="form-group col-12">
                                        <div className="smallBtn col-3 text-center" onClick={addSizes}>Add Size</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
            <div className="row">
                <img className="col-md-3" src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png" alt="product image"/>
                <div className="col-md-9 border">
                    <div className="col-md-7 justify-content-between d-flex">
                        <p style={{fontWeight:"bold"}}>Name: </p>
                        <p>{productDetail.name}</p>
                        <i class="fas fa-edit"></i>
                    </div>
                    <div className="col-md-7 justify-content-between d-flex">
                        <p style={{fontWeight:"bold"}}>Price: </p>
                        <p>{productDetail.price}</p>
                        <i class="fas fa-edit"></i>
                    </div>
                    <div className="col-md-7 justify-content-between d-flex">
                        <p style={{fontWeight:"bold"}}>Category: </p>
                        <p>{productDetail.category}</p>
                        <i class="fas fa-edit"></i>
                    </div>
                </div>
            </div>
            <div>
                <h4>Colours</h4>
                <div>
                    <div className="text-center smallBtn col-lg-2" onClick={()=>setShowModal(true)}>
                        Add Colours
                    </div>
                    <div className="">
                        {colours.length>0 ? 
                        colours.map((color,idx)=>
                            <div className="card col-md-10" key={`color_${idx}`}>
                                <div className="card-body">
                                    <h3>{color.name}</h3>
                                    <hr/>
                                    <h5>Sizes</h5>
                                    {color.sizes.length>0?
                                    '':
                                    <div className="smallBtn col-8 text-center" onClick={()=>setSizes(color._id)}>Set Sizes</div>
                                }
                                    <div>
                                        <div className="d-flex justify-content-between">
                                            <p className="col-5">size</p>
                                            <p className="col-5">Qty</p>
                                            <p className="col-2"></p>
                                        </div>
                                        {color.sizes.map(size=>
                                            <div className="d-flex justify-content-between">
                                                <p className="col-5">{size.size}</p>
                                                <p className="col-5">{size.qty}</p>
                                                <p className="col-2"><i class="fas fa-edit"></i></p>
                                            </div>
                                        )}
                                    </div>
                                    <hr/>
                                    <div>
                                        <h5>Thumbnail Picture</h5>
                                        {color.thumbImg ?
                                        ''
                                        :<div className="row">
                                        <form className=" col-10 input-group mb-3" id={`myThmbForm${idx}`} role="form" encType="multipart/form-data" >
                                            <div className="custom-file">
                                                <input 
                                                type="file" 
                                                name="myFile" className="custom-file-input" 
                                                onChange={handleChangeThmb(idx)}/>
                                                <label className="custom-file-label" for="inputGroupFile02" onChange={handleChangeThmb(idx)}>Choose file</label>
                                            </div>
                                        </form>
                                        <div className="col-2">
                                        {pic[idx]==''?'':
                                        <div className="smallBtn text-center" onClick={()=>handleThmbUpload(color._id, idx)}>Upload</div>
                                        }
                                        </div>
                                    </div>
                                    }
                                    {color.thumbImg ? 
                                        <div className="col-3" style={{position:'relative'}}>
                                            <img className="col-12" src={color.thumbImg} alt="color swatches"/>
                                            <i class="deleteBtn2 fas fa-times-circle" onClick={()=>deleteThmbImg(color._id, color.thumbImg)}></i>
                                        </div>:''}
                                    </div>
                                    <hr/>
                                    <div>
                                        <h5>Pictures</h5>
                                        <div className="row">
                                            <form className=" col-10 input-group mb-3" id={`myForm${idx}`} role="form" encType="multipart/form-data" >
                                                <div className="custom-file">
                                                    <input 
                                                    type="file" 
                                                    name="myFile" className="custom-file-input" 
                                                    onChange={handleChange(idx, true)}/>
                                                    <label className="custom-file-label" for="inputGroupFile02" onChange={handleChange(idx, true)}>Choose file</label>
                                                </div>
                                            </form>
                                            {/* <div className="col-2">
                                                {uploadBtn[idx]===''?'':
                                                <div className="smallBtn text-center" onClick={()=>handleUpload(color._id, idx)}>Upload</div>
                                                }
                                            </div> */}
                                            <div className="col-2">
                                                {
                                                    showHideBtnsArr.length<1 ?'':
                                                    showHideBtnsArr[idx][idx] === true ? `${showHideBtnsArr[idx][idx]} yes buttn` : `${showHideBtnsArr[idx][idx]} no buttn`
                                                }
                                            </div>
                                            <div className="smallBtn" onClick={checkBtnsArr}>check</div>
                                        </div>
                                        <div className="row">
                                            {
                                            color.imgSrc.map((img, indx)=>
                                                <div className="col-2"  style={{position:'relative'}}>
                                                    <img src={img} alt=""/>
                                                    <i class="deleteBtn2 fas fa-times-circle" onClick={()=>deleteImg(indx, color._id, img)}></i>
                                                </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        : "no colors added yet"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
