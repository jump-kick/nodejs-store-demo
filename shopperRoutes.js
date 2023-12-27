const { updateBasket, addToBasket, getProducts, getTotal, removeAll } = require('./controllers/ShopperController');
const express = require('express');
const router = express.Router();

router.put('/updateQuantity', (req, res) => {
    updateBasket(req, res)
});

router.post('/addToBasket', (req, res) => {
    addToBasket(req, res)
});

router.get('/getProducts', (req, res) => {
    getProducts(req, res)
});

router.get('/basketTotal', (req, res) => {
    getTotal(req, res)
});

router.delete('/removeAll/:id', (req, res) => {
    removeAll(req, res)
});

module.exports = router;