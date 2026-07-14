//login.jsx
import React, { useRef, useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../utils/firebaseConfiguration/firebase";
import setCookie from 'js-cookie';
import Swal from "sweetalert2";
import "./login.css";

const LogIn = () => {
      
            const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
            const passRef = useRef(null)

    const navigation = useNavigate()
    //signupHandler
    const loginHandler = async ()=>{
        if(!email && !password){
           Swal.fire({
  title: "Please enter your login email and password!",
  icon: "warning",
})
return;
        }
        else{
          try{
            const saveUser = await signInWithEmailAndPassword(auth,email,password)
          Swal.fire({
      title: 'You have Logged In Successfully!',
      icon: 'success',
      draggable: true,
    
     
    })
            // console.log(saveUser)
            navigation('/')
            //get token
            const token = await saveUser?.user.getIdToken();
            // console.log(token) 
            //storing token in cookie
              
                setCookie.set('myToken',token,{expires: 3/24})

        }
        catch(error){
            console.log(error)
        }
        
        //clear input
        setEmail('');
        setPassword('')
        }
    }
  
    
  
//password handle funciton 
const passwordHandler = () => {
  if (passRef.current.type === "password") {
    passRef.current.type = "text"
  } else {
    passRef.current.type = "password"
  }
}
  return (
    <div className="login-container">
      <div className="login-card">

        <div className="logo">
          <div className="logo-circle"></div>
        </div>

        <h1>Welcome back</h1>
        <p className="subtitle">
          Enter your credentials to access your account.
        </p>
        <div className="login-form">

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
                          onChange={(e)=>setEmail(e.target.value)} value={email} autoComplete="new-email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="password-box">
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e)=>setPassword(e.target.value)} value={password} autoComplete="new-password"
            ref={passRef}
              />
              <span onClick={passwordHandler}>👁</span>
            </div>
          </div>

          <button className="login-btn" onClick={loginHandler}>
            Log in
          </button>

          <p className="signup-text">
            Don't have an account?
            <Link to='/signup' style={{textDecoration:'none'}}><span> Sign up</span></Link>
            
          </p>

        </div>

      </div>
    </div>
  );
};

export default LogIn;