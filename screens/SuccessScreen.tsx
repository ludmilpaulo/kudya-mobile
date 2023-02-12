import { View, Text } from "react-native";
import tailwind from "tailwind-react-native-classnames";
import React from "react";
import Screen from "../components/Screen";
import * as Animatable from 'react-native-animatable';

const SuccessScreen = () => {
  return (
    <Screen style={tailwind`flex-1 bg-[£00CCB] justify-center items-center`}>
      <Text>SuccessScreen</Text>
    </Screen>
  );
};

export default SuccessScreen;
