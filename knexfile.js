const path = require('path')

module.exports = {

  development: {
    client: 'pg',
    connection: {
      filename: path.resolve(__dirname, "learning-about-creating-api", "src", "database", "database.db")
    },
    migrations : {
      directory : path.resolve(__dirname, "learning-about-creating-api" ,"src", "database", "knex", "migrations")
    },
    useNullAsDefault : true
  }
};
