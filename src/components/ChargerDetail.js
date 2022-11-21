import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SixtCollorPlate } from "../utils/collorPlate";
import { distanceCalculator, priceCalculator } from "../utils/helper";

const ChargerDetail = ({
  address,
  isUserModeCarOwner,
  showModal,
  lat,
  lng,
  currentLocation,
  max_slots,
  occupied_slots,
}) => {
  const distance = distanceCalculator(
    { lat: currentLocation.latitude, lng: currentLocation.longitude },
    { lat, lng }
  );
  const price = priceCalculator(distance);

  const availableSlot = max_slots - occupied_slots;
  return (
    <View style={{ margin: 20, flex: 1 }}>
      <View style={styles.container}>
        {address && (
          <View style={styles.textBox}>
            <Text style={styles.desc}>Address:</Text>
            <Text style={styles.info}>{address}</Text>
          </View>
        )}
        {max_slots && availableSlot && (
          <View style={styles.textBox}>
            <Text style={styles.desc}>Available/Max Slot:</Text>
            <Text style={styles.info}>{`${availableSlot}/${max_slots}`}</Text>
          </View>
        )}
        {distance && (
          <View style={styles.textBox}>
            <Text style={styles.desc}>Distance</Text>
            <Text style={styles.info}>{distance.toFixed(1)}m</Text>
          </View>
        )}
        {isUserModeCarOwner && (
          <View style={styles.textBox}>
            <Text style={styles.desc}>Price</Text>
            <Text style={styles.info}>{`${price}€ per min`}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={{
          padding: 20,
          marginTop: 10,
          backgroundColor: SixtCollorPlate.orange,
          borderRadius: 15,
          alignItems: "center",
          alignSelf: "center",
        }}
        onPress={showModal}
      >
        <Text style={{ fontWeight: "bold", color: "white" }}>Reserve</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: SixtCollorPlate.orange,
  },
  textBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 60,
    margin: 10,
  },
  desc: {
    fontWeight: "bold",
    justifyContent: "space-around",
    color: SixtCollorPlate.orange,
  },
  info: {
    paddingLeft: 5,
    fontWeight: "normal",
  },
});

export default ChargerDetail;
