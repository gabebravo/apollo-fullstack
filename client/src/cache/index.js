import { gql } from 'apollo-boost';
const shortid = require('shortid');

const DEFAULT_NEWTEAM = {
  __typename: 'NewTeam',
  id: shortid.generate(),
  wasAdded: false,
  name: '',
  players: []
}

export const defaults = {
  newTeam: DEFAULT_NEWTEAM
};

const query = gql`
  query GetNewTeam {
    newTeam @client {
      id
      wasAdded
      name
      players {
        id
        name
      }
    }
  }
`;

export const resolvers = {
  Mutation: {
    createTeam: (_, { teamName }, { cache }) => {
      const previous = cache.readQuery({ query });
      const updatedTeam = { ...previous.newTeam, wasAdded: true, name: teamName };
      const data = { newTeam: updatedTeam };
      cache.writeData({ data });
      return null;
    },

    addPlayer: (_, { playerName }, { cache }) => {
      const previous = cache.readQuery({ query });
      const newPlayer = {
        id: shortid.generate(),
        name: playerName,
        __typename: 'Player'
      };
      const data = {
        newTeam: {
          ...previous.newTeam,
          players: [...previous.newTeam.players, newPlayer]
        }
      };
      cache.writeData({ data });
      return null;
    },

    deletePlayer: (_, { id }, { cache }) => {
      const previous = cache.readQuery({ query });
      const data = {
        newTeam: {
          ...previous.newTeam,
          players: previous.newTeam.players.filter(player => player.id !== id)
        }
      };
      cache.writeData({ data });
      return null;
    }, 

    resetTeam: (_, {}, { cache }) => {
      const previous = cache.readQuery({ query });
      const data = { newTeam: DEFAULT_NEWTEAM };
      cache.writeData({ data });
      return null;
    }
  }
};
