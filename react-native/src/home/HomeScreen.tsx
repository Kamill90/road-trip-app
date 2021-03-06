import React, { PureComponent } from 'react';
import { StyleSheet, View, Button, Text, Alert } from 'react-native';
import { compose, graphql } from 'react-apollo';
import { NavigationInjectedProps } from 'react-navigation';

import {
  setLocationDataMutation,
  LocationData,
  AddressData,
  locationDataQuery,
} from 'api';
import { LocationManager, NotificationService } from 'services';

const MIN = 1;
const INTERVAL_VALUE = MIN * 60 * 1000;
interface Props extends NavigationInjectedProps {
  setLocationData: ({ variables }: { variables: LocationData }) => void;
  locationDataResults: any;
}

const notificationService = new NotificationService();

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
          counter: this.props.locationDataResults.locationData.counter + 1,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  stopGame = () => {
    clearInterval(this.state.locationInterval);
    this.props.setLocationData({
      variables: {
        isGameActive: false,
      },
    });
  };

  startGame = () => {
    this.updateLocation();
    this.props.setLocationData({
      variables: {
        isGameActive: true,
      },
    });
    this.setState({
      locationInterval: setInterval(this.updateLocation, INTERVAL_VALUE),
    });
  };

  goToGame = () => {
    this.props.navigation.navigate('Quiz');
  };

  sendLocalNotification = () => {
    notificationService.localNotification();
  };

  render() {
    const { locationDataResults } = this.props;
    return (
      <View style={styles.mainContainer}>
        <Text>
          Is game active:
          {locationDataResults.locationData.isGameActive.toString()}
        </Text>
        <Text>counter: {locationDataResults.locationData.counter}</Text>
        <Text>
          countryRegion:
          {locationDataResults.locationData.countryRegion}
        </Text>
        <Text>
          adminDistrict:
          {locationDataResults.locationData.adminDistrict}
        </Text>
        {locationDataResults.locationData.isGameActive ? (
          <Button title="Stop the game" onPress={this.stopGame} />
        ) : (
          <Button title="Start the game" onPress={this.startGame} />
        )}
        <Button
          title="Send local notification"
          onPress={this.sendLocalNotification}
        />
        <Button title="Go to the game" onPress={this.goToGame} />
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
  graphql(locationDataQuery, { name: 'locationDataResults' }),
  graphql(setLocationDataMutation, { name: 'setLocationData' }),
)(HomeScreen);
