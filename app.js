
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authroute from "./routes/auth.js"
import hotelsroute from "./routes/hotels.js"
import roomsroute from "./routes/rooms.js"
import usersroute from "./routes/users.js"
import cookieParser from "cookie-parser"
dotenv.config()
const app = express();

const PORT = process.env.PORT || 3000

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

app.use("/auth", authroute)
app.use("/hotel", hotelsroute)
app.use("/room", roomsroute)
app.use("/user", usersroute)

app.use((err, req, res, next) => {
    console.log("Comes to an Error",err);
    const msg = err.message
    const status = err.status
    const stack = err.stack
    res.json({
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