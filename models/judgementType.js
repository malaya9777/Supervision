const mongoose = require("mongoose");

const judgementType = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        trim:true,
        require:true,
    }

},{timestamps:true});

module.exports =  mongoose.model('JudgementType',judgementType);