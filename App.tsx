import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TailwindProvider } from "tailwindcss-react-native";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <TailwindProvider>
      <AppNavigator />
    </TailwindProvider>
  );
}
