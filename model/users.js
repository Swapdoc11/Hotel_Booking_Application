import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
)

export default mongoose.model('User', UserSchema)