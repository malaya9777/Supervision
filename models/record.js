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
    majorHead:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'MajorHead'
    },
    minorHead:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'MinorHead'
    },
    caseType:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Type'
    },
    investigatingOfficer:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Officer'
    },
    supervisingOfficer:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Officer'
    },
    status:{
        type:Boolean,
        default:false
    },
    caseID:{
        type:String,
        require:true,
        unique:true,
        trim:true
    }
    
},{timestamps:true});
module.exports =mongoose.model('Record', record);