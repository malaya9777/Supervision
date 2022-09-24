const  mongoose = require("mongoose");

const typeSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        trim:true,
        require:true
    }

},{timestamps:true});

module.exports=  mongoose.model('Type', typeSchema);