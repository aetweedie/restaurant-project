// define helper functions for validation
var res_queries = require('../restaurant_queries');
var rev_queries = require('../review_queries');


function validReviewer (req, res, next) {
  var reviewer = req.body.reviewer;
  rev_queries.getReviewsByResId(req.params.id).then(function(data) {
    return data.filter(function(review) {
      return review.reviewer.toLowerCase() === reviewer.toLowerCase();
    });
  }).then(function(data) {
    console.log('data: ', data);
    if (!data.length) {
      req.flash('message', {
        status: 'success', value: 'Thanks for your review.'
      });
      next();
    } else {
      req.flash('message', {
        status: 'danger', value: 'Reviewer already exists.  Please try a different Restaurant.'
      });
      res.redirect('/restaurants/'+req.params.id);
    }
  });
}

function validRestaurant (req, res, next) {
  var res_name = req.body.name;
  res_queries.getRestaurantAndRating().then(function(data) {
    var newData = data.filter(function(restaurant) {
      return restaurant.name.toLowerCase() === res_name.toLowerCase();
    });
    if(!newData.length) {
      req.flash('message', {
        status: 'success', value: 'Restaurant added successfully.'
      });
      next();
    } else {
      req.flash('message', {
        status: 'danger', value: 'Restaurant already exists.  Please try again.'
      });
      console.log(req.body);
      res.render('../views/restaurants/new', {title: 'New Restaurant', message: req.flash('message')[0], restaurant: req.body});
    }
  });
}





module.exports = {
  validReviewer: validReviewer,
  validRestaurant: validRestaurant
};
