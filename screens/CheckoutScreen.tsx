import { View, Text } from "react-native";
import React, { useState } from "react";
import tailwind from "tailwind-react-native-classnames";
import AppHead from "../components/AppHead";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { selectUser } from "../redux/slices/authSlice";
import { selectCartItems, updateBusket } from "../redux/slices/basketSlice";

const CheckoutScreen = () => {
  const [loading, setLoading] = useState(false);
 
  const [loadingOrder, setLoadingOrder] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const allCartItems = useSelector(selectCartItems);
  const user = useSelector(selectUser);

  return (
    <View>
      <Text>CheckoutScreen</Text>
    </View>
  );
};

export default CheckoutScreen;
