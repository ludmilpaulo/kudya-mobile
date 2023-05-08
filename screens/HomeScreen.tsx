import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Platform,
} from "react-native";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import tailwind from "tailwind-react-native-classnames";
import RestaurantItem from "../components/RestaurantItem";
import Screen from "../components/Screen";
import colors from "../configs/colors";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import Geocoder from 'react-native-geocoding';
import * as Device from "expo-device";
import * as Location from "expo-location";



interface Restaurant {
  id: number;
  name: string;
  phone: number;
  address: string;
  logo: string;
}

Geocoder.init('AIzaSyDn1X_BlFj-57ydasP6uZK_X_WTERNJb78');

const HomeScreen = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const url = "https://www.sunshinedeliver.com";
 // const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);
  const [search, setSearch] = useState("");
  const [address, setAddress] = useState('');

  const [userPhoto, setUserPhoto] = useState("");
  const [userId, setUserId] = useState<any>();
  const [filteredDataSource, setFilteredDataSource] = useState<Restaurant[]>([]);
  const [masterDataSource, setMasterDataSource] = useState<Restaurant[]>([]);
  const [loading, setLoading] = React.useState(false);

  const customer_avatar = `${userPhoto}`;
  const customer_image = `${url}${customer_avatar}`;

  const [currentLocation, setCurrentLocation] = useState<any>();

  useEffect(()=>{
    const timer = setInterval(() => userLocation(), 2000);
    return () => clearInterval(timer);   
  }, [])

      const userLocation = async () => {
        if (Platform.OS === "android" && !Device.isDevice) {
            alert(
            "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
          );
          return;
        }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
       // dispatch(setLocation(location.coords))
        console.log(location.coords)
        setCurrentLocation(location.coords);

        Geocoder.from(location?.coords)
      .then(response => {
        const formattedAddress = response.results[0].formatted_address;
        setAddress(formattedAddress);
      })
      .catch(error => {
        console.log(error);
      });
      };


  

 
  useEffect(() => {

    getRestaurant();

  
  }, []);


  const getRestaurant = async () => {
    try {
      fetch("https://www.sunshinedeliver.com/api/customer/restaurants/")
        .then((response) => response.json())
        .then((responseJson) => {
        //  setRestaurantData(responseJson?.restaurants);
          setFilteredDataSource(responseJson?.restaurants);
          setMasterDataSource(responseJson?.restaurants);
        })
        .catch(function (error) {
          console.log(
            "There has been a problem with your fetch operation: " +
              error.message
          );
          // ADD THIS THROW error
          throw error;
        });
    } catch (e) {
      alert(e);
    }
  };

  ///******************************Procurar************************* */
  const searchFilterFunction = (text: any) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with restaurantData
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  

  
  


  return (
    <Screen style={tailwind`pt-5`}>
      <View style={tailwind`text-red-500`}>
        {/* header*/}
        <View style={tailwind`flex-row pb-3 items-center mx-4 px-4`}>
          <Image
            source={{ uri: customer_image }}
            style={tailwind`h-12 w-12 p-4 rounded-full`}
          />

          <View style={tailwind`flex-1`}>
            <Text style={tailwind`font-bold text-gray-400 text-xs`}>
              Entregue agora!
            </Text>
            <Text style={tailwind`font-bold text-xl`}>
             {address}
             
            </Text>
          </View>

          
        </View>
        {/**Search */}
        <View style={tailwind`flex-row items-center pb-2 mx-4 px-4`}>
          <View style={tailwind`rounded-full flex-row flex-1 bg-gray-100 p-3`}>
            <MagnifyingGlassIcon color="#004AAD" size={20} />
            <TextInput
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
              placeholder="Restaurantes e cozinhas"
              keyboardType="default"
            />
          </View>
          <AdjustmentsVerticalIcon color="#004AAD" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {loading && (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={tailwind`mt-2 mb-6`}
          />
        )}
        <RestaurantItem restaurantData={filteredDataSource} />
      </ScrollView>
    </Screen>
  );
};

export default HomeScreen;