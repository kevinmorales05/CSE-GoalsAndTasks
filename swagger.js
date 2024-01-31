const swaggerAutoGen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Goals and Tasks API',
        description: 'Goals and Tasks Api'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutoGen(outputFile, endpointsFiles, doc);