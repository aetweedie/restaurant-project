var express     = require('express');
var restaurant  = require('./utility');
var router      = express.Router();
var pg          = require('pg');


var connectionString = 'postgres://localhost:5432/gtables';


router.get('/restaurants', function(req, res, next) {
    pg.connect(connectionString, function(err, client, done) {
        var newArr = [];
        if (err) {
            res.status(500)
                .json({
                    status: 'Error',
                    message: 'Something bad happened'
                });
            done();
        };
        var query = client.query('SELECT * FROM restaurants');

        query.on('row', function(row) {
            newArr.push(row);
        });
        query.on('end', function() {
            done();
            if (newArr.length > 0) {
                res.json(newArr);
            } else {
                res.json({status: 'Error', message: 'Restaurants Empty.'})
            }
            pg.end();
        });
    });
});

router.post('/restaurants/new', function(req, res, next) {
    var newRestaurant = req.body;
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.status(500).json({status: 'Error', message: 'Couldn\'t retrieve wines'});
            done();
        };

        var query = client.query("INSERT INTO restaurants (name, address_city, address_state, cuisine, rating, image_url, description) VALUES ('"+newRestaurant.name+"', '"+newRestaurant.address_city+"', '"+newRestaurant.address_state+"', '"+newRestaurant.cuisine+"', "+newRestaurant.rating+", '"+newRestaurant.image_url+"', '"+newRestaurant.description+"')");

        query.on('end', function() {
            done();
            res.json({message: 'Restaurant inserted successfully!'});
            pg.end();
        });
    });
});


module.exports = router;