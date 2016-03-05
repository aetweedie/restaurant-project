var express     = require('express');
var restaurant  = require('./utility');
var router      = express.Router();
var pg          = require('pg');
var res_queries = require('../restaurant_queries');
var rev_queries = require('../review_queries');
var helpers      = require('./utility');

// connect to env.DATABASE_URL or localhost
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/gtables';

// get one restaurant or all restaurants from database.
router.get('/restaurants/:id?', function(req, res, next) {
    var id = req.params.id;
    if (id) {
      res_queries.getRestaurant(id).then(function(data) {
        res.json(data);
      });
    } else {
      res_queries.getRestaurantAndRating().then(function(data) {
        res.json(data);
      });
    }
});

// send a new restaurant into the database
router.post('/restaurants/new', function(req, res, next) {
    res_queries.insertRestaurant(req.body).then(function() {
      res.send('Success');
    });
});

// edit an existing restaurant, by ID.
router.put('/restaurants/:id/edit', function(req, res, next) {
    var id = req.params.id;
    res_queries.editRestaurantById(id, req.body).then(function() {
      res.send('Success');
    });
});

// delete a specific restaurant, by ID
router.delete('/restaurants/:id/delete', function(req, res, next) {
    var id = req.params.id;
    res_queries.deleteRestaurantById(id).then(function() {
      res.send('Success');
    });
});

// get all reviews by restaurant ID
router.get('/reviews/:id?', function(req, res, next) {
    var id = req.params.id;
      rev_queries.getReviewsByResId(id).then(function(data) {
        console.log(data);
        res.json(data);
      });
    });


// get one review by review ID.
router.get('/review/:review_id', function(req, res, next) {
    var id = req.params.review_id;
    rev_queries.getReviewById(id).then(function(data) {
      res.json(data);
    });
});

// get a specific restaurant to make a new review for it
router.get('/restaurants/:id/reviews/new', function(req, res, next) {
    var id = req.params.id;
    res_queries.getRestaurant(id).then(function(data) {
      res.json(data);
    });
});


// insert new review into database for specific restaurant, by ID
router.post('/restaurants/:id/reviews/new', function(req, res, next) {
    var id = req.params.id;
      rev_queries.insertReview(id, req.body).then(function() {
        res.send('success');
      });
});


// edit a review, by review ID, for a specific restaurant, by ID.
router.put('/restaurants/:id/reviews/:review_id/edit', function(req, res, next) {
    var id = req.params.id;
    var review_id = req.params.review_id;

    rev_queries.editReview(id, review_id, req.body).then(function() {
      res.send('Success');
    });
});



module.exports = router;
