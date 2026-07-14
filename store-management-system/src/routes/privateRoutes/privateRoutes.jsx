import React from 'react'
import getCookie from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Navbar from '../../../components/navbar/navbar';

const PrivateRoutes = () => {
    let cookieVal = getCookie.get('myToken')
  return (
    cookieVal ?  <><Navbar/> <Outlet/></> : <Navigate to='/login'/> 
  )
}

export default PrivateRoutes