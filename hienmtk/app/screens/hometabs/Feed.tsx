import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, ScrollView, FlatList, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import Swiper from 'react-native-swiper';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GET_ALL, GET_ID, GET_IMG, ProductByCategory } from '../../api/apiService'
import ItemHome from './items/ItemProduct';
import { useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';


const Feed = ({ navigation, route }: any) => {
    const [coffeeData, setCoffeeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState({});
    const [categoryName, setCategoryName] = useState('');
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    console.log("CategoryId:", categoryId);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await GET_ALL("products");
                console.log("API response:", response); // Kiểm tra phản hồi API

                if (response && Array.isArray(response.content)) {
                    setProducts(response.content);
                } else {
                    console.error("Unexpected response format:", response);
                }
                if (categoryId) {
                    const response = await ProductByCategory(categoryId);
                    console.log("Product By Category:", response);

                    if (response && Array.isArray(response.content)) {
                        setProducts(response.content);
                    } else {
                        console.error("Unexpected response format:", response);
                    }
                }

            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await GET_ALL("categories?pageNumber=0&pageSize=10&sortBy=categoryId&sortOrder=asc");
                console.log("API response:", response);
                if (response && Array.isArray(response.content)) {
                    setCategories(response.content);
                } else {
                    console.error("Unexpected response format:", response);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const [username, setUserName] = useState('');
    const email = localStorage.getItem("email");
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await GET_ID("users/email", email);
                console.log("API response:", response);
                setUserName(response.lastName);
                if (response && Array.isArray(response.content)) {
                    setUserName(response.content);
                } else {
                    console.error("Unexpected response format:", response);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchUser();
    }, [email]);
    const handleCategory = (categories) => {
        setCategoryId(categories.categoryId);
        setCategoryName(categories.categoryName);
    }

    const [swiperIndex, setSwiperIndex] = useState(0);
    return (
        <>
            <ScrollView style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.greeting}>Hello, {username}</Text>
                    <View style={styles.header_bottom}>
                        <View style={styles.header_option1}>
                            <Image source={require('../../../assets/images/banner/Logo 1.png')} style={styles.logo} />
                        </View>
                        <View style={styles.header_option2}>
                            <FontAwesome name="search" size={20} color="background: #9A7D60" style={styles.header_icon} onPress={() => navigation.navigate("Search")} />
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
                                <Text style={styles.sectionTitle}>Decaf Coffee</Text>
                                <Text style={styles.sectionText}>Chúng ta xứng đáng thưởng thức những ly cà phê ngon bắt 
                                    đầu từ việc tạo ra những khác biệt tích cực cho thế giới.</Text>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Xem thêm</Text>
                                </View>
                            </View>
                            <Image source={require('../../../assets/images/banner/Slider Image.png')} style={styles.section_banner_img} />
                        </View>
                        <View style={styles.section}>
                            <View style={styles.section_banner}>
                                <Text style={styles.sectionTitle}>Cà phê Latte</Text>
                                <Text style={styles.sectionText}>Béo ngậy, mịn màng và dễ thưởng thức, chúng tôi có công thức Latte dành riêng cho bạn.</Text>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Xem thêm</Text>
                                </View>
                            </View>
                            <Image source={require('../../../assets/images/banner/Slider Image (1).png')} style={styles.section_banner_img} />
                        </View>
                    </Swiper>
                </View>


                {/* Category */}
                <View style={styles.category}>
                    <ScrollView horizontal={true}>
                        <View style={styles.category_container}>
                            {
                                isLoading ?
                                    <Text>Loading....</Text> :
                                    categories.map((item) => (
                                        <View style={styles.category_item} >
                                            <TouchableOpacity style={styles.btn_category} onPress={() => handleCategory(item)}>
                                                <Text style={styles.text_category}>{item.categoryName}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))
                            }
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.recentOrdersSection}>
                    {
                        categoryId ? <Text style={styles.recentOrdersTitle}>{categoryName}</Text> : <Text style={styles.recentOrdersTitle}>Đồ uống</Text>
                    }
                    {isLoading ? (
                        <Text>Loading...</Text>
                    ) : (
                        products.map((product) => (
                            <TouchableHighlight
                                // key={product.product_id}
                                style={{ marginBottom: 20, borderRadius: 15 }}
                                onPress={() => {
                                    navigation.navigate("Details", { product: product });
                                }}
                            >
                                <ItemHome
                                    imageSource={GET_IMG("products/image", product.image)}
                                    textContent={product.productName}
                                    price={product.price}
                                    description={product.description}
                                    discount={product.discount}
                                    specialPrice={product.specialPrice}
                                />
                            </TouchableHighlight>
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
        height: 50,
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