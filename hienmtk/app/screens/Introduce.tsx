import { StyleSheet, Text, View } from 'react-native';
import { Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import type {PropsWithChildren} from 'react';
import type {ViewStyle} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

type FadeInViewProps = PropsWithChildren<{style: ViewStyle}>;
const FadeInView: React.FC<FadeInViewProps> = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current; 
    
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);
  
    return (
      <Animated.View // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,
        }}>
        {props.children}
      </Animated.View>
    );
  };

const Introduce = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/icon/dienthoai-1-675x1200-26.jpg')} style={styles.background} />
            <FadeInView
                style={{
                    width: 250,
                    height: 50,
                    position: 'absolute',
                }}>
                <Image source={require('../../assets/images/icon/64c68421325373.562ff49fcb01d.png')} style={styles.logo} />
            </FadeInView>
            <TouchableOpacity style={styles.icon_next} onPress={() => navigation.navigate('Option')}>
                 <AntDesign name="arrowright" size={24} color="black" style={styles.icon} />
            </TouchableOpacity>
        </View>
    )
}

export default Introduce

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        position: 'relative',
        width: 400,
        height: 850,
    },
    logo: {
        position: 'absolute',
        bottom: 20,
        left: 50,
        width: 170
    },
    icon_next : {
        position: 'absolute',
        right: 50,
        bottom: 50,
        backgroundColor: '#fff',
        borderRadius: 100
    },
    icon : {
        textAlign: "right",
        margin: 10
    }
})