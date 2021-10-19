import React, { useState, useRef, useEffect} from 'react';
import { Redirect } from 'react-router-dom';

function DeveloperSetup() {
    const inputPassword = useRef();
    const inputEmail = useRef();
    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );
    const [ adminData, setAdminData ] = useState({ adminName: "", adminEmail: "", password: ""});
    async function handleInputChange( e ){
        const { id, value } = e.target;
        setAdminData( { ...adminData, [id]: value });
    }
    const [adminInfo, setAdminInfo] = useState({})
    const [adminSet, setAdminSet] = useState(false)
    async function loadAdminInfo(){
        // setLoading(true)
        const fetchAdmin = await fetch (`/api/AdminInfo`).then( res => res.json());
        console.log('fetched Admin: ', fetchAdmin);
        if(fetchAdmin === null){
            console.log('theres is no admin set up');
            setAdminSet(false)
        }else{
            setAdminInfo(fetchAdmin)
            setAdminSet(true)
        }
    }
    async function signUpUser( e ){
        // setLoading(true)
        console.log('signing up adminData: ', adminData)
        let checkEmailExist = false;
        // emails.map(email=>
        //     {if(adminData.email == email){
        //         checkEmailExist = true;
        //         setLoading(false)
        //     } })
            e.preventDefault();
        if( adminData.adminEmail === "" ) {
            inputEmail.current.focus();
            setAlertMessage( { type: 'danger', message: 'Please provide your Email!' } );
            return;
        }
        if( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(adminData.adminEmail)) ) {
            inputEmail.current.focus();
            setAlertMessage( { type: 'danger', message: 'Please provide a valid Email!' } );
            return;
        }
        if( adminData.password === "" ) {
            inputPassword.current.focus();
            setAlertMessage( { type: 'danger', message: 'Please provide a password!' } );
            return;
        }
        if( adminData.password.length < 8 ) {
            inputPassword.current.focus();
            setAlertMessage( { type: 'danger', message: 'Please provide a longer password (8 characters min)!' } );
            return;
        } 
        // if ( checkEmailExist == true ){
        //     inputEmail.current.focus();
        //     setAlertMessage( { type: 'danger', message: 'Email address already exist, please provide a different email address!' } );
        //     setLoading(false)
        //     return;
        // }
        localStorage.clear();
        // setLoading(true)
        const registerUser = await fetch('/api/user/signUp',
            {
                method: 'post', 
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( adminData )
            }).then( result=>result.json());
        if( registerUser.message ){
            setAlertMessage( {type:'success',
        message:'User successfully registered as Admin!'} );
        }else {
            setAlertMessage( { type: 'danger', message: 'Try again' } );
        }
        setAdminData({ name: "", email: "", password: ""});
        loadAdminInfo();
    }
    useEffect( function(){
        loadAdminInfo();
    }, [] );
    return (
        <div class="container-fluid text-left">
            <div className={ alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide' } role="alert">
                {alertMessage.message}
            </div>
            {adminSet === false ? 
            <div class="col-10 mx-auto card mt-4">
                <form class="card-body ">
                    <h3>Set Up Admin: </h3>
                    <div class="form-group">
                        <label for="name">Admin Full Name</label>
                        <input 
                        value={adminData.adminName}
                        onChange={handleInputChange}
                        id="adminName"
                        type="text"
                        class="form-control" aria-describedby="fullName" placeholder="Enter full name"/>
                    </div>
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input 
                        value={adminData.adminEmail} 
                        onChange={handleInputChange}
                        ref={inputEmail}
                        id="adminEmail" 
                        type="email" class="form-control" placeholder="Enter email"/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                        value={adminData.password} 
                        onChange={handleInputChange} 
                        ref={inputPassword}
                        id="password" 
                        type="password" class="form-control" placeholder="Password"/>
                    </div>
                    <button  onClick={signUpUser} type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            :
            ""}
            
            <div className="col-10 mx-auto mt-4 card">
                <div className="card-body">
                    <h3>Current Admin Info: </h3>
                    <hr/>
                    {
                        adminSet === false ? <h5>Admin has not been set up yet</h5>:
                    <div className="col-8">
                        <div className="col-12 d-flex justify-content-between">
                            <p style={{fontWeight: 'bolder'}}>Name: </p>
                            <p>{adminInfo.adminName} </p>
                            <p className="editBtn"><i className=" fas fa-edit"></i> </p>
                        </div>
                        <div className="col-12 d-flex justify-content-between">
                            <p style={{fontWeight: 'bolder'}}>Email: </p>
                            <p>{adminInfo.adminEmail} </p>
                            <p className="editBtn"><i className=" fas fa-edit"></i> </p>
                        </div>
                        <div className="col-12 d-flex justify-content-between">
                            <p style={{fontWeight: 'bolder'}}>Password: </p>
                            <p>********** </p>
                            <p className="editBtn"><i className=" fas fa-edit"></i> </p>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default DeveloperSetup
