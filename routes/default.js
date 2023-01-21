const express = require('express');
const router = express.Router();

const addRecord = require('./addRecord');
const addSupervision = require('./addSupervision');
const addtoCategory = require('./addtoCategory');
const imports = require('./import');
const api = require('./api');
const configuration = require('./configuration');

router.get('/', async(req, res)=>{
    res.render('default', { layout: 'layouts/main'});
});



router.use('/addRecord', addRecord);
router.use('/addSupervision', addSupervision);
router.use('/addtoCategory', addtoCategory);
router.use('/imports', imports);
router.use('/api', api);
router.use('/configuration', configuration)

module.exports = router;