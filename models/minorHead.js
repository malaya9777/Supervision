const mongoose = require("mongoose");

const minorHeadSchema = mongoose.Schema({
    majorHeadID:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'MajorHead'
    }, 
    name:{
        type:String,
        unique:true,
        trim:true,
        require:true,
    }

},{timestamps:true});

module.exports =  mongoose.model('MinorHead',minorHeadSchema);