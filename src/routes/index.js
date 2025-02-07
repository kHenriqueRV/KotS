const router = require('express').Router();
const tournamentsroutes = require('./tornamentsroutes.js');

router.use('/tournaments', tournamentsroutes);

module.exports = router;