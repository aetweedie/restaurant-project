var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    restaurants: [ {name: 'McDonalds', image: 'burger.png'}, {name: 'Pizza Hut',
    image: 'italian.png'}, {name: 'Taco Bell', image: 'mexican.png'}, {name: 'Pho99',
    image: 'pho.jpg'}, {name: 'Thai Kitchen', image: 'thai.jpg'}, {name: 'Maggianos',
    image: 'italian.png'}], title: 'gTables'
   });
});

router.get('/new', function(req, res, next) {
    res.render('new', {title: 'New Restaurant'});
});

router.get('/edit', function(req, res, next) {
    res.render('edit', {restaurant: {name: 'McDonalds'}});
});

router.get('/show', function(req, res, next) {
    res.render('show', {title: 'gTables!'});
});

module.exports = router;
