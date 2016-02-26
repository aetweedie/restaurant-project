var express     = require('express');
var restaurant  = require('./utility');
var router      = express.Router();
var request     = require('request');

router.get('/', function(req, res, next) {



  res.render('index', restaurant.restaurants);
});

router.get('/restaurants/new', function(req, res, next) {
    res.render('new', {title: 'New Restaurant'});
});

router.get('/restaurants/:id/edit', function(req, res, next) {
    var id = req.params.id;
    res.render('edit', {restaurant: restaurant.restaurants.restaurants[id - 1]});
});

router.get('/restaurants/:id', function(req, res, next) {
    var id = req.params.id;
    res.render('show', {restaurant: restaurant.restaurants.restaurants[id - 1]});
});

router.get('/restaurants', function(req, res, next) {
    res.redirect('/');
});

module.exports = router;
