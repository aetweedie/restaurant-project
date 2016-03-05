
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('reviews').del(),

//('Mike Dee', '2015-02-26', 4.2, 'I absolutely love the chicken here!  It''s fantasic!', 1);
    // Inserts seed entries
    knex('reviews').insert({id: 1, reviewer: 'Mike Dee', review_date: '2015-02-26', rating: 3, review: 'I absolutely love the chicken here.  Top notch.'}),
    knex('reviews').insert({id: 2, reviewer: 'Ronald McDonald', review_date: '2016-01-20', rating: 5, review: 'This place is literally heaven on Earth.'}),
    knex('reviews').insert({id: 3, reviewer: 'Greg House', review_date: '2015-07-15', rating: 4, review: 'I absolutely love going to Taco Bell.  I take Foreman, Taub, Chase, and Cuddy here all the time.'})
  );
};
