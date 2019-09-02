import Geolocation, { GeoPosition } from "react-native-geolocation-service";

interface Coordinates {
  longitude: number;
  latitude: number;
}

export default class LocationManager {
  getCurrentLocation = Geolocation.getCurrentPosition(
    (position: GeoPosition) => {
      const { latitude, longitude } = position.coords;
      console.log("return", {
        longitude,
        latitude
      });
      return {
        longitude,
        latitude
      };
    },
    error => {
      // TODO send to crashlytics (error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
}
