import React, { PureComponent } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { compose, graphql } from 'react-apollo';
import { NavigationInjectedProps } from 'react-navigation';

import { setLocationDataMutation, LocationData, AddressData } from 'api';
import { LocationManager } from 'services';

interface Props extends NavigationInjectedProps {
  setLocationData: ({ variables }: { variables: LocationData }) => void;
}

class HomeScreen extends PureComponent<Props> {
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

  gotoGameScreen = () => {
    setInterval(this.updateLocation, 5000);
    this.props.navigation.navigate('Quiz');
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Button title="Go to the game" onPress={this.gotoGameScreen} />
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
