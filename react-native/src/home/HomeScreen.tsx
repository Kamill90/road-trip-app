import React, { PureComponent } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { compose, graphql } from 'react-apollo';
import { NavigationInjectedProps } from 'react-navigation';

import { setLocationDataMutation, LocationData, AddressData } from 'api';
import { LocationManager } from 'services';

const INTERVAL_VALUE = 10 * 60 * 1000;

interface Props extends NavigationInjectedProps {
  setLocationData: ({ variables }: { variables: LocationData }) => void;
}

interface State {
  locationInterval: () => void;
}

class HomeScreen extends PureComponent<Props> {
  state = {
    locationInterval: setInterval(() => {}),
  };
  updateLocation = async () => {
    try {
      const address = (await LocationManager.getCurrentLocation()) as AddressData;
      this.props.setLocationData({
        variables: {
          countryRegion: address.countryRegion,
          adminDistrict: address.adminDistrict,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  stopGame = () => {
    clearInterval(this.state.locationInterval);
  };

  startGame = () => {
    this.updateLocation();
    this.setState(
      {
        locationInterval: setInterval(this.updateLocation, INTERVAL_VALUE),
      },
      () => {
        this.props.navigation.navigate('Quiz', {
          stopGame: this.stopGame,
        });
      },
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Button title="Go to the game" onPress={this.startGame} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default compose(
  graphql<any, any>(setLocationDataMutation, { name: 'setLocationData' }),
)(HomeScreen);
