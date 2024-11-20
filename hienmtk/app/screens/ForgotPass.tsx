import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { CHANGEPASS, GET_ID, PUT_EDIT } from '../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';
const bcrypt = require('bcryptjs');


const ForgotPass = ({ navigation }: { navigation: any }) => { 
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPass, setOldPassword] = useState('');
    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const toast = useToast();

    const showToast = () => {
        toast.show('Thay đổi mật khẩu thành công!', {
            type: 'success',
            duration: 3000,
            animationType: 'slide-in',
            placement: 'top'
        });
    };

    useEffect(() => {
        const fetchUser = async () => {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) {
                window.alert("User not found.");
                return;
            }

            try {
                const response = await GET_ID("users", userId);
                console.log("API response:", response); 
                setUser(response);
                setOldPassword(response.password); // Assuming this is a hash
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUser();
    }, []);

    const handleResetPassword = async () => {
        const userId = await AsyncStorage.getItem("userId");

        if (newPassword !== confirmPassword) {
            setErrorMessage("Xác nhận mật khẩu không trùng khớp.");
            return;
        }

        if (newPassword.length < 6) {
            setErrorMessage("Mật khẩu mới phải có ít nhất 6 ký tự.");
            return;
        }

        const data = { ...user, password: newPassword };

        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const response = await CHANGEPASS(userId, data);

            if (response.status === 200 || response.status === 201) {
                showToast();
                navigation.navigate('Home');
            } else {
                setErrorMessage("Thay đổi thất bại.");
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            setErrorMessage("Đã xảy ra lỗi khi thay đổi mật khẩu.");
        }
    };

    return (
        <View style={styles.container}>
            <AntDesign name="close" onPress={() => navigation.navigate('Home')} size={24} color="black" style={styles.closeIcon} />

            <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/DeCafe.png')} />
            </View>

            <Text style={styles.welcomeText}>Thay đổi mật khẩu </Text>
            <Text style={styles.subText}>Nhập vào mật khẩu.</Text>

            {
                errorMessage &&
                <Text style={{ padding: 10, marginBottom: 10, fontSize: 15, fontWeight: 600 }}>{errorMessage}</Text>
            }

            <TextInput style={styles.input} value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Nhập mật khẩu cũ"
                secureTextEntry
                />
            <TextInput style={styles.input} placeholder="Nhập mật khẩu mới" value={newPassword}
                onChangeText={setNewPassword} 
                secureTextEntry/>
            <TextInput style={styles.input} placeholder="Nhập lại mật khẩu mới" value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry />

            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText} onPress={handleResetPassword}>Gửi</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f8d7a5',
    },
    closeIcon: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    logoContainer: {
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    logoImage: {
        width: 117,
        height: 40
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 10,
    },
    subText: {
        fontSize: 16,
        textAlign: 'left',
        color: 'gray',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    passwordContainer: {
        position: 'relative',
        justifyContent: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 12,
    },
    forgotPassword: {
        color: '#e91e63',
        textAlign: 'right',
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: '#FFA500',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#e0e0e0',
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    socialIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    socialButtonText: {
        fontSize: 16,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signUpText: {
        color: '#e91e63',
        fontWeight: 'bold',
    },
});

export default ForgotPass;
