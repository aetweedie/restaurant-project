var express     = require('express');
var restaurant  = require('./utility');
var router      = express.Router();
var pg          = require('pg');


var connectionString = 'postgres://localhost:5432/gtables';


router.get('/restaurants/:id?', function(req, res, next) {
    var id = req.params.id;
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
        if (id) {
            var query = client.query('SELECT * FROM restaurants WHERE id = '+id);
        } else {
            var query = client.query('SELECT * FROM restaurants ORDER BY name');
        }

        query.on('row', function(row) {
            newArr.push(row);
        });
        query.on('end', function() {
            done();
            if (newArr.length > 0) {
                res.json(newArr);
            } else {
                res.status(500).json({status: 'Error', message: 'Restaurants Empty.'})
            }
            pg.end();
        });
    });
});

router.post('/restaurants/new', function(req, res, next) {
    var newRestaurant = req.body;
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.status(500).json({status: 'Error', message: 'Couldn\'t retrieve restaurants'});
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

router.put('/restaurants/:id/edit', function(req, res, next) {
    var editRestaurant = req.body;
    console.log('form info:',editRestaurant);
    var id = req.params.id;
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.status(500).json({status: 'Error', message: 'Couldn\'t retrieve restaurants'});
            done();
        };
        var query = client.query("UPDATE restaurants SET name = '"+editRestaurant.name+"', address_city = '"+editRestaurant.address_city+"', address_state = '"+editRestaurant.address_state+"', cuisine = '"+editRestaurant.cuisine+"', rating = "+Number(editRestaurant.rating)+", image_url = '"+editRestaurant.image_url+"', description = '"+editRestaurant.description+"' WHERE id = "+id);
        query.on('end', function() {
            done();
            res.json({message: 'Restaurant Updated successfully!'});
            pg.end();
        });
    });
});


router.delete('/restaurants/:id/delete', function(req, res, next) {
    var id = req.params.id;
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.status(500).json({status: 'Error', message: 'Couldn\'t retrieve restaurants'});
            done();
        };

        var query = client.query('DELETE FROM restaurants WHERE id = '+id);

        query.on('end', function() {
            done();
            res.json({message: 'Restaurant deleted successfully!'});
            pg.end();
        });
    });
});


router.get('/reviews/:id?', function(req, res, next) {
    var id = req.params.id;
    pg.connect(connectionString, function(err, client, done) {
        var reviewArr = [];
        if (err) {
            res.status(500).json({message: 'Reviews not found'});
        }
        if (id) {
            var query = client.query('SELECT * FROM reviews WHERE id = '+id);
        } else {
            var query = client.query('SELECT * FROM reviews');
        }

        query.on('row', function(row) {
            reviewArr.push(row);
        });

        query.on('end', function() {
            done();
            res.json(reviewArr);
            pg.end();
        });
    });
});



module.exports = router;