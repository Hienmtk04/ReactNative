import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';


const Profile = ({ navigation }: { navigation: any }) => {
  const handleEdit = (field: any) => {
    // Logic to handle editing a particular field (e.g., name, phone, etc.)
    console.log(`Edit ${field}`);
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <Text style={styles.header}>Profile</Text>

      {/* Profile Fields */}
      <View style={styles.fieldContainer}>
        <FontAwesome name="user" size={24} color="#888" />
        <View style={styles.fieldTextContainer}>
          <Text style={styles.fieldLabel}>Name</Text>
          <Text style={styles.fieldValue}>Hien MTK</Text>
        </View>
        <TouchableOpacity onPress={() => handleEdit('name')}>
          <FontAwesome name="pencil" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="phone" size={24} color="#888" />
        <View style={styles.fieldTextContainer}>
          <Text style={styles.fieldLabel}>Phone number</Text>
          <Text style={styles.fieldValue}>+84367048004</Text>
        </View>
        <TouchableOpacity onPress={() => handleEdit('phone')}>
          <FontAwesome name="pencil" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="envelope" size={24} color="#888" />
        <View style={styles.fieldTextContainer}>
          <Text style={styles.fieldLabel}>Email</Text>
          <Text style={styles.fieldValue}>hienmtk.info2023@gmail.com</Text>
        </View>
        <TouchableOpacity onPress={() => handleEdit('email')}>
          <FontAwesome name="pencil" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="map-marker" size={24} color="#888" />
        <View style={styles.fieldTextContainer}>
          <Text style={styles.fieldLabel}>Address</Text>
          <Text style={styles.fieldValue}>Tang Nhon Phu B</Text>
        </View>
        <TouchableOpacity onPress={() => handleEdit('address')}>
          <FontAwesome name="pencil" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* QR Code */}
      <View style={styles.qrContainer}>
        <Image
          source={{ uri: '../../../assets/images/aboutus/z5872549906930_d5999708bda0c2db22cd0b75a28426b0.jpg' }}
          style={styles.qrCode}
        />
      </View>
      <TouchableOpacity style={styles.btn_option} onPress={() => navigation.navigate('Introduce')}>
        <Text style={styles.btn}><AntDesign name="adduser" size={24} color="black" style={{ marginRight: 25 }} />Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8d7a5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d2691e',
  },
  fieldTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#888',
  },
  fieldValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  qrCode: {
    width: 247,
    height: 253,
  },
  btn_option: {
    backgroundColor: '#d2571e',
    borderRadius: 25,
    marginVertical: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    width: 250,
    marginHorizontal: 50
  },
  btn: {
    paddingHorizontal: 50,
    paddingVertical: 15,
    color: '#4a2306',
    fontWeight: '600',
    fontSize: 20,
  },
});

export default Profile;
