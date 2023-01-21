const mongoose = require("mongoose");

const category = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        trim:true,
        require:true,
    }

},{timestamps:true});

module.exports =  mongoose.model('Category',category);