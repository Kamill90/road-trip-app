import { gql } from 'apollo-boost';

export const locationDataQuery = gql`
  query locationData {
    locationData @client {
      countryRegion
      adminDistrict
      counter
      isGameActive
    }
  }
`;
