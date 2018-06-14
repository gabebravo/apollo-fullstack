const shortid = require('shortid');

export const formatPlayers = players => 
players.map( player => ({ __typename: 'Player', id: shortid.generate(), name: player.name }))

export const formatUpdPlayers = obj => 
  Object.keys(obj)
    .filter( key => key[0] === 'p' )
    .map( key => ({ name: obj[key] }))
