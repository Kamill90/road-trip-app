import { locationDataQuery } from './queries';
import { LocationData } from './models';

export const setLocationData = (
  _: any,
  { countryRegion, adminDistrict }: any,
  { cache }: any,
) => {
  const currentLocationData = cache.readQuery({ query: locationDataQuery })
    .locationData;

  const newLocationData = {
    ...currentLocationData,
    countryRegion,
    adminDistrict,
  };
  cache.writeData({ data: { locationData: newLocationData } });
  return newLocationData;
};
