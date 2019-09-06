const express = require('express');
const db = require('../data/helpers/projectModel.js')

const router = express.Router();
router.use(express.json());


module.exports = router;