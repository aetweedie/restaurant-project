var knex = require('../../../db/knex');
function Restaurants () {
  return knex('restaurants');
}

module.exports = {
  // Selects
  getAllRestaurants: function() {
    // returns all restaurants in the database
    return Restaurants().select().then(function(data) {
      return data;
    });
  },
  getRestaurantAndRating: function(id) {
    // returns one restaurant and the average rating, specified by ID
    var coalesce = knex.raw('COALESCE(CAST(ROUND(AVG(reviews.rating)) AS INT), 0) AS rating');
    return Restaurants().select('*', coalesce).where('id', id)
      .rightJoin('reviews', 'restaurants.id', 'reviews.restaurant_id').then(function(data) {
        console.log(data);
        return data;
      });
  },
  editRestaurantById: function(id, body) {
    // edits one restaurant, specified by ID
    return Restaurants().where('id', id).update({
      name: body.name,
      address_city: body.address_city,
      address_state: body.address_state,
      cuisine: body.cuisine,
      image_url: body.image_url,
      description: body.description
    });
  },
  insertRestaurant: function(body) {
    // inserts one restaurant, using req.body for the data
    return Restaurants().insert({
      name: body.name,
      address_city: body.address_city,
      address_state: body.address_state,
      cuisine: body.cuisine,
      image_url: body.image_url,
      description: body.description
    }, 'id').then(function(data) {
      return data;
    });
  },
  deleteRestaurantById: function(id) {
    // deletes one restaurant, specified by ID
    return Restaurants().where('id', id).del();
  }
};
