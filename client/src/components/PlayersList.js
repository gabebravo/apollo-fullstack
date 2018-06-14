import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { REM_GET_TEAMS } from '../queries';
import { formatPlayers } from '../utils';
const shortid = require('shortid');

const DELETE_PLAYER = gql`
  mutation deletePlayer($id: String!) {
    deletePlayer(id: $id) @client
  }
`;

const ADD_TEAM = gql`
  mutation addTeam($name: String!, $players: [PlayerInput]) {
    addTeam(name: $name, players: $players) {
      id
      name
      players {
        id
        name
      }
    }
  }
`;

const RESET_TEAM = gql`
  mutation resetTeam($flag: Boolean) {
    resetTeam(flag: $flag) @client
  }
`;

const printPlayers = players =>
  players.map((player, index) => {
    return (
      <ListGroupItem key={index}>
        <div className="d-flex">
          <div className="player-name">{`${player.name}`}</div>
          <div className="player-btn">
            <Mutation mutation={DELETE_PLAYER}>
              {deletePlayer => (
                <Button size="sm" color="danger" onClick={() => deletePlayer({ variables: { id: player.id } })}>
                  Remove
                </Button>
              )}
            </Mutation>
          </div>
        </div>
      </ListGroupItem>
    );
  });

/* notes : playersRem => players obj array normally sent to mutation : [ { name: 'will'}, ... ]
          plyersOpt => players obj array as will appear in cache from mutation : [ { __typeName: 'Player', id: '4567', name: 'will'}, ... ]
          newTeam => entire Team obj as will appear in cache from mutation : SEE BELOW

  * THE MUTATION HAS 3 PARAMS : 
    1) variables obj (args sent to the mutation)
    2) optimisticResponse obj (obj as placed in cache before mutation)
    3) update function ( takes 2 args: proxy & the mutation ) => 3 more lines:
      3a) the query to fetch the data from the cache (incl fetches from prev remote calls)
      3b) the push to the cached array of Team objects >> appends addTeam mutation object returned from the net call
      3c) the writeQuery to write the data back to the cache once it resolves

LINK EXPLANATION FOR UPDATE:
https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-mutation-options-update
*/

const PlayersList = ({ data }) => {
  const { name, players } = data.newTeam;
  const playersRem = players.map(player => ({ name: player.name }));
  const plyersOpt = formatPlayers(players);
  const newTeam = { __typename: 'Team', id: shortid.generate(), name, players: plyersOpt };

  return (
    <div className={players.length > 0 ? 'player-list-wrapper' : 'hide-elm'}>
      <ListGroup>{players.length > 0 ? printPlayers(players) : null}</ListGroup>
      <div className={players.length === 5 ? 'save-btn-wrapper' : 'hide-elm'}>
        <Mutation mutation={ADD_TEAM}>
          {addTeam => (
            <Mutation mutation={RESET_TEAM}>
              {resetTeam => (
                <Button
                  color="success"
                  onClick={() =>
                    addTeam({
                      variables: { name, players: playersRem },
                      optimisticResponse: {
                        __typename: 'Mutation',
                        addTeam: newTeam
                      },
                      update: (proxy, { data: { addTeam } }) => {
                        // Read the data from our cache for this query.
                        const data = proxy.readQuery({ query: REM_GET_TEAMS });
                        // Add our team from the mutation to the end.
                        data.teams.push(addTeam);
                        // Write our data back to the cache.
                        proxy.writeQuery({ query: REM_GET_TEAMS, data });
                      }
                    })
                      .then(resetTeam({}))
                      .catch(error => console.log('error'))
                  }>
                  Save Team
                </Button>
              )}
            </Mutation>
          )}
        </Mutation>
      </div>
    </div>
  );
};

export default PlayersList;
