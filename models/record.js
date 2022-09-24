const mongoose = require("mongoose");

const record = mongoose.Schema({
    ps:{
        type: String,
        require: true,
        trim:true,
    },
    caseNo:{
        type:Number,
        trim:true,
        require:true
    },
    caseYear:{
        type:Number,
        require:true
    },
    caseDate:{
        type:Date,        
    },
    caseType:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Type'
    },
    superviosaryOfficer:{
        type:String,
    },
    status:{
        type:Boolean,
        default:false
    }
},{timestamps:true});
module.exports =mongoose.model('Record', record);