import express from 'express'
const router = express.Router()
import {updateUser,deleteUser,getUser,getUsers} from "../controller/users.js"
import { verifyAdmin, verifyToken,verifyUser } from '../util/verify.js'

// router.get('/checkAuth',verifyToken,(req,res,next)=>{
//     res.send("<h2>Hello User, Your r Loggedin</h2>")
// })
// router.get('/checkUser/:id',verifyUser,(req,res,next)=>{
//     res.send("User Logged in Successfully")
// })
// router.get('/checkAdmin/:id',verifyUser,(req,res,next)=>{
//     res.send("Admin Logged in Successfully")
// })
router.put('/update_user/:id',verifyUser,updateUser)
router.delete('/delete_user/:id',verifyUser,deleteUser)
router.get('/get_user/:id',verifyAdmin,getUser)
router.get('/get_users',verifyAdmin,getUsers)

export default router