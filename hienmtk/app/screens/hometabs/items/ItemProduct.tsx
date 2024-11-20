import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const formatCurrency = (price) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
};

const ItemHome = ({ imageSource, textContent, price, description, discount, navigation, specialPrice }) => {
    return (
        <TouchableOpacity style={styles.orderItem}>
            <View style={styles.img}>
                <Image source={{ uri: imageSource }} style={styles.orderImage} />
                {discount > 0 ? (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>-{discount}%</Text>
                    </View>
                ) :
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>NEW</Text>
                    </View>
                    }
            </View>
            <View style={styles.item_detail}>
                <View style={styles.orderDetails}>
                    <Text style={styles.orderName}>{textContent}</Text>
                    {discount > 0 ?
                        <Text style={styles.orderPrice}>{formatCurrency(specialPrice)}</Text>
                        : <Text style={styles.orderPrice}>{formatCurrency(price)}</Text>
                    }
                </View>
                <View style={styles.orderAction}>
                    <Text style={styles.orderDescription}>{description}</Text>
                    <TouchableOpacity style={styles.orderButton} onPress={() => { }}>
                        <Text style={styles.orderButtonText}>Thêm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
        height: 100
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
    orderAction: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5
    },
    orderPrice: {
        fontWeight: 'bold',
        marginBottom: 5,
        flex: 1,
        textAlign: 'right'
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
    discountBadge: {
        position: 'absolute',
        top: -20,
        left: 5,
        backgroundColor: '#ff3e3e',
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    discountText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 10,
    },
});

export default ItemHome;
