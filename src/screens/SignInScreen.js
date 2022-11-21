import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useAuth } from "../contexts/Auth";
import { SixtCollorPlate } from "../utils/collorPlate";
import { useToast } from "react-native-toast-notifications";

export default function SignInScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const toast = useToast();

  const resetInput = useCallback(() => {
    setLoading(false);
    setUsername("");
    setPassword("");
  }, [setUsername, setPassword]);

  const signIn = async () => {
    if (username) {
      try {
        setLoading(true);
        const signInResult = await auth.signIn(username, password);
        if (signInResult) {
          toast.show(`Welcome ${username}`, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 50,
            animationType: "slide-in",
          });
        } else {
          resetInput();
          toast.show("username is not valid", {
            type: "danger",
            placement: "bottom",
            duration: 4000,
            offset: 1000,
            animationType: "slide-in",
          });
        }
      } catch (err) {
        resetInput();
        toast.show("username is not valid", {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          offset: 1000,
          animationType: "slide-in",
        });
      }
    } else {
      resetInput();
      toast.show("username is not valid", {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        offset: 1000,
        animationType: "slide-in",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          borderColor: "white",
          borderWidth: 3,
          borderRadius: 200,
          padding: 10,
        }}
      >
        <Image
          style={{ height: 100, width: 100 }}
          source={require("../../assets/splash.png")}
        />
      </View>
      <Text style={styles.title}>Charge & Go</Text>
      <TextInput
        placeholder="username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        keyboardType="username"
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        keyboardType="visible-password"
        secureTextEntry
        style={styles.input}
      />
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 10 }}
          color={"#000"}
          animating={true}
          size="small"
        />
      ) : (
        <TouchableOpacity onPress={signIn} style={styles.signInButton}>
          <Text>Sign In</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SixtCollorPlate.orange,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    width: "80%",
    marginTop: 15,
    color: "#000",
    borderRadius: 5,
  },
  signInButton: {
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
});
