const express = require('express');
const router = express.Router();
const majorHead = require('../../models/majorHead')
const minorHead = require('../../models/minorHead')

router.get('/',async(req,res)=>{
    const majorHeads = await majorHead.aggregate([
        {$lookup:{from:'minorheads',localField:'_id', foreignField:'majorHeadID', as:'minorHeads'}}
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

router.post('/create/minorHead', async(req, res)=>{
    const {majorHeadID, name} = req.body;
    const new_head = new minorHead({
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

router.post('/minor', async(req, res)=>{
    const {majorHeadID, minorHead} = req.body;
    
    res.redirect('/configuration/head');
})




module.exports = router;