import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
} from "react-native";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import tailwind from "tailwind-react-native-classnames";
import Screen from "../components/Screen";

const HomeScreen = () => {
  return (
    <SafeAreaView style={tailwind`bg-white pt-5`}>
      <Text style={tailwind`text-red-500`}>
        {/* header*/}
        <View style={tailwind`flex-row pb-3 items-center mx-4 space-x-2 px-4`}>
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            style={tailwind`h-7 w-7 bg-gray-300 p-4 rounded-full`}
          />

          <View style={tailwind`flex-1`}>
            <Text style={tailwind`font-bold text-gray-400 text-xs`}>
              Entregue agora!
            </Text>
            <Text style={tailwind`font-bold text-xl`}>
              Current Location
              <ChevronDownIcon size={20} color="#004AAD" />
            </Text>
          </View>

          <UserIcon size={35} color="#004AAD" />
        </View>
        {/**Search */}
        <View style={tailwind`flex-row items-center space-x-2 pb-2 mx-4 px-4`}>
          <View style={tailwind`flex-row flex-1 space-x-2 bg-gray-200 p-3`}>
            <MagnifyingGlassIcon color="#004AAD" size={20} />
            <TextInput
              placeholder="Restaurantes e cozinhas"
              keyboardType="default"
            />
          </View>
          <AdjustmentsVerticalIcon color="#004AAD" />
        </View>
      </Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
