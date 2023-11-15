/**
 * The ShopperController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/ShopperService');
const addToBasket = async (request, response) => {
  await Controller.handleRequest(request, response, service.addToBasket);
};

const getProducts = async (request, response) => {
  await Controller.handleRequest(request, response, service.getProducts);
};

const getTotal = async (request, response) => {
  await Controller.handleRequest(request, response, service.getTotal);
};

const removeAll = async (request, response) => {
  await Controller.handleRequest(request, response, service.removeAll);
};

const updateBasket = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateBasket);
};


module.exports = {
  addToBasket,
  getProducts,
  getTotal,
  removeAll,
  updateBasket,
};
