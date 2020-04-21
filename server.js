const express = require('express');
const helmet = require('helmet');

const Router = require('./data/project-router.js')

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/project', Router);

module.exports = server;
