var knex = require('../../db/knex');
function Reviews () {
  return knex('reviews');
}

module.exports = {
  getAllReviews: function() {
    // returns all reviews
    return Reviews().select().then(function(data) {
      return data;
    });
  },
  getReviewsByResId: function(res_id) {
    // returns all reviews for one restaurant, specified by restaurant ID
    return Reviews().select().where('restaurant_id', res_id).orderBy('rating', 'desc').then(function(data) {
      return data;
    });
  },
  getReviewById: function(id) {
    // returns one review,specified by ID
    return Reviews().select().where('id', id).then(function(data) {
      return data;
    });
  },
  insertReview: function(res_id, body) {
    // inserts new review into DB for specific restaurant, by restaurant_ID
    return Reviews().insert({
      reviewer: body.reviewer,
      review_date: body.review_date,
      rating: body.rating,
      review: body.review,
      restaurant_id: res_id,
      user_id: body.user.id
    }, 'id').then(function(data) {
      return data;
    }).catch(function(err) {
      console.log(err);
      return err;
    });
  },
  editReview: function(res_id, id, body) {
    // updates one review with restaurant_id and req.body, specified by ID.
    return Reviews().where('id', id).update({
      reviewer: body.reviewer,
      review_date: body.review_date,
      rating: body.rating,
      review: body.review
    });
  }
};
