export const chargerLocations = [
  {
    id: 1,
    address: "Felsennelkenanger 9",
    latitude: 48.1479352,
    longitude: 11.5780891,
    availableSlot: 1,
    maxSlot: 3,
  },
  {
    id: 2,
    address: "Feldmoching",
    latitude: 48.1579352,
    longitude: 11.5780891,
    availableSlot: 1,
    maxSlot: 5,
  },
  {
    id: 3,
    address: "Manisa",
    latitude: 48.1479352,
    longitude: 11.5680891,
    availableSlot: 1,
    maxSlot: 1,
  },
];

export const munichCenterLocation = {
  latitude: 48.1479352,
  longitude: 11.5780891,
};

export const MapInitialRegion = {
  latitude: munichCenterLocation.latitude,
  longitude: munichCenterLocation.longitude,
  latitudeDelta: 0.04,
  longitudeDelta: 0.04,
};

export const mockedCurrentLocation = {
  latitude: 48.1449352,
  longitude: 11.5780891,
};
