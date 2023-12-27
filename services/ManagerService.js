/* eslint-disable no-unused-vars */
const Service = require('./Service');
const DataService = require('./DataService');

/**
* Apply/activate a standalone or bundle deal - Supply the discountCode. If not a bundle deal, ignore id2 and set id1 for the product to which the deal applies.  Supply both ids for bundle deals.
*
* applyDealRequest ApplyDealRequest 
* returns ApplyDealResponse
* */
const applyDeal = (applyDealRequest) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse(applyDealRequest));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Clear/inactivate active deals
*
* no response value expected for this operation
* */
const clearActiveDeals = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({message: 'success from clearActiveDeals'}, 200));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Create a new product - leave ID as null
*
* product Product 
* returns Product
* */
const createProduct = (product) => new Promise(
  async (resolve, reject) => {
    try {
      const addedProduct = DataService.addProduct(product);
      let statusCode = 0;

      if(addedProduct.id > -1){
        statusCode = 200;
      }else{
        statusCode = 400; //product wasn't valid, so it was rejected
      }

      resolve(Service.successResponse(addedProduct, statusCode));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Edit Product - Change price or description.
*
* product Product 
* returns Product
* */
const editProduct = (prod) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse(DataService.editProduct(prod), 200));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get all available bundle deals
*
* returns Set
* */
const getAvailableBundleDeals = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({message: 'success from getAvailableBundleDeals'},
        200));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get all available deals
*
* returns Set
* */
const getAvailableDeals = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({message: 'success from getAvailableDeals'}, 200));
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
const getProducts_1 = () => new Promise(
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
* Delete the product
*
* product Product 
* no response value expected for this operation
* */
const deleteProduct = (product) => new Promise(
  async (resolve, reject) => {
    try {
      const deletedProduct = DataService.deleteProduct(product);
      let statusCode = 0;

      if(deletedProduct.id > -1){
        statusCode = 200;
      }else{
        statusCode = 400; //product wasn't valid, so it was rejected
      }
      resolve(Service.successResponse(deletedProduct, statusCode));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 400,
      ));
    }
  },
);

module.exports = {
  applyDeal,
  clearActiveDeals,
  createProduct,
  editProduct,
  getAvailableBundleDeals,
  getAvailableDeals,
  getProducts_1,
  deleteProduct
};
