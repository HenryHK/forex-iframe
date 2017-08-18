'use strict';

var express = require("express");
var controller = require("../controllers/app.server.controller");
var router = express.Router();

router.get('/', controller.getForexPrice);
router.get('/api', controller.getApi);

module.exports = router;