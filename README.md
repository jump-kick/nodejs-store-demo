
# OpenAPI Generated JavaScript/Express Server

## Overview
This server was generated using the [OpenAPI Generator](https://openapi-generator.tech) project and then implemented by me.  It is still a work in progress.  Latest feautres:  
- Started implementing the getTotal endpoint
- Implemented the add to basket endpoint
- Implemented the GET Available Deals endpoint
- Added API versioning to the URL paths
- Added more unit tests and input validation for the API endpoints
- Added a transient "database" to the app for demo purposes, DataService.js, along with some baseline products to seed the database.
- Add/create a new product in the ManagerController
- Get all available products in the ShopperController or ManagerController
- Delete a product in the ManagerController
- Edit a product (name, description, or price) in the ManagerController

For now, the other endpoints return a success message.  The swagger spec was taken from this Java project: [Spring Boot Store Demo](https://github.com/jump-kick/springboot-store-demo).  

Navigate to [localhost:8080/swagger-ui](http://localhost:8080/swagger-ui) for the REST endpoints.

This is a demo of a REST API that controls an online shopping system. Coming soon: A client can use the manager endpoints to update products and apply deals. Using the shopper endpoints, you can add products (created by the manager endpoints) to your basket, update your basket, and get the total. The basket automatically calculates any deals that the manager has activated.

### prerequisites
- NodeJS >= 10.6
- NPM >= 6.10.0

### Running the server
You can use
```
npm start
```
to install the packages and start the server.

### Running the Unit tests
You can use
```
npm test
```
to run the mocha/chai tests.
