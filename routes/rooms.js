import express from 'express'
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from '../controller/rooms.js'
import { verifyAdmin } from '../util/verify.js'
const router = express.Router()
router.post('/create_room/:hotelId',verifyAdmin,createRoom)
router.put('/update_room/:id',verifyAdmin,updateRoom)
router.delete('/delete_room/:id/:hotelId',verifyAdmin,deleteRoom)
router.get('/get_room/:id',verifyAdmin,getRoom)
router.get('/get_rooms/:id',verifyAdmin,getRooms)
export default router