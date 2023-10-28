import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import tailwind from "tailwind-react-native-classnames";
import RestaurantMap from "../components/RestaurantMap";
import MenuItems from "../components/MenuItems";
import BasketIcon from "../components/BasketIcon";
import colors from "../configs/colors";
import { fetchData } from "../configs/variable";

import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const DetailsScreen = (props) => {
  const [foods, setFoods] = useState([{}]);
  const [mapActive, setMapActive] = useState(false);

  const { restaurantId, image_url, name, address, phone, review_count } =
    props.route.params;

  const navigation = useNavigation();

  const route = useRoute();
  const item = route.params && route.params;

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const data = await fetchData(`/api/customer/meals/${restaurantId}/`);
        setFoods(data.meals);
        console.log("api data", data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <>
      <BasketIcon />
      <View style={tailwind`flex-1`}>
        <TouchableOpacity
          style={tailwind`absolute top-9 left-4 z-30 w-9 h-9 rounded-full bg-white justify-center items-center shadow`}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={18} color={colors.black} />
        </TouchableOpacity>
        <View style={tailwind`relative w-full`}>
          {mapActive ? (
            <RestaurantMap coordinates={coordinates} title={name} />
          ) : (
            <Image
              source={{ uri: image_url }}
              style={tailwind`w-full h-72 object-cover`}
            />
          )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={tailwind`z-20`}>
          <View style={tailwind`p-5 relative bg-white rounded-t-3xl`}>
            <View style={tailwind`flex-row justify-between items-center`}>
              <Text style={tailwind`text-2xl font-bold w-10/12`}>{name}</Text>
              <TouchableOpacity onPress={() => setMapActive((e) => !e)}>
                <Entypo
                  name="location"
                  size={24}
                  style={{ color: mapActive ? colors.primary : "#000" }}
                />
              </TouchableOpacity>
            </View>
            <View style={tailwind`flex-row justify-between items-start`}>
              <View style={tailwind`flex-row items-center`}>
                <AntDesign
                  name="star"
                  size={12}
                  style={tailwind`text-yellow-500`}
                />
                <Text style={tailwind`ml-1 text-base`}>{address}</Text>
              </View>
              <View style={tailwind`flex-row items-center`}>
                <Foundation
                  name="star"
                  size={16}
                  style={tailwind`text-primary`}
                />
                <Text style={tailwind`ml-1 text-base`}>{phone}</Text>
              </View>
            </View>
            {foods.map((food) => (
              <MenuItems
                key={food.id}
                resId={restaurantId}
                foods={foods}
                food={food}
                resName={name}
                resImage={image_url}
                category=""
                id={0}
                image=""
                name=""
                price={0}
                quantity={0}
                short_description=""
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default DetailsScreen;
