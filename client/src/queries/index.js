import { gql } from 'apollo-boost';

export const REM_GET_TEAMS = gql`
  {
    teams {
      id
      name
      players {
        id
        name
      }
    }
  }
`;