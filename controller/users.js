import User from '../model/users.js'
import { createError } from '../util/error.js'

export const updateUser = async(req,res,next)=>{
    try {
        if(!req.params.id) next(createError(401,"Please Provide id of user"))
        const updateUser= await User.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
        res.status(200).json(updateUser)
    } catch (error) {
        next(error)
    }
}
export const deleteUser = async(req,res,next)=>{
    try {
        if(!req.params.id) next(createError(401,"Please Provide id of user"))
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        if(!deleteUser) next(createError(401,"User Not Found"))
        res.status(200).json(deleteUser)
    } catch (error) {
        next(error)
    }
}
export const getUser = async(req,res,next)=>{
    try {
        if(!req.params.id) next(createError(401,"Please Provide id of user"))
        const getUser = await User.findById(req.params.id)
        if(!getUser) next(createError(401,"User Not Found"))
        const {isAdmin,password,...otherDetails} = getUser._doc
        res.status(200).json(otherDetails)
    } catch (error) {
        next(error)

    }
}
export const getUsers = async(req,res,next)=>{
      
    try {
       
        const allUsers = await User.find()
        if(!allUsers) next(createError(401,"No Users Left"))
        const {isAdmin,password,...otherDetails} = allUsers._doc
        res.status(200).json(otherDetails)

    } catch (error) {
        next(error)
    }
}