import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { client } from "./api/client";
import HomeScreen from "./home/HomeScreen";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

const AppContainer = createAppContainer(AppNavigator);

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
