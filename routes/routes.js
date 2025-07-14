const express = require('express');
const router = express.Router();
const {getWeather} = require('../controllers/controllers');
const {limiter} = require('../middleware/middleware');

router.get('/weather', limiter , getWeather);

module.exports = router;