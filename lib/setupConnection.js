const Database = require('arangojs').Database;

module.exports = (config) => {
  const db = new Database(config.url);

  db.useDatabase(config.dbName);
  db.useBasicAuth(config.credentials.username, config.credentials.password);

  db.get()
    .catch(() => {
      console.log('Unable to connect, please check your credentials.');
      process.exit(0);
    });

  return db;
};