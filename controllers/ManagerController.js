/**
 * The ManagerControllerController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/ManagerService');
const applyDeal = async (request, response) => {
  await Controller.handleRequest(request, response, service.applyDeal);
};

const clearActiveDeals = async (request, response) => {
  await Controller.handleRequest(request, response, service.clearActiveDeals);
};

const createProduct = async (request, response) => {
  await Controller.handleRequest(request, response, service.createProduct);
};

const editProduct = async (request, response) => {
  await Controller.handleRequest(request, response, service.editProduct);
};

const getAvailableBundleDeals = async (request, response) => {
  await Controller.handleRequest(request, response, service.getAvailableBundleDeals);
};

const getAvailableDeals = async (request, response) => {
  await Controller.handleRequest(request, response, service.getAvailableDeals);
};

const getProducts_1 = async (request, response) => {
  await Controller.handleRequest(request, response, service.getProducts_1);
};

const deleteProduct = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteProduct);
};


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
