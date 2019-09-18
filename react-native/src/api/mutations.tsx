import { gql } from 'apollo-boost';

export const setLocationDataMutation = gql`
  mutation setLocationData($countryRegion: String, $adminDistrict: String) {
    setLocationData(
      countryRegion: $countryRegion
      adminDistrict: $adminDistrict
    ) @client
  }
`;
