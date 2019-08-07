import React, { PureComponent } from "react";
import { View, Text, Button } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const SET_LOCATION = gql`
  mutation setLocationData($longitude: String!, $latitude: String!) {
    setLocationData(longitude: $longitude, latitude: $latitude) @client
  }
`;

// import { compose, graphql } from "react-apollo";

// import { networkStatusQuery, networkStatusMutation } from "api";

const HomeSreen = () => {
  // onPress = () => {
  //   this.props.setNetworkStatus(
  //     {
  //       variables: {
  //         isConnected: "more"
  //       }
  //     },
  //     () => {
  //       this.props.networkStatusQueryResults.refetch();
  //     }
  //   );
  // };
  const [setLocationData] = useMutation(SET_LOCATION, {
    variables: {
      longitude: "12",
      latitude: "12312"
    }
  });

  return (
    <View>
      <Button title="set new status" onPress={setLocationData} />
    </View>
  );
};

export default HomeSreen;

// export default compose(
//   graphql(networkStatusQuery, { name: "networkStatusQueryResults" }),
//   graphql(networkStatusMutation, { name: "setNetworkStatus" })
// )(HomeSreen);
