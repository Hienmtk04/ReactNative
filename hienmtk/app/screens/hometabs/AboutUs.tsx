import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AboutUs = () => {
    return (

        <View style={styles.container}>

            <View style={styles.topMain}>
                <Image source={require('../../../assets/images/banner/cappuccino cup 2 1.png')} style={styles.image} />

                {/* Product Title */}
                <View style={styles.productTitle}>
                    <Text style={styles.title}>Decafe Coffee</Text>
                    <Text style={styles.subTitle}>Join us in making a difference today!</Text>
                    <Text style={styles.rating}>⭐ 4.9</Text>
                </View>
            </View>
            <ScrollView style={styles.underRow}>
                {/* Size Selection */}
                <Text style={styles.sizeTitle}>Blend in with Decafe Coffee.</Text>
                <View style={styles.sizeOptions}>

                </View>

                <View style={styles.section}>
                    <View style={styles.section_banner}>
                        <Text style={styles.sectionTitle}> Creative coffee recipe</Text>
                        <Text style={styles.sectionText}>Hot or cold, enjoyable or refreshing, DECAFE delicious and easy to make coffee recipes for you.</Text>
                    </View>
                    <Image source={require('../../../assets/images/aboutus/RHP_HomeHacks_1064x1064.webp')} style={styles.section_banner_img} />
                </View>
                <View style={styles.section}>
                    <Image source={require('../../../assets/images/aboutus/Article 6_Bannerdaf.webp')} style={styles.section_banner_img} />
                    <View style={styles.section_banner}>
                        <Text style={styles.sectionTitle}>Try now how to make coffee latte without using a machine</Text>
                        <Text style={styles.sectionText}>Have you ever been "curious" about what a delicious cup of Latte coffee is,
                             how to make coffee latte without using a machine and still retain the standard traditional flavor?</Text>
                    </View>
                </View>

                {/* Add to Cart */}
                <TouchableOpacity style={styles.continueToOrderButton}>
                    <Text style={styles.addToCartText}>Continue to order</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default AboutUs;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    topMain: {
        flex: 1,
    },
    image: {
        position: 'relative',
        width: '100%',
        height: 400,

    },
    productTitle: {
        position: 'absolute',
        marginTop: 200,
        marginHorizontal: 20
    },
    underRow: {
        position: 'absolute',
        top: 350,
        left: 0,
        right: 0,
        borderRadius: 20,
        backgroundColor: '#fafafa',
        padding: 20,
        zIndex: 1,
        height: '100%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'white'
    },
    subTitle: {
        fontSize: 18,
        color: '#ffffff',

    },
    rating: {
        fontSize: 16,
        marginVertical: 5,
        color: '#888',
        backgroundColor: '#f8f5f5',
        width: 70,
        borderRadius: 20,
        padding: 2,
        textAlign: 'center'
    },
    sizeTitle: {
        fontSize: 25,
        fontWeight: 700,
        marginVertical: 10,
        textAlign: 'center',
        color: '#870404'
    },
    sizeOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    sizeButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    selectedSizeButton: {
        backgroundColor: '#4CAF50',
    },
    sizeText: {
        fontSize: 16,
    },
    selectedSizeText: {
        color: '#fff',
    },
    description: {
        marginVertical: 20,
        fontSize: 16,
        color: '#666',
    },
    continueToOrderButton: {
        backgroundColor: '#d2691e',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%'
    },
    addToCartText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    section: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 30,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        minHeight: 200,
    },
    section_banner: {
        flex: 1,
        marginHorizontal: 10,
    },
    section_banner_img: {
        flex: 1,
        width: 10,
        height: 165
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionText: {
        marginVertical: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 30,
        backgroundColor: '#ff7f50',
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 600
    },
});