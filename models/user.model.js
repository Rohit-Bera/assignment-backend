const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    number:{
        type:Number,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    rating:{
        type:Number,
    },
    feddback:{
        type:String,
        require:true,
    },
    about:{
        type:String,
        require:true,
    },
    workDemo:{
        type:Array,
    },
    password:{
        type:String,
        required:true,
    },

},
    { timestamps:true }
);

const User = mongoose.model("User",userSchema);
module.exports = User;
