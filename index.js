require('dotenv').config();
const { createServer } = require('./server')

const app = createServer();

const server = app.listen('3000', () => {
    console.log('Server now listen on localhost:3000, on developpement');
});