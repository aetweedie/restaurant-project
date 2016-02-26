var express     = require('express');
var restaurant  = require('./utility');
var router      = express.Router();
var request     = require('request');

router.get('/', function(req, res, next) {

    var options = { method: 'GET',
        url: 'http://localhost:5000/api/restaurants'
    }

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
      res.render('index', {restaurants: JSON.parse(body), title: 'gTables'});
    });


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
