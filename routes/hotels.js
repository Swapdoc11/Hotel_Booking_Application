import express from 'express'
import {countByType,createHotel,updateHotel,deleteHotel,getHotel,getHotels,countByCity,getHotelRooms} from '../controller/hotels.js'
const router = express.Router()
router.post('/create_hotel',createHotel)
router.put('/update_hotel/:id',updateHotel)
router.delete('/delete_hotel/:id',deleteHotel)
router.get('/get_hotel/:id',getHotel)
router.get('/get_hotels',getHotels)
router.get('/countByCity',countByCity)
router.get('/countByType',countByType)
router.get('/room/:id',getHotelRooms)
export default router