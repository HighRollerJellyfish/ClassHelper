var knex = require('knex')({
  client: 'mysql',
  connection: {
    // These environment variables are defined in start.sh
    // Since this file will be committed to github and start.sh is in .gitignore,
    // it is better to code these environment variables than to hard-code your
    // information here.
    host: process.env.CLASSROOM_MYSQL_SERVER,
    user: process.env.CLASSROOM_MYSQL_USER,
    password: process.env.CLASSROOM_MYSQL_PASS,
    database: process.env.CLASSROOM_MYSQL_DB,
    charset: 'utf8'
  }
});

var bookshelf = module.exports = require('bookshelf')(knex);

