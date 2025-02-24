

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAx } from '../Re/auth/userReducer.ts'
import { useNavigate } from 'react-router-dom'

function AuthRoute({ children }: { children: React.ReactNode }) {
   
   const {user} = useSelector((state:any)=>state.auth)
   const [nameUs,setNameUs] = useState()
   
   const navs = useNavigate()
   const dispatch = useDispatch()
    useEffect(()=>{
    dispatch(getAx()).then((res)=>{
        // setNameUs(res.payload.nama)
    }).catch((err)=>{
        return navs('/login')
    })
    },[])
    
    if(!user){
        return navs('/login')
    }
   return children
}

export default AuthRoute