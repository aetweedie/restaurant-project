
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('reviews').del(),

//('Mike Dee', '2015-02-26', 4.2, 'I absolutely love the chicken here!  It''s fantasic!', 1);
    // Inserts seed entries
    knex('reviews').insert({reviewer: 'Mike Dee', review_date: '2015-02-26', rating: 3, review: 'I absolutely love the chicken here.  Top notch.', restaurant_id: 1}),
    knex('reviews').insert({reviewer: 'Ronald McDonald', review_date: '2016-01-20', rating: 5, review: 'This place is literally heaven on Earth.', restaurant_id: 2}),
    knex('reviews').insert({reviewer: 'Greg House', review_date: '2015-07-15', rating: 4, review: 'I absolutely love going to Taco Bell.  I take Foreman, Taub, Chase, and Cuddy here all the time.', restaurant_id: 3})
  );
};
