const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
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
    password:{
        type:String,
        required:true,
    }
},
    { timestamps:true }
);

const Client = mongoose.model("Client",clientSchema);
module.exports = Client;
