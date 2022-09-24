const express = require('express');
const router = express.Router();
const officer = require('../../models/officer');

router.get('/',async(req,res)=>{
    const officer_list = await officer.find();
    res.render('configuration/officer', { layout: 'layouts/main', officer_list:officer_list});
});

router.post('/', async(req, res)=>{
    let new_officer = new officer({
        name: req.body.name,
        designation:req.body.designation
    });

    try {
        await new_officer.save();
        const officer_list = await officer.find();
        res.render('configuration/officer', { layout: 'layouts/main', res_msg:`Successfully added ${req.body.name}!`, res_type:'alert-success',officer_list:officer_list});
    } catch (error) {
        const officer_list = await officer.find();
        res.render('configuration/officer', { layout: 'layouts/main', res_msg:'Unable to add.', res_type:'alert-danger',officer_list:officer_list});
    }
});


//Not implemented
router.patch('/', async(req, res)=>{
    try {
        await new_officer.findByIdAndUpdate(req.body.id, req.body);
        const officer_list = await officer.find();
        res.render('configuration/policestation', { layout: 'layouts/main', res_msg:`Successfully added ${req.body.name}!`, res_type:'alert-success',officer_list:officer_list});
    } catch (error) {
        const officer_list = await officer.find();
        res.render('configuration/policestation', { layout: 'layouts/main', res_msg:'Unable to add.', res_type:'alert-danger',officer_list:officer_list});
    }
    
});

module.exports = router;