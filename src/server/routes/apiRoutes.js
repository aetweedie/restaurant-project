var express     = require('express');
var restaurant  = require('./utility');
var router      = express.Router();
var pg          = require('pg');


var connectionString = 'postgres://localhost:5432/gTables';

