import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TailwindProvider } from "tailwindcss-react-native";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
    </GestureHandlerRootView>
  );
}
