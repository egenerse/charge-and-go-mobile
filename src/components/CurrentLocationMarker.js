import React from "react";
import { Marker } from "react-native-maps";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { mockedCurrentLocation } from "../constants/mockedData";

const CurrentLocationMarker = () => {
  return (
    <Marker
      coordinate={{
        latitude: mockedCurrentLocation.latitude,
        longitude: mockedCurrentLocation.longitude,
      }}
    >
      <MaterialIcons name="my-location" size={24} color="black" />
    </Marker>
  );
};

export default CurrentLocationMarker;
