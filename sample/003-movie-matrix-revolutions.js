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
      _key: 'M3',
      title: 'The Matrix Revolutions',
      released: 2003,
      tagline: 'Everything that has a beginning has an end',
    }),
  ])
    .then(() => {
      return Promise.all([

        actedIn.save({roles: ['Neo']}, 'Person/P1', 'Movie/M3'),
        actedIn.save({roles: ['Trinity']}, 'Person/P2', 'Movie/M3'),
        actedIn.save({roles: ['Morpheus']}, 'Person/P3', 'Movie/M3'),
        actedIn.save({roles: ['Agent Smith']}, 'Person/P4', 'Movie/M3'),

        directed.save({}, 'Person/P5', 'Movie/M3'),
        directed.save({}, 'Person/P6', 'Movie/M3'),

        produced.save({}, 'Person/P7', 'Movie/M3'),
      ]);

    });
};