const express = require('express');
const router = express.Router();
const ps = require('../models/ps');
const category = require('../models/category');
const record = require('../models/record')


router.get('/', async(req, res)=>{
    let ps_list= await ps.find();
    let category_list = await category.find();
    res.render('addtoCategory', {layout:'layouts/main', data:{ps_list:ps_list, category_list: category_list}})
});

router.post('/', async(req, res)=>{
    let {rec_id, category} = req.body;
    try {
        await record.findByIdAndUpdate(rec_id, {$push:{categories:{category}}});
        return res.send('success');        
    } catch (error) {
        return res.send(error);
    }   
});

router.post('/remove' , async(req, res)=>{
    let {id, rec_id} = req.body;
    console.log(req.body, id, rec_id);
    try {
        await record.findByIdAndUpdate(rec_id, {$pop:{"categories.$._id":id}});
        return res.send('success');
    } catch (error) {
        return res.send(error);
    }
})


module.exports = router;