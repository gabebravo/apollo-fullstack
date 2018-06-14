const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const schema = require('./schema');
const mongoose = require('mongoose');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const server = express()

const db = 'mongodb://localhost:27017/graphTeams';
mongoose.Promise = global.Promise;
mongoose.connect(db, {});

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

// IMPORTANT : REMOVE CORS WHEN DEPLOYING TO PRODUCTION
server.use( '/graphql', cors(), bodyParser.json(), graphqlExpress({schema}) )

server.listen( 4000, () => {
  console.log('listening on port 4000')
})