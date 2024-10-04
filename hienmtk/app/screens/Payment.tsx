import { Dimensions, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Image, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { FlatList } from 'react-native-gesture-handler';

const Payment = ({ navigation }: { navigation: any }) => {
    // Cart items array with quantity
    const [tip, setTip] = useState(2);
    const [paymentMethod, setPaymentMethod] = useState('Visa');

    const orderItems = [
        {
            id: 1,
            name: 'Espresso',
            size: 'Small',
            milk: '2%',
            topping: 'Cinnamon',
            shots: '2',
            price: '4$',
            image: require('../../assets/images/product/Croissant (2).png'), // Replace with your image path
        },
        {
            id: 2,
            name: 'Bacon, Sausage & Egg Wrap',
            size: 'Half',
            ketchup: '1',
            price: '5$',
            image: require('../../assets/images/product/Croissant (3).png'), // Replace with your image path
        },
    ];

    const radioButtons: RadioButtonProps[] = useMemo(() => ([
        {
            id: '1', 
            label: 'Visa *5512',
            value: 'visa'
        },
        {
            id: '2',
            label: 'ATM',
            value: 'atm'
        },
        {
            id: '3',
            label: 'Cash money',
            value: 'cash'
        }
    ]), []);

    const [selectedId, setSelectedId] = useState<string | undefined>();
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

                    {/* Order Items */}
                    <FlatList
                        data={orderItems}
                        keyExtractor={(item: any) => item.id.toString()}
                        renderItem={({ item }: { item: any }) => (
                            <View style={styles.orderItem}>
                                <Image source={item.image} style={styles.itemImage} />
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemDetails}>Size: {item.size}</Text>
                                    {item.milk && <Text style={styles.itemDetails}>Milk: {item.milk}</Text>}
                                    {item.topping && <Text style={styles.itemDetails}>Topping: {item.topping}</Text>}
                                    <Text style={styles.itemDetails}>Espresso shots: {item.shots || item.ketchup}</Text>
                                </View>
                                <Text style={styles.itemPrice}>Total: {item.price}</Text>
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
                    <Text style={styles.tipTitle}>Add tip</Text>
                    <View style={styles.tipOptions}>
                        {[2, 5, 10].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[styles.tipButton, tip === option && styles.selectedTipButton]}
                                onPress={() => setTip(option)}
                            >
                                <Text style={styles.tipText}>{option}$</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Total and Submit */}
                    <View style={styles.totalSection}>
                        <View style={styles.totalRow}>
                            <Text>Sub total:</Text>
                            <Text>9$</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text>Gst:</Text>
                            <Text>1.17$</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text>Tip:</Text>
                            <Text>{tip}$</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalAmountText}>Total:</Text>
                            <Text style={styles.totalAmountText}>11.07$</Text>
                        </View>

                        {/* Payment Method */}
                        <Text style={styles.paymentTitle}>Select payment</Text>
                        <View style={styles.paymentMethods}>
                            <RadioGroup
                                radioButtons={radioButtons}
                                onPress={setSelectedId}
                                selectedId={selectedId}
                                layout='row'
                            />
                        </View>
                    </View>

                </ScrollView>
                <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('Success')}>
                    <Text style={styles.submitButtonText}>Pay & Submit 11.07$</Text>
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
