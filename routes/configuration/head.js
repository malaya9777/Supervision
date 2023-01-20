const express = require('express');
const router = express.Router();
const majorHead = require('../../models/majorHead')
const subHead = require('../../models/subHead')

router.get('/',async(req,res)=>{
    const majorHeads = await majorHead.aggregate([
        {$lookup:{from:'subheads',localField:'_id', foreignField:'majorHeadID', as:'subHeads'}}
    ]);
    
    console.log(majorHeads)
    res.render('configuration/head', { layout: 'layouts/main', majorHeads:majorHeads});
});

router.post('/create/majorHead', async(req, res)=>{
    const {name} = req.body;
    const new_head = new majorHead({
        name: name
    });
    try {
        await new_head.save();
    } catch (error) {
        console.log(error);
    }
    res.redirect('/configuration/head')
});

router.post('/create/subHead', async(req, res)=>{
    const {majorHeadID, name} = req.body;
    const new_head = new subHead({
        majorHeadID:majorHeadID,
        name: name
    });
    try {
        await new_head.save();
    } catch (error) {
        console.log(error);
    }
    res.redirect('/configuration/head')
});






module.exports = router;