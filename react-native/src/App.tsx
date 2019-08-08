import React, { Component } from "react";
import { ApolloProvider, compose, graphql, MutationFn } from "react-apollo";

import { client } from "./api/client";
import HomeScreen from "./home/HomeScreen";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <HomeScreen />
      </ApolloProvider>
    );
  }
}

export default App;
