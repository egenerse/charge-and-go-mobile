import React, { useRef, useState, useCallback, useEffect } from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  SafeAreaView,
  Pressable,
} from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import CustomMarker from "../components/CustomMarker";
import { isNullOrUndefined } from "../utils/helper";
import ChargerDetail from "../components/ChargerDetail";
import * as Location from "expo-location";
import CurrentLocationMarker from "../components/CurrentLocationMarker";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";
import { UserModes } from "../constants/enums";
import {
  MapInitialRegion,
  mockedCurrentLocation,
} from "../constants/mockedData";
import { SixtCollorPlate } from "../utils/collorPlate";
import { useInterval } from "../hooks/useInterval";
import { getAllAvailableChargingUnits } from "../services/LocationService";

export default function Map({ navigation }) {
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef(null);
  const [userMode, setUserMode] = useState(UserModes.CarOwner);
  const [availableChargingUnits, setAvailableChargingUnits] = useState([]);
  const toast = useToast();

  useInterval(async () => {
    const allAvailableChargingUnits = await getAllAvailableChargingUnits();
    setAvailableChargingUnits(allAvailableChargingUnits);
  }, 5000);

  const [currentLocation, setCurrentLocation] = useState(null);

  const isUserModeCarOwner = userMode === UserModes.CarOwner;
  const isUserModeRenter = userMode === UserModes.Renter;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        toast.show("Permission to access location was denied", {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          offset: 1000,
          animationType: "slide-in",
        });
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // setCurrentLocation(location);
      setCurrentLocation(mockedCurrentLocation);
    })();
  }, []);

  const showModal = React.useCallback(() => {
    setModalVisible(true);
  }, [setModalVisible]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        backgroundColor="black"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              You are going to make a reservation for charger
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                toast.show(`Reserved successfully`, {
                  type: "success",
                  placement: "bottom",
                  duration: 4000,
                  offset: 50,
                  animationType: "slide-in",
                });
                bottomSheetRef.current.close();
              }}
            >
              <Text style={styles.textStyle}>Reserve the Spot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <MapView style={styles.map} initialRegion={MapInitialRegion}>
        {availableChargingUnits &&
          availableChargingUnits.map((place, index) => {
            return (
              <CustomMarker
                place={place}
                key={`Marker_key_${index}`}
                onPress={() => {
                  bottomSheetRef.current.close();
                  setSelectedLocationId(place.charging_unit_id);
                  setTimeout(() => {
                    bottomSheetRef.current.expand();
                  }, 250);
                }}
              />
            );
          })}
        {currentLocation && <CurrentLocationMarker {...currentLocation} />}
      </MapView>

      <View style={styles.renterSelectionView}>
        <TouchableOpacity
          onPress={() => {
            setUserMode(UserModes.Renter);
          }}
          style={[
            styles.renterTouchableStyle,
            isUserModeRenter && { borderColor: SixtCollorPlate.selectedBlue },
          ]}
        >
          {isUserModeRenter ? (
            <FontAwesome5
              name="dot-circle"
              size={24}
              color={SixtCollorPlate.selectedBlue}
            />
          ) : (
            <Entypo name="circle" size={24} color="white" />
          )}
          <Text
            style={[
              { fontWeight: "500", paddingLeft: 10, color: "white" },
              userMode === UserModes.Renter && {
                fontWeight: "700",
              },
            ]}
          >
            Car Sharing
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.carOwnerSelectionView}>
        <TouchableOpacity
          onPress={() => {
            setUserMode(UserModes.CarOwner);
          }}
          style={[
            styles.carOwnerTouchableStyle,
            isUserModeCarOwner && { borderColor: SixtCollorPlate.selectedBlue },
          ]}
        >
          <>
            {isUserModeCarOwner ? (
              <FontAwesome5
                name="dot-circle"
                size={24}
                color={SixtCollorPlate.selectedBlue}
              />
            ) : (
              <Entypo name="circle" size={24} color="white" />
            )}
            <Text
              style={[
                { fontWeight: "500", paddingLeft: 10, color: "white" },
                userMode === UserModes.CarOwner && {
                  fontWeight: "700",
                },
              ]}
            >
              Charging Units
            </Text>
          </>
        </TouchableOpacity>
      </View>

      <View style={styles.signOutButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate("signOut")}
          style={styles.signOutToucable}
        >
          <MaterialCommunityIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["40%"]}
        enablePanDownToClose={true}
        BottomSheetBackdrop={BottomSheetBackdrop}
      >
        <View style={styles.contentContainer}>
          {!isNullOrUndefined(selectedLocationId) && (
            <ChargerDetail
              {...availableChargingUnits.find(
                (elem) => elem.charging_unit_id === selectedLocationId
              )}
              isUserModeCarOwner={isUserModeCarOwner}
              showModal={showModal}
              currentLocation={currentLocation}
            />
          )}
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
  },
  signOutButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  signOutToucable: {
    height: 45,
    width: 45,
    backgroundColor: SixtCollorPlate.orange,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: 0,
  },
  modeSelector: {
    position: "absolute",
    top: 100,
    right: 20,
    zIndex: 1,
  },
  carOwnerSelectionView: {
    position: "absolute",
    top: 10,
    right: 40,
    zIndex: 1,
  },
  renterSelectionView: {
    position: "absolute",
    top: 10,
    left: 40,
    zIndex: 1,
  },
  renterTouchableStyle: {
    backgroundColor: "rgba(255, 95, 0, 0.3)",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    padding: 3,
    borderColor: "white",
  },
  carOwnerTouchableStyle: {
    backgroundColor: "rgba(255, 95, 0, 0.8)",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    padding: 3,
    borderColor: "white",
  },
  modalView: {
    position: "absolute",
    top: 300,
    left: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: SixtCollorPlate.orange,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "500",
  },
});
