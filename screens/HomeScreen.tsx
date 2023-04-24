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

import * as Device from "expo-device";
import * as Location from "expo-location";
import useFetch from '../redux/useFetch'

interface Restaurant {
  restaurants: any[];
  id: number;
  name: string;
  phone: number;
  address: string;
  logo: string;
}



const HomeScreen = () => {
  const user = useSelector(selectUser);

  const params = {
    endpoint: "/customer/restaurants/",
    method: "GET"
    //auth: true
  }

  const { status, data, refetch, setRefetch, address, customer_image } = useFetch(params);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();


  const [search, setSearch] = useState("");
  

  const [userPhoto, setUserPhoto] = useState("");
  const [userId, setUserId] = useState<any>(user?.user_id);
  const [filteredDataSource, setFilteredDataSource] = useState<any[]>([]);
  const [masterDataSource, setMasterDataSource] = useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

 

  let userAddress = address;

  



  React.useEffect(() => {
    console.log("isabela", data)
    setFilteredDataSource(data?.restaurants);
    setMasterDataSource(data?.restaurants);
   
  }, []);


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

  useEffect(() => {

    console.log('currentlocation', masterDataSource)
    
  }, []);


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
