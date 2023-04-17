import { View, StyleSheet, Dimensions, Platform, Image, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import tailwind from 'tailwind-react-native-classnames';
import { XCircleIcon } from 'react-native-heroicons/outline';
import * as Progress from "react-native-progress"
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE , Polyline } from 'react-native-maps';
import { selectUser } from '../redux/slices/authSlice';

import * as Location from 'expo-location';
import * as Device from 'expo-device';



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
  const origin = '37.7749,-122.4194'; // example San Francisco coordinates
  const destination = '40.7128,-74.0060'; // example New York City coordinates

const urlTime = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

useEffect(() =>{
  
  fetch(urlTime)
  .then(response => response.json())
  .then(data => {
    const travelTime = data.routes[0].legs[0].duration.text;
    const points = data.routes[0].overview_polyline.points;
    const decodedPoints = decodePolyline(points);
    console.log(decodedPoints);
    setPointsCord(decodedPoints);
    setEstimatedTime(travelTime);
    
  })
  .catch(error => console.error(error));
  console.log('Estimated travel time:', pointsCord);
},[pointsCord]);

   
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

      
    </Screen>
  )
}

export default Delivery

function decodePolyline(points: any) {
  throw new Error('Function not implemented.');
}
