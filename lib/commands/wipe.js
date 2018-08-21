module.exports = (db) => () => {
  return db.truncate()
    .then(() => console.log('Successfully wiped the database'))
    .catch((error) => {
      console.error('Unexpected error wiping database');
      console.error(error);
    })

};