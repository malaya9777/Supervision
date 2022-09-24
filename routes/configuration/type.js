const express = require('express');
const router = express.Router();
const type = require('../../models/type')

router.get('/',async(req,res)=>{
    const type_list = await type.find();
    res.render('configuration/type', { layout: 'layouts/main', type_list:type_list});
});

router.post('/', async(req, res)=>{
    let new_type = new type({
        name: req.body.name
    });

    try {
        await new_type.save();
        const type_list = await type.find();
        res.render('configuration/type', { layout: 'layouts/main', res_msg:`Successfully added ${req.body.name}!`, res_type:'alert-success',type_list:type_list});
    } catch (error) {
        const type_list = await type.find();
        res.render('configuration/type', { layout: 'layouts/main', res_msg:'Unable to add.', res_type:'alert-danger',type_list:type_list});
    }
    
});


//Not implemented
router.patch('/', async(req, res)=>{
    try {
        await new_type.findByIdAndUpdate(req.body.id, req.body);
        const type_list = await type.find();
        res.render('configuration/policestation', { layout: 'layouts/main', res_msg:`Successfully added ${req.body.name}!`, res_type:'alert-success',type_list:type_list});
    } catch (error) {
        const type_list = await type.find();
        res.render('configuration/policestation', { layout: 'layouts/main', res_msg:'Unable to add.', res_type:'alert-danger',type_list:type_list});
    }
    
});


module.exports = router;