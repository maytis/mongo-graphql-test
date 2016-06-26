import express from 'express';
import graphql from 'express-graphql';
import { apolloServer } from 'graphql-tools';
import schema from './schema';
import mongo from 'mongodb';
import Promise from 'bluebird';

const port = process.env.PORT || 8080;

// Create Server
const server = express();

// Attach Database and Start Server
mongo.connect('mongodb://localhost:27017/demo', { promiseLibrary: Promise })
  .catch(err => console.error(err.stack))
  .then(db => {
    server.locals.db = db;
    server.listen(port, () => console.log(
      `GraphQL Server is now running on http://localhost:${port}/api`
    ));
  });

//Graphql
server.use('/api', apolloServer(request => ({
  graphiql: true,
  pretty: true,
  schema: schema,
  // context: request.session,
  rootValue: { db: server.locals.db }
})));
