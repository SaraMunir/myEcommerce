import React, {useState, useRef, useEffect} from 'react'
import { Link, useLocation } from "react-router-dom";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import WomenDressPro from './WomenProducts/WomenDressPro';
// import WomenTeesPro from './WomenProducts/WomenTeesPro';
// import WomenJacketsPro from './WomenProducts/WomenJacketsPro';
// import WomenMenu from './WomenProducts/WomenMenu';

function AddWomenProduct() {
    const[showModal, setShowModal]= useState(false);
    const[products, setProducst]= useState([]);
    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );

    const [newProduct, setNewProduct]=useState({
        typeOf: "Women", category: "", name: "", price: 0
    })
    const inputCategory = useRef();
    const inputName = useRef();
    function handleInputChange( e ){
        const { id, value } = e.target; 
        setNewProduct( { ...newProduct, [id]: value } );
        }
    async function createProduct(){
        if(newProduct.name === ""){
            inputName.current.focus();
            setAlertMessage( { type: 'danger', message: 'Please Provide Name of the product!' } );
            return;
        }
        if(newProduct.category === ""){
            inputCategory.current.focus();
            setAlertMessage( { type: 'danger', message: 'Please Select Category!' } );
            return;
        }
        const apiResult = await fetch('/api/newProduct', 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            }).then( result=>result.json())
        console.log('apiResult: ', apiResult)
        setAlertMessage( { type: 'success', message: 'Product Successfully Created' } );
        loadProducts()
        setShowModal(false);
        setNewProduct({
            typeOf: "Women", category: "", name: "", price: 0
        })
    }
    async function loadProducts(){
        const fetchProducts = await fetch (`/api/laodProducts/Women`).then( res => res.json());
        console.log('Products: ', fetchProducts)
        setProducst(fetchProducts)
    }
    useEffect(function(){
        loadProducts();
    },[])
    return (
        <div>
            <div>
                {/* <Router>
                    <WomenMenu/>
                    <Route path="/AddProduct/Women/Dress" component={WomenDressPro}/>
                    <Route path="/AddProduct/Women/Tees" component={WomenTeesPro}/>
                    <Route path="/AddProduct/Women/Jackets" component={WomenJacketsPro}/>
                </Router> */}

            </div>
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
                                        <label for="name">Name Of The Product</label>
                                        <input className="form-control" type="text" placeholder="Product Name"
                                        ref={inputName}
                                        onChange={handleInputChange}
                                        id="name" value={newProduct.name}/>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <div className="col-8">
                                        <label for="category">Select Category</label>
                                        <select 
                                            id="category" className="form-control" value={newProduct.category} 
                                            ref={inputCategory}
                                            onChange={handleInputChange} >
                                                <option defaultValue ="">Choose...</option>
                                                <option value="Dress">Dress</option>
                                                <option value="Tees">Tees</option>
                                                <option value="Jacket">Jacket</option>
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <label for="price">Price Of The Product</label>
                                        <input className="form-control" type="number" placeholder="Product Price" 
                                        onChange={handleInputChange}
                                        id="price" value={newProduct.price}/>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start mt-4">
                                    <div className="form-group col-12">
                                        <div className={ alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide' } role="alert">{alertMessage.message}</div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start mt-2">
                                    <div className="form-group col-12">
                                        <div className="smallBtn col-3 text-center" onClick={createProduct}>Create Product</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
            <div className="d-flex justify-content-between">
                <h4>Products</h4>
                <div className="smallBtn" onClick={()=>setShowModal(true)}><i className="fas fa-plus"></i> Add Product</div>
            </div>
            <div className="card col-lg-12">
                <div className="card-body text-left">
                    <div className="d-flex justify-content-between">
                        <select class="form-select smallBtn" aria-label="Default select example">
                            <option defaultValue="">All Products</option>
                            <option value="Dress">Dress</option>
                            <option value="Tees">Tees</option>
                            <option value="Jacket">Jacket</option>
                        </select>
                    </div>
                        <li class="list-group-item d-flex  list-group-item-light">
                            <div className="col-1">image</div>
                            <div className="col-4">name</div>
                            <div className="col-2">category</div>
                            <div className="col-3">price</div>
                            <div className="col-2">detail</div>
                        </li>
                    {products.map(product=>
                        <li class="list-group-item d-flex">
                            <div className="col-1">
                                <img className="productThmbImg" src="https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png" alt=""/></div>
                            <div className="col-4">{product.name}</div>
                            <div className="col-2">{product.category}</div>
                            <div className="col-3">{product.price}</div>
                            <div className="col-2">
                                <Link to={`/AddProduct/Women/${product._id}`}>
                                    <i class="editBtn fas fa-edit"></i>
                                </Link>
                            </div>
                        </li>
                        )}
                </div>
            </div>
        </div>
    )
}

export default AddWomenProduct
