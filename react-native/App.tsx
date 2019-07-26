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

class App extends Component {
  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        console.warn(position);
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
        <Text>Hello world</Text>
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
