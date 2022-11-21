import React from "react";
import { Marker } from "react-native-maps";
import { View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SixtCollorPlate } from "../utils/collorPlate";

const CustomMarker = ({ place, onPress }) => {
  const { lat, lng } = place;

  return (
    <Marker
      onPress={onPress}
      coordinate={{
        latitude: lat,
        longitude: lng,
      }}
    >
      <View
        style={{
          height: 38,
          width: 38,
          borderRadius: 19,
          backgroundColor: SixtCollorPlate.orange,
          opacity: 0.8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesome5 name="charging-station" size={20} color="white" />
      </View>
    </Marker>
  );
};

export default CustomMarker;
