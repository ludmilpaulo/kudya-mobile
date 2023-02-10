import React, { useMemo, useState, useEffect} from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import Screen from '../components/Screen'
import tailwind from 'tailwind-react-native-classnames';
import AppHead from '../components/AppHead';
import AppButton from '../components/AppButton'

import { useSelector, useDispatch } from 'react-redux';
import colors from '../configs/colors';
import CartItems from '../components/CartItems'
import CheckoutModal from '../components/CheckoutModal'
import { selectRestaurant } from '../redux/slices/restaurantSlice';


import {
    selectBasketItems,
    selectBasketTotal,
  } from "../redux/slices/basketSlice";

const CartScreen = () => {

    const restaurant = useSelector(selectRestaurant)
    const totalPrice = useSelector(selectBasketTotal)
    const items = useSelector(selectBasketItems)

    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setGroupedItemsInBasket(groupedItems);
    }, [items]);

    console.log("quantity", groupedItemsInBasket)

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <Screen style={tailwind`flex-1 bg-white`}>
            <AppHead title={`Your cart (${items.length})`} icon="basket-outline" />
            <View style={tailwind`flex-1`}>
        
            </View>
        
            
        </Screen>
    );
}

const styles = StyleSheet.create({
    left: {
        marginRight: 20
    },
    right: {
        flex: 1
    },
    total: {
        fontSize: 14,
        color: colors.title
    },
    totalAmount: {
        fontSize: 23,
    },
})

export default CartScreen;