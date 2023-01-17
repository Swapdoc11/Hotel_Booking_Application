import { isObjectIdOrHexString } from 'mongoose'
import Hotel from '../model/hotels.js'
import Room from '../model/rooms.js'
import { createError } from '../util/error.js'
export const createHotel = async (req, res, next) => {
    try {
        if (!req.body.name) next(createError(401, 'Enter Name of Hotel'))
        const newHotel = new Hotel(req.body)
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch (error) {
        next(error)
    }
}
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error)
    }
}
export const deleteHotel = async (req, res, next) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedHotel)
    } catch (error) {
        next(error)
    }
}
export const getHotel = async (req, res, next) => {
    try {
        const gotHotel = await Hotel.findById(req.params.id)
        res.status(200).json(gotHotel)
    } catch (error) {
        next(error)

    }
}
export const getHotels = async (req, res, next) => {
    const { min, max, ...other } = req.query
    try {
        console.log(req.query);
        const allHotels = await Hotel.find({ ...other, chepestPrice: { $gt: min | 1, $lt: max || 999 } }).limit(req.query.limit)
        res.status(200).json(allHotels)
    } catch (error) {
        next(error)
    }
}
export const countByCity = async (req, res, next) => {

    try {
        const cities = req.query.cities.split(",")

        // const myCity = await Hotel.countDocuments({city:cities[1]})

        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))

        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}
export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "Hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "Apartment" })
        const villaCount = await Hotel.countDocuments({ type: "Villa" })
        const cabinCount = await Hotel.countDocuments({ type: "Cabin" })
        const resortCount = await Hotel.countDocuments({ type: "Resort" })
        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount },
            { type: "resort", count: resortCount }
        ])
    } catch (error) {
        next(error)
    }

}
export const getHotelRooms = async (req,res,next) => {
    try {
        const hotel =await Hotel.findById(req.params.id)
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room)
            })
        )
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}