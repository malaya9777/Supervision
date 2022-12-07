const mongoose = require('mongoose');

const dbURL = "mongodb://127.0.0.1:27017/dcrb";

const initializeMongoServer = async ()=>{
    try{
        await mongoose.connect(dbURL, {
            useNewUrlParser:true
        });
        console.log('Connected to DB!')
    }catch(e){
        console.log(e);
        throw e;
    }
}

module.exports = initializeMongoServer;