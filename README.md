# Arango CLI
CLI for the most common tasks when using arangojs.

## Installation
```
npm install --save-dev arango-cli
# Or
yarn add -D arango-cli
```

To run any of the commands, you will need to provide the connection details for arango. To do this, create a `migrations` folder in the root of your project, and add a file called `config.js` which exports an object or a promise with the following structure:

```js
module.exports = {
  host: 'http://127.0.0.1:8529',
  dbName: 'dbName',
  username: 'myUsername',
  password: 'myPassword',
};
```

If you need to make any async requests to get the connection details, then return a promise that resolves with the config object.