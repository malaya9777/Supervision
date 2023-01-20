const mongoose = require("mongoose");

const record = mongoose.Schema({
    ps:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'PS'
    },
    caseNo:{
        type:Number,
        trim:true,
        require:true
    },
    caseDate:{
        type:Date,
        require:true
    },
    sections:{
        type:String,
        require:true
    },
    majorHead:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'MajorHead'
    },
    subHead:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'SubHead'
    },
    supervisionDetails:[{
        caseType:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Type',
            require:true
        },
        investigatingOfficer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Officer',
            require:true
        },
        supervisingOfficer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Officer',
            require:true
        },
        dateOfAssignment:{
            type:Date,
            require:true
        },
        status:{
            type:Boolean,
            default:false
        },
        timeStamp:{
            type:Date,
            default: new Date()
        }
    }],    
    courtDetails:[{
        courtSLNo:[
            {
                serialType:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'CourtSLNo'
                },
                serialNo:{
                    type:Number
                },
                serialYear:{
                    type:Number
                },
                remarks:{
                    type:String
                },
                timeStamp:{
                    type:Date,
                    default: new Date()
                }
            }
        ],
        dateOfJudgement:{
            type:Date
        },
        dateOfReceipt:{
            type:Date
        },
        pronouncedBy:{
            type:String
        },
        natureOfJudgmenet:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'JudgementType'
        }
    }],
    
},{timestamps:true});
module.exports =mongoose.model('Record', record);