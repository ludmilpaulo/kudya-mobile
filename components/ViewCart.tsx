import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import tailwind from "tailwind-react-native-classnames";
import { selectBasketItems, selectBasketTotal } from "../redux/slices/basketSlice";

const ViewCart = () => {
 

  const items = useSelector(selectBasketItems);
  const navigation = useNavigation<any>();
  const basketTotal = useSelector(selectBasketTotal);
  return (
    <>

        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          style={tailwind`bg-black absolute bottom-4 self-center py-3 px-12 rounded-full z-50`}
        >
          <Text style={tailwind`text-white text-sm`}>
            Ver sua Bandeja • {basketTotal}Kz ({items.length})
          </Text>
        </TouchableOpacity>

    </>
  );
};

export default ViewCart;
