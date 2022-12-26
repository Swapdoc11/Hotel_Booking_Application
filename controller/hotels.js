import Hotel from '../model/hotels.js'
import { createError } from '../util/error.js'
export const createHotel = async(req,res,next)=>{
     try {
        if(!req.body.name) next(createError(401,'Enter Name of Hotel'))
        const newHotel = new Hotel(req.body)
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch (error) {
        next(error)
    }
}
export const updateHotel = async(req,res,next)=>{
    try {
        const updatedHotel= await Hotel.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error)
    }
}
export const deleteHotel = async(req,res,next)=>{
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedHotel)
    } catch (error) {
        next(error)
    }
}
export const getHotel = async(req,res,next)=>{
    try {
        const gotHotel = await Hotel.findById(req.params.id)
        res.status(200).json(gotHotel)
    } catch (error) {
        next(error)

    }
}
export const getHotels = async(req,res,next)=>{
      
    try {
        const allHotels = await Hotel.find()
        res.status(200).json(allHotels)
    } catch (error) {
        next(error)
    }
}