import React, { PureComponent } from "react";
import { StyleSheet, View, Text } from "react-native";
import { compose, graphql, MutationFn } from "react-apollo";
import Geolocation from "react-native-geolocation-service";

import { setLocationDataMutation } from "api";

class HomeScreen extends PureComponent {
  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position: any) => {
        const { latitude, longitude } = position.coords;
        this.props.setLocationData({
          variables: {
            longitude,
            latitude
          }
        });
        this.setState({ latitude, longitude });
      },
      error => {
        console.warn(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>You coordinates have been stored</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default compose(
  graphql<any, any>(setLocationDataMutation, { name: "setLocationData" })
)(HomeScreen);