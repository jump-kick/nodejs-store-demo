const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const ExpressServer = require('../expressServer');
const config = require('../config');
const Basket = require('../services/Basket');

chai.use(chaiHttp);

let server = new ExpressServer(0, config.OPENAPI_YAML);
server.launch();

//Parent block
describe('Shopper endpoints', function shopperEndpoints() {

    afterEach(function (done) {
        Basket.empty();
        done();
    });

    /**
     * Test the add product endpoint
     */
    describe('Add a product to the basket', function () {
        const productRequest1 = {
            "quantity": 1,
            "id": 1
        };

        const productRequest2 = {
            "quantity": 4,
            "id": 2
        };

        const productRequest3 = {
            "quantity": 1,
            "id": 3
        };

        it('should add a product to the basket', function (done) {

            chai.request(server.app)
                .post('/v1/shop/addToBasket')
                .send(productRequest1)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('payload');

                    res.body.payload[0].should.have.property('id').eql(1);
                    res.body.payload[0].should.have.property('quantity').eql(1);

                    const firstEntry = Basket.getBasket()[0];

                    chai.expect(firstEntry.id).to.equal(productRequest1.id);
                    chai.expect(firstEntry.quantity).to.equal(productRequest1.quantity);
                    done();
                });

        })

        it('Should increase the basket quantity when more of the same item are added', function (done) {
            //Already one in the basket
            Basket.addToBasket(productRequest1);

            chai.request(server.app)
                .post('/v1/shop/addToBasket')
                .send(productRequest1)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('payload');

                    res.body.payload[0].should.have.property('id').eql(1);
                    res.body.payload[0].should.have.property('quantity').eql(2);

                    const firstEntry = Basket.getBasket()[0];

                    chai.expect(firstEntry.id).to.equal(productRequest1.id);
                    chai.expect(firstEntry.quantity).to.equal(2);
                    done();
                });
        })

        it('Should retain the basket state when more items are added', function (done) {

            //Already some items in the basket
            Basket.addToBasket(productRequest1);
            Basket.addToBasket(productRequest1);
            Basket.addToBasket(productRequest2);

            chai.request(server.app)
                .post('/v1/shop/addToBasket')
                .send(productRequest3)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('payload');

                    res.body.payload[0].should.have.property('id').eql(1);
                    res.body.payload[0].should.have.property('quantity').eql(2);

                    const firstEntry = Basket.getBasket()[0];

                    chai.expect(firstEntry.id).to.equal(productRequest1.id);
                    chai.expect(firstEntry.quantity).to.equal(2);

                    res.body.payload[1].should.have.property('id').eql(2);
                    res.body.payload[1].should.have.property('quantity').eql(4);

                    const secondEntry = Basket.getBasket()[1];

                    chai.expect(secondEntry.id).to.equal(productRequest2.id);
                    chai.expect(secondEntry.quantity).to.equal(productRequest2.quantity);

                    res.body.payload[2].should.have.property('id').eql(3);
                    res.body.payload[2].should.have.property('quantity').eql(1);

                    const thirdEntry = Basket.getBasket()[2];

                    chai.expect(thirdEntry.id).to.equal(productRequest3.id);
                    chai.expect(thirdEntry.quantity).to.equal(productRequest3.quantity);
                    done();
                });
        })
    });

    describe('Get the basket total', function () {

        const productRequest3 = {
            "quantity": 1,
            "id": 3
        };

        before(function addOneToBasket(done) {
            Basket.addToBasket(productRequest3);
            done();
        });

        it('should get the basket total for a simple case', function (done) {

            chai.request(server.app)
                .get('/v1/shop/basketTotal')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('payload');
                    res.body.payload.should.eql(20.00);
                    done();
                })
        })
    });

    describe('Get the basket total for multiple items', function () {
        const productRequest1 = {
            quantity: 1,
            id: 1
        };

        const productRequest2 = {
            quantity: 4,
            id: 2
        };

        const productRequest3 = {
            quantity: 1,
            id: 3
        };

        before(function addAllToBasket(done) {
            Basket.addToBasket(productRequest1);
            Basket.addToBasket(productRequest2);
            Basket.addToBasket(productRequest3);
            done();
        });

        it('should get the basket total for a complex case with no deals', function (done) {

            chai.request(server.app)
                .get('/v1/shop/basketTotal')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('payload');
                    res.body.payload.should.eql(2426.00);
                    done();
                })
        })
    });

})
