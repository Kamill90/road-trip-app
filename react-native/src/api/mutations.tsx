import { gql } from "apollo-boost";

export const setLocationDataMutation = gql`
  mutation setLocationData($longitude: String, $latitude: String) {
    setLocationData(longitude: $longitude, latitude: $latitude) @client
  }
`;
