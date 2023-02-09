import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "../configs/colors";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import tailwind from "tailwind-react-native-classnames";
import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import RestaurantMap from "../components/RestaurantMap";
import MenuItems from "../components/MenuItems";
import ViewCart from "../components/ViewCart";



import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";

interface Meals{
  category: string;
  id : number; 
  image : string; 
  name : string; 
  price : number;
  quantity : number;
  short_description : string;
}

const DetailsScreen = (props:any) => {
  const navigation = useNavigation();

  const route = useRoute();
  const item = route?.params;

  const [foods, setFoods] = useState([] as Meals[]);
  const [categories, setCategories] = useState([] as Meals[]);

  const [mapActive, setMapActive] = useState(false);

 

  const { restaurantId, image_url, name, address, phone, review_count } =
    props.route.params;

  const [restAddress, setResAddress] = useState(address);
  const [restlongitude, setRestLongitude] = useState(0);
  const [restlatitude, setRestLatitude] = useState(0);

  const coordinates = {
    latitude: restlatitude,
    longitude: restlongitude,
  };

  ///********************************* Address **************************************************/////

/**
  // Initialize the module (needs to be done only once)
  Geocoder.init("AIzaSyBBkDvVVuQBVSMOt8wQoc_7E-2bvDh2-nw"); // use a valid API key
  // With more options
  // Geocoder.init("xxxxxxxxxxxxxxxxxxxxxxxxx", {language : "en"}); // set the language

  // Search by address
  Geocoder.from(restAddress)
    .then((json) => {
      let location = json?.results[0].geometry.location;
      setRestLongitude(location?.lng);
      setRestLatitude(location?.lat);
    })
    .catch((error) => console.warn(error));

    **/

 const fetchMeals = ()=>{
  fetch(`https://www.sunshinedeliver.com/api/customer/meals/${restaurantId}/`)
      .then((response) => response.json())
      .then((responseJson) => {
        setFoods(responseJson.meals);
        setCategories(responseJson.meals);
      })
      .catch((error) => {
        console.error(error);
      });

 }
    

 useEffect(() => {
  fetchMeals();
  },[foods]);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={tailwind`absolute top-9 left-4 z-30 w-9 h-9 rounded-full bg-white justify-center items-center shadow`}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={18} color={colors.black} />
        </TouchableOpacity>
        <View style={styles.mapImageWrpper}>
          {mapActive ? (
            <RestaurantMap coordinates={coordinates} title={name} />
          ) : (
            <Image source={{ uri: image_url }} style={styles.image} />
          )}
        </View>

      
        <ScrollView showsVerticalScrollIndicator={false} style={tailwind`z-20`}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>{name}</Text>
              <TouchableOpacity onPress={() => setMapActive((e) => !e)}>
                <Entypo
                  name="location"
                  size={24}
                  color={`${mapActive ? colors.primary : "#000"}`}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <View style={styles.info}>
                <View style={styles.infoItem}>
                  <AntDesign name="star" size={12} color="#FFC238" />
                  <Text style={styles.infoText}>{address}</Text>
                </View>

                <View style={styles.infoItem}>
                  <Foundation name="star" size={16} color={colors.primary} />
                  <Text style={styles.infoText}> {phone}</Text>
                </View>
              </View>
            </View>

            {foods?.map(({ name, image, price, id, short_description }, index) => {
              return (
                <MenuItems
                  key={index}
                  resId={restaurantId}
                  id={id}
                  price={price}
                  name={name}
                  image={image}
                  short_description={short_description}
                  resName={name}
                  resImage={image_url}
                />
              );
            })}
          </View>
        </ScrollView>
     
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    position: "relative",
    flex: 1,
  },
  mapImageWrpper: {
    position: "absolute",
    width: "100%",
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    height: 260,
  },
  content: {
    position: "relative",
    zIndex: 20,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 25,
    paddingHorizontal: 25,
    marginTop: 220,
    paddingBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontSize: 23,
    color: colors.title,
    fontWeight: "700",
    maxWidth: "80%",
  },
  price: {
    fontSize: 20,
    color: colors.primary,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 3,
    backgroundColor: colors.light,
    borderRadius: 5,
    marginRight: 7,
  },
  infoText: {
    marginLeft: 4,
    fontSize: 12,
  },
});

export default DetailsScreen;