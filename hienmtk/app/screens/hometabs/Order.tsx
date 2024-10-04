import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import MenuOder from './Ordertab/OrderMain';
import SavedItem from './Ordertab/SavedOrder';
import RecentItem from './Ordertab/Recent';
import { Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

export default class Order extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'menu', title: 'Menu' },
            { key: 'saved', title: 'Saved' },
            { key: 'recent', title: 'Recent' },
        ],
    };

    renderScene = SceneMap({
        menu: () => <MenuOder navigation={this.props.navigation} />,
        saved: SavedItem,
        recent: RecentItem,
    });
    render() {
        return (
            <>
                <ScrollView style={styles.container}>
                    {/* Header Section */}
                    <View style={styles.header_bottom}>
                        <View style={styles.header_option1}>
                            <Image source={require('../../../assets/images/banner/Logo 1.png')} style={styles.logo} />
                        </View>
                        <View style={styles.header_option2}>
                        <FontAwesome name="search" size={20} color="background: #9A7D60" style={styles.header_icon}  />
                        <Ionicons name="language-sharp" size={24} color="background: #9A7D60" style={styles.header_icon}  />
                        </View>
                    </View>
                    <View style={styles.title}>
                    
                        <Text style={styles.textTitle}>Order</Text>
                    </View>
                    <TabView
                        navigationState={this.state}
                        renderScene={this.renderScene}
                        onIndexChange={index => this.setState({ index })}
                        initialLayout={{ width: Dimensions.get('window').width }}
                        style={styles.container_tab}
                        renderTabBar={props => <TabBar {...props} style={{ backgroundColor: '#d2691e' }} indicatorStyle={{ backgroundColor: 'white' }} />}

                    />
                </ScrollView>
            </>
        );
    }
};

const styles = StyleSheet.create({
    container_tab: {
        marginTop: StatusBar.currentHeight,
    },
    scene: {
        flex: 1,

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header_bottom: {
        marginTop: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        shadowColor: "#d2691e",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,

        elevation: 5,
        padding: 10,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    logo: {
        width: 150,
        height: 40,
    },
    header_option1: {
        flex: 1,
    },

    header_option2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    header_icon: {
        margin: 5
    },

    title: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5
    },

    textTitle: {
        flex: 9,
        fontSize: 25,
        fontWeight: 500,
        textAlign: 'center'        
    },
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '##9f1818',
        backgroundColor: '#d2691e',
        paddingLeft: 30
    },

    bottomNavAction: {
        flexDirection: 'row',
        flex: 2,
        backgroundColor: 'white'
    },
    navButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flex: 1,
    },
    navButtonText: {
        fontWeight: 'bold',
        color: '#d2691e',
    },
    icon: {
        width: 25,
        height: 30
    },
})