var express = require('express');
var restaurant = require('../routes/utility');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', restaurant.restaurants);
});

router.get('/new', function(req, res, next) {
    res.render('new', {title: 'New Restaurant'});
});

router.get('/edit', function(req, res, next) {
    res.render('edit', {restaurant: restaurant.restaurants.restaurants[0]});
});

router.get('/show', function(req, res, next) {
    res.render('show', {restaurant: restaurant.restaurants.restaurants[0]});
});

module.exports = router;
