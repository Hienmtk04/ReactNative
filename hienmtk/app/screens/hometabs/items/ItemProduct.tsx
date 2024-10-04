import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
const ItemHome = ({ imageSource, textContent, price, description, navigation } : any) => {
    return (
        <TouchableOpacity style={styles.orderItem} onPress={() => navigation.navigate('Details')}>
            <View style={styles.img}>
                <Image source={{ uri: imageSource }} style={styles.orderImage} />
            </View>
            <View style={styles.item_detail}>
                <View style={styles.orderDetails}>
                    <Text style={styles.orderName}>{textContent}</Text>
                    <Text style={styles.space}>..............................</Text>
                    <Text style={styles.orderPrice}>{price}</Text>
                </View>
                <View style={styles.orderAction}>
                    <Text style={styles.orderDescription}>{description}</Text>
                    <TouchableOpacity style={styles.orderButton} onPress={() => { }}>
                        <Text style={styles.orderButtonText}>Add cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    ItemStyle: {
        height: 164,
        width: 154,
        backgroundColor: "#FFF",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    img: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item_detail: {
        flex: 3,
        flexDirection: 'column',
        margin: 10
    },
    orderImage: {
        width: 50,
        height: 50,
        borderRadius: 25,

    },
    orderDetails: {
        flex: 1,
        flexDirection: 'row',
    },
    orderName: {
        flex: 1,
        fontWeight: 'bold',
        marginRight: 5
    },
    space: {
        flex: 2,
        marginLeft: 0,
        marginRight: 20,
    },

    orderAction: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5
    },
    orderPrice: {
        fontWeight: 'bold',
        marginBottom: 5,
        flex: 1,
    },
    orderDescription: {
        flex: 3,
        color: '#6f6c6c',
    },
    orderButton: {
        flex: 2,
        backgroundColor: '#ff7f50',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        margin: 5
    },
});
export default ItemHome;