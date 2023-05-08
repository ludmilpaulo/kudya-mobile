import { View, StyleSheet, Dimensions, Platform, Image, TouchableOpacity, Text, Button } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import tailwind from 'tailwind-react-native-classnames';
import { XCircleIcon } from 'react-native-heroicons/outline';
import * as Progress from "react-native-progress"
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE , Polyline, Region} from 'react-native-maps';
import  {DirectionsService } from 'react-native-maps';




import { selectUser } from '../redux/slices/authSlice';

import * as Location from 'expo-location';
import * as Device from 'expo-device';



import axios from 'axios';

interface LatLng {
  latitude: number;
  longitude: number;
}


const Delivery = () => {

    const navigation = useNavigation();

    const mapRef = useRef(null);

    const [ deliveryDuration, setDeliveryDuration ] = useState();
    const [ deliveryPoints, setDeliveryPoints ] = useState();

    const [ driverLocation, setDriverLocation ] = useState<any | null>();
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);

    const [userlongitude, setUserLongitude ] = useState(0);
    const [userlatitude, setUserLatitude ] = useState(0);

    const [ destination, setDestination ] = useState();

    const [driverLongitude, setDriverLong ] = useState(0);
    const [driverLatitude, setDriverLat ] = useState(0);

    const user = useSelector(selectUser);

    const GOOGLE_MAPS_APIKEY = 'AIzaSyDn1X_BlFj-57ydasP6uZK_X_WTERNJb78';

  const getTravelTime = async (
    origin: LatLng,
    destination: LatLng,
  ): Promise<number | null> => {
    const apiKey = 'AIzaSyDn1X_BlFj-57ydasP6uZK_X_WTERNJb78';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const duration = response.data.routes[0]?.legs[0].duration.value;
      const points = response.data.routes[0].overview_polyline.points;
      setDeliveryDuration(duration);
      setDeliveryPoints(points);
      return duration;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getDriverLocation = async () => {
  
    let userName = user.username;
    setDestination(userName);

    let response = await fetch('https://www.sunshinedeliver.com/api/customer/driver/location/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_token: user?.token
          
          })
      })
      const locationData = await response.json();
      setDriverLocation(locationData?.location); 

    
      console.log("driver location")

      console.log("API call", response)

}

const initialRegion = {
    latitude: userlatitude,                     
    longitude: userlongitude, 
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  }

  const initialCoordinate = {
      latitude: driverLatitude,
      longitude: driverLongitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
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
      setLocation(location);
};

  





const [travelTime, setTravelTime] = useState<number | null>(null);

  useEffect(() => {

    userLocation();
    getDriverLocation();

    covertDriverLocation();

    const origin = { latitude: driverLatitude, longitude: driverLongitude }; // New York City

    
    const destination = { latitude: userlatitude, longitude: userlongitude }; // San Francisco
    getTravelTime(origin, destination).then((time) => setTravelTime(time));


  

    console.log("initial o", origin)
  }, []);


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

  const [directionCoords, setDirectionCoords] = useState([]);

  const handleGetDirections = () => {
    const origin = { latitude: 37.78825, longitude: -122.4324 };
    const destination = { latitude: 37.7749, longitude: -122.4194 };
    DirectionsService.route(
      {
        origin,
        destination,
        travelMode: 'DRIVING',
      },
      (result, status) => {
        if (status === 'OK') {
          setDirectionCoords(result.routes[0].overview_path);
        } else {
          console.error(result);
        }
      }
    );
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
                   <Text></Text>
                    {travelTime && 
                    <Text style={tailwind`text-4xl font-bold`}>Travel time: {Math.round(travelTime / 60)} minutes</Text>}
                    
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
        <View style={[tailwind`bg-blue-300 relative `, { height: 500 }]}>
        <Button title="Get Directions" onPress={getTravelTime} />
      <MapView

          region={initialCoordinate}
  
        style={tailwind`h-full z-10`}
      >
        {directionCoords.length > 0 && (
          <Polyline
            coordinates={directionCoords}
            strokeColor="#F00"
            strokeWidth={3}
          />
        )}
        <Marker coordinate={initialCoordinate}
        
         >
           <Image
                source={{
                    uri: "https://links.papareact.com/fls",
                }}
                style={tailwind`h-20 w-20`}
            
                />
          
          </Marker>
        <Marker coordinate={{ latitude: 37.7749, longitude: -122.4194 }} />
      </MapView>
      <Button title="Get Directions" onPress={handleGetDirections} />
    </View>
        
   
      
    </Screen>
  )
}

export default Delivery;
function setCurrentLocation(arg0: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number; }) {
  throw new Error('Function not implemented.');
}

