const mongoose = require("mongoose");

const psSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        trim:true,
        require:true
    },
    cctnsdbName:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    icName:{
        type:mongoose.Schema.Types.ObjectId,
        trim:true,
        ref:'Officer'
    }

},{timestamps:true});
module.exports =mongoose.model('PS', psSchema);

