//signup.jsx

import { useNavigate } from "react-router-dom";
import React, { useState,useRef } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc,collection } from "firebase/firestore";
import { db,auth } from "../../utils/firebaseConfiguration/firebase";
import Swal from "sweetalert2";
import "./sign-up.css";

const Signup = () => {
            const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const passRef = useRef(null)
    //signupHandler
    const signupHandler = async ()=>{
       if(!name &&!email && !password){
         Swal.fire({
          title: "Please enter your data for sign up!",
          icon: "warning",
        })

       }
       else{
         try{
            const saveUser = await createUserWithEmailAndPassword(auth,email,password)
            Swal.fire({
                 title: 'You have signed up Successfully!',
                 icon: 'success',
                 draggable: true,
               
                
               })
            console.log(saveUser)
            //creating an object for storing  in data base
            let obj = {
                id : saveUser?.user?.uid,
                name : name,
                email : email,
                password :password
            }
            // console.log('obj is created ',obj) 
            //storing obj in firebase/firestore
            if(saveUser){
                const saveUser = await addDoc(collection(db,'usersCollection'),obj)
                console.log('saveUser in firestore ',saveUser)
            }

        }
        catch(error){
            console.log(error)
        }
        //clear input
        setName('');
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
    <div className="signup-container">
      <div className="signup-card">

        <div className="logo">
          <div className="logo-circle"></div>
        </div>

        <h1>Create an account</h1>
        <div className="signup-form">

          <div className="input-group">
            <label>Name</label>
             <input type="text" placeholder="Enter your name" autoComplete="new-name" 
            onChange={(e)=>setName(e.target.value)} value={name}/>
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" autoComplete="new-email" 
            onChange={(e)=>setEmail(e.target.value)} value={email}/>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-box">
             <input type="password" placeholder="Create a password" autoComplete="new-password" 
            onChange={(e)=>setPassword(e.target.value)} value={password} ref={passRef}/>
              <span  onClick={passwordHandler}>👁</span>
            </div>
          </div>

          

          <button className="signup-btn" onClick={signupHandler}>
            Create Account
          </button>

          <p className="login-text">
            Already have an account?
            <Link to='/login' style={{textDecoration:'none'}}><span> login</span></Link>
            
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;