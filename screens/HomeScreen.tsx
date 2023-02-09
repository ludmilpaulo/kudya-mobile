import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import tailwind from "tailwind-react-native-classnames";
import RestaurantItem from "../components/RestaurantItem";
import Screen from "../components/Screen";
import colors from "../configs/colors";

const HomeScreen = () => {
  const [restaurantData, setRestaurantData] = React.useState([] as any[]);
  const [search, setSearch] = React.useState("");
  const [filteredDataSource, setFilteredDataSource] = React.useState([] as any[]);
  const [masterDataSource, setMasterDataSource] = React.useState([] as any[]);
  const [activeTab, setActiveTab] = React.useState("Delivery");
  const [loading, setLoading] = React.useState(false);


  React.useEffect(() => {
    getRestaurant();
  }, [])

  const getRestaurant = async () => {
    try {
      fetch("https://www.sunshinedeliver.com/api/customer/restaurants/")
        .then((response) => response.json())
        .then((responseJson) => {
          setRestaurantData(responseJson.restaurants);
          setFilteredDataSource(responseJson.restaurants);
          setMasterDataSource(responseJson.restaurants);
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
          // ADD THIS THROW error
           throw error;
        });
    } catch (e) {
      alert(e);
    }
  };



  return (
    <Screen style={tailwind`pt-5`}>
      <View style={tailwind`text-red-500`}>
        {/* header*/}
        <View style={tailwind`flex-row pb-3 items-center mx-4 px-4`}>
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
            
            </Text>
          </View>
          </View>

         
        {/**Search */}
        <View style={tailwind`flex-row items-center pb-2 mx-4 px-4`}>
          <View style={tailwind`rounded-full flex-row flex-1 bg-gray-100 p-3`}>
          
            <TextInput
              placeholder="Restaurantes e cozinhas"
              keyboardType="default"
              
            />
          </View>
        
        </View>
      </View>

      <ScrollView  showsVerticalScrollIndicator={false}>
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
