module.exports = (db) => {
  const graphName = 'Matrix';

  const graph = db.graph(graphName);

  return graph.create({
    edgeDefinitions: [
      {
        collection: 'ActedIn',
        from: ['Person'],
        to: ['Movie']
      },
      {
        collection: 'Directed',
        from: ['Person'],
        to: ['Movie']
      },
      {
        collection: 'Produced',
        from: ['Person'],
        to: ['Movie']
      },
    ]
  })

    .then(() => {

      const movie = graph.vertexCollection('Movie');
      const person = graph.vertexCollection('Person');

      const actedIn = graph.edgeCollection('ActedIn');
      const directed = graph.edgeCollection('Directed');
      const produced = graph.edgeCollection('Produced');

      return Promise.all([
        movie.save({
          _key: 'M1',
          title: 'The Matrix',
          released: 1999,
          tagline: 'Welcome to the Real World',
        }),
        person.save({_key: 'P1', name: 'Keanu Reeves', born: 1964}),
        person.save({_key: 'P2', name: 'Carrie-Anne Moss', born: 1967}),
        person.save({_key: 'P3', name: 'Laurence Fishburne', born: 1961}),
        person.save({_key: 'P4', name: 'Hugo Weaving', born: 1960}),
        person.save({_key: 'P5', name: 'Lilly Wachowski', born: 1967}),
        person.save({_key: 'P6', name: 'Lana Wachowski', born: 1965}),
        person.save({_key: 'P7', name: 'Joel Silver', born: 1952}),
        person.save({_key: 'P8', name: 'Emil Eifrem', born: 1978}),
      ])
        .then(() => {
          return Promise.all([

            actedIn.save({roles: ['Neo']}, 'Person/P1', 'Movie/M1'),
            actedIn.save({roles: ['Trinity']}, 'Person/P2', 'Movie/M1'),
            actedIn.save({roles: ['Morpheus']}, 'Person/P3', 'Movie/M1'),
            actedIn.save({roles: ['Agent Smith']}, 'Person/P4', 'Movie/M1'),
            actedIn.save({roles: ['Emil']}, 'Person/P8', 'Movie/M1'),

            directed.save({}, 'Person/P5', 'Movie/M1'),
            directed.save({}, 'Person/P6', 'Movie/M1'),

            produced.save({}, 'Person/P7', 'Movie/M1'),
          ]);

        });
    });
};