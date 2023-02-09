import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

import tailwind from "tailwind-react-native-classnames";

import colors from "../configs/colors";

interface Meals{
    category: string;
    id : number; 
    image : string; 
    name : string; 
    price : number;
    quantity : number;
    short_description : string;
    resId : number;
    resName: string;
    resImage : string;
}




const MenuItems = ({ resId, food, resName, resImage, foods } : Meals) => {

 
  const [restaurantId, setRestaurantId] = useState(resId);
  

      


  return (
    <>
      <View style={tailwind`mt-5 mb-12`}>
        <View
          style={tailwind`mb-3 flex-row justify-between items-center pb-3 border-b border-gray-100`}
        >
          <View style={tailwind`flex-1 pr-3 flex-row items-center`}>
           
            <View style={tailwind`flex-1 pl-2`}>
              <Text
                style={[
                  tailwind`text-gray-900 font-bold mb-1`,
                  { fontSize: 16 },
                ]}
              >
                {food.name}
              </Text>
              <Text style={tailwind`text-gray-800 text-xs`}>
                {food.price},Kz
              </Text>
              <Text style={tailwind`text-gray-600 text-xs`}>
                {food.short_description}
              </Text>
            </View>

            <View
              style={{
                borderRadius: 5,
                borderWidth: 2,
                borderColor: colors.gray,
                width: 96,
                height: 35,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 32,
                  justifyContent: "center",
                  alignItems: "center",
                }}
               
               
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>-</Text>
              </TouchableOpacity>

              <Text 
             
              style={{ fontSize: 16, fontWeight: "bold" }}>
             0
              </Text>

              <TouchableOpacity
                style={{
                  width: 32,
                  justifyContent: "center",
                  alignItems: "center",
                }}
             
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={tailwind``}>
            <Image
              style={tailwind`h-16 w-16 rounded-lg`}
              source={{ uri: food.image }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default MenuItems;