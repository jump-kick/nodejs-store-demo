const { getAvailableBundleDeals, applyDeal, editProduct, createProduct, getProducts_1, getAvailableDeals, deleteProduct, clearActiveDeals } = require('./controllers/ManagerController');
const express = require('express');
const router = express.Router();

router.put('/editProduct', (req, res) => {
    editProduct(req, res)
});

router.post('/createProduct', (req, res) => {
    createProduct(req, res)
});

router.post('/applyDeal', (req, res) => {
    applyDeal(req, res)
});

router.get('/getProducts', (req, res) => {
    getProducts_1(req, res)
});

router.get('/availableDeals', (req, res) => {
    getAvailableDeals(req, res)
});

router.get('/availableBundleDeals', (req, res) => {
    getAvailableBundleDeals(req, res)
});

router.delete('/deleteProduct', (req, res) => {
    deleteProduct(req, res)
});

router.delete('/clearActiveDeals', (req, res) => {
    clearActiveDeals(req, res)
});

module.exports = router;