import express from 'express';
import graphql from 'express-graphql';
import { apolloServer } from 'graphql-tools';
import schema from './schema';
import mongo from 'mongodb';
import Promise from 'bluebird';
import Random from 'meteor-random';

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
  rootValue: { db: server.locals.db }
})));

// Insert to Database
server.get('/test', async (req, res, next) => {
  try {
    const db = server.locals.db;
    await db.collection('log').insertOne({
      _id: Random.id(),
      time: new Date(),
      ip: req.ip,
      message: '/test visit'
    });
    res.send('<h1>Hello, world!</h1>');
  } catch (err) {
    next(err);
  }
});
