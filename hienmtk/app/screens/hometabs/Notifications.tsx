import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Notifications = () => {
    return (

        <View style={styles.container}>
            <Text style={styles.txt}>Notifications!</Text>
        </View>
    )
}

export default Notifications

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6710b',
    },
    txt: {
        fontSize: 30
    }
})