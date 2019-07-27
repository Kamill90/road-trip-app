import React, { Component } from "react";
import { Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from "react-native";
import Geolocation from "react-native-geolocation-service";

interface State {
  latitude: string;
  longitude: string;
}

class App extends Component<any, State> {
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
      <View style={styles.mainContainer}>
        <Text>These are yours coordinates</Text>
        <Text>{`longtitude: ${longitude}`}</Text>
        <Text>{`latitude: ${latitude}`}</Text>
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

export default App;
