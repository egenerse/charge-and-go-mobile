import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Map from "../screens/Map";
import { SignOutScreen } from "../screens/SignOutScreen";
import { SixtCollorPlate } from "../utils/collorPlate";

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="map"
        component={Map}
        options={{
          title: "Charging Map",
          headerStyle: {
            backgroundColor: SixtCollorPlate.orange,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="signOut"
        component={SignOutScreen}
      />
    </Stack.Navigator>
  );
};
