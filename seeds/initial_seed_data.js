
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('restaurants').del(),

    // Inserts seed entries
    knex('restaurants').insert({name: 'McDonalds', address_city: 'Littleton', address_state: 'CO', cuisine: 'American', image_url: 'burger.png', description: 'This extravagant restaurant caters the finest American cuisine for a fraction of the price of anywhere else!'}),
    knex('restaurants').insert({name: 'Pizza Hut', address_city: 'Dacono', address_state: 'CO', cuisine: 'Italian', image_url: 'italian.png', description: 'This Pizza Hut is excellent! Some of the finest Italian food that $3 can buy.'}),
    knex('restaurants').insert({name: 'Taco Bell', address_city: 'Denver', address_state: 'CO', cuisine: 'Mexican', image_url: 'mexican.png', description: 'The best non-authentic Mexican food that you can buy.'}),
    knex('restaurants').insert({name: 'Pho99', address_city: 'Portland', address_state: 'OR', cuisine: 'Vietnamese', image_url: 'pho.jpg', description: 'The best Pho in town.'}),
    knex('restaurants').insert({name: 'Thai Kitchen', address_city: 'Centennial', address_state: 'CO', cuisine: 'Thai', image_url: 'thai.jpg', description: 'If you like Thai Food, be sure to swing by!'}),
    knex('restaurants').insert({name: 'Maggianos', address_city: 'Denver', address_state: 'CO', cuisine: 'Italian', image_url: 'italian.png', description: 'The actual best Italian food in Denver.  Be prepared to be amazed!'})
  );
};
