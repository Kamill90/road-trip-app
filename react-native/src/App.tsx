import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { createAppContainer } from 'react-navigation';

import { client } from './api/client';
import { MainNavigator } from './navigators/MainNavigator';

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
