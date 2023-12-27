//Require the dev-dependencies
const chai = require('chai');
const should = chai.should();
const config = require('../config');
const DataService = require('../services/DataService');
const { after } = require('mocha');

//Parent block
describe('DataService functions', () => {

    describe('Valid product rules', () => {
        const NINTENDO_SWITCH = "Nintendo Switch";
        let product = {
            price: 250.00,
            name: NINTENDO_SWITCH,
            description: "Video Game System",
            id: 555
        };

        it('name, price, and description cannot be null; ID must be numeric', (done) => {
            product.price = null;
            chai.assert(DataService.addProduct(product).id == -1, 'Price can\'t be null');

            product.price = 250.00;
            product.name = null;
            chai.assert(DataService.addProduct(product).id == -1, 'Name can\'t be null');

            product.name = NINTENDO_SWITCH;
            product.description = null;
            chai.assert(DataService.addProduct(product).id == -1, 'Description can\'t be null');

            product.description = "Description"
            product.id = "Not a number"
            chai.assert(DataService.editProduct(product).status == 400, 'Id can\'t be non-numeric');

            done();
        })
    })

})