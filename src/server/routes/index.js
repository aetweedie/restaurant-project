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
    res.render('edit', {restaurant: {name: 'McDonalds'}});
});

router.get('/show', function(req, res, next) {
    res.render('show', {restaurant: {
        name: 'McDonalds',
        image: 'burger.png',
        location: 'Littleton',
        cuisine: 'American',
        state: 'CO',
        desc: 'This extravagant restaurant caters the finest American cuisine for a fraction of the price of anywhere else!',
        rating: [1, 2, 3, 4, 5]
    }});
});

module.exports = router;
