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






module.exports = {
  validReviewer: validReviewer
};
