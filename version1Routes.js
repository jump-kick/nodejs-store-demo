const express = require('express');
const router = express.Router();

const shopperRoutes = require('./shopperRoutes');
const managerRoutes = require('./managerRoutes');

//Shopper endpoints
router.use('/shop', shopperRoutes);

//Manager endpoints
router.use('/manage', managerRoutes);

module.exports = router;