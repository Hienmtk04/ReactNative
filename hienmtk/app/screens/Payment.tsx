import { Dimensions, Modal, Platform, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Image, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import RadioGroup, { RadioButton, RadioButtonProps } from 'react-native-radio-buttons-group';
import { FlatList } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { ADD_ORDER, GET_IMG } from '../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import paypalApi from '../api/paypalApi';
import { WebView } from 'react-native-webview';
import * as Linking from 'expo-linking';
import queryString from 'query-string';

const Payment = ({ navigation, route }: any) => {
    // Cart items array with quantity
    const [tip, setTip] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('PAYPAL');
    const [product, setProduct] = useState([]);
    const [paypalUrl, setPaypalUrl] = useState(null);
    const [accessToken, setAccessToken] = useState(null);


    const { products } = route.params;
    const totalSum = products.reduce((sum, item) => sum + item.total, 0);
    const totalMoney = tip + totalSum;
    console.log("Payment Method: ", paymentMethod)

    const radioButtons = [
        { id: '1', label: 'PayPal', value: 'PAYPAL' },
        { id: '2', label: 'Tiền mặt', value: 'CASH' }
    ];

    const handlePayment = async () => {
        try {
            const cartId = await AsyncStorage.getItem('cartId');
            const emailId = await AsyncStorage.getItem('email');
            if (!cartId) {
                console.error("Cart ID not found in AsyncStorage");
                return;
            }
            const response = await ADD_ORDER(emailId, cartId, paymentMethod);
            if (response) {
                console.log("Add order successfully");
            }
            navigation.navigate("Success");
            await AsyncStorage.setItem("cart", JSON.stringify([]));

        } catch (error) {
            console.error("Error clearing cart: ", error);
        }
    };
    const formatCurrency = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    const onPressPaypal = async () => {
        try {
            const token = await paypalApi.generateToken();
            const res = await paypalApi.CreateOrder(token);
            setAccessToken(token);
            if (!!res?.links) {
                const findUrl = res.links.find(data => data?.rel === "approve");
                if (findUrl) {
                    setPaypalUrl(findUrl.href);
                    await Linking.openURL(findUrl.href);
                }
            }
        } catch (error) {
            console.error("Error with PayPal URL: ", error);
        }
    };


    const onChangeUrl = (webviewState) => {
        console.log("webviewState", webviewState);
        if (webviewState.url.includes('myapp://payment/cancle')) {
            clearPaypalState();
            alert("Đóng"); 
            return;
        }
        if (webviewState.url.includes('myapp://payment/success')) {
            const urlValue = queryString.parseUrl(webviewState.url);
            console.log("my url value: ", urlValue);
            const token = urlValue.query;
            if (!!token) {
                paymentSuccess(token);
            }
        }

    };

    const clearPaypalState = () => {
        setPaypalUrl(null);
        setAccessToken(null);
    }

    const paymentSuccess = async (id) => {
        try {
            const res = paypalApi.capturePayment(id, accessToken);
            console.log("capturePayment ress: ", res)
            alert("Thanh toán thành công!");
            clearPaypalState();
        } catch (error) {
            console.log("error payment capture: ", error)
        }
    }


    const handleSetPayment = (item) => {
        setPaymentMethod(item.value);
        if (item.value === "PAYPAL") {
            onPressPaypal();
        }
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
                            <FontAwesome name="search" size={20} color="background: #9A7D60" style={styles.header_icon} />
                            <Ionicons name="language-sharp" size={24} color="background: #9A7D60" style={styles.header_icon} />
                        </View>
                    </View>

                    <View style={styles.page_name}>
                        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={styles.page_title}>
                            <Text style={styles.txt_title}>Đơn hàng</Text>
                        </View>
                        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.goBack()}>
                            <Fontisto name="save" size={24} color="#4a2306" />
                        </TouchableOpacity>
                    </View>

                    {/* Order Items */}
                    <FlatList
                        data={products}
                        keyExtractor={(item: any) => item.id}
                        renderItem={({ item }: { item: any }) => (
                            <View style={styles.orderItem}>
                                <Image source={{ uri: GET_IMG("products/image", item.image) }} style={styles.itemImage} />
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{item.productName}</Text>
                                    <Text style={styles.itemDetails}>Size: {item.selectedSize}</Text>
                                    <Text style={styles.itemDetails}>x{item.quantity}</Text>
                                </View>
                                <Text style={styles.itemPrice}>Tổng: {formatCurrency(item.total)}</Text>
                            </View>
                        )}
                    />

                    {/* Your Note */}
                    <View style={styles.note}>
                        <TextInput
                            style={styles.noteInput}
                            multiline
                            placeholder="Please don’t distract me when serving order, I’m in between working. Thanks"
                            value="Please don’t distract me when serving order, I’m in between working. Thanks"
                        />
                        <Text style={styles.noteLabel}>Your note</Text>
                    </View>

                    {/* Tip Section */}
                    <Text style={styles.tipTitle}>Tiền tip</Text>
                    <View style={styles.tipOptions}>
                        {[2000, 5000, 10000].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[styles.tipButton, tip === option && styles.selectedTipButton]}
                                onPress={() => setTip(option)}
                            >
                                <Text style={styles.tipText}>{formatCurrency(option)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Total and Submit */}
                    <View style={styles.totalSection}>
                        <View style={styles.totalRow}>
                            <Text>Tổng tiền:</Text>
                            <Text>{formatCurrency(totalSum)}</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text>Tip:</Text>
                            <Text>{formatCurrency(tip)}</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalAmountText}>Thành tiền:</Text>
                            <Text style={styles.totalAmountText}>{formatCurrency(totalMoney)}</Text>
                        </View>

                        {/* Payment Method */}
                        <Text style={styles.paymentTitle}>Chọn phương thức thanh toán</Text>
                        <View style={styles.paymentMethods}>
                            {radioButtons.map((item) => (
                                <RadioButton
                                    key={item.id}
                                    id={item.id}
                                    label={item.label}
                                    value={item.value}
                                    selected={paymentMethod === item.value} // Control selected state
                                    onPress={() => handleSetPayment(item)} // Update state on press
                                />
                            ))}
                        </View>
                        {Platform.OS !== 'web' && paypalUrl && (
                            <Modal visible={!!paypalUrl}>
                                <TouchableOpacity onPress={clearPaypalState} style={{ margin: 24 }}>
                                    <Text style={{fontSize: 20}}>Close</Text>
                                </TouchableOpacity>
                                <View style={{ flex: 1 }}>
                                    <WebView
                                        source={{ uri: paypalUrl }}
                                        onNavigationStateChange={onChangeUrl}
                                    />
                                </View>
                            </Modal>
                        )}
                    </View>

                </ScrollView>
                <TouchableOpacity style={styles.submitButton} onPress={handlePayment}>
                    <Text style={styles.submitButtonText}>Thanh toán {formatCurrency(totalMoney)}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default Payment;

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        flexDirection: 'column',
        paddingHorizontal: 10
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
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    itemInfo: {
        flex: 2,
        marginLeft: 10,
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#4a2306',
    },
    itemDetails: {
        color: '#4a2306',
    },
    itemPrice: {
        fontWeight: 'bold',
        color: '#4a2306',
    },
    note: {
        position: 'relative',
        marginBottom: 20,
    },
    noteInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        height: 60,
        fontSize: 14,
        color: '#4a2306',
    },
    noteLabel: {
        position: 'absolute',
        top: -12,
        left: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        color: '#4a2306',
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4a2306',
    },
    tipOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    tipButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginRight: 10,
    },
    selectedTipButton: {
        backgroundColor: '#d2691e',
    },
    tipText: {
        color: '#4a2306',
    },
    tipInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        width: 60,
        textAlign: 'center',
    },
    paymentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
        paddingBottom: 5,
        color: '#4a2306',
        borderBottomWidth: 1,
        borderBottomColor: '#d2691e',
    },
    paymentMethods: {
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    paymentText: {
        marginLeft: 10,
        color: '#4a2306',
    },
    totalSection: {
        marginBottom: 30,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    totalAmountText: {
        fontWeight: 'bold',
        color: '#4a2306',
    },
    submitButton: {
        backgroundColor: '#d2691e',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

});
