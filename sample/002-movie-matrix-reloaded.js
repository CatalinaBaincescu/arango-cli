
module.exports = (db) => {
  const graphName = 'Matrix';

  const graph = db.graph(graphName);
  const movie = graph.vertexCollection('Movie');
  const person = graph.vertexCollection('Person');

  const actedIn = graph.edgeCollection('ActedIn');
  const directed = graph.edgeCollection('Directed');
  const produced = graph.edgeCollection('Produced');

  return Promise.all([
    movie.save({
      _key: 'M2',
      title: 'The Matrix Reloaded',
      released: 2003,
      tagline: 'Free your mind',
    }),
  ])
    .then(() => {
      return Promise.all([

        actedIn.save({roles: ['Neo']}, 'Person/P1', 'Movie/M2'),
        actedIn.save({roles: ['Trinity']}, 'Person/P2', 'Movie/M2'),
        actedIn.save({roles: ['Morpheus']}, 'Person/P3', 'Movie/M2'),
        actedIn.save({roles: ['Agent Smith']}, 'Person/P4', 'Movie/M2'),

        directed.save({}, 'Person/P5', 'Movie/M2'),
        directed.save({}, 'Person/P6', 'Movie/M2'),

        produced.save({}, 'Person/P7', 'Movie/M2'),
      ]);

    });
};
