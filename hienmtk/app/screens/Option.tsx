import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';


const Option = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.option}>
            <TouchableOpacity style={{ marginVertical: 30, marginHorizontal: 20 }} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.container}>
            <Image source={require('../../assets/images/icon/DECAFE-fotor-20240925195810.png')} style={{ width: 200, height: 200}}/>
                <Text style={styles.title}>Select an option</Text>
                <TouchableOpacity style={styles.btn_option} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.btn}><Entypo name="login" size={24} color="black" style={{ marginRight: 30 }} />Sign In</Text>
                </TouchableOpacity>
                <Text>Or</Text>
                <TouchableOpacity style={styles.btn_option} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.btn}><AntDesign name="adduser" size={24} color="black" style={{ marginRight: 25 }} />Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Option

const styles = StyleSheet.create({
    option: {
        flex: 2,
        backgroundColor: '#f8d7a5',
        flexDirection: 'column',

    },
    container: {
        alignItems: 'center',
    },
    title: {
        color: '#4a2306',
        fontWeight: '600',
        fontSize: 25,
        marginBottom: 15
    },
    btn_option: {
        backgroundColor: '#d2571e',
        borderRadius: 25,
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'center',
        width: 250
    },
    btn: {
        paddingHorizontal: 50,
        paddingVertical: 15,
        color: '#4a2306',
        fontWeight: '600',
        fontSize: 20,
    },
})