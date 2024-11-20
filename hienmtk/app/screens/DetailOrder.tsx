import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import { ADDCART, GET_IMG } from '../api/apiService';
import InputSpinner from 'react-native-input-spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const DetailOrder = ({ navigation, route }: any) => {

    const { order } = route.params;

    if (!order) {
        return <Text>Order not found!</Text>;
    }

    const formatCurrency = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    const renderProduct = ({ item }) => (
        <View style={styles.productItem}>
            <Image source={{ uri: GET_IMG("products/image", item.product.image) }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.product.productName}</Text>
                <Text>Số lượng: {item.quantity}</Text>
                <Text>Giá: {formatCurrency(item.orderedProductPrice)}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                {/* Header Section */}
                <View style={styles.header_bottom}>
                    <View style={styles.header_option1}>
                        <Image source={require('../../assets/images/banner/Logo 1.png')} style={styles.logo} resizeMode='contain' />
                    </View>
                    <View style={styles.header_option2}>
                        <FontAwesome name="search" size={20} color="#9A7D60" style={styles.header_icon} />
                        <Ionicons name="language-sharp" size={24} color="#9A7D60" style={styles.header_icon} />
                    </View>
                </View>

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>

                {/* Order Information */}
                <View style={styles.orderInfo}>
                    <Text style={styles.orderTitle}>Chi tiết đơn hàng -  {new Date(order.orderDate).toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' })}</Text>
                    <Text>Mã đơn hàng: {order.orderId}</Text>
                    <Text>Ngày: {new Date(order.orderDate).toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' })}</Text>
                    <Text>Tình trạng: {order.orderStatus}</Text>
                </View>

                {/* Product List */}
                <FlatList
                    data={order.orderItems}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item.id}
                    style={styles.productList}
                />

                <View style={styles.totalAmount}>
                    <Text style={styles.totalText}>Tổng tiền: {formatCurrency(order.totalAmount)}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default DetailOrder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header_bottom: {
        marginTop: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        shadowColor: "#d2691e",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
    },
    logo: {
        width: 150,
        height: 40,
    },
    header_option1: { flex: 1 },
    header_option2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    header_icon: { margin: 5 },
    backButton: {
        marginHorizontal: 10,
        marginVertical: 10,
    },
    orderInfo: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#d2691e',
    },
    orderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productList: {
        paddingVertical: 10,
    },
    productItem: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 5
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalAmount: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#d2691e',
        alignItems: 'flex-end',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});