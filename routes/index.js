const routes = require('express').Router()
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const header_validation = require('../middlewares/header_validation')


const tabs = require('./tab')


routes.use('/tabs', header_validation, tabs);

// Swagger set up
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "Climedo API",
            version: "1.0.0",
            description:
                "This application offers a simple REST api for add, updating, deleting and fetching tabs"
        },
        servers: [
            {
                url: "http://localhost:3000/tabs"
            }
        ]
    },
    apis: ['./docs/*.yml']
};
const specs = swaggerJsdoc(options)
routes.use("/docs", swaggerUi.serve)
routes.get("/docs", swaggerUi.setup(specs, { explorer: true }))

module.exports = routes