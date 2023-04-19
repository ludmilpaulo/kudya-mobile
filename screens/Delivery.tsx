import { View, StyleSheet, Dimensions, Platform, Image, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import tailwind from 'tailwind-react-native-classnames';
import { XCircleIcon } from 'react-native-heroicons/outline';
import * as Progress from "react-native-progress"
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE , Polyline, Region } from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';

import { selectUser } from '../redux/slices/authSlice';

import * as Location from 'expo-location';
import * as Device from 'expo-device';


const API_KEY = 'AIzaSyBBkDvVVuQBVSMOt8wQoc_7E-2bvDh2-nw';
const origin = { latitude: 37.78825, longitude: -122.4324 };
const destination = { latitude: 37.787, longitude: -122.431 };

const getDirections = async (origin: { latitude: any; longitude: any; }, destination: { latitude: any; longitude: any; }) => {
  const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    const json = await response.json();
    const points = json.routes[0].overview_polyline.points;
    return points;
  } catch (error) {
    console.error(error);
  }
};



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

 
  
  const [userPhoto, setUserPhoto] = useState("");

  const [estimatedTime, setEstimatedTime] = useState('');  
  const [ pointsCord, setPointsCord] = useState<any>();
  const customer_avatar = `${userPhoto}`;
  const customer_image = `${url}${customer_avatar}`;

  const [userId, setUserId] = useState<any>(user?.user_id);

  const apiKey = 'AIzaSyBBkDvVVuQBVSMOt8wQoc_7E-2bvDh2-nw';
  

const origin = { latitude: 37.78825, longitude: -122.4324 };
const destination = { latitude: 37.787, longitude: -122.431 };



const [points, setPoints] = useState([]);

const [currentLocation, setCurrentLocation] = useState<Region | null>(null);

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

  setCurrentLocation({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
};



  useEffect(() => {
    getDirections(origin, destination).then((points) => {
      return setPoints(decode(points));
    });



  }, []);

  const decode = (encoded: string) => {
    let points = [];
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const deltaLat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += deltaLat;

      shift = 0;
      result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const deltaLng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += deltaLng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return points;
  };

   
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
                    <Text style={tailwind`text-4xl font-bold`}> 45-55 Minutes {estimatedTime}</Text>
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
      style={{ flex: 1 }}
      initialRegion={currentLocation}
      showsUserLocation={true}
      followsUserLocation={true}
    >
      {currentLocation && (
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          title={'Current Location'}
        />
      )}

<Polyline
        coordinates={points}
        strokeColor="#000"
        strokeWidth={2}
      />
      
    </MapView>
     
      
   
      
    </Screen>
  )
}

export default Delivery

function decodePolyline(points: any) {
  throw new Error('Function not implemented.');
}
