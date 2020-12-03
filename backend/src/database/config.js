const path = require('path');

const config = {
  client: 'sqlite3',

  connection: {
    filename: path.resolve(__dirname, 'dblibrary.sqlite')
  },

  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  },

  useNullAsDefault: true
}

module.exports = config;