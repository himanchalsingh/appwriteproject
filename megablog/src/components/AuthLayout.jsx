import React, { useEffect, useState } from 'react'
import {useSelector, userSelector} from 'react-redux'
import {useNavigate} from 'reat-router-dom'
export function Protected({children,authentication=true}) {
  
   const navigate =useNavigate()
   const [loader ,setLoader] =useState(true)
   const authStatus =useSelector(state =>state.auth.status)

   useEffect(()=>{

    //makit more easy
    if(authentication && authStatus !==authentication){
        navigate('/login')
    }
    else if(!authentication && authStatus!== authentication){
        navigate("/")
    }
    setLoader(false)
   },[authStatus,navigate,authentication])
    return loader?<h1>loading...</h1>:<>{children}</>
}


