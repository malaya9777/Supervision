const mongoose = require("mongoose");

const courtSLNo = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        trim:true,
        require:true,
    }

},{timestamps:true});

module.exports =  mongoose.model('CourtSLNo',courtSLNo);