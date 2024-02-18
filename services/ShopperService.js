/* eslint-disable no-unused-vars */
const Service = require('./Service');
const DataService = require('./DataService');
const Basket = require('./Basket');

/**
* Add To Basket - if quantity is left blank, default is 1.
*
* productRequest ProductRequest 
* returns Map
* */
const addToBasket = (productRequest) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse(Basket.addToBasket(productRequest), 200));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get all available products
*
* returns List
* */
const getProducts = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse(DataService.getProducts(), 200));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get the total, while applying any active deals
*
* returns Double
* */
const getTotal = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse(Basket.getTotal(), 200));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Remove a product
*
* id Long 
* no response value expected for this operation
* */
const removeAll = (params) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({message: 'Deleted item number ' + params.id}));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update the product quantity
*
* productRequest ProductRequest 
* returns Map
* */
const updateBasket = (productRequest) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse(Basket.updateBasket(productRequest)));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  addToBasket,
  getProducts,
  getTotal,
  removeAll,
  updateBasket,
};
