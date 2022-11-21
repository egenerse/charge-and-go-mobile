import React from "react";
import { Router } from "./src/routes/Router";
import { AuthProvider } from "./src/contexts/Auth";
import { ToastProvider } from "react-native-toast-notifications";
import axios from "axios";

axios.defaults.baseURL = "https://charge-n-go-be.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "application/json";

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router />
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
