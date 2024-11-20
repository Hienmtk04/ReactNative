import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feed from './hometabs/Feed';
import AntDesign from '@expo/vector-icons/AntDesign';
import Order from './hometabs/Order';
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Profile from './hometabs/Profile';
import AboutUs from './hometabs/AboutUs';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation, route }:any ) => {

    const { username } = route.params || {};    
    return (
        <>
            <Tab.Navigator
                initialRouteName="Feed"
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#e91e63',
                }}
            >
                <Tab.Screen
                    name="Feed"
                    component={Feed}
                    initialParams={{ username }}    
                    options={{
                        tabBarLabel: 'Trang chủ',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}

                />
                <Tab.Screen
                    name="Order"
                    component={Order}
                    options={{
                        tabBarLabel: 'Thực đơn',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="food-fork-drink" size={24} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="AboutUs"
                    component={AboutUs}
                    options={{
                        tabBarLabel: 'Về chúng tôi',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="tag" size={24} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarLabel: 'Cá nhân',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" size={24} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>

        </>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '##9f1818',
        backgroundColor: '#d2691e',
        paddingLeft: 30
    },

    bottomNavAction: {
        flexDirection: 'row',
        flex: 2,
        backgroundColor: 'white'
    },
    navButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flex: 1,
    },
    navButtonText: {
        fontWeight: 'bold',
        color: '#d2691e',
    },
    icon: {
        width: 25,
        height: 30
    },
})