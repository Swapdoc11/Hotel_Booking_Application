import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
    {
        type:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        maxpeople:{
            type:Number,
            required:true
        },desc:{
            type:String
        },
        roomNumbers:[
            {
                number:Number,
                unavailableDates:{
                        type:[Date]
                }
            }
        ]
    },{
        timestamp:true
    }
)
export default mongoose.model("Room",RoomSchema)