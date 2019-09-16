import React, { PureComponent } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { compose, graphql, MutationFn } from "react-apollo";
import Geolocation from "react-native-geolocation-service";
import Config from "react-native-config";

import { setLocationDataMutation, LocationData } from "api";

interface Props {
  setLocationData: ({ variables }: LocationData) => void;
}

class HomeScreen extends PureComponent<Props> {
  async componentDidMount() {
    this.getCurrentLocation();
  }

  getLocationInfo = async (coordinates: LocationData) => {
    const url = `http://dev.virtualearth.net/REST/v1/Locations/${coordinates.latitude},${coordinates.longitude}?o=json&key=${Config.BING_MAP_KEY}`;

    const response = await fetch(url);
    const data = response.json();
    return data;
  };

  getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.getLocationInfo({ latitude, longitude }).then(data => {
          const address = data.resourceSets[0].resources[0].address;
          this.props.setLocationData({
            variables: {
              countryRegion: address.countryRegion,
              adminDistrict: address.adminDistrict
            }
          });
        });
      },
      error => {
        console.warn(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  gotoGameScreen = () => {};
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>Wolcome</Text>
        <Button title="welcome" onPress={this.gotoGameScreen} />
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
