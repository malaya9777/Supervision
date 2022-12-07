const express = require('express');
const router = express.Router();
const ps = require('../models/ps');
const record = require('../models/record');
const majorheads = require('../models/majorHead');
const minorheads = require('../models/minorHead');


router.get('/', async(req, res)=>{
    const ps_list = await ps.find();
    const majorheadlist = await majorheads.find(); 
    res.render('addRecord',{ layout: 'layouts/main', data:{ps_list:ps_list, majorheadlist: majorheadlist}})
});

router.get('/minorHead/:id', async(req, res)=>{
    let majorHeadID = req.params['id']
    const minorHeadList = await minorheads.find({majorHeadID:majorHeadID});
    if(minorHeadList){        
        return res.status(200).send(minorHeadList);
    }
    return res.status(404).send('');
});

router.post('/', async(req, res)=>{
    try {
        let {ps, caseNo, caseYear, majorHead, minorHead} = req.body
        const newRecord = new record({
            ps: ps,
            caseNo: caseNo,
            caseYear: caseYear,
            majorHead:majorHead,
            minorHead:minorHead,
            caseID: `${ps}-${caseNo}-${caseYear}`        
        });
        await newRecord.save();
    } catch (error) {
        console.log(error);
    }   
    res.redirect('/record')
});

router.get('/getList', async(req, res)=>{
    const records = await record.find().populate({path:'majorHead', select:'name'}).populate({path:'minorHead', select:'name'});
    res.send(records);
});

router.post('/check', async(req, res)=>{
    let {ps, caseNo, caseYear} = req.body;
    let isFound = await record.findOne({ps: ps, caseNo: caseNo, caseYear: caseYear});
    if(isFound){
        res.send(false);
        return;
    }else if( ps && caseNo && caseYear){
        res.send(true);
        return;
    }
    
});


module.exports = router;