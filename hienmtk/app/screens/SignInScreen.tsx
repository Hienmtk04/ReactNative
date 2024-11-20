import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { GET_ID, LOGIN } from "../api/apiService.js";
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';

const SignInScreen = ({ navigation, route }: { navigation: any; route: any }) => {

    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUserName] = useState('');
    const [captcha, setCaptcha] = useState("");
    const [enteredCaptcha, setEnteredCaptcha] = useState("");

    const toast = useToast();

    const generateCaptcha = () => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return Array.from({ length: 5 }, () =>
            characters.charAt(Math.floor(Math.random() * characters.length))
        ).join("");
    };
    useEffect(() => {
        setCaptcha(generateCaptcha());
    }, []);

    const showToast = () => {
        toast.show('Đăng nhập thành công!', {
            type: 'success',
            duration: 3000,
            animationType: 'slide-in',
            placement: 'top'
        });
    };

    const handleLogin = async () => {
        const body = {
            email,
            password
        };
        if (!email || !password) {
            setErrorMessage("Vui lòng nhập đầy đủ thông tin.")
        }
        try {
            if (enteredCaptcha !== captcha) {
                setErrorMessage("CAPTCHA không khớp. Vui lòng thử lại.");
                setCaptcha(generateCaptcha()); // Tạo mã CAPTCHA mới nếu nhập sai
                setEnteredCaptcha(""); // Xóa ô nhập CAPTCHA
                return;
            }
            const response = await LOGIN(body);
            if (response && response.data) {
                const token = response.data['jwt-token'];
                if (token) {
                    await AsyncStorage.setItem("authToken", token);
                    await AsyncStorage.setItem("email", body.email);
                    
                    showToast();
                    navigation.navigate("Home");
                } else {
                    window.alert("Token not found in response");
                }
            } else {
                setErrorMessage("Sai mật khẩu hoặc email.")
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (email) {
                    const response = await GET_ID("users/email", email);
                    console.log("API response:", response);
                    setUserName(response.lastName);
                    await localStorage.setItem("cartId", response.cart.cartId);
                    await localStorage.setItem("userId", response.userId);
                    if (response && Array.isArray(response.content)) {
                        setUserName(response.content);
                    } else {
                        console.error("Unexpected response format:", response);
                    }
                }
                else {
                    console.log("Vui lòng đăng nhập.")
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchUser();
    }, [email]);


    return (
        <View style={styles.container}>
            <AntDesign name="close" onPress={() => navigation.navigate('Home')} size={24} color="black" style={styles.closeIcon} />

            <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/DeCafe.png')} />
            </View>

            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.subText}> Come and enjoy with us</Text>
            {
                errorMessage &&
                <Text style={{ padding: 10, marginBottom: 10, fontSize: 15, fontWeight: 600 }}>{errorMessage}</Text>
            }
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email or Mobile" />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPass}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(prevState => !prevState)}
                >
                    <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.captcha}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập mã CAPTCHA"
                    value={enteredCaptcha}
                    onChangeText={setEnteredCaptcha}
                />
                <TouchableOpacity style={styles.changeCaptchaButton} onPress={() => setCaptcha(generateCaptcha())}>
                    <AntDesign name="reload1" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.captchaText}>{captcha}</Text>

            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../../assets/images/🦆 icon _google_.png')} style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../../assets/images/🦆 icon _facebook round_.png')} style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.signUpContainer}>
                <Text>Bạn chưa có tài khoản? </Text>
                <TouchableOpacity>
                    <Text style={styles.signUpText} onPress={() => navigation.navigate('SignUp')}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
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
    captcha: {
        flexDirection: "row",
        alignItems: 'center',
    },
    captchaText: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
        textDecorationLine: 'line-through',
        textAlign: "center",
    },
    changeCaptchaButton: {
        marginLeft: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default SignInScreen;
