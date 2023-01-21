const express = require('express');
const router = express.Router();

const configuration_policeStation = require('./configuration/policestation');
const configuration_officer = require('./configuration/officer');
const configuration_type = require('./configuration/type');
const configuration_head = require('./configuration/head');
const configuration_category = require('./configuration/category');


router.use('/policeStation', configuration_policeStation);
router.use('/officer', configuration_officer);
router.use('/type', configuration_type);
router.use('/head', configuration_head);
router.use('/category', configuration_category);

module.exports = router;

