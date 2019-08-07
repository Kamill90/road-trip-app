import { locationDataQuery } from "./queries";

export const setLocationData = (_root, variables, { cache, getCacheKey }) => {
  // const id = getCacheKey({
  //   __typename: "geolocation",
  //   id: variables.id
  // });

  const locationData = cache.readQuery({ query: locationDataQuery });
  console.log("locationData", locationData);
  // const data = { completed: !todo.completed };
  // cache.writeData({ id, data });
  return null;
};
