import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { Button, Label, Input } from 'reactstrap';

const CREATE_TEAM = gql`
  mutation createTeam($teamName: String!) {
    createTeam(teamName: $teamName) @client
  }
`;

const ADD_PLAYER = gql`
  mutation addPlayer($playerName: String!) {
    addPlayer(playerName: $playerName) @client
  }
`;

const DEFAULT_STATE = {
  team: '',
  player: ''
};

const CreateTeam = ({ teamName }) => {
  return (
    <Mutation mutation={CREATE_TEAM}>
      {createTeam => (
        <Button
          color="success"
          onClick={() => {
            createTeam({ variables: { teamName } });
          }}
        >
          Add Team
        </Button>
      )}
    </Mutation>
  );
};

class PlayerInput extends Component {
  state = DEFAULT_STATE;

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { wasAdded, name, players } = this.props.data.newTeam;
    return (
      <div className="input-container">
        <h5>{name.length > 0 ? name : 'Your Team'}</h5>
        <div className={wasAdded ? 'hide-elm' : 'input-wrapper'}>
          <Input
            type="text"
            name="team"
            onChange={this.changeHandler}
            value={this.state.team}
            placeholder="enter team name"
          />
          <CreateTeam teamName={this.state.team} />
        </div>
        <div className={wasAdded && players.length < 5 ? 'input-wrapper' : 'hide-elm'}>
          <Input
            type="text"
            name="player"
            onChange={this.changeHandler}
            value={this.state.player}
            placeholder="enter player name"
          />
          <Mutation mutation={ADD_PLAYER}>
            {addPlayer => (
              <Button
                color="success"
                onClick={() =>
                  addPlayer({ variables: { playerName: this.state.player } })
                    .then(result => (result ? this.setState(DEFAULT_STATE) : console.log('player not added')))
                    .catch(error => console.log('error'))
                }
              >
                Add Player
              </Button>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default PlayerInput;
