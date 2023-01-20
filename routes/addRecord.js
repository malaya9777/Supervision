const express = require('express');
const router = express.Router();
const ps = require('../models/ps');
const record = require('../models/record');
const majorheads = require('../models/majorHead');
const subheads = require('../models/subHead');
const { ObjectID } = require('mongodb');


router.get('/', async (req, res) => {
    const ps_list = await ps.find();
    const majorheadlist = await majorheads.find();
    res.render('addRecord', { layout: 'layouts/main', data: { ps_list: ps_list, majorheadlist: majorheadlist } })
});



router.post('/', async (req, res) => {
    try {
        let { ps, caseNo, caseDate, majorHead, subHead, sections } = req.body
        const newRecord = new record({
            ps: ps,
            caseNo: caseNo,
            caseDate: caseDate,
            majorHead: majorHead,
            subHead: subHead,
            sections: sections
        });
        await newRecord.save();
    } catch (error) {
        console.log(error);
    }
    res.redirect('/addRecord')
});
module.exports = router;