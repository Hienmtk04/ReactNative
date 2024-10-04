import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GET_ALL, GET_IMG } from '../../api/apiService'
import ItemHome from './items/ItemProduct';


const Feed = ({ navigation }: { navigation: any }) => {
    const [coffeeData, setCoffeeData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        GET_ALL("products")
            .then((response) => {
                if (response && response.data && Array.isArray(response.data.content)) {
                    setCoffeeData(response.data.content);
                } else {
                    console.error(
                        "Data received from the API is not in a supported format."
                    );
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setIsLoading(false);
            });
    }, []);
    const [swiperIndex, setSwiperIndex] = useState(0);
    return (
        <>
            <ScrollView style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.greeting}>Hello, Admin</Text>
                    <View style={styles.header_bottom}>
                        <View style={styles.header_option1}>
                            <Image source={require('../../../assets/images/banner/Logo 1.png')} style={styles.logo} />
                        </View>
                        <View style={styles.header_option2}>
                            <FontAwesome name="search" size={20} color="background: #9A7D60" style={styles.header_icon} />
                            <Ionicons name="language-sharp" size={24} color="background: #9A7D60" style={styles.header_icon} />
                        </View>
                    </View>
                </View>

                <View style={styles.swiper}>
                    <Swiper
                        showsPagination={true}
                        height={200}
                        autoplay={true}
                        autoplayTimeout={3}
                        index={swiperIndex}
                        onIndexChanged={(index) => setSwiperIndex(index)}
                    >
                        {/* Offers and Rewards Section */}
                        <View style={styles.section}>
                            <View style={styles.section_banner}>
                                <Text style={styles.sectionTitle}>Offers and Rewards</Text>
                                <Text style={styles.sectionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                                <TouchableOpacity style={styles.button} onPress={() => { }}>
                                    <Text style={styles.buttonText}>View Offers</Text>
                                </TouchableOpacity>
                            </View>
                            <Image source={require('../../../assets/images/banner/Slider Image.png')} style={styles.section_banner_img} />
                        </View>
                        <View style={styles.section}>
                            <View style={styles.section_banner}>
                                <Text style={styles.sectionTitle}>Offers and Rewards</Text>
                                <Text style={styles.sectionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                                <TouchableOpacity style={styles.button} onPress={() => { }}>
                                    <Text style={styles.buttonText}>View Offers</Text>
                                </TouchableOpacity>
                            </View>
                            <Image source={require('../../../assets/images/banner/Slider Image (1).png')} style={styles.section_banner_img} />
                        </View>
                    </Swiper>
                </View>


                {/* Category */}
                <View style={styles.category}>
                    <ScrollView horizontal={true}>
                        <View style={styles.category_container}>
                            <View style={styles.category_item}>
                                <TouchableOpacity style={styles.btn_category}>
                                    <Image source={require('../../../assets/images/product/Group 1190 (1).png')} style={styles.categoryImage} />
                                    <Text style={styles.text_category}>Hot Cafe</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.category_item}>
                                <TouchableOpacity style={styles.btn_category}>
                                    <Image source={require('../../../assets/images/product/fe81735c-bae9-4021-9e68-65ea2ec59efd.png')} style={styles.categoryImage} />
                                    <Text style={styles.text_category}>Cold Cafe</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.category_item}>
                                <TouchableOpacity style={styles.btn_category}>
                                    <Image source={require('../../../assets/images/product/Croissant (1).png')} style={styles.categoryImage} />
                                    <Text style={styles.text_category}>Sweet Cake</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.category_item}>
                                <TouchableOpacity style={styles.btn_category}>
                                    <Image source={require('../../../assets/images/product/1047c157-189e-4c83-b591-7f00653ae2ec.png')} style={styles.categoryImage} />
                                    <Text style={styles.text_category}>Ice tea</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.category_item}>
                                <TouchableOpacity style={styles.btn_category}>
                                    <Image source={require('../../../assets/images/product/d12193e1-235b-4768-a904-63341fe8db49.png')} style={styles.categoryImage} />
                                    <Text style={styles.text_category}>Hot tea</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                {/* Recent Orders Section */}
                <View style={styles.recentOrdersSection}>
                    <Text style={styles.recentOrdersTitle}>Recent Orders</Text>
                    {isLoading ? (
                        <Text>Loading...</Text>
                    ) : (coffeeData.map((coffee, index) => (
                        <ItemHome
                            key={index}
                            imageSource={GET_IMG("products", coffee.photo)}
                            textContent={coffee.title}
                            price = {coffee.price}
                            description = {coffee.description}
                        />
                    ))
                    )}
                </View>
            </ScrollView>
            <View style={styles.bottomNavigation}>
                <View style={styles.bottomNavAction}>
                    <TouchableOpacity style={styles.navButton}>
                        <Text style={styles.navButtonText}>Find Store</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton}>
                        <Image source={require('../../../assets/images/banner/Vector.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Cart')} >
                    <Image source={require('../../../assets/images/banner/Vector (1).png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </>

    )
}

export default Feed

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header_bottom: {
        marginTop: 10,
        flexDirection: 'row',
        shadowColor: "#d2691e",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,

        elevation: 5,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
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
        justifyContent: 'flex-end'
    },
    header_icon: {
        margin: 5
    },
    section: {
        flexDirection: 'row',
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        height: 100
    },
    section_banner: {
        flex: 1,
        marginRight: 10,
    },
    section_banner_img: {
        flex: 1,
        width: 10,
        height: 165
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionText: {
        marginVertical: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 30,
        backgroundColor: '#ff7f50',
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 600
    },
    recentOrdersSection: {
        padding: 20,
    },
    recentOrdersTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    img: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item_detail: {
        flex: 3,
        flexDirection: 'column',
        margin: 10
    },
    orderImage: {
        width: 50,
        height: 50,
        borderRadius: 25,

    },
    orderDetails: {
        flex: 1,
        flexDirection: 'row',
    },
    orderName: {
        flex: 1,
        fontWeight: 'bold',
        marginRight: 5
    },
    space: {
        flex: 2,
        marginLeft: 0,
        marginRight: 20,
    },

    orderAction: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5
    },
    orderPrice: {
        fontWeight: 'bold',
        marginBottom: 5,
        flex: 1,
    },
    orderDescription: {
        flex: 3,
        color: '#6f6c6c',
    },
    orderButton: {
        flex: 2,
        backgroundColor: '#ff7f50',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    category_container: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#d2691e',
    },
    category_item: {
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    text_category: {
        color: 'white',
        fontWeight: 500,
    },
    categoryImage: {
        width: 50,
        height: 50,
        marginLeft: 5
    },
    btn_category: {
        flexDirection: 'column',
    },
    swiper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    category: {
        height: 100,
    },

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
});