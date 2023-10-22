import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { selectRestaurant } from '../redux/slices/restaurantSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from '../redux/slices/basketSlice'
import { useEffect, useState } from 'react';
import { XCircleIcon } from 'react-native-heroicons/solid';

import Currency from 'react-currency-formatter';
import tailwind from "tailwind-react-native-classnames";


const CartScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  console.log("restaurants", items)
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView style={tailwind`flex-1 bg-white`}>
      <View style={tailwind`flex-1 bg-gray-100`}>
        <View style={tailwind`p-5 border-b border-[#00CCBB] bg-white shadow-xs`}>
          <View>
            <Text style={tailwind`text-lg font-bold text-center`}>Basket</Text>
            <Text style={tailwind`text-center text-gray-400`}>
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            style={tailwind`rounded-full bg-gray-100 absolute top-3 right-5`}
          >
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View style={tailwind`flex-row items-center space-x-4 px-4 py-3 bg-white my-5`}>
          <Image
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
            style={tailwind`h-7 w-7 bg-gray-300 p-4 rounded-full`}
          />
          <Text style={tailwind`flex-1`}>Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text style={tailwind`text-[#00CCBB]`}>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={tailwind`divide-y divide-gray-200`}>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              style={tailwind`flex-row items-center space-x-3 bg-white py-2 px-5`}
            >
              <Text style={tailwind`text-[#00CCBB]`}>{items.length} x</Text>
              <Image
                source={{ uri: items?.image}}
                style={tailwind`h-12 w-12 rounded-full`}
              />
              <Text style={tailwind`flex-1`}>{items[0]?.name}</Text>

              <Text style={tailwind`text-gray-600`}>
                <Currency quantity={items[0]?.price} currency="GBP" />
              </Text>

              <TouchableOpacity>
                <Text
                  style={tailwind`text-[#00CCBB] text-xs`}
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={tailwind`p-5 bg-white mt-5 space-y-4`}>
          <View style={tailwind`flex-row justify-between`}>
            <Text style={tailwind`text-gray-400`}>Subtotal</Text>
            <Text style={tailwind`text-gray-400`}>
              <Currency quantity={basketTotal} currency="GBP" />
            </Text>
          </View>

          <View style={tailwind`flex-row justify-between`}>
            <Text style={tailwind`text-gray-400`}>Delivery Fee</Text>
            <Text style={tailwind`text-gray-400`}>
              <Currency quantity={5.99} currency="GBP" />
            </Text>
          </View>

          <View style={tailwind`flex-row justify-between`}>
            <Text>Order Total</Text>
            <Text style={tailwind`font-extrabold`}>
              <Currency quantity={basketTotal + 5.99} currency="GBP" />
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('PreparingOrderScreen')}
            style={tailwind`rounded-lg bg-[#00CCBB] p-4`}
          >
            <Text style={tailwind`text-center text-white text-lg font-bold`}>
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
