import React, { PureComponent } from "react";

import { StyleSheet, View, Text } from "react-native";
import { ApolloProvider } from "react-apollo";
import Geolocation from "react-native-geolocation-service";

import { client } from "api";

interface State {
  latitude: string;
  longitude: string;
}

class HomeScreen extends PureComponent<any, State> {
  state = {
    latitude: "",
    longitude: ""
  };
  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position: any) => {
        const { latitude, longitude } = position.coords;
        this.setState({ latitude, longitude });
      },
      error => {
        console.warn(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  render() {
    const { latitude, longitude } = this.state;
    return (
      <ApolloProvider client={client}>
        <View style={styles.mainContainer}>
          <Text>These are yours coordinates</Text>
          <Text>{`longtitude: ${longitude}`}</Text>
          <Text>{`latitude: ${latitude}`}</Text>
        </View>
      </ApolloProvider>
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

export default HomeScreen;
