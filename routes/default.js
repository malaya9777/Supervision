const express = require('express');
const router = express.Router();
const configuration_policeStation = require('./configuration/policestation');
const configuration_officer = require('./configuration/officer');
const configuration_type = require('./configuration/type');
const record = require('./record');
const imports = require('./import')

router.get('/', async(req, res)=>{
    res.render('default', { layout: 'layouts/main'});
});

router.use('/configuration/policeStation', configuration_policeStation);
router.use('/configuration/officer', configuration_officer);
router.use('/configuration/type', configuration_type);
router.use('/record', record);
router.use('/imports', imports)


module.exports = router;