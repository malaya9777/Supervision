const mongoose = require("mongoose");

const majorHeadSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        trim:true,
        require:true,
    },

},{timestamps:true});

module.exports =  mongoose.model('MajorHead',majorHeadSchema);