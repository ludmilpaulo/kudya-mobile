import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from "./HomeNavigator";

export default function AppNavigator() {
  // Get auth state from context

  // const user = useSelector(selectUser)

  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
}
