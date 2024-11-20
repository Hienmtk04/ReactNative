import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { REGISTER } from '../api/apiService';
import { useNavigation } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';

const SignUpScreen = ({ navigation }: { navigation: any }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [pass, setPass] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigation();
    const [errorMessage, setErrorMessage] = useState('');

    const toast = useToast();

    const showToast = () => {
        toast.show('Đăng ký thành công!', {
            type: 'success',
            duration: 3000,
            animationType: 'slide-in',
            placement: 'top'
        });
    };



    const handleRegister = async (event: any) => {

        const formData = {
            firstName,
            lastName,
            email,
            password: pass,
            mobileNumber,
        };
        event.preventDefault();
        try {
            if (firstName.length < 5 || lastName.length < 5) {
                setErrorMessage("Tên phải ít nhất 5 ký tự")
            }
            if (!firstName || !lastName||!email||!mobileNumber||!pass) {
                setErrorMessage("Vui lòng điền đầy đủ thông tin")
            }
            const response = await REGISTER(formData, navigation);
            if (response && response.data) {
                showToast();
            }
        } catch (error) {
            window.alert('Register failed');
        }
    };

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


            <TextInput style={styles.input} placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName} />
            <TextInput style={styles.input} placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName} />
            <TextInput style={styles.input} placeholder="Email"
                value={email}
                onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Phone"
                value={mobileNumber}
                onChangeText={setMobileNumber} />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={pass}
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

            <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
                <Text style={styles.loginButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
                <Text>Already a mmeber? </Text>
                <TouchableOpacity>
                    <Text style={styles.signUpText} onPress={() => navigation.navigate('SignIn')}>Sign In</Text>
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
});

export default SignUpScreen;
