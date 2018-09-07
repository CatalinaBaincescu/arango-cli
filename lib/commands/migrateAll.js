const r = require('ramda');
const readDir = require('fs').readdirSync;

const basePath = process.cwd();
const migrations = readDir(`${basePath}/migrations`);

module.exports = (db) => () => {
  const collection = db.collection('ArangoMigration');

  const updateDatabaseStatus = (filename) => {
    const id = r.head(r.match(/([0-9]+)?/, filename));
    return collection.save({ _key: id }, { overwrite: true });
  };

  collection.all()
    .catch((err) => {
      if(err.statusCode === 404) {
        return collection.create()
          .then(() => collection.all())
      }
      return Promise.reject(err);
    })
    .then((result) => {
      const docs = result._result;
      const documents = r.sort((a, b) => a._key - b._key, docs);
      // get the latest migration from ArangoMigration
      const lastMigration = r.length(documents) === 0 ? 0 : documents[r.length(documents) - 1]._key;
      const validMigrations = r.filter((filename) => {
        if(filename === 'config.js') {
          return false;
        }

        return r.head(r.match(/([0-9]+)?/, filename)) > lastMigration;
      })(migrations);

      // Run the migrations one after the other
      // This is important, as they might depend on previous migrations
      return r.reduce((promise, filename) => {
        const migration = require(`${basePath}/migrations/${filename}`);

        return promise
          .then(() => migration(db)
            .then(() => updateDatabaseStatus(filename))
          )
      }, Promise.resolve(), validMigrations);
    })
    .then(() => console.log('Successfully ran all migrations'))
    .catch((error) => {
      console.error('Unexpected error running migrations');
      console.error(error);
    })
    .then(() => {
      process.exit(0);
    });
};
