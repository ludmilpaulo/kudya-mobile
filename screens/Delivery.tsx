import { View, StyleSheet, Dimensions, Platform, Image, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import tailwind from 'tailwind-react-native-classnames';
import { XCircleIcon } from 'react-native-heroicons/outline';
import * as Progress from "react-native-progress"
import { useDispatch, useSelector } from "react-redux";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { selectUser } from '../redux/slices/authSlice';

import  MapViewDirections  from 'react-native-maps-directions';

const Delivery = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch();

  const user = useSelector(selectUser);
    const GOOGLE_MAPS_APIKEY = 'AIzaSyBBkDvVVuQBVSMOt8wQoc_7E-2bvDh2-nw';

  const [ driverLocation, setDriverLocation ] = useState();
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  const [userlongitude, setUserLongitude ] = useState(0);
  const [userlatitude, setUserLatitude ] = useState(0);

  const [ destination, setDestination ] = useState();

  const [driverLong, setDriverLong ] = useState(0);
  const [driverlat, setDriverLat ] = useState(0);

 
  useEffect(() => {
    const timer = setInterval(() => covertDriverLocation()
  
      , 2000);
    return () => clearInterval(timer);
  },[covertDriverLocation]);
  
  
  const getDriverLocation = async () => {
    let tokenvalue = user?.token;
      let userName = user?.username;
      setDestination(userName);
  
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
        setDriverLocation(locationData?.location); 
  }
  
  const initialRegion = {
      latitude: userlatitude,                     
      longitude: userlongitude, 
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }
  
    const initialCoordinate = {
        latitude: -33.9205734,
        longitude: 18.4864381,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }
  
    
      const userLocation = async () => {
        if (Platform.OS === 'android' && !Device.isDevice) {
          setErrorMsg(
            'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
          );
          return;
        }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('A permissão para acessar o local foi negada');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setUserLongitude(location.coords.longitude);
        setUserLatitude(location.coords.latitude);
        setLocation(location);
  };
  
 // useEffect(() => {
  //  const timer = setInterval(() => getDriverLocation(), 2000);
  //  return () => clearInterval(timer);
//  },[getDriverLocation]);

const covertDriverLocation = async () => { 

    const final = driverLocation.replace(/{|},|}/g, "\n").replace(/\[|\]|"/g, "").replace(/,/g, ',\n')
  
    //let blah2 = driverLocation.replace(/[{}]/g, '');
  
    let q = driverLocation.replace(/['"]+/g, '').replace(/[{}]/g, '');
  
     let blah2 = driverLocation.replace(/['']/g, '"');
  
      //use the value variable to get the longitude and latitude values
      let value = JSON.parse(blah2);
        setDriverLong(value.longitude); //it prints here
        setDriverLat(value.latitude); //it prints here   
  
  }
  
  
  
  useEffect(() => {
    const timer = setInterval(() => userLocation(), 2000);
    return () => clearInterval(timer);
  },[userLocation]);
    



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
          region={initialCoordinate}
          // ref={mapRef}
          style={tailwind`flex-1 -mt-10 z-0`}
        >
        

      </MapView>
      
    </Screen>
  )
}

export default Delivery