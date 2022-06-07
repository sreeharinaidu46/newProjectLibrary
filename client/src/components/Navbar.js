import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';


const Navbar = () => {
 
    const {currentUser} = useSelector(state => state.userLoginReducer) ;
    console.log(currentUser)
    return (
        <div >
           <nav className=" shadow   bg-white rounded navbar fixed-top navbar-white " style={{height:"95px"}}>
            <div className="container-fluid">
             <img src='https://www.mystudyindia.com/storage/colleges/logos/ofiqem_1620695585.webp' width="60px" height="60px" style={{padding:'0',margin:'0'}}></img>
               <h4 style={{textAlign:"center",marginLeft:"15%",display:"block",marginTop:'0px',paddingTop:'0px'}}>AMC Engineering College</h4>
               
                {/* <a className="navbar-brand" href="/dashboard" 
                style={{fontFamily:"oswald",fontSize:"30px",marginTop:"-4px"}}>Libary Management System</a> */}
                <p style={{textAlign:"center",marginRight:"10%",fontFamily:"sans-serif",fontSize:"24px"}}>
                <i className="far fa-user "></i> { " "}{ currentUser && currentUser.user.name.split(" ")[0]}</p>
            </div>
        
            <h5 style={{textAlign:"center",marginLeft:"40%",marginTop:'0px'}}>Library and Information Centre</h5>
          
            </nav> 
        </div>
    );
};

export default Navbar;