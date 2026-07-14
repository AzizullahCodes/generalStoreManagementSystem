import React from 'react'
import getCookie from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const PublicRoutes = () => {
    let cookieVal = getCookie.get('myToken')
  return (
    cookieVal ?  <Navigate to='/' />: <Outlet/> 
  )
}

export default PublicRoutes