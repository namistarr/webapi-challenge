const express = require('express');

const server = express();

const projectRoutes = require('./routes/projectRoutes.js');
const actionRoutes = require('./routes/actionRoutes.js');

server.use('/projects', projectRoutes);
server.use('/actions', actionRoutes);

server.use('/', (req, res) => {
    res.send('I heard u like APIs...');
});

module.exports = server;