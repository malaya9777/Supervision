const express = require('express');
const router = express.Router();
const ps = require('../models/ps');
const record = require('../models/record');
const majorheads = require('../models/majorHead');
const subheads = require('../models/subHead');
const { ObjectID } = require('mongodb');

router.get('/getSupervisionDetails/:id', async (req, res) => {
    let id = req.params['id'];
    const records = await record.findOne({_id:id})
    .populate({ path: 'supervisionDetails', populate:{path:'caseType', select:'name'}})
    .populate({ path: 'supervisionDetails', populate:{path:'investigatingOfficer'}})
    .populate({ path: 'supervisionDetails', populate:{path:'supervisingOfficer'}});
    res.send(records.supervisionDetails);
    return;
});

router.get('/getCategories/:id', async(req, res)=>{
    let id = req.params['id'];
    const records = await record.findById(id)
    .populate({path:'categories', populate:{path:'category'}});
    if(records.categories){
        res.send(records.categories);
    }else{
        res.send()
    }

});

router.post('/check', async (req, res) => {
    let { ps, caseNo, caseDate } = req.body;
    if (ps && caseNo && caseDate) {
        caseNo = parseInt(caseNo);
        caseYear = new Date(caseDate).getFullYear();
        let isFound = await record.aggregate([
            {
                $project: {
                    _id:"$_id",
                    _ps: "$ps",
                    _caseNo: "$caseNo",
                    _caseYear: { $year: "$caseDate" },
                }
            },
            {
                $match: {
                    _ps: ObjectID(ps),
                    _caseNo: caseNo,
                    _caseYear:caseYear
                }
            }
        ]);
        if (isFound[0]) {
            res.send(isFound[0]).status(200);
            return;
        }
    }
    res.send(null).status(404);
    return;
});

router.get('/subHead/:id', async (req, res) => {
    let majorHeadID = req.params['id']
    const subHeadList = await subheads.find({ majorHeadID: majorHeadID });
    if (subHeadList) {
        return res.status(200).send(subHeadList);
    }
    return res.status(404).send('');
});

router.get('/setSupervisionStatus/:id/:status', async(req, res)=>{
    let id = req.params['id'];
    let status = req.params['status']
    try {
        let data = await record.updateOne({"supervisionDetails._id": id}, {$set:{"supervisionDetails.$.status":status}});
        return res.status(200).send('success');
    } catch (error) {
        return res.status(404).send('');
    }
});

module.exports = router;