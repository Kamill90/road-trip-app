import { gql } from "apollo-boost";

export const locationDataQuery = gql`
  query locationData {
    locationData @client {
      longitude
      latitude
    }
  }
`;
