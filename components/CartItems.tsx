import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tailwind from 'tailwind-react-native-classnames';

import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from '../configs/colors';

import {
    selectBasketItems,
    selectBasketTotal,
  } from "../redux/slices/basketSlice";


const CartItems = () => {
    const allCartItems = useSelector(selectBasketItems)
    const dispatch = useDispatch()

    console.log("tudo+>", allCartItems)

    return (
        <ScrollView style={tailwind`mx-4 mt-3`} showsVerticalScrollIndicator={false}>
<Text style={tailwind`text-center text-black`}>No cart items!</Text>
      
                <View style={tailwind`mb-4`}>
                    <View style={tailwind`mb-4 relative justify-center`}>
                        <Image style={tailwind`w-full h-16 rounded-lg`} source={{ uri: item.resImage }} />
                        <View style={[tailwind`absolute top-0 left-0 w-full h-full bg-black rounded-lg`, { opacity: 0.5 }]} />
                        <Text style={tailwind`absolute self-center text-white w-3/4 text-center font-bold text-xl`} numberOfLines={1}>{item.resName}</Text>
                    </View>
                   
                        <View style={tailwind`mb-3 flex-row justify-between items-center pb-3 border-b border-gray-100`} key={item.id} >
                            <View style={tailwind`flex-1 pr-3 flex-row items-center`}>
                             
                                   
                         
                                <View style={tailwind`flex-1 pl-2`}>
                                    <Text style={[tailwind`text-gray-900 font-bold mb-1`, { fontSize: 16 }]}></Text>
                                    <Text style={tailwind`text-gray-800 text-xs`}></Text>
                                    <Text style={tailwind`text-gray-600 text-xs`}></Text>
                                </View>
                            </View>
                            <View style={tailwind``} >
                                <Image style={tailwind`h-16 w-16 rounded-lg`}  />
                            </View>
                        </View>
         
                </View>
      
        </ScrollView>
    );
}

const styles = StyleSheet.create({})

export default CartItems;