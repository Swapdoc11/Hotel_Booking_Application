
import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

export const Login = () => {
    const [credential,setCredential] = useState({
        username:undefined,
        password:undefined
    })
    const {loading, error, dispatch} = useContext(AuthContext)
    const handleChange = (e) =>{
        setCredential((prev)=>({...prev,[e.target.id]:e.target.value}))
    }
    const handleClick = async(e)=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try {
            const res = await axios.post("/auth/login",credential)
            dispatch({type:"LOGIN_SUCCESS",payload:res.data})
        } catch (err) {
            
            dispatch({type:"LOGIN_FAILURE",payload:err.response.data})
        }
    }
    return (
        <>
        <div className='login'>
            <div className='lContainer'>
                
            <input type="text" placeholder='Username' id="username" onChange={handleChange} className="linput" />
            <input type="password" placeholder='Passoword' id="password" onChange={handleChange} className="linput" />
            <button className="lbutton" onClick={handleClick}>Login</button>
            {error && <span>{error.Error }</span>}
            </div>
        </div>
            
        </>
  )
}
