
# OpenAPI Generated JavaScript/Express Server

## Overview
This server was generated using the [OpenAPI Generator](https://openapi-generator.tech) project and then implemented by me.  It is still a work in progress.  For now, it is just a simple API where each endpoint returns the request object plus a message.  The swagger spec was taken from this Java project: [Spring Boot Store Demo](https://github.com/jump-kick/springboot-store-demo).  

Navigate to [localhost:8080/swagger-ui](http://localhost:8080/swagger-ui) for the REST endpoints.

This is demo of a REST API that controls an online shopping system. Coming soon: A client can use the manager endpoints to create and update products and apply deals. Using the shopper endpoints, you can add products (created by the manager endpoints) to your basket, update your basket, and get the total. The basket automatically calculates any deals that the manager has activated.

### prerequisites
- NodeJS >= 10.6
- NPM >= 6.10.0

### Running the server
You can use
```
npm start
```
to install the packages and start the server.
