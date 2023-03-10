import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  ScrollView,

} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import tailwind from "tailwind-react-native-classnames";
import * as Device from "expo-device";
import * as Location from "expo-location";

import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, updateBusket } from "../redux/slices/basketSlice";



import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";


import colors from "../configs/colors";
import Screen from "../components/Screen";
import { selectUser } from "../redux/slices/authSlice";

const CheckoutScreen = ({ navigation } : { navigation:any}) => {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [userAddress, setUserAddress] = useState();

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingOrder, setLoadingOrder] = useState(false);



  const allCartItems = useSelector(selectCartItems);

  const initialRegion = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const initialCoordinate = {
    latitude: latitude,
    longitude: longitude,
  };

  console.log('endereco++>', userAddress)
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
    setLongitude(location.coords.longitude);
    setLatitude(location.coords.latitude);
    setLocation(location);
  };

  useEffect(() => {
    const timer = setInterval(() => userLocation(), 2000);
    return () => clearInterval(timer);
  }, [userLocation]);

  const tags = Object.keys(allCartItems).reduce((result, key) => {
    return result.concat(allCartItems[key].foods);
  }, []);

  let newA = tags.map(({ id, quantity }) => {
    return { meal_id: id, quantity };
  });

  let resId = allCartItems.map(({ resId } : { resId : any }) => {
    return `${resId}`.toString();
  });
  let restaurantId = resId.toString();

  const onPressBuy = async () => {
    setLoading(true);

    // Success;
    completeOrder();

    setLoading(false);
  };

  const completeOrder = async () => {
    
    let tokenvalue = user?.token;

  

  if (!userAddress) {
      alert("Por favor Preencha o Endere??o de Entrega");
    } else {
      let response = await fetch(
        "https://www.sunshinedeliver.com/api/customer/order/add/",
        {
          //mode: "no-cors",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_token: tokenvalue,
            restaurant_id: restaurantId,
            address: userAddress,
            order_details: newA,
          }),
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          alert(responseJson.status);
          //alert(responseJson.error);
          console.log("Response", responseJson);
          setTimeout(() => {
            setLoadingOrder(false);
            dispatch(updateBusket([]));
            navigation.navigate("SuccessScreen");
          }, 2000);
        })
        .catch((error) => {
          alert("Selecione Comida apenas de um restaurante");
          navigation.navigate("CartScreen");
          console.log(error);
        });
    }
  };

  const mapRef = useRef();

  return (
    <>
      <View style={[tailwind`bg-blue-300 relative `, { height: 250 }]}>
        <MapView
         ///  mapType="satellite"
          provider={PROVIDER_GOOGLE}
          region={initialRegion}
          // ref={mapRef}
          style={tailwind`h-full z-10`}
        >
          <Marker
            coordinate={initialCoordinate}
            identifier="shop"
            anchor={{ x: 0.5, y: 0.5 }}
            title="Shop"
          >
            <Image
              source={require("../assets/shop.png")}
              style={{ height: 27, width: 27 }}
            />
          </Marker>
        </MapView>
      </View>

      <Screen style={tailwind`flex-1`}>
      
      <TextInput
          style={tailwind`h-10 w-full bg-white rounded-full items-center justify-center border border-blue-500 `} 
            placeholder="Adicione seu endere??o" 
            value={userAddress}
            onChangeText={(text) => setUserAddress(text)}
            autoCapitalize={'none'}
          />


        <TouchableOpacity 
         style={tailwind`h-10 w-full bg-white rounded-full items-center justify-center border border-blue-500 `} 
          onPress={completeOrder}>
          <Text>FA??A SEU PEDIDO </Text>
        </TouchableOpacity>
      </Screen>
    </>
  );
};


export default CheckoutScreen;