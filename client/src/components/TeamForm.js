import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import PlayerInput from './PlayerInput';
import PlayersList from './PlayersList';

const GET_TEAM = gql`
  {
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

export const TeamForm = () => {
  return (
    <Query query={GET_TEAM}>
      {({ loading, error, data: { ...data } }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error :(</div>;

        return (
          <div>
            <PlayerInput data={data} />
            <PlayersList data={data} />
          </div>
        );
      }}
    </Query>
  );
};

export default TeamForm;
