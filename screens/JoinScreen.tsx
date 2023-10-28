import React from "react";
import { View, Image, Text } from "react-native";
import tailwind from "tailwind-react-native-classnames";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import { StackNavigationProp } from "@react-navigation/stack"; // Import the necessary type

type JoinScreenProps = {
  navigation: StackNavigationProp<{}>; // Define the type for the navigation prop
};

function JoinScreen({ navigation }: JoinScreenProps) {
  return (
    <Screen style={tailwind`flex-1`}>
      <View style={tailwind`flex-1`}>
        <View style={tailwind`flex-1 justify-center items-center`}>
          <Image
            source={require("../assets/logo.png")}
            style={tailwind`h-64 w-64 object-contain z-10`}
          />
        </View>

        <View style={tailwind`flex-1 justify-end`}>
          <View style={tailwind`bg-white px-5 pb-5 pt-6 rounded-t-2xl`}>
            <Text style={tailwind`text-2xl font-bold mb-3`}>
              SD Food: Entrega de alimentos
            </Text>
            <Text style={tailwind`text-base text-gray-500 mb-3`}>
              Receba comida à sua porta de milhares de restaurantes locais e
              nacionais incríveis.
            </Text>
            <AppButton
              title="Let's go"
              onPress={() => (navigation as any).navigate("UserLogin")}
              color="primary"
              disabled={false}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}

export default JoinScreen;
