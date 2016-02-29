var express     = require('express');
var restaurant  = require('./utility');
var router      = express.Router();
var pg          = require('pg');

// connect to env.DATABASE_URL or localhost
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/gtables';
console.log(connectionString);

// get one restaurant or all restaurants from database.
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
            var query = client.query('SELECT restaurants.name, image_url, address_city, address_state, COALESCE(CAST(ROUND(AVG(reviews.rating)) AS INT), 0) AS rating, description, restaurants.id, cuisine FROM restaurants LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id GROUP BY restaurants.name, image_url, address_city, address_state, description, restaurants.id');
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

// send a new restaurant into the database
router.post('/restaurants/new', function(req, res, next) {
    var newRestaurant = req.body;
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.status(500).json({status: 'Error', message: 'Couldn\'t retrieve restaurants'});
            done();
        };

        var query = client.query("INSERT INTO restaurants (name, address_city, address_state, cuisine, image_url, description) VALUES ('"+newRestaurant.name+"', '"+newRestaurant.address_city+"', '"+newRestaurant.address_state+"', '"+newRestaurant.cuisine+"',  '"+newRestaurant.image_url+"', '"+newRestaurant.description+"')");

        query.on('end', function() {
            done();
            res.json({message: 'Restaurant inserted successfully!'});
            pg.end();
        });
    });
});


// edit an existing restaurant, by ID.
router.put('/restaurants/:id/edit', function(req, res, next) {
    var editRestaurant = req.body;
    console.log('form info:',editRestaurant);
    var id = req.params.id;
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.status(500).json({status: 'Error', message: 'Couldn\'t retrieve restaurants'});
            done();
        };
        var query = client.query("UPDATE restaurants SET name = '"+editRestaurant.name+"', address_city = '"+editRestaurant.address_city+"', address_state = '"+editRestaurant.address_state+"', cuisine = '"+editRestaurant.cuisine+"', image_url = '"+editRestaurant.image_url+"', description = '"+editRestaurant.description+"' WHERE id = "+id);
        query.on('end', function() {
            done();
            res.json({message: 'Restaurant Updated successfully!'});
            pg.end();
        });
    });
});

// delete a specific restaurant, by ID
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

// get all reviews or one review, by restaurant ID with optional parameter.
router.get('/reviews/:id?', function(req, res, next) {
    var id = req.params.id;
    pg.connect(connectionString, function(err, client, done) {
        var reviewArr = [];
        if (err) {
            res.status(500).json({message: 'Reviews not found'});
        }
        if (id) {
            var query = client.query('SELECT * FROM reviews WHERE restaurant_id = '+id);
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

// get one review by review ID.
router.get('/review/:review_id', function(req, res, next) {
    var id = req.params.review_id;
    pg.connect(connectionString, function(err, client, done) {
        var reviewArr = [];
        if (err) {
            res.status(500).json({message: 'Reviews not found'});
        }
        var query = client.query('SELECT * FROM reviews WHERE id = '+id);

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

// get a specific restaurant to make a new review for it
router.get('/restaurants/:id/reviews/new', function(req, res, next) {
    var id = req.params.id;
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.status(500).json({message: 'Restaurant not found'});
        }

        var reviewArr = [];
        var query = client.query('SELECT * FROM restaurants WHERE id = '+id);

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


// insert new review into database for specific restaurant, by ID
router.post('/restaurants/:id/reviews/new', function(req, res, next) {
    var id = req.params.id;
    console.log(id);
    var newReview = req.body;
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.status(500).json({message: 'Reviews not found'});
        }

        console.log("INSERT INTO reviews (reviewer, review_date, rating, review, restaurant_id) VALUES ('"+newReview.reviewer+"', '"+newReview.review_date+"', "+newReview.rating+", '"+newReview.review+"', "+id+")");
        var query = client.query("INSERT INTO reviews (reviewer, review_date, rating, review, restaurant_id) VALUES ('"+newReview.reviewer+"', '"+newReview.review_date+"', "+newReview.rating+", '"+newReview.review+"', "+id+")");

        query.on('end', function() {
            done();
            res.json({message: 'Review successfully added.'});
            pg.end();
        });
    });
});


// edit a review, by review ID, for a specific restaurant, by ID.
router.put('/restaurants/:id/reviews/:review_id/edit', function(req, res, next) {
    var editReview = req.body;
    var id = req.params.id;
    var review_id = req.params.review_id;

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.status(500).json({status: 'Error', message: 'Couldn\'t retrieve restaurants'});
            done();
        };
        var query = client.query("UPDATE reviews SET reviewer = '"+editReview.reviewer+"', review_date = '"+editReview.review_date+"', rating = "+Number(editReview.rating)+", review = '"+editReview.review+"', restaurant_id = "+id+" WHERE id = "+review_id);

        query.on('end', function() {
            done();
            res.json({message: 'Review Updated successfully!'});
            pg.end();
        });
    });
});



module.exports = router;