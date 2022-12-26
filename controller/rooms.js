import Room from "../model/rooms.js"
import Hotel from "../model/hotels.js"
import { createError } from "../util/error.js"
export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        } catch (error) {
            next(error)
        }
        res.status(200).json({ msg: "Room Created Successfully", savedRoom })
    } catch (error) {
        next(error)
    }
}
export const updateRoom = async (req, res, next) => {
    try {
        if (!req.params.id) next(createError(401, "Please Provide Id of room"))
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        if (!updateRoom) next(createError(401, "Room Not Found"))
        res.status(200).json({ msg: "Room updated Successfully", updateRoom })
    } catch (error) {
        next(error)
    }
}
export const deleteRoom = async (req, res, next) => {
    try {
        if (!req.params.id) next(createError(401, "Please Provide Id of room"))
        const deletedRoom = await Room.findByIdAndDelete(req.params.id)
        if (!deletedRoom) next(createError(401, "Room Not Found"))

        const removeRoomFromHotel = await Hotel.findByIdAndUpdate(req.params.hotelId, { $pull: { rooms: deletedRoom._id } }, { new: true })

        res.status(200).json({ msg: "Room Successfully Deleted", room: removeRoomFromHotel })
    } catch (error) {
        next(error)
    }
}
export const getRoom = async (req, res, next) => {
    try {
        if (!req.params.id) next(createError(401, "Please Provide Id of room"))
        const gotRoom = await Room.findById(req.params.id)
        if (!gotRoom) next(createError(401, "Room Not Found"))
        res.status(200).json(gotRoom)
    } catch (error) {
        next(error)
    }
}
export const getRooms = async (req, res, next) => {
    try {
        const gotRooms = await Room.find()
        if (!gotRooms) next(createError(401, "No Rooms Left, Needs to Create Rooms"))

        res.status(200).json(gotRooms)
    } catch (error) {
        next(error)
    }
}