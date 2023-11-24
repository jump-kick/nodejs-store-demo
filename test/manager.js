//Require the dev-dependencies
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const ExpressServer = require('../expressServer');
const config = require('../config');
const DataService = require('../services/DataService');
const { after } = require('mocha');

chai.use(chaiHttp);

let server = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
server.launch();

//Parent block
describe('Manager endpoints', () => {
    const chaiServer = chai.request(server.app);

    /**
     * Test the edit endpoint
     */
    describe('Edit an product', () => {
        let product = {
            price: 500.00,//price was $600.00
            name: "iPhone",
            description: "Expensive smart phone",
            id: 2
        };

        it('it should edit the product', (done) => {

            chaiServer
                .put('/manage/editProduct')
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
                    done();

                })
        })
    })

    after((done) => {
        chaiServer.close(() => {
            console.log("Closing test server...");
        });
        done();
    })
})