
# OpenAPI Generated JavaScript/Express Server

## Overview
This server was generated using the [OpenAPI Generator](https://openapi-generator.tech) project and then implemented by me.  It is still a work in progress.  Latest feautres:  
- Added a transient "database" to the app for demo purposes, DataService.js, along with some baseline products to seed the database.
- Add/create a new product in the ManagerController
- Get all available products in the ShopperController or ManagerController
- Delete a product in the ManagerController

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
