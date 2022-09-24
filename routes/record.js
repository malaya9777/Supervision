const express = require('express');
const router = express.Router();
const officer = require('../models/officer');
const type = require('../models/type');
const ps = require('../models/ps');

router.get('/', async(req, res)=>{
    const ps_list = await ps.find();
    const type_list = await type.find();
    const officer_list = await officer.find();
    res.render('addRecord',{ layout: 'layouts/main', data:{ps_list:ps_list, type_list:type_list, officer_list:officer_list}})
})


module.exports = router;