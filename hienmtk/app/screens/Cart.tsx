import { Dimensions, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Image, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';



const Cart = ({ navigation }: { navigation: any }) => {
    // Cart items array with quantity
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Espresso', size: 'Small', milk: '2%', shots: 2, quantity: 1 },
        { id: 2, name: 'Croissant', size: 'Large', milk: 'Whole', shots: 1, quantity: 1 },
    ]);

    // Increase quantity of specific cart item
    const handleIncrease = (index: number) => {
        const updatedItems = [...cartItems];
        updatedItems[index].quantity += 1;
        setCartItems(updatedItems);
    };

    // Decrease quantity of specific cart item
    const handleDecrease = (index: number) => {
        const updatedItems = [...cartItems];
        if (updatedItems[index].quantity > 1) {
            updatedItems[index].quantity -= 1;
        }
        setCartItems(updatedItems);
    };

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
                        <FontAwesome name="search" size={20} color="background: #9A7D60" style={styles.header_icon}  />
                        <Ionicons name="language-sharp" size={24} color="background: #9A7D60" style={styles.header_icon}  />
                        </View>
                    </View>

                    <View style={styles.page_name}>
                        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={styles.page_title}>
                            <Text style={styles.txt_title}>Your Order</Text>
                        </View>
                        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.goBack()}>
                            <Fontisto name="save" size={24} color="#4a2306" />
                        </TouchableOpacity>
                    </View>

                    {/* Cart Items */}
                    <View style={styles.cart_container}>
                        {cartItems.map((item, index) => (
                            <View key={item.id} style={styles.cart_item}>
                                <View style={styles.cart_item_img}>
                                    <Image source={require('../../assets/images/product/Croissant (1).png')} />
                                </View>
                                <View style={styles.cart_item_info}>
                                    <Text style={styles.cart_item_name}>{item.name}</Text>
                                    <Text style={styles.cart_item_select}>Size: {item.size}</Text>
                                    <Text style={styles.cart_item_select}>Milk: {item.milk}</Text>
                                    <Text style={styles.cart_item_select}>Espresso shots: {item.shots}</Text>
                                </View>

                                <View style={styles.cart_item_action}>
                                    <View style={styles.action}>
                                        <TouchableOpacity>
                                            <FontAwesome name="trash-o" size={20} color="#4a2306" style={styles.row}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <FontAwesome5 name="pen" size={20} color="#4a2306" style={styles.row}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.quantity}>
                                        <TouchableOpacity onPress={() => handleDecrease(index)}>
                                            <AntDesign name="minuscircleo" size={20} color="#4a2306" style={styles.btn_quantity} />
                                        </TouchableOpacity>
                                        <Text style={styles.txt_quantity}>{item.quantity}</Text>
                                        <TouchableOpacity onPress={() => handleIncrease(index)}>
                                            <AntDesign name="pluscircleo" size={20} color="#4a2306" style={styles.btn_quantity} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.note}>
                        <textarea style={styles.note_container} />
                        <Text style={styles.note_title}>Your note</Text>
                    </View>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.payment} onPress={() => navigation.navigate('Payment')}>
                <Text style={styles.btn_payment}> Continue</Text>
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
    }
});
