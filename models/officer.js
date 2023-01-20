const mongoose = require("mongoose");

const officerSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        trim:true,
        require:true,
    },
    designation:{
        type:String,
        trim:true,
        require:true
    }

},{timestamps:true});

module.exports =  mongoose.model('Officer',officerSchema);