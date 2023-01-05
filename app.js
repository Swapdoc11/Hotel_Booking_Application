
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authroute from "./routes/auth.js"
import hotelsroute from "./routes/hotels.js"
import roomsroute from "./routes/rooms.js"
import usersroute from "./routes/users.js"
import cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config()
const app = express();
const PORT = process.env.PORT || 4700
app.use(cors())
/*app.use((req, res, next) => {
    //res.header('Access-Control-Allow-Origin', `http://${process.env.HOST}:${process.env.PORT_CLIENT}`) // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Origin', `http://localhost:3000`) // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token'
    )
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    if (req.method === 'OPTIONS') {
      res.status(204).send()
    } else {
      next()
    }
  })*/
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURILOCAL);
        console.log("Connected to mongodb...");
    } catch (error) {
        throw error
    }
}
mongoose.connection.on('disconnected', () => {
    console.log('DB Connection disconnected....');
})
mongoose.connection.on('connected', () => {
    console.log('DB Connection connected....');
})
process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})

app.use("/api/auth", authroute)
app.use("/api/hotel", hotelsroute)
app.use("/api/room", roomsroute)
app.use("/api/user", usersroute)

app.use((err, req, res, next) => {
    console.log("Comes to an Error",err);
    const msg = err.message
    const status = err.status
    const stack = err.stack
    return res.status(status).json({
        Error: msg,
        Status: status,
        Stack: stack
        
    })
})

app.get('/', (req, res) => {
    res.send("<h1>Hello Javascript</h1>")
})

app.listen(PORT, () => {
    connectDB()
    console.log("Listening " + PORT);
})