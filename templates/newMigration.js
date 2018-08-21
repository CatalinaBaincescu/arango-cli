module.exports = (db) => {

  const graphName = 'MyGraph';
  const collectionName = 'MyCollection'

  const graph = db.graph(graphName);
  const collection = graph.vertexCollection(collectionName)

  return Promise.resolve();
};
