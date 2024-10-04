import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';


const MenuOder = ({ navigation }: { navigation: any }) => {
  const drinks = [
    { id: 'd1', name: 'Espresso', description: 'Lorem Ipsum is simply dummy text', image: '../../../../assets/images/product/Group 1190 (1).png' },
    { id: 'd2', name: 'Cappuccino', description: 'Lorem Ipsum is simply dummy text', image: '../../../../assets/images/product/Croissant (2).png' },
    { id: 'd3', name: 'Cappuccino', description: 'Lorem Ipsum is simply dummy text', image: '../../../../assets/images/product/Croissant (2).png' },

  ];

  const snacks = [
    { id: 's1', name: 'Cinnamon bun', description: 'Lorem Ipsum is simply dummy text', image: '../../../../assets/images/product/Croissant (1).png' },
    { id: 's2', name: 'Croissant', description: 'Lorem Ipsum is simply dummy text', image: '../../../../assets/images/product/Croissant (3).png' },
    { id: 's3', name: 'Bacon, Sausage & Egg Wrap', description: 'Lorem Ipsum is simply dummy text', image: '../../../../assets/images/product/Croissant (4).png' },
  ];
  const [isClick, setIsClick] = useState<number[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(''); 

  const handleClick = (id: number) => {
    if (isClick.includes(id)) {
      setIsClick(isClick.filter(favId => favId !== id));
      setNotificationMessage('Product removed from favorite list!');
    } else {
      setIsClick([...isClick, id]);
      setNotificationMessage('Product added to favorite list!');
    }

    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); 
  };

  const renderMenuItem = ({ item }: any) => (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
      <TouchableOpacity
        style={styles.menuItemDetails}
        onPress={() => navigation.navigate('Details')}
      >
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemDescription}>{item.description}</Text>
      </TouchableOpacity>

      {/* Icon yêu thích */}
      <AntDesign
        onPress={() => handleClick(item.id)}
        name={isClick.includes(item.id) ? "heart" : "hearto"}
        size={24}
        color={isClick.includes(item.id) ? "red" : "black"}
      />
      {showNotification && (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>{notificationMessage}</Text>
        </View>
      )}
    </View>
  );
  return (
    <ScrollView style={styles.container}>

      {/* Drinks Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Drinks</Text>
        <FlatList
          data={drinks}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}  // Disable scrolling inside FlatList since ScrollView is the main container
        />
      </View>

      {/* <View style={styles.divider} /> */}

      {/* Snacks Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Snacks</Text>
        <FlatList
          data={snacks}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}  // Disable scrolling inside FlatList
        />
      </View>

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNavigation}>
        <View style={styles.bottomNavAction}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Find Store</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Image source={require('../../../../assets/images/banner/Vector.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require('../../../../assets/images/banner/Vector (1).png')} style={styles.icon} />
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  )
}

export default MenuOder

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
    paddingVertical: 10,
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
    color: '#951a1a',
    fontWeight: 'bold',
  },
});