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

      res.render('index', {restaurants: JSON.parse(body), title: 'gTables'});
    });
});

router.get('/restaurants/new', function(req, res, next) {
    res.render('new', {title: 'New Restaurant'});
});

router.post('/restaurants/new', function(req, res, next) {
    var replaceApostrophe = /'/g;
    req.body.description = String(req.body.description).replace(replaceApostrophe, "''");
    var options = { method: 'POST',
      url: 'http://localhost:5000/api/restaurants/new',
      body:
       { name: req.body.name,
         address_city: req.body.location,
         address_state: req.body.state,
         cuisine: req.body.cuisine,
         rating: req.body.rating,
         image_url: req.body.image_url,
         description: req.body.description },
      json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      // console.log(body);
      res.redirect('/');
    });

})

router.get('/restaurants/:id/edit', function(req, res, next) {
    var id = req.params.id;
    var options = { method: 'GET',
        url: 'http://localhost:5000/api/restaurants/'+id
    };


    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      // console.log(JSON.parse(body));
      res.render('edit', {restaurant: JSON.parse(body)[0]});
    });
});

router.post('/restaurants/:id/editRes', function(req, res, next) {
    var id = req.params.id;
    var replaceApostrophe = /'/g;
    req.body.description = String(req.body.description).replace(replaceApostrophe, "''");
    // console.log(req.body);
    var options = { method: 'PUT',
      url: 'http://localhost:5000/api/restaurants/'+id+'/edit',
      body:
        {   name: req.body.name,
            address_city: req.body.location,
            address_state: req.body.state,
            cuisine: req.body.cuisine,
            rating: req.body.rating,
            image_url: req.body.image_url,
            description: req.body.description },
            json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      res.redirect('/restaurants/' + id);
    });
})

router.get('/restaurants/:id', function(req, res, next) {
    var id = req.params.id;
    var options = { method: 'GET',
        url: 'http://localhost:5000/api/restaurants/'+id
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var options = { method: 'GET',
        url: 'http://localhost:5000/api/reviews'};

        request(options, function (error, response, bod) {
            if (error) throw new Error(error);

            res.render('show', {restaurant: JSON.parse(body)[0], reviews: JSON.parse(bod)})
        });

    });
});

router.get('/restaurants/:id/delete', function(req, res, next) {
    var id = req.params.id;
    var options = { method: 'DELETE',
      url: 'http://localhost:5000/api/restaurants/'+id+'/delete'
    }

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      // console.log(body);
      res.redirect('/');
    });
});

router.get('/restaurants', function(req, res, next) {
    res.redirect('/');
});



module.exports = router;
