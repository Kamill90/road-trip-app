import React, { PureComponent } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { compose, graphql, MutationFn } from "react-apollo";
import Geolocation from "react-native-geolocation-service";

import { setLocationDataMutation, LocationData } from "api";

interface Props {
  setLocationData: ({ variables }: LocationData) => void;
}

class HomeScreen extends PureComponent<Props> {
  async componentDidMount() {
    this.getCurrentLocation();
  }

  getLocationInfo = async (coordinates: LocationData) => {
    console.log(coordinates);
    const key =
      "AiV3M_0REDTwcF-d8vudQn16tCJs9As_bpVxypS2obxQA70-Sz2iwfaXjE3_PA62"; //to the anv
    const url = `http://dev.virtualearth.net/REST/v1/Locations/${coordinates.latitude},${coordinates.longitude}?o=json&key=${key}`;

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
          console.log({
            countryRegion: address.countryRegion,
            adminDistrict: address.adminDistrict
          });
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
