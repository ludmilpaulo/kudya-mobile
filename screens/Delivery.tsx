import { View, StyleSheet, Dimensions, Platform, Image, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import tailwind from 'tailwind-react-native-classnames';
import { XCircleIcon } from 'react-native-heroicons/outline';
import * as Progress from "react-native-progress"
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { selectUser } from '../redux/slices/authSlice';

import * as Location from 'expo-location';
import * as Device from 'expo-device';


import PolylineDirection from '@react-native-maps/polyline-direction';

interface LatLon {
   latitude: number;
   longitude: number; 
   altitude: number;
   heading: number; 
   altitudeAccuracy: number; 
   speed: number;
    accuracy: number;
  }


const Delivery = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const url = "https://www.sunshinedeliver.com";
    const GOOGLE_MAPS_APIKEY = 'AIzaSyBBkDvVVuQBVSMOt8wQoc_7E-2bvDh2-nw';

  const [ driverLocation, setDriverLocation ] = useState<LatLon[]>();
  const [location, setLocation] = useState<LatLon[]>();
  const [errorMsg, setErrorMsg] = useState(null);

  const [userlongitude, setUserLongitude ] = useState(0);
  const [userlatitude, setUserLatitude ] = useState(0);

  const [userPhoto, setUserPhoto] = useState("");

  const customer_avatar = `${userPhoto}`;
  const customer_image = `${url}${customer_avatar}`;

  const [userId, setUserId] = useState<any>(user?.user_id);

  

  const pickUser = async () => {
    let response = await fetch(
      "https://www.sunshinedeliver.com/api/customer/profile/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setUserPhoto(responseJson.customer_detais.avatar);
      })
      .catch((error) => {
        // console.error(error);
      });
  };

 
  
  
  
  const getDriverLocation = async () => {
    let tokenvalue = user?.token;
      let userName = user?.username;
  
      let response = await fetch('https://www.sunshinedeliver.com/api/customer/driver/location/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              access_token: tokenvalue
            
            })
        })
        const locationData = await response.json();
        let result = locationData?.location;
        let blah2 = result.replace(/['']/g, '"');

        setDriverLocation(JSON.parse(blah2)); 

       
  }


  const userLocation = async () => {
    if (Platform.OS === 'android' && !Device.isDevice) {
      alert(
        'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
      );
      return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('A permissão para acessar o local foi negada');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLongitude(location.coords.longitude);
    setUserLatitude(location.coords.latitude);
    setLocation(location?.coords);
};

  
    
  

  const initialRegion = {
    latitude: userlatitude,                     
    longitude: userlongitude, 
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  }


  useEffect(()=>{
    console.log("cota", location?.latitude);
    pickUser();
    getDriverLocation();
    userLocation();

 
  }, [])
  




  return (
    <Screen style={tailwind`flex-1`}>
        <View style={tailwind`flex-row justify-between items-center p-5`}>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            >
                <XCircleIcon color="#004AAD" size={30} />
            </TouchableOpacity>
            <Text style={tailwind`font-light text-lg`}>Delivery</Text>
        </View>

        <View style={tailwind`bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md`}>
            <View style={tailwind`flex-row justify-between`}>
                <View>
                    <Text style={tailwind`text-lg text-gray-400`}>
                        Estimated Arrival
                    </Text>
                    <Text style={tailwind`text-4xl font-bold`}> 45-55 Minutes</Text>
                </View>
                <Image
                source={{
                    uri: "https://links.papareact.com/fls",
                }}
                style={tailwind`h-20 w-20`}
            
                />

            </View>
            <Progress.Bar size={30} color="#004AAD" indeterminate={true} />

        </View>

        <MapView
         ///  mapType="satellite"
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: driverLocation?.latitude,
            longitude: driverLocation?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          // ref={mapRef}
          style={tailwind`flex-1 -mt-10 z-0`}

        >
          <PolylineDirection
              origin={{
                latitude: driverLocation?.latitude,
                longitude: driverLocation?.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              destination={initialRegion}
              apiKey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              strokeColor="#004AAD"
            />


{driverLocation && (
                    <Marker
                        coordinate={{
                          latitude: driverLocation?.latitude,
                          longitude: driverLocation?.longitude,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
                        identifier="shop"
                        anchor={{ x: 0.5, y: 0.5 }}
                        title={user?.username}
                    >
                        <Image source={{ uri: customer_image }} style={tailwind`h-12 w-12 p-4 rounded-full`} />
                    </Marker>
                )}

{initialRegion && (
                    <Marker
                        coordinate={{
                            ...initialRegion
                        }}
                        identifier="shop"
                        anchor={{ x: 0.5, y: 0.5 }}
                        title={user?.username}
                    >
                        <Image source={{ uri: customer_image }} style={tailwind`h-12 w-12 p-4 rounded-full`} />
                    </Marker>
                )}

         
        

      </MapView>
      
    </Screen>
  )
}

export default Delivery