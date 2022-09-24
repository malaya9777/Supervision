const express = require('express');
const router = express.Router();
const ps = require('../../models/ps')

router.get('/',async(req,res)=>{
    const ps_list = await ps.find();
    res.render('configuration/policestation', { layout: 'layouts/main', ps_list:ps_list});
});

router.post('/', async(req, res)=>{
    let new_ps = new ps({
        name: req.body.name,
        cctnsdbName: req.body.cctnsdbName
    });

    try {
        await new_ps.save();
        const ps_list = await ps.find();
        res.render('configuration/policestation', { layout: 'layouts/main', res_msg:`Successfully added ${req.body.name}!`, res_type:'alert-success',ps_list:ps_list});
    } catch (error) {
        const ps_list = await ps.find();
        res.render('configuration/policestation', { layout: 'layouts/main', res_msg:'Unable to add.', res_type:'alert-danger',ps_list:ps_list});
    }
    
});

router.patch('/', async(req, res)=>{
    try {
        await new_ps.findByIdAndUpdate(req.body.id, req.body);
        const ps_list = await ps.find();
        res.render('configuration/policestation', { layout: 'layouts/main', res_msg:`Successfully added ${req.body.name}!`, res_type:'alert-success',ps_list:ps_list});
    } catch (error) {
        const ps_list = await ps.find();
        res.render('configuration/policestation', { layout: 'layouts/main', res_msg:'Unable to add.', res_type:'alert-danger',ps_list:ps_list});
    }
    
});


module.exports = router;