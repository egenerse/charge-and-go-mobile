import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  StyleSheet,
} from "react-native";

import { useAuth } from "../contexts/Auth";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d1d1d1",
  },
});

export const SignOutScreen = () => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const signOut = async () => {
    isLoading(true);
    await auth.signOut();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={"#000"} animating={true} size="small" />
      ) : (
        <Button title="Sign Out" onPress={signOut} />
      )}
    </View>
  );
};
