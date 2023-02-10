import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import tailwind from 'tailwind-react-native-classnames';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import colors from '../configs/colors';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../redux/slices/basketSlice';



interface Meals{
    resImage : string;
    resName : string;
    resId : number;
    category: string;
    id : number; 
    image : string; 
    name : string; 
    price : number;
    quantity : number;
    short_description : string;
}


const MenuItems = ({ resName, resImage, resId, name, image, price, id, short_description}: Meals) => {
   const [isPressed, setIsPressed ] = useState(false);
   const [qty, setQty] = useState<number>(1);




  const items = useSelector((state) => selectBasketItemsWithId(state, id))

   const dispatch = useDispatch();

   const addItemToBasket = () =>{

    dispatch(addToBasket({resName,resImage, name,resId, image, price, id, short_description}))


   }

   const removeItemFromBasket = () => {
    if(!items.length > 0) return;

    dispatch(removeFromBasket({id}));
   }


  
  

    return (
        <>
        <TouchableOpacity onPress={() => setIsPressed(!isPressed)} 
       // style={tailwind`bg-white border p-4 border-gray-200 `}
        > 
        <View style={tailwind`mt-5 mb-12`}>
          
                <View style={tailwind`mb-3 flex-row justify-between items-center pb-3 border-b border-gray-100`} key={id}>
                    <View style={tailwind`flex-1 pr-3 flex-row items-center`}>
               
                        <View style={tailwind`flex-1 pl-2`}>
                            <Text style={[tailwind`text-gray-900 font-bold mb-1`, { fontSize: 16 }]}>{name}</Text>
                            <Text style={tailwind`text-gray-800 text-xs`}>{price},Kz</Text>
                            <Text style={tailwind`text-gray-600 text-xs`}>{short_description}</Text>
                        </View>
                    </View>
                    <View style={tailwind``} >
                        <Image style={tailwind`h-16 w-16 rounded-lg`} source={{ uri: image }} />
                    </View>
                </View>

                {isPressed && (
            <View>
                <View style={tailwind`flex-row items-center pb-3`} >
                    <TouchableOpacity
                   
                   onPress={removeItemFromBasket}
                    >
                        <MinusCircleIcon size={40} color="#004AAD" />

                    </TouchableOpacity>
                    <Text>{items.length}</Text>

                    <TouchableOpacity
                     onPress={addItemToBasket}
                       
                    >
                        <PlusCircleIcon
                        
                         size={40} 
                         color="#004AAD" />
                    </TouchableOpacity>


                </View>
            </View>
        )}
         
        </View>
        </TouchableOpacity>
      
        </>
    );
}

const styles = StyleSheet.create({})

export default MenuItems;