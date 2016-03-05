var knex = require('../../db/knex');
function Restaurants () {
  return knex('restaurants');
}

module.exports = {
  // Selects
  getRestaurant: function(id) {
    // returns one restaurant, specified by ID
    return Restaurants().select().where('id', id).then(function(data) {
      return data;
    });
  },
  getRestaurantAndRating: function() {
    // returns all restaurants and their average rating
    return knex.raw('SELECT restaurants.name, image_url, address_city, address_state, COALESCE(CAST(ROUND(AVG(reviews.rating)) AS INT), 0) AS rating, description, restaurants.id, cuisine FROM restaurants LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id GROUP BY restaurants.name, image_url, address_city, address_state, description, restaurants.id ORDER BY restaurants.name')
      .then(function(data) {
        return data.rows;
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
