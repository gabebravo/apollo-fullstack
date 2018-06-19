const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = 
`input PlayerInput {
  name: String!
}
type Team {
  id: ID!
  name: String!
  players: [Player]
}
type Player {
  id: ID!
  name: String!
}
type Query {
  team(id: ID!): Team!
  teams: [Team]!
}
type Mutation {
  addTeam(name: String!, players: [PlayerInput]): Team!
  deleteTeam(id: ID!): [Team]
  updateTeam(id: ID!, players: [PlayerInput]): Team
}
`

const schema = makeExecutableSchema({ typeDefs, resolvers })
module.exports = schema;