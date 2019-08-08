import { locationDataQuery } from "./queries";
import { LocationData } from "./models";

export const setLocationData = (
  _root: any,
  { longitude, latitude }: LocationData,
  { cache }: any
) => {
  const currentLocationData = cache.readQuery({ query: locationDataQuery })
    .locationData;

  const newLocationData = { ...currentLocationData, longitude, latitude };
  cache.writeData({ data: { locationData: newLocationData } });
  return newLocationData;
};
