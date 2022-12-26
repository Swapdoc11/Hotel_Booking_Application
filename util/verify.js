import { createError } from "./error.js"
import Jwt from "jsonwebtoken"
export const verifyToken = async(req,res,next) => {
    try {
        const token = req.cookies.access_token
        if(!token) next(createError(401,"not authencicated"))

        Jwt.verify(token,process.env.ACCESS,(err,info)=>{
            if(err) next(createError(401,"Token Not Valid or Expired"))

            req.info = info
            next()
        })
        
    } catch (error) {
        next(error)
    }
}
export const verifyUser = (req,res,next)=>{
    try {
        verifyToken(req,res,()=>{
            if(req.info.id === req.params.id || req.info.isAdmin)
            {
                next()
            }else{
                next(createError(401,"User Not Verified"))
            }
        })    
    } catch (error) {
        next(error)
    }
    
}
export const verifyAdmin = (req,res,next)=>{
    try {
        verifyToken(req,res,()=>{
           
            if(!req.info.isAdmin) next(createError(401,"Login Again"))
            req.info.isAdmin? next() : next(createError(401,"User not Admin"))
            
        })
    } catch (error) {
        
    }
}
