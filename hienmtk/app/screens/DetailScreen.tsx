import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
const DetailScreen = ({ navigation }: { navigation: any }) => {
  const amountMilk = [
    { label: '2% dairy milk', value: 'less' },
    { label: 'Nonfat milk', value: 'enough' },
    { label: 'Oat beverage', value: 'much' },
    { label: 'Almond beverage', value: 'very much' },

  ];
  const espressoShot = [
    { label: 'Double', value: 'double' },
    { label: 'Quad', value: 'quad' },
    { label: 'Single Shot', value: 'single' },

  ];
  const topping = [
    { label: 'Cinnamon', value: 'cinnamon' },
    { label: 'Cheese Cream', value: 'cream' },
    { label: 'Pudding', value: 'pudding' },

  ];
  const [value, setValue] = useState('');
  const [milkValue, setMilkValue] = useState('');
  const [espressoValue, setEspressoValue] = useState('');
  const [toppingValue, setToppingValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedSize, setSelectedSize] = useState('small');

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };


  const handleAddToCart = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
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
            <Image source={require('../../assets/images/banner/Logo 1.png')} style={styles.logo} />
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
          <Image source={require('../../assets/images/product/Group 1190 (1).png')} style={styles.img} />
          <Text style={styles.detail_name}>Espresso</Text>
        </View>

        <View style={styles.detail}>
          <Text style={{ color: '#591904', fontSize: 15, fontWeight: 600 }}>Size</Text>
        </View>
        <View style={styles.option_type}>
          <TouchableOpacity onPress={() => handleSizeSelect('small')}>
            <Image source={selectedSize === 'small' ? require('../../assets/images/icon/Group 1229.png') : require('../../assets/images/icon/Group 1237.png')} style={styles.detail_order_img} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSizeSelect('medium')}>
            <Image source={selectedSize === 'medium' ? require('../../assets/images/icon/Group 1233.png') : require('../../assets/images/icon/Group 1236.png')} style={styles.detail_order_img} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSizeSelect('large')}>
            <Image source={selectedSize === 'large' ? require('../../assets/images/icon/Group 1235.png') : require('../../assets/images/icon/Group 1234.png')} style={styles.detail_order_img} />
          </TouchableOpacity>
        </View>

        <View style={styles.detail}>
          <Text style={{ color: '#591904', fontSize: 15, fontWeight: 600 }}>What's included?</Text>
        </View>
        <View style={styles.option}>
          <View style={styles.include}>
            {renderLabel()}
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={amountMilk}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select one' : ''}
              value={milkValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setMilkValue(item.value);
                setIsFocus(false);
              }}
            />
            <Text style={styles.option_label}>Milk</Text>
          </View>

          <View style={styles.include}>
            {renderLabel()}
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={espressoShot}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select one' : ''}
              value={espressoValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setEspressoValue(item.value);
                setIsFocus(false);
              }}
            />
            <Text style={styles.option_label}>Espresso</Text>
          </View>

          <View style={styles.include}>
            {renderLabel()}
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={topping}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select one' : ''}
              value={toppingValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setToppingValue(item.value);
                setIsFocus(false);
              }}
            />
            <Text style={styles.option_label}>Topping</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.add_to_cart}>
        <TouchableOpacity style={styles.add_to_cart_btn} onPress={handleAddToCart}>
          <Text style={styles.txt_add_to_cart}> Add to cart</Text>
          <Text style={styles.txt_total}> $5 </Text>
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
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Cart')} >
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