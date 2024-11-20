import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import ItemHome from './hometabs/items/ItemProduct';
import { GET_IMG, searchProducts } from '../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchPage = ({ navigation }: any) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    // Xử lý khi thay đổi input tìm kiếm
    const handleSearchInputChange = useCallback((query) => {
        setSearchQuery(query);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const token = await AsyncStorage.getItem("authToken");
                if (!token) {
                    console.error("Token không tồn tại");
                    setLoading(false);
                    return;
                }

                const response = await searchProducts(searchQuery);
                setProducts(response.content);
            } catch (error) {
                console.error("Failed to fetch search results:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchQuery]);

    const handleProductClick = (product) => {
        navigation.navigate("Details", { product: product }); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.boxSearch}>
                <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.goBack()} />
                <View style={styles.searchBarContainer}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Tìm kiếm..."
                        value={searchQuery}
                        onChangeText={handleSearchInputChange}
                    />
                </View>
            </View>
            <View style={styles.result}>
                <Text style={styles.heading}>Tìm kiếm sản phẩm với: "{searchQuery}"</Text>
                <ScrollView>
                    {loading && <ActivityIndicator size="large" color="#0000ff" />}
                    {!loading && products.length === 0 && (
                        <Text style={styles.noResults}>Không có sản phẩm "{searchQuery}".</Text>
                    )}
                    {!loading && products.length > 0 && (
                        <View style={styles.productList}>
                            {products.map((product) => (
                                <TouchableOpacity
                                    key={product.product_id}
                                    style={{ marginBottom: 20, borderRadius: 15 }}
                                    onPress={() => handleProductClick(product)}
                                >
                                    <ItemHome
                                        imageSource={GET_IMG("products/image", product.image)}
                                        textContent={product.productName}
                                        price={product.price}
                                        description={product.description}
                                    />

                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    )
}

export default SearchPage

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        padding: 10,
    },
    boxSearch: {
        flex: 1,
    },
    result: {
        flex: 9,
    },
    searchBarContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 15,

    },
    searchIcon: {
        flex: 1,
        marginTop: 5
    },
    searchBar: {
        flex: 7,
        padding: 10,
        borderBottomColor: ' black',
        borderBottomWidth: 1

    },
    heading: {
        fontSize: 15,
        fontWeight: "bold",
        marginVertical: 15,
    },
    noResults: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginTop: 20,
    },
    productList: {
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
})