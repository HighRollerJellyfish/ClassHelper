var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_PORT_3306_TCP_ADDR || '127.0.0.1',
    user: 'root',
    password: '',
    database: 'classroom',
    charset: 'utf8'
  }
});

var bookshelf = module.exports = require('bookshelf')(knex);
