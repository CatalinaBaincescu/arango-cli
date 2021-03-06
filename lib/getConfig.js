const fs = require('fs');

module.exports = () => {
  // Check if we have a user defined config
  // This could return an object or a promise
  if( fs.existsSync(`${process.cwd()}/migrations/config.js`) ) {
    return Promise.resolve(require(`${process.cwd()}/migrations/config`))
  }

  // If not, we'll use the default config values
  return Promise.resolve({
    url: 'http://127.0.0.1:8529',
    dbName: 'dbName',
    username: 'myUsername',
    password: 'myPassword',
  });
};