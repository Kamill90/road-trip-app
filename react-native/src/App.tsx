import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { createAppContainer } from 'react-navigation';
import { PermissionsAndroid, Platform } from 'react-native';

import { client } from './api/client';
import { MainNavigator } from './navigators/MainNavigator';

if (Platform.OS === 'android') {
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    {
      title: 'Location permission is needed',
      message: 'Content depends on your location ',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
}
const AppContainer = createAppContainer(MainNavigator);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    );
  }
}

export default App;
