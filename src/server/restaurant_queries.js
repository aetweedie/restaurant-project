var knex = require('../../../db/knex');
function Restaurants () {
  return knex('restaurants');
}

module.exports = {

};
