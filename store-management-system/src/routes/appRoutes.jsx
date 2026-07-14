import React from "react";
import {Routes,Route} from 'react-router-dom';
import Home from "../../pages/home/home";
import About from "../../pages/about/about";
import Contact from "../../pages/contact/contact";
import LogIn from "../../pages/login/login";
import Signup from "../../pages/signup/signup";
import Profile from "../../pages/profilePage/profile";
import PublicRoutes from "./publicRoutes/publicRoutes";
import PrivateRoutes from "./privateRoutes/privateRoutes";
import UserDetailPage from "../../pages/userDetailPage/userDetailPage";
import getCookie from 'js-cookie';
import { Navigate } from "react-router-dom";

const AppRoutes = ()=>{
     let cookieVal = getCookie.get('myToken')
    return(
       <Routes>
        {/* PublicRoutes */}
        <Route element={<PublicRoutes/>}>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/signup" element={<Signup/>}/>
        </Route>
    {/* PrivateRoutes */}
       <Route element={<PrivateRoutes/>}>
         <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/userDetailPage/:uid" element={<UserDetailPage/>}/>
       </Route>

       {/* catch all routes */}
       <Route path="*"
      element={
        cookieVal ? <Navigate to='/' />:<Navigate to='/login'/>
        
      }
       >

       </Route>
       
       </Routes>
    )
}
export default AppRoutes;