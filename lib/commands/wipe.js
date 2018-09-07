const r = require('ramda');

module.exports = (db) => () => {
  return db.graphs()
    .then(((graphs) => {
      return Promise.all(r.map((graph) => {
        const Graph = db.graph(graph.name);
        return Graph.drop(true);
      }, graphs));
    }))
    .then(() => {
      return db.collections()
        .then((collections) => {
          return Promise.all(r.map((collection) => {
            const Collection = db.collection(collection.name);
            return Collection.drop();
          }, collections));
        });
    })
    .then(() => console.log('All collections/graphs were removed from db '))
    .catch((error) => {
      console.error('Unexpected error wiping database');
      console.error(error);
    })
    .then(() => {
      process.exit(0);
    })

};