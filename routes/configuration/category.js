const express = require('express');
const router = express.Router();
const category = require('../../models/category')


router.get('/',async(req,res)=>{
    const category_list = await category.find();    
    console.log(category_list)
    res.render('configuration/category', { layout: 'layouts/main', category_list:category_list});

});

router.post('/create', async(req, res)=>{
    const {name} = req.body;
    const new_category = new category({
        name: name
    });
    try {
        await new_category.save();
    } catch (error) {
        console.log(error);
    }
    res.redirect('/configuration/category')
});

module.exports = router;

