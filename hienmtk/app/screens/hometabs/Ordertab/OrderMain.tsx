import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GET_ALL, GET_IMG, ProductByCategory } from '@/app/api/apiService';
import ItemHome from '../items/ItemProduct';


const MenuOder = ({ navigation }: { navigation: any }) => {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GET_ALL("categories");
        if (response && Array.isArray(response.content)) {
          setCategories(response.content);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      const productData = {};
  
      for (let category of categories) {
        try {
          const response = await ProductByCategory(category.categoryId);
          // Check the format of your response here
          console.log("Response for category:", category.categoryId, response.content);
          
          if (response && Array.isArray(response.content)) {
            productData[category.categoryId] = response.content;
          } else {
            console.error("Unexpected product response format for category:", category.categoryId, response);
            productData[category.categoryId] = [];
          }
        } catch (error) {
          console.error(`Error fetching products for category ${category.categoryId}:`, error);
        }
      }
      setCategoryProducts(productData);
      setLoading(false);
    };
  
    if (categories.length > 0) {
      fetchProductsByCategory();
    }
  }, [categories]);
  

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      {categories.map((category) => (
        <View style={styles.section} key={category.categoryId}>
          <Text style={styles.sectionTitle}>{category.categoryName}</Text>
          {categoryProducts[category.categoryId] && categoryProducts[category.categoryId].length > 0 ? (
            categoryProducts[category.categoryId].map((product) => (
              <TouchableOpacity
                key={product.productId}
                style={{ marginBottom: 20, borderRadius: 15 }}
                onPress={() => {
                  navigation.navigate("Details", { product });
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
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: '#888' }}>No products available in this category.</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default MenuOder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
});