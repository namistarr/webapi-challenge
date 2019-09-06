const express = require('express');

const server = express();

const projectRoutes = require('./routes/projectRoutes.js');

server.use('/projects', projectRoutes);

server.use('/', (req, res) => {
    res.send('I heard u like APIs...');
});

module.exports = server;