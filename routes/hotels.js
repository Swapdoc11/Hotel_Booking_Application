import express from 'express'
import {createHotel,updateHotel,deleteHotel,getHotel,getHotels,countByCity} from '../controller/hotels.js'
const router = express.Router()
router.post('/create_hotel',createHotel)
router.put('/update_hotel/:id',updateHotel)
router.delete('/delete_hotel/:id',deleteHotel)
router.get('/get_hotel/:id',getHotel)
router.get('/get_hotels',getHotels)
router.get('/countByCity',countByCity)
export default router