var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.CLASSROOM_MYSQL_SERVER || '127.0.0.1',
    user: 'root',
    password: process.env.CLASSROOM_MYSQL_PASSWORD || 'password',
    database: process.env.CLASSROOM_MYSQL_DB || 'classroom',
    charset: 'utf8'
  }
});

var bookshelf = module.exports = require('bookshelf')(knex);
