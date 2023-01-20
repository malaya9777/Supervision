const express = require('express');
const router = express.Router();
const configuration_policeStation = require('./configuration/policestation');
const configuration_officer = require('./configuration/officer');
const configuration_type = require('./configuration/type');
const configuration_head = require('./configuration/head')
const addRecord = require('./addRecord');
const addSupervision = require('./addSupervision')
const imports = require('./import');
const api = require('./api');

router.get('/', async(req, res)=>{
    res.render('default', { layout: 'layouts/main'});
});

router.use('/configuration/policeStation', configuration_policeStation);
router.use('/configuration/officer', configuration_officer);
router.use('/configuration/type', configuration_type);
router.use('/configuration/head', configuration_head)
router.use('/addRecord', addRecord);
router.use('/addSupervision', addSupervision)
router.use('/imports', imports);
router.use('/api', api);

module.exports = router;