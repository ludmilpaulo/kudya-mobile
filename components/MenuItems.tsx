import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tailwind from "tailwind-react-native-classnames";
import Currency from "react-currency-formatter";
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from "../redux/slices/basketSlice";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/outline";

interface Meals {
  food: {
    id: number;
    name: string;
    short_description: string;
    price: number;
    image: string;
  };
}

const MenuItems: React.FC<Meals> = ({ food }) => {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const { id, name, short_description, price, image } = food;

  const items = useSelector((state: any) => selectBasketItemsWithId(state, id));

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, short_description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (items.length > 0) {
      dispatch(removeFromBasket(id));
    }
  };
  
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        style={tailwind`bg-white border p-4 border-gray-200`}
      >
        <View style={tailwind`flex-row`}>
          <View style={tailwind`flex-1 pr-2`}>
            <Text style={tailwind`mb-1 text-lg`}>{food.name}</Text>
            <Text style={tailwind`text-gray-400`}>{food.short_description}</Text>
            <Text style={tailwind`mt-2 text-gray-400`}>
            {food.price !== undefined ? (
    <Currency quantity={food.price} currency="ZAR" />
  ) : null}
            </Text>
          </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4",
                height: 100, // Adjust the size as needed
                width: 100,  // Adjust the size as needed
              }}
              source={{ uri: food.image }}
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View style={tailwind`px-4 bg-white`}>
          <View style={tailwind`flex-row items-center pb-3 space-x-2`}>
            <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
              <MinusCircleIcon color={items.length > 0 ? "#00CCBB" : "gray"} size={40} />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color="#00CCBB" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default MenuItems;
