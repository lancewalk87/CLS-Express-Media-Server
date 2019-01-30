#!/usr/bin/env node
/*
|-------------------------------------------------------------------
| www.js
| ShopCaster: Server
| ShopCaster-Server>bin>www.js
|-------------------------------------------------------------------
| Created by Lance T. Walker on 8/31/18.
| Copyright ShopCaster. All rights reserved.
*/

// ## Node Packages:
const http = require('http'), debug = require('debug')('server');

// ## Server Configuration
var backend = require('./backend.js'),
    backend_port = normalizePort(process.env.PORT || '3000');
backend = backend.main;
backend.set('port', backend_port);
