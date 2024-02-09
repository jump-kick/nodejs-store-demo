const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const ExpressServer = require('../expressServer');
const config = require('../config');
const DataService = require('../services/DataService');
chai.use(chaiHttp);

let server = new ExpressServer(0, config.OPENAPI_YAML);
server.launch();

//Parent block
describe('Manager endpoints', () => {
    after(function(done){
        DataService.reload();
        done();
    })
    /**
     * Test the create endpoint
     */
    describe('Create a product', () => {
        const NINTENDO_SWITCH = "Nintendo Switch";

        let product = {
            price: 250.00,
            name: NINTENDO_SWITCH,
            description: "Video Game System",
            id: 555
        };

        it('should create a new product', () => {
            DataService.getProducts().forEach((p) => {
                chai.assert(p.name != NINTENDO_SWITCH, 'Switch shouldn\'t be there yet');
            })
            chai.request(server.app)
                .post('/v1/manage/createProduct')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('payload');
                    //confirm supplied id: 555 is ignored; should be system-generated
                    res.body.payload.should.have.property('id').eql(4);
                    res.body.payload.should.have.property('price').eql(250.00);
                    res.body.payload.should.have.property('name').eql(NINTENDO_SWITCH);
                    const actualProduct = DataService.getProducts()[3];
                    chai.expect(actualProduct.price).to.equal(250.00);
                    chai.expect(actualProduct.name).to.equal(NINTENDO_SWITCH);
                    chai.expect(actualProduct.id).to.equal(4);
                    chai.expect(actualProduct.description).to.equal('Video Game System');

                    //Clean up test
                    DataService.deleteProduct(actualProduct);
                })

        })

        it('should return 400 status if product is invalid', () => {

            product.name = null;//product with error; name can't be null

            chai.request(server.app)
                .post('/v1/manage/createProduct')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('payload');
                    //confirm id with error is -1
                    res.body.payload.should.have.property('id').eql(-1);

                    DataService.getProducts().forEach((p) => {
                        chai.assert(p.name != NINTENDO_SWITCH, 'Switch shouldn\'t be there');
                    })
                })

        })
    })
    /**
     * Test the edit endpoint
     */
    describe('Edit a product', () => {

        let product = {
            price: 500.00,//price was $600.00
            name: "iPhone",
            description: "Expensive smart phone",
            id: 2
        };

        it('should edit the product', () => {

            chai.request(server.app)
                .put('/v1/manage/editProduct')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('payload');
                    res.body.payload.should.have.property('id').eql(2);
                    res.body.payload.should.have.property('price').eql(500.00);
                    res.body.payload.should.have.property('name').eql('iPhone');
                    res.body.payload.should.have.property('description').eql('Expensive smart phone');
                    let productsArray = DataService.getProducts();
                    chai.expect(productsArray[1].price).to.equal(500.00);

                    //reset product
                    product.price = 600.00;
                    DataService.editProduct(product);
                })
        })
    })

    /**
     * Test the delete endpoint
     */
    describe('Delete a product', () => {
        it('should be deleted', (done) => {

            const product = DataService.getProducts()[0];

            chai.request(server.app)
                .delete('/v1/manage/deleteProduct')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('payload');
                    res.body.payload.should.have.property('id').eql(product.id);
                    res.body.payload.should.have.property('price').eql(product.price);
                    res.body.payload.should.have.property('name').eql(product.name);
                    res.body.payload.should.have.property('description').eql(product.description);

                    for(let i = 0; i < DataService.getProducts().length; i++){
                        const p = DataService.getProducts()[i];
                        chai.assert(p.id != product.id); //Product should no longer exist in the array
                    }

                    //Add product back in after tests are done
                    DataService.addProduct(product);
                    done();
                })
        })

        it('should return a status = 400 and an id = -1 if product is invalid', (done) => {
            let product = {
                name: "Doesn't exist",
                description: "uh uh",
                price: 10000000.00,
                id: 23456
            }

            const prodSum = DataService.getProducts().length;

            chai.request(server.app)
                .delete('/v1/manage/deleteProduct')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('payload');
                    //confirm id with error is -1
                    res.body.payload.should.have.property('id').eql(-1);

                    chai.assert(prodSum == DataService.getProducts().length, 'No products should be deleted');
                    done();
                })
        })
    })

    /**
    * Test the get available deals endpoint
    */
    describe('Gets all available deals', () => {

        it('gets all available deals', () => {

            const deals = DataService.getAvailableDeals();

            chai.request(server.app)
                .get('/v1/manage/availableDeals')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('payload');

                    for(i = 0; i < deals.length; i++){
                        res.body.payload[i].should.have.property('id').eql(deals[i].id);
                        res.body.payload[i].should.have.property('description').eql(deals[i].description);
                        res.body.payload[i].should.have.property('discountCode').eql(deals[i].discountCode);
                    }
                })
        })    
    })
})
