import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
import tailwind from "tailwind-react-native-classnames";

import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome5';


import { ArrowRightIcon, StarIcon } from "react-native-heroicons/outline";

interface Restaurant {
  id: number;
  name: string;
  phone: number;
  address: string;
  logo: string;
}

const RestaurantItem = ({ restaurantData }: any) => {
  const navigation = useNavigation<any>();

  const handlePress = (item: Restaurant) => {
    navigation.navigate("DetailsScreen", {
      item: item,
      name: item.name,
      restaurantId: item.id,
      phone: item.phone,
      image_url: item.logo,
      address: item.address,
    });
  };

  return (
    <View>
      <View  style={tailwind`flex-row items-center justify-between px-4 mt-4`}>
        <Text  style={tailwind`text-lg font-bold`}>"title"</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text  style={tailwind`px-4 text-xs text-gray-500`}>description</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        style={tailwind`pt-4`}
      >
      {restaurantData?.map((item: any, index: any) => (
        <RestaurantItemCard
          key={index}
          item={item}
          onPress={() => handlePress(item)}
        />
      ))}
    </ScrollView>
    </View>
  );
};

export default RestaurantItem;

const RestaurantItemCard = ({ item, onPress }: { item: any; onPress: any }) => {
 
  return (
    <TouchableOpacity style={tailwind`bg-white mr-3 shadow`} onPress={onPress}>
      <Image
        source={{ uri: item.logo }}
        style={tailwind`h-36 w-64 rounded-sm`}
      />
  
      <View style={tailwind`px-3 pb-4`}>
        <Text style={tailwind`pt-2 text-lg font-bold`}>{item.name}</Text>
        <View style={tailwind`flex-row items-center space-x-1`}>
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text style={tailwind`text-xs text-gray-500`}>
            <Text style={tailwind`text-green-500`}>{item.phone}</Text>
          </Text>
        </View>
  
        <View style={tailwind`flex-row items-center space-x-1`}>
          <Icon name="map-marker" size={22} color="gray" />
          <Text style={tailwind`text-xs text-gray-500`}>Nearby · {item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  }  