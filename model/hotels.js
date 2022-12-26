import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    type:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    distance:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    photo:{
        type:[String],
       
    },
    desc:{
        type:String,
        require:true
    },
    ratings:{
        type:String,
        min:0,
        max:5
    },
    rooms:{
        type:[String],
        
    },
    chepestPrice:{
        type:Number,
        require:true
    },
    featured:{
        type:Boolean,
        default:false
    }
})

export default mongoose.model('Hotel',HotelSchema)