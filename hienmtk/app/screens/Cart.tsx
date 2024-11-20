import { Dimensions, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { GET_IMG, REMOVEFROMCART } from '../api/apiService';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Cart = ({ navigation, route }: any) => {

    const [products, setProducts] = useState([]);


    useEffect(() => {
        const loadCart = async () => {
            try {
                const storedCart = await AsyncStorage.getItem('cart')
                if (storedCart) {
                    setProducts(JSON.parse(storedCart))
                }
            } catch (error) {
                console.error('Error loading cart data from AsyncStorage', error)
            }
        }
        loadCart()
    }, [])

    // Save cart data to AsyncStorage whenever products array changes
    useEffect(() => {
        const saveCart = async () => {
            try {
                await AsyncStorage.setItem('cart', JSON.stringify(products))
            } catch (error) {
                console.error('Error saving cart data to AsyncStorage', error)
            }
        }
        saveCart()
    }, [products])

    // Handle deleting a product from the cart
    const handleDeleteProduct = async (index: number, productId: number) => {
        try {
            const cartId = await AsyncStorage.getItem('cartId');
            if (cartId) {
                console.log("card Id: ", cartId);
            }
            await REMOVEFROMCART(cartId, productId);

            setProducts((prevData) => prevData.filter((_, i) => i !== index));
        } catch (error) {
            console.error("Error deleting product from the cart:", error)
        }
    }

    // Navigate to the payment screen
    const handleNext = () => {
        navigation.navigate('Payment', { products: products })
    }
    const formatCurrency = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    // Calculate the total price of the cart
    const totalSum = products.reduce((sum, item) => sum + item.totalPrice, 0)

    return (
        <>
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    {/* Header Section */}
                    <View style={styles.header_bottom}>
                        <View style={styles.header_option1}>
                            <Image source={require('../../assets/images/banner/Logo 1.png')} style={styles.logo} />
                        </View>
                        <View style={styles.header_option2}>
                            <FontAwesome name="search" size={20} color="background: #9A7D60" style={styles.header_icon} />
                            <Ionicons name="language-sharp" size={24} color="background: #9A7D60" style={styles.header_icon} />
                        </View>
                    </View>

                    <View style={styles.page_name}>
                        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={styles.page_title}>
                            <Text style={styles.txt_title}>Giỏ hàng</Text>
                        </View>
                        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.goBack()}>
                            <Fontisto name="save" size={24} color="#4a2306" />
                        </TouchableOpacity>
                    </View>

                    {/* Cart Items */}
                    <SwipeListView
                        data={products}
                        renderItem={(data, rowMap) => (
                            <View style={styles.cart_item}>
                                <View style={styles.cart_item_img}>
                                    <Image
                                        source={{ uri: GET_IMG("products/image", data.item.image) }}
                                        style={styles.image}
                                        resizeMode="contain"
                                    />
                                </View>

                                <View style={styles.cart_item_info}>
                                    <Text style={styles.cart_item_name}>{data.item.productName}</Text>
                                    <Text style={styles.cart_item_select}>Kích cỡ: {data.item.selectedSize}</Text>
                                    <Text style={styles.cart_item_select}>x {data.item.quantity}</Text>
                                </View>

                                <View style={styles.cart_item_action}>
                                    <View style={styles.action}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Giá:{formatCurrency(data.item.total)}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                        renderHiddenItem={(data, rowMap) => (
                            <TouchableOpacity
                                style={styles.rightAction}
                                onPress={() => handleDeleteProduct(data.index, data.item.productId)}>
                                <View style={styles.BTNrightAction}>
                                    <FontAwesome name="trash" size={26} color="#dd0c0c" />
                                </View>
                            </TouchableOpacity>
                        )}
                        rightOpenValue={-75}
                        keyExtractor={(item) => item.key}
                    />


                    <View style={styles.note}>
                        <textarea style={styles.note_container} />
                        <Text style={styles.note_title}>Ghi chú</Text>
                    </View>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.payment} onPress={handleNext}>
                <Text style={styles.btn_payment}> Tiếp tục &nbsp;&nbsp;&nbsp;
                    <Text style={{ color: 'white' }}>{formatCurrency(totalSum)}</Text>
                </Text>
            </TouchableOpacity></>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    header_bottom: {
        marginTop: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
    },
    logo: {
        width: 150,
        height: 40,
    },
    header_option1: {
        flex: 1,
    },
    header_option2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    header_icon: {
        margin: 5,
    },
    page_name: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#d2571e',
        marginHorizontal: 10,
    },
    page_title: {
        flex: 1,
        alignItems: 'flex-start',
    },
    txt_title: {
        color: '#4a2306',
        fontWeight: '600',
        fontSize: 20,
    },
    cart_container: {
        flexDirection: 'column',
    },
    cart_item: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        position: 'relative',
    },
    cart_item_img: {
        flex: 1,
        alignItems: 'center',
    },
    cart_item_info: {
        flex: 2,
    },
    cart_item_action: {
        flex: 1,
        marginRight: 15
    },
    cart_item_name: {
        color: '#4a2306',
        fontSize: 20,
        fontWeight: '600',
    },
    cart_item_select: {
        color: '#4a2306',
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flex: 1,
        marginHorizontal: 15,
        marginVertical: 10,
        width: 20,
        height: 20,
    },
    quantity: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn_quantity: {
        flex: 1,
    },
    txt_quantity: {
        textAlign: 'center',
        marginHorizontal: 10,
    },
    note: {
        position: 'relative',
        marginTop: 20,
        paddingHorizontal: 15
    },
    note_container: {
        borderWidth: 1,
        borderColor: '#4a2306',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        height: 150
    },
    note_title: {
        position: 'absolute',
        top: -12,
        left: 25,
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        fontSize: 15,
        fontWeight: 600,
        color: '#610000',
    },
    payment: {
        alignItems: 'flex-end',
        margin: 20,
    },
    btn_payment: {
        backgroundColor: '#d2691e',
        borderRadius: 20,
        color: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontWeight: 600,
        shadowColor: "#7a7a7a",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,

        elevation: 5,
    },
    rightAction: {
        position: 'absolute', // Allow the delete button to overlay the item
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#d2571e',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 15,
        width: '75%',
        borderRadius: 10,
        marginHorizontal: 12,
        marginVertical: 22,
    },
    BTNrightAction: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    trashIcon: {
        color: '#dd0c0c',  // Keep the icon color consistent
        fontSize: 26,  // Increase the icon size
    },
    image: {
        width: 50, // Adjust based on your layout
        height: 50, // Adjust based on your layout
        borderRadius: 5, // Optional: to give it rounded corners
        marginBottom: 10, // Optional: spacing below the image
        marginRight: 15
    },
});
