import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper'
import { IconButton } from 'react-native-paper';

const SuccessPayment = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.container}>
            {/* Success Icon */}
            <View style={styles.iconContainer}>
                <IconButton icon="check-circle" size={100} />
            </View>

            {/* Success Message */}
            <Text style={styles.successText}>Payment Successful!</Text>
             <Text style={styles.description}>Thank you for your purchase. Your order has been placed successfully.</Text>
            {/* Continue Shopping Button */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.buttonText}>Continue Shopping</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SuccessPayment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    iconContainer: {
        marginBottom: 20,
    },
    successText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 30,
    },
    orderDetails: {
        width: '100%',
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
    },
    orderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderInfo: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#d2571e',
        padding: 15,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})