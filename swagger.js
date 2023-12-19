// swagger.js

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SWAPI Express API',
            version: '1.0.0',
            description: 'Enhanced SWAPI with search, sort, and caching features',
        },
    },
    apis: ['./index.js'], // Point to the main entry file of your Express app
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };
