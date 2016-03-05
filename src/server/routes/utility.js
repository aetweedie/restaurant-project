// define helper functions for validation
var res_queries = require('../restaurant_queries');
var rev_queries = require('../review_queries');


function validReviewer (req, res, next) {
  var reviewer = req.body.reviewer;
  rev_queries.getReviewsByResId(req.params.id).then(function(data) {
    console.log('first_data: ', data);
    return data.filter(function(review) {
      return review.reviewer === reviewer;
    });
  }).then(function(data) {
    console.log('data: ', data);
    if (data.length) {
      req.flash('message', {
      status: 'danger', value: 'Reviewer already exists.  Please try a different Restaurant.'
    });
      return next();
    } else {
      return next();
    }
  });
}






module.exports = {
  validReviewer: validReviewer
};
