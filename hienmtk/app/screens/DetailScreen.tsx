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

const addToCart = async (newProduct) => {
  try {
    const cart = await AsyncStorage.getItem('cart');
    const cartItems = cart ? JSON.parse(cart) : [];
    console.log("Current cart:", cartItems);

    const existingProductIndex = cartItems.findIndex(
      (item) => item.productId === newProduct.productId 
    );

    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += newProduct.quantity;
      cartItems[existingProductIndex].total = cartItems[existingProductIndex].quantity * cartItems[existingProductIndex].specialPrice;
      cartItems[existingProductIndex].totalPrice = cartItems[existingProductIndex].total;
    } else {
      cartItems.push(newProduct); 
    }
    await AsyncStorage.setItem('cart', JSON.stringify(cartItems));

  } catch (error) {
    console.error("Error adding to cart", error);
  }
};


const DetailScreen = ({ navigation, route }: any) => {

  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const cartId = AsyncStorage.getItem('cartId');

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

  const { product } = route.params;
  if (!product) {
    return <Text>Product not found!</Text>;
  }
  const [total, totalPrice] = useState(product.discount > 0 ? product.specialPrice : product.price);
  const [quantity, setQuantity] = useState(1);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };
  console.log("Selected Size: ", selectedSize);

  const handleAddToCart = async () => {
    if (!product) {
      console.error("Product not found");
      return;
    }

    try {
      const cartId = await AsyncStorage.getItem('cartId');
      if (!cartId) {
        console.error("Cart ID not found in AsyncStorage");
        return;
      }

      const updatedProduct = {
        ...product,
        quantity,
        selectedSize,
        totalPrice: (product.discount > 0 ? product.specialPrice : product.price) * quantity,
      };

      console.log("Product Update: ", updatedProduct);

      const response = await ADDCART(cartId, updatedProduct.productId, updatedProduct.quantity);
      if (response) {
        console.log("Product added to database cart successfully", response.data);

        await addToCart(updatedProduct);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
        navigation.navigate('Cart');
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const formatCurrency = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };


  const renderLabel = () => {
    if (value || isFocus) {
      return null;
    }
    return null;
  };
  const [isClick, setIsClick] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.header_bottom}>
          <View style={styles.header_option1}>
            <Image source={require('../../assets/images/banner/Logo 1.png')} style={styles.logo} resizeMode='contain' />
          </View>
          <View style={styles.header_option2}>
            <FontAwesome name="search" size={20} color="background: #9A7D60" style={styles.header_icon} />
            <Ionicons name="language-sharp" size={24} color="background: #9A7D60" style={styles.header_icon} />
          </View>
        </View>

        <TouchableOpacity style={{ marginHorizontal: 10, marginVertical: 10 }} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.detail_img}>
          <Image source={{ uri: GET_IMG("products/image", product.image) }} style={styles.img} resizeMode='contain' />
          <Text style={styles.detail_name}>{product.productName}   </Text>
          <Text>{product.description}   </Text>
        </View>

        <View style={styles.detail}>
          <Text style={{ color: '#591904', fontSize: 15, fontWeight: 600 }}>Size</Text>
        </View>
        <View style={styles.option_type}>
          <TouchableOpacity onPress={() => handleSizeSelect('S')}>
            <Image source={selectedSize === 'S' ? require('../../assets/images/icon/Group 1229.png') : require('../../assets/images/icon/Group 1237.png')} style={styles.detail_order_img} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSizeSelect('M')}>
            <Image source={selectedSize === 'M' ? require('../../assets/images/icon/Group 1233.png') : require('../../assets/images/icon/Group 1236.png')} style={styles.detail_order_img} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSizeSelect('L')}>
            <Image source={selectedSize === 'L' ? require('../../assets/images/icon/Group 1235.png') : require('../../assets/images/icon/Group 1234.png')} style={styles.detail_order_img} />
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
          <InputSpinner
            max={10}
            min={1}
            step={1}
            skin={"round"}
            color={'#FFF'}
            value={0}
            height={40}
            width={150}
            shadow={false}
            background={'#FFF'}
            showBorder={false}
            onChange={(num) => {
              product.total = num * (product.discount > 0 ? product.specialPrice : product.price);
              totalPrice(product.total);
              setQuantity(num);
            }}
          />
        </View>

      </ScrollView>
      <View style={styles.add_to_cart}>
        <TouchableOpacity
          style={styles.add_to_cart_btn}
          onPress={handleAddToCart}
        >
          <Text style={styles.txt_add_to_cart}> Thêm vào giỏ</Text>
          <Text style={styles.txt_total}>{formatCurrency(total)} </Text>
        </TouchableOpacity>
      </View>
      {showNotification && (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>Product added to cart!</Text>
        </View>
      )}
      <View style={styles.bottomNavigation}>
        <View style={styles.bottomNavAction}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Find Store</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Image source={require('../../assets/images/banner/Vector.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.navButton} onPress={() => {
          navigation.navigate('Cart');
        }}>
          <Image source={require('../../assets/images/banner/Vector (1).png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>

  )
}

export default DetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
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
    shadowColor: "#d2691e",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
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
    paddingVertical: 10,
  },
  textTitle: {
    fontSize: 25,
    fontWeight: 500
  },
  detail_img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 150,
    height: 150,
    marginTop: 50
  },
  detail_name: {
    fontSize: 20,
    fontWeight: 600
  },
  detail: {
    borderBottomColor: '#d2691e',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 40
  },
  option_type: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  detail_order_img: {
    marginHorizontal: 20,
  },
  option: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  include: {
    borderColor: '#d2691e',
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10
  },
  option_label: {
    position: 'absolute',
    top: -12,
    left: 20,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    fontSize: 15,
    color: '#000000',
  },
  dropdown: {
    width: 300,
    height: 50,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  add_to_cart: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: 20
  },
  add_to_cart_btn: {
    flexDirection: 'row',
    backgroundColor: '#d2691e',
    padding: 10,
    borderRadius: 25,
    shadowColor: "#7a7a7a",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5,
  },
  txt_add_to_cart: {
    color: 'white',
    fontWeight: 500,
    marginRight: 20
  },
  txt_total: {
    color: 'white',
    fontWeight: 500,
    textAlign: 'right'
  },
  notification: {
    position: 'absolute',
    bottom: 400,
    left: 0,
    right: 0,
    backgroundColor: '#d2691e',
    padding: 20,
    borderRadius: 5,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontWeight: 'bold',
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

})