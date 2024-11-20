import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_ID, LOGOUT, OrderByEmail } from '@/app/api/apiService';
import { ScrollView } from 'react-native-gesture-handler';


const Profile = ({ navigation }: { navigation: any }) => {
  const [user, setUser] = useState({});
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await GET_ID("users/email", email);
        console.log("API response:", response);
        setUser(response);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [email]);

 
  useEffect(() => {
    if (email) {
      const fetchOrder = async () => {
        try {
          const response = await OrderByEmail(email);
          console.log("Order API response:", response);
          if (response && Array.isArray(response)) {
            setOrder(response);
          } else {
            console.error("Unexpected response format:", response);
          }
        } catch (error) {
          console.error("Failed to fetch order:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchOrder();
    }
  }, [email]);

  const handleLogout = () => {
    LOGOUT();
    navigation.navigate("SignIn");
  }
  const handleEdit = (field: any) => {
    console.log(`Edit ${field}`);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  const formatCurrency = (price) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
};
  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <Text style={styles.header}>Thông tin cá nhân</Text>

      {/* Profile Fields */}
      <View style={styles.fieldContainer}>
        <FontAwesome name="user" size={24} color="#888" />
        <View style={styles.fieldTextContainer}>
          <Text style={styles.fieldLabel}>Tên</Text>
          <Text style={styles.fieldValue}>{user.firstName + " " + user.lastName}</Text>
        </View>
        <TouchableOpacity onPress={() => handleEdit('name')}>
          <FontAwesome name="pencil" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="phone" size={24} color="#888" />
        <View style={styles.fieldTextContainer}>
          <Text style={styles.fieldLabel}>Số điện thoại</Text>
          <Text style={styles.fieldValue}>{user.mobileNumber}</Text>
        </View>
        <TouchableOpacity onPress={() => handleEdit('phone')}>
          <FontAwesome name="pencil" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.fieldContainer}>
        <FontAwesome name="envelope" size={24} color="#888" />
        <View style={styles.fieldTextContainer}>
          <Text style={styles.fieldLabel}>Email</Text>
          <Text style={styles.fieldValue}>{user.email}</Text>
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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Đơn hàng của bạn</Text>
        <ScrollView style={styles.containerOrder}>
          {order && order.length > 0 ? (
            order.map((order) => (
              <TouchableOpacity
                key={order.orderId}
                style={{ marginBottom: 15, borderRadius: 15 }}
                onPress={() => {
                  navigation.navigate("DetailOrder", { order : order });
                }}
              >
                <View style={styles.orderItem}>
                  <Text>Đơn hàng {order.orderDate}</Text>
                  <Text>Tổng tiền:  {formatCurrency(order.totalAmount)}</Text>
                  <Text>Tình trạng: {order.orderStatus}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: '#888' }}>No products available.</Text>
          )}
        </ScrollView>
      </View>

      {/* QR Code */}
      <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('ForgotPass')}>
        <Text style={styles.btn}>Thay đổi mật khẩu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn_option} onPress={handleLogout}>
        <Text style={styles.btn}><AntDesign name="adduser" size={24} color="black" style={{ marginRight: 25 }} />Đăng xuất</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#efddc2',
  },
  containerOrder : {
    height: 250
  },
  section: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderItem: {
    backgroundColor: 'white',
    padding: 10
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
