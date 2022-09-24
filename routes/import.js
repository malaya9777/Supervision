const express = require('express');
const router = express.Router();
const fileupload = require('express-fileupload');
const readExcel = require('read-excel-file/node');
const fs = require('fs');
const officer = require('../models/officer');
const type = require('../models/type');
const ps = require('../models/ps');
const record = require('../models/record');
const schema = require('../models/excelSchems');


router.use(fileupload());

router.get('/', async(req, res)=>{
    const ps_list = await ps.find();
    const type_list = await type.find();
    const officer_list = await officer.find();
    res.render('imports',{ layout: 'layouts/main', data:{ps_list:ps_list, type_list:type_list, officer_list:officer_list}})
});

router.post('/', async(req, res)=>{
    if(!req.files.excelFile.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        res.send('sorry file format not supported!');
        return;
    }
    let excelFile = req.files.excelFile;
    excelFile.mv(__dirname+'/../data/temp/'+req.body.type+'.xlsx');
    res.redirect('imports/Confirmation/'+req.body.type)
});

router.get('/confirmation/:id', async(req, res)=>{
    const _type = await type.findById(req.params.id);

    
    readExcel(__dirname+'/../data/temp/'+req.params.id+'.xlsx', {schema}).then(({rows, errors})=>{
        
        if(errors.length===0){
            res.render('importsConfirmation',{ layout: 'layouts/main', data:{rows:rows, _type:_type}});
            return;
        }
        res.redirect('/imports');
    });    
});

router.get('/cancled/:id', async(req, res)=>{
    fs.unlink(__dirname+'/../data/temp/'+req.params.id+'.xlsx', (err)=>{
        if(err){
            res.redirect('imports/Confirmation/'+req.params.id)
            return;
        }
        res.redirect('/imports');
    });
});

router.get('/confirmed/:id', async(req, res)=>{
    const _type = await type.findById(req.params.id);
    readExcel(__dirname+'/../data/temp/'+req.params.id+'.xlsx', {schema}).then(({rows, errors})=>{
        if(errors.length===0){
            rows.forEach(async(d,i)=>{
                let new_record = new record({
                    ps:d.PS,
                    caseNo:d.FIRNo,
                    caseYear:d.FIRYear,
                    caseType:_type._id
                });
                await new_record.save();
            })
        }
        res.redirect('/imports');
    });
})

module.exports = router;