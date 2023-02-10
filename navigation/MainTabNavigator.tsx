import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons';
import colors from '../configs/colors';
import HomeScreen from '../screens/HomeScreen'
import TabCartButton from '../components/TabCartButton'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CartScreen from '../screens/CartScreen';

const Tab = createBottomTabNavigator()

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.activeTintColor,
                tabBarInactiveTintColor: colors.inActiveTintColor,
                headerShown: false,
                tabBarStyle: {
                    borderTopWidth: 0,
                    paddingTop: 10,
                    paddingBottom: 10,
                    height: 60,
                },
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" color={color} size={size} />
                    )
                }}
            />
           
            <Tab.Screen name="Cart" component={CartScreen}
                options={({ navigation }) => ({
                    tabBarButton: () => <TabCartButton onPress={() => navigation.navigate('Cart')} />
                })}
            />
           
        </Tab.Navigator>
    );
}


export default MainTabNavigator;