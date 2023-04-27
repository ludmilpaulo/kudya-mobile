import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import SuccessScreen from "../screens/SuccessScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import MainTabNavigator from "./MainTabNavigator";
import UserProfile from "../screens/UserProfile";
import OrderHistory from "../screens/OrderHistory";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";

const Stack = createStackNavigator();

export default function HomeNavigator() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(user){
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
              user_id:user?.user_id,
            }),
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
          dispatch(responseJson.customer_detais.avatar);
          })
          .catch((error) => {
            // console.error(error);
          });
      };
    }

  },[])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={MainTabNavigator} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
    </Stack.Navigator>
  );
}
