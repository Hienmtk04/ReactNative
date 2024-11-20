import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GET_ALL, GET_IMG } from '@/app/api/apiService';
import ItemHome from '../items/ItemProduct';
import { useNavigation } from '@react-navigation/native';


const SaleItem = () => {
  const [product, setProduct] = useState([]);
  const [productSale, setProductSale] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GET_ALL("products?pageNumber=0&pageSize=100&sortBy=productId&sortOrder=desc");
        if (response && Array.isArray(response.content)) {
          const products = response.content;
          setProduct(products);

          // Lọc các sản phẩm có discount > 0
          const saleProducts = products.filter(item => item.discount > 0);
          setProductSale(saleProducts);

          setLoading(false);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }


  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Sản phẩm khuyến mãi</Text>
      <ScrollView style={styles.container}>
        {productSale && productSale.length > 0 ? (
          productSale.map((product) => (
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
          <Text style={{ color: '#888' }}>No products available.</Text>
        )}
      </ScrollView>
    </View>
  )
}

export default SaleItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_bottom: {
    marginTop: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
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

  title: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 500
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  activeTab: {
    color: '#d2691e',
    fontWeight: 'bold',
  },
  inactiveTab: {
    color: '#888',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  menuItemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  menuItemDetails: {
    flex: 1,
  },
  menuItemName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuItemDescription: {
    color: '#888',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
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