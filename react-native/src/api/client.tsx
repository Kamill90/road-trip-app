// import ApolloClient from "apollo-boost";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

import { setLocationData } from "./resolvers";

const cache = new InMemoryCache();
export const initialData = {
  data: {
    locationData: {
      longitude: "",
      latitude: "",
      __typename: "locationData"
    }
  }
};

export const client = new ApolloClient({
  cache,
  resolvers: {
    Mutation: {
      setLocationData
    }
  }
});

cache.writeData(initialData);
