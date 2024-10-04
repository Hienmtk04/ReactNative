import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';


const RecentItem = () => {
  const recent = [
    { id: 'd1', name: 'Espresso', description: 'Lorem Ipsum is simply dummy text', image: '../../../../assets/images/product/Group 1190 (1).png' },
    { id: 'd2', name: 'Cappuccino', description: 'Lorem Ipsum is simply dummy text', image: '../../../../assets/images/product/Croissant (2).png' },
    { id: 's6', name: 'Bacon, Sausage & Egg Wrap', description: 'Lorem Ipsum is simply dummy text', image: '../../../../assets/images/product/Croissant (4).png' },
  ];

  // Render item for drinks and snacks
  const renderMenuItem = ({ item }: any) => (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
      <View style={styles.menuItemDetails}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemDescription}>{item.description}</Text>
      </View>
      <AntDesign name="hearto" size={24} color="black" />
    </View>
  );

  return (
      <ScrollView style={styles.container}>

        <View style={styles.section}>
          <FlatList
            data={recent}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
      // {/* <View style={styles.bottomNavigation}>
      //   <View style={styles.bottomNavAction}>
      //     <TouchableOpacity style={styles.navButton}>
      //       <Text style={styles.navButtonText}>Find Store</Text>
      //     </TouchableOpacity>
      //     <TouchableOpacity style={styles.navButton}>
      //       <Image source={require('../../../../assets/images/banner/Vector.png')} style={styles.icon} />
      //     </TouchableOpacity>
      //   </View>
      //   <TouchableOpacity style={styles.navButton}>
      //     <Image source={require('../../../../assets/images/banner/Vector (1).png')} style={styles.icon} />
      //   </TouchableOpacity>
      // </View> */}
  )
}

export default RecentItem

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