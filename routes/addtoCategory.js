const express = require('express');
const router = express.Router();
const ps = require('../models/ps');
const category = require('../models/category');
const record = require('../models/record');
const { ObjectId, ObjectID } = require('mongodb');


router.get('/', async(req, res)=>{
    let ps_list= await ps.find();
    let category_list = await category.find();
    res.render('addtoCategory', {layout:'layouts/main', data:{ps_list:ps_list, category_list: category_list}})
});

router.post('/', async(req, res)=>{
    let {rec_id, category} = req.body;
    
    try {
        if(category=='Select Category'){
            return res.send('Select a Category')
        }
        const exist = await record.find({_id: rec_id, "categories.category": category}).count();
        
        if(exist==0){
            await record.findByIdAndUpdate(rec_id, {$push:{categories:{category}}});
            return res.send('success');         }
               
        return res.send('already exist')
    } catch (error) {
        return res.send(error);
    }   
});

router.post('/remove' , async(req, res)=>{
    let {id, rec_id} = req.body;
    try {
        let data = await record.findByIdAndUpdate(rec_id, {$pull:{categories:{_id:id}}});
        return res.send(id);
    } catch (error) {
        return res.send(error);
    }
})


module.exports = router;