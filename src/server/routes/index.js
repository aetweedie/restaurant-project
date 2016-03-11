var express       = require('express');
var router        = express.Router();
var request       = require('request');
var helpers       = require('./utility');
var auth_helpers  = require('../lib/helpers');


function getRating (array) {
    var rating = array;
    var totalRating = 0;
    var numRatings = rating.length;
    rating.forEach(function(restaurant) {
        totalRating += restaurant.rating;
        return totalRating;
    });
    averageRating = Math.round(totalRating/numRatings).toFixed(0);
    if (isNaN(averageRating)) {
        averageRating = 0;
    }
    return averageRating;
}


/* Main Routes */

// send a GET request to the restaurants route to populate the index page.
router.get('/', function(req, res, next) {
    var flash = req.flash('message')[0];
    var user = req.user || '';
    console.log(user);
    var options = { method: 'GET',
        url: process.env.HOST + '/api/restaurants'
    };


    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.render('index', {restaurants: JSON.parse(body), title: 'gTables', message: flash, user: user[0]});
    });
});


/* Restaurant Page Routes */

// Render the new Restaurant page //

router.get('/restaurants/new', auth_helpers.ensureAdmin, function(req, res, next) {
  var flash = req.flash('message')[0];
  console.log(flash);
    res.render('restaurants/new', {title: 'New Restaurant', message: flash});
});

// Query the API to post the data to the database //

router.post('/restaurants/new', helpers.validRestaurant, function(req, res, next) {
    var options = { method: 'POST',
      url: process.env.HOST + '/api/restaurants/new',
      body:
       { name: req.body.name,
         address_city: req.body.location,
         address_state: req.body.state,
         cuisine: req.body.cuisine,
         image_url: req.body.image_url,
         description: req.body.description },
      json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      res.redirect('/');
    });
});


// Get data from API for specific restaurant id //
// and render the edit page with data filled in //

router.get('/restaurants/:id/edit', auth_helpers.ensureAdmin, function(req, res, next) {
    var id = req.params.id;
    var options = { method: 'GET',
        url: process.env.HOST + '/api/restaurants/'+id
    };


    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      res.render('restaurants/edit', {restaurant: JSON.parse(body)[0]});
    });
});

// Send edit information to the API PUT route for updates //

router.post('/restaurants/:id/edit', auth_helpers.ensureAdmin, function(req, res, next) {
    var id = req.params.id;
    var options = { method: 'PUT',
      url: process.env.HOST + '/api/restaurants/'+id+'/edit',
      body:
        {   name: req.body.name,
            address_city: req.body.location,
            address_state: req.body.state,
            cuisine: req.body.cuisine,
            image_url: req.body.image_url,
            description: req.body.description },
            json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      // redirect to the show page for the specific edited restaurant after editing.
      res.redirect('/restaurants/' + id);
    });
});


// query API for one restaurant and render the show page. //

router.get('/restaurants/:id', function(req, res, next) {
    var id = req.params.id;
    var flash = req.flash('message')[0];
    var user = req.user || '';
    var options = { method: 'GET',
        url: process.env.HOST + '/api/restaurants/'+id
    };

    // query GET request to API for restaurant information
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(flash);
        var options = { method: 'GET',
        url: process.env.HOST + '/api/reviews/'+id
      };
        // query GET request to API for reviews based on current restaurant ID.
        request(options, function (error, response, bod) {
          console.log(flash);
            if (error) throw new Error(error);
              var averageRating = getRating(JSON.parse(bod));
            // render show page with review and restaurant information.
            console.log(bod);
            res.render('restaurants/show', {
                restaurant: JSON.parse(body)[0],
                reviews: JSON.parse(bod),
                averageRating: JSON.parse(averageRating),
                message: flash,
                user: user[0]
              });
        });
    });
});


// send DELETE request to API to remove the specific row //

router.get('/restaurants/:id/delete', auth_helpers.ensureAdmin, function(req, res, next) {
    var id = req.params.id;
    var options = { method: 'DELETE',
      url: process.env.HOST + '/api/restaurants/'+id+'/delete'
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      // redirect to index page after deleting the restaurant.
      res.redirect('/');
    });
});


// redirect to index page if the base URL /restaurants is hit //
router.get('/restaurants', function(req, res, next) {
    res.redirect('/');
});






/* Review Page Routes */

// Format the date string to allow for values into the date field.
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


// add new review for a specific restaurant by ID. //
router.get('/restaurants/:id/reviews/new', auth_helpers.ensureAuthenticated, function(req, res, next) {
    var id = req.params.id;
    var now = new Date();
    var formattedDate = formatDate(now);
    console.log(formattedDate);
    var user = req.user[0] || '';
    console.log(user);
    var options = { method: 'GET',
        url: process.env.HOST + '/api/restaurants/'+id+'/reviews/new'};

    // query the API for the restaurant information that we are creating
    // the review for.
    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        // render the new review page with the restaurant information and the formatted Date string
        res.render('reviews/new', {restaurant: JSON.parse(body)[0], user: user, date: formattedDate});
    });
});

// send new review information to the database when submitting the new review form

router.post('/restaurants/:id/reviews/new', helpers.validReviewer, auth_helpers.ensureAuthenticated, function(req, res, next) {
    var id = req.params.id;
    var options = { method: 'POST',
      url: process.env.HOST + '/api/restaurants/'+id+'/reviews/new',
      body:
       { reviewer: req.body.reviewer,
         review_date: req.body.review_date,
         rating: req.body.rating,
         review: req.body.review,
         restaurant_id: id,
         user: req.user[0]
      }, json: true };
      console.log(req.body);

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      // redirect to the restaurant show page after adding the initial review.
      res.redirect('/restaurants/'+id);
    });
});


// send the edited information to the database for a specific restaurant ID and to
// update a specific review ID.

router.post('/restaurants/:id/reviews/:review_id/edit', auth_helpers.ensureAuthenticated, function(req, res, next) {
    var id = req.params.id;
    var review_id = req.params.review_id;

    var options = { method: 'PUT',
      url: process.env.HOST + '/api/restaurants/'+id+'/reviews/'+review_id+'/edit',
      body:
        {   reviewer: req.body.reviewer,
            review_date: req.body.review_date,
            review: req.body.review,
            rating: req.body.rating,
            restaurant_id: id,
            user: req.user[0] },
            json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      // redirect to the show page after editing the review.
      res.redirect('/restaurants/' + id);
    });
});

// get the restaurant information for a specific restaurant in order to
// be able to pull the information in to populate the edit reviews page.
router.get('/restaurants/:id/reviews/:review_id/edit', auth_helpers.ensureAuthenticated, function(req, res, next) {
    var id = req.params.id;
    var user = req.user[0] || '';
    console.log('User: ', user);
    var review_id = req.params.review_id;
    var options = { method: 'GET',
        url: process.env.HOST + '/api/restaurants/'+id
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var options = { method: 'GET',
        url: process.env.HOST + '/api/review/'+review_id};

        request(options, function (error, response, bod) {
            if (error) throw new Error(error);

            // format the review_date to take off time entries.
            console.log(JSON.parse(bod));
            var review_date = JSON.parse(bod)[0].review_date.split('T')[0];
            // render the reviews edit page with the restaurant information and the review information.
            res.render('reviews/edit', {restaurant: JSON.parse(body)[0], user: user, review: JSON.parse(bod)[0], review_date: review_date});
        });

    });
});



module.exports = router;
