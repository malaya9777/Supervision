const express = require('express');
const router = express.Router();
const ps = require('../models/ps');
const type = require('../models/type');
const officer = require('../models/officer');
const record = require('../models/record');

router.get('/', async(req, res)=>{
    let ps_list= await ps.find();
    let type_list = await type.find();
    let officer_list = await officer.find();
    let records = await record.find();
    res.render('addSupervision', {layout:'layouts/main', data:{ps_list:ps_list, type_list: type_list, officer_list: officer_list}})
});

router.post('/', async(req, res)=>{
    let {rec_id, caseType, investigatingOfficer, supervisingOfficer, dateOfAssignment} = req.body;
    console.log(req.body)
    try {
        await record.findByIdAndUpdate(rec_id, {$push:{supervisionDetails:{caseType:caseType, investigatingOfficer:investigatingOfficer, supervisingOfficer:supervisingOfficer, dateOfAssignment:dateOfAssignment}}});
        
    } catch (error) {
        console.log(error)
    }
    res.redirect('/addSupervision')
});


module.exports = router;